# Ecos dos Faróis — Alpha 0.3 candidata

Esta versão evolui a Alpha 0.2 enviada pelo usuário: HUD mais compacto, alvo/alcance/recarga mais claros, passe de materiais/personagens/cena, câmera com obstáculos e efeitos reduzidos, áudio V1.1 refinado, uma receita e um companheiro básico do Errante.

**Continua candidata.** As artes conceituais ainda não foram atingidas. Modelos/rigs finais, dublagem PT-BR e aceite Windows continuam pendentes. O incidente original Windows B1.1 não foi declarado resolvido.

## Jogar no Windows

1. Confira SHA-256 e extraia as **duas partes na mesma pasta nova**. Não concatene os ZIPs e não misture com a versão anterior.
2. Tenha Node.js 24.13+ da linha24 instalado.
3. Na pasta `Ecos_dos_Farois_Alpha_0_3`, execute `Jogar_Ecos_dos_Farois.cmd`.
4. Mantenha o terminal aberto; o navegador abre em http://127.0.0.1:8787/ após health confirmar a versão.
5. Crie um personagem ou use a chave existente no banco correto. Aparência é cosmética.
6. Encerre por Ctrl+C no terminal e aguarde a confirmação.

Os builds, áudios e `ws` acompanham a entrega; não é necessário baixar dependências para jogar quando a extração estiver completa. Não abra o HTML diretamente.

## Percurso

Converse com Elara ou Lyssara → aceite a missão → três Bruminos/dois Cernes → saque/retorno/recompensa → equipe → três ecos → Núcleo Fraturado → restaure o Farol. Depois da missão inicial, a bancada prepara tônico com duas Seivas claras e três moedas; Errante pode enfraquecer um Brumino a20–40%, parar o autoataque e iniciar vínculo de8s pelo menu Companheiro na mochila. Receita, nomes, números e vínculo único são experimentais.

WASD/setas: mover; mouse direito/roda: câmera; Tab/clique: alvo;1/espaço:autoataque;2–5:habilidades;6:tônico;E:interagir;F:saque;I:mochila;J:diário;M:áudio;H:ajuda;Esc:fechar. Passe mouse/foco na hotbar para detalhes/prévia; o servidor decide o resultado.

## Preservar dados e validar

O banco padrão fica em `data/ecos-alpha.sqlite` da nova pasta. Não há importação, conversão ou restauração automática. Para reutilizar dados existentes, pare a versão anterior, confirme exclusividade, preserve backup frio e configure caminhos absolutos, mantendo legado e contas separados. Não apague bancos/WAL/SHM/locks/guard para iniciar.

Leia **docs/WINDOWS_ALPHA_0_3.md** antes de usar saves existentes. Ali estão PowerShell, testes, som/silêncio, reinício e rollback. Consulte também **docs/REPORT_ALPHA_0_3.md**, **docs/MATRIZ_ALPHA_0_3.md**, **docs/ART_ALPHA_0_3.md** e **docs/AUDIO_ALPHA_0_3.md**. O ambiente executado nesta missão foi Linux; roteiro PowerShell não equivale a execução Windows.
