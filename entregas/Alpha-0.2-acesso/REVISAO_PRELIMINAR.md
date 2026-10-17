# Revisão preliminar — vídeo Alpha 0.2

Estado: implementação pendente de acesso à missão e à fonte atual. Nenhum código ou save alterado.

Inspecionados quadros extraídos do vídeo enviado, incluindo início, cena estável e notificações de combate. A gravação demonstra entrada e interação, mas não certifica persistência, desempenho, missão completa nem aceite B1.1. Não houve avaliação auditiva nesta revisão.

## Observações visuais

- HUD com muitos painéis retangulares de peso semelhante: marca, jogador, alvo, minimapa, missão, ações e opções disputam atenção.
- Minimapa ocupa área expressiva e comunica sobretudo pontos e geometria plana; falta hierarquia visual de destino, interesse e legenda contextual.
- Barra de ações usa descrições pequenas em várias linhas; custo, tecla e recarga competem no mesmo espaço. Proposta: ícone distinguível, tecla estável, recarga legível e descrição em tooltip acessível.
- Mensagens de alcance/recarga empilham-se sob o alvo, atravessando a região central de leitura do combate. Proposta: deduplicação, prioridade e feedback próximo à ação correspondente.
- Identidade arcana aparece nas cores e em alguns focos, mas personagens, vegetação e construções ainda têm acabamento geométrico bastante simplificado. Melhorar apenas CSS não resolve a distância da ambição artística descrita.
- Proposta de revisão: reduzir ruído permanente, dar prioridade ao combate e objetivo imediato, distinguir materiais e silhuetas, melhorar iluminação e orientação visual sem esconder alvos.

Estas são observações/propostas, não decisões aprovadas nem comparação pixel a pixel com artes indisponíveis.

## Fontes e bloqueios

Consultados ART_DIRECTION.md e VISUAL_REFERENCE_INDEX.md da Bíblia V1.1.0 disponível. A direção pede Fantasia Heroica Arcana, silhuetas claras, materiais distinguíveis e ornamentos que não prejudiquem leitura. O índice descreve referências conceituais; não substitui acesso aos pixels nem autoriza mecânicas das legendas.

Não localizado EDF_Missao_Codex_Jogo_Jogavel.md em /workspace, anexos ou arquivos conhecidos. O repositório projetinhos expõe master e branches de entrega B1/B1.1, sem fonte Alpha 0.2 mostrada no vídeo. O ZIP documental disponível não inclui imagens gráficas. É necessário receber a missão, o código atual (ZIP ou caminho/branch) e as referências visuais de produção para implementar sem regredir o trabalho existente.

A solicitação atual autoriza avançar o trecho jogável/visual/áudio. Isso não transforma o vídeo em aprovação dos critérios técnicos B1.1 nem substitui testes Windows; pendências anteriores devem permanecer registradas.
