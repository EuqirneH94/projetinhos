# Escopo entregue — Alpha 0.2

Base: pacote EDF-B11(3).zip, com o projeto interno B1.1 de 98 arquivos conferidos
antes da edição. A base passou nos 50 testes anteriores no ambiente desta execução.
Não foi realizada migração para Unreal, nem acesso ao computador Windows do usuário.

## Decisões preservadas

- Ecos dos Faróis; Fantasia Heroica Arcana; universo e recursos originais.
- A Vigília: Valdários/Kordrânios. A Confluência: Elúvios/Náquiros.
- Sentinela, Arcanista, Errante e Ressonante.
- Combate Tab Target, autoataques, hotbar e servidor autoritativo.
- Facção → povo → classe → aparência → nome no editor compacto; a seleção
  atualiza o modelo 3D.
- Aparência sem aumento de dano, vida ou permissões.
- Histórias locais distintas que investigam a mesma instabilidade.
- Escolhas de consequência moderada, gravadas por personagem, sem trocar facção
  ou eliminar NPCs essenciais para outros jogadores.
- Corrupção inicial sem consciência: o Núcleo Fraturado é uma manifestação instável,
  não um comandante inteligente antecipando a revelação futura.
- Áudio V1.1 com ressonâncias breves, pulsos encorpados e menos notas sustentadas.
- Contas controladas em SQLite separado; sem conversão automática de saves legados.

O pedido atual autorizou avançar dos metadados da B1 para kits experimentais da Alpha.
Os nomes e valores dos vinte comandos não são apresentados como catálogo final aprovado.
Os NPCs candidatos receberam falas de teste; suas biografias e vozes definitivas não
foram aprovadas ou produzidas por este código.

## Implementação

| Área | Conteúdo concreto | Limite |
|---|---|---|
| Visual | Terreno, textura procedural, casas, vegetação, montanhas, água, Farol e efeitos | Modelos gerados em código; não equivalência às artes conceituais |
| Povos | Silhueta, pele, cabelo e traços minerais/botânicos/anfíbios | Três variantes; anatomia e proporções experimentais |
| Classes | Arma, equipamento inicial, cinco comandos, conjuração, proteção e cura | Parâmetros de laboratório, sem árvores ou especializações finais |
| Facções | Ambientes com paletas/nomes distintos e simulações isoladas | Mesma estrutura compacta de mapa; não capitais/campanhas completas |
| Missões | Proteção local, ecos, elite e restauração com duas escolhas | Pequeno arco; diálogos em texto |
| Persistência | Carteira, níveis, itens, história e identidade | Um processo por banco; sem infraestrutura de produção |
| Multiplayer | Presença, combate e eventos confirmados pelo servidor | Testes de poucas conexões; sem promessa de escala MMORPG |
| Áudio | Sete estudos V1.1 integrados, passos, interface e música procedural com variação regional | Sem dublagem de NPC e sem trilha orquestral final |

## Separação de progresso

O servidor filtra jogadores, criaturas, loot e eventos pela facção. O estado de restauração
do Farol é progresso pessoal: dois jogadores da mesma facção podem estar em etapas
diferentes sem reescrever a missão do outro. As recompensas são concedidas uma única vez.

Conjurações e barreiras são estados temporários de sessão. A conjuração é interrompida
por movimento ou morte; o estado de conjuração não é salvo para reaparecer após reconexão.
As duas soluções da restauração têm o mesmo prêmio e alteram a fala de desfecho.

## Trabalho futuro preservado

Herdeiros Celestiais: descendência celestial/mortal, origem neutra e escolha de facção,
prevista após a revelação celestial na primeira expansão. Celestiais Puros não jogáveis.
Ascendente inicialmente exclusivo dos Herdeiros: Ruptura, Bastião e Harmonia; armas por
especialização e Despertar Ancestral adaptado. Nenhum desses elementos foi antecipado na Alpha.

Masmorras comuns de cinco e duração-alvo de 20–30 minutos continuam planejadas.
Raids de 10–20 foram adiadas. Voo livre permanece futuro e ilimitado após desbloqueio,
sem barra de resistência para limitar a duração; não foi implementado nesta entrega.

Os próximos incrementos dependem de avaliação do percurso, arte, conforto de câmera,
combate, áudio e desempenho em hardware real, além do planejamento dos sistemas ausentes.
