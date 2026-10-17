# Relatório — Ecos dos Faróis Alpha 0.3 candidata

**Estado:** incremento implementado e testado em Linux, sujeito a validação Windows e avaliação estética/sonora. Não é o MMORPG completo nem acabamento equivalente às pranchas. A causa original do incidente Windows B1.1 continua desconhecida.

## Base real e preservação

A base de jogo foi recebida em dois ZIPs complementares Alpha 0.2. Ambos passaram no CRC e a união conferiu **156 arquivos do manifesto, zero divergências**. O hash informado do ZIP original inteiro não foi comparado, pois recebemos novos ZIPs complementares, não seus bytes originais. Os quatro hashes de entrada constam em `incoming.json` nas evidências. Foram recebidas 20 imagens; o estudo de marca `image-gen-3.png` do índice histórico não veio, sem bloquear os quatro povos disponíveis.

Os anexos permanecem intactos em `/workspace/edf-alpha03/incoming`; a cópia de trabalho foi `/workspace/edf-alpha03/source`, inicialmente sem Git. Criado checkpoint `7e873da757fb6e917a4302997a79812e19f0749a`, branch `trabalho/alpha-0.3`. O repositório `projetinhos` mantém a calculadora e as entregas anteriores; esta missão adiciona fonte/pacote em branch de entrega própria, sem merge no master.

Stack preservada: TypeScript5.9.3, Three.js0.186.1, Vite7.3.7, Node24, ws8.22.0, SQLite integrado. Nenhuma dependência de execução nova. `package-lock.json` mudou somente o número da versão do projeto. Para os checks integrados foi usado **Node24.14.0/Linux x64**; logs específicos dos agentes podem usar24.19.0, identificado em seus registros. Instalação por `npm ci` com lockfile.

Não recebemos nem alteramos bancos pessoais. Testes geraram bancos sintéticos segregados, excluídos dos pacotes. Não houve mudança de tabela, `application_id` ou `user_version`, remoção de lock/guard, conversão de bancos ou restauração de dados. Novos campos opcionais ficam no JSON por personagem; os 11 arquivos de teste anteriores permaneceram byte a byte iguais. Backup/rollback exigem manutenção exclusiva e checkpoint, conforme guia Windows.

## Alterações implementadas

- **UI/UX:** minimapa menor/recolhível, HUD com hierarquia e rótulos de recurso, hotbar com alcance/custo/recarga/estado, detalhes por foco/mouse e prévia de alcance/área no mundo. Avisos repetidos são agrupados fora do centro; menus têm foco contido e retorno, com controles de recuperação acessíveis.
- **Cena:** materiais/silhuetas e detalhes de rosto/traje dos povos, arquitetura/Farol/caminho/vegetação e enquadramento de criação. Câmera com varredura de volume, terreno, zoom e intensidade reduzida. Um glTF arquitetônico original exercita carregamento real com fallback; seu buffer binário é local e compatível com a CSP. Modelos procedurais e animações de grupos continuam provisórios, sem skinning/rig facial final.
- **Áudio:** sete amostras V1.1 preservadas, Farol com atenuação/filtro/fades, orçamento de sons antes da decodificação, cancelamento ao ocultar/silenciar e deduplicação de eventos. Canal de voz e IDs/legendas integrados. Há **16 falas sem gravação** e não foi anunciado TTS/dublagem. Medição de PCM não substitui escuta humana.
- **Trecho estendido:** uma receita/estação de tônico, material individual, serial contra repetição e confirmação durável antes do consumo. Errante pode capturar Brumino com confiança real, reserva exclusiva, interrupções, vínculo persistente, um ator ativo e comandos básicos. Valores, espécie disponível e nomes são experimentais; não há profissão/estábulo completo.

## Evidências executadas

