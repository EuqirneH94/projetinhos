import "./character-lab.css";
import * as T from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CHARACTER_ASSET, validateCharacterAsset, type CharacterStats } from "./character-assets.js";

const canvas = document.querySelector<HTMLCanvasElement>("#character")!;
const stage = document.querySelector<HTMLElement>(".stage")!;
const clipSelect = document.querySelector<HTMLSelectElement>("#clip")!;
const timeline = document.querySelector<HTMLInputElement>("#timeline")!;
const play = document.querySelector<HTMLButtonElement>("#play")!;
const turntable = document.querySelector<HTMLInputElement>("#turntable")!;
const wireframe = document.querySelector<HTMLInputElement>("#wireframe")!;
const status = document.querySelector<HTMLElement>("#load-state")!;
const output = document.querySelector<HTMLOutputElement>("#time")!;
const scene = new T.Scene();
const renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.setClearColor(0x10262f);
const camera = new T.PerspectiveCamera(38, 1, .02, 100);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = .35; controls.maxDistance = 9;
controls.maxPolarAngle = Math.PI * .88;
scene.add(new T.HemisphereLight(0xcfe9f0, 0x273034, 2.1));
for (const [x, y, z, color, intensity] of [[-3, 4, 4, 0xffe0b4, 3.8], [3, 2, 1, 0x87cce0, 2], [1, 3, -3, 0x99ebda, 3.5]]) {
  const light = new T.DirectionalLight(color, intensity); light.position.set(x, y, z); scene.add(light);
}
const floor = new T.Mesh(new T.CircleGeometry(4, 96), new T.MeshStandardMaterial({ color: 0x19373c, roughness: .85 }));
floor.rotation.x = -Math.PI / 2; floor.position.y = -.015; scene.add(floor);
const grid = new T.GridHelper(6, 24, 0x3d6265, 0x26454c); grid.position.y = -.01; scene.add(grid);
const platform = new T.Mesh(new T.RingGeometry(.79, .8, 96), new T.MeshBasicMaterial({ color: 0xb9a77b, side: T.DoubleSide }));
platform.rotation.x = -Math.PI / 2; platform.position.y = -.005; scene.add(platform);
let model: T.Group | undefined, mixer: T.AnimationMixer | undefined;
let stats: CharacterStats | undefined;
let clips: T.AnimationClip[] = [], action: T.AnimationAction | undefined;
let playing = true, loaded = false, disposed = false;
const materials = new Set<T.MeshStandardMaterial>();
let previousFrame = performance.now();
const once = new Set(["Jump", "Land", "Attack", "Hit", "Death", "Recover"]);
function setView(view: string) {
  const views: Record<string, [number, number, number, number, number, number]> = {
    front: [0, 1.35, 4.6, 0, 1.15, 0], side: [4.6, 1.35, 0, 0, 1.15, 0], back: [0, 1.35, -4.6, 0, 1.15, 0],
    face: [.25, 2.05, 1.25, 0, 2.04, 0], hands: [1.5, 1.08, 1.6, .45, .95, 0], feet: [.65, .45, 1.55, 0, .12, 0],
  };
  const v = views[view] ?? views.front;
  camera.position.set(v[0], v[1], v[2]); controls.target.set(v[3], v[4], v[5]); controls.update();
}
setView("front");
function selectClip() {
  mixer?.stopAllAction(); action = undefined;
  if (clipSelect.value !== "Neutral") {
    const clip = clips.find(c => c.name === clipSelect.value);
    if (!clip || !mixer) return;
    action = mixer.clipAction(clip);
    action.reset().setLoop(once.has(clip.name) ? T.LoopOnce : T.LoopRepeat, once.has(clip.name) ? 1 : Infinity);
    action.clampWhenFinished = true; action.play();
    timeline.max = String(clip.duration); timeline.value = "0";
  } else { timeline.max = "1"; timeline.value = "0"; }
  timeline.disabled = !action;
  mixer?.update(0); output.value = "0,00 s";
}
clipSelect.addEventListener("change", selectClip);
timeline.addEventListener("input", () => {
  if (!action || !mixer) return;
  playing = false; play.textContent = "Reproduzir";
  action.enabled = true; action.paused = false; action.time = Number(timeline.value);
  mixer.update(0); output.value = `${action.time.toFixed(2).replace(".", ",")} s`;
});
play.addEventListener("click", () => {
  playing = !playing; play.textContent = playing ? "Pausar" : "Reproduzir";
  if (playing && action) {
    if (action.time >= Number(timeline.max) - .001) action.reset().play();
    action.paused = false;
  }
});
document.querySelectorAll<HTMLButtonElement>("[data-view]").forEach(button => button.addEventListener("click", () => {
  turntable.checked = false; setView(button.dataset.view!);
}));
wireframe.addEventListener("change", () => materials.forEach(m => { m.wireframe = wireframe.checked; }));
function resize() {
  const rect = stage.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix();
}
const observer = new ResizeObserver(resize); observer.observe(stage); resize();
const report = (error: unknown) => {
  status.textContent = "Não foi possível carregar o estudo";
  const message = document.querySelector<HTMLElement>("#error")!;
  message.hidden = false; message.textContent = error instanceof Error ? error.message : String(error);
};
new GLTFLoader().loadAsync(CHARACTER_ASSET.url).then(gltf => {
  if (disposed) return;
  stats = validateCharacterAsset(gltf); model = gltf.scene; clips = gltf.animations;
  model.traverse(o => {
    if (!(o instanceof T.Mesh)) return;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) if (m instanceof T.MeshStandardMaterial) materials.add(m);
  });
  scene.add(model); mixer = new T.AnimationMixer(model);
  for (const clip of clips) { const option = document.createElement("option"); option.value = option.textContent = clip.name; clipSelect.append(option); }
  clipSelect.disabled = play.disabled = false;
  clipSelect.value = "Idle"; selectClip(); loaded = true;
  status.textContent = "Estudo 3D carregado · visual experimental";
  document.querySelector("#stats")!.textContent = `${stats.triangles.toLocaleString("pt-BR")} triângulos\n${stats.bones} ossos · ${stats.skinnedMeshes} malhas com skin\n${stats.materials} materiais · ${stats.textures} texturas\n${stats.clips} clips de animação\n${CHARACTER_ASSET.id}`;
}).catch(report);
canvas.addEventListener("webglcontextlost", e => { e.preventDefault(); report("A renderização foi interrompida. Recarregue a página para recuperar o contexto 3D."); });
function render() {
  if (disposed) return;
  requestAnimationFrame(render);
  const now = performance.now();
  const dt = Math.min(Math.max(0, (now - previousFrame) / 1000), .1);
  previousFrame = now;
  if (playing && action) mixer?.update(dt);
  if (turntable.checked) {
    const relative = camera.position.clone().sub(controls.target); relative.applyAxisAngle(new T.Vector3(0, 1, 0), dt * .3);
    camera.position.copy(controls.target).add(relative);
  }
  controls.update();
  if (action) {
    timeline.value = String(action.time); output.value = `${action.time.toFixed(2).replace(".", ",")} s`;
  }
  renderer.render(scene, camera);
  (window as unknown as { edfCharacterLab: unknown }).edfCharacterLab = {
    loaded, asset: CHARACTER_ASSET.id, currentClip: clipSelect.value, playing, currentTime: action?.time ?? 0,
    clips: clips.map(c => ({ name: c.name, duration: c.duration, tracks: c.tracks.length })), stats,
    drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles,
    textures: renderer.info.memory.textures, wireframe: wireframe.checked,
  };
}
render();
window.addEventListener("pagehide", () => {
  disposed = true; observer.disconnect(); controls.dispose(); mixer?.stopAllAction();
  const geometries = new Set<T.BufferGeometry>(), textures = new Set<T.Texture>(), mats = new Set<T.Material>(), skeletons = new Set<T.Skeleton>();
  scene.traverse(o => {
    if (!(o instanceof T.Mesh)) return;
    geometries.add(o.geometry);
    if (o instanceof T.SkinnedMesh) skeletons.add(o.skeleton);
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      mats.add(m); for (const value of Object.values(m)) if (value instanceof T.Texture) textures.add(value);
    }
  });
  textures.forEach(t => t.dispose()); mats.forEach(m => m.dispose()); geometries.forEach(g => g.dispose()); skeletons.forEach(s => s.dispose());
  renderer.dispose();
}, { once: true });
window.addEventListener("pageshow", event => { if (event.persisted && disposed) location.reload(); });
