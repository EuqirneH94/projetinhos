# Requisitos de implementação — trecho jogável, UI, arte e áudio

Revisão documental em 17/10/2026. Este checklist orienta o trabalho no código real da candidata Alpha 0.2; não atesta implementação, aceite visual ou execução de testes.

## Fontes lidas e limites

- **M:** `/workspace/attachments/631387a7-a0d1-47af-a52a-e334b17a217a/EDF_Missao_Codex_Jogo_Jogavel.md`, missão atual, especialmente linhas 13–43, 49–85 e 89–118.
- **B:** documentos vigentes da raiz `/workspace/edf-audit-001/gdb-documental/EDF-GDB-1.1.0/`: `README.md`, `DECISIONS_V1_1.md`, `ART_DIRECTION.md`, `CLASSES_AND_TALENTS.md`, `NPC_DIALOGUE_AUDIO.md`, `VISUAL_REFERENCE_INDEX.md`, `ALPHA_0_1_SCOPE.md`; consulta pontual a `COMBAT_SYSTEM.md` e `DECISIONS_AND_PENDING.md`.
- Os textos em `history/` são históricos. O índice vigente distingue **regra APROVADA**, **solução PROPOSTA**, **decisão PENDENTE** e **IMPLEMENTADO VERIFICADO** (`README.md:56–66`).
- Os ZIPs novos da Alpha 0.2 e das referências visuais ainda não estavam acessíveis a esta revisão por excederem o limite de download de 32 MiB. Não foram inspecionados seus arquivos, imagens, rigs, áudio ou código. As descrições das pranchas abaixo vêm da documentação; não substituem a inspeção de pixels exigida pela missão. Não se deve executar esta missão na B1.1 antiga fingindo que é a Alpha 0.2.

**Precedência prática:** a missão atual autoriza implementar o trecho ampliado, inclusive quatro kits e módulos subsequentes. Ela supera o antigo limite de dois kits como recorte de produção, mas não aprova automaticamente nomes, números, anatomia ou balanceamento finais. As 16 combinações povo × classe foram autorizadas no B1 como metadados; preservar sua elegibilidade não prova 16 kits/rigs prontos. A política da segunda sessão foi decidida posteriormente: recusar a segunda e manter a primeira.

## Regras aprovadas a preservar

| ID desta revisão | Regra | Rastreabilidade |
| --- | --- | --- |
| REG-01 | Identidade original de **Fantasia Heroica Arcana**; personagens expressivos, silhuetas claras, equipamentos marcantes e paisagens mágicas coloridas. A referência de MMORPG não licencia copiar conteúdo. | DEC-002/027/030; `ART_DIRECTION.md:7–11`; M:32 |
| REG-02 | Vigília = Valdários/Kordrânios; Confluência = Elúvios/Náquiros. Bases visuais: humanoides heroicos, robustos minerais, esguios da natureza arcana, anfíbios/aquáticos. | DEC-027; `ART_DIRECTION.md:52–63`; M:33 |
| REG-03 | Quatro classes. Permissão de equipamento é da classe; especializações: Sentinela/placas, Arcanista e Ressonante/tecido, Errante/couro e **somente arco/besta**. Não criar restrição de armadura por povo nem adaga implícita no Errante. | DEC-005/009–013; `CLASSES_AND_TALENTS.md:6–19,144–146`; M:34 |
| REG-04 | Criação facção → povo → classe → aparência → nome; aparência sem bônus; oito personagens e uma sessão por conta; ambos os lados na conta. Negar segunda sessão mantendo primeira. | DEC-042–046; M:35–36,93; decisão explícita do usuário no B1 |
| REG-05 | Tab Target, autoataque, hotbar; efeitos, alcance, custo, recarga, dano, cura e recompensa validados no servidor. | DEC-006; `COMBAT_SYSTEM.md:8,18–34`; M:37,95–96 |
| REG-06 | Inícios separados por facção; NPC reativo ao progresso pessoal; o progresso de um jogador não deve bloquear a missão de outro. NPC com voz é direção aprovada. | DEC-031/033/034/048; `NPC_DIALOGUE_AUDIO.md:8–14,24–36`; M:38,40,74 |
| REG-07 | No máximo um companheiro ativo na primeira Alpha. Raids, voo, expansão e masmorras completas fora deste marco. | DEC-014/060; M:43,75 |

