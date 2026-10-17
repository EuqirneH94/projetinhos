$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

try {
    $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
    if (-not $nodeCommand) {
        throw 'Node.js nao encontrado. Instale Node.js 24 e abra este arquivo novamente.'
    }
    $nodeVersionText = (& node --version).Trim()
    $nodeVersion = [version]$nodeVersionText.TrimStart('v')
    if ($nodeVersion.Major -ne 24 -or $nodeVersion -lt [version]'24.13.0') {
        throw "Esta entrega requer Node.js 24.13 ou posterior da linha 24. Detectado: $nodeVersionText"
    }
    if (-not (Test-Path -LiteralPath 'build\server\src\index.js')) {
        throw 'Build do servidor ausente. Extraia o ZIP completo antes de executar.'
    }
    if (-not (Test-Path -LiteralPath 'client\dist\index.html')) {
        throw 'Build do cliente ausente. Extraia o ZIP completo antes de executar.'
    }
    if (-not (Test-Path -LiteralPath 'node_modules\ws\package.json')) {
        Write-Host 'Preparando dependencias. Esta etapa pode usar a internet.'
        & npm.cmd ci --no-audit --no-fund
        if ($LASTEXITCODE -ne 0) { throw 'A instalacao das dependencias falhou.' }
    }
    if (-not (Test-Path -LiteralPath 'MANIFEST.sha256')) {
        throw 'Manifesto de integridade ausente. Extraia novamente a entrega completa.'
    }
    Write-Host 'Conferindo a integridade dos arquivos...'
    & node 'scripts/verify-files.mjs'
    if ($LASTEXITCODE -ne 0) { throw 'A entrega tem arquivos ausentes ou modificados. Confira o relatorio acima.' }
    $gamePort = 8787
    if ($env:PORT) { $gamePort = [int]$env:PORT }
    $listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Loopback), $gamePort
    try { $listener.Start() }
    catch { throw "A porta $gamePort ja esta em uso. Feche a outra instancia antes de iniciar." }
    finally { $listener.Stop() }

    if (-not $env:DB_PATH) { $env:DB_PATH = Join-Path $PSScriptRoot 'data\ecos-alpha.sqlite' }
    if (-not $env:ALLOWED_ORIGINS) {
        $env:ALLOWED_ORIGINS = "http://127.0.0.1:$gamePort,http://localhost:$gamePort"
    }
    $ExpectedVersion = (Get-Content -LiteralPath 'package.json' -Raw | ConvertFrom-Json).version
    $openBrowser = Start-Job -ArgumentList $gamePort,$ExpectedVersion -ScriptBlock {
        param($port,$version)
        for ($attempt = 0; $attempt -lt 60; $attempt++) {
            try {
                $health = Invoke-RestMethod -Uri "http://127.0.0.1:$port/health" -TimeoutSec 2
                if ($health.ok -and $health.version -eq $version) {
                    Start-Process "http://127.0.0.1:$port/"
                    return
                }
            } catch { }
            Start-Sleep -Milliseconds 500
        }
    }
    Write-Host ''
    Write-Host 'ECOS DOS FAROIS - ALPHA JOGAVEL 0.3 - CANDIDATA'
    Write-Host "O navegador abrira em http://127.0.0.1:$gamePort/"
    Write-Host 'Mantenha esta janela aberta enquanto joga.'
    Write-Host 'Para encerrar e salvar, pressione Ctrl+C e aguarde o encerramento.'
    Write-Host ''
    try {
        & node 'build/server/src/index.js'
        if ($LASTEXITCODE -ne 0) { throw "O servidor encerrou com codigo $LASTEXITCODE. Preserve a mensagem acima." }
    } finally {
        Stop-Job -Job $openBrowser -ErrorAction SilentlyContinue
        Remove-Job -Job $openBrowser -Force -ErrorAction SilentlyContinue
    }
} catch {
    Write-Host ''
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
