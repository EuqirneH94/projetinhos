# Ecos dos Faróis — missão de implementação para o Codex

Data: 17/10/2026. Ambiente de destino: projeto local do usuário no Windows.

## Resultado solicitado

Trabalhe no repositório real aberto no Codex para entregar uma versão jogável de Ecos dos Faróis, com avanço concreto nos gráficos e nos sistemas definidos. Faça a inspeção necessária e continue para implementação e testes; uma auditoria ou um plano, sozinhos, não encerram esta missão.

Execute em incrementos pequenos e verificáveis. Preserve o código e os dados existentes. O objetivo deste marco é um trecho inicial completo, do personagem ao desfecho de uma missão, que sirva de base para ampliar o jogo. O catálogo inteiro de um MMORPG permanece um programa de produção; registre sua cobertura sem declarar tudo pronto por existir um menu, um documento ou um identificador.

## 1. Identifique a base antes de editar

1. Leia as instruções aplicáveis do repositório, incluindo AGENTS.md. Informe pasta absoluta, branch, commit, alterações locais, stack, versões, scripts de execução, banco e assets disponíveis. Se a pasta não usar Git, registre isso e faça uma cópia de trabalho separada.
2. Trabalhe em branch ou cópia isolada, preservando mudanças do usuário. Crie checkpoint de código. Use dados sintéticos nos testes; preserve saves, contas, credenciais e bancos existentes.
3. Confirme qual base está realmente aberta. O histórico contém B0.1, B1, a corretiva B1.1 e uma candidata Alpha 0.2 produzida no Work. A numeração mais alta não comprova homologação nem compatibilidade.
4. A última evidência conhecida da B1.1 era execução em Linux com 50 testes e 20 repetições SQLite; o aceite Windows e a causa da queda original permaneciam pendentes. Procure evidências posteriores no projeto. Não transforme testes sintéticos em prova de resolução daquele incidente. Valide estabilidade e persistência antes de considerar a nova entrega homologada.
5. A candidata Alpha 0.2 pode ser inspecionada para reaproveitamento seletivo. Não sobreponha o projeto com seu ZIP nem trate seus gráficos, mapa, habilidades ou roteiro como aprovados. Compare o código e porte somente alterações compatíveis e testadas.
6. A base conhecida usa TypeScript/Three.js/Vite, Node/WebSocket e SQLite. Confirme no código atual. Preserve a tecnologia existente nesta missão; uma eventual migração para Unreal Engine exige uma decisão específica posterior.

Mantenha os bancos legados e de contas separados conforme o projeto. Backup SQLite deve ser consistente: use a API apropriada ou serviços parados com exclusividade confirmada. Preserve WAL/SHM e mecanismos de lock; não remova locks para esconder falhas. Não execute dois escritores sobre o mesmo banco.

## 2. Fontes e decisões que precisam orientar a implementação

Localize a Bíblia EDF-GDB-1.1.0, seus documentos atuais da raiz e as referências visuais. Comece por README.md, DECISIONS_V1_1.md, ART_DIRECTION.md, VISUAL_REFERENCE_INDEX.md, ACCOUNTS_AND_CHARACTERS.md, CLASSES_AND_TALENTS.md, COMBAT_SYSTEM.md, NPC_DIALOGUE_AUDIO.md e ALPHA_0_1_SCOPE.md. Consulte os capítulos proprietários dos módulos que alterar.

As instruções anteriores de missão e recortes da Alpha documentam momentos anteriores. Esta missão pede avançar para implementação jogável. Preserve a distinção entre regra aprovada, proposta de produção, implementação existente e funcionamento comprovado. Nomes ilustrativos, números de balanceamento e detalhes anatômicos pendentes podem receber uma solução experimental documentada; isso não os transforma em cânone aprovado.

Se os documentos não estiverem no workspace, use o resumo abaixo para o trabalho independente e informe exatamente quais fontes faltam para resolver uma dependência. Não alegue ter lido materiais indisponíveis.

