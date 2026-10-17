param(
  [Parameter(Mandatory=$true,Position=0)][string[]]$Arquivos,
  [ValidateRange(1,24)][int]$TamanhoMiB=24
)
$ErrorActionPreference='Stop'
foreach ($Caminho in $Arquivos) {
  $Item=Get-Item -LiteralPath $Caminho -ErrorAction Stop
  if ($Item.PSIsContainer -or $Item.Extension -ne '.zip') { throw 'Informe apenas os ZIPs originais.' }
  $Pasta=$Item.FullName+'-partes'
  if (Test-Path -LiteralPath $Pasta) { throw "Destino já existe: $Pasta. Preserve-o ou escolha outro local para o ZIP." }
  New-Item -ItemType Directory -Path $Pasta -ErrorAction Stop | Out-Null
  $Leitor=[System.IO.File]::Open($Item.FullName,[System.IO.FileMode]::Open,[System.IO.FileAccess]::Read,[System.IO.FileShare]::Read)
  try {
    $HashOriginal=(Get-FileHash -LiteralPath $Item.FullName -Algorithm SHA256).Hash.ToLower()
    $Buffer=New-Object byte[] (1MB)
    $Limite=[long]$TamanhoMiB*1MB
    $Indice=1
    $Partes=@()
    while ($Leitor.Position -lt $Leitor.Length) {
      $Nome='{0}.parte{1:D3}.bin' -f $Item.Name,$Indice
      $Destino=Join-Path $Pasta $Nome
      $Escritor=[System.IO.File]::Open($Destino,[System.IO.FileMode]::CreateNew,[System.IO.FileAccess]::Write,[System.IO.FileShare]::None)
      try {
        $Escritos=[long]0
        while ($Escritos -lt $Limite -and $Leitor.Position -lt $Leitor.Length) {
          $Quantidade=[int][Math]::Min($Buffer.Length,$Limite-$Escritos)
          $Lidos=$Leitor.Read($Buffer,0,$Quantidade)
          if ($Lidos -eq 0) { throw 'Leitura interrompida antes do fim do arquivo.' }
          $Escritor.Write($Buffer,0,$Lidos)
          $Escritos+=$Lidos
        }
        $Escritor.Flush($true)
      } finally { $Escritor.Dispose() }
      $Partes+=@{nome=$Nome;bytes=$Escritos;sha256=(Get-FileHash -LiteralPath $Destino -Algorithm SHA256).Hash.ToLower()}
      $Indice++
    }
    $Manifesto=@{formato='edf-partes-v1';original=$Item.Name;bytes=$Leitor.Length;sha256=$HashOriginal;partes=$Partes}
    $Manifesto | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $Pasta 'manifesto.json') -Encoding UTF8
    Write-Host "Original preservado: $($Item.Name)"
    Write-Host "SHA-256 original: $HashOriginal"
    Write-Host "Envie todos os arquivos de: $Pasta"
  } finally { $Leitor.Dispose() }
}
