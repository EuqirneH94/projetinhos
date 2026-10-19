# Verificação do estudo anatômico 002 — rascunho técnico

Este registro descreve inspeções reais em Blender 4.3.2, preservando o histórico dos intermediários e a inspeção do candidato congelado ao final. Não constitui aprovação artística nem aceite do rig. O estudo permanece separado do runtime e dos saves.

## Método

`inspect_study.py` abre o `.blend` sem salvar, avalia o cage e a geometria produzida pelos modificadores reais, examina a conectividade por arestas e mede pesos ósseos, materiais e poses. Registra SHA-256 antes/depois. Os critérios estruturais usam área de face maior que 1e-12, aresta maior que 1e-8 e soma de pesos dentro de 1e-5 de 1. O grupo `ESTUDO_Solda_Pescoco` localiza o plano candidato, mas a solda exige 64 vértices/64 arestas com duas faces incidentes e conectividade contínua corpo/pescoço/cabeça/membros/dedos.

A simetria mede distância entre cada vértice e o vértice mais próximo refletido no plano X=0 do conjunto anatômico. Tolerância de 2e-6; esta medida não comprova correspondência perfeita de todas as faces. Fronteiras abertas são enumeradas: duas aberturas internas de pálpebras no corpo; perímetros dos cages de membranas/orelhas. Membranas e orelhas devem fechar no volume avaliado pelo Solidify.

## Intermediários realmente inspecionados

| Arquivo intermediário | SHA-256 do `.blend` | Resultado |
| --- | --- | --- |
| draft01 | `00d15c4cc4261c7ebb76991da58bcd8a4fe41811ba4d95e9ecf2c70c448ec585` | Falhou: winding do fan central das orelhas; assimetria dos anéis do ombro, máximo 0,009304; deslocamento residual herdado do rig. |
| draft02 | `f17253434abf7cf3da25cb335e9901e1ae72a1e0195f1548a3d57df2c12d582d` | Passou os dez grupos estruturais existentes e quatro poses do script naquela execução. |
| candidato cabeça 3 | `0cea447e22a98fb1538ca1d49934647a65a3cee7549d7b08e0239e485eddc684` | Passou os dez grupos estruturais e seis poses. Ainda é candidato: revisão focal da transição ombro/axila e check adicional de portabilidade aguardam confirmação. |

O primeiro diagnóstico foi preservado em `evidence/inspection-draft01/inspection-report.json`. As causas foram corrigidas nas fontes: fan da orelha com orientação coerente; amostragem espelhável dos anéis do corpo; todos os canais herdados de pose zerados ao importar o rig. Os critérios não foram relaxados.

No draft02, o cage do conjunto tem 14.185 vértices e 14.130 faces: 13.654 quadriláteros, 458 triângulos e 18 n-gons. O volume avaliado tem 53.906 vértices/53.966 faces e 107.628 triângulos tessellados. O corpo conectado isolado possui 10.855 vértices e 10.842 faces no cage. Os números incluem anatomia de olhos/orelhas/membranas quando se referem ao conjunto, e excluem roupas/acessórios arquivados, comparativo anterior, estúdio e duplicatas de wireframe.

No draft02, os 46 ossos de estudo estavam presentes e neutros; todos os vértices anatômicos tinham até quatro influências ósseas normalizadas. Os extremos de soma foram 0,9999999553 e 1,0000000447. O único grupo de metadados da solda não foi contado como peso ósseo. O erro máximo de simetria foi 1,133e-8, sem vértices acima da tolerância. O plano do pescoço foi medido em z=1,925, com 64 arestas de incidência 2, e todas as regiões corporais sondadas pertenciam ao mesmo componente conectado. São coordenadas técnicas de estudo; não aprovam escala racial.

Materiais ativos das coleções 01/02 eram cinzas neutros, sem mapas, nós de cor de vértices/atributos, mapas normais, metal ou emissão. O checkpoint anterior estava presente e oculto na coleção 00. Não houve gravação do `.blend` pela inspeção: SHA-256 antes/depois idêntico.

## Deformação: fatos e limites

As quatro poses executadas no draft02 foram braços laterais, braços acima da cabeça, cotovelos a 90° e um joelho a 90°. A geometria avaliada permaneceu finita, sem faces de área nula, arestas colapsadas, novos limites abertos ou arestas com mais de duas faces. Isto verifica integridade, não qualidade artística de toda a deformação.

