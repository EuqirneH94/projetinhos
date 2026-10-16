# Entrega Ecos dos Faróis001-B1

O pacote EDF-B1.zip contém o ZIP do jogo,patch,RFC,relatório,evidências,hashes e guia Windows. Extraia primeiro este pacote e siga EDF_001_B1_WINDOWS.md. A calculadora do repositório foi preservada; esta branch é apenas de entrega.

Linux validado: build e40/40 testes(21legados+19novos),20 repetições SQLite,browser,backup/rollback e controles de autorização. Aceite WindowsB1 pendente. Contas usam banco separado opt-in; não houve migração de saves. Classes são metadados,sem kits novos.

Para conferir o pacote no PowerShell:

```powershell
Get-FileHash -LiteralPath .\EDF-B1.zip -Algorithm SHA256
```

SHA256 esperado: `4fe9758a9bc32cae8c0fe11ff20af82552dfcd4e612482b08268f2641b208a59`.

EDF_001_B1_SHA256SUMS.txt confere os arquivos internos do pacote; EDF-B1.zip.sha256 confere o pacote externo. Não enviar credenciais,bancos ou saves pessoais ao registrar o aceite.
