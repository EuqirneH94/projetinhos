import { BEAT, midiHz, type Note } from './score.js';
import { seeded } from '../../shared/config.js';
export type AudioSettings = { enabled: boolean; master: number; music: number; ambience: number; effects: number; voice: number };
export const DEFAULT_AUDIO: AudioSettings = { enabled: true, master: 0.55, music: 0.34, ambience: 0.5, effects: 0.7, voice: 0.8 };
export type Effect = 'stepStone' | 'stepGrass' | 'swing' | 'impact' | 'hurt' | 'nova' | 'heal' | 'level' | 'loot' | 'questAccept' | 'questComplete' | 'respawn' | 'defeat' | 'enemyDeath' | 'ui' | 'deny' | 'bird';
export class SoundBank {
  master: GainNode; music: GainNode; ambience: GainNode; effects: GainNode; voice: GainNode;
  private musicLevel = DEFAULT_AUDIO.music; private dialogueActive = false;
  private activeTransients = 0;
  private musicFilter: BiquadFilterNode; private wind: GainNode; private noise: AudioBuffer;
  private strings = new Map<number, AudioBuffer>();
  constructor(public ctx: BaseAudioContext) {
    this.master = ctx.createGain(); this.music = ctx.createGain(); this.ambience = ctx.createGain(); this.effects = ctx.createGain(); this.voice = ctx.createGain();
    const compressor = ctx.createDynamicsCompressor(); compressor.threshold.value = -15; compressor.knee.value = 18; compressor.ratio.value = 5; compressor.attack.value = 0.006; compressor.release.value = 0.18;
    this.master.connect(compressor); compressor.connect(ctx.destination); this.ambience.connect(this.master); this.effects.connect(this.master); this.voice.connect(this.master);
    this.musicFilter = ctx.createBiquadFilter(); this.musicFilter.type = 'lowpass'; this.musicFilter.frequency.value = 3600; this.music.connect(this.musicFilter); this.musicFilter.connect(this.master);
    const rng = seeded(61245); this.noise = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const data = this.noise.getChannelData(0); let last = 0;
    for (let i = 0; i < data.length; i++) { last = (last + (rng() * 2 - 1) * 0.065) / 1.065; data[i] = last * 3.5; }
    const source = ctx.createBufferSource(); source.buffer = this.noise; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1100; this.wind = ctx.createGain(); this.wind.gain.value = 0.06;
    source.connect(filter); filter.connect(this.wind); this.wind.connect(this.ambience); source.start(0);
    this.levels(DEFAULT_AUDIO);
  }
  levels(settings: AudioSettings, hidden = false) {
    const at = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(settings.enabled && !hidden ? settings.master : 0, at, 0.06);
    this.musicLevel = settings.music;
    this.music.gain.setTargetAtTime(settings.music * (this.dialogueActive ? 0.4 : 1), at, 0.12); this.ambience.gain.setTargetAtTime(settings.ambience, at, 0.12); this.effects.gain.setTargetAtTime(settings.effects, at, 0.04); this.voice.gain.setTargetAtTime(settings.voice, at, 0.06);
  }
  dialogue(active: boolean) {
    this.dialogueActive = active;
    this.music.gain.setTargetAtTime(this.musicLevel * (active ? 0.4 : 1), this.ctx.currentTime, active ? 0.08 : 0.3);
  }
  zone(forest: boolean, combat: boolean) {
    const at = this.ctx.currentTime;
    this.wind.gain.setTargetAtTime(forest ? 0.13 : 0.065, at, 1.5);
    this.musicFilter.frequency.setTargetAtTime(combat ? 2000 : forest ? 2900 : 3600, at, 0.9);
  }
  private route(bus: AudioNode, volume: number, pan: number) {
    const gain = this.ctx.createGain(), panner = this.ctx.createStereoPanner(); gain.gain.value = volume; panner.pan.value = Math.max(-1, Math.min(1, pan)); gain.connect(panner); panner.connect(bus);
    return { gain, dispose: () => { gain.disconnect(); panner.disconnect(); } };
  }
  private tone(frequency: number, at: number, duration: number, volume: number, bus: AudioNode, type: OscillatorType = 'sine', pan = 0, endFrequency = frequency) {
    if (this.activeTransients >= 64) return;
    this.activeTransients++;
    const { gain, dispose } = this.route(bus, 0, pan), o = this.ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(frequency, at); o.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), at + duration);
    gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(volume, at + Math.min(0.02, duration * 0.12)); gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    o.connect(gain); o.start(at); o.stop(at + duration + 0.01); o.onended = () => { o.disconnect(); dispose(); this.activeTransients--; };
  }
  private burst(at: number, duration: number, volume: number, frequency: number, pan: number, bus = this.effects) {
    if (this.activeTransients >= 64) return;
    this.activeTransients++;
    const source = this.ctx.createBufferSource(); source.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = frequency; filter.Q.value = 0.6;
    const { gain, dispose } = this.route(bus, 0, pan); gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(volume, at + 0.006); gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    source.connect(filter); filter.connect(gain); source.start(at, 0, duration); source.onended = () => { source.disconnect(); filter.disconnect(); dispose(); this.activeTransients--; };
  }
  private string(midi: number) {
    let buffer = this.strings.get(midi); if (buffer) return buffer;
    const rate = this.ctx.sampleRate, delay = Math.round(rate / midiHz(midi)), line = new Float32Array(delay), random = seeded(midi * 1781);
    for (let i = 0; i < delay; i++) line[i] = random() * 2 - 1;
    const mean = line.reduce((sum, value) => sum + value, 0) / delay; for (let i = 0; i < delay; i++) line[i] -= mean;
    buffer = this.ctx.createBuffer(1, rate * 2.7, rate); const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) { const j = i % delay, next = (j + 1) % delay; samples[i] = line[j] * Math.min(1, i / (rate * 0.004)) * Math.min(1, (samples.length - i) / (rate * 0.1)); line[j] = (line[j] + line[next]) * 0.496; }
    this.strings.set(midi, buffer); return buffer;
  }
  note(note: Note, at: number) {
    if (note.voice === 'pluck') {
      const src = this.ctx.createBufferSource(); src.buffer = this.string(note.midi);
      const route = this.route(this.music, note.velocity, note.pan); src.connect(route.gain); src.start(at); src.stop(at + Math.min(2.7, note.duration * BEAT)); src.onended = () => { src.disconnect(); route.dispose(); };
    } else if (note.voice === 'pad') {
      const frequency = midiHz(note.midi), duration = note.duration * BEAT, route = this.route(this.music, 0, note.pan);
      route.gain.gain.setValueAtTime(0, at); route.gain.gain.linearRampToValueAtTime(note.velocity * 0.45, at + 0.6); route.gain.gain.linearRampToValueAtTime(0.0001, at + duration);
      const osc = this.ctx.createOscillator(); osc.type = 'sine'; osc.frequency.value = frequency; osc.connect(route.gain); osc.start(at); osc.stop(at + duration); osc.onended = () => { osc.disconnect(); route.dispose(); };
    } else {
      this.tone(midiHz(note.midi), at, note.duration * BEAT + 0.15, note.velocity * 0.52, this.music, 'sine', note.pan);
      this.tone(midiHz(note.midi) * 2.003, at, 0.37, note.velocity * 0.06, this.music, 'sine', note.pan);
    }
  }
  effect(kind: Effect, at = this.ctx.currentTime, volume = 1, pan = 0) {
    const v = Math.max(0, Math.min(1, volume));
    const chime = (notes: number[], speed: number, gain = 0.1) => notes.forEach((m, i) => { this.tone(midiHz(m-12), at + i * speed, 0.30, gain * v, this.effects, 'sine', pan); this.tone(midiHz(m-12) * 2.01, at + i * speed, 0.13, gain * v * 0.16, this.effects, 'sine', pan); });
    switch (kind) {
      case 'stepStone': this.burst(at, 0.085, 0.22 * v, 600, pan); this.tone(150, at, 0.075, 0.07 * v, this.effects, 'sine', pan, 75); break;
      case 'stepGrass': this.burst(at, 0.13, 0.13 * v, 1700, pan); this.tone(105, at, 0.08, 0.035 * v, this.effects, 'sine', pan, 65); break;
      case 'swing': this.burst(at, 0.19, 0.19 * v, 2200, pan); break;
      case 'impact': this.burst(at, 0.13, 0.34 * v, 950, pan); this.tone(680, at, 0.2, 0.09 * v, this.effects, 'triangle', pan, 180); break;
      case 'hurt': this.burst(at, 0.17, 0.26 * v, 280, pan); this.tone(115, at, 0.2, 0.17 * v, this.effects, 'sine', pan, 48); break;
      case 'nova': this.burst(at, 0.6, 0.19 * v, 2100, pan); [62, 69, 74].forEach((m, i) => this.tone(midiHz(m), at + i * 0.04, 0.8, 0.09 * v, this.effects, 'sine', pan, midiHz(m + 12))); break;
      case 'heal': chime([74, 77, 81], 0.11, 0.1); break;
      case 'level': chime([62, 69, 74, 77, 81, 86], 0.12, 0.15); break;
      case 'loot': chime([86, 81, 88], 0.065, 0.08); break;
      case 'questAccept': chime([62, 69, 74], 0.14, 0.09); break;
      case 'questComplete': chime([65, 69, 74, 77, 81], 0.13, 0.13); break;
      case 'respawn': chime([50, 62, 69, 74], 0.18, 0.12); break;
      case 'defeat': chime([62, 60, 57, 50], 0.2, 0.11); break;
      case 'enemyDeath': this.burst(at, 0.35, 0.24 * v, 300, pan); this.tone(145, at, 0.3, 0.08 * v, this.effects, 'triangle', pan, 45); break;
      case 'ui': this.tone(650, at, 0.05, 0.04 * v, this.effects, 'sine', 0, 850); break;
      case 'deny': this.tone(210, at, 0.11, 0.055 * v, this.effects, 'sine', 0, 160); break;
      case 'bird': this.tone(1800, at, 0.11, 0.045 * v, this.ambience, 'sine', pan, 2700); this.tone(2300, at + 0.18, 0.11, 0.037 * v, this.ambience, 'sine', pan, 1700); break;
    }
  }
}
