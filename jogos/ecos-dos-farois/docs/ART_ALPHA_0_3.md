# Arte, câmera e pipeline — candidata Alpha 0.3

Este documento registra a baseline Alpha 0.3. A opção esquelética posterior do Náquiro masculino está documentada em [CHARACTER_NAQUIRO_001.md](CHARACTER_NAQUIRO_001.md); ela não substitui automaticamente os atores procedurais descritos abaixo.

Estado: primeiro passe original de arte para navegador; ainda não equivale às pranchas conceituais. O aceite visual, a validação em GPU/Windows e a produção dos modelos finais permanecem pendentes. Nenhum save, atributo, posição de colisão do jogador ou permissão de equipamento foi alterado neste passe.

## Referências efetivamente consultadas

Foi lido `ART_DIRECTION.md`, DOC-003 V1.1.0 da Bíblia. Os seguintes PNGs recebidos foram abertos e examinados como imagens nesta missão:

| Referência | Observação e aplicação |
| --- | --- |
| `Ecos dos Faróis - Os Quatro Povos.png` | Composição heroica, contraste azul/dourado e violeta/turquesa, arquitetura com núcleo luminoso. Os nomes Aureanos/Valkar/Seryn/Kaelth e filiações livres da prancha histórica não foram importados. |
| `Bíblia Visual dos Kordrânios.png` | Corpo compacto/robusto, construção por camadas e marcas minerais; escala atual preservada como estudo, sem fechar as alturas conceituais divergentes. |
| `Bíblia de Game Design dos Elúvios.png` | Silhueta esguia, lapelas orgânicas e marcas botânicas; filiação correta à Confluência preservada. |
| `Bíblia de Game Design - Sentinela.png` | Separação entre placas, tecido e couro; arma/escudo legíveis. Não foram importadas habilidades/especializações escritas nas propostas da imagem. |
| `image-gen-1.png`, `image-gen-2.png` | Estudos de marca/Farol: núcleo, anéis e condutores; base para um pequeno ressonador arquitetônico original, sem reutilização de pixels ou cópia da torre. |
| `image-gen-1(1).png`, `image-gen-2(1).png`, `image-gen-3(1).png` | Estudos humanos ainda chamados Aurenos: tecido azul, metais quentes e couro. Nomenclatura atual Valdários mantida. |
| `image-gen-2(4).png`, `image-gen-3(4).png` | Personalização/equipamentos Náquiros: identidade aquática, escamas e metal perolado. Não foram implementadas novas habilidades raciais. |

A Bíblia prevalece sobre nomes antigos e permissões desenhadas em uma referência. As quatro classes usam os mesmos contratos e dados mecânicos que o projeto já possuía.

## Alterações concretas

- Personagens: perfil de peito/cintura esculpido, lapelas/placas sobrepostas, tabardo com bordas, rosto com maçãs discretas e olhos menores, cabelo menos vertical e pequenos detalhes culturais. Continua sendo geometria original com articulações de grupos, sem malha esquelética nem rig facial final.
- Materiais: tecido, pele, couro, pedra, metal e emissivos localizados continuam separados; nenhuma luz cobre o corpo todo. A energia instável perdeu pulsação rápida e pode ficar estática com efeitos reduzidos.
- Vila: praça segmentada com inlays, portas em arco, fiadas de pedra, alpendres e luminárias; Farol com nervuras, contrafortes e condutores; portão com lente arcana e bancada de ofício visível. A bancada usa as coordenadas públicas do servidor.
- Vegetação: lâminas curvas instanciadas no lugar de cones de grama; copas com massas secundárias de baixo custo. Grama/flores mantêm instanciamento; estáticos e partes de atores continuam agrupados por material. As copas não repetem todo o custo no passe de sombra.
- Luz: ambiente hemisférico menos plano, luz direta quente, sombras padrão em 1024² em vez de 2048². Pixel ratio máximo 1,35 no padrão e 1 no modo econômico; modo econômico desativa sombras. Não há tremor artificial de câmera.
- Companheiro: representação menor do Brumino, com identificação turquesa, usando exclusivamente `snapshot.companions` do servidor. O cliente não calcula seguimento ou ataques.
- Criação: câmera de inspeção mais próxima (6,8 unidades); a distância de jogo continua ajustável pela roda, com limites. A identidade e o kit podem ser comparados antes de entrar.

## Carregamento real de asset

