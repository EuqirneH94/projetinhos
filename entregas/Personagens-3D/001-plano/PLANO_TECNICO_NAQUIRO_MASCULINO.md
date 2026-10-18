# Plano técnico proposto — primeiro Náquiro masculino

**Estado: aguardando aprovação do plano; itens abaixo ainda não implementados.** O objetivo é uma malha de personagem trabalhada, com identidade da referência, e execução real no jogo. Não será considerado entregue por existir uma imagem estática ou outra montagem de primitivas.

## Recorte de produção

Produzir um corpo masculino comum e um conjunto piloto de **Errante**, por ser compatível com o couro/tecido marítimo das referências e com o arco já funcional. O visual não acrescenta armas, atributos, habilidades, editor corporal, física de água ou salto. Os quatro kits atuais continuam disponíveis. O primeiro GLB não será aplicado automaticamente às outras classes, aos NPCs ou a todo personagem Náquiro.

Adotar um laboratório visual separado para estudar o modelo e depois uma opção experimental de apresentação, desativada por padrão, para o alvo e classe aprovados. Esta opção não atribui gênero aos personagens salvos e não reutiliza `appearance` para outro significado. Uma seleção masculina/feminina persistente exige RFC de contrato e autorização própria; não é pré-requisito para testar o primeiro modelo.

## Checkpoints e produtos verificáveis

| Checkpoint | Trabalho no Blender | Trabalho em código | Evidência de saída |
| --- | --- | --- | --- |
| A — anatomia | Ficha técnica coerente, corpo e cabeça em pose neutra, mãos/pés/orelhas expostos, estudo de cabelo | Laboratório isolado com câmera e iluminação neutra | Frente/perfil/costas na mesma escala, giro 360°, closes; comparação explícita com VIS-018. Estudo identificado como estudo |
| B — superfície | Escultura refinada, retopologia, UV, bake de escamas, cabelo/olhos, roupa piloto | Loader de avaliação que conserva UVs, skin e materiais | Wireframe, mapas, teste de luz neutra e luz do jogo, vistas de rosto/pele/membranas/roupa |
| C — deformação | Rig, pesos, clips e testes de poses extremas, sockets | Mixer por instância, transições, seleção de clips e testes de independência | Grade e vídeo de todos os clips, poses de ombro/quadril/dedos/membranas, sem ocultar clipping |
| D — integração | Ajustes de escala, pivôs, equipamento e exportação | Adaptador visual optativo, cache, fallback, ciclo de vida e eventos | Captura/vídeo real de jogo, combate/câmera/colisão/reconexão e dois jogadores |
| E — aceite | Correções artísticas da comparação com referência | Regressões, orçamento e perfil em hardware real | Checklist assinado por resultado: aprovado, falhou ou pendente; pacote e hashes reproduzíveis |

Os checkpoints fornecem resultados para revisão e evitam refazer texturas/rig antes de acertar anatomia. A aprovação deste plano autoriza iniciar esse recorte; a versão feminina permanece posterior ao aceite do masculino, conforme a missão.

## Anatomia e materiais

- Resolver frente, perfil e costas do mesmo indivíduo. Silhueta anfíbia compacta/ágil, rosto angular próprio, implantação e volume de cabelo, orelhas em leque com nervuras, mãos e pés adaptados à água.
- Registrar na ficha o número e as proporções de dedos, limite das membranas, formato dos pés e escala. A altura de 1,45–1,60 m da prancha é referência proposta, não dado canônico a gravar. Aprovar proporções primeiro; calibrar escala visual com o mundo sem mudar hitbox, velocidade ou câmera de controle.
- Trabalhar topologia contínua com loops em ombro, cotovelo, quadril, joelho, mão, pálpebra e boca; nenhuma interseção de esferas/cilindros permanecerá como anatomia final. Primitivas podem ser ferramentas iniciais de modelagem.
- Mapas previstos: base color em sRGB; normal tangente e roughness em dados lineares; metallic/occlusion onde aplicáveis; emissivo localizado. Pele, escamas, couro, tecido, cobre e madrepérola devem se distinguir sem iluminar todo o corpo.
- Usar materiais exportáveis por glTF, com bake dos detalhes dos nós do Blender que não forem suportados. Cabelo tem volume e mechas próprias; se houver hair cards, testar máscara/custo e ordenação de transparência. Membranas precisam de espessura ou tratamento de duas faces, sem desaparecer de perfil.
- Registrar autoria, fontes, licença dos recursos realmente usados e referências; não extrair texturas da imagem conceitual nem integrar modelos externos de licença desconhecida.

## Contrato proposto de asset

Nomes e diretórios abaixo são **destinos planejados**, não arquivos já existentes:

```text
art-source/naquiro-male/                 .blend, fontes e instruções de exportação
client/public/art/characters/naquiro/   GLB e, se necessário, texturas locais
docs/characters/                        manifesto e ficha técnica do asset
```

