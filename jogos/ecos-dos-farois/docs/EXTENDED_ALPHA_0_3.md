# Alpha 0.3 — fabricação e vínculo de fera: recorte experimental

Fontes lidas: Bíblia EDF-GDB-1.1.0, documentos atuais `ITEMS_CRAFTING_ECONOMY.md`, `PROFESSIONS_AND_QUESTS.md` e `BEAST_COMPANIONS.md`; missão `EDF_Missao_Codex_Jogo_Jogavel.md`, item C.7. A base já possui a missão inicial e a jornada de restauração; o recorte novo exige a primeira missão concluída. Os nomes, números, espécies elegíveis, receita e limite de vínculos abaixo são experimentais. Não constituem catálogo aprovado ou sistema completo de profissões/estábulos.

## Fabricação jogável

A bancada de Alquimia fica na aldeia em x=2, z=14. Abates elegíveis do conteúdo existente concedem Seiva clara no recipiente separado do personagem (1 por Brumino, 2 por Cerne; limite experimental de 99). Não ocupa os 24 espaços da mochila. O ganho continua individual; não há depósito compartilhado da conta.

Uma receita prepara o tônico já existente: 2 seivas + 3 moedas → 1 tônico. O servidor exige missão inicial concluída, alcance de 3,2 m, visão livre, insumos, espaço para o resultado e sequência de operação correta. Mesmo que o cliente repita o pacote, cada operação é confirmada uma vez; a próxima operação só é liberada pelo serial confirmado. Falta de espaço mantém a carteira e os materiais intactos. Não há adoção de profissão, limite arbitrário de profissões ou árvore profissional simulada por menus.

API: `{type:"craft",recipeId:"tonico-caminho",operation:serial+1}`. Catálogo em `shared/extended.ts`. O número serial é persistido com o produto e os débitos no mesmo JSON do personagem, por uma única escrita SQLite. Uma falha da escrita ocorre antes da publicação da mudança em memória.

## Domesticação e comandos

Somente Errante, após a missão inicial. Neste recorte o Brumino comum é a espécie disponível. Cerne/chefe não recebem taxonomia de fera domesticável por conveniência. Rarezas, outras espécies e variantes aguardam catálogo.

Enfraqueça um Brumino vivo da sua facção a 20–40% de vida; selecione-o e inicie a captura a até 8 m com visão livre. O tempo de confiança é de 8 segundos do relógio do servidor. Cesse o autoataque, permaneça imóvel e não execute habilidades. Movimento, dano ao dono/fera, perda de alcance/visão, morte, desconexão ou reentrada interrompem a tentativa e liberam a reserva. Durante a tentativa a fera é reservada a um único dono e não aceita novos golpes de jogadores/companheiros. A reserva cancela ao desconectar; não fica persistida.

O enfraquecimento depende do dano atual do kit. Use ataques contados ou a Flecha especial/Rajada conforme nível e arma; dano excessivo derrota a criatura normalmente. Não há finalização não letal automática. A conclusão grava primeiro o vínculo e só então resolve o ator selvagem. Captura não dá XP/saque de abate. Há reaparecimento experimental do indivíduo comum após 22 segundos; o estado transitório dos spawns é reconstruído em reinício, sem promessa de cronograma de raras.

Cada personagem possui **um vínculo persistente neste recorte** e no máximo **um ator ativo**. Esse limite de armazenamento é experimental e menor que o estábulo proposto; não existe UI de quatro vagas falsas. Os comandos são Seguir, Permanecer, Passivo, Atacar, Recolher e Ativar. Seguir/Passivo acompanham o dono sem iniciar agressão; Atacar é explícito e revalida alvo, facção, alcance, visão e reserva. Movimento usa a colisão do servidor; ataque não atravessa paredes. Recolher/Ativar exigem 4 segundos fora de combate. Morte do dono recolhe o ator preservando o vínculo. Reconexão reconstrói um ator, nunca acrescenta um segundo.

API: `{type:"companion",action:"capture"|"attack",target:enemyId}`; demais ações `follow|stay|passive|recall|activate` não aceitam `target` nem dono livre. O servidor obtém o proprietário da sessão. `snapshot.companions` apresenta atores da mesma facção; `you.taming` apresenta progresso transitório; `you.companion` apresenta o vínculo confirmado.

## Compatibilidade e rollback

`materials`, `crafting` e `companion` são campos opcionais do JSON existente, com padrão seguro quando ausentes. Nenhuma tabela, versão SQLite, conta, credencial, lock ou save real foi alterado. Não há conversão automática. Saves antigos podem ser carregados sem esses campos. A cópia Alpha0.2 fornecida foi testada em um checkpoint sintético: leitura/gravação e retorno à Alpha0.3 preservaram também os campos novos. A versão antiga não apresenta os módulos novos; o ensaio não valida versões arbitrárias B0/B1 ou restaurar dados ativos. Use checkpoint frio, cópia separada e exclusividade confirmada para qualquer rollback. Testes usam bancos sintéticos temporários.

## Cobertura e limites explícitos

`tests/extended.test.ts` verifica protocolo adulterado, material individual/limite, distância/missão/insumos, mochila cheia, repetição/ordem, falha real SQLite por trigger, persistência/reabertura, classe/facção/espécie, interrupção por movimento/dano/desconexão, disputa entre dois donos, captura sem prêmio de abate, commit antes da resolução, falha de escrita sem vínculo parcial, reconexão, ativação repetida, morte do dono e parede. Esses são testes de domínio e armazenamento sintéticos; evidências de jornada/navegador são documentadas separadamente.

Ainda não entregues: progressão/especialização de profissão; catálogo completo; trocas; coleta e estações múltiplas; estábulo com múltiplos vínculos; renomear fera; raras/lendárias; progressão/equipamento/saúde própria da fera; IA defensiva/suporte; navegação global de caminho. A IA básica usa colisão local e pode precisar de ordem Seguir para contornar obstáculos. O ator não recebe dano individual neste recorte; a preservação após a morte do dono não equivale a um sistema de incapacitação de feras completo.
