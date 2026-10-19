# Parecer visual independente — corpo neutro 002

Este é um parecer interno de apresentação por um agente diferente do autor do corpo/cabeça, com as imagens realmente abertas. Não substitui o aceite artístico humano nem declara fidelidade canônica final. O arquivo inspecionado é `naquiro-anatomia-002.blend`, SHA-256 `037b321e0d836390669cab741260ca9525ff62e9a5010892a28d49077d9c90db`.

Foram consultadas visualmente as pranchas canônicas VIS-018 e VIS-019 (`image-gen-1(4).png` e `image-gen-2(4).png` do acervo) e as 14 capturas neutras em `final/neutral/`, produzidas pelo Blender em 900×1240. Este parecer julga apenas o que essas vistas mostram; os números estruturais vêm do inspector separado.

## Corpo, rosto e apresentação neutra

Frente, perfil e costas mostram o corpo inteiro na mesma pose e escala, sem roupas, cabelo, joias, arco ou mapas detalhados escondendo as transições. Cabeça, mãos e pés permanecem no quadro. A proporção da cabeça agora lê um estudo mais esguio do que a cabeça ampla do candidato 001; isso não fixa altura racial em metros.

A junção peitoral/ombro/axila perdeu a faixa triangular rígida visível no draft02. As capturas `neutral-rest-shoulder.png` e `neutral-rest-three-quarter.png` mostram uma transição contínua de superfície, com volume do deltoide integrado ao braço. O relatório de malha confirma continuidade real; a vista por si só não provaria solda. Tronco, costas, braços e pernas ainda têm planos anatômicos amplos e bastante suaves. Peitoral, escápula, clavícula, cotovelo, joelho e tendões poderão receber escultura mais específica, sem depender de textura para inventar anatomia.

O rosto frontal e em três quartos permite avaliar órbitas, ponte nasal, mandíbula e lábios. Não observei a íris ou a pupila atravessando as pálpebras nessas vistas ou no perfil; isto é uma observação de imagem e não uma certificação de colisão em toda expressão. A projeção do nariz continua pronunciada e angulosa no perfil. Narinas, transições do lábio e da mandíbula ainda são simplificadas em relação às pranchas e merecem aceite específico. Orelhas/nadadeiras estão visíveis sem cabelo, mas a raiz auricular permanece sobreposta ao crânio e a forma é uma base simplificada. A aproximação própria da orelha permite ver isso; não deve ser descrita como solda final.

As duas aproximações da mão mostram cinco dedos inteiros, polegar separado, comprimentos diferenciados e membranas parciais com borda livre côncava. Os volumes da palma e articulações ainda são simples, sem pregas finais. Não há corte de ponta de dedo no enquadramento. As membranas são superfícies independentes, o que continua exigindo revisão das raízes e colisão em fechamento.

Os pés dorsais e laterais mostram quatro dedos, membranas parciais e extensão do antepé. As pontas cabem nas imagens. A transição tornozelo/dorso possui faixas paralelas visíveis, e a planta/arco ainda têm leitura simplificada. A câmera original da planta mostra o corpo atrás dos pés, com os contornos plantares inteiros. A captura suplementar `sole-detail/neutral-rest-feet-sole.png`, também aberta nesta revisão, aplica recorte de profundidade na câmera real e apresenta a planta sem o corpo ao fundo. Isso preserva a geometria e o SHA do `.blend`; o recorte é registrado no relatório do renderer. Não foi aplicada edição à imagem.

## Limites de leitura das imagens

Estas 14 vistas usam apresentação Workbench neutra sem sombras projetadas. Desligar a sombra elimina o artefato triangular de sombra do draft anterior, mas também reduz a leitura de relevo fino. Por isso é adequado acompanhar o ateliê neutro com uma vista sob iluminação física Cycles, sem trocar a geometria nem esconder o wireframe.

As três imagens físicas `physical/neutral-rest-front.png`, `physical/neutral-rest-face-three-quarter.png` e `physical/neutral-rest-shoulder.png` também foram abertas. O relatório registra Cycles CPU, 32 amostras, 650×900, mesmo SHA do `.blend`, sem salvamento. Nessas imagens, o triângulo escuro da bochecha visto no draft com sombra Workbench não reaparece; a região tem sombra contínua e o ombro mantém a transição refinada. O ruído de amostragem limita o exame do relevo muito fino, mas estas vistas independentes complementam a leitura mais uniforme do Workbench. Não alteram os limites anatômicos e de pesos descritos neste parecer.