| Tema | Direção a preservar |
| --- | --- |
| Identidade | Fantasia Heroica Arcana: personagens expressivos, silhuetas claras, equipamentos marcantes, paisagens mágicas e coloridas, identidade original. A referência de MMORPG clássico orienta experiência e linguagem; não autoriza copiar assets ou conteúdo de franquias. |
| Facções e povos | A Vigília: Valdários e Kordrânios. A Confluência: Elúvios e Náquiros. Valdários humanoides heroicos; Kordrânios robustos/minerais; Elúvios esguios ligados à natureza arcana; Náquiros anfíbios/aquáticos. Não reutilizar povos e filiações superados das imagens históricas. |
| Classes | Sentinela, Arcanista, Errante e Ressonante. Classe governa equipamento. Sentinela tem especialização em placas; Arcanista e Ressonante em tecido; Errante em couro, com arco ou besta. Preserve as permissões efetivamente confirmadas; não invente restrições raciais. |
| Criação | Facção → povo → classe → aparência → nome. Aparência cosmética, sem bônus. Até oito personagens por conta, personagens de ambas as facções permitidos e apenas uma sessão de jogo por conta. Recusar a segunda sessão preservando a primeira. |
| Matriz povo × classe | O histórico B1 contém 16 combinações como metadados de teste. Isso não comprova 16 kits funcionais nem substitui a validação da matriz de design. Preserve a elegibilidade existente e documente qualquer ampliação. |
| Combate | Terceira pessoa, Tab Target, autoataque e hotbar. Servidor valida ações, alcance, custos, recargas, dano, cura e recompensas. |
| Narrativa | Inícios separados por facção e convergência gradual. Corrupção inicialmente inconsciente; sem vilão comandante precoce. NPCs com histórias, relações e reações ao progresso. Escolhas moderadas, com estados pessoais no mundo compartilhado. |
| Social | Guildas exclusivas por facção quando o módulo for implementado. Uma conta com personagens dos dois lados não autoriza guilda mista. |
| Voz e diálogo | NPCs com voz PT-BR e interpretação natural; jogador com vocalizações. Direção de diálogo híbrido clássico/cinemático. Produção e integração de voz precisam de arquivos e evidência; texto funcional deve ser identificado como etapa provisória. |
| Áudio atualizado | Usar a direção V1.1: mais corpo, cristais breves, menos notas sustentadas. Evitar efeitos agudos contínuos, especialmente próximos do Farol. O elogio à prévia valida a direção de timbre, não todos os sons como assets finais. |

Raids, voo livre, expansão dos Herdeiros Celestiais, Ascendente e seus sistemas ficam fora deste marco. Masmorras de cinco jogadores e 20–30 minutos pertencem ao planejamento posterior. Preserve essas decisões na documentação, sem trazê-las para o trecho inicial.

## 3. Ordem de execução

### A. Estabilizar a entrada existente

Execute os checks previstos pelo repositório e reproduza o fluxo de entrar no mundo. Confira cliente, servidor, health, logs, sessão, persistência e comportamento após reinício. Corrija bloqueios reproduzíveis antes de ampliar sistemas dependentes. Se o incidente antigo não se repetir, registre os cenários tentados e mantenha a causa como desconhecida.

Não encerre o trabalho depois do inventário se houver base suficiente para implementar. Registre um plano curto e prossiga na branch isolada.

### B. Produzir o primeiro padrão gráfico dentro do jogo

Inspecione as referências visuais como imagens, incluindo os estudos posteriores dos quatro povos. Preserve as ressalvas de ART_DIRECTION.md sobre textos superados, diferenças de anatomia e variantes ainda propostas.

Implemente primeiro um personagem representativo e uma pequena cena completa com caminho, vegetação, construção, NPC e Farol. Essa cena estabelece um padrão reproduzível para os demais personagens e para o segundo início de facção.

Trabalhe em proporções, rosto/silhueta, armadura, arma, materiais, iluminação, terreno, composição e escala. Prepare o carregamento dos assets reais adequados à stack, rigs quando necessários e animações coerentes de repouso, caminhada, corrida, ataque, conjuração, impacto e morte. Registre origem, licença e alterações dos assets utilizados. Geometria provisória pode apoiar o desenvolvimento, mas não deve receber o status de acabamento gráfico concluído.

