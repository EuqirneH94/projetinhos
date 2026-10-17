import { SHRINE } from "../../shared/config.js";
import { factionOf } from "../../shared/alpha.js";
import {
  DEFAULT_AUDIO,
  SoundBank,
  type AudioSettings,
  type Effect,
} from "./audio-synth.js";
import { BEAT, LOOP_BEATS, SCORE } from "./score.js";
import type { Snapshot } from "../../shared/types.js";
import { distance } from "../../shared/movement.js";
import { DIALOGUE_AUDIO, type DialoguePlayback } from "./dialogue-audio.js";
const clamp = (n: unknown, fallback: number) =>
  typeof n === "number" && Number.isFinite(n)
    ? Math.max(0, Math.min(1, n))
    : fallback;
export class SceneAudio {
  settings: AudioSettings = { ...DEFAULT_AUDIO };
  private ctx: AudioContext | null = null;
  private bank: SoundBank | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private start = 0;
  private note = 0;
  private loop = 0;
  private sampleBuffers = new Map<string, Promise<AudioBuffer | null>>();
  private beaconState = -1;
  private beaconSource: AudioBufferSourceNode | null = null;
  private beaconGain: GainNode | null = null;
  private beaconFilter: BiquadFilterNode | null = null;
  private beaconVolume = 0;
  private beaconGeneration = 0;
  private lastState: Snapshot | null = null;
  private sampleCount = 0;
  private sampleGeneration = 0;
  private seenSnapshots = new Set<string>();
  private liveSamples = new Map<AudioBufferSourceNode, () => void>();
  private dialogueId: string | null = null;
  private dialogueText = "";
  private dialogueGeneration = 0;
  private dialogueSource: AudioBufferSourceNode | null = null;
  private nextBird = 0;
  private combatUntil = 0;
  private lastPosition: { x: number; z: number } | null = null;
  private stepDistance = 0;
  private stepSide = 1;
  private yaw = 0;
  onchange = (_settings: AudioSettings, _ready: boolean) => {};
  constructor() {
    try {
      const data = JSON.parse(localStorage.getItem("nexo.audio") ?? "null");
      if (data) {
        for (const k of ["master", "music", "ambience", "effects", "voice"] as const)
          this.settings[k] = clamp(data[k], DEFAULT_AUDIO[k]);
        this.settings.enabled =
          typeof data.enabled === "boolean" ? data.enabled : true;
      }
    } catch {}
    document.addEventListener("visibilitychange", () => {
      if (!this.ctx) return;
      if (document.hidden) {
        this.stopSamples();
        this.closeDialogue();
        void this.ctx.suspend().catch(() => {});
      } else if (this.settings.enabled) {
        void this.ctx.resume().then(() => {
          this.schedule();
          this.onchange(this.settings, this.ctx?.state === "running");
        }).catch(() => this.onchange(this.settings, false));
      }
    });
    window.addEventListener("pagehide", () => {
      if (this.timer) clearInterval(this.timer);
      this.stopSamples();
      this.closeDialogue();
      void this.ctx?.close();
    });
  }
  async unlock() {
    try {
      if (!this.ctx || this.ctx.state === "closed") {
        if (this.timer) clearInterval(this.timer);
        this.sampleBuffers.clear();
        this.beaconState = -1;
        this.beaconGeneration++;
        this.beaconSource = null;
        this.beaconGain = null;
        this.beaconFilter = null;
        this.note = 0;
        this.loop = 0;
        this.ctx = new AudioContext();
        this.bank = new SoundBank(this.ctx);
        this.start = this.ctx.currentTime + 0.12;
        this.bank.levels(this.settings);
        this.timer = setInterval(() => this.schedule(), 120);
      }
      if (document.hidden || !this.settings.enabled) return false;
      if (this.ctx.state === "suspended") await this.ctx.resume();
      if (this.lastState) this.state(this.lastState);
      this.schedule();
      this.onchange(this.settings, true);
      return true;
    } catch {
      this.onchange(this.settings, false);
      return false;
    }
  }
  set(key: keyof AudioSettings, value: boolean | number) {
    if (key === "enabled") this.settings.enabled = Boolean(value);
    else this.settings[key] = clamp(value, this.settings[key]);
    this.bank?.levels(this.settings);
    if (!this.settings.enabled) {
      this.stopSamples();
      this.closeDialogue();
    }
    try {
      localStorage.setItem("nexo.audio", JSON.stringify(this.settings));
    } catch {}
    this.onchange(this.settings, !!this.ctx && this.ctx.state === "running");
    if (this.settings.enabled) void this.unlock();
  }
  private schedule() {
    if (!this.ctx || !this.bank || this.ctx.state !== "running" ||
      !this.settings.enabled || document.hidden) return;
    const horizon = this.ctx.currentTime + 0.65;
    let budget = 32;
    while (budget-- > 0) {
      const note = SCORE[this.note],
        at = this.start + (this.loop * LOOP_BEATS + note.beat) * BEAT;
      if (at > horizon) break;
      if (
        at >= this.ctx.currentTime - 0.03 &&
        this.lastState &&
        (this.ctx.currentTime % 65 < 25 ||
          this.ctx.currentTime < this.combatUntil)
      ) {
        const confl = factionOf(this.lastState.you) === "confluencia";
        this.bank.note(
          {
            ...note,
            midi: note.midi + (confl ? 5 : 0),
            velocity: note.velocity * (confl ? 0.7 : 0.85),
          },
          Math.max(at, this.ctx.currentTime),
        );
      }
      if (++this.note === SCORE.length) {
        this.note = 0;
        this.loop++;
      }
    }
    if (this.ctx.currentTime > this.nextBird) {
      this.nextBird = this.ctx.currentTime + 7 + Math.random() * 9;
      this.bank.effect(
        "bird",
        this.ctx.currentTime,
        0.7,
        Math.random() * 1.6 - 0.8,
      );
    }
  }
  private asset(name: string) {
    let promise = this.sampleBuffers.get(name);
    if (!promise) {
      const ctx = this.ctx!;
      promise = fetch("/audio/" + name, { signal: AbortSignal.timeout(5000) })
        .then((r) => {
          if (!r.ok) throw new Error("audio");
          return r.arrayBuffer();
        })
        .then((b) => ctx.decodeAudioData(b))
        .catch(() => null);
      this.sampleBuffers.set(name, promise);
    }
    return promise;
  }
  private stopSamples() {
    this.sampleGeneration++;
    for (const [source, dispose] of this.liveSamples) {
      try { source.stop(); } catch {}
      dispose();
    }
  }
  private async sample(name: string, volume: number, pan: number,
    bus: "effects" | "voice" = "effects", valid = () => true) {
    if (!this.ctx || !this.bank || this.ctx.state !== "running" ||
      !this.settings.enabled || document.hidden || this.sampleCount >= 8) return null;
    // Reserve before fetch/decode: concurrent promises must not bypass the limit.
    const ctx = this.ctx, bank = this.bank, requested = ctx.currentTime,
      generation = this.sampleGeneration;
    this.sampleCount++;
    let released = false;
    const release = () => { if (!released) { released = true; this.sampleCount--; } };
    const buffer = await this.asset(name);
    if (!buffer || this.ctx !== ctx || generation !== this.sampleGeneration || ctx.state !== "running" ||
      !this.settings.enabled || document.hidden || ctx.currentTime - requested > 1.5 || !valid()) {
      release(); return null;
    }
    const source = ctx.createBufferSource(),
      gain = ctx.createGain(),
      panner = ctx.createStereoPanner();
    source.buffer = buffer;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, volume)), ctx.currentTime + 0.012);
    gain.gain.setTargetAtTime(0, ctx.currentTime + Math.max(0.02, buffer.duration - 0.08), 0.02);
    panner.pan.value = Math.max(-1, Math.min(1, pan));
    source.connect(gain);
    gain.connect(panner);
    panner.connect(bank[bus]);
    const dispose = () => {
      if (released) return;
      source.disconnect();
      gain.disconnect();
      panner.disconnect();
      this.liveSamples.delete(source);
      if (this.dialogueSource === source) {
        this.dialogueSource = null;
        bank.dialogue(false);
      }
      release();
    };
    this.liveSamples.set(source, dispose);
    source.onended = dispose;
    try { source.start(); } catch { dispose(); return null; }
    return source;
  }
  private async beacon(state: number) {
    if (!this.ctx || !this.bank || state === this.beaconState) return;
    this.beaconState = state;
    const generation = ++this.beaconGeneration, ctx = this.ctx, bank = this.bank;
    const name = [
        "01_farol_estavel.wav",
        "02_farol_enfraquecido.wav",
        "03_farol_critico.wav",
      ][state],
      buffer = await this.asset(name);
    if (!buffer || generation !== this.beaconGeneration || this.ctx !== ctx || ctx.state === "closed") return;
    const old = this.beaconSource,
      oldGain = this.beaconGain,
      oldFilter = this.beaconFilter,
      at = ctx.currentTime;
    const source = ctx.createBufferSource(),
      gain = ctx.createGain(), filter = ctx.createBiquadFilter();
    source.buffer = buffer;
    source.loop = true;
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(this.beaconVolume, at + 0.85);
    // Preserve V1.1 body and brief crystals; no additional sustained oscillator.
    filter.type = "lowpass";
    filter.frequency.value = 1900;
    filter.Q.value = 0.5;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(bank.ambience);
    source.start(at);
    this.beaconSource = source;
    this.beaconGain = gain;
    this.beaconFilter = filter;
    if (old && oldGain) {
      oldGain.gain.setTargetAtTime(0, at, 0.5);
      old.stop(at + 2.5);
      old.onended = () => {
        old.disconnect();
        oldGain.disconnect();
        oldFilter?.disconnect();
      };
    }
  }
  ui(denied = false) {
    if (this.ctx?.state === "running" && this.settings.enabled && !document.hidden)
      this.bank?.effect(denied ? "deny" : "ui");
  }
  async dialogue(id: string, text: string): Promise<DialoguePlayback> {
    if (id === this.dialogueId && text === this.dialogueText) return "duplicate";
    this.closeDialogue();
    this.dialogueId = id;
    this.dialogueText = text;
    const generation = this.dialogueGeneration, cue = DIALOGUE_AUDIO[id];
    // UI subtitles stay visible even when no recording/device permission exists.
    if (!cue?.asset || cue.status !== "recorded" || !cue.provenance) return "subtitle-only";
    const source = await this.sample(cue.asset, 0.9, 0, "voice",
      () => generation === this.dialogueGeneration);
    if (!source) return "unavailable";
    this.dialogueSource = source;
    this.bank?.dialogue(true);
    return "played";
  }
  closeDialogue() {
    this.dialogueGeneration++;
    if (this.dialogueSource) {
      try { this.dialogueSource.stop(); } catch {}
      this.liveSamples.get(this.dialogueSource)?.();
      this.dialogueSource = null;
    }
    this.dialogueId = null;
    this.dialogueText = "";
    this.bank?.dialogue(false);
  }
  position(
    p: { x: number; z: number },
    moving: boolean,
    dead: boolean,
    yaw: number,
  ) {
    this.yaw = yaw;
    const d = distance(p, SHRINE);
    this.beaconVolume = dead || d >= 28 ? 0 :
      0.44 / (1 + (d * d) / 38) * Math.min(1, (28 - d) / 5);
    if (this.ctx && this.beaconGain)
      this.beaconGain.gain.setTargetAtTime(this.beaconVolume, this.ctx.currentTime, 0.35);
    if (this.lastPosition && moving && !dead) {
      const d = distance(p, this.lastPosition);
      if (d < 1) this.stepDistance += d;
      if (this.stepDistance > 0.91) {
        this.stepDistance = 0;
        this.stepSide *= -1;
        if (this.ctx?.state === "running" && this.settings.enabled && !document.hidden) this.bank?.effect(
          p.z > 0 || Math.abs(p.x) < 2.5 ? "stepStone" : "stepGrass",
          this.ctx?.currentTime,
          0.7,
          this.stepSide * 0.08,
        );
      }
    } else this.stepDistance = 0;
    this.lastPosition = { ...p };
  }
  state(state: Snapshot) {
    this.lastState = state;
    const snapshotId = `${state.you.id}:${state.tick}:${state.time}`,
      repeated = this.seenSnapshots.has(snapshotId);
    this.seenSnapshots.add(snapshotId);
    if (this.seenSnapshots.size > 256)
      this.seenSnapshots.delete(this.seenSnapshots.values().next().value!);
    if (!this.bank || !this.ctx) return;
    void this.beacon(
      state.you.story?.restored
        ? 0
        : state.you.quest.state === "completed"
          ? 1
          : 2,
    );
    this.bank.zone(state.you.z < 0, this.ctx.currentTime < this.combatUntil);
    if (repeated) return;
    if (this.ctx.state !== "running" || !this.settings.enabled || document.hidden) return;
    let budget = 24;
    for (const e of state.events) {
      const d = distance(e, state.you);
      if (d > 24) continue;
      if (--budget < 0) break;
      const volume = 1 / (1 + (d * d) / 42),
        dx = e.x - state.you.x,
        dz = e.z - state.you.z;
      const pan = Math.max(
        -0.85,
        Math.min(
          0.85,
          (dx * Math.cos(this.yaw) - dz * Math.sin(this.yaw)) / 10,
        ),
      );
      let sound: Effect | null = null;
      if (
        e.kind === "projectile" ||
        e.kind === "nova" ||
        e.kind === "barrier" ||
        (e.kind === "heal" && e.skill)
      ) {
        const asset =
          e.kind === "heal"
            ? "07_pulso_de_cura.mp3"
            : e.kind === "barrier"
              ? "05_barreira_protetora.mp3"
              : e.classId === "errante"
                ? "06_flecha_especial.mp3"
                : e.classId === "sentinela"
                  ? "05_barreira_protetora.mp3"
                  : "04_descarga_arcana.mp3";
        if (e.skill !== "attack") void this.sample(asset, volume * 0.9, pan);
        else
          this.bank.effect("swing", this.ctx.currentTime, volume * 0.35, pan);
      }
      if (e.kind === "restore" || e.kind === "attune")
        void this.sample("07_pulso_de_cura.mp3", volume * 0.6, pan);
      if (e.kind === "slash") sound = "swing";
      if (e.kind === "nova") sound = null;
      if (e.kind === "hit") {
        sound = e.targetId === state.you.id ? "hurt" : "impact";
        if (e.targetId === state.you.id || e.sourceId === state.you.id)
          this.combatUntil = this.ctx.currentTime + 5;
      }
      if (e.kind === "death")
        sound = e.targetId === state.you.id ? "defeat" : "enemyDeath";
      if (
        [
          "heal",
          "level",
          "loot",
          "questAccept",
          "questComplete",
          "respawn",
        ].includes(e.kind) &&
        e.targetId === state.you.id
      )
        sound = e.kind as Effect;
      if (sound === "heal" && e.skill) sound = null;
      if (sound) this.bank.effect(sound, this.ctx.currentTime, volume, pan);
    }
  }
}
