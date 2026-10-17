# Jogar e validar no Windows — Alpha 0.3 candidata

A entrega é uma evolução da Alpha 0.2 enviada em duas partes, sem substituição da instalação anterior. Código, builds, sete áudios V1.1 e a dependência de execução `ws` acompanham o pacote. Para jogar, basta Node.js **24.13 ou posterior da linha 24**. Para comparar com os testes desta missão, use **24.14.0**.

Os comandos deste documento são PowerShell. O iniciador e os roteiros foram revisados; **não foram executados em Windows neste ambiente Linux**. A validação gráfica e sonora no computador do usuário continua necessária.

## 1. Extrair e iniciar

Baixe as duas partes e `SHA256SUMS.txt` pela página de entrega no GitHub, usando **Download raw file**. Elas são ZIPs independentes com arquivos complementares; não concatene seus bytes.

```powershell
Get-FileHash -LiteralPath '.\Ecos_dos_Farois_Alpha_0_3_Parte_1_de_2.zip' -Algorithm SHA256
Get-FileHash -LiteralPath '.\Ecos_dos_Farois_Alpha_0_3_Parte_2_de_2.zip' -Algorithm SHA256
# Compare com SHA256SUMS.txt antes de extrair.
$NovaPasta=Join-Path (Get-Location) 'EDF-Alpha03'
if (Test-Path -LiteralPath $NovaPasta) { throw 'Escolha uma pasta nova; preserve a instalação anterior.' }
New-Item -ItemType Directory -Path $NovaPasta | Out-Null
Expand-Archive -LiteralPath '.\Ecos_dos_Farois_Alpha_0_3_Parte_1_de_2.zip' -DestinationPath $NovaPasta
Expand-Archive -LiteralPath '.\Ecos_dos_Farois_Alpha_0_3_Parte_2_de_2.zip' -DestinationPath $NovaPasta -Force
Set-Location (Join-Path $NovaPasta 'Ecos_dos_Farois_Alpha_0_3')
node --version
node scripts/verify-files.mjs
.\Jogar_Ecos_dos_Farois.cmd
```

O navegador abre depois de `/health` identificar a versão `0.3.0-alpha`. Mantenha o terminal aberto. O endereço padrão é **http://127.0.0.1:8787/**. Não abra o HTML diretamente. Para encerrar, pressione **Ctrl+C no terminal do servidor** e aguarde `server_shutdown_complete`. Não encerre todos os processos Node da máquina e não apague locks para repetir tentativas.

O primeiro uso na pasta nova cria `data/ecos-alpha.sqlite`; não há importação automática de saves. Se `ws` ou builds estiverem ausentes, confira se extraiu as duas partes. O iniciador tenta `npm ci` quando falta a dependência de execução, exigindo internet.

## 2. Preservar a instalação e os saves anteriores

Para jogar com o progresso antigo, primeiro encerre o servidor anterior e comprove ausência de escritores/handles nos caminhos exatos. Preserve backup frio consistente da pasta de dados, WAL/SHM existentes e credenciais externas, sem remover sidecars ou guard. Não copie um SQLite ativo como se fosse backup consistente.

Exemplo de backup, **somente após manutenção exclusiva comprovada**, ajustando o caminho real:

```powershell
$DadosAnteriores='C:\CAMINHO-REAL\Ecos_dos_Farois_Alpha_0_2\data'
$Checkpoint=$DadosAnteriores+'-checkpoint-'+(Get-Date -Format 'yyyyMMdd-HHmmss-fff')
if (Test-Path -LiteralPath $Checkpoint) { throw 'Checkpoint já existe.' }
Copy-Item -LiteralPath $DadosAnteriores -Destination $Checkpoint -Recurse -ErrorAction Stop
Get-ChildItem -LiteralPath $Checkpoint -Recurse -File | ForEach-Object {
  "$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)  $($_.FullName.Substring($Checkpoint.Length+1))"
} | Set-Content -LiteralPath ($Checkpoint+'.sha256.txt') -Encoding ASCII
```

Credenciais e bancos de contas fora de `data` precisam de seu próprio checkpoint. Não envie esses arquivos em relatórios públicos. Na **pasta nova**, aponte explicitamente o caminho do banco escolhido, mantendo legado e contas separados:

```powershell
$env:DB_PATH=Join-Path $DadosAnteriores 'ecos-alpha.sqlite'
# Somente se já usava contas, informe o banco de contas real e separado:
# $env:ACCOUNTS_DB_PATH='C:\CAMINHO-REAL\accounts-alpha.sqlite'
.\Jogar_Ecos_dos_Farois.cmd
```

Não há mudança de tabela, `application_id` ou `user_version`. Novos campos opcionais de fabricação e companheiro ficam no JSON do personagem. Saves antigos recebem padrões em memória e continuam válidos. Isso não autoriza converter bancos B1/legados uns nos outros. Mantenha o mecanismo de lock/guard e as regras de recuperação conservadora documentadas na B1.1.

## 3. Percurso jogável e controles

Escolha facção → povo → classe → aparência → nome. Ambas as facções e as quatro classes têm kits iniciais; valores e nomes continuam experimentais. A entrada rápida usa chave de retorno de personagem; contas de oito vagas são um modo separado, opt-in, descrito em `CONTAS_ALPHA.md`.

