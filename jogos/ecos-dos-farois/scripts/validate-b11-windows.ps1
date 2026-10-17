param([ValidateRange(1,100)][int]$Repetitions=20)
$ErrorActionPreference='Stop'
if ($env:OS -ne 'Windows_NT') { throw 'Execute em Windows real.' }
Set-Location (Split-Path $PSScriptRoot -Parent)
$EvidenceDirectory=Join-Path (Get-Location) ('evidencias-b11-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $EvidenceDirectory -ErrorAction Stop | Out-Null
function Invoke-Checked {
  param([string]$Executable,[string[]]$CommandArguments,[string]$Label)
  $LogPath=Join-Path $EvidenceDirectory ($Label+'.log')
  # Windows PowerShell 5.1 represents native stderr (including Node warnings)
  # as ErrorRecords. Preserve it and check the actual native exit status.
  $ErrorActionPreference='Continue'
  & $Executable @CommandArguments *> $LogPath
  $NativeExitCode=$LASTEXITCODE
  $ErrorActionPreference='Stop'
  Get-Content -LiteralPath $LogPath
  if ($NativeExitCode -ne 0) { throw "$Label falhou: exit $NativeExitCode; veja $LogPath" }
}
$NodeVersion=(& node -p 'process.version').Trim()
if ($NodeVersion -ne 'v24.14.0') { throw "Esta comparação exige v24.14.0; instalado: $NodeVersion" }
Invoke-Checked -Executable node -CommandArguments @('-p','JSON.stringify({node:process.version,platform:process.platform,arch:process.arch,versions:process.versions})') -Label 'runtime'
Invoke-Checked -Executable node -CommandArguments @('scripts/verify-files.mjs') -Label 'manifest-before-build'
Invoke-Checked -Executable npm.cmd -CommandArguments @('ci','--no-audit','--no-fund') -Label 'install'
Invoke-Checked -Executable npm.cmd -CommandArguments @('run','build') -Label 'build'
Invoke-Checked -Executable node -CommandArguments @('--import','tsx','--test','tests/lifecycle.test.ts') -Label 'lifecycle'
for ($Iteration=1; $Iteration -le $Repetitions; $Iteration++) {
  Invoke-Checked -Executable node -CommandArguments @('--import','tsx','--test','--test-name-pattern=SQLite','tests/integration.test.ts') -Label ("sqlite-$Iteration")
}
Invoke-Checked -Executable npm.cmd -CommandArguments @('test') -Label 'suite'
# The probe uses ONLY its own temporary DBs/PIDs. It exercises the real watcher
# and deliberately terminates its OWN Windows process tree, never all node.exe.
$WatchOutput=Join-Path (Split-Path $EvidenceDirectory -Leaf) 'watch'
Invoke-Checked -Executable node -CommandArguments @('--import','tsx','scripts/probe-watch.mjs',$WatchOutput) -Label 'watch-probe'
Get-ChildItem -LiteralPath $EvidenceDirectory -Recurse -File | ForEach-Object {
  $Digest=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLower()
  "$Digest  $($_.FullName.Substring($EvidenceDirectory.Length+1))"
} | Set-Content -LiteralPath (Join-Path $EvidenceDirectory 'SHA256SUMS.txt') -Encoding ASCII
Write-Host "Validação automatizada finalizada. Evidências: $EvidenceDirectory"
Write-Host 'Ainda exigidos: fluxo manual da instalação afetada, persistência após reinício e revisão da causa Windows original. B2 bloqueado.'