O corpo apresentou razões máximas de comprimento de aresta contra o repouso de 2,59× na elevação lateral, 3,58× acima da cabeça, 1,41× nos cotovelos e 1,50× no joelho. O extremo 3,58× exige revisão manual de pesos e suportes/corretivos antes de considerar o rig final. Não foi estabelecido um limiar automático de aprovação artística para essas razões; os valores completos são publicados. No candidato cabeça 3, também foram executados fechamento parcial dos quatro dedos de ambas as mãos (sem polegar) e elevação dos dedos dos pés. Os maiores estiramentos do corpo foram 2,202× e 1,145×, respectivamente; das membranas, 1,264× e 1,094×. As seis poses passaram os critérios estruturais, sem alegar ausência de colisões. Os demais limites e totais mantiveram-se iguais aos do draft02.

As membranas interdigitais são cages separados com espessura editável, sobrepostos às raízes dos dedos, sem solda com o corpo. As orelhas/nadadeiras também são superfícies anatômicas separadas e sobrepostas na raiz; os olhos permanecem submalhas. O corpo/pescoço/cabeça/mãos/pés têm solda real, mas esta continuidade não se estende a todos esses elementos separados.

A inspeção não calcula auto-interseção, colisão entre dedos/membranas, qualidade de expressão facial ou fidelidade canônica. N-gons nas pontas dos dedos e transições de tornozelo com triângulos continuam explicitados como candidatos à retopologia manual. Wireframe deve ser apresentado como cage real, distinguindo-o do volume subdividido. As capturas e a revisão humana continuam necessárias.

## Pendência registrada antes do arquivo congelado (histórico)

Aguardar a confirmação da revisão focal ombro/axila no `.blend` final, executar novamente o inspector com seis poses e com o novo check de portabilidade (imagens FILE incorporadas e nenhuma biblioteca `.blend` externamente vinculada), e registrar o SHA-256, sem concorrer com renderizações. Revisar capturas reais frontal/lateral/traseira, rosto, mãos/pés e wireframe antes de fechar o relatório. Não reutilizar o PASS do draft02 como resultado do arquivo final.

## Inspeção estrutural do candidato congelado

O arquivo congelado `037b321e0d836390669cab741260ca9525ff62e9a5010892a28d49077d9c90db` foi inspecionado após a revisão da transição ombro/axila e dos olhos. Os 11 grupos estruturais e as seis poses passaram em Blender 4.3.2; SHA-256 antes/depois idêntico. O relatório é `evidence/final/inspection/inspection-report.json`, e o log real é `evidence/final/inspection.log`. As métricas anteriores continuam históricas; os totais deste arquivo são os da tabela abaixo.

| Geometria anatômica visível | Vértices | Faces | Quadriláteros | Triângulos | N-gons | Triângulos tessellados |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Cage | 13.885 | 13.746 | 13.318 | 410 | 18 | 27.154 |
| Avaliada pelos modificadores | 53.606 | 53.582 | 53.326 | 256 | 0 | 106.908 |

A íris e a pupila agora são capas finas conformadas ao globo subjacente fechado, sobrepostas à sua superfície e independentes da pele facial. Cada uma das quatro capas nomeadas tem um perímetro aberto intencional de 32 vértices/arestas, conferido separadamente no cage e na geometria avaliada. Nenhum outro tipo de abertura passou a ser aceito por esse ajuste de classificação.

O corpo conectado continua com 10.855 vértices e 10.842 faces no cage (10.726 quads, 98 tris e 18 n-gons), mesmo anel soldado de pescoço de 64 vértices/64 arestas e erro máximo de simetria de 1,133e-8. A coleção 00 permanece oculta. Os 46 ossos estão neutros no arquivo fonte; pesos de todos os vértices têm no máximo quatro influências e soma normalizada. Os materiais ativos continuam neutros.

Todas as seis imagens FILE, utilizadas pelo checkpoint anterior, estão incorporadas no `.blend` e não há bibliotecas externas vinculadas. As superfícies neutras do estudo não usam essas imagens. Este teste de dependências foi de leitura; não houve unpack, relink ou salvamento.

| Pose de diagnóstico | Maior razão de aresta do corpo contra repouso | Maior razão de membranas |
| --- | ---: | ---: |
| Braços laterais | 2,59353× | 1,00061× |
| Braços acima | 3,57878× | 1,00076× |
| Cotovelos a 90° | 1,40676× | 1,00035× |
| Joelho a 90° | 1,49740× | 1,00016× |
| Fechamento parcial dos quatro dedos, sem polegar | 2,20162× | 1,26425× |
| Elevação dos dedos dos pés | 1,14502× | 1,09431× |

Os PASS verificam ausência de valores não finitos, áreas nulas, colapso de arestas e alterações indevidas das fronteiras nos seis exercícios. Não aprovam colisões, volumes nas dobras, auto-interseção ou fidelidade anatômica. A revisão visual independente das 32 capturas foi concluída em `evidence/final/visual-review.md`. Ela registra os limites anatômicos e de deformação visíveis, incluindo abas nas membranas ao fechar os dedos, sem declarar aprovação humana/canônica.
