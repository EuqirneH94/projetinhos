# Náquiro masculino — auditoria e plano 001

Entrega inicial da missão **Personagens 3D de qualidade**. Estado: **plano para revisão; personagem final ainda não produzido**.

O jogo usa Three.js. O personagem atual é procedural, com peças rígidas; não possui rig esquelético nem as texturas e animações exigidas pela referência. A correção exige produção de arte no Blender e um controlador de personagem no Three.js.

O Blender **4.3.2 foi executado nesta nuvem Linux**, inclusive com renderização de teste. Esta sessão **não tem conexão com o Blender do PC Windows do usuário**. O teste de ambiente não gerou um personagem.

- [Auditoria: código, anatomia, materiais e riscos](AUDITORIA_ATUAL.md).
- [Plano técnico: produção, integração e critérios verificáveis](PLANO_TECNICO_NAQUIRO_MASCULINO.md).
- [Como conferir o Blender no Windows e trabalhar com os futuros arquivos](BLENDER_NO_WINDOWS.md).
- [Verificações executadas e evidências](EVIDENCIAS.md).
- [Missão recebida](MISSAO_RECEBIDA.md).
- [Hashes da entrega](SHA256SUMS.txt).

Baseline: commit `fe8f7db487da9b58e1cc17a3fd06209b8099b3c6`, Alpha `0.3.0-alpha`, em `jogos/ecos-dos-farois`. Os 189 arquivos do jogo permanecem com os mesmos bytes. Não foram abertos ou alterados bancos/saves existentes. Os ensaios utilizam cópia isolada e dados sintéticos.

A seção 8 da [missão recebida](MISSAO_RECEBIDA.md#8-entrega-inicial) determina: **“Aguarde aprovação do plano antes de substituir o personagem existente.”** Esta entrega cumpre a auditoria e apresenta o plano concreto para essa aprovação. Não contém `.blend`, GLB de personagem ou clips novos; esses produtos estão descritos como trabalho futuro.

Após aprovação do plano, o primeiro alvo é um único Náquiro masculino, com corpo próprio, materiais, rig e conjunto visual piloto de **Errante**. A versão feminina vem depois do aceite do masculino. Demais raças e classes conservam seus visuais enquanto o primeiro modelo é avaliado.
