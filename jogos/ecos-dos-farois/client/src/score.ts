/** Partitura original do projeto. MIDI; compasso 4/4; 82 BPM; 16 compassos. */
export const BPM = 82;
export const BEAT = 60 / BPM;
export const LOOP_BEATS = 64;
export type Note = { beat: number; midi: number; duration: number; velocity: number; pan: number; voice: 'pluck' | 'pad' | 'bell' };
const chords = [[50, 57, 62, 65], [46, 53, 58, 62], [53, 60, 65, 69], [48, 55, 60, 64]];
const phrases = [
  [74, -1, 77, 76, 74, -1, 72, 69], [70, -1, 74, 77, 74, 72, -1, 70],
  [69, 72, -1, 77, 76, -1, 72, 69], [67, -1, 72, 74, 76, 74, -1, 72],
  [74, -1, 81, 77, -1, 76, 74, 72], [70, 74, -1, 77, 79, 77, -1, 74],
  [77, -1, 76, 72, 69, -1, 72, 76], [74, 72, -1, 67, 69, -1, 72, -1]
];
export const SCORE: Note[] = [];
for (let bar = 0; bar < 16; bar++) {
  const chord = chords[bar % 4], phrase = phrases[bar % 8], base = bar * 4;
  SCORE.push({ beat: base, midi: chord[0] - 12, duration: 3.9, velocity: 0.16, pan: 0, voice: 'pad' });
  for (const [i, note] of chord.slice(1).entries()) SCORE.push({ beat: base + i * 0.06, midi: note, duration: 2.8, velocity: 0.22, pan: -0.3 + i * 0.27, voice: 'pluck' });
  for (const [i, note] of chord.slice(1).entries()) SCORE.push({ beat: base + 2 + i * 0.08, midi: note + (bar >= 8 ? 12 : 0), duration: 1.7, velocity: 0.14, pan: 0.28 - i * 0.23, voice: 'pluck' });
  for (let step = 0; step < 8; step++) if (phrase[step] !== -1) SCORE.push({ beat: base + step * 0.5, midi: phrase[step], duration: step === 7 ? 1.3 : 0.9, velocity: bar >= 8 ? 0.17 : 0.14, pan: Math.sin(bar) * 0.17, voice: 'bell' });
}
SCORE.sort((a, b) => a.beat - b.beat);
export const midiHz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
