$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $project
$env:ACCOUNTS_DB_PATH = Join-Path $project 'data\edf-accounts-v1.sqlite'
Write-Host 'ECOS DOS FAROIS - CONTAS LOCAIS' -ForegroundColor Cyan
Write-Host 'Banco de contas isolado:' $env:ACCOUNTS_DB_PATH
Write-Host 'IMPORTANTE: nunca envie a chave privada em mensagens ou prints.'
Write-Host 'Para criar a primeira conta, pare o servidor e execute:'
Write-Host '  npm.cmd run account:create:local'
Write-Host 'Para iniciar o servidor, execute:'
Write-Host '  npm.cmd run dev'
Write-Host 'Painel: http://localhost:5173/accounts.html'
Write-Host ''
if (-not (Test-Path -LiteralPath (Join-Path $project 'node_modules'))) {
    Write-Host 'Dependencias nao encontradas. Execute npm.cmd ci antes de iniciar.' -ForegroundColor Yellow
}
