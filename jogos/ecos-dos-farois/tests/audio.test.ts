import test from 'node:test';
import assert from 'node:assert/strict';
import Engine from 'web-audio-engine';
import { DEFAULT_AUDIO, SoundBank, type Effect } from '../client/src/audio-synth.js';
import { BEAT, SCORE } from '../client/src/score.js';
const energy = (data: Float32Array, start: number, end: number) => { let sum = 0; for (let i = start; i < end; i++) sum += data[i] * data[i]; return Math.sqrt(sum / Math.max(1, end - start)); };
test('partitura e efeitos renderizam áudio finito e com margem contra clipping', async () => {
  const rate = 22050, seconds = 18, ctx = new Engine.OfflineAudioContext(2, rate * seconds, rate), bank = new SoundBank(ctx);
  bank.levels(DEFAULT_AUDIO); for (const note of SCORE) if (note.beat * BEAT < 16) bank.note(note, 0.1 + note.beat * BEAT);
  const effects: Effect[] = ['stepStone', 'stepGrass', 'swing', 'impact', 'hurt', 'nova', 'heal', 'level', 'loot', 'questAccept', 'questComplete', 'respawn', 'defeat', 'enemyDeath', 'ui', 'deny', 'bird'];
  effects.forEach((name, i) => bank.effect(name, 0.2 + i * 0.8));
  const buffer = await ctx.startRendering(); let peak = 0;
  for (let c = 0; c < 2; c++) for (const value of buffer.getChannelData(c)) { assert.ok(Number.isFinite(value)); peak = Math.max(peak, Math.abs(value)); }
  assert.ok(peak > 0.01 && peak < 0.98, `Pico fora da margem: ${peak}`);
  assert.ok(energy(buffer.getChannelData(0), rate * 3, rate * 15) > 0.002);
});
test('posição estéreo direciona efeito para o lado correto e silenciar reduz o sinal', async () => {
  const rate = 22050, ctx = new Engine.OfflineAudioContext(2, rate * 3, rate), bank = new SoundBank(ctx);
  bank.levels({ ...DEFAULT_AUDIO, music: 0, ambience: 0 }); bank.effect('impact', 0.6, 1, -0.9); bank.effect('impact', 1.6, 1, 0.9);
  const buffer = await ctx.startRendering(), l = buffer.getChannelData(0), r = buffer.getChannelData(1);
  assert.ok(energy(l, rate * 0.6, rate * 0.9) > energy(r, rate * 0.6, rate * 0.9) * 2);
  assert.ok(energy(r, rate * 1.6, rate * 1.9) > energy(l, rate * 1.6, rate * 1.9) * 2);
  const mute = new Engine.OfflineAudioContext(2, rate * 3, rate), quiet = new SoundBank(mute); quiet.levels({ ...DEFAULT_AUDIO, enabled: false }); quiet.effect('level', 1.5);
  const silent = await mute.startRendering(); assert.ok(energy(silent.getChannelData(0), rate, rate * 3) < 0.00001);
});
