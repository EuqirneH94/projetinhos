import type { CharacterClip } from "./character-assets.js";
export type CharacterFrame = { x: number; z: number; dt: number; dead: boolean; casting: boolean };
export type CharacterEvent = "attack" | "hit" | "respawn";

/** Visual state only. It never starts a skill, changes health, or writes a save.
 * Jump/Land/Swim remain inspectable clips: the current protocol has no such actions. */
export class CharacterMotion {
  clip: CharacterClip = "Idle";
  speed = 0;
  private previous?: { x: number; z: number };
  private wasDead = false;
  private attack = 0;
  private hit = 0;
  private recover = 0;
  constructor(private readonly durations: Partial<Record<CharacterClip, number>> = {}, private readonly runThreshold = 3.9) {}
  setDurations(durations: Partial<Record<CharacterClip, number>>) { Object.assign(this.durations, durations); }
  event(kind: CharacterEvent) {
    if (kind === "attack") this.attack = this.durations.Attack ?? .65;
    if (kind === "hit") this.hit = this.durations.Hit ?? .4;
    if (kind === "respawn") this.recover = this.durations.Recover ?? .8;
  }
  resetPosition() { this.previous = undefined; }
  update(frame: CharacterFrame): CharacterClip {
    const elapsed = Number.isFinite(frame.dt) ? Math.max(0, frame.dt) : 0;
    const gap = !Number.isFinite(frame.dt) || frame.dt > .25;
    this.attack = Math.max(0, this.attack - elapsed);
    this.hit = Math.max(0, this.hit - elapsed);
    this.recover = Math.max(0, this.recover - elapsed);
    let speed = 0;
    if (Number.isFinite(frame.x) && Number.isFinite(frame.z)) {
      if (this.previous && elapsed > 0 && !gap) {
        const distance = Math.hypot(frame.x - this.previous.x, frame.z - this.previous.z);
        // Reconciliation, respawn and teleport are not walking animations.
        if (distance <= 3) speed = distance / elapsed;
      }
      this.previous = { x: frame.x, z: frame.z };
    } else this.previous = undefined;
    this.speed = speed;
    if (frame.dead) {
      this.speed = 0;
      this.attack = this.hit = this.recover = 0;
      this.wasDead = true;
      return this.clip = "Death";
    }
    if (this.wasDead) {
      this.recover = this.durations.Recover ?? .8;
      this.wasDead = false;
      speed = 0;
      this.speed = 0;
    }
    // A cast interrupts a pending attack; ending that cast must not replay it.
    if (frame.casting) this.attack = 0;
    return this.clip = this.hit > 0 ? "Hit" : frame.casting ? "Cast" : this.attack > 0 ? "Attack" : this.recover > 0 ? "Recover" : speed > this.runThreshold ? "Run" : speed > .12 ? "Walk" : "Idle";
  }
}