- Modelo glTF 2.0, geometria triangulável, normais/UV/pesos válidos, transformações aplicadas, origem nos pés. Convenção de Blender Z-up convertida pelo exportador para glTF Y-up; corrigir eixo frontal só num nó visual interno.
- Separar raiz lógica do jogo, nó de escala/orientação de arte e esqueleto. Não animar a posição lógica. Definir raiz de exportação e nomes estáveis de bones; controles de produção ficam no `.blend`, animações exportadas são baked nos ossos deformadores.
- Sockets previstos para mão direita/esquerda e arma guardada; bone names e transformações serão registrados no manifesto. O arco/equipamento piloto conserva a função existente. Outras classes usam o fallback até seus encaixes serem validados.
- Manifesto com ID/versionamento visual, hash, unidade/escala, envelope, triângulos, materiais, texturas, bones, lista/duração dos clips e procedência. Não salvar estado de mixer no banco.
- Preferir recursos de mesma origem. Avaliar GLB com texturas embutidas na CSP real; se o carregamento envolver URLs `blob:` bloqueadas, testar primeiro texturas externas locais com glTF. Qualquer ajuste de CSP deve ser mínimo, justificado e coberto por teste de navegador; não relaxar `connect-src` genericamente.

### Orçamento inicial para medir, não desempenho já obtido

Proposta conservadora para o primeiro LOD: até **30 mil triângulos**, cerca de **6 materiais** e **80 ossos deformadores**, quatro influências por vértice; atlas de até 2048² para pele e roupa, mapas menores para olhos/acessórios. Registrar custo total de corpo, cabelo, roupa e arma. A malha de escultura pode ser mais densa; o detalhe é transferido por bake para o modelo de jogo.

Esses limites são metas técnicas de revisão e podem precisar de ajuste fundamentado na aparência e no perfil. Não reduzir a anatomia a cones para cumprir contagem. Não aumentar limites de testes antigos para fazer o novo asset passar. Criar verificações próprias para o contrato novo e manter os testes do fallback.

LOD/culling e compressão só entram depois da primeira medição; não introduzir decoders/CDNs ou extensões sem necessidade. Medir carregamento frio/quente e memória com várias instâncias.

## Rig e animações

O `.blend` precisa conter rig editável e pesos revisados; o GLB, skin funcional e clips. Animações de locomoção serão in-place. Retargeting só será usado se a anatomia e a licença permitirem; pés palmados, orelhas e postura não podem herdar deformações inadequadas de um humano genérico.

| Clips planejados | Apresentação técnica | Ligação ao jogo atual |
| --- | --- | --- |
| `Idle` | Respiração, peso e movimento secundário discretos | Parado, sem deslocamento real |
| `Walk`, `Run` | Ciclos com comprimento de passada medido | Escolher/sincronizar com velocidade efetiva. O jogo atual não tem estados separados de caminhada/corrida; o teto é 5,4 unidades/s, com velocidades analógicas menores. Demonstrar ambos no laboratório, sem inventar novo controle de corrida |
| `Jump`, `Land` | Sequência com aterrissagem e deformação corretas | **Somente laboratório** nesta missão: não há salto físico/protocolo/input; Espaço continua ataque |
| `Attack` | Antecipação, contato visual e recuperação com arco | Evento confirmado, sem disparar dano pelo clip |
| `Cast` | Preparação/gesto, manutenção e término/interrupção quando necessário | Estado `casting` e eventos existentes; cancelamento visual acompanha o servidor |
| `Hit` | Reação curta e legível | Evento de dano ao `targetId`, com controle de prioridade; sem interromper autoridade mecânica |
| `Death`, `Recover` | Queda/retorno sem deformações graves | Estado `dead` e respawn do servidor; não teleportar por root motion |
| `Swim` | Ciclo coerente com mãos/pés/membranas | **Somente laboratório** até existir mecânica de água aprovada |

Crossfades e prioridades devem evitar estalos: morte prevalece, locomoção não sobrepõe indevidamente conjuração, ações não podem ficar presas após interrupção. Avaliar sobreposição de membros superiores apenas se necessária; primeiro provar clips e transições simples. Checar pé no chão, arco/mãos, interpenetração, torções, roupa e membranas em todos os clips, não apenas na pose neutra.

## Adaptação do Three.js

Criar um adaptador visual de personagem com operações de atualização, ação, equipamento e descarte, mantendo `warrior()` funcional como reserva. O adaptador não deve fingir ser os grupos rígidos `left/right/arm` para receber as mesmas rotações.

