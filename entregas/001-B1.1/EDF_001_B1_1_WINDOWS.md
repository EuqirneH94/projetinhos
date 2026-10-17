# Windows PowerShell — validação corretiva 001-B1.1

**Candidata, missão não aprovada.** Esta entrega foi executada em Linux/Node 24.14.0, com build, 50 testes e 20 repetições SQLite aprovados. Windows ainda não foi executado por nós. As falhas provocadas nos testes não reproduzem a causa desconhecida do incidente original. B2 permanece bloqueado.

## 1. Obter e conferir a candidata

Baixe `EDF-B11.zip` pela página do arquivo no GitHub (botão **Download raw file**), em vez de links sandbox. Se o navegador apenas abrir a página, use o ícone de download do próprio arquivo. O SHA-256 do pacote externo está no arquivo adjacente `EDF-B11.zip.sha256`; o pacote contém ZIP do jogo, patch B1→B1.1, RFC, relatório, evidências e hashes.

```powershell
Get-FileHash -LiteralPath .\EDF-B11.zip -Algorithm SHA256
Expand-Archive -LiteralPath .\EDF-B11.zip -DestinationPath .\EDF-B11-entrega
Set-Location .\EDF-B11-entrega
Get-FileHash -LiteralPath .\Reinos_de_Nexo_v0_1_0_EDF_001_B1_1.zip -Algorithm SHA256
# Compare com SHA256SUMS.txt antes de continuar.
Expand-Archive -LiteralPath .\Reinos_de_Nexo_v0_1_0_EDF_001_B1_1.zip -DestinationPath .\candidata
Set-Location .\candidata\reinos-de-nexo
node --version
node scripts/verify-files.mjs
```

Use Windows 11 e Node **v24.14.0** para a comparação solicitada. Extraia em pasta nova; não sobreponha instalação nem copie bancos para dentro da entrega. Não é necessário usar patch se usar o ZIP completo. O patch exige fonte B1 exata e não deve ser aplicado sobre banco/save.

## 2. Testes automatizados isolados

