# Valores da alfa 0.1

`shared/config.ts` concentra os valores editáveis. Alterar o cliente sozinho não altera as regras do servidor.

| Guerreiro | Valor |
| --- | --- |
| Velocidade | 5,4 unidades/s; diagonal normalizada |
| Vida no nível 1 | 120 |
| Vida adicional por nível | 24 |
| Vida no nível 5 | 216 |
| Energia máxima / recuperação | 100 / 12 por segundo |
| Recuperação perto do farol | 18 vida/s; raio 7; fora de combate por 4 s |
| Alcance de conversa / coleta | 3,2 unidades |
| Espera para reaparecer | 3 s; sem perda de itens/moedas |

| Ação | Dano base | Energia | Recarga | Alcance |
| --- | ---: | ---: | ---: | ---: |
| Golpe de aço | 15 | 0 | 0,75 s | 2,9 |
| Ruptura | 31 | 25 | 5 s | 3,5 |
| Círculo de alvor | 23 | 35 | 9 s | 4,1, em área |

Dano final de cada acerto: base da habilidade + 4 × (nível − 1) + bônus da arma. A arma inicial tem bônus 0, Lâmina da trilha +3 e Fio da Aurora +7. Ataque simples não é automático: clique no botão ou use a tecla a cada golpe.

| Criatura | Vida | Dano base | Intervalo | XP | Moedas no saque |
| --- | ---: | ---: | ---: | ---: | ---: |
| Brumino | 64 | 9 | 1,5 s | 28 | 6 |
| Cerne errante | 108 | 14 | 2 s | 46 | 10 |

A proteção inicial reduz 1 de dano; Couraça de cerne reduz 4, com dano mínimo de 1. Inimigos reaparecem em 22 s. Na aproximação, há preparação inicial de 0,65 s antes de poder atacar, além do alcance exigido. Leash: inimigo até 12 unidades da origem, jogador até 15; a vila começa depois de Z=1 para a IA.

| Nível | XP total necessário |
| --- | ---: |
| 1 | 0 |
| 2 | 100 |
| 3 | 240 |
| 4 | 440 |
| 5 | 700 |

Subir de nível restaura vida e energia. XP é limitado a 700; não há nível 6.

A missão pede 3 Bruminos e 2 Cernes. Abates somam 176 XP; entrega concede até 140 XP adicionais (respeitando o teto), 35 moedas e Fio da Aurora. O resultado normal é nível 3, 316 XP totais, antes dos demais abates.

Mochila: 10 espaços. Equipamentos ocupam 1 espaço; tônicos empilham até 5 por espaço e recuperam até 65 de vida com recarga de 8 s. Trocar equipamento devolve o anterior ao mesmo espaço. Início: espada/túnica equipadas e 3 tônicos. Brumino deixa tônico, a cada quarto ciclo deixa Lâmina da trilha; Cerne alterna Couraça de cerne e tônico. Moedas não têm loja nesta versão.