Capture evidências da cena executando no cliente. Apresente imagens de gameplay separadas de conceitos e renders externos. Registre a comparação com a referência, o que melhorou e o que ainda falta; a aprovação estética final cabe ao usuário. Continue os trabalhos independentes enquanto essa avaliação estiver pendente.

Implemente câmera em terceira pessoa com zoom, rotação e tratamento de obstáculos; verifique personagem e alvo legíveis próximos de paredes. Interface em PT-BR deve manter hotbar, missão, recurso, alvo e mensagens acessíveis em 1280×720 e 1920×1080. Inclua redução de efeitos e controles de áudio.

### C. Fechar o trecho jogável

Entregue os módulos em sequência, aproveitando os existentes e testando cada integração:

1. Criação/seleção de personagem e entrada válida para os dois lados, com aparência mínima coerente com o povo.
2. Navegação, colisão, câmera, seleção de alvo e interação com NPC.
3. Kits iniciais funcionais das quatro classes, com ações e apresentação que distingam frente/defesa, magia/controle, distância e cura/suporte. Use catálogo de tuning identificado como experimental para valores ainda não aprovados. Teste o Errante com arco/besta e a cura do Ressonante em alvo aliado real.
4. Uma sequência curta por facção com conversa inicial, objetivo de exploração/combate, retorno, recompensa e reação do NPC ao progresso. O jogador deve entender o próximo objetivo e alcançar um desfecho sem comandos de desenvolvedor.
5. Experiência e progressão inicial, saque, inventário e equipamento com validação no servidor. Use o recorte de níveis 1–5 e mochila de 24 espaços como parâmetros experimentais caso não exista decisão posterior. Evite recompensa duplicada e perda de itens quando a mochila estiver cheia.
6. Reentrada e reinício recuperando o progresso persistente. Escolhas pessoais não devem impedir outro jogador de completar sua missão.
7. Após o ciclo acima estar estável, implemente os próximos módulos do recorte estendido da Bíblia: uma receita/estação de fabricação e uma fera comum do Errante com captura e comandos básicos, respeitando um companheiro ativo. Documente dependências de design ainda pendentes sem desativar partes já funcionais.

Nomes de NPCs, missões e habilidades dos protótipos são candidatos quando a aprovação não estiver demonstrada. Guarde a narrativa em dados identificáveis para revisão posterior, evitando espalhá-la em lógica de rede ou renderização.

### D. Integrar som, efeitos e diálogo

Localize o laboratório de áudio V1.1 e integre os cues adequados aos eventos reais. Ajuste ganho, duração, distância e quantidade simultânea de sons; transições de ambiente/música precisam ser suaves. Um evento de rede repetido não deve tocar a mesma fala ou impacto duas vezes.

Mantenha controles separados de música, efeitos, ambiente e voz, além de silêncio. Forneça informação visual para eventos essenciais e respeite a exigência do navegador de interação antes do áudio.

Implemente o sistema de falas com IDs, legendas e condições de missão. Use vozes disponíveis com procedência adequada. Se faltarem gravações, conclua a integração técnica e registre as falas sem asset; não anuncie dublagem entregue. Não substitua o timbre V1.1 por loops agudos contínuos.

## 4. Verificação obrigatória

Execute checks e testes apropriados às mudanças, preservando as regressões da base. Não invente comandos de scripts inexistentes nem conte teste pulado como aprovado. Registre comando, código de saída, ambiente, commit e evidência.

