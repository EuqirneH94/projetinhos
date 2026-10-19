# Ecos dos Faróis — Náquiro 001, candidato experimental

Versão `0.3.1-naquiro.1`. Inclui a base jogável Alpha 0.3 e a primeira representação esquelética optativa do Náquiro masculino Errante. Não é aceite de arte final nem validação Windows/GPU.

1. Confira os hashes e extraia **todas as partes Jogo na mesma pasta nova**. São ZIPs independentes complementares; não concatene e não extraia sobre dados existentes.
2. Tenha Node.js 24.13+ da linha24. Build, áudio e ws acompanham a distribuição; Blender e npm ci não são necessários para apenas jogar.
3. Siga [docs/WINDOWS_NAQUIRO_001.md](docs/WINDOWS_NAQUIRO_001.md) para iniciar com bancos novos de laboratório e uma janela anônima/perfil separado. Isso preserva os arquivos e as chaves de retorno do navegador habitual.
4. No navegador, abra o jogo com `?character=naquiro-male` e escolha **Confluência → Náquiros → Errante**. Sem a opção, ou nas outras combinações, o visual anterior permanece disponível.
5. Abra `/character-lab.html` para examinar as vistas, as 11 animações, a linha do tempo e a topologia. Jump/Land/Swim são apresentações no ateliê; não adicionam mecânicas ao mundo.
6. Encerre o servidor por Ctrl+C e aguarde a confirmação antes de reiniciar.

As fontes Blender são entregues em pacote separado: extraídas na mesma pasta principal, acrescentam `art-source/naquiro-male` com o .blend editável, GLB portátil, mapas e scripts. O jogo utiliza o glTF/PNGs locais exportados, mantendo a política de segurança existente.

Não mova bancos em uso, apague locks ou substitua os saves anteriores para experimentar o modelo. Use uma cópia fria dos dados somente depois do checkpoint e do procedimento do guia. Não há migração de esquema, mudança de gênero ou interpretação nova de appearance.

A modelagem atual é autoral assistida por scripts Blender, com malha deformável e materiais mapeados, mas a retopologia manual, o acabamento de rosto/cabelo/roupa, a revisão humana de fidelidade e a medição Windows/GPU ainda estão pendentes. [Detalhes técnicos e limites](docs/CHARACTER_NAQUIRO_001.md).

Controles e percurso da base preservados: WASD/setas mover, mouse direito/roda câmera, Tab/clique alvo, 1/Espaço autoataque, 2–5 habilidades, 6 tônico, E interagir, F saque, I mochila, J diário, M áudio, H ajuda e Esc fechar. Combate, missões, áudio, inventário, ofício/companheiro e autoridade do servidor seguem os contratos existentes.
