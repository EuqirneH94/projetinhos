# Sons do Vale de Alvor

Música e efeitos são sintetizados pelo código deste projeto. Não há arquivos extraídos de jogos, gravações compradas, narração, samples externos ou serviços pagos. Os sons são estilizados/sintéticos; não pretendem simular uma orquestra gravada.

## Tema

Partitura em `client/src/score.ts`: 82 BPM, 4/4, 16 compassos, ciclo de aproximadamente 46,8 s. Progressão própria com centro em Ré menor e melodias curtas; cordas dedilhadas por síntese Karplus–Strong, notas senoidais suaves e um grave lento. Um agendador prepara notas com antecedência sem depender da taxa de quadros do jogo.

## Efeitos e mistura

| Grupo | Conteúdo |
| --- | --- |
| Ambiente | Vento filtrado contínuo e pássaros sintetizados espaçados. Floresta tem vento mais presente. |
| Movimento | Passos curtos de pedra na vila/estrada e folhagem no bosque. Só soam se o personagem realmente avança. |
| Combate | Deslocamento da espada, impacto, dano recebido, círculo de magia, queda da criatura e derrota do guerreiro. |
| Progresso | Tônico, saque, missão aceita/concluída, nível e reaparecimento. |
| Interface | Confirmação leve e aviso de ação rejeitada. |

Geral, música, ambiente e efeitos possuem ganhos independentes. O geral passa por compressão dinâmica. Efeitos do mundo têm queda de volume por distância e posição estéreo relativa à câmera; eventos pessoais de recompensa são exclusivos do jogador. **Não há HRTF/áudio binaural completo.**

O primeiro gesto desbloqueia AudioContext; M e ♫ controlam o áudio. Preferências são locais ao navegador, sem ir ao servidor. Ocultar a aba suspende o contexto. A trilha mantém a posição ao voltar.

## Amostra de 24 segundos

Arquivo: `audio/previa-vale-alvor.wav`. É uma mixagem de demonstração renderizada offline, mais alta que o padrão do jogo para facilitar a escuta, com fade no início/final.

| Tempo | Som destacado sobre a música |
| --- | --- |
| 0–3 s | Tema e ambiente |
| 3 s | Pássaro |
| 5–6 s | Passos de pedra e grama |
| 7 s | Espada e impacto |
| 9 s | Círculo de alvor |
| 11 s | Cura |
| 13 s | Recompensa |
| 15 s | Missão aceita |
| 17 s | Subida de nível |
| 20 s | Missão concluída |

Gerar novamente no PowerShell da raiz: `npm.cmd run audio:preview`. Isso usa `web-audio-engine` apenas no desenvolvimento; o navegador usa sua própria Web Audio API. O teste digital mede amostras finitas, sinal, margem de pico, silêncio e estéreo. **Não substitui audição no dispositivo ou revisão artística da mixagem.**

## Escuta manual

Comece em volume moderado. Compare música com ambiente e golpes, silencie cada grupo separadamente e retorne à mesma aba para conferir se as preferências persistem. Caminhe contra uma parede: não devem continuar passos sem avanço. Gire a câmera durante combate com outro jogador para avaliar o estéreo. O som deve parar com M e quando a aba está oculta. Ajustes finos dependem dessa escuta.
