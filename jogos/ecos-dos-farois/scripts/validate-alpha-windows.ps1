param([ValidateRange(1,100)][int]$Repetitions=20,[switch]$FullJourney,[switch]$Soak)
$ErrorActionPreference='Stop'
if ($env:OS -ne 'Windows_NT') { throw 'Este roteiro registra validação em Windows real.' }
Set-Location -LiteralPath (Split-Path $PSScriptRoot -Parent)
$EvidenceDirectory=Join-Path (Get-Location) ('evidencias-alpha03-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $EvidenceDirectory -ErrorAction Stop | Out-Null
function Invoke-Checked {
  param([string]$Executable,[string[]]$CommandArguments,[string]$Label)
  Get-Command $Executable -ErrorAction Stop | Out-Null
  $LogPath=Join-Path $EvidenceDirectory ($Label+'.log')
  # Preserve native stderr (Node SQLite warnings and deliberate negative tests)
  # without treating stderr alone as failure in Windows PowerShell 5.1.
  $ErrorActionPreference='Continue'
  & $Executable @CommandArguments *> $LogPath
  $NativeExitCode=$LASTEXITCODE
  $ErrorActionPreference='Stop'
  Get-Content -LiteralPath $LogPath
  if ($NativeExitCode -ne 0) { throw "$Label falhou: exit $NativeExitCode; preserve $LogPath" }
}
$NodeText=(& node -p 'process.version').Trim()
$NodeRelease=[version]$NodeText.TrimStart('v')
if ($NodeRelease.Major -ne 24 -or $NodeRelease -lt [version]'24.13.0') { throw "Use Node 24.13+ da linha 24. Detectado: $NodeText" }
Invoke-Checked -Executable node -CommandArguments @('-p','JSON.stringify({node:process.version,platform:process.platform,arch:process.arch,versions:process.versions})') -Label 'runtime'
Invoke-Checked -Executable node -CommandArguments @('scripts/verify-files.mjs') -Label 'manifest-before-build'
Invoke-Checked -Executable npm.cmd -CommandArguments @('ci','--no-audit','--no-fund') -Label 'install'
Invoke-Checked -Executable npm.cmd -CommandArguments @('run','build') -Label 'build'
Invoke-Checked -Executable npm.cmd -CommandArguments @('test') -Label 'suite'
for ($Iteration=1; $Iteration -le $Repetitions; $Iteration++) {
  Invoke-Checked -Executable node -CommandArguments @('--import','tsx','--test','--test-name-pattern=SQLite','tests/integration.test.ts') -Label ("sqlite-$Iteration")
}
Invoke-Checked -Executable node -CommandArguments @('--import','tsx','--test','tests/lifecycle.test.ts') -Label 'lifecycle'
if ($FullJourney) {
  $JourneyOutput=Join-Path (Split-Path $EvidenceDirectory -Leaf) 'journeys'
  Invoke-Checked -Executable node -CommandArguments @('--import','tsx','scripts/replay-slice.ts',$JourneyOutput) -Label 'four-class-journeys'
}
if ($Soak) {
  $SoakOutput=Join-Path (Split-Path $EvidenceDirectory -Leaf) 'soak'
  Invoke-Checked -Executable node -CommandArguments @('--import','tsx','scripts/soak-alpha.ts',$SoakOutput,'1800') -Label 'soak-real-30min'
}
Get-ChildItem -LiteralPath $EvidenceDirectory -Recurse -File | ForEach-Object {
  $Digest=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLower()
  "$Digest  $($_.FullName.Substring($EvidenceDirectory.Length+1))"
} | Set-Content -LiteralPath (Join-Path $EvidenceDirectory 'SHA256SUMS.txt') -Encoding ASCII
Write-Host "Resultados automáticos: $EvidenceDirectory"
Write-Host 'Complete o percurso gráfico, teste som/silêncio, câmera e persistência após reinício. Esta execução não concede aceite estético ou do incidente Windows original.'
