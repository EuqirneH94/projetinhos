# Resultado final de navegador — candidato Náquiro 001

O ateliê do asset corrigido foi executado realmente em Chromium 154 / SwiftShader, com o build de produção 0.3.1-naquiro.1, Node.js 24.14.0 e bancos sintéticos externos ao repositório.

- **Ateliê aprovado estruturalmente:** os 11 clips foram selecionados pelo controle e avançaram em RAF real; a timeline pausou em Idle 0,4 s; wireframe e carregamento de seis texturas passaram. Sete verificações do modo `lab` passaram, sem erro JS ou CSP. Oito capturas finais incluem frente, perfil, costas, rosto, mãos, pés, wireframe dos pés em 1280×720 e frente em 1920×1080.
- **Vídeo real do ateliê:** 50,28 segundos, 960×720, Run reproduzido durante órbita por arrasto do mouse, com 24 observações de avanço real. WebM original e MP4 H.264 estão disponíveis. Nenhuma pausa de RAF ou injeção de relógio, câmera, estado ou ossos foi usada no vídeo. A taxa codificada de 25 fps não mede frames únicos renderizados nem desempenho em GPU.
- **Correção de cores verificada visualmente:** frente/rosto recuperaram pele turquesa, membranas salmão e adornos dourados. Isso corrige o defeito de exportação; a aprovação artística e a naturalidade da animação continuam pendentes.
- **Mundo incompleto:** a entrada real retornou welcome/state e HUD, e uma tentativa carregou o novo ator. A movimentação não foi concluída: a execução apresentou pausas longas do host/renderer e reconexões que limpam as teclas. A última tentativa teve intervalo de frame acima de 72 s e expirou aguardando atualização de loading. Não há captura final do mundo, vídeo de jogo contínuo ou aprovação de movimento/interface neste incremento. Os JSONs de tentativas preservam esse resultado sem convertê-lo em aprovação.
- **Outras verificações de navegador pendentes:** 404 e recuperação, retenção por raça/classe/query, dois jogadores no navegador e desempenho Windows/GPU. Os testes de unidade e integração executados separadamente não substituem esses cenários visuais.

O BIN corrigido carregado é `11d4e92762111d18a955b0aecec2965c6c22d8a3aecf9cc2c83d76adcf33fb10`, idêntico no public e no dist. Os módulos selecionados e assets permaneceram inalterados durante as execuções. Nenhum banco, save ou credencial real foi aberto ou incluído nas evidências.

O campo `cleanupComplete` em `BROWSER_STATUS_FINAL.json` registra a conferência final dos processos de navegador, vídeo e servidor. Os detalhes do método estão em `LEIA_METODO.md`; as tentativas rejeitadas ficam separadas e não compõem a galeria final.
