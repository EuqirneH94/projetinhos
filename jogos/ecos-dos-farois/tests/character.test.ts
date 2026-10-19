import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import * as T from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";
import { CHARACTER_ASSET, CharacterAssetCache, validateCharacterAsset } from "../client/src/character-assets.js";
import { CharacterMotion } from "../client/src/character-animation.js";
import { SkeletalCharacter, usesExperimentalCharacter } from "../client/src/character-runtime.js";

const REQUIRED_CLIPS = ["Idle", "Walk", "Run", "Jump", "Land", "Attack", "Cast", "Hit", "Death", "Recover", "Swim"];
const assetDirectory = new URL("../client/public/art/characters/naquiro/", import.meta.url);
let documentPromise: Promise<any> | undefined;
const document = () => documentPromise ??= readFile(new URL("naquiro-male.gltf", assetDirectory), "utf8").then(JSON.parse);

/** Node has no image decoder/WebGL. Parse the ACTUAL binary skin and animation
 * buffers, removing only texture bindings in this harness. The untouched glTF,
 * texture references and PNG payloads are checked separately below; browser
 * validation must still prove the production texture loader/CSP/render path. */
async function parseActualGeometry(): Promise<GLTF> {
  const source = await document();
  const json = structuredClone(source);
  for (const buffer of json.buffers ?? []) {
    assert.ok(typeof buffer.uri === "string" && !buffer.uri.includes(":"), "binary must be a local file");
    const bytes = await readFile(new URL(buffer.uri, assetDirectory));
    assert.equal(bytes.length, buffer.byteLength);
    buffer.uri = `data:application/octet-stream;base64,${bytes.toString("base64")}`;
  }
  delete json.images;
  delete json.textures;
  delete json.samplers;
  for (const material of json.materials ?? []) {
    delete material.normalTexture;
    delete material.occlusionTexture;
    delete material.emissiveTexture;
    if (material.pbrMetallicRoughness) {
      delete material.pbrMetallicRoughness.baseColorTexture;
      delete material.pbrMetallicRoughness.metallicRoughnessTexture;
    }
  }
  const previous = globalThis.ProgressEvent;
  if (!previous) Object.defineProperty(globalThis, "ProgressEvent", {
    configurable: true, value: class extends Event {
      lengthComputable: boolean; loaded: number; total: number;
      constructor(type: string, init: ProgressEventInit = {}) {
        super(type); this.lengthComputable = !!init.lengthComputable; this.loaded = init.loaded ?? 0; this.total = init.total ?? 0;
      }
    },
  });
  try { return await new GLTFLoader().parseAsync(JSON.stringify(json), ""); }
  finally { if (!previous) Reflect.deleteProperty(globalThis, "ProgressEvent"); }
}
let parsed: Promise<GLTF> | undefined;
const actual = () => parsed ??= parseActualGeometry();

/** Give each test ownership of disposable resources while preserving the
 * within-asset sharing pattern and actual exported bone/animation topology. */
async function ownedAsset(): Promise<GLTF> {
  const original = await actual();
  const scene = cloneSkeleton(original.scene) as T.Group;
  const geometries = new Map<T.BufferGeometry, T.BufferGeometry>();
  const materials = new Map<T.Material, T.Material>();
  scene.traverse(object => {
    if (!(object instanceof T.Mesh)) return;
    if (!geometries.has(object.geometry)) geometries.set(object.geometry, object.geometry.clone());
    object.geometry = geometries.get(object.geometry)!;
    const copy = (material: T.Material) => {
      if (!materials.has(material)) materials.set(material, material.clone());
      return materials.get(material)!;
    };
    object.material = Array.isArray(object.material) ? object.material.map(copy) : copy(object.material);
  });
  return { ...original, scene, scenes: [scene], animations: original.animations.map(clip => clip.clone()) };
}
function skins(root: T.Object3D) {
  const result: T.SkinnedMesh[] = [];
  root.traverse(object => { if (object instanceof T.SkinnedMesh) result.push(object); });
  return result;
}
const frame = (x = 0, z = 0, dt = 1 / 60, dead = false, casting = false) => ({ x, z, dt, dead, casting });

