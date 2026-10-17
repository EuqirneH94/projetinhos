import test from "node:test";
import assert from "node:assert/strict";
import Engine from "web-audio-engine";
import { DEFAULT_AUDIO, SoundBank } from "../client/src/audio-synth.js";

const energy = (samples: Float32Array, start: number, end: number) => {
  let total = 0;
  for (let i = start; i < end; i++) total += samples[i] ** 2;
  return Math.sqrt(total / (end - start));
};
async function render(voice: number, effects: number, enabled = true) {
  const rate = 22050, context = new Engine.OfflineAudioContext(2, rate * 3, rate);
  const bank = new SoundBank(context);
  bank.levels({ ...DEFAULT_AUDIO, enabled, voice, effects, music: 0, ambience: 0 });
  // Synthetic test signal verifies routing only; it is not a delivered voice.
  const buffer = context.createBuffer(1, rate, rate), samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.sin(2 * Math.PI * 180 * i / rate) * 0.12;
  const source = context.createBufferSource(); source.buffer = buffer;
  source.connect(bank.voice); source.start(0.4);
  bank.effect("impact", 1.8);
  const rendered = await context.startRendering();
  // Measure after the designed 120ms ambience gain transition has settled;
  // measuring its tail would conflate ambient fade with voice routing.
  return { voice: energy(rendered.getChannelData(0), rate, rate * 1.3),
    impact: energy(rendered.getChannelData(0), rate * 1.8, rate * 2.1) };
}
test("canal de voz renderiza independentemente dos efeitos e respeita silêncio geral", async () => {
  const spoken = await render(1, 0), action = await render(0, 1), muted = await render(1, 1, false);
  assert.ok(spoken.voice > 0.01); assert.ok(spoken.impact < 0.00001);
  assert.ok(action.voice < 0.00001, JSON.stringify({ spoken, action, muted })); assert.ok(action.impact > 0.001);
  assert.ok(muted.voice < 0.00001 && muted.impact < 0.00001, JSON.stringify({ spoken, action, muted }));
});
