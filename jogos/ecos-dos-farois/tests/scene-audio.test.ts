import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { SceneAudio } from "../client/src/audio.js";
import { DEFAULT_AUDIO } from "../client/src/audio-synth.js";
import { DIALOGUE_AUDIO } from "../client/src/dialogue-audio.js";
import { SHRINE } from "../shared/config.js";
import type { Snapshot } from "../shared/types.js";

// Browser-lifecycle harness. DSP fidelity is covered by audio.test.ts using a
// real offline render; this stub records actual SceneAudio source lifetimes.
class Param {
  value = 0;
  events: { kind: string; value: number; at: number }[] = [];
  setValueAtTime(value: number, at: number) { this.value = value; this.events.push({ kind: "set", value, at }); return this; }
  linearRampToValueAtTime(value: number, at: number) { this.value = value; this.events.push({ kind: "linear", value, at }); return this; }
  exponentialRampToValueAtTime(value: number, at: number) { this.value = value; return this; }
  setTargetAtTime(value: number, at: number) { this.value = value; this.events.push({ kind: "target", value, at }); return this; }
}
class Node {
  connections: Node[] = [];
  disconnect() { this.connections = []; }
  connect(node: Node) { this.connections.push(node); return node; }
}
class Buffer {
  decoded = false;
  constructor(public duration: number, private count = 1, private rate = 22050) {}
  getChannelData(_channel: number) { return new Float32Array(Math.floor(this.rate * this.duration)); }
}
class Source extends Node {
  buffer: Buffer | null = null; loop = false; type = "sine";
  frequency = new Param(); onended: (() => void) | null = null;
  started = false; stopped: number | null = null;
  constructor(private context: Context) { super(); }
  start(_at?: number) { this.started = true; }
  stop(at = this.context.currentTime) { this.stopped = at; if (at <= this.context.currentTime) this.onended?.(); }
}
class Context {
  static instances: Context[] = [];
  state = "suspended"; currentTime = 0; sampleRate = 22050; destination = new Node();
  sources: Source[] = []; oscillators: Source[] = [];
  constructor() { Context.instances.push(this); }
  createGain() { return Object.assign(new Node(), { gain: new Param() }); }
  createStereoPanner() { return Object.assign(new Node(), { pan: new Param() }); }
  createBiquadFilter() { return Object.assign(new Node(), { type: "lowpass", frequency: new Param(), Q: new Param() }); }
  createDynamicsCompressor() { return Object.assign(new Node(), { threshold: new Param(), knee: new Param(), ratio: new Param(), attack: new Param(), release: new Param() }); }
  createBuffer(channels: number, length: number, rate: number) { return new Buffer(length / rate, channels, rate); }
  createBufferSource() { const source = new Source(this); this.sources.push(source); return source; }
  createOscillator() { const source = new Source(this); this.oscillators.push(source); return source; }
  async decodeAudioData() { const buffer = new Buffer(3.4, 2); buffer.decoded = true; return buffer; }
  async resume() { this.state = "running"; }
  async suspend() { this.state = "suspended"; }
  async close() { this.state = "closed"; }
  samples() { return this.sources.filter(source => source.buffer?.decoded && !source.loop && source.started); }
}
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
function harness(saved?: object, pending = false) {
  const dom = new JSDOM("<!doctype html>", { url: "http://localhost", pretendToBeVisual: true });
  const old = new Map<string, PropertyDescriptor | undefined>();
  let visible = true, releaseFetch: (() => void) | undefined;
  Object.defineProperty(dom.window.document, "hidden", { get: () => !visible });
  const gate = pending ? new Promise<void>(resolve => { releaseFetch = resolve; }) : Promise.resolve();
  const fetched: string[] = [];
  const values: Record<string, unknown> = {
    window: dom.window, document: dom.window.document, localStorage: dom.window.localStorage,
    AudioContext: Context, fetch: async (url: string) => {
      fetched.push(url); await gate;
      return { ok: true, arrayBuffer: async () => new ArrayBuffer(1) };
    },
  };
  for (const [key, value] of Object.entries(values)) {
    old.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  if (saved) localStorage.setItem("nexo.audio", JSON.stringify(saved));
  const audio = new SceneAudio();
  return {
    audio, fetched, release: () => releaseFetch?.(),
    get ctx() { return Context.instances.at(-1)!; },
    visibility(value: boolean) { visible = value; dom.window.document.dispatchEvent(new dom.window.Event("visibilitychange")); },
    close() {
      dom.window.dispatchEvent(new dom.window.Event("pagehide")); dom.window.close();
      for (const [key, descriptor] of old) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor);
        else Reflect.deleteProperty(globalThis, key);
      }
    },
  };
}
function snapshot(tick = 1, eventCount = 0): Snapshot {
  return {
    type: "state", time: 1000 + tick * 50, tick, players: [], enemies: [], loot: [],
    you: {
      id: "audio-player", nickname: "Ensaio", x: SHRINE.x, z: SHRINE.z,
      angle: 0, hp: 100, maxHp: 100, energy: 100, maxEnergy: 100, xp: 0,
      level: 1, coins: 0, inventory: [], weapon: "trainingStaff", armor: "clothArmor",
      quest: { state: "active", brumino: 0, cerne: 0 }, dead: false,
      respawnAt: 0, potionAt: 0, cooldowns: { attack: 0, cleave: 0, nova: 0 }, ack: 0,
    },
    events: Array.from({ length: eventCount }, () => ({ kind: "projectile", skill: "cleave", classId: "arcanista", x: SHRINE.x, z: SHRINE.z })),
  };
}

