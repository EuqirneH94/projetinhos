# Revisão artística independente — Náquiro masculino 001

**Estado: candidato técnico e visual para revisão humana. A fidelidade pedida na missão ainda não foi atingida.** A correção de cor removeu a aparência verde/escura indevida causada pela exportação, mas não resolve por si só anatomia, penteado, acabamento ou qualidade do movimento. Não há aceite artístico nem autorização implícita para iniciar a versão feminina.

Esta revisão é somente de leitura: não alterou geometria, mapas, rig, código ou saves. Compara as capturas reais do ateliê Three.js com a missão recebida e as pranchas de referência fornecidas pelo usuário. É uma avaliação técnica assistida, que não substitui a decisão do responsável pela direção de arte.

## Material efetivamente visto

- `browser-reviewed/review-face-1280x720.png`: aproximação do rosto.
- `browser-reviewed/review-front-1280x720.png`: corpo inteiro frontal.
- `browser-reviewed/review-three-quarter-1280x720.png`: corpo inteiro em três quartos.
- Referência principal VIS-018: `image-gen-1(4).png`, especialmente o masculino, suas três vistas, materiais e anatomia aquática.
- Referência complementar VIS-019: `image-gen-2(4).png`, especialmente os rostos/penteados masculinos, padrões da pele e acessórios.
- Requisitos de `entregas/Personagens-3D/001-plano/MISSAO_RECEBIDA.md` e limitações do plano aprovado.

As capturas são do navegador, não renders Blender. O método usa quadros reais com pausa do laço para a captura estática e está explicado em `browser-reviewed/LEIA_METODO.md`. Não demonstram movimento contínuo, FPS ou desempenho em GPU física. Esta revisão não examinou todas as poses nem substitui a inspeção de perfil/costas e dos vídeos.

## Divergências concretas em relação à referência

1. **Rosto e expressão.** O candidato possui olhos, pálpebras, nariz, boca e volume de cabeça reais. Entretanto, a face ainda apresenta planos muito lisos, nariz e boca pouco refinados, pálpebras com contorno grosso e olhos de leitura rígida. Faltam a articulação entre maçãs, mandíbula e têmporas e a expressão do masculino da referência. A configuração de pupila estreita/vertical também precisa de decisão artística; não se considera esse desenho aprovado apenas por aparecer no modelo.
2. **Penteado.** A cor azul-petróleo é legível, porém o topo usa poucas mechas grossas e pontiagudas. As laterais têm cordões simples com contas repetidas. Isso fica distante da massa capilar contínua para trás, das tranças/mechas finas e dos adornos marinhos integrados da prancha. O acabamento ainda deixa a leitura de peças separadas e facetas muito evidente.
3. **Corpo e silhueta.** Há cintura, membros, mãos e pés próprios do candidato, mas ombros e braços ainda têm volumes bastante regulares, com transições marcadas e ombreiras anatômicas de topo quase plano. A referência tem uma anatomia mais articulada e uma silhueta compacta, ágil e orgânica. Não basta a cor azul ou a presença de orelhas para fechar esse requisito. A altura 2,3 é escala técnica, sem canonizar as alturas impressas nas imagens.
4. **Escamas e pele.** Os mapas reais produzem relevo e variação de brilho; o rosto lê azul/turquesa após a correção. O padrão continua muito uniforme e repetitivo e muda de escala de leitura entre rosto, pescoço, ombros e membros. O brilho nos ombros/pescoço é amplo e forte. Faltam distribuição anatômica de escamas, variações peroladas e marcas naturais localizadas equivalentes às observadas na referência. A prancha é mais clara/perolada; o tom atual ainda exige aprovação de paleta.
5. **Orelhas.** O leque coral com nervuras verde-azuladas identifica uma estrutura de nadadeira e constitui avanço concreto. Ainda tem contorno e subdivisão muito simples, pouca gradação de espessura e pouco acabamento na inserção junto à cabeça. A referência mostra membranas mais delicadas e desenho mais orgânico.
6. **Mãos e pés.** Há dedos e volume aquático, mas as mãos têm leitura pequena e pouco articulada na vista geral. Os pés são estreitos, com dedos finos, e as membranas não estabelecem uma silhueta aquática clara nessa captura. É necessária aproximação específica e revisão de espessura, abertura e deformação das membranas. Não se estabelece uma quantidade canônica de dedos a partir desta comparação.
7. **Roupa e acessórios.** Colete aberto, correia, cinto, braçadeiras, painel de tecido e arco estão presentes. As áreas de couro/tecido continuam planas, com recortes simples e poucos detalhes de costura, borda, fivela, trama e sobreposição. As contas e o pingente têm cor metálica, mas ainda faltam diferenciação de cobre/pátina/madrepérola e integração dos pequenos adornos à roupa/cabelo. O piloto de Errante deve continuar respeitando couro e arco/besta: copiar o tridente ou placas de outra classe não é uma correção autorizada. Este conjunto visual fixo não representa um guarda-roupa completo por item equipado.
8. **Marcas bioluminescentes.** Não há linhas emissivas localizadas demonstradas nas capturas. A inspeção do glTF desta revisão também não encontrou `emissiveFactor` ou `emissiveTexture` nos seis materiais. Esse requisito permanece pendente; reflexo especular e pele clara não equivalem a bioluminescência.

