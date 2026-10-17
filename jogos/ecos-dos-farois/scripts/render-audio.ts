import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Engine from 'web-audio-engine';
import { DEFAULT_AUDIO, SoundBank, type Effect } from '../client/src/audio-synth.js';
import { BEAT, SCORE } from '../client/src/score.js';
const rate = 22050, seconds = 24, ctx = new Engine.OfflineAudioContext(2, rate * seconds, rate), bank = new SoundBank(ctx);
bank.levels({ ...DEFAULT_AUDIO, master: 0.85, music: 0.65 });
for (const note of SCORE) if (note.beat * BEAT < 23) bank.note(note, 0.1 + note.beat * BEAT);
const cues: { at: number; sound: Effect }[] = [
  { at: 3, sound: 'bird' }, { at: 5, sound: 'stepStone' }, { at: 5.4, sound: 'stepStone' }, { at: 5.8, sound: 'stepGrass' },
  { at: 7, sound: 'swing' }, { at: 7.16, sound: 'impact' }, { at: 9, sound: 'nova' }, { at: 11, sound: 'heal' },
  { at: 13, sound: 'loot' }, { at: 15, sound: 'questAccept' }, { at: 17, sound: 'level' }, { at: 20, sound: 'questComplete' }
];
for (const cue of cues) bank.effect(cue.sound, cue.at, 0.9, 0);
const result = await ctx.startRendering(), frames = result.length, channels = 2, bytes = frames * channels * 2, wav = Buffer.alloc(44 + bytes);
wav.write('RIFF', 0); wav.writeUInt32LE(36 + bytes, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(channels, 22); wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * channels * 2, 28); wav.writeUInt16LE(channels * 2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(bytes, 40);
let peak = 0, sum = 0;
for (let i = 0; i < frames; i++) for (let c = 0; c < channels; c++) { const raw = result.getChannelData(c)[i]; if (!Number.isFinite(raw)) throw new Error('Amostra de áudio inválida'); peak = Math.max(peak, Math.abs(raw)); sum += raw * raw; const fade = Math.min(1, i / rate, (frames - i) / (rate * 1.3)), value = Math.max(-1, Math.min(1, raw * fade)); wav.writeInt16LE(Math.round(value * 32767), 44 + (i * channels + c) * 2); }
if (peak >= 0.98) throw new Error(`Pico alto: ${peak}`);
const output = resolve('docs/audio/previa-vale-alvor.wav'); mkdirSync(resolve('docs/audio'), { recursive: true }); writeFileSync(output, wav);
console.log(JSON.stringify({ file: output, seconds, sampleRate: rate, peak: Number(peak.toFixed(5)), rms: Number(Math.sqrt(sum / frames / channels).toFixed(5)), cues }, null, 2));