test("real Náquiro has bounded triangulated UV geometry, normalized four-weight skin and finite bone bindings", async () => {
  const gltf = await actual();
  assert.doesNotThrow(() => validateCharacterAsset(gltf));
  assert.deepEqual([...CHARACTER_ASSET.clips].sort(), [...REQUIRED_CLIPS].sort());
  const meshes = skins(gltf.scene);
  assert.ok(meshes.length > 0, "a group animation is not a skin");
  const uniqueBones = new Set<T.Bone>(), materials = new Set<T.Material>();
  let triangles = 0, vertices = 0;
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(object => {
    if (!(object instanceof T.Mesh)) return;
    const geometry = object.geometry, position = geometry.getAttribute("position"), uv = geometry.getAttribute("uv");
    assert.ok(position && uv, `${object.name}: actual geometry and UVs required`);
    triangles += (geometry.index?.count ?? position.count) / 3;
    vertices += position.count;
    assert.equal(uv.count, position.count);
    for (let i = 0; i < position.count; i++) {
      assert.ok([position.getX(i), position.getY(i), position.getZ(i), uv.getX(i), uv.getY(i)].every(Number.isFinite));
      assert.ok(uv.getX(i) >= -.001 && uv.getX(i) <= 1.001 && uv.getY(i) >= -.001 && uv.getY(i) <= 1.001, `${object.name}: UV must address its atlas`);
    }
    if (geometry.index) for (let i = 0; i < geometry.index.count; i++) {
      const value = geometry.index.getX(i);
      assert.ok(Number.isInteger(value) && value >= 0 && value < position.count);
    }
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
    if (!(object instanceof T.SkinnedMesh)) return;
    const weight = geometry.getAttribute("skinWeight"), index = geometry.getAttribute("skinIndex");
    assert.ok(weight && index);
    assert.equal(weight.itemSize, 4);
    assert.equal(index.itemSize, 4);
    assert.equal(weight.count, position.count);
    assert.equal(index.count, position.count);
    for (let i = 0; i < weight.count; i++) {
      const weights = [weight.getX(i), weight.getY(i), weight.getZ(i), weight.getW(i)];
      assert.ok(weights.every(value => Number.isFinite(value) && value >= 0 && value <= 1));
      assert.ok(Math.abs(weights.reduce((a, b) => a + b, 0) - 1) < .001, `${object.name}: vertex ${i} has unnormalized weights`);
      for (const joint of [index.getX(i), index.getY(i), index.getZ(i), index.getW(i)])
        assert.ok(Number.isInteger(joint) && joint >= 0 && joint < object.skeleton.bones.length);
    }
    object.skeleton.bones.forEach(bone => uniqueBones.add(bone));
    assert.equal(object.skeleton.boneInverses.length, object.skeleton.bones.length);
    for (const inverse of object.skeleton.boneInverses) assert.ok(inverse.elements.every(Number.isFinite));
    assert.ok(object.bindMatrix.elements.every(Number.isFinite));
  });
  assert.ok(triangles > 1000 && triangles <= 30_000, `approved first-LOD target: ${triangles} triangles`);
  assert.ok(vertices > 1000);
  assert.ok(materials.size <= 6, `${materials.size} materials exceed the proposed six-material target`);
  assert.ok(uniqueBones.size >= 20 && uniqueBones.size <= 80, `${uniqueBones.size} deform bones`);
  const box = new T.Box3().setFromObject(gltf.scene);
  assert.ok(box.min.y >= -.05 && box.min.y <= .05, `feet-origin ${box.min.y}`);
  assert.ok(box.max.y > 1.4 && box.max.y < 2.6, `world-scale height ${box.max.y}`);
  assert.ok(box.getSize(new T.Vector3()).toArray().every(value => Number.isFinite(value) && value > 0 && value < 4));
});

