# Método das evidências de navegador

Estas evidências usam Chromium 154 / ANGLE SwiftShader em Linux e um servidor real, iniciado com Node.js 24.14.0. Cada modo usa um banco SQLite sintético novo, fora do repositório. Nenhum banco ou save do usuário é aberto. As interações usam os controles DOM, teclado, mouse e protocolo público WebSocket; nenhum estado de jogo, câmera ou osso é injetado.

Os JSONs registram o hash do asset e dos módulos antes e depois, resultados individuais e fechamento do servidor próprio. Os eventos WebSocket registram somente os tipos de mensagens e avisos públicos; chaves de retorno, credenciais, tokens e o estado completo não são gravados.

## Capturas estáticas

O harness aguarda um frame real, retém a próxima chamada RAF, redimensiona, aguarda as dimensões reais do backing buffer, completa mais dois frames reais e captura o compositor. Depois devolve o viewport menor e retoma RAF. Isso serve para inspecionar pixels e interface em 1280×720 e 1920×1080. Não mede FPS nem representa um vídeo contínuo.

## Vídeos

Os modos `video` e `labvideo` usam a gravação contínua WebM do Playwright e FFmpeg instalado. Eles NÃO usam o wrapper de pausa de RAF. O vídeo do mundo demonstra entradas reais de teclado, câmera e mochila; o do ateliê demonstra o clip Run e a órbita por arrasto real do mouse. Renderização software pode ser lenta e duplicar frames no compositor; isso não autoriza aceite de desempenho em GPU física ou no Windows.

## Falhas provocadas e tentativas rejeitadas

O modo `fallback` intercepta explicitamente apenas o pedido do glTF e devolve HTTP 404, para verificar o personagem antigo de reserva e a continuidade do jogo. A advertência de retenção do modelo antigo é esperada nesse controle. Uma nova sessão sem interceptação verifica recuperação pelo asset real. Esse 404 é uma injeção controlada do teste, não uma indisponibilidade normal do servidor.

Pastas `attempt-*` contêm tentativas rejeitadas e devem ser lidas com suas ressalvas. A tentativa de resize inicial teve captura incompleta; a tentativa anterior à correção de cores passou pelos controles e clips, mas foi REJEITADA visualmente por cores verdes/pretas incorretas. Não usar essas capturas como galeria final.

## Limites

Carregamento, integridade estrutural, clips e controles aprovados não equivalem a aprovação artística. A inspeção dos renders e das capturas deve acompanhar os resultados. Windows, placa gráfica real e avaliação humana da animação permanecem verificações distintas.