Execute primeiro sem tocar a instalação afetada. O script só cria bancos temporários próprios. O probe de watch encerra deliberadamente **apenas a árvore que ele mesmo iniciou**; não encerra todos os processos Node. Mantenha esse comportamento ao revisar o script.

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\validate-b11-windows.ps1 -Repetitions 20
if ($LASTEXITCODE -ne 0) { throw 'Validação falhou; preserve os logs.' }
```

O Bypass vale apenas para essa invocação de script local revisado; não muda a política permanente. Se a política da máquina impedir execução, execute os comandos individualmente e registre seus códigos de saída, sem mudar políticas corporativas.

Esperado: manifest sem divergências; npm ci; build; **10/10** testes lifecycle; **20/20** repetições com **1 teste SQLite executado em cada**; suíte **50/50**, sem skips/cancelamentos; probe watch concluído. A pasta `evidencias-b11-<data>` contém logs e hashes. O script PowerShell acompanha a entrega para execução real, mas não foi executado neste ambiente Linux.

No `watch/watch-result.json`, normal deve mostrar personagem entrado, pelo menos 20 snapshots, pai vivo/health true/lock true; tick deve mostrar personagem entrado, pai vivo/health false/lock false. A falha tick é artificial e deve produzir `EDF_CONTROLLED_TICK_FAILURE`, `server_shutdown_complete` e exitCode 1. Pai watch vivo após esse erro é esperado, não é um servidor saudável. As regressões verificam morte forçada, preservação de dados, recuperação e um único escritor.

## 3. Preservar e investigar a instalação afetada

Antes de mover qualquer lock:

1. Identifique o terminal/comando original, os PIDs do supervisor e filhos e o caminho físico do banco usado. Não confunda esta instalação com outros projetos Node.
2. Preserve as últimas linhas do terminal, stack e código de saída. Não envie credenciais, bancos ou dumps públicos. Ausência de JS stack pode indicar crash nativo: confira Visualizador de Eventos → Logs do Windows → Aplicativo e Windows Error Reporting, anotando módulo/código de exceção/hora.
3. Encerre **somente** supervisor/filhos identificados, de preferência Ctrl+C no terminal correto. No Windows, `Stop-Process`/TerminateProcess não equivalem a um encerramento JS limpo e podem deixar órfão; isso não autoriza apagá-lo.
4. Comprove ausência de handles de escritor no **banco exato e seus sidecars**, usando Process Explorer (Find Handle) ou Handle da Microsoft Sysinternals: https://learn.microsoft.com/sysinternals/downloads/handle . Examine também o guard. Registre o resultado. Não use `handle -c` para fechar handles de outro processo. Se não conseguir comprovar manutenção exclusiva, **pare aqui, preserve o lock e investigue**.

Comandos auxiliares de diagnóstico (não provam exclusividade sozinhos):

```powershell
Get-NetTCPConnection -LocalPort 8787 -ErrorAction SilentlyContinue
# Substitua pelo caminho ABSOLUTO real; não use o exemplo literalmente.
$AccountDatabase='C:\CAMINHO-REAL\laboratorio-b1\contas-teste.sqlite'
node scripts/inspect-account-lock.mjs $AccountDatabase
# Exemplo, após instalar/revisar a ferramenta oficial:
# & 'C:\Ferramentas\handle64.exe' -nobanner $AccountDatabase
```

`LEGACY_OR_UNKNOWN` não autoriza remoção. `OWNER_ALIVE` pode ser servidor legítimo ou PID reutilizado e também bloqueia. `V2_OWNER_DEAD_GUARD_REQUIRED` informa apenas a prova de PID ausente: a recuperação ainda precisa do guard e da validação completa. Nenhuma dessas ferramentas remove locks.

## 4. Backup frio e isolamento conservador de lock B1

Somente depois da manutenção exclusiva comprovada no passo anterior, mantenha todos os serviços parados durante backup e isolamento. Preserve a pasta que contém o banco, WAL/SHM existentes, credenciais e arquivos de controle. Se DB_PATH ou credenciais estiverem fora dela, copie suas pastas também. Não apague WAL/SHM e não faça cópia simples de banco ativo.

```powershell
$LaboratoryDirectory=Split-Path -Parent $AccountDatabase
$CheckpointStamp=Get-Date -Format 'yyyyMMdd-HHmmss-fff'
$BackupDirectory=$LaboratoryDirectory+'-backup-b11-'+$CheckpointStamp
if (Test-Path -LiteralPath $BackupDirectory) { throw 'Destino já existe.' }
Copy-Item -LiteralPath $LaboratoryDirectory -Destination $BackupDirectory -Recurse -ErrorAction Stop
Get-ChildItem -LiteralPath $BackupDirectory -Recurse -File | ForEach-Object {
  $Digest=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
  "$Digest  $($_.FullName.Substring($BackupDirectory.Length+1))"
} | Set-Content -LiteralPath ($BackupDirectory+'.sha256.txt') -Encoding ASCII
```

Confira a cópia e os hashes, sem abrir serviço. Para um lock **antigo vazio B1**, sem PID, a recuperação automática é intencionalmente recusada. Apenas com a prova de exclusividade e backup já obtidos, o operador pode isolá-lo uma vez, sem apagar:

```powershell
$LockFile=$AccountDatabase+'.lock'
$LockEvidence=$LockFile+'.legacy-preserved-'+$CheckpointStamp
if ((Get-Item -LiteralPath $LockFile).Length -ne 0) { throw 'Lock não é B1 vazio; revise o metadado antes de qualquer ação.' }
if (Test-Path -LiteralPath $LockEvidence) { throw 'Destino de evidência já existe.' }
Move-Item -LiteralPath $LockFile -Destination $LockEvidence -ErrorAction Stop
```

Não execute isso com serviço ativo, não use `Remove-Item *.lock` e não apague `.guard.sqlite`. Um lock V2 válido com PID morto será isolado pela própria B1.1 sob guard exclusivo; não exige esse passo manual. Locks desconhecidos, de outro host/caminho ou com proprietário vivo exigem investigação, sem renomeação cega. Se uma nova queda ocorrer, **não repita isolamento para mascará-la**: preserve stderr/exit e diagnostique o gatilho.

## 5. Entrada no mundo e persistência real

Use os mesmos caminhos absolutos DB_PATH/ACCOUNTS_DB_PATH da instalação, após revisão e backup. Não recrie conta ou credencial para substituir as existentes. Na pasta nova da candidata:

```powershell
$env:ACCOUNTS_DB_PATH=$AccountDatabase
# Aponte DB_PATH para o save legado ORIGINAL correto, separado das contas.
$env:DB_PATH='C:\CAMINHO-REAL\data\reinos.sqlite'
$env:HOST='127.0.0.1'
$env:PORT='8787'
node scripts/check-account-db.mjs $AccountDatabase
node --trace-uncaught --trace-warnings build/server/src/index.js 2>&1 | Tee-Object -FilePath .\servidor-b11-direto.log
$ServerExitCode=$LASTEXITCODE
Write-Host "Exit do servidor direto: $ServerExitCode"
```

Esse comando bloqueia o terminal enquanto o servidor roda. Em outro terminal, confira `Invoke-RestMethod http://127.0.0.1:8787/health`; no navegador abra `http://127.0.0.1:8787/accounts.html`. Se houver política de origens personalizada, preserve-a e inclua a origem local usada. Autentique com a credencial existente, selecione o personagem que disparou o problema e entre. Confirme estados contínuos, movimento, combate/missão/inventário/áudio existentes e uma segunda sessão recusada sem expulsar a primeira. Não publique o conteúdo de sessionStorage nem o token.

