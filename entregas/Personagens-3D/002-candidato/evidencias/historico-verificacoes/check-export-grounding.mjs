// Supplemental measurement, not a visual/performance acceptance test.
// Run from the game directory with Node 24.14; output JSON lists all samples.
import { readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
const root = resolve(process.argv[2] ?? process.cwd());
const output = resolve(process.argv[3] ?? "export-grounding.json");
const T = await import(pathToFileURL(join(root, "node_modules/three/build/three.module.js")).href);
const { GLTFLoader } = await import(pathToFileURL(join(root, "node_modules/three/examples/jsm/loaders/GLTFLoader.js")).href);
globalThis.ProgressEvent ??= class extends Event {
  constructor(type, values = {}) { super(type); Object.assign(this, { lengthComputable: false, loaded: 0, total: 0 }, values); }
};
const directory = join(root, "client/public/art/characters/naquiro");
const original = await readFile(join(directory, "naquiro-male.gltf"));
const json = JSON.parse(original.toString());
for (const buffer of json.buffers) {
  const bytes = await readFile(join(directory, buffer.uri));
  buffer.uri = `data:application/octet-stream;base64,${bytes.toString("base64")}`;
}
delete json.images; delete json.textures; delete json.samplers;
for (const material of json.materials) {
  delete material.normalTexture; delete material.occlusionTexture; delete material.emissiveTexture;
  if (material.pbrMetallicRoughness) {
    delete material.pbrMetallicRoughness.baseColorTexture;
    delete material.pbrMetallicRoughness.metallicRoughnessTexture;
  }
}
const gltf = await new GLTFLoader().parseAsync(JSON.stringify(json), "");
const meshes = [];
gltf.scene.traverse(object => { if (object.isMesh) meshes.push(object); });
const clips = {};
for (const name of ["Idle", "Walk", "Run"]) {
  const clip = gltf.animations.find(animation => animation.name === name);
  const mixer = new T.AnimationMixer(gltf.scene);
  mixer.clipAction(clip).play();
  const samples = [], count = Math.ceil(clip.duration * 60);
  const point = new T.Vector3();
  for (let frame = 0; frame <= count; frame++) {
    const time = Math.min(clip.duration, frame / 60);
    mixer.setTime(time); gltf.scene.updateMatrixWorld(true);
    let minimumY = Infinity;
    for (const mesh of meshes) {
      if (mesh.isSkinnedMesh) mesh.skeleton.update();
      const positions = mesh.geometry.getAttribute("position");
      for (let index = 0; index < positions.count; index++) {
        mesh.getVertexPosition(index, point).applyMatrix4(mesh.matrixWorld);
        minimumY = Math.min(minimumY, point.y);
      }
    }
    samples.push({ time, minimumY });
  }
  clips[name] = { samples, minimum: Math.min(...samples.map(sample => sample.minimumY)), maximum: Math.max(...samples.map(sample => sample.minimumY)) };
  mixer.stopAllAction(); mixer.uncacheRoot(gltf.scene);
}
const report = {
  utc: new Date().toISOString(), node: process.version,
  gltfSha256: createHash("sha256").update(original).digest("hex"),
  sampleRate: 60, pointSpace: "deformed world space after getVertexPosition + matrixWorld",
  textures: "bindings removed in Node only, geometry/skin/animation buffer unchanged",
  clips,
};
await writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ output, gltfSha256: report.gltfSha256, clips: Object.fromEntries(Object.entries(clips).map(([name, clip]) => [name, { samples: clip.samples.length, minimum: clip.minimum, maximum: clip.maximum }])) }, null, 2));