`client/src/render-assets.ts` usa `GLTFLoader` e um objeto procedural de reserva. O asset original distribuído `client/public/art/resonator.gltf` e seu buffer local `resonator.bin` são carregados de `/art/` e substituem a reserva somente após parse válido. O buffer usa URI relativa de mesma origem: a validação real no navegador identificou que buffers `data:` eram bloqueados pela política `connect-src 'self'` do servidor. A correção preserva essa política. Uma falha de HTTP/parse conserva a reserva, sem bloquear o jogo. Uma carga que termina depois de a cena ser descartada não ressuscita objetos. Não há download externo em execução.

A lente é um asset representativo pequeno, não um personagem final. Seu arquivo fonte é `scripts/create-resonator-asset.mjs`; para reproduzi-lo após `npm ci`:

```powershell
node .\scripts\create-resonator-asset.mjs
```

`client/public/art/PROVENANCE.json` registra autoria, método, permissão, dependência MIT, uso e caráter provisório. As imagens conceituais não foram embutidas em texturas. Nenhum asset externo de origem/licença desconhecida foi adicionado.

## Câmera e intensidade

`render-camera.ts` varre o segmento do alvo à câmera contra caixas expandidas pelo raio de 0,32. Assim uma quina que não toca o raio central ainda bloqueia o corpo da câmera. Também amostra o relevo ao longo do segmento; verificar só o destino permitia atravessar uma crista. Casas, base do Farol e troncos têm volumes conservadores. Ao encostar em um volume, a câmera recolhe imediatamente; o alvo acompanha o jogador suavemente.

`SceneView.setAbilityPreview(range, area)` exibe um anel discreto com o alcance público informado pela UI. Trata-se de prévia: linha de visão, distância final e execução continuam sob autoridade do servidor. O anel é plano e ainda não acompanha cada ondulação do terreno.

`SceneView.setReducedEffects(true)` remove partículas ambientais e halo, reduz a luz pontual, congela pulsos/rotações ornamentais e suprime ondas/projéteis cosméticos. Valores de dano/cura continuam aparecendo; o número de efeitos simultâneos tem limite de 48 no padrão e 16 no reduzido. Eventos visuais não causam dano.

Métricas públicas em `window.edfMetrics`: draw calls, triângulos, geometrias, intervalo entre quadros, qualidade, pixel ratio, efeitos reduzidos/ativos, distância/obstrução da câmera, posição pública local e estado do asset (`loading`, `loaded` ou `fallback`). Nenhuma credencial é exposta.

## Verificação executada e limites

Os cinco testes de `tests/render.test.ts` passaram em Linux com Node 24.14.0 e 24.19.0. Eles exercitam parede/quina, crista de terreno, alvo no limite de um volume, geometria/animação finita das 16 combinações, orçamento por ator, parse real do glTF, carga HTTP, erro HTTP e descarte durante a carga. A adaptação `ProgressEvent` é apenas para o harness Node, pois a biblioteca usa esse evento DOM; o navegador o possui nativamente.

O primeiro screenshot de criação em Chromium/SwiftShader 1280×720 foi inspecionado. Software rendering é lento: o primeiro frame padrão 640×480 mediu 160 draw calls e 283.357 triângulos contando os passes do renderer. Isso não comprova a meta em GPU nem no Windows. O harness de inspeção isolada foi interrompido para evitar concorrência de GPU com a validação integrada; seus arquivos de inspeção não representam aceite do trecho completo. Consulte as evidências integradas da entrega para os resultados finais.

Por Sentinela, o orçamento medido foi de 19 partes renderizáveis e aproximadamente 11,3–12,2 mil triângulos por povo. O teste limita cada kit a 24 partes/30 mil triângulos; não é meta de FPS nem prova de ausência de clipping em todas as poses.

Pendências concretas:

1. Hero mesh final de cada povo, mãos/dedos, topologia deformável, rig esquelético/facial, animações de ataque/conjuração com antecipação e recuperação; o passe atual ainda é procedural e tem distância substancial da arte conceitual.
2. Revisão artística de frente/lado/costas e inspeção de clipping de armadura/capa/arco em todos os corpos e poses; altura final e opções corporais dependem da reconciliação conceitual da Bíblia.
3. LOD/culling espacial do cenário e textura/atlas autorais de acabamento após medir em GPU real. O batching atual reduz draw calls, porém amplia volumes de culling; não afirmar desempenho final.
4. Colisão fina com copas/toldos e transições graduais de retorno da câmera; caixas conservadoras podem recolher a câmera antes da superfície visual. A cerca e o pequeno portão decorativo não são obstáculos de jogabilidade.
5. Validar leitura com efeitos reduzidos, tons de cinza, 1280×720/1920×1080, GPU real, Chrome/Edge e Windows, além de comparar capturas com as pranchas junto ao usuário.
