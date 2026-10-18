# Representação atual de Náquiros — auditoria visual

Estas duas imagens mostram o modelo **já existente na Alpha 0.3**, sem substituição ou melhoria de personagem nesta auditoria. Não são renders de um novo asset. A representação atual não tem seleção nem metadados de gênero; estas evidências não a classificam como masculina ou feminina.

- `current-naquiro-creation-1280x720.png`: tela de criação; A Confluência, povo Náquiros, classe Sentinela, aparência 0. A seleção foi feita pelos controles DOM normais da interface. A imagem foi aberta e inspecionada.
- `current-naquiro-world-1280x720.png`: o mesmo personagem sintético, criado pelo formulário normal e conectado à Clareira da Confluência. A imagem foi aberta e inspecionada.

Observa-se a representação original por peças geométricas, pele azul-esverdeada, prolongamentos laterais e crista na cabeça, ombreiras arredondadas, escudo e espada do kit Sentinela e tabardo violeta. Na criação é possível ver frente e rosto; no enquadramento padrão do mundo o personagem aparece menor e de costas. As formas e o acabamento continuam simplificados; estas imagens não demonstram malha heroica final, identidade corporal feminina, rig facial ou fidelidade a uma prancha conceitual.

## Verificação executada

Linux, Node 24.14.0, Chromium 154.0.8037.57, ANGLE/SwiftShader em software, modo econômico. Ambas as capturas têm 1280×720 pixels. A entrada na criação e no mundo foi concluída, com `asset: loaded`, zero erros de página e zero mensagens de warning/error no console do navegador. O endpoint `/health` permaneceu saudável e o processo servidor próprio terminou por SIGTERM com código 0. O aviso experimental de SQLite emitido pelo Node está preservado no log do servidor.

O servidor foi executado a partir da distribuição inalterada `/workspace/edf-alpha03/release/Ecos_dos_Farois_Alpha_0_3`, usando a porta própria 18911, `ALLOWED_ORIGINS=http://127.0.0.1:18911`, contas desativadas e um banco sintético exclusivamente em `/workspace/edf-naquiro-auditoria/fixtures/current-naquiro-visual.sqlite`. Nenhum banco ou personagem real foi aberto. Os nove arquivos selecionados de produção, cliente compilado e contratos têm hashes idênticos antes/depois; os hashes estão no JSON. Nenhum código de produção foi editado.

## Instrumentação e limites

Para evitar a lentidão já conhecida da captura contínua em software, o harness externo inicia em 640×480, pausa `requestAnimationFrame` depois de um frame real concluído, redimensiona para 1280×720 com o laço pausado, executa exatamente um frame real da aplicação nessa resolução e captura os pixels reais do compositor por CDP. O laço é retomado para a entrada normal no mundo. Câmera, personagem, saves, regras e mensagens de rede não foram injetados nem alterados pelo harness.

Essa pausa existe somente em `support/capture-current-naquiro.py`, fora do projeto. Não há benchmark de FPS, GPU física, validação Windows, revisão de animações/combate ou escuta humana de áudio nesta evidência. Capturas estáticas não constituem aceite funcional prolongado.

Arquivos de registro: `current-naquiro-result.json`, `capture.log`, `server.log`. O banco sintético pode conter credencial descartável e não deve integrar uma entrega pública. Usar apenas capturas e registros sanitizados. Todos os processos lançados por este harness foram encerrados.