## Checklist executável e evidência mínima

Todos os itens abaixo estão **PENDENTES DE VERIFICAÇÃO NO CÓDIGO ALPHA 0.2** nesta revisão. “Autorizado” indica trabalho pedido pela missão, não funcionamento comprovado.

| ID / prioridade | Trabalho autorizado e direção de produção | Evidência para marcar funcional |
| --- | --- | --- |
| BASE-01 / P0 | Identificar pasta/branch/commit/mudanças e scripts reais; checkpoint e cópia isolada; comparação seletiva com Alpha. Preservar bancos, WAL/SHM, credenciais, locks e saves. | Inventário, hash/checkpoint, diff revisável e dados sintéticos segregados; nenhuma sobrescrita de projeto ou banco. M:13–20. |
| EST-01 / P0 | Entrar pelo fluxo público, verificar health/logs/sessão e reentrada após reinício antes de expandir dependentes. Não chamar falha injetada de reprodução da queda Windows. | Comandos/códigos de saída/ambiente; fluxo real nos dois inícios; integridade SQLite, escrita única, desligamento e recuperação. Causa antiga continua desconhecida se não reproduzir. M:16,49,98. |
| UX-01 / P1 | HUD em PT-BR com vida/recurso, alvo, cast, hotbar, objetivo e conexão legíveis. Diário compacto para manter o cenário e o combate visíveis. | Capturas de gameplay a 1280×720 e 1920×1080, incluindo combate e missão; nenhum controle inacessível ou sobreposição impeditiva. `ART_DIRECTION.md:77–95,127`; M:63,99. |
| UX-02 / P1 | Alvo com identidade/relação claras; distância e alcance da ação; área com origem e raio compreensíveis; motivo de recusa e recarga próximos da ação relevante. Coalescer avisos repetidos sem ocultar erro novo. | Casos do Ressonante da Clareira: alvo selecionado, fora de alcance, recarga, sem recurso e ação aceita; texto/ícone/forma além de cor. M:105; `ART_DIRECTION.md:91–101`. |
| UX-03 / P1 | Hotbar com ação/atalho/recurso/recarga reconhecíveis; indicação de seleção, bloqueio e disponibilidade. Mensagens comuns discretas; não cobrir personagem, alvo ou área perigosa. | Navegação por teclado/menu e combate; sem aprisionar Tab nos menus; teste em escala de cinza. `COMBAT_SYSTEM.md:18–25`; `ART_DIRECTION.md:93,126`; DEC-055. |
| CAM-01 / P1 | Terceira pessoa com rotação, zoom limitado e tratamento de obstáculos. Prever redução de tremor/efeitos e alternativa ao movimento intenso de câmera. | Caminhar/combater junto a parede/construção; personagem, alvo e informações essenciais legíveis; gravação do percurso. `ART_DIRECTION.md:97–101`; M:63,99. |
| ART-01 / P1 | Inspecionar as imagens recebidas. Selecionar primeiro um personagem representativo e cena pequena com caminho, vegetação, construção, NPC e Farol. Melhorar rosto/proporção/silhueta, armadura/arma, materiais, terreno, escala/composição e luz. | Comparação referência × gameplay identificada; origem/licença de cada asset; lista de geometria provisória; avaliação estética do usuário pendente. M:55–61; `ART_DIRECTION.md:39–75,116–120`. |
| ART-02 / P1 | Preparar carregamento de assets adequados à stack e rig quando necessário; repouso, caminhada, corrida, ataque, conjuração, impacto e morte. Cast/acerto acompanham confirmação do servidor. | Gameplay e teste de equipamento em todos os corpos disponíveis: encaixe, clipping, arco armado, corrida e conjuração; sem dano duplicado por animação. M:59,95,99; TST-ART-002. |
| ART-03 / P1 | Limitar emissivos e partículas para não apagar volumes; materiais distinguíveis; perigo legível por forma/movimento além de cor. | Combate com efeitos reduzidos e em escala de cinza; custo medido de luz/sombra/transparência, sem declarar meta gráfica alcançada só por screenshot. `ART_DIRECTION.md:43–50,99–101,118,126`. |
| PLAY-01 / P1 | Jornada de cada facção: criar/selecionar, entrar, caminhar, conversar, explorar/combater, retornar, recompensa, reação do NPC, equipar, sair e retomar. Narrativa candidata em dados próprios. | Percurso contínuo sem teleporte/comando privilegiado; dois personagens em etapas distintas não vazam progresso nem bloqueiam um ao outro. M:69–77,94,97. |
| CLASS-01 / P1 | Quatro kits iniciais distinguíveis: Sentinela/frente-defesa; Arcanista/magia-controle; Errante/distância com arco/besta; Ressonante/cura-suporte. Valores e nomes não aprovados num catálogo **experimental**. | Ataque, recurso, alcance, recarga e ação característica confirmados pelo servidor; Ressonante cura aliado real; Errante mostra arma correta; pedidos adulterados/repetidos recusados. M:71,95–96; `CLASSES_AND_TALENTS.md:120–129`. |
| ITEM-01 / P1 | XP/progressão, saque, inventário/equipamento. Níveis 1–5 e 24 espaços são parâmetros experimentais na ausência de decisão posterior. | Mochila cheia não perde item/recompensa; repetição não duplica XP/moeda/itens; falha de gravação não deixa estado parcial; reentrada/reinício preservam resultado. M:73–74,96,98. |
| EXT-01 / P2 | Após o ciclo acima estável: uma estação/receita e fera comum do Errante com captura/comandos e um ativo. Preservar partes já funcionais. | Insumo/produto atômicos; captura válida; segundo ativo recusado; comandos/retomada persistentes conforme recorte. M:75; `ALPHA_0_1_SCOPE.md:39–50`. |
| AUD-01 / P1 | Localizar laboratório V1.1; integrar cues em eventos reais. Direção atual: mais corpo, cristais breves, menos sustentação e sem agudo contínuo junto ao Farol. Ganho, duração, distância e simultaneidade limitados; transições suaves. | Sessão auditiva real documentada; ouvir perto/longe do Farol, exploração/combate e múltiplos eventos; identificar arquivos ausentes/provisórios. M:41,81–85,100. Não inferir áudio apenas de quadros. |
| AUD-02 / P1 | Música, efeitos, ambiente e voz com volumes separados e silêncio; ativação por gesto do usuário; sinal visual dos eventos; retomada após foco. | Som/silêncio, perder/retomar foco, mudar volume, reconectar e repetir evento de rede: sem duplicar fala/impacto nem bloquear informação. M:83,100; TST-ART-005; TST-AUDIO-001/002. |
| AUD-03 / P1 | Falas com IDs, legenda PT-BR e condições de missão. Servidor revalida as opções/ações. Vozes com procedência; falas sem asset explicitadas. | Dois personagens em estágios diferentes, mudança de condição durante conversa e retransmissão do mesmo evento; estado/legenda coerentes. Não anunciar dublagem pronta sem arquivos e audição. M:85; `NPC_DIALOGUE_AUDIO.md:38–66`. |
| EVI-01 / P1 | Evidenciar gameplay real e medir resolução/cena/qualidade/FPS/frame time/hardware/duração. Executar sessão integrada de 30 minutos. | Logs associados a build/commit e capturas identificadas; distinguir Linux/navegador em software/protocolo de Windows/GPU do usuário. M:89–105; `ALPHA_0_1_SCOPE.md:60–72`. |
| DEL-01 / P1 | Código/diff, changelog, matriz de cobertura, pacote reproduzível/manifesto/SHA256, guia PowerShell para instalar/jogar/testar/parar/rollback. | Comandos reais conferidos nos scripts; sem dados pessoais; versões anteriores preservadas; candidato até validação de destino e estética. M:109–118. |

