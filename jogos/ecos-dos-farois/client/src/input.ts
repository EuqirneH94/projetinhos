import type { SceneView } from "./scene.js";
export class Input {
  keys = new Set<string>();
  joystick = { x: 0, z: 0 };
  enabled = false;
  onkey = (_key: string) => {};
  onclick = (_x: number, _y: number) => {};
  constructor(canvas: HTMLCanvasElement, view: SceneView) {
    window.addEventListener("keydown", (e) => {
      if (
        !this.enabled ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const key = e.key.toLowerCase();
      if (
        [
          " ",
          "tab",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ].includes(key)
      )
        e.preventDefault();
      this.keys.add(key);
      if (!e.repeat) this.onkey(key);
    });
    window.addEventListener("keyup", (e) =>
      this.keys.delete(e.key.toLowerCase()),
    );
    window.addEventListener("blur", () => this.clear());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.clear();
    });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        view.zoomBy(e.deltaY);
      },
      { passive: false },
    );
    let pointer: {
      id: number;
      x: number;
      y: number;
      startX: number;
      startY: number;
      orbit: boolean;
      dragged: boolean;
    } | null = null;
    canvas.addEventListener("pointerdown", (e) => {
      if (!this.enabled || pointer) return;
      canvas.focus({ preventScroll: true });
      pointer = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        startX: e.clientX,
        startY: e.clientY,
        orbit: e.button === 2 || e.pointerType === "touch",
        dragged: false,
      };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!pointer || pointer.id !== e.pointerId) return;
      const dx = e.clientX - pointer.x,
        dy = e.clientY - pointer.y;
      if (
        Math.hypot(e.clientX - pointer.startX, e.clientY - pointer.startY) > 5
      )
        pointer.dragged = true;
      if (pointer.orbit && pointer.dragged) view.orbit(dx, dy);
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    });
    canvas.addEventListener("pointerup", (e) => {
      if (!pointer || pointer.id !== e.pointerId) return;
      if (!pointer.dragged && e.button !== 2)
        this.onclick(e.clientX, e.clientY);
      pointer = null;
    });
    canvas.addEventListener("pointercancel", () => {
      pointer = null;
    });
  }
  clear() {
    this.keys.clear();
    this.joystick = { x: 0, z: 0 };
  }
  direction(yaw: number) {
    if (!this.enabled) return { x: 0, z: 0 };
    const side =
      (this.keys.has("d") || this.keys.has("arrowright") ? 1 : 0) -
      (this.keys.has("a") || this.keys.has("arrowleft") ? 1 : 0) +
      this.joystick.x;
    const forward =
      (this.keys.has("w") || this.keys.has("arrowup") ? 1 : 0) -
      (this.keys.has("s") || this.keys.has("arrowdown") ? 1 : 0) -
      this.joystick.z;
    const length = Math.max(1, Math.hypot(side, forward));
    return {
      x: (Math.cos(yaw) * side - Math.sin(yaw) * forward) / length,
      z: (-Math.sin(yaw) * side - Math.cos(yaw) * forward) / length,
    };
  }
}
