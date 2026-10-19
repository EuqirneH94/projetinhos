# Náquiro masculino 001 — candidato experimental

Esta etapa implementa o primeiro candidato de personagem com malha deformável e animações esqueléticas. **O aceite artístico, a validação Windows e o desempenho em GPU física permanecem pendentes.** O protótipo continua disponível com os personagens anteriores, que também são a reserva durante carga ou falha do asset novo.

O plano foi aprovado pelo usuário após a auditoria em `entregas/Personagens-3D/001-plano`. O recorte é um Náquiro masculino com conjunto visual piloto de Errante. Não se trata da finalização das outras raças, da versão feminina ou de quatro guarda-roupas novos.

## Usar o candidato

Com o servidor desta entrega funcionando:

- Ateliê: `/character-lab.html`. Inspeção frontal, lateral, traseira, rosto, mãos/pés, giro, topologia, animações e linha do tempo.
- Jogo: `/?character=naquiro-male`. Selecione **Confluência → Náquiros → Errante**.
- Contas: `/accounts.html?character=naquiro-male`. O redirecionamento conserva essa opção visual.
- Visual anterior: abra `/` sem o parâmetro. Outras raças/classes também conservam seus modelos.

O parâmetro seleciona uma representação experimental; não atribui gênero a saves, não reinterpreta `appearance`, não cria item de inventário e não altera permissões. Dois clientes podem escolher apresentações diferentes e continuar compartilhando as mesmas regras do servidor.

## Modelo e fontes

`art-source/naquiro-male/model.py` produz a base autoral no Blender: superfícies por seções, união/relaxamento anatômico, cabeça trabalhada por campos de forma, olhos e pálpebras, orelhas membranosas, cabelo volumétrico, mãos/pés aquáticos e roupas. As texturas são geradas por funções próprias, sem extração dos pixels da concept art. `base.blend` conserva as partes editáveis; `rig_export.py` atribui pesos, consolida partes por material e exporta o personagem.

O corpo usa uma superfície resultante de união voxel e simplificação. **Ainda precisa de retopologia manual orientada à deformação**, refinamento de face/cabelo/roupa e revisão de poses. Não se afirma escultura manual, rig facial final, acabamento equivalente à prancha ou aprovação humana do personagem.

Roupa, adornos e arco formam um conjunto visual piloto fixo. Isso não equivale a um guarda-roupa por item, corda de arco deformável ou catálogo de equipamentos novo. As estatísticas e permissões continuam vindo dos itens existentes no servidor.

Referências principais: VIS-018/019/020 da Bíblia EDF-GDB-1.1.0 e os requisitos anatômicos explícitos da missão. A escala de representação 2,3 é técnica, não altura canônica em metros. Não foram adotados cauda, guelras ou poderes raciais implícitos nas imagens.

Arquivos de produção:

- `base.blend`: base de modelagem.
- `naquiro-male.blend`: rig, materiais e Actions editáveis.
- `naquiro-male.glb`: exportação portátil para inspeção/importação.
- `textures/`: mapas fonte em PNG.
- `client/public/art/characters/naquiro/`: glTF, buffer, texturas e manifesto realmente usados pelo jogo.

O runtime usa **glTF com texturas externas de mesma origem** para respeitar a CSP existente. O GLB portátil não é carregado automaticamente pelo jogo. O manifesto registra contagens reais, nomes de ossos/clips, procedência, hashes e medições de locomoção.

Uma falha de cor foi reproduzida no navegador durante a revisão: tintas lineares acima de 1 no Blender transbordavam na quantização do atributo `COLOR_0` para inteiros normalizados, produzindo manchas verdes/escuras. A exportação agora limita essas tintas ao intervalo válido antes de salvar o rig e exportar. Um teste semântico da paleta reproduziu a falha no buffer anterior e passou no corrigido; os testes não foram enfraquecidos. O `base.blend` original foi preservado. A comparação binária manteve geometria, pesos, materiais, hierarquia e animações; registrou apenas a mudança das cores e um arredondamento de cerca de 0,0001 em uma tangente do exportador.

