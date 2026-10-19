# Abrir e avaliar o corpo base 002 no Windows

Use uma pasta nova, fora da instalação atual do jogo. Esta entrega é um estudo Blender: não exige iniciar o servidor, alterar os bancos ou mover saves. Os comandos abaixo ainda precisam ser executados no seu Windows; a validação de produção desta entrega foi feita no Linux.

## Baixar e conferir

Abra o PowerShell e execute o bloco inteiro. Ele cria uma pasta nova dentro da pasta atual, baixa os dois ZIPs independentes e compara seus hashes com o manifesto publicado.

```powershell
$ErrorActionPreference = 'Stop'
$downloadDir = Join-Path $PWD.Path ('EDF-Naquiro-Anatomia-002-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
if (Test-Path -LiteralPath $downloadDir) { throw 'Escolha uma pasta nova para esta entrega.' }
New-Item -ItemType Directory -Path $downloadDir | Out-Null
$rawBase = 'https://raw.githubusercontent.com/EuqirneH94/projetinhos/refino/edf-naquiro-anatomia-002/entregas/Personagens-3D/003-anatomia'
$manifest = Join-Path $downloadDir 'SHA256SUMS.txt'
Invoke-WebRequest -UseBasicParsing -Uri "$rawBase/SHA256SUMS.txt" -OutFile $manifest
$zipNames = @(
    'Ecos_dos_Farois_Naquiro_Anatomia_002_Fontes.zip',
    'Ecos_dos_Farois_Naquiro_Anatomia_002_Vistas.zip'
)
foreach ($name in $zipNames) {
    $target = Join-Path $downloadDir $name
    Invoke-WebRequest -UseBasicParsing -Uri "$rawBase/$name" -OutFile $target
    $pattern = '^[0-9a-fA-F]{64}\s+\*?' + [regex]::Escape($name) + '$'
    $entry = @(Get-Content -LiteralPath $manifest | Where-Object { $_ -match $pattern })
    if ($entry.Count -ne 1) { throw "Entrada SHA-256 ausente ou ambigua para $name" }
    $expected = ($entry[0] -split '\s+')[0]
    $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    if ($actual -ine $expected) { throw "SHA-256 divergente: $name. Nao extraia este arquivo." }
    Write-Host "SHA-256 OK: $name"
}
$fontesDir = Join-Path $downloadDir 'Fontes'
$vistasDir = Join-Path $downloadDir 'Vistas'
Expand-Archive -LiteralPath (Join-Path $downloadDir $zipNames[0]) -DestinationPath $fontesDir
Expand-Archive -LiteralPath (Join-Path $downloadDir $zipNames[1]) -DestinationPath $vistasDir
Write-Host "Entrega extraida em: $downloadDir"
```