| Verificação | Resultado e limite |
|---|---|
| Baseline Alpha0.2 | Build +60/60 testes aprovados na cópia sem alterações |
| Candidata integrada | Build/typecheck e **95/95 testes aprovados**, zero falhas/skips/cancelamentos; log `release-check.log` |
| Regressões preservadas | 11 arquivos anteriores idênticos, incluindo persistência negativa e lifecycle; hashes em `original-tests-preserved.json` |
| Quatro jornadas | Sentinela/Vigília, Arcanista/Confluência, Errante/Vigília e Ressonante/Confluência: protocolo público, criação/entrada, combate, prêmio/equipamento, ecos/chefe/desfecho, fabricação e retomada após reinício |
| Captura Errante | Oito segundos reais, vínculo/comandos/um ativo e persistência verificados no percurso público; não houve teleporte/grant |
| Cura aliada/multiplayer | Aliado real de outra conta sintética, quatro classes, isolamento por facção e propriedade de personagem |
| Estabilidade | **1800,687s reais** (17/10,19:47:43–20:17:43UTC;16:47–17:17BRT): quatro contas,185 health,35 checksSQLite, seis reinícios,81 reconexões e28 recusas de escritor mais28 de sessão concorrente; nenhuma falha de integridade/FK |
| Compatibilidade/rollback sintético | Cópia fria: Alpha0.3 → Alpha0.2 fornecida (leitura/gravação) → Alpha0.3; credencial, carteira, XP, inventário, missão, história e campos novos preservados; integridade/FK ok (`compatibility.log`) |
| Fonte do soak | Hashes de backend/shared/scripts/pacotes iguais no início/fim e reconferidos antes da entrega; nenhum relógio acelerado |
| Gráfico/interface | Chromium154/Linux/SwiftShader econômico: frames reais1280×720 e1920×1080, limites do HUD conferidos; captura pausa RAF somente no harness após um frame renderizado. Em640×480: caminhada W/A até Lyssara, diálogo E, foco/Esc, tooltip, volume e efeitos reduzidos. Um harness parcial com timeout foi preservado como `completed:false`; não se declara E2E gráfico integral |
| Pacote isolado | Somente `ws` de produção incluído: entrada rápida e por conta, recusa da segunda sessão, reinício/retomada e nove assets HTTP/SHA aprovados; integridade/FK ok (`distribution-smoke.json`) |
| Assets | Sete áudios e glTF/bin local conferidos; procedência em `ASSET_PROVENANCE.json` e `art/PROVENANCE.json`; referências conceituais não foram embutidas como se fossem modelos |

Clientes de protocolo são sintéticos. O soak não foi uma sessão gráfica de30min, não mede internet/escala MMORPG e não resolve o incidente original Windows. A renderização por software ficou lenta: não há homologação de FPS, GPU ou conforto de câmera/áudio do usuário. Capturas de gameplay não são renders conceituais externos.

## Falhas encontradas e tratadas

1. Ensaio inicial de navegador usou porta alternativa fora de `ALLOWED_ORIGINS`, levando a recusa de WebSocket. Corrigida a configuração do ensaio; não foi queda do servidor nem justificativa para afrouxar sua validação.
2. O primeiro asset glTF usava buffer `data:`; a CSP correta o bloqueava, ativando fallback. Corrigido para `.bin` local, com regressão/HTTP/hash e estado `loaded` no navegador. CSP preservada.
3. Ajustada composição do portão/lente para não cortar o topo da visão inicial; removido alias de sombra obsoleto da versão Three.js atual.
4. Harnesses de navegação/captura tiveram ajustes de posicionamento, origem e ferramenta de screenshot. Tentativas interrompidas ou de harness não foram contadas como aprovações. SwiftShader/CDP pode bloquear o event loop durante captura e provocar reconexão; servidor/protocolo continuaram saudáveis. Não foi alterado watchdog para esconder isso.

## Pendências prioritárias

1. **Windows real e estabilidade no hardware do usuário**, incluindo o gatilho B1.1 original, logs de encerramento, progresso após reinício e mecanismos de writer único. O roteiro PowerShell foi revisado, não executado neste Linux.
2. **Aceite estético:** comparar gameplay com as referências; produzir personagem de malha/rig/animação finais e revisar cena/equipamentos/clipping. A solução procedural ainda fica longe das pranchas.
3. **Voz/áudio:** gravar as16 falas PT-BR e vocalizações, registrar procedência e fazer escuta/mixagem no dispositivo. O canal de voz atualmente pode ficar silencioso com legendas.
4. **Desempenho:** medir em GPU representativa, com qualidade/resolução/cena/duração identificadas, antes de declarar metas atingidas.
5. **Escopo posterior:** ampliar profissões/feras/mundo somente após estabilidade/aceite do trecho; guildas, mercado, montarias, voo, raids e masmorras completas continuam ausentes/adiados.

Veja `MATRIZ_ALPHA_0_3.md`, `WINDOWS_ALPHA_0_3.md` e os documentos de arte/áudio/trecho estendido. Nenhuma etapa foi marcada pronta apenas pela existência de um menu ou identificador.
