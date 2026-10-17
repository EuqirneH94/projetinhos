# Áudio Alpha 0.3 — integração candidata V1.1

Referências consultadas: missão `EDF_Missao_Codex_Jogo_Jogavel.md`, Bíblia EDF-GDB-1.1.0 `NPC_DIALOGUE_AUDIO.md` (DOC-016), código e sete arquivos recebidos da Alpha 0.2, fontes `tools/audio-lab-v1_1/`. Este documento atualiza o escopo corrente; `AUDIO.md` descreve o sintetizador e a prévia do protótipo anterior.

## Arquivos recebidos e procedência

Os sete arquivos em `client/public/audio/` foram preservados byte a byte. As fontes Python do laboratório identificam síntese procedural original, semente 17102026; os metadados identificam “Ecos dos Faróis — Estudos originais”, Laboratório de Áudio V1.1 e revisão após feedback sobre agudos contínuos. Não foram adicionados sons de terceiros, serviços de voz ou samples de jogos. O ganho linear por loudness presente nos arquivos recebidos foi mantido.

Inspeção efetivamente realizada nesta missão: metadados com FFprobe e decodificação PCM com FFmpeg, medição de duração, pico/RMS, amostras não finitas e clipping. Não houve audição humana do dispositivo de destino. Medição digital não aprova timbre, mixagem ou conforto auditivo.

| Arquivo | Formato | Duração decodificada | Pico dBFS | RMS dBFS |
| --- | --- | --- | --- | --- |
| 01_farol_estavel.wav | PCM 24 bits | 24,0 s | −6,645 | −24,010 |
| 02_farol_enfraquecido.wav | PCM 24 bits | 24,0 s | −9,029 | −24,480 |
| 03_farol_critico.wav | PCM 24 bits | 24,0 s | −10,190 | −24,090 |
| 04_descarga_arcana.mp3 | MP3 | 3,4 s | −8,245 | −30,529 |
| 05_barreira_protetora.mp3 | MP3 | 4,0 s | −7,075 | −27,695 |
| 06_flecha_especial.mp3 | MP3 | 2,7 s | −8,325 | −30,465 |
| 07_pulso_de_cura.mp3 | MP3 | 4,2 s | −9,669 | −27,664 |

Todos têm 48 kHz, estéreo, zero amostras não finitas e zero amostras decodificadas com módulo ≥ 1. Os hashes conferem com a evidência recebida `docs/evidencias/audio-integrity.json`; a nova medição acompanha a entrega em `evidence/audio-assets-measured.json` (local de empacotamento descrito no relatório geral).

## Comportamento implementado

- Farol conserva as texturas graves e cristais pontuais do laboratório. Não acrescenta oscilador agudo sustentado. A primeira entrada tem fade de 850 ms; mudanças de estado cruzam ganhos suavemente e encerram a fonte anterior em 2,5 s. Um filtro passa-baixa de 1.900 Hz limita brilho adicional. O volume espacial máximo antes dos controles é 0,44, com queda por distância e transição até silêncio a 28 unidades; personagem morto não ouve o Farol. Isso é tuning experimental.
- Efeitos de classe tocam a partir da confirmação do servidor. Ataques básicos mantêm o efeito curto existente; ações especiais usam os cues V1.1. Barreira e restauração compartilham cues existentes; não se anunciam cinco sons exclusivos por classe.
- Oito slots de samples são reservados **antes** de carregar/decodificar. Uma rajada simultânea não ultrapassa esse limite. Samples atrasados mais de 1,5 s são descartados; fetch tem timeout de 5 s. Uma fonte tem entrada curta e cauda suavizada. O sintetizador limita os transientes ativos a 64; um snapshot agenda no máximo 24 eventos audíveis próximos.
- Uma janela de 256 identificadores de snapshot (`personagem/tick/tempo`) evita replay inclusive de pacotes repetidos fora de ordem. Não se deduplicam golpes legítimos de ticks diferentes. O protocolo atual não tem ID individual de evento; duplicações com novo tick/tempo exigiriam esse contrato futuro.
- Ocultar a aba interrompe samples transitórios, cancela pedidos pendentes por geração e suspende o contexto. Ao voltar, tenta retomar o contexto; não reproduz a rajada perdida. Se o navegador exigir novo gesto, o controle de som permite desbloquear novamente. O ambiente contínuo e a posição da trilha permanecem no contexto suspenso.
- Silêncio geral e ganhos separados: geral, música, ambiente, efeitos e **voz**. Preferências antigas `nexo.audio` ganham `voice=0.8` sem perder os demais valores; valores inválidos usam o padrão. O canal de voz tem ligação própria ao master. Uma fala gravada, quando existir, reduzirá música a 40% e restaurará suavemente ao terminar/interromper.