1. Cache de carregamento por asset/versionamento; validar meshes, skin, UV e clips antes de disponibilizar o candidato. Falha conserva o placeholder e emite diagnóstico sem credenciais.
2. Instância esquelética independente por jogador, usando clonagem adequada de skeleton, mixer próprio e referências controladas aos recursos compartilhados.
3. Manter ID/root lógico, picking, nome, barreira, órbita, câmera, colisões e posições da rede. Ajustar somente ancoragens visuais de cabeça/arma e envelope, sem mudar alcance/hitbox.
4. Derivar passada do deslocamento observado, tratar imobilização por colisão, teleporte e reconexão. O `dt` hoje é limitado a 0,05 s; definir explicitamente tratamento de aba suspensa, sem reproduzir uma fila atrasada de ações ao retornar.
5. Consumir eventos de animação antes de filtros de partículas. Efeitos reduzidos não podem desativar ataque, dano ou morte do rig.
6. Parar actions, remover listeners/mixer e liberar recursos quando a última referência sair. Carga tardia não ressuscita jogador nem sobrepõe a versão/seleção mais recente.
7. Oferecer reversão imediata para o visual atual pela opção de apresentação; remover a pasta do asset não pode impedir a entrada no mundo.

## Plano de validação e aceite

| Grupo | Verificação necessária | Evidência mínima |
| --- | --- | --- |
| Fidelidade | Comparar mesmo indivíduo frente/perfil/costas, rosto, orelha, mãos/pés, cabelo, escala, materiais | Prancha comparativa e revisão humana; screenshots não substituem o arquivo 3D |
| Asset | Parse real de GLB/glTF, pesos normalizados, bones/UV/índices finitos, clips realmente presentes e com duração | Relatório automatizado e inspeção no Blender; não contar nomes de clips vazios como animações |
| Deformação | Todos os clips e poses extremas, equipamento/roupa e pés | Vídeo 360° e de animações, marcando qualquer clipping/defeito |
| Loader | Sucesso, HTTP/arquivo corrompido, clip ausente, cancelamento/descarte e troca de seleção durante carga | Testes positivos/negativos com fallback verificável |
| Multiplayer | Dois jogadores Náquiros em ações diferentes, entrada/saída/reconexão | Poses independentes, sem mixer/ossos compartilhados, memória estabilizada após ciclos |
| Autoridade | Visual não muda dano, alcance, equipamento permitido, velocidade ou sessão | Suite existente e regressões relevantes, sem enfraquecer expectativas |
| Persistência | Mesmos personagens/inventário/quests/posição após reinício, opção visual desligada e ligada | Banco sintético/clonado com checkpoint e integridade; sem migração SQLite |
| Navegador | Texturas na CSP real, equipamento, câmera, picking, colisões e efeitos reduzidos | Capturas **reais do jogo** em 1280×720 e 1920×1080 e vídeo contínuo identificado |
| Desempenho | Baseline e candidato na mesma máquina/rota/qualidade, frio/quente e múltiplos atores | CPU/GPU/RAM/navegador/resolução registrados, draw calls/triângulos, frame time mediano/P95 e memória |
| Windows | Executar no PC com GPU real, Chrome/Edge, sessões e reinício | Logs locais e validação humana; Linux/SwiftShader não substituem o aceite |

Meta inicial proposta: 30 FPS ou mais e P95 de frame até 33,3 ms na configuração/hardware alvo registrados, em rota controlada de pelo menos 60 s. Se a própria baseline não atingir a meta, registrar ambos os resultados e investigar o gargalo; não atribuir a aprovação ao asset apenas por não piorar um cenário lento. Sem GPU alvo identificada e medição real, desempenho fica pendente.

Manter os 95 testes atuais e acrescentar regressões significativas do adaptador. A aprovação dos testes existentes não comprova fidelidade artística nem desempenho. Não considerar o vídeo de um render do Blender como evidência de execução no jogo.

## Preservação e rollback

Baseline imutável identificada por commit e manifesto; código novo em branch revisável. Arquivos de produção e saves atuais não são substituídos nesta entrega. Depois de aprovado, desenvolver em cópia/laboratório e testar com dados sintéticos antes de habilitar o candidato na representação de um jogador.

Não há migração de banco necessária para um GLB optativo de apresentação. Não sobrescrever bancos, converter `appearance`, renomear contas ou modificar campos salvos para introduzir o modelo. O rollback visual é desligar a opção e retornar ao placeholder; o rollback de arquivos é voltar ao checkpoint em uma pasta separada, conservando a pasta de dados existente. Não usar `git reset --hard` sobre instalação com alterações do usuário.

## Entrega de implementação futura

`.blend` editável, GLB/glTF e texturas finais usados pelo jogo; manifesto/procedência; fontes e instruções de exportação; código e patch; capturas reais e vídeo de movimento; resultados de testes e limitações; hashes SHA-256; guia PowerShell com seleção/reversão do visual e validação no Windows. Arquivos só serão listados como entregues quando realmente produzidos e conferidos.

Permanecem fora do recorte: versão feminina antes do aceite masculino, finalização das outras raças, quatro novos guarda-roupas completos, mudança de motor, novas mecânicas de salto/natação, editor corporal, equipamentos/habilidades inventados e migração de dados. A causa original da queda Windows B1.1 continua uma pendência técnica separada, sem aprovação implícita por esta auditoria visual.
