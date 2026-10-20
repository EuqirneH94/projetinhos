# Portal dos Heróis — primeiro ciclo local

Este fluxo reutiliza o `AccountStore` real (SQLite) e mantém os saves legados separados.

## Windows PowerShell

1. Faça cópia da pasta do projeto antes de atualizar o código. Pare qualquer processo Node da cópia em uso.
2. Na raiz deste repositório, execute `npm.cmd ci --no-fund --no-audit`.
3. Com o servidor parado, execute `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\INICIAR_CONTAS_WINDOWS.ps1 -CriarConta`. Guarde a chave exibida sem enviá-la a ninguém.
4. Execute `npm.cmd run build` e `npm.cmd test`.
5. Inicie com `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\INICIAR_CONTAS_WINDOWS.ps1 -IniciarJogo`.
6. Abra `http://localhost:5173/accounts.html`, cole sua chave **no navegador local** e crie personagem dentro das combinações canônicas.
7. Clique em **Entrar no mundo**. A sessão da conta é mantida somente na guia atual (`sessionStorage`).

**Não** use `DB_PATH` como `ACCOUNTS_DB_PATH`. Não execute o provisionador com o servidor em execução. O arquivo `data/edf-accounts-v1.sqlite` é local, sensível e não deve ir ao GitHub.

## Critérios de verificação

- A conta autentica, lista personagens e permite criar até oito.
- Facção Vigília aceita Valdários/Kordrânios; Confluência aceita Elúvios/Náquiros.
- O personagem selecionado entra no Vale; progresso deve permanecer após desconectar e retornar.
- A mesma conta não controla simultaneamente dois personagens em sessões concorrentes.
- A versão antiga com token legado continua em banco distinto e sem migração automática.

**Limites desta etapa:** provisionamento local manual; não há cadastro público nem recuperação de credenciais por e-mail. Cidades iniciais específicas, masmorra e arte final ainda dependem de novas implementações e testes.