Registre valores observáveis de progresso e inventário; saia normalmente e pressione Ctrl+C no terminal do servidor. Confira `server_shutdown_complete`, exit 0 e ausência de `.lock`. Execute novamente `check-account-db.mjs`: integrity `ok`, foreignKeyErrors 0, contagens esperadas preservadas (a instalação relatada tinha 1 conta/1 personagem). Reinicie o mesmo comando, autentique com a mesma credencial e confira o progresso. Expiração de token continua sendo a regra B1, sem extensão nesta correção.

Repita o fluxo real com `npm.cmd run dev:server` para comparar o modo watch, preservando o log. Após saída do filho, registre o evento/stack/exitCode e health; não suponha que pai watch vivo significa serviço ativo. Feche o watch antes de iniciar outro servidor. Não provoque kill/abort no banco real: as regressões já fazem isso em dados sintéticos.

## 6. Rollback e aceite

Não há migração/schema novo no banco de contas; guard é arquivo operacional separado. Para rollback de código, encerre B1.1 normalmente, confirme `.lock` ausente e manutenção exclusiva, faça novo backup frio e inicie **a B1 validada** apontando aos mesmos caminhos. Preserve guard e arquivos órfãos, sem removê-los. Se existir lock após falha, siga investigação/recuperação antes de usar B1. Não inicie B1 e B1.1 simultaneamente.

Se for necessário restaurar dados, preserve a pasta atual e restaure o checkpoint em **nova pasta**, com todos os sidecars consistentes e hashes, sob manutenção exclusiva. Metadados de lock copiados podem referir-se ao caminho/PID antigo e exigem revisão conservadora; não abra uma cópia enquanto outro processo a estiver usando nem substitua o original. Restaurar checkpoint perde progresso posterior, portanto requer decisão explícita do operador; esta entrega não executa essa operação.

Aceite exige logs Windows reais dos testes e do fluxo afetado, persistência após reinício, integridade/FK, concorrência protegida e identificação/reprodução do gatilho original com evidência de correção. Envie somente logs revisados sem dados privados. **50 testes sintéticos aprovados, sozinhos, não aprovam a missão. B2 continua bloqueado.**
