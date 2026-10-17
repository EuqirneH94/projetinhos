# Validação — Ecos dos Faróis Alpha 0.2

Data: 17/10/2026. Ambiente de execução: Linux, Node.js 24.19.0.

## Verificações realizadas

| Verificação | Resultado | Limite |
|---|---|---|
| Base B1.1 antes da edição | 50/50 testes aprovados | Ambiente desta execução, sem novo teste Windows |
| TypeScript e build de cliente/servidor | Aprovados | Não prova desempenho em uma GPU do usuário |
| Suíte final | 60/60 testes aprovados | Domínio, rede, persistência, interface e encerramento |
| Percurso completo por WebSocket | Aprovado | Uma sessão de teste local, sem carga MMORPG |
| Quatro classes em WebGL | Criação, identidade, arma e interface confirmadas | Uma combinação de povo por classe, em renderização por software |
| Enquadramento dos painéis | Dentro da tela em 1280×720 e 1440×900 | Não é auditoria exaustiva de acessibilidade/layout |
| Teclado e interação | Movimento, aproximação da guia, diálogo e aceite aprovados | Janela de 640×480 usada para reduzir o custo do renderizador por software |
| Áudio integrado | Sete arquivos conferidos por hash; carregamento do Farol com HTTP 200 no navegador | Sem escuta subjetiva do assistente e sem mixagem final com dublagem |

O percurso WebSocket usou exclusivamente mensagens normais do protocolo. O cliente
de verificação navegou pelos obstáculos, aceitou a missão, venceu três Bruminos e
dois Cernes, coletou saques, entregou a missão, equipou a recompensa, sintonizou os
três ecos, venceu o Núcleo Fraturado e restaurou o Farol pela opção de circulação.
Uma segunda tentativa não duplicou o prêmio nem alterou a escolha. O servidor foi
encerrado e reiniciado, e a retomada preservou história, carteira e equipamento.

Os testes unitários/de integração também verificaram a alternativa de reparo,
rejeição de alvos de outra facção, conjuração interrompida, proteção temporária,
equipamentos incompatíveis, oito personagens por conta e rejeição da segunda sessão.

## Correções observadas durante a verificação

- Atualização dos testes referentes ao título, aos kits e à mochila de 24 espaços.
- Foco de teclado no canvas ao entrar no mundo.
- Agrupamento de geometrias estáticas de cenário/personagens para reduzir draw calls.
- O watchdog de conexão passou a dar oportunidade de processar mensagens após uma
  pausa longa do event loop, evitando interpretar essa pausa como queda imediata.
- Ajustes de nomes e avisos para manter a guia da facção correta.

## Evidências

- `evidencias/check-final.log`: build e suíte de 60 testes.
- `evidencias/journey-result.json`: resultado do percurso completo.
- `evidencias/classes-result.json`: criação e enquadramento das quatro classes.
- `evidencias/entry-result.json`: movimento e interação no navegador.
- `evidencias/audio-integrity.json`: hashes das sete amostras integradas.
- `evidencias/release-smoke.json`: execução do pacote preparado, HTTP, áudio e WebSocket.

Os testes de falhas de persistência e encerramento injetam erros controlados. As
linhas de diagnóstico desses casos em `check-final.log` são esperadas e aparecem
acompanhadas do resultado de aprovação dos testes.

## Pendências e limites materiais

O navegador de teste usou Chromium 153 com ANGLE/SwiftShader, sem uma GPU representativa
de um computador de jogos. A execução por software apresentou frames lentos em janelas
maiores. Não há aceite de FPS, frame time, memória ou estabilidade prolongada no hardware
do usuário. Os valores de diagnóstico não são um benchmark de Windows.

O iniciador PowerShell/.cmd foi preparado e inspecionado, mas não foi executado no Windows
neste ambiente. O próximo aceite de plataforma é abrir a entrega em uma pasta nova no
Windows, percorrer a missão e conferir retomada, conforto de câmera/áudio e desempenho.

As capturas de inspeção do navegador ficaram apenas na área de trabalho de verificação;
não são imagens conceituais usadas para simular uma entrega visual mais avançada.

Não foram testados cadastro público, hospedagem de produção, latência de internet,
carga de dezenas/centenas de jogadores, combate de grupo, masmorras ou os sistemas
explicitamente ausentes desta Alpha. Não existe declaração de MMORPG completo.
