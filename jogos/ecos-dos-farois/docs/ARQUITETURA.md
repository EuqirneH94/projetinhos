# Arquitetura e regras de autoridade

O navegador desenha o mundo e apresenta a interface. O servidor recebe intenções e calcula o resultado. O mapa está em um módulo compartilhado para previsão visual; a cópia do cliente não é fonte de autoridade.

## Fluxo

1. Cliente abre `/ws` na mesma origem e pede criação por apelido ou retorno por token.
2. Servidor gera UUID e 32 bytes aleatórios; envia a chave apenas à conexão proprietária. SQLite recebe somente SHA-256 do token.
3. Cliente envia direção X/Z normalizada e sequência crescente, a 20 Hz. Não envia posição, velocidade, vida, dano, XP ou tempo decorrido.
4. Servidor integra em passos de 50 ms, limita direção, verifica colisões e ignora entrada antiga. Após 250 ms sem nova direção, para o personagem.
5. Mundo é transmitido a 10 Hz. Posição, nome, vida e nível dos jogadores são públicos; inventário, missão, moedas, recargas e a chave não são enviados como dados dos outros jogadores.
6. Cliente interpola jogadores remotos/inimigos com atraso de 120 ms. O guerreiro local usa previsão leve e correção do servidor, inclusive teleporte para reaparecer.

## Ações

Mensagens JSON permitidas: `join`, `resume`, `move`, `skill`, `quest`, `loot`, `item`, `respawn`, `ping`. Cada tipo tem campos e valores permitidos em `protocol.ts`; campos extras são rejeitados. Tamanho lógico máximo é 512 bytes; o transporte fecha quadros acima de 1024 bytes. Binário é rejeitado.

Há orçamento de 45 mensagens/s com rajada de 70, encerramento após 4 mensagens inválidas, timeout de entrada de 5 s, heartbeat e limite de buffer de saída de 256 KiB. O servidor aceita até 32 conexões simultâneas e limita criação a 12 personagens por IP/minuto. Esses são controles básicos de protótipo, não uma infraestrutura anti-abuso completa.

Origens de navegador são comparadas à lista exata configurada. Clientes técnicos sem cabeçalho Origin podem conectar; Origin não é autenticação. Token é a credencial. Cliente não escolhe qual ID controlar. Retomar um token ativo substitui a conexão anterior; o fechamento antigo não apaga o novo proprietário.

## Mundo e IA

Uma instância de mundo por processo. Cada inimigo tem origem, alvo, recarga de ataque, participantes, ciclo de reaparecimento e máquina de estados: patrulhar → perseguir → atacar → retornar, ou morto → reaparecer. Alvos mortos, desconectados, na vila ou longe da origem levam ao retorno. Ao voltar, o inimigo restaura vida e limpa participantes. Não há navmesh; existe desvio lateral básico.

Na morte, o estado é alterado uma vez antes de criar o saque. Participantes elegíveis recebem crédito uma vez. Saque possui ID exclusivo e dono; a coleta exige proximidade, capacidade e dono correto. O handler síncrono remove o registro ao conceder o item/moedas; outra solicitação encontra o registro ausente. Nenhum endpoint de teste permite editar o mundo.

## Persistência

SQLite integrado ao Node 24, WAL, `synchronous=FULL`, chaves estrangeiras e schema versão 1. `players` guarda um JSON de progresso por personagem; `sessions` relaciona hash do token e validade. Criação do personagem/sessão é transacional; o salvamento individual usa uma escrita atômica do JSON completo, incluindo inventário, moedas e missão.

Gravação de ações importantes é imediata no fluxo de processamento, mais autosave de 5 s e salvamento no encerramento/desconexão. Inimigos e saques não são persistidos. Não há suporte a dois servidores usando o mesmo arquivo, shards, múltiplos workers de jogo ou economia distribuída.

Em falha de gravação, o servidor para de processar o mundo, encerra conexões e passa `/health` para erro. O operador precisa corrigir armazenamento/permissões e conferir backup antes de reiniciar. O código não oferece garantias de plataforma de produção.

## Áudio

`score.ts` guarda a partitura; `audio-synth.ts` gera timbres/ruído e roteia os quatro buses; `audio.ts` agenda música, posição, passos e eventos autoritativos. Áudio não interfere nas regras de combate. A síntese funciona offline após instalar o projeto, sem APIs pagas, streaming ou arquivos de terceiros.
