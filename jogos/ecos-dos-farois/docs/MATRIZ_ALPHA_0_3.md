# Cobertura — candidata Alpha 0.3

Estados indicam evidência desta missão, não conclusão do MMORPG nem aprovação estética. Testes automatizados e clientes de protocolo usam dados sintéticos. A Bíblia V1.1.0 e a missão atual prevalecem sobre textos superados de imagens históricas.

| Sistema | Cobertura e evidência | Limite/próximo passo |
|---|---|---|
| Contas e personagens | Funcional verificado em testes/soak: oito vagas, ambas as facções, propriedade, uma sessão preservando a primeira | Cadastro público, senha/email e recuperação de conta ausentes |
| Facção/povo/classe | Funcional verificado no servidor; 16 combinações elegíveis preservadas, quatro kits em jornadas | Não são 16 rigs finais nem matriz final de design |
| Aparência | Funcional cosmética, três variantes, sem bônus; geometria testada nos 16 pares | Editor corporal e rig facial ausentes |
| Jornada inicial | Funcional verificado por protocolo público nas quatro classes e dois lados, sem grants; combate, retorno, prêmio, equipamento e desfecho | Não equivale a quatro jornadas humanas completas em GPU/Windows |
| Missão/estado pessoal | Funcional verificado: três ecos, chefe, duas escolhas, recompensa única e retomada | Narrativa/NPCs candidatos; convergência gradual completa não produzida |
| Combate | Funcional verificado: Tab Target/autoataque, alcance, recarga, custo, cast/interrupção, barreira, cura aliada e autoridade | Tuning experimental, talentos/especializações finais ausentes |
| Inventário/equipamento | Funcional verificado: 24 espaços, permissão por classe, moeda/XP/saque e mochila cheia sem perda | Banco/mercado/troca não implementados |
| Fabricação | Funcional verificado: uma estação/receita, alcance/visão, insumo/carteira/serial/produto atômicos e falha real de escrita | Profissões/receitas múltiplas e progressão ausentes |
| Companheiro | Funcional verificado: captura real com tempo de confiança, disputa, vínculo, um ativo, comandos, persistência | Uma espécie/um vínculo, sem saúde própria/IA defensiva/estábulo completo |
| Persistência | Funcional verificado: schema preservado, testes negativos, reabertura, integridade/FK e 30min com seis reinícios | Nenhum banco pessoal recebido/migrado; validar saves reais com checkpoint |
| Encerramento/locks | Funcional verificado em regressões e soak: recusa de escritor concorrente e sessão duplicada | Incidente original Windows B1.1 permanece sem causa identificada |
| UI/UX | Implementado: HUD compacto, informações de alvo/alcance, hotbar com detalhes, notificações coalescidas, foco de menus e opções | Frames reais1280/1920 e controles640 verificados; combate visual/anel, parede em navegador, GPU e aceite estético pendentes |
| Câmera | Implementado e testado: zoom/orbita, volume de colisão/terreno e métricas de obstrução | Reavaliar clipping em todos os obstáculos e GPUs |
| Arte/cena | Parcial: passe procedural original, materiais/silhuetas, arquitetura/Farol/vegetação e glTF local real | Distância grande das pranchas; personagens finais, skinning e animação facial não entregues |
| Áudio V1.1 | Integração técnica verificada: sete arquivos preservados, fades/atenuação/limite/dedup, volume e silêncio | Escuta subjetiva e mixagem final no dispositivo pendentes |
| Voz/diálogo | Infraestrutura/legendas/IDs/canal de voz implementados; manifesto de 16 gravações ausentes | Dublagem PT-BR e vocalizações do jogador não entregues |
| Multiplayer | Funcional verificado com quatro contas sintéticas, isolamento, cura, combate, reconexão e retomada | Sem teste de carga MMORPG/internet/produção |
| Estabilidade | 1800,687s reais em integração de protocolo: 185 health, 35 checksSQLite, seis reinícios, 81 reconexões | Não é sessão gráfica Windows de 30min nem benchmark GPU |
| Desempenho | Medição identificada no navegador Linux/SwiftShader, qualidade/resolução registradas | Metas GPU não homologadas; renderização por software lenta |
| Guildas/montarias/voo/raids/masmorras | Adiado/ausente conforme recorte | Sem menus usados como evidência de implementação |

Prioridade seguinte: validar a candidata no Windows e preservar o diagnóstico B1.1; revisar a estética de gameplay; produzir um herói com malha/rig/animações finais e assets de cena consistentes; gravar falas PT-BR; medir e otimizar em GPU representativa; só então ampliar catálogo de profissões/feras/mundo.