Se o download direto falhar, abra a [pasta no GitHub](https://github.com/EuqirneH94/projetinhos/tree/refino/edf-naquiro-anatomia-002/entregas/Personagens-3D/003-anatomia), selecione cada arquivo e use **Download raw file**. Confirme que os arquivos terminam em `.zip` e não foram salvos como página HTML. Não extraia sobre a instalação em uso. Não concatene os ZIPs.

## Abrir no Blender

Ajuste o caminho para a sua instalação. A versão usada na nuvem foi **Blender 4.3.2**; versões posteriores devem ser conferidas localmente. O bloco usa as variáveis da mesma janela PowerShell do download.

```powershell
$blenderPath = 'C:\Program Files\Blender Foundation\Blender 4.3\blender.exe'
if (-not (Test-Path -LiteralPath $blenderPath)) { throw 'Ajuste o caminho do Blender instalado.' }
& $blenderPath --version
if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel executar o Blender.' }
$blendFiles = @(Get-ChildItem -LiteralPath $fontesDir -Recurse -File -Filter 'naquiro-anatomia-002.blend')
if ($blendFiles.Count -ne 1) { throw 'Esperado exatamente um arquivo naquiro-anatomia-002.blend.' }
$blendPath = $blendFiles[0].FullName
Start-Process -FilePath $blenderPath -ArgumentList ('"{0}"' -f $blendPath)
```

No Blender, use **File → Save As** e salve uma cópia com outro nome antes de editar. Mantenha o arquivo entregue intacto para comparação. Não é necessário autorizar execução automática de scripts embutidos para examinar o modelo e suas câmeras.

No Outliner, deixe `00_CHECKPOINT_001_OCULTO`, `80_COMPARACAO_001_NEUTRA_OCULTA` e `90_WIREFRAME_CAGE_OCULTO` ocultas ao avaliar a anatomia atual. As coleções `01` e `02` mostram a anatomia neutra. Não reative as roupas para julgar as transições do corpo.

Confira as câmeras `CAM_front`, `CAM_side` e `CAM_back`, e as aproximações de rosto, ombros, mãos, pés e orelha. Selecione a câmera e use **View → Cameras → Set Active Object as Camera**, seguido de **View → Cameras → Active Camera**. A escala de 2,25 unidades é técnica, não uma medida canônica.

Para ver a malha de controle, selecione o corpo, entre em Edit Mode e ative as sobreposições de arestas. Para a coleção de wireframe, oculte `01` e `02` antes de exibir `90`, evitando superfícies duplicadas. Examine o rig em Pose Mode somente na cópia de trabalho; ele é um rig de estudo, sem substituir o rig que o jogo já usa.

## Repetir a inspeção e gerar vistas localmente

Os comandos opcionais abaixo leem o `.blend` entregue e gravam apenas novas evidências. Não executam a geração do corpo nem exportam arquivos para o jogo. Mantenha o PowerShell e as variáveis dos blocos anteriores.

```powershell
$studyDir = Split-Path -Parent $blendPath
$inspectScript = Join-Path $studyDir 'inspect_study.py'
$renderScript = Join-Path $studyDir 'render_study.py'
if (-not (Test-Path -LiteralPath $inspectScript)) { throw 'Fonte inspect_study.py nao encontrada ao lado do blend.' }
if (-not (Test-Path -LiteralPath $renderScript)) { throw 'Fonte render_study.py nao encontrada ao lado do blend.' }
$localEvidence = Join-Path $downloadDir ('evidencias-locais-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
if (Test-Path -LiteralPath $localEvidence) { throw 'Escolha outra pasta de evidencias.' }
New-Item -ItemType Directory -Path $localEvidence | Out-Null
$before = (Get-FileHash -LiteralPath $blendPath -Algorithm SHA256).Hash
$env:OPENBLAS_NUM_THREADS = '1'
$env:OMP_NUM_THREADS = '2'
& $blenderPath --background --threads 2 --python-exit-code 1 --python $inspectScript -- --blend $blendPath --out (Join-Path $localEvidence 'inspecao')
if ($LASTEXITCODE -ne 0) { throw 'Inspecao falhou. Preserve o log e inspection-report.json para diagnostico.' }
& $blenderPath --background --threads 2 --python-exit-code 1 --python $renderScript -- --blend $blendPath --out (Join-Path $localEvidence 'vistas') --engine workbench --mode neutral --pose rest --views front,side,back
if ($LASTEXITCODE -ne 0) { throw 'Renderizacao falhou. Preserve as mensagens do Blender.' }
$after = (Get-FileHash -LiteralPath $blendPath -Algorithm SHA256).Hash
if ($before -ine $after) { throw 'O blend recebido foi modificado durante a verificacao.' }
Write-Host "Blend preservado. Evidencias locais: $localEvidence"
```

`--python-exit-code 1` torna uma exceção Python um erro de processo verificável. Não remova essa opção para contornar uma falha. Consulte o `inspection-report.json` e os manifestos de render para distinguir verificações estruturais de avaliação artística.

A regeneração por `build_study.py` é uma operação de desenvolvimento: depende também dos arquivos originais `base.blend`, `naquiro-male.blend` e das fontes anteriores disponíveis no repositório. O pacote do estudo abre independentemente deles. Não execute o gerador sobre o arquivo entregue ou sobre uma cópia com ajustes manuais; se precisar reproduzir a construção, faça outro checkout/pasta de trabalho e use um caminho de saída novo.

## Registrar a avaliação

1. Compare frente, perfil e costas em material neutro com VIS-018, VIS-019 e VIS-020. Observe silhueta, ombros, axilas, tronco e pelve.
2. Examine cabeça e perfil: mandíbula, nariz, lábios, encaixe dos olhos e raízes das barbatanas auriculares.
3. Examine as duas faces das mãos, os pés e as membranas. Registre sobreposições, vincos e problemas de contato.
4. Confira arestas e loops; não confunda a superfície subdividida com a malha de controle.
5. Revise as poses fornecidas e teste articulações na cópia. Registre perdas de volume ou interseções; pesos de estudo continuam exigindo polimento.

Guarde capturas com nome da câmera, versão do Blender e observação objetiva. Este estudo não altera o visual em execução do jogo. A avaliação de roupas, texturas detalhadas e efeitos fica para a etapa seguinte. O aceite visual humano permanece pendente.
