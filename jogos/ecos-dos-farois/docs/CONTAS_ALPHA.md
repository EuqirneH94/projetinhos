# Contas de teste — Alpha 0.2

A implementação conserva a fundação de contas B1.1. Ela é opt-in e não converte o banco
do modo rápido. Uma conta permite até oito personagens de ambas as facções; apenas uma
sessão de jogo é adquirida por vez, mantendo a primeira quando outra tenta entrar.

Com o servidor parado, no **PowerShell local**, dentro da pasta do jogo:

```powershell
npm.cmd ci --no-audit --no-fund
node --import tsx scripts/account-admin.ts create data/accounts-alpha.sqlite data/conta-teste-01.json
```

O arquivo de credencial deve ser novo. O comando recusa sobrescrevê-lo. A credencial é
privada e não deve ser enviada em capturas ou relatórios.

Depois, ative o banco de contas e inicie o jogo:

```powershell
$env:ACCOUNTS_DB_PATH = Join-Path (Get-Location) 'data/accounts-alpha.sqlite'
.\Jogar_Ecos_dos_Farois.cmd
```

Na ajuda do jogo, abra **Gerenciar personagens de uma conta de teste**. Copie somente
o valor `token` do arquivo privado para essa tela. Ela permite criar, listar e entrar
com personagens elegíveis. A chave de conta é diferente da chave de personagem do
modo rápido. O banco de contas precisa ser um arquivo diferente de `DB_PATH`.

O iniciador padrão não ativa esse modo por conta própria. Cadastro público, recuperação
de conta, senha, email e hospedagem de produção não foram implementados.
