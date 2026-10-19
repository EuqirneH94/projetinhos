# Náquiro masculino — refinamento do corpo base 002

O incremento entrega um estudo anatômico editável, em cinza neutro, separado do personagem já integrado ao jogo. Há continuidade real de malha entre tronco, membros, mãos, pés, pescoço e cabeça. A entrega permite revisar a anatomia sem roupas, cabelo, acessórios ou texturas que ocultem as transições. **O aceite artístico e a autorização para exportação ao jogo permanecem pendentes.**

## Referência e preservação

Baseline: commit `210c18d711ff832f2e2d7f1f17dc959720ad6ec3`, candidato 001 da branch `entrega/edf-naquiro-001`. A nova branch `refino/edf-naquiro-anatomia-002` acrescenta um diretório de estudo e esta entrega. Os 234 arquivos originais rastreados do jogo foram comparados por SHA-256 e continuam idênticos, incluindo fontes Blender, assets de runtime e código de persistência. Nenhum banco foi aberto, migrado ou convertido; nenhum save foi movido. A comparação integral está em `evidencias/preservation-report.json`.

As fontes 001 permanecem no diretório pai de `art-source/naquiro-male/anatomy-002`. Um checkpoint local das fontes originais também foi criado antes do trabalho. O novo `.blend` inclui os objetos anteriores na coleção oculta `00_CHECKPOINT_001_OCULTO`; o candidato publicado e seu commit continuam acessíveis no Git. Os rascunhos de diagnóstico não substituem os checkpoints entregues.

Foram lidos `ART_DIRECTION.md`, `WORLD_LORE.md`, `VISUAL_REFERENCE_INDEX.md` e `DECISIONS_AND_PENDING.md` da Bíblia EDF-GDB-1.1.0. As imagens VIS-018, VIS-019 e VIS-020 foram abertas e comparadas com os hashes do índice; as três correspondem integralmente. A identificação e os hashes estão em `evidencias/reference-sources.json`.

A referência orientou a silhueta atlética esguia, o encaixe da cabeça, a mandíbula, as barbatanas auriculares e as membranas parciais. A escala técnica de 2,25 unidades e a convenção herdada de cinco dedos nas mãos/quatro nos pés **não estabelecem novas regras canônicas**. Não foram inventadas cauda, guelras, habilidades ou equipamentos.

## Alterações concretas

| Região | Alteração nesta fonte |
| --- | --- |
| Corpo e proporções | Cage explícito no lugar da união por voxel/decimação do corpo anterior; transições contínuas da pelve para as coxas e volumes graduais dos membros. |
| Ombro, peito e axila | Armhole com vértices compartilhados com o torso; braço conectado por anéis. O volume recuado da borda anterior/posterior foi preenchido localmente, reduzindo o sulco entre peito e deltoide; a axila inferior permanece aberta. |
| Tronco e pernas | Relevos geométricos discretos de clavícula, peitoral, escápula, patela e tíbia, sem depender de mapas de normal. |
| Cabeça e pescoço | Perfil craniano interpolado continuamente, mandíbula e queixo revistos; 64 pares coincidentes do pescoço soldados em 64 vértices. |
| Rosto | Anéis orbitais e periorais compartilham a pele facial; órbitas com abertura amendoada e cobertura dos globos. Íris/pupilas aderem à curvatura ocular, evitando o vazamento abaixo da pálpebra. |
| Mãos e pés | Palmas, punhos, tornozelos e raízes dos dedos conectados; comprimentos diferenciados e anéis de suporte para flexão. Tampas e transições remanescentes são explicitadas abaixo. |
| Membranas | Doze superfícies interdigitais parciais com margem livre côncava, espessura editável e pesos entre regiões vizinhas. Barbatanas auriculares menores e posteriores, com superfície curva. |
| Rig | Cópia adaptada de 46 ossos, completamente zerada na pose de repouso, sem substituir o rig ou as onze animações do runtime anterior. |

Não houve acabamento de roupas, texturas detalhadas, efeitos, exportação de glTF/GLB ou alteração do cliente/servidor neste incremento.

## Verificação real

Executado em Linux, Blender **4.3.2**, CPU com dois threads. O `.blend` inspecionado tem SHA-256:

```text
037b321e0d836390669cab741260ca9525ff62e9a5010892a28d49077d9c90db
```

`inspect_study.py` passou **11 grupos estruturais**, incluindo seis poses reais: elevação lateral dos braços, braços acima da cabeça, cotovelos a 90°, joelho a 90°, fechamento parcial dos quatro dedos e elevação dos dedos dos pés. O script abre o arquivo sem salvar e compara seu hash antes/depois. Os relatórios completos registram critérios, contagens, fronteiras e transformações; não são testes simulados.

| Medida do conjunto anatômico ativo | Cage editável | Após os modificadores |
| --- | ---: | ---: |
| Vértices | 13.885 | 53.606 |
| Faces | 13.746 | 53.582 |
| Quadriláteros | 13.318 | 53.326 |
| Triângulos como faces | 410 | 256 |
| N-gons | 18 | 0 |
| Triângulos após tesselação | 27.154 | 106.908 |

As contagens incluem olhos, íris/pupilas, orelhas e membranas; excluem estúdio, checkpoint oculto, comparação anterior e duplicatas do wireframe. O corpo contínuo isolado tem 10.855 vértices/10.842 faces no cage. Não se trata de uma malha integralmente composta por quads.

Foram verificados dados finitos, áreas não nulas, ausência de arestas soltas/colapsadas ou com mais de duas faces, orientação coerente das arestas compartilhadas e fronteiras esperadas. O pescoço possui 64 arestas soldadas com duas faces incidentes e pertence ao mesmo componente conectado dos membros/cabeça. A simetria por vértice refletido teve erro máximo de aproximadamente `1,13e-8`, abaixo da tolerância de `2e-6`.