A malha é um estudo editável para revisão. O resultado melhora proporções e continuidade; não é aprovação anatômica final e não comprova deformação sem auto-interseções. Roupas, texturas detalhadas e efeitos continuam fora do incremento.

## Wireframe e poses

As cinco vistas finais do cage foram abertas: frente, ombro, face, mão dorsal e pés dorsais. Os anéis orbitais/periorais e os fluxos dos dedos ficam legíveis; as transições no tornozelo e as pontas com retopologia ainda pendente permanecem expostas. A primeira série deixou membranas/orelhas sem linhas internas visíveis por causa do offset da apresentação. Na série final, também aberta, o renderer coloca o Wireframe em offset=0 para mostrar as arestas reais nos dois lados dessas superfícies finas. Agora as grades das membranas da mão/pé e os anéis/fan da orelha são visíveis. Esse ajuste é de apresentação, fica registrado no JSON e não salva o `.blend` nem altera o cage original.

As nove imagens das seis poses foram abertas. Os novos enquadramentos de corpo inteiro, calculados a partir dos limites da geometria avaliada com margem, mantêm mãos e pés inteiros em braços laterais/acima, cotovelos e joelho. A escala das poses com braços estendidos difere da escala das três vistas neutras; estas três continuam iguais entre si e devem ser usadas para comparar proporções.

Nos braços acima e na aproximação da axila, a deformação ainda exibe compressão e achatamento na dobra inferior. Isto acompanha o limite de estiramento de arestas de 3,57878× medido pelo inspector; requer correção manual de pesos/loops antes do aceite do rig. Na pose de cotovelo, o volume é mantido de forma aproximada, sem uma solução final de pele ou pregas. No joelho, vê-se compressão/achatamento posterior; o exercício não comprova comportamento em todos os ângulos.

No fechamento parcial da mão dorsal, a membrana junto do mínimo forma aba angular e aparenta descolamento/interpenetração com o dedo, exigindo revisão de raízes/pesos antes de aceitar a deformação. Não foi ocultada nem substituída. Toe-up mantém as membranas acompanhando a elevação, com volumes ainda simples. Os polegares não entram no fechamento parcial de diagnóstico; não se trata de validação de punho fechado ou oposição completa.

O conjunto de 32 imagens realmente examinado — 14 neutras, cinco wireframes, nove imagens das seis poses, três Cycles e uma planta com recorte de câmera — está completo para a apresentação deste estudo. Os metadados por lote registram o mesmo SHA do arquivo fonte, os hashes das capturas, câmera e parâmetros, e confirmam que o `.blend` não foi salvo. Os limites de anatomia e deformação descritos acima permanecem para revisão humana; não há declaração de aprovação canônica ou de rig final.

## Capturas conferidas: exemplos vinculados por SHA-256

| Captura | SHA-256 |
| --- | --- |
| `neutral/neutral-rest-front.png` | `cc862ab56e2aad4d473e6ce522d4a9ee4a20333a52d097c1d97586857916eec7` |
| `wire/wire-rest-hand-dorsal.png` | `844405af3a0858000e588af0810f46c1c53abe51a815e3a57e7a5694c4b9469a` |
| `poses/arms90/neutral-arms90-front.png` | `fa7bec541ee1f76e92d74ffcce1dc7be74b1424036947b28c3c0a5181ada4b30` |
| `poses/arms-up/neutral-arms-up-front.png` | `697f4a3ab73ca85efbf186f701aba8b16950b7eb685c0652ce11d9485c959023` |
| `poses/hand-curl/neutral-hand-curl-hand-dorsal.png` | `783c9209e0c68438d2287fde1004883f001834a3062acc5b6cb6382fa65b033c` |
| `physical/neutral-rest-shoulder.png` | `09209c5a4671427ec41de4d60d0cb93852eee48a5d98171ccaba938a86db8c66` |