## Checklist de escopo e aceite

| Requisito | Estado desta revisão | Evidência e limite |
| --- | --- | --- |
| Um primeiro Náquiro masculino | Cumprido como recorte | Candidato identificável e inspecionável; nenhuma versão feminina produzida ou aprovada aqui. |
| Modelo tridimensional com inspeção de vários ângulos | Cumprido como apresentação técnica | Frente, rosto e três quartos vistos nesta revisão; perfil/costas e giro completo precisam integrar a revisão humana. |
| Anatomia e silhueta próprias, coerentes com a referência | Parcial | Orelhas, dedos e pés diferem do ator anterior; refinamento anatômico e proporções ainda divergem da prancha. |
| Pele azul/turquesa, escamas e materiais PBR | Parcial | Cor/normal/rugosidade são mapas reais; distribuição anatômica, brilho e paleta precisam de refinamento e aceite. |
| Olhos expressivos e rosto refinado | Parcial | Olhos volumétricos e pálpebras existem; expressão e transições anatômicas ainda insuficientes. |
| Cabelo elaborado e adornos marítimos | Parcial | Volume e adornos presentes; desenho e riqueza de detalhe não equivalem à referência. |
| Orelhas com membranas de nadadeira | Parcial | Leque e nervuras legíveis; delicadeza, espessura e inserção precisam de revisão. |
| Mãos e pés adaptados à vida aquática | Parcial | Geometria presente; membranas e leitura em proximidade/deformação precisam de validação. |
| Roupa em camadas e materiais marítimos | Parcial | Piloto funcional visível; falta acabamento de tecido/couro/metal e maior riqueza de acessórios. |
| Marcas naturais e bioluminescência localizada | Pendente | Não demonstradas; sem canal emissivo nos materiais inspecionados. |
| Resultado final sem aparência de montagem de primitivas | Pendente para aceite final | O candidato já tem superfície deformável, porém ainda há volumes e recortes de leitura simples. Não tratá-lo como acabamento final. |
| Rig esquelético e onze clips distintos | Implementado tecnicamente; aceite de movimento pendente | A existência de bones, pesos e clips está nas evidências automatizadas. As três capturas não provam naturalidade, ausência de clipping ou qualidade de transições. |
| Caminhada/corrida sem deslizamento | Parcial; revisão em vídeo pendente | Há ajuste de playback pela velocidade e medição de contato. A medição Three a 60 Hz registrou penetração residual mínima de aproximadamente 5 mm em Run; não afirmar contato perfeito em todos os instantes. |
| Jump/Land/Swim | Clips de demonstração, sem mecânica nova | Permanecem no ateliê, conforme o contrato atual do jogo. |
| Integração com câmera, controles e multiplayer | Fora do aceite exclusivamente artístico | Consultar os testes reais de navegador/runtime; não inferir aprovação pelo ateliê estático. |
| Desempenho aceitável no Windows/GPU física | Pendente | A máquina desta revisão usa renderização por software. Captura e testes estruturais não medem a meta de desempenho. |
| Fidelidade global à referência | Pendente | Precisa de refinamento artístico e comparação humana em frente/perfil/costas, rosto, mãos/pés e vídeo. |

## Próximo trabalho artístico recomendado

Antes de ampliar o escopo, revisar a anatomia e a silhueta em uma ficha frontal/lateral/traseira, depois refinar rosto/pálpebras, penteado e membranas. Fazer retopologia orientada à deformação e só então fechar UVs e distribuição regional das escamas, marcas naturais, brilho e emissivo localizado. Em seguida revisar roupa/adornos e poses extremas, incluindo encaixe do arco e dedos. Cada correção deve voltar ao navegador e ao conjunto de animações para evitar aprovar apenas o render de estúdio.

A versão feminina e outras raças permanecem posteriores ao aceite do masculino. A entrega atual permite abrir o `.blend`, testar a integração e apontar correções sobre um candidato real; ela não satisfaz integralmente o acabamento artístico solicitado.

## Identificação dos arquivos inspecionados

| Arquivo | SHA-256 |
| --- | --- |
| `review-face-1280x720.png` | `879302252318babf5b8ac5aa6ac52669d9c7596573412da6359c03ad6e63d48f` |
| `review-front-1280x720.png` | `2341d9a71d7c6022c720333def56e6b509e1feaaa3ceca26899bdbaf1435dad0` |
| `review-three-quarter-1280x720.png` | `ac81ad1d96e5a9e854835f33e02232bc81dcf2c59b4c20d3c580589a146656c4` |
| `naquiro-male.gltf` | `64cd799e07057499f512a5c7847f2a1b5d8a58ae324515eb4133d77b4f571a95` |
| `naquiro-male.bin` | `11d4e92762111d18a955b0aecec2965c6c22d8a3aecf9cc2c83d76adcf33fb10` |
| `manifest.json` | `518688932797e9f113012680b635b41ed287705a28c8772f63f48cb7027b6bd5` |

O hash do glTF sozinho não identifica todas as mudanças visuais: neste formato, cores e outras propriedades dos vértices estão no buffer `.bin`, e as imagens são PNGs externos. A identidade completa depende do manifesto e dos hashes de todos esses arquivos.
