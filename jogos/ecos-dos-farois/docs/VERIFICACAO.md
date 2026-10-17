# Verificação da alfa 0.1.0

Data da entrega: 14/10/2026, no fuso de São Paulo. Ambiente de desenvolvimento: Linux, Node v24.19.0, npm 11.9.0. A execução no Windows ainda não foi observada.

## Executado

- Instalação de dependências com versões fixas e lockfile; `npm ci --no-fund --no-audit` em diretório isolado vazio instalou 113 pacotes em 10 segundos no Linux.
- `npm run typecheck`: sem erros TypeScript.
- `npm run build`: servidor compilado com TypeScript e cliente compilado com Vite 7.3.7.
- `npm test`: **21 testes passaram, 0 falharam**, sem testes ignorados.
- `npm run doctor`: Node, SQLite e estrutura do projeto conferidos no Linux.
- `npm run audio:preview`: WAV estéreo de 24 segundos gerado.
- `ffprobe`: PCM 16 bits, 22.050 Hz, 2 canais, duração de 24,000 s.
- Manifesto de integridade e conferência de arquivos incluídos no pacote.

O Vite emite aviso de chunk acima de 500 kB por causa do Three.js. O build concluiu; não foi um erro. A versão usa SQLite integrado ao Node, sem instalação de MySQL e sem compilação de extensão SQLite de terceiros.

## O que os testes cobrem

| Verificação | Como foi exercitada |
| --- | --- |
| Dois jogadores diferentes | Duas conexões WebSocket reais ao servidor HTTP local; IDs e tokens distintos; os dois recebem o mesmo mundo. |
| Entrada e movimento | Posições de entrada separadas; fluxo de intenções a 20 Hz; um cliente observa o movimento do outro. |
| Autoridade | Normalização de diagonal, limite de passo/velocidade, colisão e bordas; cliente não pode enviar posição/dano/vida como estado aceito. |
| Combate compartilhado | Dois WebSockets atacam o mesmo inimigo; ambos recebem a mesma vida/morte e o crédito de participação. |
| Alcance, energia e recarga | Ataque distante e ataques repetidos são rejeitados; energia só é consumida em habilidade válida. |
| IA e morte | Perseguição, ataque, retorno, cura do inimigo na origem, morte do personagem e espera para reaparecer. |
| Missão | Proximidade de Maera, aceite, objetivos, entrega e recompensa não repetida. |
| Capacidade e saque | Inventário cheio não concede parte da entrega; dono, distância e remoção única do saque são verificados. |
| Progressão/equipamento | XP e teto de nível 5, troca de arma/proteção, cura, consumo e recarga de tônico. |
| Recuperação | Desconexão e retorno com o mesmo ID; mesmo token em outra conexão substitui a anterior. |
| Persistência real | Arquivo SQLite temporário é fechado e reaberto por outro servidor; equipamento, XP, moedas, missão, inventário e recargas são recuperados. |
| Sessão | Hash SHA-256 no banco, chave incorreta rejeitada e expiração por inatividade. |
| Mensagens inválidas | JSON/schema, campos extras, valores excessivos, origem indevida, quadros grandes e spam. |
| HTTP | Cliente compilado servido; `/health`; método não permitido; tentativa de sair da pasta pública. |
| Interface | Constructor e callbacks em JSDOM: entrada, ajuda, mochila, missão, habilidades, chave, áudio e recarga. O mapa 2D foi simulado. |
| Áudio | Síntese offline de partitura e efeitos; amostras finitas, sinal não nulo, pico abaixo do teto, posição estéreo e silêncio. |

Testes de regras usam relógio controlado e fixtures. No teste WebSocket de combate, o posicionamento inicial é configurado internamente para encurtar deslocamentos; golpes, missão e saque são enviados pela conexão real. A persistência usa fixture de progresso para conferir todos os campos. **Não existe comando público para teletransportar, conceder XP ou editar inventário.**

O teste de áudio usa um renderizador de desenvolvimento, não a saída de som de um navegador/dispositivo. A prévia mediu pico de aproximadamente 0,17611 e RMS de 0,02107 antes dos fades/quantização, com margem numérica contra clipping. Isso não avalia beleza do timbre ou conforto de escuta.

## Ainda depende do seu computador

Não houve navegador com WebGL disponível para inspeção visual nesta sessão. Não foram feitos screenshots, medição de FPS, audição humana da mixagem, testes de toque físico, execução no Windows, teste em LAN/internet nem teste de carga com 32 jogadores. A interface em DOM simulado não comprova layout visual ou renderização 3D. O pacote não foi hospedado publicamente.

## Roteiro manual de aceite

Execute no Windows conforme o README. Marque somente depois de observar:

- [ ] Vila, casas, árvores, trilha, cristal e montanhas aparecem; cenário não está preto.
- [ ] Guerreiro tem espada/escudo/capa reconhecíveis e anda com animação.
- [ ] Mouse direito gira a câmera; roda aproxima/afasta; casas não engolem a câmera.
- [ ] WASD responde e para ao soltar; casas, árvores e bordas bloqueiam passagem.
- [ ] Segundo jogador aparece separado do primeiro; cada aba observa o outro mover.
- [ ] Clique/toque seleciona inimigo e mostra a barra correta; Tab alterna alvos.
- [ ] Ataque fora do alcance não dá dano; recarga e energia aparecem e limitam ações.
- [ ] Brumino e Cerne patrulham, perseguem, atacam, voltam à origem e reaparecem.
- [ ] Os dois jogadores veem a mesma morte; só o dono coleta o saque; repetir F não duplica moedas.
- [ ] Maera oferece a missão; progresso muda nos abates; entrega ocorre perto dela uma única vez.
- [ ] Mochila, equipar, usar tônico e descartar funcionam; números mudam conforme a ação.
- [ ] Fio da Aurora aparece na mochila e aumenta o dano quando equipado.
- [ ] Morrer mostra contagem e botão de retorno; após retornar, missão/mochila permanecem.
- [ ] Recarregar, sair/continuar e copiar/recuperar chave preservam o personagem.
- [ ] Parar e iniciar o servidor preserva o progresso; inimigos e saques reiniciam conforme documentado.
- [ ] Música, vento, pássaros, passos e eventos de jogo são audíveis sem volume incômodo.
- [ ] Geral/música/ambiente/efeitos regulam os grupos certos; M silencia; valores persistem.
- [ ] Ocultar a aba pausa o som e voltar retoma; clique em ♫ resolve eventual bloqueio de autoplay.
- [ ] Layout cabe na tela usada e modo econômico melhora a fluidez quando necessário.
- [ ] No aparelho móvel, joystick, câmera e botões funcionam sem acionar gestos da página.

Correções após esse teste devem partir do problema observado e manter o backup do banco. Esta entrega comprova os testes listados; não declara auditoria de produção ou validação visual/auditiva concluída.
