import * as T from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import { CHARACTER_ASSET, CharacterAssetCache, characterAssetCache, validateCharacterAsset, type CharacterClip, type CharacterStats } from "./character-assets.js";
import { CharacterMotion, type CharacterEvent, type CharacterFrame } from "./character-animation.js";

const ONCE = new Set<CharacterClip>(["Attack", "Hit", "Death", "Recover", "Jump", "Land"]);
export function usesExperimentalCharacter(search: string, raceId?: string, classId?: string) {
  return new URLSearchParams(search).get("character") === "naquiro-male" && raceId === "naquiros" && classId === "errante";
}
export class SkeletalCharacter {
  readonly root = new T.Group();
  readonly ready: Promise<void>;
  status: "loading" | "loaded" | "fallback" | "disposed" = "loading";
  error: string | null = null;
  stats: CharacterStats | null = null;
  private lease;
  private mixer?: T.AnimationMixer;
  private instance?: T.Object3D;
  // Change gait before Walk reaches the playback-rate cap (2.3), so analog
  // movement between its authored stride and Run does not slide capped feet.
  private motion = new CharacterMotion({}, CHARACTER_ASSET.locomotion.Walk * 2.2);
  private actions = new Map<CharacterClip, T.AnimationAction>();
  private current?: T.AnimationAction;
  private desired: CharacterClip = "Idle";
  private restartAttack = false;
  private restartHit = false;
  private fallbackWasVisible: boolean;
  constructor(private readonly fallback: T.Object3D, options: { cache?: CharacterAssetCache } = {}) {
    this.root.name = CHARACTER_ASSET.id;
    this.fallbackWasVisible = fallback.visible;
    this.lease = (options.cache ?? characterAssetCache).acquire();
    this.ready = this.lease.ready.then(gltf => {
      if (this.status === "disposed") return;
      this.stats = validateCharacterAsset(gltf);
      this.instance = clone(gltf.scene);
      this.instance.traverse(o => {
        if (o instanceof T.Mesh) { o.castShadow = true; o.receiveShadow = true; }
      });
      this.mixer = new T.AnimationMixer(this.instance);
      const durations: Partial<Record<CharacterClip, number>> = {};
      for (const name of CHARACTER_ASSET.clips) {
        const clip = gltf.animations.find(a => a.name === name)!;
        durations[name] = clip.duration;
        const action = this.mixer.clipAction(clip);
        action.setLoop(ONCE.has(name) ? T.LoopOnce : T.LoopRepeat, ONCE.has(name) ? 1 : Infinity);
        action.clampWhenFinished = ONCE.has(name);
        this.actions.set(name, action);
      }
      this.motion.setDurations(durations);
      this.root.add(this.instance);
      this.play(this.desired);
      this.mixer.update(0);
      // One instance owns a skeleton, while meshes/materials stay cache-owned.
      this.fallback.visible = false;
      this.status = "loaded";
    }).catch(error => {
      if (this.status === "disposed") return;
      this.error = error instanceof Error ? error.message : String(error);
      this.clearInstance();
      this.status = "fallback";
      this.fallback.visible = this.fallbackWasVisible;
      this.lease.release();
      console.warn(`EDF character ${CHARACTER_ASSET.id}: ${this.error}; existing character retained.`);
    });
  }
  get clip(): CharacterClip { return this.desired; }
  private play(name: CharacterClip, restart = false) {
    const next = this.actions.get(name);
    if (!next || (next === this.current && !restart)) return;
    const previous = this.current;
    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();
    if (previous && previous !== next) next.crossFadeFrom(previous, name === "Death" ? .14 : .18, false);
    this.current = next;
  }
  update(frame: CharacterFrame) {
    if (this.status === "disposed") return;
    this.desired = this.motion.update(frame);
    if (this.status !== "loaded") return;
    this.play(this.desired, (this.desired === "Attack" && this.restartAttack) || (this.desired === "Hit" && this.restartHit));
    this.restartAttack = this.restartHit = false;
    // The rest pose has no root motion: playback follows measured displacement.
    // Nominal speeds refer to this authored asset, not the server's balance.
    if (this.desired === "Walk" || this.desired === "Run") {
      const nominal = CHARACTER_ASSET.locomotion[this.desired];
      this.current?.setEffectiveTimeScale(T.MathUtils.clamp(this.motion.speed / nominal, .35, 2.3));
    }
    const elapsed = Number.isFinite(frame.dt) ? T.MathUtils.clamp(frame.dt, 0, .25) : 0;
    this.mixer!.update(elapsed);
  }
  event(kind: CharacterEvent) {
    if (this.status === "disposed") return;
    this.motion.event(kind);
    if (kind === "attack") this.restartAttack = true;
    if (kind === "hit") this.restartHit = true;
  }
  diagnostics() {
    return { status: this.status, experimental: true, assetId: CHARACTER_ASSET.id, clip: this.clip, stats: this.stats, error: this.error, locomotionSpeed: this.motion.speed, playbackRate: this.current?.getEffectiveTimeScale() ?? 0 };
  }
  private clearInstance() {
    this.mixer?.stopAllAction();
    if (this.instance) {
      this.mixer?.uncacheRoot(this.instance);
      const skeletons = new Set<T.Skeleton>();
      this.instance.traverse(o => { if (o instanceof T.SkinnedMesh) skeletons.add(o.skeleton); });
      skeletons.forEach(s => s.dispose());
      this.instance.removeFromParent();
    }
    this.instance = undefined;
    this.mixer = undefined;
    this.current = undefined;
    this.actions.clear(); this.root.clear();
  }
  dispose() {
    if (this.status === "disposed") return;
    this.status = "disposed";
    this.clearInstance();
    this.root.removeFromParent();
    this.fallback.visible = this.fallbackWasVisible;
    this.lease.release();
  }
}
