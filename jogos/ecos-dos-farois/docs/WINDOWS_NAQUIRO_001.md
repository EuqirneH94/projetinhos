# Jogar e validar o Náquiro 001 no Windows PowerShell

Esta é uma apresentação experimental, versão `0.3.1-naquiro.1`. A primeira validação deve usar uma pasta nova e bancos de laboratório, preservando a instalação e os saves anteriores. Os resultados Linux não constituem aceite Windows.

## Instalação e primeira execução

Extraia todas as partes complementares do pacote do jogo na **mesma pasta nova**, conforme o `LEIA_PRIMEIRO` da entrega. As partes são ZIPs independentes; não concatene os arquivos. Não extraia sobre a sua instalação em uso.

Abra o PowerShell na pasta extraída e confira a integridade:

```powershell
node --version
node .\scripts\verify-files.mjs
if ($LASTEXITCODE -ne 0) { throw 'A instalação está incompleta ou possui arquivos divergentes.' }
```

Use Node.js 24.13 ou posterior da linha 24. O pacote traz o build e o `ws` necessário ao servidor; para somente jogar, não precisa instalar o Blender nem as dependências de desenvolvimento.

Encerre o servidor anterior normalmente. Escolha um diretório **novo** para os dados desta validação e inicie diretamente, para não abrir automaticamente o perfil habitual do navegador:

```powershell
$labName = 'laboratorio-naquiro-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
$labPath = Join-Path (Split-Path -Parent $PWD.Path) $labName
if (Test-Path -LiteralPath $labPath) { throw 'Escolha uma pasta de laboratório nova.' }
New-Item -ItemType Directory -Path $labPath | Out-Null
$env:DB_PATH = Join-Path $labPath 'legado.sqlite'
$env:ACCOUNTS_DB_PATH = Join-Path $labPath 'contas.sqlite'
$env:PORT = '8787'
$env:ALLOWED_ORIGINS = 'http://127.0.0.1:8787,http://localhost:8787'
node .\build\server\src\index.js
```

O servidor fica na janela do PowerShell. Abra **uma janela anônima ou um perfil separado do navegador** e acesse `http://127.0.0.1:8787/?character=naquiro-male`. Isso conserva as chaves de retorno e sessões armazenadas no perfil usado pelos seus saves anteriores. Na criação, selecione **Confluência → Náquiros → Errante** e entre normalmente. O novo modelo é optativo; outras combinações conservam o visual anterior.

Ateliê: abra `http://127.0.0.1:8787/character-lab.html`. Teste as vistas e cada clip. Jump/Land/Swim são demonstrações no ateliê, sem mecânicas novas no mundo.

Se usar contas previamente criadas nesse laboratório pelos procedimentos B1 existentes, entre por `http://127.0.0.1:8787/accounts.html?character=naquiro-male`. A criação/seleção deve respeitar a configuração de classes do servidor. Este incremento não cria automaticamente contas ou credenciais.

Use `Ctrl+C` na janela do servidor e aguarde a mensagem de encerramento antes de reiniciar. Não use `node --watch` para esta validação de distribuição.

## Opcional: criar contas fechadas no laboratório

Para testar o fluxo de contas, pare o servidor por `Ctrl+C`. Na **mesma janela PowerShell**, mantendo os caminhos novos definidos acima, instale as dependências de desenvolvimento e provisione credenciais privadas novas:

```powershell
npm.cmd ci --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw 'Falha na instalação das ferramentas de teste.' }
node --import tsx .\scripts\account-admin.ts create $env:ACCOUNTS_DB_PATH (Join-Path $labPath 'conta1.private.json')
if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar a primeira conta de laboratório.' }
node --import tsx .\scripts\account-admin.ts create $env:ACCOUNTS_DB_PATH (Join-Path $labPath 'conta2.private.json')
if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar a segunda conta de laboratório.' }
node .\build\server\src\index.js
```

Abra `/accounts.html?character=naquiro-male` no navegador separado e informe o campo `token` do arquivo privado da conta. Crie um Náquiro/Errante e entre no mundo. Não envie esses arquivos ou tokens em capturas/relatórios. O comando recusa sobrescrever uma credencial existente; não reutilize os caminhos de produção. Para testar dois jogadores, use contas diferentes. Para o controle negativo de sessão, tente entrar duas vezes com a mesma conta e confirme que a primeira permanece ativa.

## Verificação no seu PC

