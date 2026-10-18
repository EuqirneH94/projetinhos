# ECOS DOS FARÓIS — MISSÃO: PERSONAGENS 3D DE QUALIDADE

Atue como diretor de arte 3D, character artist, technical artist, animador e desenvolvedor especializado em MMORPGs.

Estamos desenvolvendo **Ecos dos Faróis**, um MMORPG 3D de Fantasia Heroica Arcana.

## 1. Objetivo

Substituir os personagens provisórios e visualmente simplificados por personagens 3D de qualidade, coerentes com a direção artística aprovada.

A imagem fornecida dos **Náquiros** é a referência visual principal desta missão.

Não quero apenas uma aproximação genérica. Quero que o personagem dentro do jogo apresente a identidade visual, anatomia, materiais, silhueta e riqueza de detalhes observados na referência.

**Importante:** a imagem é uma ficha de concept art, não um modelo 3D pronto. Será necessário desenvolver a geometria, os materiais, o rig e as animações correspondentes.

## 2. Anatomia dos Náquiros

Respeitar os seguintes elementos:

- Corpo humanoide anfíbio, com proporções próprias.
- Pele azulada e turquesa com padrões de escamas.
- Orelhas com membranas semelhantes a nadadeiras.
- Cabelos elaborados, com mechas e adornos marinhos.
- Olhos expressivos e aparência fantástica.
- Marcas naturais e detalhes bioluminescentes.
- Mãos e pés adaptados à vida aquática.
- Roupas, armaduras e acessórios com identidade marítima.
- Diferenças anatômicas coerentes entre os modelos masculino e feminino.

Não transformar os Náquiros em humanos comuns com pele azul.

Não substituir a anatomia aprovada por modelos genéricos.

## 3. Qualidade gráfica

Desenvolver os personagens com:

- Geometria tridimensional real, vista de qualquer ângulo.
- Silhuetas bem definidas e proporções consistentes.
- Materiais PBR com mapas de cor, normal e rugosidade.
- Pele com variações sutis de textura e brilho.
- Olhos tridimensionais expressivos.
- Cabelos e acessórios com volume.
- Vestimentas com camadas e detalhes próprios.
- Iluminação que valorize as características dos materiais.
- Otimização apropriada para renderização em tempo real.

Não utilizar primitivas geométricas como resultado final.

Cubos, cápsulas, cilindros e bonecos simplificados podem existir apenas como placeholders temporários.

## 4. Modelagem e animação

Criar ou integrar modelos 3D autorais e adequadamente licenciados, com esqueleto funcional.

Preparar animações de:

1. Idle — personagem parado, respirando naturalmente.
2. Caminhada.
3. Corrida.
4. Salto e aterrissagem.
5. Ataque básico.
6. Conjuração de habilidade.
7. Recebimento de dano.
8. Morte e recuperação, quando aplicável.
9. Natação, respeitando a anatomia aquática.

As animações devem apresentar transições suaves, sem deslizar pelo chão, deformações exageradas ou movimentos robóticos.

## 5. Integração com o jogo

Antes de alterar o projeto:

- Inspecionar o repositório e identificar a tecnologia gráfica realmente utilizada.
- Localizar o sistema atual de personagens.
- Verificar como os modelos são carregados, animados e renderizados.
- Identificar as limitações da implementação existente.
- Preservar controles, câmera, colisões, combate e multiplayer.
- Criar um plano incremental, com checkpoints verificáveis.

Caso o projeto utilize Three.js, priorizar modelos glTF/GLB com animações e materiais compatíveis.

Não modificar arquivos de produção sem backup e autorização.

## 6. Primeiro personagem a desenvolver

Começar pelo **Náquiro masculino**, seguindo as vistas frontal, lateral e traseira da referência.

Criar uma apresentação técnica contendo:

- Modelo em posição neutra.
- Visualização 360°.
- Aproximação do rosto.
- Detalhes de pele, orelhas, mãos e pés.
- Visualização dos materiais e equipamentos.
- Demonstração das animações.
- Teste do personagem no cenário real do jogo.

Depois de aprovado, desenvolver a versão feminina.

As demais raças deverão seguir suas próprias referências canônicas, sem reutilizar indevidamente a anatomia Náquira.

## 7. Critérios de aceitação

Não considerar a missão concluída apenas porque um personagem aparece na tela.

Validar:

- Fidelidade à referência.
- Anatomia correta.
- Qualidade visual em diferentes ângulos.
- Materiais funcionando.
- Rig sem deformações graves.
- Animações funcionando.
- Desempenho aceitável.
- Integração com câmera e controles.
- Funcionamento no ambiente multiplayer, quando aplicável.

Fornecer capturas reais do jogo, demonstração em movimento e relatório de limitações.

**Não declarar que o personagem está pronto se existir apenas uma representação simplificada ou uma imagem estática.**

## 8. Entrega inicial

Primeiro, apresente uma auditoria da implementação atual e um plano técnico para construir o Náquiro masculino.

Identifique o que pode ser feito diretamente no código e o que exige modelagem externa, por exemplo, no Blender.

Não invente arquivos, modelos, animações ou funcionalidades já implementadas.

Aguarde aprovação do plano antes de substituir o personagem existente.