| Verificação | Evidência esperada |
| --- | --- |
| Contas/personagens | Oito vagas respeitadas no servidor; criação inválida e acesso alheio recusados; aparência sem efeito mecânico; segunda sessão recusada sem expulsar a primeira. |
| Jornada real | Criar/selecionar, entrar, caminhar, conversar, combater, receber recompensa, equipar, sair e retomar após reinício. Sem teleporte ou alteração privilegiada para simular conclusão. Testar ambos os inícios. |
| Quatro classes | Ataque, recurso, recarga, alcance e ação característica funcionando; cura em aliado e arma correta do Errante. Animação e efeito correspondem à confirmação do servidor. |
| Autoridade | Cliente adulterado não concede dano, item, XP, moeda ou recompensa; repetição da requisição não duplica resultado; falha de escrita não produz estado parcial. |
| Multiplayer | Duas contas distintas na mesma zona, interação/combate e estado coerentes; retomada após perda de conexão; isolamento de progresso pessoal. Conexões sintéticas devem ser identificadas. |
| Dados/estabilidade | Integridade SQLite, persistência, encerramento e reinício; logs de falhas preservados; nenhuma regressão nos mecanismos de escritor único. |
| Gráfico/interface | Gameplay real nos dois tamanhos de tela; câmera junto de obstáculos, equipamento nos corpos disponíveis e combate com efeitos reduzidos. Evidenciar clipping ou itens provisórios restantes. |
| Áudio | Sessão com som e em silêncio; volumes, distância, repetições, retorno após perda de foco e ausência de agudos contínuos incômodos. |
| Desempenho | Medir em máquina e configuração identificadas, com resolução, cena, qualidade, FPS/frame time e duração. As metas da Bíblia são candidatas; comparar com os resultados sem afirmar aprovação automática. |

Faça uma sessão de estabilidade de 30 minutos quando o trecho estiver integrado. Se o ambiente não permitir teste gráfico ou Windows real, registre essa limitação e entregue o roteiro executável. Testes Linux, navegador em software e clientes de protocolo devem permanecer identificados como tais; não comprovam desempenho na GPU do usuário.

Referência adicional: no vídeo enviado em 17/10, a candidata Alpha 0.2 mostra um Ressonante na Clareira da Confluência, seleção de alvo e avisos de alcance/recarga. Use esses casos para conferir a clareza do combate: alvo selecionado, distância, origem/raio de área, motivo da recusa e indicação de recarga. O vídeo sozinho não demonstra um defeito de dano nem aprova o gráfico apresentado. Não há diagnóstico de áudio baseado somente nos quadros do vídeo.

## 5. Entrega do Codex

Ao concluir os incrementos possíveis, entregue:

- Código no projeto/branch identificados, commits ou diff revisável e changelog das alterações.
- Instruções Windows PowerShell verificadas para instalar, iniciar cliente/servidor, testar, parar e voltar ao checkpoint. Identifique terminais separados e caminhos reais. Não forneça Bash como se fosse PowerShell.
- Build/pacote versionado reproduzível, com dependências e assets necessários, manifesto e SHA-256; sem bancos pessoais, tokens ou credenciais.
- Relatório curto com testes efetivamente executados, resultados, imagens/vídeo do jogo e limitações de ambiente.
- Matriz de cobertura dos sistemas definidos: funcional verificado, parcial, ausente ou adiado, com arquivos/evidências. Documente também propostas novas e pendências de aprovação estética ou de design.
- Lista objetiva do que falta para o próximo marco, priorizada por dependência e impacto no jogador.

Não apague a versão anterior nem restaure banco do usuário como parte da entrega. Prepare rollback e mantenha a nova versão como candidata até os testes de destino e a avaliação do usuário. Prossiga autonomamente em edições reversíveis e testes autorizados; peça uma decisão somente quando uma informação indispensável ou uma mudança de escopo realmente impedir o próximo trabalho.

## Prompt curto para iniciar no Codex

```text
Leia EDF_Missao_Codex_Jogo_Jogavel.md e execute a missão na pasta atual do projeto Ecos dos Faróis. Identifique e preserve a base real, as alterações locais e os saves. Consulte a Bíblia e as referências visuais disponíveis. Depois da inspeção necessária, avance para implementação incremental do trecho jogável, gráficos, áudio V1.1 e testes; não encerre apenas com um plano. Trate a Alpha 0.2 recebida como candidata para comparação. Entregue código, evidências reais, comandos PowerShell, pacote versionado e pendências explícitas.
```
