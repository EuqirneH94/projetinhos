# Auditoria da representação de personagens

## Escopo e rastreabilidade

Inspeção da Alpha `0.3.0-alpha`, commit `fe8f7db487da9b58e1cc17a3fd06209b8099b3c6`. Os caminhos e linhas abaixo referem-se a `jogos/ecos-dos-farois` nesse commit. A entrega altera apenas documentação/evidências fora do jogo. O inventário SHA-256 dos 189 arquivos está em [game-baseline.json](evidencias/game-baseline.json); a conferência posterior está em [preservacao.json](evidencias/preservacao.json).

Foram consultados a missão atual, a Bíblia EDF-GDB-1.1.0 (`ART_DIRECTION.md`, `DECISIONS_V1_1.md`, `ACCOUNTS_AND_CHARACTERS.md`, `CLASSES_AND_TALENTS.md`, `VISUAL_REFERENCE_INDEX.md`) e as três folhas Náquiras VIS-018/019/020. O [índice de fontes](evidencias/fontes.json) registra nomes e hashes. As três folhas foram abertas como imagens; não se inferiu seu conteúdo apenas pelo nome.

## Implementação comprovada

| Área | Evidência no código | Consequência para a missão |
| --- | --- | --- |
| Motor | `package.json:27`, `client/src/scene.ts:64`: Three.js 0.186.1, WebGLRenderer, ACES, luz e sombras | Manter Three.js; GLB/glTF é adequado. Não há necessidade de Unreal. |
| Contrato visual | `client/src/models.ts:37`, `:135`: `Actor`, `warrior()` | Atores são grupos de partes rígidas, manipulados diretamente por `SceneView`. |
| Malha | `models.ts:56`, `:70`, `:192`: esferas, cilindros, torso por revolução e extrusões | Ainda é representação provisória, marcada `provisional-original-procedural` em `:645`. Mais polígonos na mesma montagem não atendem ao pedido. |
| Náquiro | `models.ts:149`, `:300`, `:439`, `:641` | Três tons azulados, orelhas/crista de cones, mãos ovais, escala racial; sem anatomia anfíbia detalhada. Pés/botas genéricos em `:186`. |
| Materiais | `models.ts:5`, `:158` | `MeshStandardMaterial` com cor, rugosidade/metallic uniformes e emissivos localizados. Há shader PBR, mas **não mapas de pele, normal ou rugosidade** do personagem. |
| Batching | `models.ts:81–134`, especialmente `:118` | Converte cores em atributos por vértice e remove UV. Não passar o futuro personagem texturizado/esquelético por esse caminho. |
| Animação | `models.ts:771–784` | Seno para passos/braços, balanço de corpo e capa; sem skinning, bones, `AnimationMixer`, clips, morph targets ou crossfade. |
| Ações | `scene.ts:315–340`, `:483–486` | Morte deita o grupo; conjuração levanta grupos; ataque gira braço. Não são clips de rig. Não há reação corporal de dano. |
| Loader | `client/src/render-assets.ts:15–56` | `GLTFLoader` existe **para o ressonador arquitetônico**, com reserva e descarte tardio. Usa `gltf.scene`, não animações. Não há GLB de personagem distribuído. |
| Preview e mundo | `scene.ts:132–150`, `:271–310` | A criação e cada jogador usam `warrior()`. Root lógico conserva ID, picking, nome e barreira; devem permanecer na troca da representação visual. |
| Equipamentos | `models.ts:464–617`, `scene.ts:328–334` | Kits por classe, com algumas variações de cor da espada. Sem sockets de ossos. `PublicPlayer` transmite arma, não armadura (`shared/types.ts:63–82`). Não prometer vestuário remoto completo por item. |
| Aparência | `shared/types.ts:28–82`, `server/src/accounts.ts:84`, `server/src/protocol.ts:37–42` | Não há gênero/body type/model key persistido. `appearance` é índice de cor; a criação por conta usa 0. Não reinterpretá-lo como masculino/feminino. |
| Movimento | `shared/config.ts:8–9`, `shared/movement.ts:3–18` | Movimento X/Z com velocidade máxima de 5,4 unidades/s e raio lógico 0,46; input analógico permite velocidades menores. Não existem estados separados de caminhada/corrida ou estados físicos de salto/natação. Espaço é ataque (`client/src/main.ts:242`). |
| Rede e autoridade | `client/src/network.ts:179–217`, `server/src/game.ts:1141–1167` | Interpolação de posições/ângulos e snapshots/eventos do servidor. A animação não poderá determinar dano, posição, cooldown, elegibilidade ou sessão. |
| Ciclo de vida | `scene.ts:640–648`, `render-assets.ts:51–56` | Descarte atual de geometria/material não cobre mixer, texturas, skeleton e recursos compartilhados de um GLB. Exige um controlador próprio. |
| Segurança de assets | `server/src/server.ts:30` | CSP atual permite imagens de mesma origem e `data:`, sem `blob:` em `img-src`. Testar o caminho real das texturas no navegador; parse em Node não comprova isso. |

