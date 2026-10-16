# Ecos dos Faróis001-B1 — validação Windows PowerShell local

Baseline001-B0.1 foi aprovada pelo usuário. **B1 ainda precisa de aceite Windows.** Linux passou build e40 testes(21 antigos intactos+19 novos). Classes/facções/povos são metadados no laboratório; não há kit novo, início canônico, importação de save, exclusão, guilda, mercado, montaria ou dungeon.

Use Windows PowerShell local, não SSH/Hostinger/bash. Testar em pasta nova preserva a instalação anterior. Não copiar ou converter DB do usuário. Node necessário:24.13 ou superior da linha24. Testes criam seus próprios bancos temporários e verificam fechamento/reabertura e controles de autorização.

## 1. Conferir ZIP e extrair em pasta nova

Baixe o ZIP de jogo e o arquivo SHA256SUMS da entrega. O bloco encontra também arquivos com sufixos do navegador em Downloads, conferindo conteúdo:

```powershell
$ErrorActionPreference = 'Stop'
$shaJogoEdf = 'c41c6613f71cda45404afe8e564cb17b91d44f6dcbbebe4f049201a8a57e3962'
$zipEdf = Get-ChildItem -LiteralPath (Join-Path $env:USERPROFILE 'Downloads') -File -Filter 'Reinos_de_Nexo*001_B1*.zip' |
    Where-Object { (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash -eq $shaJogoEdf } |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $zipEdf) {
    $caminhoZipEdf = Read-Host 'Caminho completo do ZIP de jogo extraído do pacote completo (sem aspas)'
    if (-not (Test-Path -LiteralPath $caminhoZipEdf)) { throw 'ZIP não encontrado.' }
    $zipEdf = Get-Item -LiteralPath $caminhoZipEdf
    if ((Get-FileHash -LiteralPath $zipEdf.FullName -Algorithm SHA256).Hash -ne $shaJogoEdf) { throw 'SHA do ZIP divergente. Não continuar.' }
}
$pastaEdf = Join-Path $env:USERPROFILE ('Projetos\edf-001-b1-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
if (Test-Path -LiteralPath $pastaEdf) { throw 'Destino já existe. Nenhum arquivo será substituído.' }
Expand-Archive -LiteralPath $zipEdf.FullName -DestinationPath $pastaEdf
Set-Location -LiteralPath (Join-Path $pastaEdf 'reinos-de-nexo')
$logsEdf = Join-Path $pastaEdf 'logs-windows'
New-Item -ItemType Directory -Path $logsEdf | Out-Null

function Invoke-EdfCheck {
    param([string]$Name, [string]$File, [string[]]$NativeArgs, [int]$ExpectedExit = 0)
    $inicioEdf = Get-Date
    $logEdf = Join-Path $logsEdf ($Name + '.log')
    $anteriorEdf = $ErrorActionPreference
    try {
        $ErrorActionPreference = 'Continue'
        & $File @NativeArgs *> $logEdf
        $exitEdf = $LASTEXITCODE
    } finally { $ErrorActionPreference = $anteriorEdf }
    Get-Content -LiteralPath $logEdf
    [ordered]@{ command="$File $($NativeArgs -join ' ')"; cwd=(Get-Location).Path; started_utc=$inicioEdf.ToUniversalTime().ToString('o'); duration_s=((Get-Date)-$inicioEdf).TotalSeconds; exit=$exitEdf; expected_exit=$ExpectedExit } |
        ConvertTo-Json | Set-Content -LiteralPath (Join-Path $logsEdf ($Name + '.json')) -Encoding UTF8
    if ($exitEdf -ne $ExpectedExit) { throw "$Name : exit=$exitEdf; esperado=$ExpectedExit. Preserve o log." }
}
Invoke-EdfCheck -Name '01-node' -File 'node' -NativeArgs @('--version')
Invoke-EdfCheck -Name '02-npm' -File 'npm.cmd' -NativeArgs @('--version')
Invoke-EdfCheck -Name '03-doctor' -File 'npm.cmd' -NativeArgs @('run','doctor')
Invoke-EdfCheck -Name '04-manifesto' -File 'npm.cmd' -NativeArgs @('run','verify:files')
```

Esperado: Node24.13+<25, doctor OK e **83 arquivos,0 divergências**. O pacote contém84 membros, incluindo o manifesto. Verificar antes do build; o manifesto é do artefato, não de futuras recompilações. O ZIP completo de entrega contém o ZIP de jogo dentro: se baixou somente o pacote completo, extraia primeiro e mova o ZIP de jogo para Downloads ou ajuste a busca para a pasta onde ele foi extraído.

## 2. Instalar, compilar e testar

