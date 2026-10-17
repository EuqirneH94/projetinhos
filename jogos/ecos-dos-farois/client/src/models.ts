import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import * as T from "three";
import type { EnemyKind } from "../../shared/types.js";
import type { ClassId, RaceId } from "../../shared/identity.js";
export function material(color: T.ColorRepresentation, roughness = 0.82) {
  return new T.MeshStandardMaterial({
    color,
    roughness,
    metalness: roughness < 0.5 ? 0.3 : 0,
  });
}
export function mesh(
  geometry: T.BufferGeometry,
  mat: T.Material,
  x = 0,
  y = 0,
  z = 0,
  parent?: T.Object3D,
) {
  const m = new T.Mesh(geometry, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent?.add(m);
  return m;
}
export const box = (
  w: number,
  h: number,
  d: number,
  mat: T.Material,
  x: number,
  y: number,
  z: number,
  parent: T.Object3D,
) => mesh(new T.BoxGeometry(w, h, d), mat, x, y, z, parent);
export type Actor = {
  root: T.Group;
  body: T.Group;
  left: T.Group;
  right: T.Group;
  arm: T.Group;
  sword?: T.Mesh;
  label?: T.Sprite;
  labelKey?: string;
};
function oval(
  r: number,
  scale: [number, number, number],
  mat: T.Material,
  x: number,
  y: number,
  z: number,
  parent: T.Object3D,
) {
  const m = mesh(new T.SphereGeometry(r, 16, 12), mat, x, y, z, parent);
  m.scale.set(...scale);
  return m;
}
function limb(
  a: T.Vector3,
  b: T.Vector3,
  r1: number,
  r2: number,
  mat: T.Material,
  parent: T.Object3D,
) {
  const d = b.clone().sub(a);
  const m = mesh(
    new T.CylinderGeometry(r2, r1, d.length(), 10),
    mat,
    0,
    0,
    0,
    parent,
  );
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
  return m;
}
function batchPart(parent: T.Object3D, excluded: T.Object3D[] = []) {
  parent.updateWorldMatrix(true, true);
  const inverse = parent.matrixWorld.clone().invert();
  const groups = new Map<
      string,
      { geos: T.BufferGeometry[]; mat: T.MeshStandardMaterial }
    >(),
    remove: T.Mesh[] = [];
  function visit(o: T.Object3D) {
    if (excluded.includes(o)) return;
    if (o instanceof T.Mesh && o.material instanceof T.MeshStandardMaterial) {
      const m = o.material,
        key = [
          m.roughness,
          m.metalness,
          m.emissive.getHex(),
          m.emissiveIntensity,
          m.side,
        ].join("_");
      let group = groups.get(key);
      if (!group) {
        group = {
          geos: [],
          mat: new T.MeshStandardMaterial({
            vertexColors: true,
            roughness: m.roughness,
            metalness: m.metalness,
            emissive: m.emissive,
            emissiveIntensity: m.emissiveIntensity,
            side: m.side,
          }),
        };
        groups.set(key, group);
      }
      let g = o.geometry.clone();
      if (g.index) g = g.toNonIndexed();
      g.applyMatrix4(inverse.clone().multiply(o.matrixWorld));
      g.deleteAttribute("uv");
      const c: number[] = [];
      for (let i = 0; i < g.attributes.position.count; i++)
        c.push(m.color.r, m.color.g, m.color.b);
      g.setAttribute("color", new T.Float32BufferAttribute(c, 3));
      group.geos.push(g);
      remove.push(o);
    } else for (const child of o.children.slice()) visit(child);
  }
  for (const child of parent.children.slice()) visit(child);
  for (const o of remove) o.removeFromParent();
  for (const { geos, mat } of groups.values()) {
    const g = mergeGeometries(geos, false);
    if (g) mesh(g, mat, 0, 0, 0, parent);
    geos.forEach((x) => x.dispose());
  }
}
export function warrior(
  color = 0x2f637d,
  npc = false,
  race: RaceId = "valdarios",
  classId: ClassId = "sentinela",
  appearance = 0,
): Actor {
  const root = new T.Group(),
    body = new T.Group();
  root.add(body);
  const skins: Record<RaceId, number[]> = {
    valdarios: [0xc99575, 0x8d5b48, 0xe6bb98],
    kordranios: [0x7d8589, 0x5d696e, 0x99917e],
    eluvios: [0xa7c1ae, 0x7c9f96, 0xc0c8b1],
    naquiros: [0x70a9b4, 0x648d9e, 0x9dc0bb],
  };
  const skin = material(skins[race][appearance % 3]),
    cloth = material(color),
    dark = material(0x293a43),
    leather = material(0x574334),
    steel = material(0x91a6ac, 0.35),
    gold = material(0xcba56c, 0.38),
    boots = material(0x26343a);
  const light = new T.MeshStandardMaterial({
    color: 0x8dd7d3,
    emissive: 0x40a7ab,
    emissiveIntensity: 0.7,
    roughness: 0.3,
  });
  const left = new T.Group(),
    right = new T.Group();
  left.position.set(-0.18, 0.88, 0);
  right.position.set(0.18, 0.88, 0);
  body.add(left, right);
  for (const leg of [left, right]) {
    limb(
      new T.Vector3(),
      new T.Vector3(0, -0.39, 0.025),
      0.145,
      0.12,
      dark,
      leg,
    );
    limb(
      new T.Vector3(0, -0.4, 0.025),
      new T.Vector3(0, -0.76, 0),
      0.115,
      0.105,
      classId === "sentinela" ? steel : leather,
      leg,
    );
    oval(0.15, [1.05, 0.65, 1.6], boots, 0, -0.77, 0.08, leg);
    if (classId === "sentinela")
      oval(0.14, [1, 0.8, 0.28], gold, 0, -0.38, 0.115, leg);
  }
  // A shaped waist/chest profile reads as a person under fitted equipment,
  // rather than one cylindrical barrel. This remains a provisional mesh rig.
  const torsoShape = new T.LatheGeometry([
    new T.Vector2(0.255, -0.33), new T.Vector2(0.275, -0.19),
    new T.Vector2(0.35, 0.13), new T.Vector2(0.385, 0.25),
    new T.Vector2(0.31, 0.34),
  ], 18);
  const torso = mesh(
    torsoShape,
    classId === "sentinela" ? steel : cloth,
    0,
    1.31,
    0,
    body,
  );
  torso.scale.z = 0.72;
  // Overlapping collarbone plates / stitched lapels emphasize the class kit.
  for (const side of [-1, 1]) {
    const plate = new T.Shape();
    plate.moveTo(0, 0.23); plate.lineTo(side * 0.29, 0.31);
    plate.quadraticCurveTo(side * 0.33, 0.1, side * 0.12, -0.08);
    plate.lineTo(0, -0.16); plate.closePath();
    mesh(new T.ExtrudeGeometry(plate, {
      depth: 0.027, bevelEnabled: true, bevelSize: 0.018,
      bevelThickness: 0.012, bevelSegments: 2,
    }), classId === "sentinela" ? gold : leather, 0, 1.36, 0.205, body);
    const seam = box(0.022, 0.31, 0.024, gold, side * 0.18, 1.25, 0.252, body);
    seam.rotation.z = side * -0.25;
  }
  const tabardShape = new T.Shape();
  tabardShape.moveTo(-0.18, 0); tabardShape.lineTo(0.18, 0);
  tabardShape.lineTo(0.22, -0.54); tabardShape.lineTo(0, -0.67);
  tabardShape.lineTo(-0.22, -0.54); tabardShape.closePath();
  mesh(new T.ShapeGeometry(tabardShape), cloth, 0, 0.97, 0.275, body);
  for (const side of [-1, 1]) {
    const trim = box(0.018, 0.52, 0.018, gold, side * 0.2, 0.72, 0.29, body);
    trim.rotation.z = side * 0.075;
  }
  const waist = mesh(
    new T.CylinderGeometry(0.29, 0.31, 0.17, 10),
    leather,
    0,
    0.95,
    0,
    body,
  );
  waist.scale.z = 0.7;
  box(0.12, 0.13, 0.05, gold, 0, 0.95, 0.23, body);
  const collar = mesh(
    new T.CylinderGeometry(0.37, 0.34, 0.12, 10),
    gold,
    0,
    1.62,
    0,
    body,
  );
  collar.scale.z = 0.68;
  if (classId === "sentinela") {
    oval(0.27, [1.03, 1, 0.4], cloth, 0, 1.36, 0.18, body);
    mesh(new T.OctahedronGeometry(0.105), light, 0, 1.38, 0.32, body);
  } else {
    const skirt = mesh(
      new T.CylinderGeometry(
        0.25,
        classId === "errante" ? 0.34 : 0.45,
        classId === "errante" ? 0.35 : 0.78,
        10,
        1,
        true,
      ),
      new T.MeshStandardMaterial({ color, roughness: 0.9, side: T.DoubleSide }),
      0,
      classId === "errante" ? 0.79 : 0.59,
      0,
      body,
    );
    for (const x of [-0.23, 0.23]) {
      const trim = box(0.035, 0.65, 0.04, gold, x, 0.65, 0.29, body);
      trim.rotation.z = x * 0.45;
    }
    mesh(new T.OctahedronGeometry(0.08), light, 0, 1.46, 0.25, body);
  }
  limb(
    new T.Vector3(0, 1.65, 0),
    new T.Vector3(0, 1.87, 0),
    0.12,
    0.11,
    skin,
    body,
  );
  const headStart = body.children.length;
  oval(0.265, [0.88, 1.08, 0.86], skin, 0, 2.06, 0, body);
  // Cheek planes frame smaller, recessed eyes instead of projecting eyeballs.
  for (const side of [-1, 1])
    oval(0.075, [1.1, 0.58, 0.55], skin, side * 0.134, 2.005, 0.181, body);
  oval(0.19, [1, 0.72, 0.9], skin, 0, 1.92, 0.035, body);
  oval(0.052, [0.65, 1.3, 1.05], skin, 0, 2.025, 0.224, body);
  const iris = material(
      race === "naquiros" ? 0xbca775 : race === "eluvios" ? 0x47a29e : 0x35464c,
    ),
    white = material(0xe4ded1);
  for (const x of [-0.091, 0.091]) {
    oval(0.035, [1.05, 0.48, 0.25], white, x, 2.075, 0.225, body);
    oval(0.02, [0.65, 0.75, 0.3], iris, x, 2.074, 0.233, body);
    const brow = oval(0.056, [1, 0.16, 0.24], dark, x, 2.119, 0.222, body);
    brow.rotation.z = x > 0 ? 0.09 : -0.09;
    if (race !== "naquiros")
      oval(0.065, [0.6, 1, 0.65], skin, x > 0 ? 0.241 : -0.241, 2.055, 0, body);
  }
  box(0.1, 0.014, 0.012, material(0x815e51), 0, 1.94, 0.238, body);
  if (race === "naquiros") {
    for (const side of [-1, 1]) {
      const fin = mesh(
        new T.ConeGeometry(0.12, 0.3, 3),
        material(0x497d91),
        side * 0.27,
        2.08,
        -0.02,
        body,
      );
      fin.rotation.z = side * -1.1;
      fin.scale.z = 0.25;
      for (let i = 0; i < 3; i++) {
        const scale = oval(0.024, [1.7, 0.55, 0.2], gold,
          side * (0.10 + i * 0.035), 1.985 - i * 0.025, 0.20, body);
        scale.rotation.z = side * 0.3;
      }
    }
    for (let i = 0; i < 4; i++) {
      const fin = mesh(
        new T.ConeGeometry(0.1, 0.26 + i * 0.045, 4),
        cloth,
        0,
        2.31,
        -0.03 - i * 0.055,
        body,
      );
      fin.rotation.x = -0.2 - i * 0.18;
    }
  } else {
    const hc =
        race === "kordranios"
          ? 0x434c52
          : race === "eluvios"
            ? [0xd6d4bb, 0x334a55, 0x806787][appearance % 3]
            : [0x3c302a, 0xb78a55, 0x232c36][appearance % 3],
      hair = material(hc);
    const cap = mesh(
      new T.SphereGeometry(0.29, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      hair,
      0,
      2.12,
      -0.025,
      body,
    );
    cap.scale.set(0.85, 1.07, 0.92);
    cap.rotation.x = -0.13;
    for (let i = 0; i < 5; i++) {
      const lock = oval(
        0.11,
        [0.7, 0.86, 0.65],
        hair,
        (i - 2) * 0.09,
        2.26 + Math.sin(i*1.7)*.02,
        0.13,
        body,
      );
      lock.rotation.z = -0.45 + (i - 2) * -0.12;
    }
    if (race === "kordranios") {
      oval(0.17, [1.1, 1, 0.75], hair, 0, 1.88, 0.18, body);
      for (const side of [-1, 1])
        mesh(
          new T.OctahedronGeometry(0.045),
          gold,
          side * 0.13,
          1.82,
          0.27,
          body,
        );
    }
    if (race === "eluvios")
      for (const side of [-1, 1]) {
        const leaf = mesh(
          new T.ConeGeometry(0.065, 0.27, 4),
          gold,
          side * 0.21,
          2.24,
          0.01,
          body,
        );
        leaf.rotation.z = side * -0.5;
      }
  }
  const headGroup = new T.Group();
  headGroup.position.y = 2.06;
  for (const part of body.children.slice(headStart)) {
    part.removeFromParent();
    part.position.y -= 2.06;
    headGroup.add(part);
  }
  headGroup.scale.setScalar(0.9);
  body.add(headGroup);
  for (const side of [-1, 1]) {
    oval(
      classId === "sentinela" ? 0.25 : 0.18,
      [1.22, 0.57, 1.08],
      classId === "sentinela" ? steel : cloth,
      side * 0.42,
      1.6,
      0,
      body,
    );
    if (classId === "sentinela") {
      oval(0.2, [1.1, 0.31, 1], gold, side * 0.45, 1.66, 0, body);
      mesh(
        new T.OctahedronGeometry(0.065),
        light,
        side * 0.48,
        1.66,
        0.12,
        body,
      );
    }
  }
  const arm = new T.Group();
  arm.position.set(-0.45, 1.53, 0);
  body.add(arm);
  const other = new T.Group();
  other.position.set(0.45, 1.53, 0);
  body.add(other);
  root.userData.otherArm = other;
  for (const a of [arm, other]) {
    limb(
      new T.Vector3(),
      new T.Vector3(0, -0.31, 0.04),
      0.115,
      0.105,
      cloth,
      a,
    );
    limb(
      new T.Vector3(0, -0.32, 0.04),
      new T.Vector3(0, -0.57, 0.09),
      0.1,
      0.075,
      classId === "sentinela" ? steel : leather,
      a,
    );
    oval(0.105, [0.75, 1, 0.7], skin, 0, -0.6, 0.1, a);
  }
  const cg = new T.PlaneGeometry(0.65, 0.95, 6, 6),
    cp = cg.attributes.position;
  for (let i = 0; i < cp.count; i++) {
    const y = cp.getY(i);
    cp.setX(i, cp.getX(i) * (1.1 - y * 0.4));
    cp.setZ(i, 0.06 * Math.cos(cp.getX(i) * 12) + Math.max(0, -y) * 0.2);
  }
  cg.computeVertexNormals();
  const cape = mesh(
    cg,
    new T.MeshStandardMaterial({
      color: classId === "errante" ? 0x395b47 : color,
      roughness: 0.9,
      side: T.DoubleSide,
    }),
    0,
    1.12,
    -0.25,
    body,
  );
  cape.rotation.x = 0.12;
  root.userData.cape = cape;
  let sword: T.Mesh | undefined;
  if (classId === "sentinela") {
    const weapon = new T.Group();
    weapon.position.set(0, -0.62, 0.16);
    weapon.rotation.x = Math.PI * 0.68;
    arm.add(weapon);
    const shape = new T.Shape();
    shape.moveTo(-0.075, 0);
    shape.lineTo(-0.07, 0.83);
    shape.lineTo(0, 1.08);
    shape.lineTo(0.07, 0.83);
    shape.lineTo(0.075, 0);
    shape.closePath();
    sword = mesh(
      new T.ExtrudeGeometry(shape, {
        depth: 0.035,
        bevelEnabled: true,
        bevelSize: 0.012,
        bevelThickness: 0.012,
        bevelSegments: 1,
      }),
      steel,
      0,
      0,
      0,
      weapon,
    );
    box(0.32, 0.06, 0.075, gold, 0, -0.02, 0, weapon);
    limb(
      new T.Vector3(0, -0.24, 0.02),
      new T.Vector3(0, 0, 0.02),
      0.045,
      0.045,
      leather,
      weapon,
    );
    mesh(new T.OctahedronGeometry(0.065), gold, 0, -0.25, 0.02, weapon);
    const ss = new T.Shape();
    ss.moveTo(-0.28, 0.39);
    ss.lineTo(0.28, 0.39);
    ss.lineTo(0.33, -0.08);
    ss.quadraticCurveTo(0.16, -0.39, 0, -0.48);
    ss.quadraticCurveTo(-0.16, -0.39, -0.33, -0.08);
    ss.closePath();
    mesh(
      new T.ExtrudeGeometry(ss, {
        depth: 0.09,
        bevelEnabled: true,
        bevelSize: 0.025,
        bevelThickness: 0.015,
        bevelSegments: 1,
      }),
      gold,
      0.1,
      -0.31,
      0.3,
      other,
    );
    const plate = mesh(
      new T.ShapeGeometry(ss),
      cloth,
      0.1,
      -0.31,
      0.415,
      other,
    );
    plate.scale.setScalar(0.83);
    const emblem = mesh(
      new T.OctahedronGeometry(0.11),
      light,
      0.1,
      -0.26,
      0.46,
      other,
    );
    emblem.scale.set(0.65, 1.4, 0.3);
  } else if (classId === "errante") {
    const points = Array.from({ length: 19 }, (_, i) => {
      const a = -Math.PI / 2 + (i / 18) * Math.PI;
      return new T.Vector3(Math.cos(a) * 0.28, Math.sin(a) * 0.73, 0);
    });
    mesh(
      new T.TubeGeometry(new T.CatmullRomCurve3(points), 20, 0.035, 6, false),
      leather,
      0,
      -0.3,
      0.18,
      arm,
    );
    limb(
      new T.Vector3(0, 0.43, 0.18),
      new T.Vector3(0, -1.03, 0.18),
      0.009,
      0.009,
      gold,
      arm,
    );
    limb(
      new T.Vector3(0.23, 1.1, -0.4),
      new T.Vector3(0.14, 1.72, -0.3),
      0.13,
      0.14,
      leather,
      body,
    );
    for (let i = 0; i < 3; i++) {
      limb(
        new T.Vector3(0.08 + i * 0.065, 1.5, -0.33),
        new T.Vector3(0.14 + i * 0.065, 1.95, -0.34),
        0.012,
        0.012,
        gold,
        body,
      );
      mesh(
        new T.ConeGeometry(0.055, 0.16, 3),
        cloth,
        0.14 + i * 0.065,
        1.96,
        -0.34,
        body,
      );
    }
  } else {
    limb(
      new T.Vector3(0, -1.2, 0.16),
      new T.Vector3(0, 0.62, 0.16),
      0.038,
      0.032,
      leather,
      arm,
    );
    const gem = mesh(new T.OctahedronGeometry(0.18), light, 0, 0.75, 0.16, arm);
    gem.scale.y = 1.45;
    const ring = mesh(
      new T.TorusGeometry(0.24, 0.026, 5, 24),
      gold,
      0,
      0.75,
      0.16,
      arm,
    );
    ring.rotation.y = 0.4;
    if (classId === "ressonante") {
      const r = mesh(
        new T.TorusGeometry(0.35, 0.022, 5, 28),
        gold,
        0,
        0.75,
        0.16,
        arm,
      );
      r.rotation.y = 1.1;
    }
  }
  if (race === "kordranios") {
    root.scale.set(1.17, 0.82, 1.1);
    for (const side of [-1, 1]) {
      const mark = mesh(
        new T.OctahedronGeometry(0.035),
        gold,
        side * 0.18,
        2.06,
        0.2,
        body,
      );
      mark.scale.y = 2;
    }
  }
  if (race === "eluvios") {
    root.scale.set(0.91, 1.1, 0.92);
    for (const side of [-1, 1]) {
      const vine = limb(new T.Vector3(side * .09, 1.94, .197),
        new T.Vector3(side * .15, 2.035, .208), .009, .005, light, headGroup);
      // Head details must use the same local frame as the face.
      vine.position.y -= 2.06;
    }
  }
  if (race === "naquiros") root.scale.set(0.96, 1.03, 0.94);
  batchPart(body, [left, right, arm, other, cape]);
  for (const part of [left, right, arm, other])
    batchPart(part, sword ? [sword] : []);
  root.userData.artStatus = "provisional-original-procedural";
  root.userData.classId = classId;
  root.userData.race = race;
  return { root, body, left, right, arm, sword };
}
export function creature(kind: EnemyKind): Actor {
  const root = new T.Group(),
    body = new T.Group(),
    left = new T.Group(),
    right = new T.Group(),
    arm = new T.Group();
  root.add(body);
  body.add(left, right, arm);
  const dark = material(0x3b3947),
    stone = material(0x665d72),
    wood = material(0x695e4e),
    moss = material(0x4d7367),
    ivory = material(0xc1baa3),
    glow = new T.MeshStandardMaterial({
      color: 0xc49dd5,
      emissive: 0x8f507d,
      emissiveIntensity: 1,
    });
  if (kind === "brumino") {
    oval(0.72, [0.85, 0.82, 1.35], stone, 0, 0.83, 0, body);
    oval(0.45, [1, 0.85, 1.08], dark, 0, 0.88, 0.73, body);
    oval(0.27, [1, 0.65, 0.65], stone, 0, 0.71, 1.07, body);
    for (const side of [-1, 1]) {
      const ear = mesh(
        new T.ConeGeometry(0.14, 0.33, 5),
        dark,
        side * 0.3,
        1.2,
        0.63,
        body,
      );
      ear.rotation.z = side * -0.4;
      const tusk = mesh(
        new T.ConeGeometry(0.067, 0.3, 7),
        ivory,
        side * 0.22,
        0.68,
        1.13,
        body,
      );
      tusk.rotation.x = -0.5;
      oval(0.058, [0.75, 0.65, 0.5], glow, side * 0.29, 0.98, 0.99, body);
    }
    for (let i = 0; i < 5; i++) {
      const spine = mesh(
        new T.ConeGeometry(0.14, 0.3 + (i % 2) * 0.18, 5),
        moss,
        0,
        1.44,
        -0.5 + i * 0.23,
        body,
      );
      spine.rotation.x = -0.3;
    }
    left.position.y = right.position.y = 0.63;
    for (const [i, g] of [left, right].entries())
      for (const z of [-0.43, 0.44]) {
        limb(
          new T.Vector3(i ? 0.37 : -0.37, 0, z),
          new T.Vector3(i ? 0.37 : -0.37, -0.49, z + 0.03),
          0.13,
          0.09,
          dark,
          g,
        );
        oval(0.12, [1, 0.65, 1.3], ivory, i ? 0.37 : -0.37, -0.5, z + 0.07, g);
      }
  } else {
    oval(0.75, [0.95, 1.15, 0.65], wood, 0, 1.32, 0, body);
    oval(0.39, [1, 0.9, 0.85], stone, 0, 2.2, 0, body);
    mesh(new T.OctahedronGeometry(0.19), glow, 0, 1.42, 0.48, body);
    for (const side of [-1, 1]) {
      oval(0.075, [1, 0.5, 0.45], glow, side * 0.15, 2.24, 0.3, body);
      const branch = mesh(
        new T.CylinderGeometry(0.04, 0.1, 0.72, 5),
        wood,
        side * 0.32,
        2.63,
        -0.02,
        body,
      );
      branch.rotation.z = side * -0.47;
      oval(0.24, [1.5, 0.6, 1.2], moss, side * 0.69, 1.91, 0, body);
      limb(
        new T.Vector3(side * 0.74, 1.72, 0),
        new T.Vector3(side * 0.94, 0.83, 0.16),
        0.18,
        0.13,
        wood,
        arm,
      );
    }
    left.position.set(-0.32, 0.91, 0);
    right.position.set(0.32, 0.91, 0);
    for (const g of [left, right]) {
      limb(
        new T.Vector3(),
        new T.Vector3(0.02, -0.69, 0.06),
        0.18,
        0.14,
        wood,
        g,
      );
      oval(0.23, [1, 0.6, 1.3], stone, 0, -0.74, 0.11, g);
    }
    for (let i = 0; i < 5; i++) {
      const plate = mesh(
        new T.OctahedronGeometry(0.18),
        moss,
        i % 2 ? -0.25 : 0.25,
        1.12 + i * 0.13,
        0.38,
        body,
      );
      plate.scale.set(1.3, 0.7, 0.6);
    }
  }
  batchPart(body, [left, right, arm]);
  for (const part of [left, right, arm]) batchPart(part);
  return { root, body, left, right, arm };
}
export function animate(a: Actor, moving: boolean, time: number, speed = 1) {
  const step = moving ? Math.sin(time * 9 * speed) : 0;
  a.left.rotation.x = step * 0.52;
  a.right.rotation.x = -step * 0.52;
  a.arm.rotation.x = -step * 0.25;
  a.body.position.y = moving
    ? Math.abs(step) * 0.052
    : Math.sin(time * 1.8) * 0.016;
  const other = a.root.userData.otherArm as T.Group | undefined;
  if (other) other.rotation.x = step * 0.25;
  const cape = a.root.userData.cape as T.Mesh | undefined;
  if (cape) {
    cape.rotation.x = 0.12 + Math.sin(time * 2.4) * 0.035 + (moving ? 0.14 : 0);
    cape.rotation.z = Math.sin(time * 2) * 0.025;
  }
}
export function nameplate(
  text: string,
  color = "#f2e7cf",
  ratio?: number,
): T.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 100;
  const c = canvas.getContext("2d")!;
  c.font = "600 28px Segoe UI, sans-serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.shadowColor = "#10222f";
  c.shadowBlur = 7;
  c.fillStyle = color;
  c.fillText(text, 256, 34);
  if (ratio !== undefined) {
    c.shadowBlur = 0;
    c.fillStyle = "#15232fe8";
    c.fillRect(95, 70, 322, 10);
    c.fillStyle = "#cf7a72";
    c.fillRect(98, 73, 316 * Math.max(0, Math.min(1, ratio)), 4);
  }
  const sprite = new T.Sprite(
    new T.SpriteMaterial({
      map: new T.CanvasTexture(canvas),
      depthTest: false,
      transparent: true,
    }),
  );
  sprite.scale.set(4.1, 0.8, 1);
  return sprite;
}
export function disposeLabel(label: T.Sprite) {
  (label.material as T.SpriteMaterial).map?.dispose();
  label.material.dispose();
}