## Propostas utilizáveis, sem transformá-las em cânone

- **HUD experimental:** agrupar vida/recurso e alvo no alto; objetivo resumido lateral; hotbar e cast na base; notificações breves fora do centro da mira. Abrir inventário/diário/configuração sob demanda. Essa composição é uma solução de UX a validar, não um layout aprovado nas pranchas.
- **Paleta editorial candidata:** Fundo `#142636`, Pedra `#196E78`, Ressonância `#48C8C2`, Ouro `#D6AC65`, Índigo `#8970B5`, Ruptura `#A74968`, Pergaminho `#F1E6CE`. Medir contraste real; nenhum significado deve depender só da cor (`ART_DIRECTION.md:77–95`).
- **Áudio/cues candidatos preservados:** AUD-BRAND, AUD-BEACON, AUD-COMBAT, AUD-PET, AUD-WORLD e AUD-MUSIC. A referência antiga de camadas harmônicas do Farol deve respeitar a direção posterior de cristais breves e ausência de agudo contínuo. Não usar a prévia conceitual como prova de licença ou asset final.
- **Kits de referência:** autoataque/ataque/guarda/provocação; projétil/lentidão/interrupção; arco/disparo/marca/companheiro; cura direta/periódica/proteção. São candidatos funcionais do capítulo; tuning/nome/kit final continuam revisáveis. Armas exatas de Sentinela, Arcanista e Ressonante e cobertura de outros materiais do Sentinela continuam PEND-008.
- **Produção de personagem:** kit modular com encaixes documentados, materiais simples controlados e emissão localizada; otimização/LOD/atlas orientados por medição. Modelos geométricos provisórios não equivalem ao padrão gráfico pedido.