test("distributed character uses real local PBR atlas files, bounded PNG dimensions and explicit authorship", async () => {
  const json = await document();
  assert.equal(json.asset.version, "2.0");
  assert.ok(typeof json.asset.copyright === "string" && json.asset.copyright.length > 10, "authorship must travel with the asset");
  assert.ok(json.images?.length >= 3, "base colour, tangent normal and roughness data must be actual images");
  for (const image of json.images) {
    assert.ok(typeof image.uri === "string" && !/[\\:?#]/.test(image.uri) && !image.uri.startsWith("/"), "relative same-origin path only");
    const location = new URL(image.uri, assetDirectory);
    assert.ok(location.href.startsWith(assetDirectory.href), "texture traversal outside the asset directory is forbidden");
    assert.match(location.pathname, /\.png$/i);
    const bytes = await readFile(location);
    assert.deepEqual(bytes.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
    assert.ok(width >= 64 && width <= 2048 && height >= 64 && height <= 2048, `${image.uri}: ${width}×${height}`);
    assert.ok(bytes.length > 512, `${image.uri}: texture payload, not just a filename`);
  }
  const mapped = json.materials.filter((material: any) => material.pbrMetallicRoughness?.baseColorTexture && material.normalTexture && material.pbrMetallicRoughness?.metallicRoughnessTexture);
  assert.ok(mapped.length >= 1, "at least the primary skin/wardrobe material must bind colour, normal and roughness");
  for (const material of json.materials) {
    const bindings = [material.pbrMetallicRoughness?.baseColorTexture, material.pbrMetallicRoughness?.metallicRoughnessTexture, material.normalTexture, material.occlusionTexture, material.emissiveTexture].filter(Boolean);
    for (const binding of bindings) {
      assert.ok(Number.isInteger(binding.index) && binding.index >= 0 && binding.index < json.textures.length);
      const texture = json.textures[binding.index];
      assert.ok(Number.isInteger(texture.source) && texture.source >= 0 && texture.source < json.images.length);
    }
  }
});

test("export preserves bright skin and pearl tints instead of wrapping HDR vertex colours", async () => {
  const gltf = await actual(), json = await document();
  const skinMaterial = json.materials.find((material: any) => material.name.startsWith("01_Pele_"));
  assert.ok(skinMaterial?.pbrMetallicRoughness?.baseColorTexture, "the skin atlas supplies pigmentation; vertex colours are light modulation");
  let skinVertices = 0, ornamentVertices = 0;
  gltf.scene.traverse(object => {
    if (!(object instanceof T.Mesh)) return;
    const material = Array.isArray(object.material) ? object.material[0] : object.material;
    const colour = object.geometry.getAttribute("color");
    assert.ok(colour, `${material.name}: authored vertex tints must survive export`);
    // This is the reviewed palette contract of this asset, not a general PBR
    // restriction. Pigmentation comes from the skin atlas, while its vertex
    // tints and copper/pearl adornments stay bright. Merely checking [0,1]
    // cannot catch Blender HDR values wrapping during normalized-U16 export:
    // e.g. 1.02 becomes approximately .02 and turns pearls red/skin black.
    const minimum = material.name.startsWith("01_Pele_") ? .5
      : material.name.startsWith("05_Cobre_") ? .45 : 0;
    for (let i = 0; i < colour.count; i++) {
      const rgb = [colour.getX(i), colour.getY(i), colour.getZ(i)];
      assert.ok(rgb.every(value => Number.isFinite(value) && value >= minimum && value <= 1),
        `${material.name}: vertex ${i} tint [${rgb.join(", ")}] violates bright modulation ≥${minimum}; possible HDR→U16 wrap`);
      if (colour.itemSize === 4) assert.equal(colour.getW(i), 1, `${material.name}: opaque vertex alpha`);
    }
    if (material.name.startsWith("01_Pele_")) skinVertices += colour.count;
    if (material.name.startsWith("05_Cobre_")) ornamentVertices += colour.count;
  });
  assert.ok(skinVertices > 1000, "actual skin buffer was inspected");
  assert.ok(ornamentVertices > 100, "actual pearl/copper buffer was inspected");
});

test("all eleven real exported clips contain finite changing bone tracks and distinct poses", async () => {
  const gltf = await ownedAsset();
  assert.deepEqual(gltf.animations.map(clip => clip.name).sort(), [...REQUIRED_CLIPS].sort());
  const signatures = new Set<string>();
  for (const clip of gltf.animations) {
    assert.ok(Number.isFinite(clip.duration) && clip.duration >= .1 && clip.duration <= 10, `${clip.name}: duration`);
    assert.ok(clip.tracks.length >= 3, `${clip.name}: must animate a skeleton, not merely name an empty clip`);
    let varyingTracks = 0;
    for (const track of clip.tracks) {
      // glTF may optimize an unchanged channel to one key. The clip as a
      // whole must still have at least three genuinely changing channels.
      assert.ok(track.times.length >= 1);
      assert.ok(Array.from(track.times).every((value, i, values) => Number.isFinite(value) && value >= 0 && (i === 0 || value > values[i - 1])));
      assert.ok(Array.from(track.values).every(Number.isFinite));
      const stride = track.getValueSize();
      if (Array.from(track.values).some((value, i, values) => i >= stride && Math.abs(value - values[i % stride]) > .00001)) {
        const targetName = T.PropertyBinding.parseTrackName(track.name).nodeName;
        const target = gltf.scene.getObjectByName(targetName) ?? gltf.scene.getObjectByProperty("uuid", targetName);
        if (target instanceof T.Bone) varyingTracks++;
      }
    }
    assert.ok(varyingTracks >= 3, `${clip.name}: needs actual changing bone tracks`);
    signatures.add(JSON.stringify(clip.tracks.map(track => ({ name: track.name, times: Array.from(track.times), values: Array.from(track.values) }))));
    const mixer = new T.AnimationMixer(gltf.scene);
    mixer.clipAction(clip).play();
    for (const fraction of [0, .2, .5, .8, .999]) {
      mixer.setTime(clip.duration * fraction);
      gltf.scene.updateMatrixWorld(true);
      for (const mesh of skins(gltf.scene)) {
        mesh.skeleton.update();
        for (const bone of mesh.skeleton.bones) assert.ok(bone.matrixWorld.elements.every(Number.isFinite), `${clip.name}: finite skeleton`);
        const position = mesh.geometry.getAttribute("position");
        for (let i = 0; i < position.count; i += Math.max(1, Math.floor(position.count / 100))) {
          const point = mesh.applyBoneTransform(i, new T.Vector3().fromBufferAttribute(position, i));
          assert.ok(point.toArray().every(Number.isFinite), `${clip.name}: finite skinned deformation`);
          assert.ok(point.length() < 5, `${clip.name}: unbounded deformation`);
        }
      }
    }
    mixer.stopAllAction(); mixer.uncacheRoot(gltf.scene);
  }
  assert.equal(signatures.size, REQUIRED_CLIPS.length, "differently named copies are not eleven animations");
});

test("asset validation rejects missing clips and malformed skins before replacing a fallback", async () => {
  const asset = await ownedAsset();
  assert.doesNotThrow(() => validateCharacterAsset(asset));
  assert.throws(() => validateCharacterAsset({ ...asset, animations: asset.animations.filter(clip => clip.name !== "Hit") }), /Hit|clip|animation/i);
  assert.throws(() => validateCharacterAsset({ ...asset, scene: new T.Group() }), /skin|mesh/i);
  const mesh = skins(asset.scene)[0];
  const position = mesh.geometry.getAttribute("position");
  const previous = position.getX(0);
  position.setX(0, Number.NaN);
  assert.throws(() => validateCharacterAsset(asset), /finite|position|geometry|vertex|invalid/i);
  position.setX(0, previous);
  const weights = mesh.geometry.getAttribute("skinWeight"), joints = mesh.geometry.getAttribute("skinIndex");
  const savedWeight = [weights.getX(0), weights.getY(0), weights.getZ(0), weights.getW(0)];
  weights.setXYZW(0, 0, 0, 0, 0);
  assert.throws(() => validateCharacterAsset(asset), /weight|skin|normalized/i);
  weights.setXYZW(0, ...savedWeight as [number, number, number, number]);
  const savedJoint = joints.getX(0);
  joints.setX(0, mesh.skeleton.bones.length);
  assert.throws(() => validateCharacterAsset(asset), /joint|skin|invalid/i);
  joints.setX(0, savedJoint);
  const uv = mesh.geometry.getAttribute("uv");
  mesh.geometry.deleteAttribute("uv");
  assert.throws(() => validateCharacterAsset(asset), /UV|texture|coordinate/i);
  mesh.geometry.setAttribute("uv", uv);
  const time = asset.animations[0].tracks[0].times[0];
  asset.animations[0].tracks[0].times[0] = Number.NaN;
  assert.throws(() => validateCharacterAsset(asset), /animation|track|time|finite/i);
  asset.animations[0].tracks[0].times[0] = time;
  const savedMaterials = mesh.material;
  mesh.material = Array.from({ length: 7 }, () => new T.MeshStandardMaterial());
  assert.throws(() => validateCharacterAsset(asset), /budget|material/i, "runtime must enforce the approved asset budget before hiding the fallback");
  mesh.material.forEach(material => material.dispose());
  mesh.material = savedMaterials;
});

test("cache coalesces simultaneous loads and disposes resources only after the last idempotent release", async () => {
  const asset = await ownedAsset();
  const mesh = skins(asset.scene)[0];
  let geometryDisposals = 0, materialDisposals = 0, textureDisposals = 0, imageCloses = 0;
  mesh.geometry.addEventListener("dispose", () => geometryDisposals++);
  const material = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as T.MeshStandardMaterial;
  material.addEventListener("dispose", () => materialDisposals++);
  material.map = new T.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  material.map.addEventListener("dispose", () => textureDisposals++);
  const image = { width: 1, height: 1, close() { imageCloses++; } };
  material.map.image = image;
  material.normalMap = new T.Texture(image);
  let resolve!: (gltf: GLTF) => void, requests = 0;
  const cache = new CharacterAssetCache(() => { requests++; return new Promise<GLTF>(done => { resolve = done; }); });
  const one = cache.acquire(), two = cache.acquire();
  await Promise.resolve();
  assert.equal(requests, 1);
  assert.equal(cache.diagnostics().references, 2);
  resolve(asset);
  assert.equal(await one.ready, await two.ready, "template resources are shared, pose instances are not");
  one.release(); one.release();
  assert.equal(cache.diagnostics().references, 1);
  assert.equal(geometryDisposals + materialDisposals + textureDisposals, 0);
  assert.equal(imageCloses, 0, "surviving leases still need the decoded texture");
  two.release();
  assert.equal(cache.diagnostics().references, 0);
  assert.equal(geometryDisposals, 1);
  assert.equal(materialDisposals, 1);
  assert.equal(textureDisposals, 1);
  assert.equal(imageCloses, 1, "two texture slots sharing one ImageBitmap must close it exactly once");
});

test("failed/corrupt/missing-clip loads retain fallback, and a later acquisition can recover", async () => {
  const actualAsset = await ownedAsset();
  for (const failure of [new Error("HTTP 404 missing character"), new SyntaxError("corrupt glTF JSON"), { ...actualAsset, animations: [] }]) {
    let requests = 0;
    const cache = new CharacterAssetCache(async () => {
      requests++;
      if (requests === 1) { if (failure instanceof Error) throw failure; return failure; }
      return ownedAsset();
    });
    const fallback = new T.Group(); fallback.name = "fallback-visible-until-validated";
    const first = new SkeletalCharacter(fallback, { cache });
    await first.ready;
    assert.equal(first.status, "fallback");
    assert.equal(fallback.visible, true);
    assert.equal(skins(first.root).length, 0);
    first.dispose();
    const retry = new SkeletalCharacter(new T.Group(), { cache });
    await retry.ready;
    assert.equal(retry.status, "loaded");
    retry.dispose();
    assert.equal(cache.diagnostics().references, 0);
  }
});

test("late loading never resurrects a disposed character or removes a surviving instance", async () => {
  let resolve!: (gltf: GLTF) => void;
  const cache = new CharacterAssetCache(() => new Promise<GLTF>(done => { resolve = done; }));
  const removed = new SkeletalCharacter(new T.Group(), { cache });
  const remaining = new SkeletalCharacter(new T.Group(), { cache });
  await Promise.resolve();
  removed.dispose(); removed.dispose();
  resolve(await ownedAsset());
  await Promise.all([removed.ready, remaining.ready]);
  assert.equal(removed.status, "disposed");
  assert.equal(removed.root.children.length, 0);
  assert.equal(remaining.status, "loaded");
  assert.ok(skins(remaining.root).length > 0);
  assert.equal(cache.diagnostics().references, 1);
  remaining.dispose();
  assert.equal(cache.diagnostics().references, 0);
});

test("a wholly abandoned loading generation cannot replace or release its newer replacement", async () => {
  const pending: ((gltf: GLTF) => void)[] = [];
  const cache = new CharacterAssetCache(() => new Promise<GLTF>(resolve => { pending.push(resolve); }));
  const old = new SkeletalCharacter(new T.Group(), { cache });
  await Promise.resolve();
  old.dispose();
  const replacement = new SkeletalCharacter(new T.Group(), { cache });
  await Promise.resolve();
  assert.equal(pending.length, 2);
  const abandonedAsset = await ownedAsset();
  let abandonedDisposals = 0;
  skins(abandonedAsset.scene)[0].geometry.addEventListener("dispose", () => abandonedDisposals++);
  pending[0](abandonedAsset);
  await old.ready;
  assert.equal(old.status, "disposed");
  assert.equal(old.root.children.length, 0);
  assert.equal(abandonedDisposals, 1);
  assert.equal(replacement.status, "loading");
  assert.equal(cache.diagnostics().references, 1);
  pending[1](await ownedAsset());
  await replacement.ready;
  assert.equal(replacement.status, "loaded");
  replacement.dispose();
  assert.equal(cache.diagnostics().references, 0);
});

test("two players share immutable resources while skeletons, actions and disposal remain independent", async () => {
  const cache = new CharacterAssetCache(ownedAsset);
  const one = new SkeletalCharacter(new T.Group(), { cache }), two = new SkeletalCharacter(new T.Group(), { cache });
  await Promise.all([one.ready, two.ready]);
  assert.equal(one.status, "loaded"); assert.equal(two.status, "loaded");
  const oneMesh = skins(one.root)[0], twoMesh = skins(two.root)[0];
  assert.notEqual(oneMesh, twoMesh);
  assert.equal(oneMesh.geometry, twoMesh.geometry);
  assert.notEqual(oneMesh.skeleton, twoMesh.skeleton);
  for (let i = 0; i < oneMesh.skeleton.bones.length; i++) assert.notEqual(oneMesh.skeleton.bones[i], twoMesh.skeleton.bones[i]);
  one.update(frame()); two.update(frame());
  one.event("attack");
  for (let i = 0; i < 10; i++) { one.update(frame()); two.update(frame()); }
  assert.equal(one.clip, "Attack");
  assert.equal(two.clip, "Idle");
  const poseOne = oneMesh.skeleton.bones.flatMap(bone => bone.quaternion.toArray());
  const poseTwo = twoMesh.skeleton.bones.flatMap(bone => bone.quaternion.toArray());
  assert.notDeepEqual(poseOne, poseTwo, "independent mixers must actually produce different bones");
  const otherPose = poseTwo.slice();
  one.dispose();
  assert.deepEqual(twoMesh.skeleton.bones.flatMap(bone => bone.quaternion.toArray()), otherPose);
  assert.equal(two.status, "loaded");
  assert.equal(cache.diagnostics().references, 1);
  two.event("hit"); two.update(frame());
  assert.equal(two.clip, "Hit");
  two.dispose();
  assert.equal(cache.diagnostics().references, 0);
});

test("actual rig matches gait speed and crossfades without snapping to the complete death pose in one frame", async () => {
  const cache = new CharacterAssetCache(ownedAsset);
  const actor = new SkeletalCharacter(new T.Group(), { cache });
  await actor.ready;
  actor.update(frame());
  actor.update(frame(1 / 60));
  assert.equal(actor.clip, "Walk");
  assert.ok(Math.abs(actor.diagnostics().playbackRate - 1 / CHARACTER_ASSET.locomotion.Walk) < .00001);
  actor.update(frame(1 / 60 + 3 / 60));
  assert.equal(actor.clip, "Run", "3 units/s must switch gait before Walk saturates its playback cap");
  assert.ok(Math.abs(actor.diagnostics().playbackRate - 3 / CHARACTER_ASSET.locomotion.Run) < .00001, "measured Run stride must track the observed 3 units/s displacement");
  for (let i = 1; i < 30; i++) actor.update(frame(i * .09));
  assert.equal(actor.clip, "Run");
  const bones = skins(actor.root)[0].skeleton.bones;
  const previous = bones.map(bone => bone.quaternion.clone());
  actor.update(frame(29 * .09, 0, 1 / 60, true));
  assert.equal(actor.clip, "Death");
  for (let i = 0; i < bones.length; i++) {
    assert.ok(bones[i].quaternion.toArray().every(Number.isFinite));
    assert.ok(previous[i].angleTo(bones[i].quaternion) < 1, `${bones[i].name}: immediate transition snapped by ≥1 radian`);
  }
  for (let i = 0; i < 120; i++) actor.update(frame(29 * .09, 0, 1 / 60, true));
  assert.equal(actor.clip, "Death");
  actor.update(frame(29 * .09));
  assert.equal(actor.clip, "Recover");
  actor.dispose();
});

test("locomotion follows actual displacement, stops at walls and ignores teleports/reconnection gaps", () => {
  const motion = new CharacterMotion();
  assert.equal(motion.update(frame(0, 0)), "Idle");
  assert.equal(motion.update(frame(.02, 0)), "Walk");
  assert.equal(motion.update(frame(.11, 0)), "Run");
  for (let i = 0; i < 20; i++) assert.equal(motion.update(frame(.11, 0)), "Idle", "held input against a wall does not move the observed position");
  assert.equal(motion.update(frame(30, 30)), "Idle", "teleport must not create a run burst");
  motion.resetPosition();
  assert.equal(motion.update(frame(-20, -20)), "Idle", "new snapshot is a new baseline");
  assert.equal(motion.update(frame(-19.98, -20)), "Walk");
  assert.equal(motion.update(frame(-19, -20, 5)), "Idle", "suspended-tab dt must not create a run burst");
  motion.event("attack");
  assert.equal(motion.update(frame(-19, -20, 5)), "Idle", "a suspended tab must not replay an expired action");
});

test("death, hit, cast cancellation and respawn have bounded priorities without requiring particles", () => {
  const motion = new CharacterMotion({ Attack: .4, Hit: .15, Recover: .3 });
  motion.update(frame());
  motion.event("attack"); assert.equal(motion.update(frame()), "Attack");
  assert.equal(motion.update(frame(0, 0, 1 / 60, false, true)), "Cast");
  motion.event("hit"); assert.equal(motion.update(frame(0, 0, 1 / 60, false, true)), "Hit");
  assert.equal(motion.update(frame(0, 0, 1 / 60, true, true)), "Death");
  motion.event("attack"); motion.event("hit");
  assert.equal(motion.update(frame(0, 0, 1 / 60, true, true)), "Death");
  assert.equal(motion.update(frame(0, 0, 1 / 60, false, false)), "Recover");
  for (let i = 0; i < 30; i++) motion.update(frame());
  assert.equal(motion.clip, "Idle", "death must not retain stale queued attacks/hits");
  assert.equal(motion.update(frame(0, 0, 1 / 60, false, true)), "Cast");
  assert.equal(motion.update(frame()), "Idle", "server cancellation immediately releases visual cast");
  motion.event("attack");
  for (let i = 0; i < 60; i++) motion.update(frame());
  assert.equal(motion.clip, "Idle", "one-shot action cannot remain stuck");
  motion.event("attack");
  assert.equal(motion.update(frame()), "Attack");
  assert.equal(motion.update(frame(0, 0, 1 / 60, false, true)), "Cast");
  assert.equal(motion.update(frame()), "Idle", "canceled casting must not resume an older interrupted attack");
});

test("experimental model is opt-in and restricted to the approved race/class without touching appearance", () => {
  assert.equal(usesExperimentalCharacter("?character=naquiro-male", "naquiros", "errante"), true);
  for (const race of ["valdarios", "kordranios", "eluvios", "naquiros"])
    for (const klass of ["sentinela", "arcanista", "errante", "ressonante"])
      assert.equal(usesExperimentalCharacter("?character=naquiro-male", race, klass), race === "naquiros" && klass === "errante");
  assert.equal(usesExperimentalCharacter("", "naquiros", "errante"), false);
  assert.equal(usesExperimentalCharacter("?character=other", "naquiros", "errante"), false);
  assert.equal(usesExperimentalCharacter("?appearance=1", "naquiros", "errante"), false);
});