1. Confirme que `/health` retorna `ok: true` e `version: 0.3.1-naquiro.1`.
2. No ateliê, aguarde o carregamento, alterne as 11 animações e teste pausa, linha do tempo, giro e topologia. Compare frente/perfil/costas e aproximações com a referência.
3. No jogo, caminhe, encoste em obstáculos, gire/aproxime a câmera, selecione alvos, ataque e use habilidades. Confira roupa, mãos/arco e deformação em movimento.
4. Ative efeitos reduzidos e confirme que as animações essenciais continuam funcionando. Abra mochila/diário e confirme que as ações existentes permanecem acessíveis.
5. Entre com uma segunda conta/personagem de laboratório. Verifique posições e ações independentes; confirme que a proteção de uma sessão por conta continua recusando a segunda sessão da mesma conta.
6. Encerre normalmente, reinicie com os mesmos caminhos e retome o personagem. Compare inventário, missão e posição conforme o comportamento existente de retorno.
7. Abra o jogo sem `?character=naquiro-male` e confirme o visual anterior com os mesmos dados. Não há migração visual para desfazer no banco.

Registre Windows, Node, navegador, GPU, resolução e qualidade. Inclua vídeo contínuo de locomoção/combate, capturas e erros do console. Meça desempenho em uma rota repetível; uma captura estática não comprova FPS.

## Build e testes no Windows

Na distribuição completa com fontes:

```powershell
npm.cmd ci --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw 'Falha na instalação das dependências.' }
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Build falhou.' }
node --import tsx --test tests/character.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Regressões do personagem falharam.' }
npm.cmd test
if ($LASTEXITCODE -ne 0) { throw 'A suíte completa falhou.' }
```

O build local pode gerar bundles com bytes diferentes dos previamente distribuídos. Nesse caso, o manifesto da distribuição deixa de ser uma verificação do seu build: preserve o manifesto original, não altere hashes para esconder falhas e use `npm.cmd start` para executar o build local após os checks.

A referência executada no Linux foi 14/14 testes do personagem e 109/109 na suíte completa. Registre separadamente o resultado real no Windows; não altere expectativas ou timeouts para obter esses números.

## Abrir e regenerar no Blender local

O pacote separado de fontes de arte contém o `.blend`, o GLB e os scripts. Abra `naquiro-male.blend` no Blender para editar o rig e os Actions. O GLB portátil serve à importação/inspeção; o runtime usa o glTF e os PNGs de mesma origem.

Para regenerar, extraia as fontes no diretório `art-source\naquiro-male` de uma cópia de desenvolvimento. Confira a versão e ajuste o caminho do executável da sua instalação:

```powershell
$blenderPath = 'C:\Program Files\Blender Foundation\Blender 4.3\blender.exe'
& $blenderPath --version
if ($LASTEXITCODE -ne 0) { throw 'Confira o caminho do Blender.' }
$env:EDF_SKIP_PREVIEWS = '1'
$env:EDF_MODEL_EVIDENCE = Join-Path $PWD.Path 'evidencias-modelo-local'
$env:OPENBLAS_NUM_THREADS = '1'
$env:OMP_NUM_THREADS = '2'
& $blenderPath --background --threads 2 --python .\art-source\naquiro-male\model.py
if ($LASTEXITCODE -ne 0) { throw 'A geração da base falhou.' }
& $blenderPath --background --threads 2 --python .\art-source\naquiro-male\rig_export.py
if ($LASTEXITCODE -ne 0) { throw 'A exportação do rig falhou.' }
npm.cmd run build
```

Esses comandos regeneram arquivos de arte/build, **não bancos**. Faça isso numa cópia para preservar modificações artísticas manuais. A versão executada na nuvem é Blender 4.3.2; outras versões precisam de validação do exportador. Os comandos PowerShell ainda dependem de execução no Windows do usuário.

## Preservar saves e retornar à versão anterior

Os saves de produção não precisam ser movidos para avaliar o candidato. Para testar continuidade com dados antigos, primeiro encerre a instalação antiga, confirme que não há processo escritor e faça um checkpoint frio de todo o diretório de dados e de qualquer banco configurado fora dele. Preserve também WAL/SHM e credenciais de retorno existentes; nunca copie um SQLite que esteja sendo gravado.

Use **cópias** desses dados numa pasta de laboratório e os mesmos caminhos de configuração usados pelo seu fluxo anterior. Não aponte as duas versões para o mesmo banco simultaneamente. Não apague locks de contas para forçar a entrada; a recuperação de lock continua seguindo os procedimentos B1.1 existentes.

O rollback visual é remover o parâmetro experimental da URL. Para rollback de aplicação, encerre o servidor e volte à instalação anterior preservada. Não copie dados de teste sobre os originais nem use `git reset --hard` numa pasta com trabalho próprio. Este incremento não adiciona esquema de banco ou converte saves.
