# Relatório técnico 001-B1.1 — candidata para validação

**Estado: parcial, sem aprovação da missão.** A fragilidade de encerramento e de recuperação foi reproduzida por injeção controlada e corrigida nos caminhos testados em Linux. A queda original do Windows ainda precisa de reprodução e diagnóstico real. Não há execução Windows nesta entrega; nenhum log Linux está rotulado como Windows. B2 permanece bloqueado.

## Diagnóstico sustentado pelas evidências

| Observação | Baseline B1 / Linux Node 24.14.0 | Candidata B1.1 / mesmo runtime |
|---|---|---|
| Entrada natural | autentica, entra e recebe 20 estados, sem queda | mesmo resultado |
| Exceção artificial após entrar | filho morre, pai watch vivo, porta fechada | diagnóstico tick e saída 1; pai watch aguarda alterações |
| Lock após essa exceção | vazio, permanece; reinício EEXIST | removido após fechar banco; reinício permitido |
| Morte forçada | arquivo vazio sem prova de proprietário | SO libera guard; V2 com PID morto é isolado, preservado e recuperado |
| Dois escritores/reinícios | proteção por wx, sem recuperação segura | guard permite um escritor; concorrente recusado |
| Lock vazio antigo/PID vivo | EEXIST | recusa explícita; conteúdo preservado |

A hipótese mais direta para o lock reaparecer é: cada inicialização legítima cria o lock; uma nova terminação antes de close deixa outro órfão. Isso é compatível com o relato, mas concorrência de instâncias também deve ser investigada. A nova candidata distingue guard ocupado, proprietário vivo/não verificável, metadado antigo e recuperação de proprietário morto. Não classifica todo EEXIST como órfão.

A seleção de personagem adquire lease e conecta o estado ao jogo. Depois disso passam a rodar step/snapshot/persistência, possíveis fontes de exceção. O recebimento de `character_entered` não prova que esses ciclos posteriores funcionam. Os testes novos entram por WebSocket em processo real e acompanham estados e encerramento. Não encontramos uma exceção natural em Linux nem identificamos um defeito específico de gameplay responsável pelo Windows.

## Ciclo de vida revisado

AccountStore normaliza caminho, recusa hardlink, adquire guard e metadado antes de abrir dados. Falhas de identificação/schema/inicialização liberam apenas seu lock. close fecha dados, limpa leases e libera o controle. Bootstrap mantém recursos de startup para limpeza; sinais e erros JS usam encerramento com timeout e evento exit como última limpeza síncrona. Morte forçada usa recuperação posterior sob guard, sem depender de callbacks.

Falha de gravação mantém health 503 e interrompe sessões; não confirma progresso. Fatal de tick/heartbeat ou JS encerra com status 1 sem flush de estado possivelmente inconsistente. O último estado confirmado no SQLite é preservado; não há promessa de salvar progresso volátil após crash. Encerramento normal tenta flush e propaga falha. A sessão é local ao processo: leases não sobrevivem à morte e são readquiridas no reinício, mantendo exclusividade pelo guard e por conta.

`--watch` supervisiona arquivos e pode permanecer aguardando alterações após o filho falhar. Esse comportamento foi observado em Linux e consta no log; não foi medido aqui no Windows. `--watch-preserve-output` evita apagar evidências. A candidata não pretende manter porta aberta depois de erro fatal nem instala loop de reinícios. Use processo direto na validação funcional para obter exit code inequívoco.

## Verificação executada

- Linux x64, Node **v24.14.0**, runtime oficial com checksum verificado: `41cd79bb7877c81605a9e68ec4c91547774f46a40c67a17e34d7179ef11729df` (tar.xz).
- `npm run check`: build/typecheck aprovados e **50/50 testes**, zero falhas/skips/cancelamentos. 40 anteriores + 10 regressões.
- **20/20** execuções isoladas do teste SQLite original, com uma execução real por repetição.
- Watch real: entrada natural com 20 snapshots; falha controlada de tick com diagnóstico e lock ausente; reabertura preservando conta/personagem/integridade.
- Regressões: entrada, rejeição não tratada, exceção não tratada, saída explícita, morte forçada, reinício e integridade/FK, dois reinícios concorrentes, lock B1 vazio, PID vivo, startup inválido, close idempotente, metadado substituído e schema inválido sem conversão.
- Entrada pelo build compilado: 20 estados, SIGINT com exit 0 e lock liberado (`compiled-server.log`/`compiled-client.log`). Backup frio sintético reaberto pela candidata → B1 original → candidata com linhas completas de personagem e conta preservadas (`rollback.log`).
- Todos os arquivos `tests/*.test.ts` existentes na B1 são byte a byte iguais, conforme `original-tests-preserved.json`. Controles negativos originais de persistência permanecem ativos.
- Avisos mantidos: SQLite experimental no Node 24.14.0 e tamanho de bundle Vite; nenhum foi convertido em aprovação artificial.

Evidências brutas acompanham a entrega. `baseline-*` usa fonte B1 sem modificações; `candidate-watch/` usa a candidata; `check.log` registra build/suíte; `repetitions-linux.*` registra 20 repetições. Horários dos logs em UTC. Bancos e credenciais sintéticos usados nos ensaios não são distribuídos. Não recebemos nem modificamos dados reais do usuário.

## Pendências e autorização da próxima etapa

1. Obter comando original, últimas linhas/stack e exit code do Windows, distinguindo crash JS, falha nativa, sinal e supervisor. Para falha nativa sem stack JS: Event Viewer/Windows Error Reporting com módulo e código de exceção; não enviar dumps com credenciais publicamente.
2. Executar script PowerShell em Windows real/Node 24.14.0: build, 50 testes, 20 SQLite, lifecycle e watch, preservando logs.
3. No ambiente afetado, após recuperação comprovadamente segura e backup, repetir login/criação/entrada, jogar, encerrar e reiniciar; verificar progressos, contas/personagens, integrity_check e FK.
4. Revisar evidências e demonstrar que o gatilho original deixa de provocar queda, ou identificar e corrigir sua causa adicional. Passar apenas testes artificiais não basta.
5. Aprovação funcional explícita após esses resultados. B2 continua bloqueado até lá.

Não há migração de dados, novas funcionalidades de jogo, conversão de bancos ou validação Windows alegada nesta candidata.