test("preferências anteriores ganham canal de voz sem perder volumes e silenciam todos os canais", async () => {
  const h = harness({ master: 0.22, music: 0.18, ambience: 0.3, effects: 0.4, enabled: false });
  try {
    assert.deepEqual(h.audio.settings, { enabled: false, master: 0.22, music: 0.18, ambience: 0.3, effects: 0.4, voice: DEFAULT_AUDIO.voice });
    h.audio.set("voice", 4); assert.equal(h.audio.settings.voice, 1);
    h.audio.set("voice", -1); assert.equal(h.audio.settings.voice, 0);
    assert.equal(h.fetched.length, 0);
    assert.equal(await h.audio.unlock(), false);
  } finally { h.close(); }
});

test("Farol V1.1 entra por fade, transiciona com corpo filtrado e fica inaudível fora do alcance", async () => {
  const h = harness();
  try {
    await h.audio.unlock(); h.audio.position(SHRINE, false, false, 0); h.audio.state(snapshot()); await flush();
    const old = h.ctx.sources.find(source => source.buffer?.decoded && source.loop)!;
    assert.ok(old?.started);
    const filter = old.connections[0] as Node & { frequency: Param; type: string };
    const gain = filter.connections[0] as Node & { gain: Param };
    assert.equal(filter.type, "lowpass"); assert.equal(filter.frequency.value, 1900);
    assert.ok(gain.gain.events.some(event => event.kind === "linear" && event.value === 0.44 && event.at === 0.85));
    h.audio.position({ x: SHRINE.x + 28, z: SHRINE.z }, false, false, 0);
    assert.equal(gain.gain.value, 0);
    h.audio.position(SHRINE, false, false, 0);
    const next = snapshot(2); next.you.quest.state = "completed";
    h.audio.state(next); await flush();
    assert.equal(h.ctx.sources.filter(source => source.buffer?.decoded && source.loop).length, 2);
    assert.equal(old.stopped, 2.5);
    assert.deepEqual(h.fetched, ["/audio/03_farol_critico.wav", "/audio/02_farol_enfraquecido.wav"]);
  } finally { h.close(); }
});

test("snapshots repetidos e fora de ordem não repetem impactos; o orçamento reserva antes do decode", async () => {
  const h = harness(undefined, true);
  try {
    await h.audio.unlock();
    const a = snapshot(1, 12), b = snapshot(2, 12);
    h.audio.state(a); h.audio.state(b); h.audio.state(a);
    h.release(); await flush();
    assert.equal(h.ctx.samples().length, 8, "promessas simultâneas não podem ultrapassar oito samples");
    for (const source of h.ctx.samples()) source.onended?.();
    h.audio.state(b); await flush(); assert.equal(h.ctx.samples().length, 8, "repetir b não inicia sources novos");
    h.audio.state(snapshot(3, 1)); await flush(); assert.equal(h.ctx.samples().length, 9, "novo evento usa a vaga liberada");
  } finally { h.close(); }
});

test("ocultar/voltar durante decode cancela efeitos pendentes e não repete a rajada ao retomar", async () => {
  const h = harness(undefined, true);
  try {
    await h.audio.unlock(); const state = snapshot(1, 1); h.audio.state(state);
    h.visibility(false); await flush(); assert.equal(h.ctx.state, "suspended");
    h.visibility(true); await flush(); assert.equal(h.ctx.state, "running");
    h.release(); await flush(); assert.equal(h.ctx.samples().length, 0);
    h.audio.state(state); await flush(); assert.equal(h.ctx.samples().length, 0);
    h.audio.state(snapshot(2, 1)); await flush(); assert.equal(h.ctx.samples().length, 1);
    h.audio.set("enabled", false); assert.equal(h.ctx.samples()[0].stopped, 0);
  } finally { h.close(); }
});

test("diálogo mantém contrato de legenda e IDs condicionais sem fingir dublagem ou disparar fetch", async () => {
  const h = harness();
  try {
    assert.equal(Object.keys(DIALOGUE_AUDIO).length, 16);
    for (const cue of Object.values(DIALOGUE_AUDIO)) {
      assert.equal(cue.status, "recording-pending"); assert.equal(cue.asset, null); assert.equal(cue.provenance, null);
    }
    assert.equal(await h.audio.dialogue("confluencia.guide.completed.flow", "O fluxo voltou a circular."), "subtitle-only");
    assert.equal(await h.audio.dialogue("confluencia.guide.completed.flow", "O fluxo voltou a circular."), "duplicate");
    h.audio.closeDialogue();
    assert.equal(await h.audio.dialogue("confluencia.guide.completed.flow", "O fluxo voltou a circular."), "subtitle-only");
    assert.equal(h.fetched.length, 0);
  } finally { h.close(); }
});