| Ação | Tecla/controle |
|---|---|
| Caminhar | W A S D / setas |
| Girar câmera / zoom | Mouse direito e arrastar / roda |
| Selecionar | Tab ou clique |
| Autoataque | 1 / espaço |
| Habilidades | 2–5; Q/R também acionam 2/3 |
| Tônico | 6 |
| Interagir / coletar | E / F |
| Mochila / diário | I / J |
| Áudio / ajuda / fechar | M / H / Esc |

Converse com Capitã Elara (Vigília) ou Lyssara (Confluência), aceite a missão, vença três Bruminos e dois Cernes, recolha o saque e retorne. Equipe a recompensa na mochila. Sintonize os três ecos, desfaça o Núcleo Fraturado ao norte e volte ao Farol para escolher o desfecho. A escolha e as recompensas são pessoais. Os nomes e roteiros são candidatos de produção.

A barra de habilidades informa custo, alcance, recarga e motivo de indisponibilidade; passe o mouse ou use foco de teclado para detalhes e prévia de alcance/área. A prévia não garante acerto: o servidor ainda valida a ação. Abra **Áudio** para volumes independentes, silêncio e **Reduzir efeitos e movimento**. Os diálogos têm legendas; as gravações PT-BR ainda estão pendentes.

Depois da missão inicial, a bancada em **x=2, z=14**, junto à estrada, permite preparar um tônico com duas Seivas claras e três moedas. A receita e o recipiente de material separado são experimentais. Use E próximo à bancada ou o botão de Ofício na mochila. Sem espaço ou insumos, nada deve ser consumido.

O Errante pode vincular um Brumino comum: conclua a missão, deixe-o com **20–40% de vida**, pare o autoataque, selecione-o e abra **Companheiro** pela mochila. Fique imóvel a até 8 m durante os 8 segundos de confiança. Movimento, habilidades, dano ou perda de alcance interrompem. Depois há Seguir, Aguardar, Passivo, Atacar, Recolher e Chamar. Há um vínculo e um companheiro ativo neste recorte; não é um estábulo completo. A IA e o catálogo continuam provisórios.

## 4. Testes automatizados Windows

Abra um **PowerShell separado na raiz do jogo**; o servidor gráfico pode ser fechado para evitar confusão. Os testes e jornadas criam bancos sintéticos temporários, sem usar seus saves.

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\validate-alpha-windows.ps1 -Repetitions 20 -FullJourney -Soak
if ($LASTEXITCODE -ne 0) { throw 'Validação falhou; preserve as evidências.' }
```

`Bypass` vale apenas para essa invocação, sem mudar política permanente. Se a política da máquina impedir scripts, não altere políticas corporativas: execute os comandos abaixo individualmente. O roteiro registra instalação, build, suíte, 20 repetições SQLite, lifecycle, quatro jornadas e **30 minutos reais** de integração por protocolo. Leva mais de 30 minutos. As saídas ficam em `evidencias-alpha03-<data>`.

```powershell
npm.cmd ci --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw 'npm ci falhou' }
npm.cmd run check
if ($LASTEXITCODE -ne 0) { throw 'Build/testes falharam' }
npm.cmd run test:slice -- .\evidencias-jornadas
if ($LASTEXITCODE -ne 0) { throw 'Jornadas falharam' }
npm.cmd run test:soak -- .\evidencias-estabilidade 1800
if ($LASTEXITCODE -ne 0) { throw 'Estabilidade falhou' }
```

Conexões de protocolo não substituem o percurso visual no navegador. No teste manual, registre resolução/qualidade/GPU e confirme: entrada por ambos os lados, movimento e câmera junto a paredes, alvo/alcance/recarga, conversa, combate/recompensa/equipamento, silêncio/volumes/foco, saída e retomada. Compare valores reais de progresso após reiniciar. Não use teleporte ou grants para anunciar jornada concluída.

## 5. Servidor e cliente separados para desenvolvimento

É necessário `npm.cmd ci`. Na raiz do projeto, **Terminal 1**:

```powershell
$env:HOST='127.0.0.1'
$env:PORT='8787'
$env:ALLOWED_ORIGINS='http://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:8787,http://localhost:8787'
npm.cmd run dev:server
```

**Terminal 2**, na mesma raiz:

```powershell
npm.cmd run dev:client
```

Abra **http://127.0.0.1:5173/**. `node --watch` pode permanecer vivo esperando alterações após o filho morrer; confira `/health`, PID/erro e log, sem assumir que o supervisor é o servidor. Porta alternativa exige origem correspondente em `ALLOWED_ORIGINS`.

## 6. Rollback e pendências de aceite

Não há rollback automático de dados nem restauração sobre arquivo ativo. Preserve a Alpha 0.2 e o checkpoint. Pare a candidata, confirme exclusividade e faça um novo backup frio antes de voltar ao código anterior. O ensaio sintético Alpha0.3 → Alpha0.2 fornecida → Alpha0.3 preservou campos e credencial; isso não é uma restauração do seu banco nem valida versões arbitrárias mais antigas. Confira uma **cópia** do checkpoint em pasta nova; uma restauração implica perder progresso posterior e exige sua decisão. Não inicie duas versões escrevendo no mesmo banco nem apague controles para forçar abertura.

Esta missão não identificou a causa original do incidente Windows B1.1. Testes Linux, erros provocados e o soak não homologam esse incidente. Também não comprovam desempenho em GPU de jogos, conforto auditivo, dublagem pronta ou acabamento equivalente às artes conceituais. A candidata continua sujeita a validação Windows e aprovação visual do usuário.
