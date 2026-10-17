# Desenvolvimento em quatro etapas

Os checkpoints são versões reais do código, empacotadas antes de avançar. A pasta principal contém a versão final, com áudio solicitado durante o desenvolvimento.

Para explorar um checkpoint, extraia seu ZIP em **outra pasta vazia**. No **PowerShell local**, entre na pasta extraída que contém `package.json` e execute:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd test
npm.cmd run dev
```

Abra http://localhost:5173. Pare a execução da versão principal antes, pois as portas são as mesmas. Esses checkpoints não incluem Node ou node_modules.

| Etapa | Arquivo | O que verificar |
| --- | --- | --- |
| 1 | `checkpoints/etapa-01.zip` | Vila, floresta, câmera, colisão, entrada e dois jogadores sincronizados. Há apenas movimento; combate e progresso durável ainda não existem. |
| 2 | `checkpoints/etapa-02.zip` | Selecionar inimigos, golpes/recargas, IA, morte e reaparecimento. A coleta, missão e progressão ficam para a etapa seguinte. |
| 3 | `checkpoints/etapa-03.zip` | Aceitar/entregar missão, coletar saque, equipar itens, usar poções e ganhar níveis. Sessões ainda vivem na memória do servidor. |
| 4 | Raiz `reinos-de-nexo/` | SQLite, recuperação após reiniciar, reconexão, revisão, documentação, testes e todo o módulo sonoro. |

Nas etapas 1–3, fechar o servidor perde as sessões. Não use esses snapshots para jogar com progresso durável. Seus bancos/formatos não devem ser misturados com a versão final.

Validações durante a construção: etapa 1 passou por compilação e 3 testes; etapa 2 por compilação e 6 testes; etapa 3 por compilação e 11 testes. O relatório final está em `VERIFICACAO.md`.