Não há HRTF/áudio binaural completo, streaming de música ou novo sistema de mixagem por hardware. O compositor e sintetizador do protótipo continuam disponíveis.

## Diálogo, legenda e gravações pendentes

`client/src/dialogue-audio.ts` contém 16 IDs estáveis: para cada facção `vigilia` e `confluencia`, `guide.available`, `guide.active`, `guide.ready`, `guide.completed`, `guide.completed.repair`, `guide.completed.flow`, `companion.1` e `companion.2`. Todos estão explicitamente em `recording-pending`, com asset e procedência nulos.

`SceneAudio.dialogue(id, text)` recebe a linha contextual escolhida pela interface e retorna `subtitle-only` quando falta gravação. Repetir a mesma linha sem fechar retorna `duplicate`. `closeDialogue()` interrompe a fala atual e invalida carregamentos antigos. O áudio não concede missão, recompensa nem acesso: as ações continuam validadas pelo servidor. A legenda PT-BR é exibida pela interface mesmo com áudio bloqueado ou silenciado.

**Dublagem PT-BR não foi entregue.** Também faltam vocalizações do jogador. Não se utiliza TTS do navegador para simular gravação produzida. Para integrar uma voz real: produzir/revisar o arquivo, registrar procedência e pronúncia, atribuir o asset ao ID correto e só então marcar `recorded`. O inventário de IDs não é aprovação canônica dos nomes ou textos candidatos.

## Testes e roteiro PowerShell

Na raiz do projeto, teste somente áudio:

```powershell
node --import tsx --test tests/audio.test.ts tests/scene-audio.test.ts tests/audio-voice.test.ts
if ($LASTEXITCODE -ne 0) { throw 'Falha nos testes de áudio' }
```

São oito testes: dois originais preservados, cinco regressões do ciclo de vida/deduplicação/Farol/legenda e uma renderização offline do canal de voz. O sinal senoidal usado nessa renderização é apenas um sinal técnico de teste, sem representar dublagem. A medição de isolamento ocorre após estabilizar as rampas de ganho, para não confundir a cauda do ambiente com o canal de voz. O harness de ciclo de vida simula APIs do navegador; a renderização DSP usa `web-audio-engine` real offline.

Para jogar, seguir o guia geral PowerShell da entrega. Em volume moderado e com os controles acessíveis:

1. Entrar com gesto no navegador; confirmar sons de passos, combate e progresso com sinal visual correspondente. A música continua mais baixa que os efeitos.
2. Separadamente, reduzir cada grupo a zero. “Voz” está preparado, mas ainda não há gravações para ouvir. Silenciar o geral deve interromper efeitos em curso.
3. Aproximar e afastar do Farol; ouvir a redução gradual até silêncio. Após restaurá-lo, conferir a transição de textura sem novo som agudo contínuo.
4. Durante uma ação, alternar para outra aba e voltar. O passado não deve tocar em rajada. Se aparecer áudio bloqueado, interagir com o controle de som novamente.
5. Conversar com guia em etapas distintas e companheiros. Confirmar legendas e desfecho correto; não esperar dublagem nesta candidata.
6. Reabrir o navegador e conferir volumes preservados. Registrar navegador, dispositivo, volume do sistema e qualquer distorção/incômodo.

Testes digitais e execução Linux não substituem essa escuta e a validação Windows real. O aceite artístico do áudio e as gravações continuam pendentes.
