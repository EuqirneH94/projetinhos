param(
    [switch]$CriarConta,
    [switch]$IniciarJogo
)
$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $project
$env:ACCOUNTS_DB_PATH = Join-Path $project 'data\edf-accounts-v2.sqlite'
Write-Host 'ECOS DOS FAROIS - CONTAS LOCAIS' -ForegroundColor Cyan
Write-Host 'Banco de contas isolado:' $env:ACCOUNTS_DB_PATH
if (-not (Test-Path -LiteralPath (Join-Path $project 'node_modules'))) {
    throw 'Dependencias nao encontradas. Execute npm.cmd ci primeiro.'
}
if ($CriarConta -and $IniciarJogo) { throw 'Escolha somente -CriarConta ou -IniciarJogo.' }
if ($CriarConta) {
    Write-Host 'ATENCAO: servidor deve estar parado. Nao compartilhe a chave privada.'
    & npm.cmd run account:create:local
    if ($LASTEXITCODE -ne 0) { throw 'Falha na criacao da conta local.' }
} elseif ($IniciarJogo) {
    Write-Host 'Abrindo servidor e cliente com contas locais habilitadas.'
    & npm.cmd run dev
    if ($LASTEXITCODE -ne 0) { throw 'O jogo encerrou com erro.' }
} else {
    Write-Host 'Criar conta: powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\INICIAR_CONTAS_WINDOWS.ps1 -CriarConta'
    Write-Host 'Iniciar jogo: powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\INICIAR_CONTAS_WINDOWS.ps1 -IniciarJogo'
    Write-Host 'Portal: http://localhost:5173/accounts.html'
}