```powershell
Invoke-EdfCheck -Name '05-install' -File 'npm.cmd' -NativeArgs @('ci','--no-fund','--no-audit')
Invoke-EdfCheck -Name '06-build' -File 'npm.cmd' -NativeArgs @('run','build')
Invoke-EdfCheck -Name '07-contas' -File 'node' -NativeArgs @('--import','tsx','--test','tests/accounts.test.ts','tests/accounts-network.test.ts')
Invoke-EdfCheck -Name '08-suite' -File 'npm.cmd' -NativeArgs @('test')
1..20 | ForEach-Object {
    Invoke-EdfCheck -Name ('09-sqlite-{0:D2}' -f $_) -File 'node' -NativeArgs @('--import','tsx','--test','--test-name-pattern=arquivo SQLite','tests/integration.test.ts')
}
```

Esperado: build/typecheck OK; **19/19** testes novos; **40/40** na suíte, sem falhos/cancelados/ignorados;20/20 repetições com1 teste aprovado cada. Testes incluem16 combinações autorizadas como metadados, oitavo/nono concorrente, personagem alheio, corrida de sessão, credencial revogada, falha real de gravação, backup frio e rejeição de banco legado sem alterar bytes. O aviso Vite de bundle >500kB continua conhecido e não equivale a falha.

Para repetir controle negativo legado, extraia o ZIP de evidências conferido e indique sua pasta EDF_001_B1:

```powershell
$evidenciasEdf = Read-Host 'Pasta EDF_001_B1 extraída das evidências'
$hookEdf = Join-Path $evidenciasEdf 'support\persistence-control.mts'
if (-not (Test-Path -LiteralPath $hookEdf)) { throw 'Hook não encontrado.' }
try {
    $env:EDF_PERSISTENCE_CONTROL = 'client-first'
    Invoke-EdfCheck -Name '10-ordem-controlada' -File 'node' -NativeArgs @('--import','tsx','--import',$hookEdf,'--test','--test-name-pattern=arquivo SQLite','tests/integration.test.ts')
    $env:EDF_PERSISTENCE_CONTROL = 'lost-write'
    Invoke-EdfCheck -Name '11-negativo-legado' -File 'node' -NativeArgs @('--import','tsx','--import',$hookEdf,'--test','--test-name-pattern=arquivo SQLite','tests/integration.test.ts') -ExpectedExit 1
    if (-not ((Get-Content -Raw -LiteralPath (Join-Path $logsEdf '11-negativo-legado.log')) -match '0 !== 316')) { throw 'Falha diferente do controle esperado.' }
} finally { Remove-Item Env:\EDF_PERSISTENCE_CONTROL -ErrorAction SilentlyContinue }
```

O controle negativo deve falhar0≠316; não é falha a esconder nem teste da contagem40. Os testes de falha de escrita B1, por sua vez, pertencem à suíte e passam ao comprovar recusa/rollback/health503.

## 3. Provisionar duas contas privadas (antes de iniciar servidor)

Na pasta nova, sem servidor ativo:

```powershell
New-Item -ItemType Directory -Path data -Force | Out-Null
Invoke-EdfCheck -Name '12-conta1' -File 'node' -NativeArgs @('--import','tsx','scripts/account-admin.ts','create','data/accounts-b1.sqlite','data/account1.private.json')
Invoke-EdfCheck -Name '13-conta2' -File 'node' -NativeArgs @('--import','tsx','scripts/account-admin.ts','create','data/accounts-b1.sqlite','data/account2.private.json')
$env:ACCOUNTS_DB_PATH = 'data/accounts-b1.sqlite'
$env:DB_PATH = 'data/legacy-lab.sqlite'
$env:HOST = '127.0.0.1'
$env:PORT = '8787'
$env:ALLOWED_ORIGINS = 'http://localhost:8787,http://127.0.0.1:8787'
node build/server/src/index.js
```

Esperado: servidor inicia em8787; manter esse terminal aberto. O comando direto usa o build testado e um único processo; não depende de Vite/XAMPP. Em outro PowerShell na mesma pasta, copiar a chave da conta sem imprimi-la:

```powershell
Set-Clipboard -Value ((Get-Content -Raw -LiteralPath 'data/account1.private.json' | ConvertFrom-Json).token)
```

Abrir `http://localhost:8787/accounts.html`, colar no campo privado e conectar. Não incluir esse arquivo/chave em logs, screenshots ou chat. A credencial de teste é bearer, dura30dias e fica privada; não é cadastro público nem autenticação de produção. Quando terminar de colar, pode limpar a área de transferência com `Set-Clipboard -Value ''`.

## 4. Roteiro manual de aceite