## Comparação literal com o pedido visual

| Pedido | Referência principal | Estado atual | Produção necessária |
| --- | --- | --- | --- |
| Corpo anfíbio próprio | Masculino ágil/compacto, ombros definidos, cintura estreita, membros relativamente longos | Base humanoide compartilhada, escala diferente | Estudo anatômico próprio, escultura e retopologia deformável |
| Rosto expressivo | Planos angulares, maçãs, olhos claros, pálpebras e boca definidos | Volumes de esferas e detalhes simples | Cabeça esculpida, loops faciais, olhos 3D e pálpebras |
| Orelhas membranosas | Leques largos com nervuras e membranas coral | Cones triangulares | Membranas modeladas, espessura/sombreamento e deformação adequados |
| Escamas e bioluminescência | Pele azul/turquesa/perolada, variações locais e linhas discretas | Cor uniforme e poucas pequenas escamas geométricas | Base color, normal, roughness e emissivo localizado |
| Cabelo elaborado | Mechas/tranças escuras para trás, adornos marinhos | Crista simplificada | Volume e mechas trabalhados, UV/textura ou cards com transparência controlada |
| Mãos e pés aquáticos | Dedos alongados, membranas sutis, pés alargados | Mãos sem dedos e botas genéricas | Anatomia explícita, rig dos dedos, membranas e avaliação sem calçados |
| Vestimentas marítimas | Tecido/couro sobrepostos, cobre, madrepérola e adornos | Kits de classe procedurais | Conjunto piloto modular respeitando a classe |
| Movimento natural | Respiração, passada, antecipação e recuperação | Oscilações de grupos rígidos | Skinning, clips autorais e transições, com avaliação em movimento |

As capturas em [evidencias/browser](evidencias/browser) mostram a representação atual. Não são imagens de um modelo novo nem prova de qualidade aprovada.

## Bíblia e decisões da sessão

- A Bíblia fixa Fantasia Heroica Arcana, identidade anfíbia/aquática, Confluência e aparência sem bônus mecânicos. A atual missão especifica membranas nas orelhas, mãos/pés aquáticos, cabelo elaborado e os demais elementos acima; são requisitos deste recorte mesmo onde o documento antigo ainda dizia “em estudo”.
- Alturas impressas na prancha, cauda, guelras, poderes raciais, cidades e nomes de novos equipamentos não foram aprovados automaticamente. A faixa de expressões da VIS-018 é feminina; não representa um estudo facial masculino concluído.
- As imagens são concept art com perspectiva e ambiguidades entre vistas. O plano inclui ficha técnica coerente antes da anatomia final.
- As 16 combinações raça × classe já foram autorizadas na sessão como metadados. Isso não equivale a 16 corpos/armaduras finais prontos.
- Sentinela usa placas; Arcanista/Ressonante, tecido; Errante, couro e apenas arco/besta. Um tridente na prancha não concede uma arma ou habilidade nova.

## Riscos que a integração precisa resolver

1. **Estado de locomoção:** `moving` atual é intenção; pode continuar ativo contra obstáculos. O controlador futuro deve medir deslocamento efetivo, sem alterar a simulação. Teleporte/respawn e atraso de rede não podem acelerar a passada.
2. **Instâncias:** copiar somente o grupo de um GLB pode compartilhar referências de ossos. Usar clonagem adequada de skeleton e mixer por jogador; cache apenas dos recursos que podem ser compartilhados.
3. **Animação e efeitos:** o giro de ataque atual é marcado perto do filtro/orçamento de partículas. O novo estado de ação deve consumir eventos confirmados independentemente de qualidade/efeitos reduzidos.
4. **Root motion:** animação visual não pode deslocar o root lógico. Usar clips in-place e ancoragem dos pés; o servidor continua autorizando movimento e combate.
5. **Recursos:** não descartar uma textura compartilhada quando só um jogador sai. Também não permitir que uma carga tardia recrie ator removido ou substitua uma seleção mais recente.
6. **Compatibilidade:** não existe escolha masculina/feminina no save. O primeiro modelo precisa de seleção experimental explícita, sem conversão silenciosa de personagens antigos.
7. **Performance:** teste de triângulos não mede FPS. Software rendering na nuvem não caracteriza a GPU do PC do usuário.

## Conclusão técnica

A infraestrutura de jogo é reutilizável. A distância visual principal está na produção de personagens e no controlador de rig, não na ausência de uma biblioteca 3D. A etapa seguinte proposta é produzir um Náquiro masculino no Blender, avaliá-lo num laboratório visual isolado e integrar sua representação de maneira optativa e reversível. [Plano completo](PLANO_TECNICO_NAQUIRO_MASCULINO.md).
