import * as T from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";

export const CHARACTER_ASSET = {
  id: "EDF-NAQUIRO-MALE-001",
  url: "/art/characters/naquiro/naquiro-male.gltf",
  clips: ["Idle", "Walk", "Run", "Jump", "Land", "Attack", "Cast", "Hit", "Death", "Recover", "Swim"] as const,
  experimental: true,
  budgets: { triangles: 30_000, materials: 6, bones: 80 },
  // Authored foot-contact displacement per second; updated with the rig export.
  locomotion: { Walk: .967752426531497, Run: 3.0000324547290798 },
};
export type CharacterClip = (typeof CHARACTER_ASSET.clips)[number];
export type CharacterStats = {
  meshes: number; skinnedMeshes: number; triangles: number; bones: number;
  materials: number; textures: number; clips: number;
};

/** Reject incomplete exports before hiding the existing, functional character. */
export function validateCharacterAsset(gltf: GLTF): CharacterStats {
  const stats: CharacterStats = { meshes: 0, skinnedMeshes: 0, triangles: 0, bones: 0, materials: 0, textures: 0, clips: gltf.animations.length };
  const bones = new Set<T.Bone>(), materials = new Set<T.Material>(), textures = new Set<T.Texture>();
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(o => {
    if (!(o instanceof T.Mesh)) return;
    stats.meshes++;
    const positions = o.geometry.getAttribute("position"), uv = o.geometry.getAttribute("uv");
    if (!positions || !positions.count) throw new Error("Character has empty mesh geometry");
    if (!uv || uv.count !== positions.count) throw new Error("Character mesh is missing its UV coordinates");
    for (let i = 0; i < positions.count; i++) {
      if (![positions.getX(i), positions.getY(i), positions.getZ(i), uv.getX(i), uv.getY(i)].every(Number.isFinite))
        throw new Error("Character contains a non-finite vertex or UV coordinate");
    }
    stats.triangles += (o.geometry.index?.count ?? positions.count) / 3;
    if (o instanceof T.SkinnedMesh) {
      stats.skinnedMeshes++;
      const joints = o.geometry.getAttribute("skinIndex"), weights = o.geometry.getAttribute("skinWeight");
      if (!joints || !weights || joints.itemSize !== 4 || weights.itemSize !== 4 || joints.count !== positions.count || weights.count !== positions.count)
        throw new Error("Character skin is missing joint weights");
      for (let i = 0; i < weights.count; i++) {
        const w = [weights.getX(i), weights.getY(i), weights.getZ(i), weights.getW(i)];
        const j = [joints.getX(i), joints.getY(i), joints.getZ(i), joints.getW(i)];
        if (!w.every(v => Number.isFinite(v) && v >= 0 && v <= 1) || Math.abs(w.reduce((a, b) => a + b, 0) - 1) > .015)
          throw new Error("Character skin weights must be normalized and finite");
        if (!j.every(v => Number.isInteger(v) && v >= 0 && v < o.skeleton.bones.length))
          throw new Error("Character skin references an invalid joint");
      }
      if (o.skeleton.boneInverses.length !== o.skeleton.bones.length ||
          !o.bindMatrix.elements.every(Number.isFinite) ||
          !o.skeleton.boneInverses.every(m => m.elements.every(Number.isFinite)))
        throw new Error("Character has invalid bone bindings");
      o.skeleton.bones.forEach(b => bones.add(b));
    }
    for (const mat of Array.isArray(o.material) ? o.material : [o.material]) {
      materials.add(mat);
      for (const value of Object.values(mat)) if (value instanceof T.Texture) textures.add(value);
    }
  });
  if (!stats.skinnedMeshes || bones.size < 15) throw new Error("Character requires a skinned mesh with a deforming humanoid skeleton");
  for (const name of CHARACTER_ASSET.clips) {
    const clip = gltf.animations.find(a => a.name === name);
    if (!clip || !clip.tracks.length || !Number.isFinite(clip.duration) || clip.duration <= 0)
      throw new Error(`Character animation missing or empty: ${name}`);
    for (const track of clip.tracks) {
      const times = Array.from(track.times);
      if (!times.length || !track.values.length || !Array.from(track.values).every(Number.isFinite) ||
          !times.every((v, i) => Number.isFinite(v) && v >= 0 && (i === 0 || v > times[i - 1])))
        throw new Error(`Invalid animation track in ${name}`);
    }
  }
  stats.bones = bones.size; stats.materials = materials.size; stats.textures = textures.size;
  if (stats.triangles > CHARACTER_ASSET.budgets.triangles || stats.materials > CHARACTER_ASSET.budgets.materials || stats.bones > CHARACTER_ASSET.budgets.bones)
    throw new Error(`Character exceeds approved geometry/material/skeleton budget (${stats.triangles} triangles, ${stats.materials} materials, ${stats.bones} bones)`);
  return stats;
}

/** Geometry/material/texture ownership belongs to the cache, never an instance. */
function disposeTemplate(gltf: GLTF) {
  const geometries = new Set<T.BufferGeometry>(), materials = new Set<T.Material>(), textures = new Set<T.Texture>(), skeletons = new Set<T.Skeleton>();
  gltf.scene.traverse(o => {
    if (!(o instanceof T.Mesh)) return;
    geometries.add(o.geometry);
    if (o instanceof T.SkinnedMesh) skeletons.add(o.skeleton);
    for (const mat of Array.isArray(o.material) ? o.material : [o.material]) {
      materials.add(mat);
      for (const value of Object.values(mat)) if (value instanceof T.Texture) textures.add(value);
    }
  });
  skeletons.forEach(s => s.dispose());
  // GLTFLoader may decode texture images as ImageBitmap. Texture.dispose()
  // releases GPU resources but does not close those CPU-backed image handles.
  // Different texture slots can share one decoded image, so close it once,
  // only when the cache's last lease has released the template.
  const images = new Set<{ close(): void }>();
  for (const texture of textures) {
    const data: unknown = texture.source.data;
    for (const image of Array.isArray(data) ? data : [data])
      if (image && typeof image.close === "function") images.add(image);
    texture.dispose();
  }
  images.forEach(image => image.close());
  materials.forEach(m => m.dispose());
  geometries.forEach(g => g.dispose());
}
type Entry = { references: number; ready: Promise<GLTF>; asset?: GLTF };
export class CharacterAssetCache {
  private entry?: Entry;
  private loads = 0;
  constructor(private readonly loader: () => Promise<GLTF> = () => new GLTFLoader().loadAsync(CHARACTER_ASSET.url)) {}
  acquire() {
    let entry = this.entry;
    if (!entry) {
      this.loads++;
      entry = { references: 0, ready: Promise.resolve(null as unknown as GLTF) };
      this.entry = entry;
      const created = entry;
      created.ready = Promise.resolve().then(() => this.loader()).then(gltf => {
        try { validateCharacterAsset(gltf); }
        catch (error) { disposeTemplate(gltf); throw error; }
        created.asset = gltf;
        if (!created.references) { disposeTemplate(gltf); created.asset = undefined; }
        return gltf;
      });
    }
    entry.references++;
    let released = false;
    const held = entry;
    return {
      ready: held.ready,
      release: () => {
        if (released) return;
        released = true;
        held.references--;
        if (!held.references) {
          if (held.asset) { disposeTemplate(held.asset); held.asset = undefined; }
          if (this.entry === held) this.entry = undefined;
        }
      },
    };
  }
  diagnostics() {
    return { references: this.entry?.references ?? 0, loads: this.loads, loaded: !!this.entry?.asset };
  }
}
export const characterAssetCache = new CharacterAssetCache();