1. Na conta1, criar personagem Vigília/Valdário/Sentinela e outro Confluência/Náquiro/Errante. Reabrir lista e confirmar metadados. Ambas as facções pertencem à mesma conta sem misturar povos.
2. Selecionar personagem e entrar no laboratório. HUD indica **KIT DO PROTÓTIPO**. Conferir WASD, câmera, combate, mochila, missão de Maera e controles de áudio existentes. Não interpretar esse kit como implementação de Sentinela/Errante, nem o Vale de Alvor como início canônico de ambas as facções.
3. Em outra janela/perfil, entrar com **a mesma conta1** e selecionar outro personagem. Deve ser recusado; a primeira sessão continua jogando. Sair pelo botão da primeira sessão e tentar a segunda novamente: deve entrar.
4. Conectar a **conta2**, com sua própria chave privada, em outra janela. Duas contas podem jogar simultaneamente. Os personagens da conta1 não aparecem na lista da conta2. Regras de exclusividade por conta não limitam duas pessoas de contas distintas.
5. Criar até oito na conta1; UI desabilita criação. O teste automático já cobre tentativa forjada/nono no servidor, sem depender da UI. Não há exclusão implementada; não apagar registros para testar capacidade.
6. Realizar progresso legítimo(missão/saque), sair de forma limpa e reentrar: personagem, missão, carteira e inventário devem ser preservados. Trocar para outro personagem: o saldo/progresso é individual. Não usar edição SQL para conceder progresso no aceite manual.
7. Encerrar o servidor com Ctrl+C no terminal que o iniciou, aguardar retorno e verificar `Test-Path data/accounts-b1.sqlite.lock` →False. Reiniciar com as mesmas variáveis e `node build/server/src/index.js`; reconectar com a mesma chave e conferir lista/metadados/progresso. Se lock permanecer, preservar diagnóstico e identificar a instância/processo; não remover lock ou encerrar todos os Node cegamente.

## 5. Backup frio, restauração em cópia e rollback

Com os serviços **parados**, sem jogadores/servidor de contas ativos:

```powershell
if (Test-Path -LiteralPath 'data/accounts-b1.sqlite.lock') { throw 'Servidor/lock ainda presente. Não continuar com backup frio.' }
$backupEdf = Join-Path $pastaEdf ('backup-frio-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
if (Test-Path -LiteralPath $backupEdf) { throw 'Backup já existe.' }
New-Item -ItemType Directory -Path $backupEdf | Out-Null
foreach ($nomeEdf in @('accounts-b1.sqlite','accounts-b1.sqlite-wal','accounts-b1.sqlite-shm','legacy-lab.sqlite','legacy-lab.sqlite-wal','legacy-lab.sqlite-shm')) {
    $origemEdf = Join-Path 'data' $nomeEdf
    if (Test-Path -LiteralPath $origemEdf) {
        $copiaEdf = Join-Path $backupEdf $nomeEdf
        Copy-Item -LiteralPath $origemEdf -Destination $copiaEdf
        if ((Get-FileHash -LiteralPath $origemEdf -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $copiaEdf -Algorithm SHA256).Hash) { throw 'Hash de backup divergente.' }
    }
}
```

Guardar backup e credenciais em local privado; não enviar banco ou chave no aceite. Para testar restauração, copiar o conjunto consistente do backup para **outra pasta nova**, manter nome do banco e sidecars e apontar ACCOUNTS_DB_PATH para essa cópia. IniciarB1, autenticar com a credencial correspondente e conferir todos os personagens e progresso do instante do backup. Não sobrescrever banco original ou copiar só o arquivo principal de um DB ativo.

Rollback seguro de código: pararB1 e voltar à pasta B0.1 preservada. B0.1 lê seus saves v1; o banco de contas B1 continua separado e deve ser guardado para retomar comB1. Personagens B1 **não são convertidos para v1**; rollback não é transferência de progresso. A RFC descreve futura migração com checkpoint e autorização específica; ela não é executada aqui.

Para testar sem contas noB1, remover apenas a variável desta sessão, não arquivos:

```powershell
Remove-Item Env:\ACCOUNTS_DB_PATH -ErrorAction SilentlyContinue
node build/server/src/index.js
```

Fluxo legado continua disponível; tela de contas recusa login por recurso desativado. Não apontar DB_PATH para banco de contas ou vice-versa. O bootstrap recusa caminhos iguais, e o AccountStore recusa banco legado/versão desconhecida sem migrar.

## 6. Resultado a registrar

Enviar `logs-windows`, versão Windows/PowerShell, SHA do ZIP, resultado40/40, repetições, reabertura/backup restaurado e passos manuais, sem credenciais/saves. Linux validado não fecha aceite Windows. Não há alegação de FPS/capacidade de32 ou áudio humano aprovado nesta máquina.

Ao retornar à pasta B0.1, restaure também o **DB_PATH original daquela instalação**. Não herdar o caminho relativo `data/legacy-lab.sqlite` do laboratório e confundi-lo com seus saves anteriores. Se a instalação antiga usava o padrão, remover a variável DB_PATH desta sessão devolve o padrão `data/reinos.sqlite`; se usava caminho customizado, reaplique esse caminho original, sem mover/substituir bancos. Remover variáveis não apaga dados. O banco de contas nunca deve ser usado como DB_PATH da baseline antiga.
