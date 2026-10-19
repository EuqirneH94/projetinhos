# Náquiro masculino 001 — entrega técnica candidata

Versão `0.3.1-naquiro.1`, baseada no checkpoint publicado `00088c18aa0f789217d13ebf905d5e5ec0d2c7e8`. O plano anterior foi autorizado na conversa, incluindo o uso do Blender na nuvem. A missão recebida e a auditoria inicial permanecem em `../001-plano/` como documentos históricos.

**Não se declara a missão artística aprovada.** Esta entrega disponibiliza uma primeira malha deformável autoral, fontes Blender, materiais, animações e integração optativa para revisão. A densidade de detalhes, o acabamento e a naturalidade ainda não equivalem à referência aprovada. A versão feminina permanece posterior ao aceite do masculino.

## Alterações implementadas

- Base autoral de humanoide anfíbio com pele mapeada, olhos tridimensionais, orelhas membranosas, cabelo volumétrico, mãos/pés aquáticos e conjunto marítimo piloto de Errante. Produção assistida por scripts Blender 4.3.2; sem extração de pixels da concept art ou integração de modelos externos de licença desconhecida.
- Rig com 46 ossos, quatro influências normalizadas por vértice, seis materiais/texturas fonte e 29.866 triângulos. Onze clips reais: Idle, Walk, Run, Jump, Land, Attack, Cast, Hit, Death, Recover e Swim.
- Ateliê `/character-lab.html` com vistas, giro, aproximação, seleção de clips, pausa, linha do tempo e wireframe.
- Adaptador Three.js optativo por `?character=naquiro-male`, limitado a Náquiros/Errante. Cache, validação, skeleton/mixer por instância, descarte e fallback para o personagem anterior.
- Animação de ação ligada aos eventos existentes do servidor. Sem mudança de posição lógica, hitbox, velocidade, dano, câmera, controles ou mecânicas. Jump/Land/Swim são demonstrações do ateliê; Espaço continua ataque.

O modelo não atribui gênero aos saves, não muda `appearance`, não cria itens ou habilidades e não migra bancos. O `.blend` editável e o GLB portátil acompanham as fontes separadas. O jogo carrega glTF/bin/PNGs locais para respeitar a CSP existente.

## Falha encontrada na revisão visual e correção

O primeiro export passava nas verificações estruturais, mas apresentava manchas verdes/escuras no rosto e cores incorretas nos adornos. A inspeção do buffer demonstrou overflow: tintas lineares HDR acima de 1 eram convertidas para `COLOR_0` UNSIGNED_SHORT normalizado sem saturação.

A correção limita RGBA linear a `[0,1]` antes de salvar o rig e exportar, sem uma conversão gamma adicional. Foram corrigidos 4.707 componentes. O teste semântico da paleta **falhou no arquivo anterior** e passou no corrigido; nenhum teste anterior foi enfraquecido. Vértices de pele com canais indevidamente escuros: 2.376 → zero; adornos: 437 → zero.

O `base.blend` original permaneceu idêntico. Posições, normais, UV, índices, pesos, juntas, bind, hierarquia, materiais e amostras de animação foram comparados byte a byte. Além das cores, um único vetor tangente recalculado pelo Blender apresentou diferença máxima de aproximadamente 0,0001, registrada no comparador. Não houve adulteração manual do binário.

As novas capturas de rosto e corpo no Three.js foram inspecionadas: a corrupção das cores foi corrigida. Isso não constitui aceite artístico da anatomia ou fidelidade.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| Build de produção e TypeScript, Linux/Node 24.14.0 | Aprovado |
| Testes isolados do personagem | 14/14 aprovados |
| Suíte completa | 109/109 aprovados; 95 testes anteriores preservados |
| Regressão negativa de cores | Falha reproduzida no buffer anterior; passa no corrigido |
| glTF e GLB | Buffers reais inspecionados; orçamento, geometria, pesos e clips válidos |
| Reabertura do `.blend` final | Seis imagens packed, 46 ossos/11 Actions, cores válidas, SHA inalterado |
| Vídeo contínuo do ateliê | 50,28 s, Run em reprodução e órbita de mouse equivalente a 360°, 24 observações de avanço real, sem injeção de relógio/poses ou pausa de RAF |
| Preservação | Fontes do servidor, contratos compartilhados exceto versão, testes anteriores e 14 arquivos de áudio idênticos ao checkpoint |
| Ateliê no navegador | 7/7 verificações; 11/11 clips avançando em RAF real, seek/pausa e wireframe; oito capturas finais, zero erros JS/CSP |
| Entrada no mundo | Welcome/estado e HUD observados; o percurso gráfico completo permaneceu inconclusivo nesta execução |
| Movimento/painéis/câmera, fallback 404/reabertura e dois rigs no mundo | Não aprovados pelo navegador nesta execução; regressões automatizadas não substituem essa evidência visual |
| Capturas do mundo em 1280/1920 e vídeo contínuo de gameplay | Pendentes; o vídeo entregue é do ateliê |
| Pacotes e patch | Três ZIPs Jogo e dois Blender; CRC/união válidos; patch aplicado à baseline com todos os bytes iguais à distribuição; 221 arquivos de runtime e 13 fontes de arte |
| Distribuição realmente extraída, Node 24.14/Linux | 220 arquivos manifestados intactos; 21 assets HTTP/SHA/CSP; somente `ws` como dependência runtime |
| Persistência e sessões da distribuição | Entrada/movimento confirmado por protocolo nos fluxos legado e conta Náquiro/Errante; segunda sessão recusada; saves iguais no disco e após reinício; dois encerramentos exit0, locks liberados; integrity `ok`, FK zero |
| Windows/GPU física e aceite humano | Pendentes |