## Pendências a registrar sem bloquear trabalho independente

| Pendência | Consequência e ação segura |
| --- | --- |
| Código Alpha 0.2 e imagens inacessíveis nesta revisão | Não editar/empacotar baseline antiga como entrega atual. Obter extração/caminho compatível; daí confirmar scripts/assets e implementar no checkpoint correto. |
| Laboratório de áudio V1.1 e vozes ainda não localizados | Integrar apenas arquivos acessíveis e com procedência; concluir infraestrutura e marcar cues/falas sem asset. A direção de timbre atual está na missão, não num pacote auditado aqui. |
| PEND-014/019 — artes atuais, escala e anatomia | Comparar VIS-009×012 (Kordrânios) e VIS-013×016/017 (Elúvios); estudar VIS-018–020 para Náquiros; não canonizar alturas médias inventadas, cauda/guelras/membranas nem antigos Kaelth. Registrar escolha experimental e submeter estética. |
| PEND-005/006/007/008/016 — matriz final, talentos, tuning, armas, recurso do Sentinela | Preservar a elegibilidade B1 e implementar kits autorizados com catálogo experimental; não anunciar matriz/árvores/balanceamento finais. |
| Logo, fonte, paleta e licenças finais | Estudos VIS-003–005 e Cinzel/Inter são propostas. Registrar a licença do arquivo efetivamente distribuído e não copiar interface/marca de referência. |
| Voz/memória/rotina | NPC com voz e reatividade são direção aprovada; método de voz, alcance de memória e rotinas universais não são. Começar com condições determinísticas e NPC crítico disponível. |
| Windows, causa antiga e aceite visual | Linux/injeção de falha não homologam incidente Windows. Candidata só pode ser aprovada com evidências de destino e avaliação do usuário; desempenho em software não mede GPU real. |

Nenhum item foi marcado como implementado ou aprovado esteticamente por esta revisão. Não houve edição de código, banco, save ou asset.
