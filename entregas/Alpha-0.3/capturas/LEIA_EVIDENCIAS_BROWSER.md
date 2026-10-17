# Evidências do navegador — Alpha 0.3 candidata

Data: 17/10/2026. Linux, Chromium 154.0.8037.57, ANGLE/SwiftShader em software, modo econômico. Banco sintético separado; nenhuma operação foi executada sobre saves ou credenciais reais.

## Resultado de cada execução

| Evidência | Resultado real |
| --- | --- |
| `browser-result.json` | Controles em 640×480 aprovados: painel de áudio, volumes por teclado (Home e seta), preferência de efeitos reduzidos refletida no renderer, mochila, foco inicial no botão de fechar, Escape e retorno do foco ao botão da mochila. A execução completa desse harness **não passou**: depois de ampliar a janela, `Locator.focus` atingiu timeout de 20 s. `completed: false` e a falha original foram preservados. |
| `interactions-result.json` | Execução separada em 640×480 concluída: entrada pela UI, caminhada real por W/A, aproximação da NPC Lyssara e diálogo por E, foco na ação de diálogo, fechamento por Escape e tooltip de habilidade por hover. Nenhum erro JavaScript ou warning/error de console. Sem injeção de teleporte, Game, saves ou mensagens de protocolo. |
| `captures-result.json` | Execução separada concluída: um frame real da aplicação renderizado em 1280×720 e um em 1920×1080; capturas reais do compositor em `world-1280x720.png` e `world-1920x1080.png`. HUD, informações da região, barra de habilidades e ações superiores dentro dos limites em ambas. Nenhum erro de página/console. |
| `production-assets.json` | `/art/resonator.gltf` e `/art/resonator.bin` retornaram HTTP 200, bytes e SHA-256 iguais aos arquivos fonte. A política CSP continua com `connect-src 'self'` e a origem WebSocket local. `asset: loaded` confirmado nas execuções do navegador. |

Caminhada observada: posição inicial `(0,24)`; após W, aproximadamente `(0,15.245)`; após A, aproximadamente `(-3.260,13.247)`. Nessa posição, E abriu o diálogo de Lyssara, com a fala, objetivos e recompensas da missão da Confluência. O tooltip de Pulso dissonante mostrou alcance de 16 m, custo de 20 energia, recarga de 4,5 s, conjuração de 0,85 s e a necessidade de selecionar um alvo. O anel de alcance possui implementação/testes, mas seu resultado em pixels não foi capturado neste fluxo; não declarar revisão visual desse anel.

## Instrumentação das capturas

A renderização contínua em software provocou atrasos importantes, tentativas de captura demoradas e reconexão automática nas primeiras inspeções. O servidor continuou saudável; isso não reproduz a queda original do processo no Windows.

Para obter capturas estáticas verificáveis, `support/browser-captures.py` adiciona um wrapper **somente no harness** a `requestAnimationFrame`. Ele aguarda um frame real concluído em 640×480, pausa o laço, amplia a janela, executa exatamente um frame real da aplicação na resolução alvo e captura os pixels reais do compositor com CDP. A câmera, o jogador, o mundo, os saves e os contratos de rede não são alterados. Isso permite drenar a fila da GPU em software antes de capturar. Essa instrumentação não integra o código entregue do produto.

As capturas foram abertas e inspecionadas: o ressonador do portão já não encobre o centro superior na entrada; os textos, custos, atalhos e estados das habilidades são legíveis nas duas resoluções. A geometria e os materiais continuam com aspecto procedural; a distância para as pranchas conceituais permanece visível. As imagens não demonstram arte final aprovada.

## Correção encontrada na verificação real

A primeira carga do glTF falhava porque seu buffer embutido `data:` era solicitado via fetch pelo GLTFLoader e bloqueado pela CSP. O gerador agora grava `resonator.bin` de mesma origem e o glTF usa URI relativa; a política do servidor não foi afrouxada. Os testes de parse, carregamento, falha HTTP e descarte foram adaptados para esse contrato real, preservando o controle negativo.

## Limites e pendências

- Não foi executado Windows nem uma GPU física. Não há aceite de FPS, latência, estabilidade gráfica prolongada, benchmark de parede/quina no navegador ou compatibilidade Chrome/Edge Windows.
- O ensaio de 30 minutos por protocolo e a suíte automatizada são evidências separadas; estas execuções do navegador não constituem um playthrough completo de 30 minutos com renderização contínua.
- Chromium headless silencia a saída de áudio. O painel e as preferências funcionaram, mas não houve escuta humana, avaliação espacial ou mixagem perceptual. Gravações de voz continuam pendentes; o texto de diálogo foi validado.
- Não foi feita revisão visual do alvo, do anel de alcance ou de combate com efeitos completos. As ações servidoras e o renderer têm testes próprios, mas essas verificações não substituem inspeção visual no Windows.
- O timeout do primeiro harness permanece registrado; as execuções posteriores aprovam somente seus fluxos explicitamente descritos. Não somar esses resultados e declarar aprovação integral ou ausência de falhas.

Scripts usados: `support/browser-final.py` (controle parcial preservado), `support/browser-interactions.py` (interação concluída) e `support/browser-captures.py` (capturas estáticas instrumentadas). Os logs completos estão no diretório de evidências, fora desta pasta, com os mesmos nomes.