A execução final da suíte levou 205,6 s e sofreu uma pausa global da nuvem que também afetou comandos simples. Terminou sem falhas e sem mudanças de timeout. Uma tentativa anterior sob concorrência com trabalhos gráficos teve dois timeouts; foi preservada como tentativa rejeitada. Os casos isolados e a suíte ociosa anterior passaram. Não se apresenta essa tentativa como aprovação.

As evidências distinguem inspeção Blender, renderização real Three.js, testes de protocolo/persistência e capturas estáticas. Capturas que pausam o agendamento depois de quadros completos não medem FPS; vídeos contínuos não usam essa pausa. O navegador da nuvem usa SwiftShader por software.

O mundo foi tentado em contextos novos, incluindo uma resolução funcional menor. Houve entrada real e carregamento da prévia, mas o host registrou intervalos de vários segundos e uma pausa de cerca de 72 s entre quadros. Uma tentativa reconectou durante a espera de movimento; outra não concluiu a atualização do estado de carga no prazo. Não houve erro JavaScript/CSP registrado nesses percursos, nem queda do servidor, que encerrou normalmente. Isso é uma limitação observada da validação, não uma prova de que toda causa possível tenha sido isolada. Os controles gráficos e o multiplayer visual precisam ser repetidos em ambiente adequado; não se alterou o relógio, a pose ou o estado de jogo para fabricar aprovação.

## Pendências e critérios de aceite

1. Retopologia manual com loops adequados à deformação; refinamento de rosto, olhos/pálpebras, cabelo, vestuário, membranas, mãos e encaixe do arco. A bioluminescência localizada exigida na missão não está implementada: os seis materiais exportados não possuem canal emissivo. O conjunto visual é fixo: não representa um guarda-roupa por item ou corda de arco deformável.
2. Comparação artística humana das vistas frontal/lateral/traseira com VIS-018/019/020 e com os requisitos da missão. As referências não foram tratadas como definição implícita de novas mecânicas ou altura canônica.
3. Revisão de transições, poses extremas e interpenetração. A amostragem da deformação real Three.js a 60 Hz encontrou cerca de 5,2 mm de penetração no chão em Run entre os quadros baked. Esse ajuste fino permanece aberto; não se afirma ausência de clipping.
4. Desempenho no Windows com GPU identificada: baseline e candidato na mesma rota de pelo menos 60 s, resolução/qualidade iguais, frame times mediano/P95, memória e custo com múltiplos atores. Software rendering e contagens de triângulos não aprovam a meta de 30 FPS/P95 ≤33,3 ms.
5. Execução local do guia PowerShell: build/testes, sessões distintas, continuidade após reinício e rollback visual. A entrega Linux não encerra a pendência histórica B1.1 no Windows.

O próximo refinamento deve partir das fontes entregues e da revisão visual. Não se deve substituir automaticamente todos os personagens, iniciar a versão feminina ou declarar arte final aprovada com base apenas nos testes.

## Dados, distribuição e rollback

As verificações de jogo e persistência usam bancos sintéticos externos ao projeto. Bancos, credenciais, locks, saves e fixtures privados não acompanham os pacotes. Os arquivos de áudio existentes foram conservados. Nenhum esquema SQLite foi alterado nesta etapa.

Extraia os ZIPs complementares do jogo na mesma pasta **nova**; nunca concatene os ZIPs ou sobreponha a instalação em uso. As fontes Blender são opcionais para jogar. Consulte o guia Windows para bancos novos de laboratório e navegador anônimo/perfil separado, preservando as chaves de retorno do perfil habitual.

O patch aplica-se ao checkpoint indicado, em uma cópia limpa, e não inclui as fontes Blender separadas. O empacotador verifica aplicação limpa e igualdade de todos os bytes da distribuição, além de CRC/união dos ZIPs e SHA-256. Remover a opção da URL restaura o visual anterior; voltar à aplicação anterior requer encerramento normal e uso da instalação preservada, sem copiar dados de teste sobre os originais.

O primeiro empacotamento foi rejeitado pelo comparador porque omitia três ZIPs históricos de código que permaneciam na baseline. A seleção foi corrigida para preservá-los, após inspeção de seus nomes de arquivos sem candidatos a banco/lock/credencial. Essa tentativa está identificada nas evidências; somente os arquivos do empacotamento final aprovado foram entregues. Avisos de whitespace do Git se referem às strings GLSL geradas no bundle Three.js, não a erro de aplicação do patch.
