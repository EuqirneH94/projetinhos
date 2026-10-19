# Náquiro masculino — corpo base 002

Estudo anatômico editável para avaliar o corpo, a cabeça, as mãos, os pés e as membranas em material cinza neutro. Roupas, cabelo, equipamentos e acessórios do candidato anterior permanecem preservados e ocultos. O aceite artístico ainda depende de revisão humana.

Esta entrega mantém a integração existente do jogo. O novo corpo e o rig de estudo não foram exportados sobre os arquivos de runtime; não é necessário substituir a instalação, iniciar o servidor ou abrir bancos para examiná-los.

Comece por [VISTAS.md](VISTAS.md), com frente, perfil, costas, rosto/mãos/pés e wireframe. Consulte também o [relatório técnico](RELATORIO.md), que registra os resultados reais e os limites de anatomia/deformação.

## Arquivos

| Arquivo | Uso |
| --- | --- |
| `Ecos_dos_Farois_Naquiro_Anatomia_002_Fontes.zip` | `.blend` editável e fontes Python deste estudo. |
| `Ecos_dos_Farois_Naquiro_Anatomia_002_Vistas.zip` | Vistas neutras, aproximações, wireframe e evidências de inspeção. |
| `SHA256SUMS.txt` | Conferência de integridade dos arquivos distribuídos. |
| `WINDOWS_POWERSHELL.md` | Download, conferência e abertura em uma pasta separada no Windows. |
| `EDF_NAQUIRO_001_PARA_ANATOMIA_002_FONTES.patch` | Sete arquivos de texto novos; aplicação verificada em diretório isolado. O `.blend` binário vem no ZIP Fontes. |

Baixe pela [pasta desta entrega no GitHub](https://github.com/EuqirneH94/projetinhos/tree/refino/edf-naquiro-anatomia-002/entregas/Personagens-3D/003-anatomia). Na página de cada ZIP, use **Download raw file**. Os dois ZIPs são independentes; não concatene suas partes. O guia PowerShell oferece download direto caso o botão não funcione.

Abra `naquiro-anatomia-002.blend` com Blender **4.3.2**. Versões posteriores precisam de conferência local. Para editar, use **File → Save As** e grave outra cópia; mantenha o arquivo recebido como checkpoint. O `.blend` pode ser aberto sem regenerar a geometria ou instalar dependências do jogo.

O ZIP Fontes foi extraído em uma pasta independente e o `.blend` extraído passou novamente pelos 11 grupos de inspeção e pelas seis poses. Esse teste do pacote também preservou o hash do arquivo. Os resultados estão em `evidencias/package-open/inspection-report.json`.

## Examinar o corpo

| Coleção | Conteúdo |
| --- | --- |
| `00_CHECKPOINT_001_OCULTO` | Objetos anteriores preservados e ocultos, incluindo roupas e acessórios. |
| `01_CORPO_BASE_NEUTRO` | Nova malha principal do corpo e da cabeça unidos pelo pescoço. |
| `02_CABECA_E_MEMBRANAS` | Componentes anatômicos complementares, olhos e membranas. |
| `03_RIG_ESTUDO_NAO_RUNTIME` | Rig adaptado para estudar a deformação. |
| `80_COMPARACAO_001_NEUTRA_OCULTA` | Anatomia anterior copiada para comparação com material neutro. |
| `90_WIREFRAME_CAGE_OCULTO` | Arestas da malha de controle real, sem a subdivisão. |
| `99_ESTUDIO_NEUTRO` | Câmeras, iluminação e fundo. |

As vistas principais usam as câmeras `CAM_front`, `CAM_side` e `CAM_back`. As aproximações incluem `CAM_face-front`, `CAM_face-side`, `CAM_face-three-quarter`, `CAM_shoulder`, `CAM_hand-dorsal`, `CAM_hand-palmar`, `CAM_feet-dorsal`, `CAM_feet-side`, `CAM_feet-sole` e `CAM_ear`.

No **Outliner**, selecione a câmera desejada e use **View → Cameras → Set Active Object as Camera**. Use **View → Cameras → Active Camera** para enquadrá-la. Para girar livremente, saia da câmera e use a navegação habitual do Blender.

Para conferir a topologia, selecione a malha principal, entre em **Edit Mode** e ative as sobreposições de arestas. Desative temporariamente a exibição do modificador de subdivisão se quiser ver somente a malha de controle. A coleção `90_WIREFRAME_CAGE_OCULTO` fornece uma visualização alternativa: oculte `01` e `02` antes de exibi-la, para evitar sobreposição de superfícies. Faça essas mudanças na cópia de trabalho.

Para examinar poses, selecione `Rig_Anatomia_002_Estudo`, entre em **Pose Mode** e mova as articulações na cópia. As imagens e os relatórios fornecidos registram as poses efetivamente avaliadas. Esses testes estruturais não substituem a revisão visual da deformação.

## Referência e limites

Foram consultadas a Game Design Bible V1.1.0 e as referências canônicas VIS-018, VIS-019 e VIS-020. O relatório de fontes registra a identificação e os hashes das referências. A escala técnica de **2,25 unidades** deste estudo não estabelece uma altura canônica para a raça. As contagens de cinco dedos nas mãos e quatro nos pés preservam a convenção do candidato anterior; não representam uma nova decisão de lore.

O corpo possui continuidade de malha entre tronco, membros, mãos, pés e cabeça. Há transições com triângulos e tampas nas extremidades; a malha não é integralmente composta de quadriláteros. As membranas e as barbatanas auriculares são componentes separados, com raízes sobrepostas à pele, e precisam de revisão visual dessas junções.

Os pesos são de estudo. Ombros, axilas, mãos e outras regiões devem ser avaliados em movimento antes de qualquer exportação para o jogo. Uma inspeção estrutural aprovada comprova apenas os critérios registrados no relatório; não comprova anatomia final, ausência de toda interseção ou qualidade final de animação.

O foco deste incremento é a avaliação neutra do corpo. Acabamento de roupas, texturas detalhadas, efeitos, exportação para runtime e a versão feminina continuam pendentes para etapas posteriores. A validação executada na nuvem usa Linux e Blender; os comandos Windows fornecidos ainda precisam de execução real no computador do usuário.