## Rig e animações

O esqueleto possui deformação com até quatro influências normalizadas por vértice. Os Actions são produzidos e avaliados no Blender e exportados como clips distintos:

| Clips | Uso nesta etapa |
| --- | --- |
| Idle | Respiração e movimento secundário |
| Walk, Run | Locomoção in-place, com velocidade de reprodução baseada no deslocamento observado e contato de pés medido |
| Attack | Preparação, gesto de arco e recuperação visual de ataque confirmado |
| Cast | Conjuração visual acompanhando o estado do servidor |
| Hit | Reação ao dano confirmado |
| Death, Recover | Morte/retorno acompanhando o servidor |
| Jump, Land, Swim | Demonstração **somente no ateliê**; não adiciona mecânicas de salto/água ao jogo |

O root lógico não recebe root motion. A direção, posição, colisão, dano, equipamento, cooldown, permissões e sessões continuam sendo determinados pela implementação existente. Espaço permanece ataque.

`CharacterMotion` ignora deslocamentos de teleporte e não interpreta uma aba suspensa como explosão de corrida. Conjuração interrompe o ataque visual antigo; o fim da conjuração não o reproduz novamente. A nova animação de ação independe do orçamento de partículas e da preferência de efeitos reduzidos.

## Integração e descarte

`character-assets.ts` valida o contrato antes de esconder a reserva: geometria/UV finitas, pesos/juntas válidos, clips e orçamento. O cache deduplica cargas e retém recursos até a última referência sair. `SkeletonUtils.clone` e mixers separados impedem que dois personagens compartilhem uma pose.

`character-runtime.ts` controla ações e transições sem escrever dados de jogo. O descarte para actions/mixer, libera os esqueletos das instâncias e conserva texturas/geometrias enquanto houver usuários. A última referência libera também o backing `ImageBitmap`. Falha de rede, arquivo inválido ou carga após descarte conserva o visual anterior, com diagnóstico.

`SceneView` mantém os roots de jogador, IDs públicos, seleção, rótulos, barreiras e câmera. As métricas de inspeção `window.edfMetrics.character` e `characters` contêm estado de carga, clip, contagens e posições públicas, sem credenciais. O ateliê expõe `window.edfCharacterLab` para observar o arquivo realmente renderizado.

## Limites e aceite

Os testes automatizados validam contratos e regressões; não certificam fidelidade à concept art ou movimento natural. As capturas do Blender e as do navegador são identificadas separadamente. Captura com pausa do laço é evidência estática, não benchmark ou vídeo de gameplay contínuo.

O hardware da nuvem usa renderização por software no navegador. A meta de desempenho precisa ser medida no Windows com GPU identificada, resolução/qualidade registradas e rota repetível. O candidato não encerra o diagnóstico histórico da queda B1.1 no Windows.

Nesta execução, a entrada no mundo foi observada, mas o percurso completo de controles, capturas do cenário e multiplayer visual não terminou: houve intervalos de vários segundos e pausa de cerca de 72 s entre quadros, reconexão e timeout de carga. Os testes de protocolo, persistência e skeletons independentes não substituem esse aceite gráfico. O vídeo contínuo entregue demonstra o ateliê; não deve ser descrito como vídeo de gameplay.

Também permanecem para revisão: loops de retopologia, clipping em poses extremas, encaixe do arco/dedos, expressão e pálpebras, acabamento do cabelo/vestuário e equivalência artística com a referência. A bioluminescência localizada exigida na missão ainda não foi implementada: os seis materiais exportados não têm canal emissivo. A versão feminina só começa depois do aceite do masculino.

A medição complementar da geometria realmente deformada pelo Three.js, amostrada a 60 Hz em CPU, encontrou mínimo Y de aproximadamente −0,005215 na corrida: cerca de 5,2 mm de penetração entre quadros. Os quadros baked a 24 fps no Blender mantêm a superfície a 0,003. A diferença de interpolação permanece um ajuste fino pendente; não se afirma contato perfeito com o terreno ou ausência completa de clipping. A amostragem de CPU não é benchmark de FPS em GPU.
