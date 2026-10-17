import { Group, Mesh, type Object3D } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/** Original, distributable source assets. No external host or undocumented
 * art download. The procedural object remains usable on network/parse failure. */
export const ART_ASSETS = {
  resonator: {
    id: "EDF-RESONATOR-001",
    url: "/art/resonator.gltf",
    author: "Ecos dos Faróis / original procedural production in Codex",
    provenance: "/art/PROVENANCE.json",
    status: "provisional" as const,
  },
};
export function assetSlot(fallback: Object3D, url = ART_ASSETS.resonator.url) {
  const root = new Group();
  root.add(fallback);
  root.userData.assetState = "loading";
  root.userData.assetId = ART_ASSETS.resonator.id;
  let disposed = false;
  const loader = new GLTFLoader();
  const ready = loader.loadAsync(url).then(
    (gltf) => {
      if (disposed) { disposeAsset(gltf.scene); return; }
      // Do not replace fallback until parsing and validation have succeeded.
      let meshes = 0;
      gltf.scene.traverse((o) => {
        if (o instanceof Mesh) { meshes++; o.castShadow = o.receiveShadow = true; }
      });
      if (!meshes) throw new Error("Asset contains no renderable mesh");
      root.remove(fallback);
      disposeAsset(fallback);
      root.add(gltf.scene);
      root.userData.assetState = "loaded";
    },
  ).catch(() => {
    if (!disposed) {
      root.userData.assetState = "fallback";
      console.warn("EDF art: local resonator unavailable; procedural fallback retained.");
    }
  });
  return {
    root, ready,
    dispose() {
      disposed = true;
      disposeAsset(root);
      root.clear();
    },
  };
}
function disposeAsset(root: Object3D) {
  root.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    o.geometry.dispose();
    for (const material of Array.isArray(o.material) ? o.material : [o.material]) material.dispose();
  });
}