Todos os vértices anatômicos possuem no máximo quatro influências ósseas normalizadas. A inspeção distingue o grupo de metadados da solda dos grupos de ossos. Os 46 ossos do estudo estavam neutros na abertura do arquivo. Os materiais ativos são cinzas, sem mapas de imagem/normal, atributos de cor, metal ou emissão.

As seis imagens antigas do checkpoint estão incorporadas no `.blend`; não há bibliotecas Blender externas vinculadas. A anatomia neutra ativa não usa essas texturas. A abertura e a inspeção foram repetidas a partir do arquivo salvo, sem executar o gerador. O ZIP Fontes foi extraído em outra pasta e o `.blend` extraído passou novamente pelos 11 grupos e seis poses, com SHA-256 idêntico. CRC e conteúdo dos oito membros do pacote foram conferidos; o patch de sete arquivos de texto também foi aplicado e comparado em um repositório temporário isolado.

### Limites medidos de deformação

| Pose de diagnóstico | Maior razão de comprimento de aresta do corpo contra o repouso |
| --- | ---: |
| Braços laterais | 2,59× |
| Braços acima da cabeça | 3,58× |
| Cotovelos a 90° | 1,41× |
| Joelho a 90° | 1,50× |
| Fechamento parcial dos dedos | 2,20× |
| Elevação dos dedos dos pés | 1,15× |

O PASS confirma a integridade geométrica dos critérios publicados, **não** a qualidade final da animação. O estiramento dos ombros e dos dedos exige ajuste manual de pesos e, se necessário, loops/corretivos antes da exportação. Não foi comprovada ausência de auto-interseções ou contato entre todas as superfícies.

A revisão das capturas encontrou uma aba angular/desalinhamento da membrana entre anelar e mínimo no fechamento parcial da mão, além de compressão posterior no joelho dobrado. Essas poses permanecem publicadas como diagnóstico, sem aceite de deformação. O tornozelo/dorso do pé ainda apresenta faixas de transição, a planta é simplificada e o perfil nasal continua bastante projetado; esses pontos exigem refinamento manual e comparação humana com as referências.

Membranas e barbatanas auriculares são cages separados com Solidify e raízes sobrepostas à pele, sem solda com o corpo. Os globos são fechados; íris e pupilas são capas sobrepostas com um contorno aberto intencional de 32 vértices cada. As aberturas internas das duas pálpebras são enumeradas pela inspeção. Tampas das extremidades com 18 n-gons e 64 triângulos de transição nos tornozelos continuam candidatos à retopologia manual.

## Evidências e reprodução

`VISTAS.md` organiza as imagens reais por câmera, incluindo frente/perfil/costas na mesma escala ortográfica, aproximações, cage, comparação anterior e poses. Os manifestos ao lado das capturas registram câmera, escala, resolução, rotação óssea, SHA-256 da imagem e do `.blend`.

As vistas de estudo usam Workbench com `paint.sl`, material cinza, cor Standard, sem cavidade, brilho especular ou sombras projetadas. Sombras do Workbench produziam manchas triangulares artificiais nas bochechas/pescoço do rascunho; esse diagnóstico foi separado da geometria. Capturas adicionais com **Cycles CPU e luzes de área reais** permitem conferir a superfície por outro método. O wireframe usa o modificador Wireframe sobre as arestas do cage real, sem Subsurf; não é uma textura desenhada. Nenhuma captura recebeu retoque ou montagem.

O renderer centraliza a espessura das arestas do wireframe (`offset=0`) para expor os dois lados de membranas finas. Nas poses de corpo inteiro, ajusta a câmera aos limites da geometria avaliada, com margem de 10%, para não cortar mãos erguidas. A aproximação plantar adicional usa o plano distante real da câmera em 3,22 unidades, removendo do fundo o corpo acima do tornozelo. Esses ajustes de apresentação são temporários, registrados nos manifestos e não modificam o `.blend` salvo.

As inspeções intermediárias detectaram winding incorreto no fan das orelhas, assimetria de 9,3 mm nos anéis do ombro e transformações de pose herdadas. Esses problemas foram corrigidos nas fontes, mantendo os critérios. Logs e relatórios intermediários separados documentam as falhas; apenas o SHA acima corresponde à entrega final.

Não foi necessário executar novamente a suíte JavaScript nesta alteração exclusivamente de fontes artísticas: os 234 arquivos anteriores continuam idênticos. A validação Windows deste estudo ainda depende de execução local; o guia fornece comandos, sem declarar um resultado que não ocorreu neste ambiente.

## Pendências e critérios para avançar

1. Aceite humano das três vistas e dos detalhes contra VIS-018/019/020, em material neutro. Rosto, planos musculares, articulações dos dedos e raízes das membranas continuam abertos a refinamento anatômico manual; este arquivo é um estudo, não uma escultura final aprovada.
2. Polimento dos pesos de ombros/axilas/mãos e revisão visual das seis poses, sem rasgos, perda excessiva de volume ou interpenetrações visíveis. As razões de estiramento atuais devem ser consideradas no aceite.
3. Revisão da retopologia nas tampas, transições de tornozelo, rosto e junções das membranas/orelhas; decidir se as raízes separadas atendem ao acabamento pretendido.
4. Conferência dos hashes, abertura e inspeção no Windows com o guia fornecido, registrando versão do Blender e capturas locais.
5. Só após esse aceite, seguir para acabamento de roupas, texturas detalhadas e efeitos. A futura exportação deve preservar IDs, rig compatível, animações, gameplay e persistência em uma etapa própria. A versão feminina permanece posterior ao aceite do masculino.
