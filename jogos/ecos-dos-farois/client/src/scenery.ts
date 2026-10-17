import * as T from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { HOUSES, NPC, seeded, SHRINE, TREES } from "../../shared/config.js";
import { FACTION_NPCS, FRAGMENTS, terrainHeight } from "../../shared/alpha.js";
import type { FactionId } from "../../shared/identity.js";
import { box, material, mesh, nameplate, warrior } from "./models.js";
import { assetSlot } from "./render-assets.js";
import { CRAFT_STATION } from "../../shared/extended.js";
function connect(
  a: T.Vector3,
  b: T.Vector3,
  r: number,
  mat: T.Material,
  g: T.Object3D,
) {
  const d = b.clone().sub(a);
  const m = mesh(
    new T.CylinderGeometry(r * 0.7, r, d.length(), 7),
    mat,
    0,
    0,
    0,
    g,
  );
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
  return m;
}
function batch(g: T.Group) {
  g.updateMatrixWorld(true);
  const groups = new Map<
    string,
    { geos: T.BufferGeometry[]; mat: T.MeshStandardMaterial; shadow: boolean }
  >();
  const remove: T.Mesh[] = [];
  g.traverse((o) => {
    if (
      !(o instanceof T.Mesh) ||
      !(o.material instanceof T.MeshStandardMaterial) ||
      o.material.transparent
    )
      return;
    const m = o.material,
      key = [
        m.roughness,
        m.metalness,
        m.emissive.getHex(),
        m.emissiveIntensity,
        m.side,
        o.castShadow,
      ].join("_");
    let group = groups.get(key);
    if (!group) {
      const mat = new T.MeshStandardMaterial({
        vertexColors: true,
        roughness: m.roughness,
        metalness: m.metalness,
        emissive: m.emissive,
        emissiveIntensity: m.emissiveIntensity,
        side: m.side,
      });
      group = { geos: [], mat, shadow: o.castShadow };
      groups.set(key, group);
    }
    let geom = o.geometry.clone();
    if (geom.index) geom = geom.toNonIndexed();
    geom.applyMatrix4(o.matrixWorld);
    geom.deleteAttribute("uv");
    const pos = geom.attributes.position,
      existing = geom.getAttribute("color"),
      c: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      c.push(
        m.color.r * (existing ? existing.getX(i) : 1),
        m.color.g * (existing ? existing.getY(i) : 1),
        m.color.b * (existing ? existing.getZ(i) : 1),
      );
    }
    geom.setAttribute("color", new T.Float32BufferAttribute(c, 3));
    group.geos.push(geom);
    remove.push(o);
  });
  for (const o of remove) o.removeFromParent();
  for (const { geos, mat, shadow } of groups.values()) {
    const merged = mergeGeometries(geos, false);
    if (merged) {
      const m = mesh(merged, mat, 0, 0, 0, g);
      m.castShadow = shadow;
    }
    geos.forEach((x) => x.dispose());
  }
}
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!,
    r = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, "rgba(255,255,255,.8)");
  r.addColorStop(0.15, "rgba(255,255,255,.3)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = r;
  ctx.fillRect(0, 0, 128, 128);
  return new T.CanvasTexture(c);
}
export function scenery(scene: T.Scene, faction: FactionId = "vigilia") {
  const root = new T.Group(),
    statics = new T.Group(),
    dynamic = new T.Group();
  root.add(statics, dynamic);
  scene.add(root);
  const confl = faction === "confluencia",
    random = seeded(479),
    palette = {
      grass: confl ? 0x416c65 : 0x65815a,
      forest: confl ? 0x345d65 : 0x3f6758,
      stone: confl ? 0x929fa8 : 0xb0ad99,
      roof: confl ? 0x514c70 : 0x2b4f61,
      leaves: confl
        ? [0x8783af, 0x6f8f9a, 0x7b7599]
        : [0x4d795a, 0x71956a, 0x9aab74],
      gold: confl ? 0xbd9a7c : 0xc4a365,
    };
  const stone = material(palette.stone),
    gold = material(palette.gold, 0.42),
    wood = material(0x554b40),
    roofMat = material(palette.roof),
    dark = material(0x35444a);
  const terrain = new T.PlaneGeometry(160, 160, 110, 110);
  terrain.rotateX(-Math.PI / 2);
  const colors: number[] = [],
    pos = terrain.attributes.position,
    c = new T.Color(),
    grass = new T.Color(palette.grass),
    forest = new T.Color(palette.forest),
    path = new T.Color(confl ? 0x9caba3 : 0xb5a78c);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      z = pos.getZ(i);
    pos.setY(i, terrainHeight(x, z) - 0.055);
    c.copy(grass).lerp(forest, T.MathUtils.clamp((-z + 5) / 60, 0, 1));
    const trail = Math.max(
      1 - T.MathUtils.smoothstep(Math.abs(x), 1.5, 3.8),
      z > 4
        ? 1 - T.MathUtils.smoothstep(Math.hypot(x * 0.9, (z - 19) * 0.8), 7, 13)
        : 0,
      Math.abs(z - 15) < 1.7 && Math.abs(x) < 28 ? 1 - Math.abs(z - 15) / 2 : 0,
    );
    c.lerp(path, Math.max(0, Math.min(1, trail)) * 0.92).multiplyScalar(
      0.93 + random() * 0.13,
    );
    colors.push(c.r, c.g, c.b);
  }
  terrain.setAttribute("color", new T.Float32BufferAttribute(colors, 3));
  terrain.computeVertexNormals();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#d1d1c4";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 8500; i++) {
    const x = random() * 256,
      y = random() * 256,
      l = 120 + Math.floor(random() * 90);
    ctx.strokeStyle = "rgba(" + l + "," + l + "," + (l - 7) + ",.18)";
    ctx.lineWidth = 0.5 + random() * 1.3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + random() * 4 - 2, y + random() * 5 - 2);
    ctx.stroke();
  }
  const groundTexture = new T.CanvasTexture(canvas);
  groundTexture.wrapS = groundTexture.wrapT = T.RepeatWrapping;
  groundTexture.repeat.set(36, 36);
  groundTexture.colorSpace = T.SRGBColorSpace;
  groundTexture.anisotropy = 4;
  const ground = mesh(
    terrain,
    new T.MeshStandardMaterial({
      vertexColors: true,
      roughness: 1,
      map: groundTexture,
      bumpMap: groundTexture,
      bumpScale: 0.08,
    }),
    0,
    0,
    0,
    root,
  );
  ground.castShadow = false;
  // Arcane inlay and segmented paving make the starting courtyard read as
  // inhabited architecture; all pieces are batched with the static scenery.
  const paving = material(confl ? 0x7f9397 : 0xa09b82);
  for (let i = 0; i < 44; i++) {
    const angle = i * Math.PI * 2 / 44;
    const slab = box(0.78, 0.09, 1.3, paving,
      Math.sin(angle) * 6, 0.015, 24 + Math.cos(angle) * 6, statics);
    slab.rotation.y = angle;
  }
  for (const radius of [4.8, 6.8]) {
    const inlay = mesh(new T.TorusGeometry(radius, 0.032, 4, 96), gold,
      0, 0.055, 24, statics);
    inlay.rotation.x = Math.PI / 2; inlay.castShadow = false;
  }
  for (let i = 0; i < 700; i++) {
    const x = (random() - 0.5) * 80,
      z = random() * 74 - 43;
    if (Math.abs(x) > 2.25 || (z > 5 && z < 29)) continue;
    const cobble = mesh(
      new T.CylinderGeometry(0.15 + random() * 0.17, 0.22, 0.05, 6),
      material(0xa49e88),
      x,
      terrainHeight(x, z) + 0.01,
      z,
      statics,
    );
    cobble.scale.z = 0.65;
    cobble.rotation.y = random() * 6;
  }
  const glass = new T.MeshStandardMaterial({
    color: 0xffd8a0,
    emissive: 0xc58d4f,
    emissiveIntensity: 0.36,
    roughness: 0.5,
  });
  for (const h of HOUSES) {
    const g = new T.Group();
    g.position.set(h.x, 0, h.z);
    statics.add(g);
    const walls = material(confl ? 0xa6afb1 : 0xc5bba3);
    const surround = new T.Shape();
    surround.moveTo(-.86, 0); surround.lineTo(-.86, 1.63);
    surround.quadraticCurveTo(-.86, 2.6, 0, 2.74);
    surround.quadraticCurveTo(.86, 2.6, .86, 1.63); surround.lineTo(.86, 0);
    surround.lineTo(.62, 0); surround.lineTo(.62, 1.63);
    surround.quadraticCurveTo(.62, 2.34, 0, 2.48);
    surround.quadraticCurveTo(-.62, 2.34, -.62, 1.63);
    surround.lineTo(-.62, 0); surround.closePath();
    mesh(new T.ExtrudeGeometry(surround, {depth: .13, bevelEnabled: true,
      bevelSize: .035, bevelThickness: .025, bevelSegments: 1}), stone,
      0, .27, h.d / 2 + .14, g);
    for (let y = .6; y < 3.5; y += .56) {
      box(h.w + .04, .035, h.d + .04, material(confl ? 0x919fa4 : 0xaea68f), 0, y, 0, g);
    }
    box(h.w + 0.35, 0.44, h.d + 0.35, stone, 0, 0.22, 0, g);
    box(h.w, 3.35, h.d, walls, 0, 1.9, 0, g);
    for (const x of [-h.w / 2, h.w / 2])
      for (const z of [-h.d / 2, h.d / 2])
        box(0.25, 3.5, 0.25, wood, x, 1.95, z, g);
    box(h.w + 0.25, 0.16, h.d + 0.25, wood, 0, 3.56, 0, g);
    const shape = new T.Shape();
    shape.moveTo(-h.w / 2 - 0.55, 0);
    shape.quadraticCurveTo(-h.w * 0.22, 0.9, 0, 2.35);
    shape.quadraticCurveTo(h.w * 0.22, 0.9, h.w / 2 + 0.55, 0);
    shape.closePath();
    mesh(
      new T.ExtrudeGeometry(shape, { depth: h.d + 0.9, bevelEnabled: false }),
      roofMat,
      0,
      3.64,
      -h.d / 2 - 0.45,
      g,
    );
    for (const side of [-1, 1]) {
      const edge = connect(
        new T.Vector3(0, 5.99, h.d / 2 + 0.5),
        new T.Vector3(side * (h.w / 2 + 0.6), 3.65, h.d / 2 + 0.5),
        0.07,
        gold,
        g,
      );
      for (let j = 0; j < 5; j++) {
        const rib = connect(
          new T.Vector3(side * 0.15, 5.9, -h.d / 2 + j * (h.d / 4)),
          new T.Vector3(side * (h.w / 2 + 0.45), 3.7, -h.d / 2 + j * (h.d / 4)),
          0.022,
          material(confl ? 0x8b829e : 0x66808b),
          g,
        );
      }
    }
    const doorway = mesh(
      new T.CylinderGeometry(0.64, 0.64, 2.1, 12, 1, false, 0, Math.PI),
      wood,
      0,
      1.38,
      h.d / 2 + 0.02,
      g,
    );
    doorway.rotation.z = Math.PI / 2;
    doorway.rotation.x = Math.PI / 2;
    box(1.22, 2.05, 0.1, wood, 0, 1.28, h.d / 2 + 0.1, g);
    for (const x of [-h.w * 0.3, h.w * 0.3]) {
      box(1.05, 1.15, 0.13, wood, x, 2.15, h.d / 2 + 0.08, g);
      box(0.77, 0.9, 0.15, glass, x, 2.15, h.d / 2 + 0.13, g);
      box(0.065, 0.95, 0.18, wood, x, 2.15, h.d / 2 + 0.16, g);
      box(0.82, 0.06, 0.18, wood, x, 2.15, h.d / 2 + 0.17, g);
      box(1.25, 0.2, 0.4, wood, x, 1.5, h.d / 2 + 0.25, g);
      for (let i = 0; i < 4; i++)
        mesh(
          new T.IcosahedronGeometry(0.13),
          material(palette.leaves[(i + 1) % 3]),
          x - 0.4 + i * 0.25,
          1.65,
          h.d / 2 + 0.3,
          g,
        );
    }
    for (let i = 0; i < 3; i++)
      box(
        1.65,
        0.15,
        0.6,
        stone,
        0,
        0.08 + i * 0.1,
        h.d / 2 + 0.4 + (2 - i) * 0.35,
        g,
      );
    box(0.7, 2.3, 0.7, stone, h.w * 0.26, 4.8, -h.d * 0.2, g);
    box(0.95, 0.18, 0.95, wood, h.w * 0.26, 5.9, -h.d * 0.2, g);
    const canopy = mesh(
      new T.PlaneGeometry(2.1, 1.35),
      new T.MeshStandardMaterial({
        color: confl ? 0x777b99 : 0xb99c6b,
        side: T.DoubleSide,
      }),
      0,
      2.7,
      h.d / 2 + 0.7,
      g,
    );
    canopy.rotation.x = -0.9;
    for (const side of [-1, 1]) {
      const post = box(.18, 3.1, .18, wood,
        side * 1.05, 1.55, h.d / 2 + 1.22, g);
      const lamp = mesh(new T.CylinderGeometry(.15, .2, .34, 6), glass,
        side * (h.w / 2 - .25), 2.9, h.d / 2 + .28, g);
      mesh(new T.ConeGeometry(.25,.18,6), gold, lamp.position.x, 3.13, lamp.position.z, g);
    }
  }
  // Bosque: copas esculpidas, variação de escala e raízes no mesmo terreno do jogador.
  const leafGeo = new T.SphereGeometry(1, 8, 6);
  const lp = leafGeo.attributes.position;
  for (let i = 0; i < lp.count; i++) {
    const n =
      1 +
      0.13 *
        Math.sin(lp.getX(i) * 14 + lp.getY(i) * 9) *
        Math.cos(lp.getZ(i) * 11);
    lp.setXYZ(i, lp.getX(i) * n, lp.getY(i) * n, lp.getZ(i) * n);
  }
  leafGeo.computeVertexNormals();
  const extra = Array.from({ length: 45 }, () => ({
    x: (random() - 0.5) * 132,
    z: -52 - random() * 26,
    scale: 1.1 + random(),
    type: 0,
  }));
  for (const [i, t] of [...TREES, ...extra].entries()) {
    const y = terrainHeight(t.x, t.z),
      s = t.scale * (t.z < 0 ? 1.35 : 1.1),
      g = new T.Group();
    g.position.set(t.x, y, t.z);
    statics.add(g);
    const trunk = mesh(
      new T.CylinderGeometry(0.18 * s, 0.39 * s, 4.3 * s, 7),
      wood,
      0,
      2.1 * s,
      0,
      g,
    );
    trunk.rotation.z = Math.sin(i) * 0.055;
    for (let j = 0; j < 3; j++) {
      const a = (j / 3) * Math.PI * 2 + i;
      connect(
        new T.Vector3(0, 2.4 * s, 0),
        new T.Vector3(Math.cos(a) * 1.5 * s, 4.2 * s, Math.sin(a) * 1.4 * s),
        0.13 * s,
        wood,
        g,
      );
      const crown = mesh(
        leafGeo,
        material(palette.leaves[(i + j) % 3]),
        Math.cos(a) * 1.2 * s,
        (4.8 + (j % 2) * 0.5) * s,
        Math.sin(a) * 1.15 * s,
        g,
      );
      crown.scale.set(2.15 * s, 1.35 * s, 1.9 * s);
      crown.castShadow = false;
      // Drooping secondary masses break the three-sphere canopy silhouette.
      const tuft = mesh(new T.IcosahedronGeometry(1,0), material(palette.leaves[(i + j + 1) % 3]),
        Math.cos(a + .7) * 2.3 * s, 4.2 * s, Math.sin(a + .7) * 2.1 * s, g);
      tuft.scale.set(.98 * s, .76 * s, .92 * s); tuft.castShadow = false;
    }
    if (i % 2 === 0)
      connect(
        new T.Vector3(0, 0.4, 0),
        new T.Vector3(0.8 * s, 0.02, 0.4 * s),
        0.16 * s,
        wood,
        g,
      );
  }
  const blade = new T.Shape();
  blade.moveTo(-.045,0); blade.quadraticCurveTo(-.075,.24,.035,.45);
  blade.quadraticCurveTo(.015,.16,.045,0); blade.closePath();
  const bladeGeometry = new T.ShapeGeometry(blade);
  const bladeMat = new T.MeshStandardMaterial({color: confl ? 0x81a19a : 0x87945d,
    roughness: .98, side: T.DoubleSide});
  const dummy = new T.Object3D(),
    grassMesh = new T.InstancedMesh(
      bladeGeometry,
      bladeMat,
      2200,
    );
  let gi = 0;
  while (gi < 2200) {
    const x = random() * 88 - 44,
      z = random() * 81 - 44;
    if (Math.abs(x) < 3.5 || (z > 0 && Math.abs(x) < 30)) continue;
    dummy.position.set(x, terrainHeight(x, z) + 0.12, z);
    dummy.rotation.set(0, random() * 6, Math.sin(gi) * 0.2);
    dummy.scale.set(0.9, 0.6 + random() * 0.8, 0.9);
    dummy.updateMatrix();
    grassMesh.setMatrixAt(gi++, dummy.matrix);
  }
  grassMesh.castShadow = false; grassMesh.receiveShadow = true;
  root.add(grassMesh);
  const flowerMesh = new T.InstancedMesh(
    new T.IcosahedronGeometry(0.09),
    material(0xe2cfab),
    380,
  );
  for (let i = 0; i < 380; i++) {
    const x = (random() - 0.5) * 75,
      z = -random() * 41;
    dummy.position.set(x, terrainHeight(x, z) + 0.26, z);
    dummy.scale.setScalar(0.7 + random());
    dummy.updateMatrix();
    flowerMesh.setMatrixAt(i, dummy.matrix);
    flowerMesh.setColorAt(
      i,
      new T.Color([0xb5a5cc, 0xe5cea3, 0x9fcec5][i % 3]),
    );
  }
  root.add(flowerMesh);
  // Rochas e silhuetas de montanha com cristas irregulares, sem assets externos.
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2,
      x = Math.cos(a) * (100 + random() * 30),
      z = Math.sin(a) * 105 - 15,
      h = 15 + random() * 29;
    const geometry = new T.ConeGeometry(15 + random() * 12, h, 7, 4),
      p = geometry.attributes.position;
    for (let j = 0; j < p.count; j++) {
      const y = p.getY(j);
      p.setX(j, p.getX(j) * (1 + 0.12 * Math.sin(j * 1.31)));
      p.setZ(j, p.getZ(j) * (1 + 0.1 * Math.cos(j * 0.71)));
      if (y > 0) p.setY(j, y + Math.sin(j * 2.4) * 2);
    }
    geometry.computeVertexNormals();
    mesh(
      geometry,
      material(confl ? 0x65768c : 0x667f87),
      x,
      h / 2 - 2,
      z,
      statics,
    );
    if (i % 3 === 0)
      mesh(
        new T.ConeGeometry(4, h * 0.22, 7),
        material(0xc9d3cf),
        x,
        h * 0.88 - 2,
        z,
        statics,
      );
  }
  for (let i = 0; i < 32; i++) {
    const x = (i % 2 ? 1 : -1) * (35 + random() * 15),
      z = -47 + random() * 78,
      r = 0.6 + random() * 2;
    const rock = mesh(
      new T.DodecahedronGeometry(r, 0),
      material(i % 2 ? 0x7d8a86 : 0x69787e),
      x,
      terrainHeight(x, z) + r * 0.4,
      z,
      statics,
    );
    rock.scale.set(1, 0.7, 1.3);
    rock.rotation.y = random() * 5;
  }
  // Água e queda ao lado da região; o relevo mantém o leito fora dos caminhos.
  const water = new T.MeshStandardMaterial({
    color: confl ? 0x4e9ca2 : 0x509aaf,
    transparent: true,
    opacity: 0.78,
    roughness: 0.25,
    metalness: 0.25,
  });
  const river = mesh(
    new T.PlaneGeometry(8, 114, 10, 30),
    water,
    48,
    0.05,
    -15,
    dynamic,
  );
  river.rotation.x = -Math.PI / 2;
  river.castShadow = false;
  const fall = mesh(
    new T.PlaneGeometry(5, 12, 8, 20),
    new T.MeshBasicMaterial({
      color: 0xa9dfe3,
      transparent: true,
      opacity: 0.65,
      side: T.DoubleSide,
    }),
    48,
    6,
    -46,
    dynamic,
  );
  const fallsP = fall.geometry.attributes.position;
  for (let i = 0; i < fallsP.count; i++)
    fallsP.setZ(i, Math.sin(fallsP.getX(i) * 2) * 0.15);
  mesh(new T.DodecahedronGeometry(6), stone, 48, 10, -49, statics).scale.set(
    1.4,
    0.8,
    1,
  );
  for (let i = 0; i < 8; i++) {
    const r = mesh(
      new T.TorusGeometry(0.8 + i * 0.25, 0.018, 4, 32),
      new T.MeshBasicMaterial({
        color: 0xbedfdf,
        transparent: true,
        opacity: 0.2,
      }),
      48,
      0.09 + i * 0.001,
      -42,
      dynamic,
    );
    r.rotation.x = Math.PI / 2;
    r.scale.y = 0.65;
  }
  // Arquitetura distante: a vila é um posto avançado, não uma capital completa.
  for (const side of [-1, 1]) {
    const tower = new T.Group();
    tower.position.set(side * 51, 0, 30);
    statics.add(tower);
    mesh(new T.CylinderGeometry(2.7, 3.4, 12, 8), stone, 0, 6, 0, tower);
    mesh(new T.CylinderGeometry(3.1, 2.8, 0.8, 8), gold, 0, 11.9, 0, tower);
    mesh(new T.ConeGeometry(3.6, 7, 8), roofMat, 0, 15.7, 0, tower);
    mesh(new T.OctahedronGeometry(0.45), gold, 0, 19.5, 0, tower);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      box(
        0.38,
        1.6,
        0.25,
        dark,
        Math.sin(a) * 2.75,
        9,
        Math.cos(a) * 2.75,
        tower,
      );
    }
  }
  const shrine = new T.Group();
  shrine.position.set(SHRINE.x, 0, SHRINE.z);
  statics.add(shrine);
  mesh(new T.CylinderGeometry(2.2, 2.45, 0.3, 12), stone, 0, 0.15, 0, shrine);
  mesh(new T.CylinderGeometry(1.9, 2.1, 0.35, 12), gold, 0, 0.46, 0, shrine);
  mesh(new T.CylinderGeometry(1.15, 1.5, 3.5, 8), stone, 0, 2.35, 0, shrine);
  mesh(new T.CylinderGeometry(1.5, 1.16, 0.4, 8), gold, 0, 4.25, 0, shrine);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const pillar = mesh(
      new T.CylinderGeometry(0.2, 0.32, 4.5, 5),
      stone,
      Math.sin(a) * 1.3,
      5.8,
      Math.cos(a) * 1.3,
      shrine,
    );
    pillar.rotation.z = Math.cos(a) * 0.13;
    pillar.rotation.x = -Math.sin(a) * 0.13;
    mesh(
      new T.OctahedronGeometry(0.22),
      gold,
      Math.sin(a) * 1.13,
      8,
      Math.cos(a) * 1.13,
      shrine,
    );
  }
  // Recessed ribs, braces and conductors provide a focal silhouette without
  // turning the whole landmark into an emissive surface.
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    for (let course = 0; course < 5; course++) {
      const rib = box(.23, .55, .13, material(course % 2 ? 0x8d9da0 : palette.stone),
        Math.sin(a) * 1.39, .85 + course * .68, Math.cos(a) * 1.39, shrine);
      rib.rotation.y = a;
    }
    const brace = connect(new T.Vector3(Math.sin(a)*2.1,.48,Math.cos(a)*2.1),
      new T.Vector3(Math.sin(a)*1.25,2.2,Math.cos(a)*1.25), .085, gold, shrine);
    const channel = box(.048, 2.75, .06, gold, Math.sin(a)*1.43,
      2.1, Math.cos(a)*1.43, shrine); channel.rotation.y = a;
  }
  const crystalMat = new T.MeshStandardMaterial({
    color: 0x85d6df,
    emissive: 0x4c9dbb,
    emissiveIntensity: 1.6,
    roughness: 0.24,
    metalness: 0.25,
  });
  const crystal = mesh(
    new T.OctahedronGeometry(0.96, 0),
    crystalMat,
    SHRINE.x,
    6.1,
    SHRINE.z,
    dynamic,
  );
  crystal.scale.set(0.85, 1.75, 0.85);
  const rings: T.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const r = mesh(
      new T.TorusGeometry(1.5 + i * 0.17, 0.045, 6, 56),
      gold,
      SHRINE.x,
      6.1,
      SHRINE.z,
      dynamic,
    );
    r.rotation.x = 0.5 + i * 0.65;
    r.rotation.y = i * 0.7;
    rings.push(r);
  }
  const halo = new T.Sprite(
    new T.SpriteMaterial({
      map: glowTexture(),
      color: 0x76c6d4,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  halo.position.set(SHRINE.x, 6.1, SHRINE.z);
  halo.scale.setScalar(8);
  dynamic.add(halo);
  const beaconLight = new T.PointLight(0x76c8e1, 12, 18, 2);
  beaconLight.position.set(SHRINE.x, 6, SHRINE.z);
  dynamic.add(beaconLight);
  const fragments = new Map<string, T.Group>();
  for (const f of FRAGMENTS) {
    const group = new T.Group();
    group.position.set(f.x, terrainHeight(f.x, f.z), f.z);
    group.userData = { kind: "fragment", id: f.id };
    dynamic.add(group);
    mesh(new T.CylinderGeometry(0.55, 0.75, 0.3, 7), stone, 0, 0.15, 0, group);
    const gem = mesh(
      new T.OctahedronGeometry(0.32),
      crystalMat,
      0,
      1,
      0,
      group,
    );
    gem.scale.y = 1.6;
    const ring = mesh(
      new T.TorusGeometry(0.65, 0.02, 4, 32),
      gold,
      0,
      0.2,
      0,
      group,
    );
    ring.rotation.x = Math.PI / 2;
    fragments.set(f.id, group);
  }
  // One original interchange asset exercises a real local glTF loading path.
  const lensFallback = new T.Group();
  mesh(new T.OctahedronGeometry(.65), crystalMat.clone(), 0, 0, 0, lensFallback).scale.y = 1.55;
  const lens = assetSlot(lensFallback);
  lens.root.position.set(0, 5.6, 36);
  dynamic.add(lens.root);
  const gateway = new T.Group(); gateway.position.set(0,0,36); statics.add(gateway);
  for (const side of [-1,1]) {
    mesh(new T.CylinderGeometry(.3,.55,4.8,8),stone,side*3.1,2.4,0,gateway);
    mesh(new T.ConeGeometry(.62,1.3,8),roofMat,side*3.1,5.4,0,gateway);
    mesh(new T.OctahedronGeometry(.23),gold,side*3.1,6.2,0,gateway);
    connect(new T.Vector3(side*3.1,4.7,0),new T.Vector3(0,6.2,0),.11,gold,gateway);
  }
  // Experimental station; geometry announces the existing server interaction.
  const station = new T.Group();
  station.position.set(CRAFT_STATION.x,terrainHeight(CRAFT_STATION.x,CRAFT_STATION.z),CRAFT_STATION.z);
  statics.add(station);
  box(1.8,.18,.88,wood,0,.95,0,station);
  for (const x of [-.7,.7]) for (const z of [-.3,.3]) box(.14,.9,.14,wood,x,.46,z,station);
  box(.72,.22,.48,dark,-.35,1.12,0,station);
  mesh(new T.CylinderGeometry(.24,.31,.25,8),gold,.45,1.16,0,station);
  const stationLabel = nameplate("Bancada · F", "#dfc58e");
  stationLabel.position.set(CRAFT_STATION.x,2.05,CRAFT_STATION.z);
  dynamic.add(stationLabel);
  const npcs = [
    warrior(
      confl ? 0x586981 : 0x315c70,
      true,
      confl ? "eluvios" : "valdarios",
      confl ? "ressonante" : "sentinela",
    ),
    warrior(
      confl ? 0x4a7380 : 0x76624e,
      true,
      confl ? "naquiros" : "kordranios",
      "errante",
    ),
    warrior(
      confl ? 0x726b88 : 0x677485,
      true,
      confl ? "eluvios" : "valdarios",
      "arcanista",
    ),
  ];
  const positions = [NPC, { x: -10, z: 18 }, { x: 6, z: 10 }];
  npcs.forEach((a, i) => {
    a.root.position.set(positions[i].x, 0, positions[i].z);
    a.root.rotation.y = i ? -0.5 : 0.4;
    a.root.userData.kind = "npc";
    a.root.userData.id = i ? "companion-" + i : "guide";
    dynamic.add(a.root);
    const n = nameplate(
      i ? FACTION_NPCS[faction].companions[i - 1] : FACTION_NPCS[faction].name,
      "#dfc58e",
    );
    n.position.y = 2.95;
    a.root.add(n);
  });
  const flags: T.Mesh[] = [];
  for (const x of [-4.3, 4.3]) {
    connect(
      new T.Vector3(x, 0, 0),
      new T.Vector3(x, 4.8, 0),
      0.075,
      wood,
      statics,
    );
    const f = mesh(
      new T.PlaneGeometry(1, 1.7, 6, 8),
      new T.MeshStandardMaterial({
        color: confl ? 0x6d628e : 0x315b78,
        roughness: 0.8,
        side: T.DoubleSide,
      }),
      x + 0.5,
      3.6,
      0,
      dynamic,
    );
    flags.push(f);
    const emblem = mesh(
      new T.OctahedronGeometry(0.13),
      gold,
      x + 0.5,
      3.6,
      0.035,
      statics,
    );
    emblem.scale.set(0.7, 1.5, 0.2);
  }
  const particles = new Float32Array(130 * 3);
  for (let i = 0; i < 130; i++) {
    particles[i * 3] = (random() - 0.5) * 68;
    particles[i * 3 + 1] = 0.7 + random() * 4;
    particles[i * 3 + 2] = -random() * 45;
  }
  const pg = new T.BufferGeometry();
  pg.setAttribute("position", new T.BufferAttribute(particles, 3));
  const motes = new T.Points(
    pg,
    new T.PointsMaterial({
      map: glowTexture(),
      color: confl ? 0xa4c1ed : 0xe2cf9a,
      size: 0.19,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  dynamic.add(motes);
  batch(statics);
  let beaconState = 2, reduced = false;
  return {
    root,
    npc: npcs[0],
    assetState: () => lens.root.userData.assetState as string,
    disposeAssets: () => lens.dispose(),
    setReducedEffects(value: boolean) {
      reduced = value;
      motes.visible = !value;
      halo.visible = !value;
      beaconLight.intensity = value ? 3 : 12;
    },
    interactive: [...npcs.map((n) => n.root), ...fragments.values()],
    setState(state: number, collected: string[] = []) {
      beaconState = state;
      for (const [id, g] of fragments) g.visible = !collected.includes(id);
    },
    animate(time: number) {
      const motionTime = reduced ? 0 : time;
      lens.root.rotation.y = motionTime * .1;
      crystal.rotation.y = motionTime * 0.28;
      crystal.position.y = 6.1 + Math.sin(motionTime * 1.2) * 0.12;
      const tint =
        beaconState === 0 ? 0x67cddd : beaconState === 1 ? 0xa3a3e0 : 0xb17fb3;
      crystalMat.color.setHex(tint);
      crystalMat.emissive.setHex(tint);
      crystalMat.emissiveIntensity =
        beaconState === 2 ? 0.7 + Math.sin(motionTime * 1.9) * (reduced ? 0 : 0.14) : 1.2;
      (halo.material as T.SpriteMaterial).color.setHex(tint);
      beaconLight.color.setHex(tint);
      rings.forEach((r, i) => {
        r.rotation.z = motionTime * (i % 2 ? 0.14 : -0.1);
        r.rotation.y =
          i * 0.7 + Math.sin(motionTime * (beaconState === 2 ? 1.1 : 0.2) + i) * 0.16;
      });
      for (const [i, g] of [...fragments.values()].entries()) {
        const gem = g.children[1];
        gem.position.y = 1 + Math.sin(time * 1.4 + i) * 0.15;
        gem.rotation.y = time * 0.45;
      }
      if (!reduced) flags.forEach((f, i) => {
        const p = f.geometry.attributes.position;
        for (let j = 0; j < p.count; j++)
          p.setZ(j, Math.sin(p.getX(j) * 4 - time * 2 + i) * 0.08);
        p.needsUpdate = true;
      });
      const rp = river.geometry.attributes.position;
      for (let i = 0; i < rp.count; i++)
        rp.setZ(
          i,
          Math.sin(time * 1.5 + rp.getX(i) * 0.8 + rp.getY(i) * 0.5) * 0.055,
        );
      rp.needsUpdate = true;
      fall.material.opacity = 0.5 + Math.sin(time * 2) * 0.07;
      motes.position.y = Math.sin(time * 0.35) * 0.22;
    },
  };
}
