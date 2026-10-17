> **Atualização operacional B1.1:** o lock agora usa guard SQLite permanente e metadado V2. Apenas V2 com proprietário comprovadamente morto pode ser isolado automaticamente sob guard exclusivo; locks B1 vazios continuam recusados. Consulte [RFC B1.1](RFC_001_B1_1.md) e [recuperação Windows](WINDOWS_001_B1_1.md). As regras abaixo que descrevem o lock vazio e 40 testes são registro da baseline B1, validada pelo usuário no Windows antes do incidente.

# Fundação001-B1 — contas fechadas de teste

Regras aprovadas: oito personagens por conta, ambos os lados, raças exclusivas e uma sessão de jogo por conta. Nesta conversa o usuário aprovou recusar a segunda sessão e16 pares raça×classe **como metadados**. Catálogo: A Vigília/valdarios+kordranios; A Confluência/eluvios+naquiros; sentinela/arcanista/errante/ressonante. UI mostra nomes acentuados. Classes não concedem kits/bônus novos; todos continuam no laboratório funcional existente, sem afirmar início canônico por facção.

## Ativação explícita

Sem ACCOUNTS_DB_PATH, o jogo preserva join/resume e SQLite v1. Para experimentar, usar **pasta nova**, instalar com npm ci e compilar com npm run build. Antes de iniciar o servidor, provisionar duas contas locais:

```powershell
New-Item -ItemType Directory -Path data -Force | Out-Null
node --import tsx scripts/account-admin.ts create data/accounts-b1.sqlite data/account1.private.json
if ($LASTEXITCODE -ne 0) { throw 'Provisionamento falhou.' }
node --import tsx scripts/account-admin.ts create data/accounts-b1.sqlite data/account2.private.json
if ($LASTEXITCODE -ne 0) { throw 'Provisionamento falhou.' }
$env:ACCOUNTS_DB_PATH = 'data/accounts-b1.sqlite'
$env:DB_PATH = 'data/legacy-lab.sqlite'
npm.cmd run dev
```

Arquivos de credencial são privados e não entram no Git/data de distribuição. O CLI não imprime token nem sobrescreve arquivo existente;30dias de validade fixa. Não enviar credencial em chat/log. Abrir a página `/accounts.html` do serviço local, conectar com a chave privada do arquivo e criar/selecionar personagens. O guia de entrega especifica as portas PowerShell. Ao voltar para o jogo, a chave/ID ficam em sessionStorage da aba, não em URL/localStorage. Sair limpa a sessão da aba; credencial de conta permanece válida até expiração/revogação. Não há cadastro público, senha, recuperação de conta ou auth de produção.

Só provisionar com o servidor de contas parado: um lock exclusivo por arquivo protege o banco. Caminhos físicos são normalizados; hardlinks de DB são recusados. Após crash, não remover lock cegamente: confirmar processo encerrado, preservar backup frio e só então revisar o lock órfão. Nenhuma remoção automática é feita. Um processo de mundo por arquivo; não há suporte a cluster/múltiplas regiões.

## Protocolo adicional (JSON /ws)

| Cliente | Campos | Resposta |
|---|---|---|
| account_login | token43base64url | account_ready + character_list, ou account_error |
| character_create | nickname,factionId,raceId,classId | character_list atualizado ou erro |
| character_list | nenhum | lista somente da conta autenticada |
| character_enter | characterId | character_entered + state, ou erro |
| character_leave | nenhum | grava estado/libera lease e responde character_left |

Campos extras, faction/race inválida e IDs de classe forjados são recusados no parser. Nomes seguem regra do protótipo(3–18); duplicação de nome não concede identidade ou propriedade, que dependem de UUID. Unicidade global de nomes/editor/exclusão recuperável não são implementados neste incremento; não confundir metadado com gameplay final.

account_ready informa quatro classes; character_list não publica carteira/inventário/tokens. AccountStore valida novamente proprietário/limite/combinação; constraints e transação garantem vagas. Login não é sessão ativa de jogo: duas abas podem listar uma conta, mas só uma adquire lease. Cada ação exige a credencial ainda válida e a lease do personagem. Revogação/expiração fecha a conexão de jogo. Cliente de conta nunca recebe token legado, nem pode usar join/resume para assumir outro personagem na mesma conexão.

Operações de game persistem no banco correspondente: players/sessions legados em DB_PATH; accounts/account_tokens/characters no arquivo novo, com application_id0x45444631 e user_version1 independente. `coins`,inventário,missão e progresso são por personagem; conta contém só identidade/credenciais. Não há transferência, banco compartilhado, guilda ou carteira de conta.

## Backup e retorno

Não há importação/conversão de saves v1. Banco legado recusado como contas é lido em modo readonly para verificar identidade antes de WAL/DDL. DB_PATH e ACCOUNTS_DB_PATH iguais são recusados no bootstrap. Banco de versão futura é recusado. Para backup frio, parar serviços, confirmar lock liberado e copiar DB e sidecars consistentes que existirem para pasta nova com hashes. Restaurar sempre em cópia nova, mantendo original; testes exercitam cópia fria/reabertura e integridade.

Rollback de código paraB0.1 ignora banco de contas e continua lendo saves v1. Isso não transfere personagens/progresso B1 para v1; o arquivo de contas deve ser preservado para retomada comB1. RFC descreve migração futura com checkpoint, staging e associação explícita, exigindo autorização específica. Não apagar DB, diminuir user_version ou associar raça/classe ao legado por inferência.

## Validação

npm run build; npm test(40 casos:21legados+19novos). Testes de contas isolados: `node --import tsx --test tests/accounts.test.ts tests/accounts-network.test.ts`. Cobrem16 pares de metadados,slots,FK/proprietário,leases,concorrência,revogação,gravação com falha,backup/reinício e preservação v1. Logs/screenshot/guia Windows estão no pacote de evidências. Windows B1 precisa de validação real; aceite Windows anterior é só da baselineB0.1.
