import { terrainHeight, factionOf, type Creation } from "../../shared/alpha.js";
import type { FactionId } from "../../shared/identity.js";
import * as T from "three";
import type {
  PublicEnemy,
  PublicPlayer,
  Snapshot,
} from "../../shared/types.js";
import { HOUSES, SHRINE, TREES } from "../../shared/config.js";
import { cameraPosition } from "./render-camera.js";
import {
  animate,
  creature,
  disposeLabel,
  material,
  mesh,
  nameplate,
  type Actor,
  warrior,
} from "./models.js";
import { scenery } from "./scenery.js";
export type Pick = {
  kind: "enemy" | "npc" | "loot" | "fragment" | "player";
  id: string;
};
export class SceneView {
  scene = new T.Scene();
  camera = new T.PerspectiveCamera(60, 1, 0.1, 240);
  renderer: T.WebGLRenderer;
  yaw = 0;
  pitch = 0.3;
  zoom = 10.5;
  target = new T.Vector3(0, 1.3, 19);
  private players = new Map<string, Actor>();
  private enemies = new Map<string, Actor>();
  private companions = new Map<string, Actor>();
  private loot = new Map<string, T.Group>();
  private ray = new T.Raycaster();
  private scenery;
  private ring: T.Mesh;
  private abilityPreview: T.Mesh;
  private previewRange = 0;
  private reducedEffects = false;
  private cameraDistance = 0;
  private cameraObstructed = false;
  private effects: { root: T.Object3D; at: number; type: string }[] = [];
  private lastEvents = -1;
  private faction: FactionId = "vigilia";
  private previewActor: Actor | null = null;
  private previewKey = "";
  private sun: T.DirectionalLight;
  economical = false;
  private cameraBoxes = [ ...HOUSES.map(
    (h) =>
      new T.Box3(
        new T.Vector3(h.x - h.w / 2 - 0.35, 0, h.z - h.d / 2 - 0.35),
        new T.Vector3(h.x + h.w / 2 + 0.35, 6.5, h.z + h.d / 2 + 0.35),
      ),
  ),
    new T.Box3(new T.Vector3(SHRINE.x-1.5,0,SHRINE.z-1.5),new T.Vector3(SHRINE.x+1.5,8,SHRINE.z+1.5)),
    ...TREES.map(t => new T.Box3(new T.Vector3(t.x-.42,0,t.z-.42),new T.Vector3(t.x+.42,4*t.scale,t.z+.42))),
  ];
  constructor(public canvas: HTMLCanvasElement) {
    this.renderer = new T.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = T.PCFShadowMap;
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.scene.background = new T.Color(0xa5bfca);
    this.scene.fog = new T.Fog(0xa5bfca, 65, 185);
    this.scene.add(new T.HemisphereLight(0xcbdfe9, 0x3f493c, 1.05));
    this.sun = new T.DirectionalLight(0xffe4bd, 2.9);
    this.sun.position.set(-30, 50, 15);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    const s = this.sun.shadow.camera;
    s.left = -43;
    s.right = 43;
    s.top = 43;
    s.bottom = -43;
    s.far = 150;
    s.updateProjectionMatrix();
    this.sun.shadow.bias = -0.0005;
    this.sun.shadow.normalBias = 0.03;
    this.scene.add(this.sun, this.sun.target);
    const sky = new T.Mesh(
      new T.SphereGeometry(280, 32, 18),
      new T.ShaderMaterial({
        side: T.BackSide,
        depthWrite: false,
        uniforms: {
          top: { value: new T.Color(0x527ca4) },
          bottom: { value: new T.Color(0xd4ddd1) },
        },
        vertexShader:
          "varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader:
          "varying vec3 v;uniform vec3 top;uniform vec3 bottom;void main(){float h=normalize(v).y;vec3 c=mix(bottom,top,smoothstep(-.05,.8,h));float cloud=sin(v.x*.043+sin(v.z*.026)*1.6)*sin(v.z*.031+v.y*.031);float veil=smoothstep(.49,.91,cloud)*smoothstep(.04,.22,h)*(1.-smoothstep(.35,.7,h));c=mix(c,vec3(.90,.91,.85),veil*.58);gl_FragColor=vec4(c,1.);}",
      }),
    );
    sky.frustumCulled = false;
    this.scene.add(sky);
    this.scenery = scenery(this.scene);
    this.ring = new T.Mesh(
      new T.RingGeometry(0.95, 1.05, 48),
      new T.MeshBasicMaterial({
        color: 0xf2c97e,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        side: T.DoubleSide,
      }),
    );
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.visible = false;
    this.scene.add(this.ring);
    this.abilityPreview = new T.Mesh(new T.RingGeometry(.96, 1, 64),
      new T.MeshBasicMaterial({color:0x8dd9cc, transparent:true, opacity:.34,
        side:T.DoubleSide, depthWrite:false}));
    this.abilityPreview.rotation.x = -Math.PI/2;
    this.abilityPreview.visible = false;
    this.scene.add(this.abilityPreview);
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }
  setCreation(c: Creation) {
    this.setFaction(c.factionId);
    const key = JSON.stringify(c);
    if (this.previewKey === key) return;
    this.previewKey = key;
    if (this.previewActor) {
      this.scene.remove(this.previewActor.root);
      this.disposeActor(this.previewActor);
    }
    this.previewActor = warrior(
      c.factionId === "vigilia" ? 0x315e7c : 0x6b6085,
      false,
      c.raceId,
      c.classId,
      c.appearance,
    );
    this.previewActor.root.position.set(0, 0, 24);
    this.previewActor.root.rotation.y = -0.2;
    this.scene.add(this.previewActor.root);
    this.scenery.setState(0);
  }
  private setFaction(f: FactionId) {
    if (f === this.faction) return;
    this.scenery.disposeAssets();
    this.scene.remove(this.scenery.root);
    this.disposeObject(this.scenery.root);
    this.faction = f;
    this.scenery = scenery(this.scene, f);
    this.scenery.setReducedEffects(this.reducedEffects);
    const fog = f === "confluencia" ? 0xa4b4c9 : 0xa5bfca;
    (this.scene.fog as T.Fog).color.setHex(fog);
  }
  private disposeObject(root: T.Object3D) {
    const geos = new Set<T.BufferGeometry>(),
      mats = new Set<T.Material>();
    root.traverse((o) => {
      if (o instanceof T.Mesh) {
        geos.add(o.geometry);
        for (const m of Array.isArray(o.material) ? o.material : [o.material])
          mats.add(m);
      }
      if (o instanceof T.Sprite) disposeLabel(o);
    });
    for (const m of mats) {
      const map = (m as T.MeshStandardMaterial).map;
      map?.dispose();
    }
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  }
  resize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }
  quality() {
    this.economical = !this.economical;
    this.renderer.setPixelRatio(
      this.economical ? 1 : Math.min(devicePixelRatio, 1.35),
    );
    this.renderer.shadowMap.enabled = !this.economical;
    this.resize();
    return this.economical;
  }
  setReducedEffects(value: boolean) {
    this.reducedEffects = value;
    this.scenery.setReducedEffects(value);
    (this.abilityPreview.material as T.MeshBasicMaterial).opacity = value ? .22 : .34;
  }
  /** Preview is an aid, never a promise that the server will accept a cast. */
  setAbilityPreview(range: number, area: boolean) {
    const safe = Number.isFinite(range) ? T.MathUtils.clamp(range, 0, 35) : 0;
    if (safe !== this.previewRange) {
      this.abilityPreview.geometry.dispose();
      this.abilityPreview.geometry = new T.RingGeometry(Math.max(0, safe-.07), Math.max(.001,safe), 64);
    }
    this.previewRange = safe;
    (this.abilityPreview.material as T.MeshBasicMaterial).color.setHex(area ? 0x8dd9cc : 0xe1bc7b);
    this.abilityPreview.visible = safe > 0;
  }
  orbit(dx: number, dy: number) {
    this.yaw -= dx * 0.005;
    this.pitch = T.MathUtils.clamp(this.pitch + dy * 0.004, 0.18, 1.18);
  }
  zoomBy(delta: number) {
    this.zoom = T.MathUtils.clamp(this.zoom + delta * 0.014, 6.3, 26);
  }
  pick(x: number, y: number): Pick | null {
    const rect = this.canvas.getBoundingClientRect();
    this.ray.setFromCamera(
      new T.Vector2(
        ((x - rect.left) / rect.width) * 2 - 1,
        (-(y - rect.top) / rect.height) * 2 + 1,
      ),
      this.camera,
    );
    const roots: T.Object3D[] = [
      ...this.scenery.interactive,
      ...[...this.enemies.values()]
        .filter((a) => a.root.visible)
        .map((a) => a.root),
      ...this.loot.values(),
      ...[...this.players.values()].map((a) => a.root),
    ];
    for (const hit of this.ray.intersectObjects(roots, true)) {
      let o: T.Object3D | null = hit.object;
      while (o) {
        if (o.userData.kind) return o.userData as Pick;
        o = o.parent;
      }
    }
    return null;
  }
  update(
    state: Snapshot | null,
    render: { players: PublicPlayer[]; enemies: PublicEnemy[] } | null,
    local: { x: number; z: number; angle: number } | null,
    selected: string | null,
    time: number,
    dt: number,
  ) {
    this.scenery.animate(time);
    animate(this.scenery.npc, false, time);
    if (state && render) {
      this.setFaction(factionOf(state.you));
      this.scenery.setState(
        state.you.story?.restored
          ? 0
          : state.you.quest.state === "completed"
            ? 1
            : 2,
        state.you.story?.fragments ?? [],
      );
      if (this.previewActor) {
        this.scene.remove(this.previewActor.root);
        this.disposeActor(this.previewActor);
        this.previewActor = null;
      }

      const active = new Set<string>();
      for (const p of render.players) {
        active.add(p.id);
        let actor = this.players.get(p.id);
        if (!actor) {
          actor = warrior(
            p.id === state.you.id
              ? this.faction === "vigilia"
                ? 0x315e7c
                : 0x6b6085
              : 0x527581,
            false,
            p.raceId ?? "valdarios",
            p.classId ?? "sentinela",
            p.appearance ?? 0,
          );
          actor.root.userData.kind = "player";
          actor.root.userData.id = p.id;
          const barrier = new T.Mesh(
            new T.SphereGeometry(0.95, 20, 14),
            new T.MeshBasicMaterial({
              color: 0x8bd6df,
              transparent: true,
              opacity: 0.15,
              wireframe: true,
              depthWrite: false,
            }),
          );
          barrier.position.y = 1.2;
          barrier.scale.y = 1.4;
          barrier.name = "barrier";
          actor.root.add(barrier);
          this.players.set(p.id, actor);
          this.scene.add(actor.root);
          actor.label = nameplate(
            p.nickname,
            p.id === state.you.id ? "#e8ddbc" : "#a5e0d3",
          );
          actor.label.position.y = 2.8;
          actor.root.add(actor.label);
        }
        const pos = p.id === state.you.id && local ? local : p;
        actor.root.position.set(
          pos.x,
          terrainHeight(pos.x, pos.z) + (p.dead ? 0.55 : 0),
          pos.z,
        );
        actor.root.rotation.y = pos.angle;
        actor.body.rotation.z = p.dead ? -Math.PI / 2 : 0;
        animate(actor, p.moving && !p.dead, time);
        const barrier = actor.root.getObjectByName("barrier");
        if (barrier) barrier.visible = !!p.barrier;
        if (p.casting) {
          actor.arm.rotation.x = -1.45 + Math.sin(time * 5) * 0.05;
          const other = actor.root.userData.otherArm as T.Group;
          if (other) other.rotation.x = -0.95;
        }
        if (actor.sword)
          (actor.sword.material as T.MeshStandardMaterial).color.setHex(
            p.weapon === "dawnSword"
              ? 0xf1d18d
              : p.weapon === "forestBlade"
                ? 0x85c3ae
                : 0xadbcc0,
          );
        if (!p.dead && actor.root.userData.swingUntil > time)
          actor.arm.rotation.x -=
            Math.sin(
              ((actor.root.userData.swingUntil - time) / 0.28) * Math.PI,
            ) * 1.7;
      }
      for (const [id, a] of this.players)
        if (!active.has(id)) {
          this.scene.remove(a.root);
          this.players.delete(id);
          this.disposeActor(a);
        }
      const mobs = new Set<string>();
      for (const e of render.enemies) {
        mobs.add(e.id);
        let a = this.enemies.get(e.id);
        if (!a) {
          a = creature(e.kind);
          a.root.userData = { kind: "enemy", id: e.id };
          this.enemies.set(e.id, a);
          this.scene.add(a.root);
          if (e.elite) a.root.scale.setScalar(1.65);
        }
        a.root.visible = e.state !== "dead";
        a.root.position.set(e.x, terrainHeight(e.x, e.z), e.z);
        a.root.rotation.y = e.angle;
        animate(
          a,
          e.state === "patrol" || e.state === "chase" || e.state === "return",
          time,
          e.kind === "cerne" ? 0.65 : 1,
        );
        if (a.root.userData.swingUntil > time)
          a.arm.rotation.x -=
            Math.sin(((a.root.userData.swingUntil - time) / 0.28) * Math.PI) *
            1.2;
        const key = `${e.hp}/${e.maxHp}`;
        if (a.labelKey !== key) {
          if (a.label) {
            a.root.remove(a.label);
            disposeLabel(a.label);
          }
          a.label = nameplate(
            e.elite
              ? "Núcleo Fraturado"
              : e.kind === "brumino"
                ? "Brumino"
                : "Cerne errante",
            "#edc2b4",
            e.hp / e.maxHp,
          );
          a.label.position.y = e.kind === "brumino" ? 1.9 : 3.2;
          a.root.add(a.label);
          a.labelKey = key;
        }
      }
      for (const [id, a] of this.enemies)
        if (!mobs.has(id)) {
          this.scene.remove(a.root);
          this.enemies.delete(id);
          this.disposeActor(a);
        }
      const petIds = new Set<string>();
      for (const pet of state.companions ?? []) {
        petIds.add(pet.id);
        let a = this.companions.get(pet.id);
        if (!a) {
          a = creature("brumino");
          a.root.scale.setScalar(.57);
          const collar = mesh(new T.TorusGeometry(.42,.055,5,20),
            material(0x65c9ba,.35),0,.85,.58,a.body);
          collar.rotation.x = Math.PI / 2;
          a.label = nameplate(pet.name, "#a4ddd2");
          a.label.position.y = 2.05; a.label.scale.multiplyScalar(1.35);
          a.root.add(a.label);
          this.companions.set(pet.id,a); this.scene.add(a.root);
        }
        const moving = a.root.position.distanceToSquared(new T.Vector3(pet.x,terrainHeight(pet.x,pet.z),pet.z)) > .002;
        a.root.position.set(pet.x, terrainHeight(pet.x,pet.z), pet.z);
        a.root.rotation.y = pet.angle;
        animate(a,moving,time,1.25);
      }
      for (const [id,a] of this.companions) if (!petIds.has(id)) {
        this.scene.remove(a.root); this.disposeActor(a); this.companions.delete(id);
      }
      const drops = new Set(state.loot.map((l) => l.id));
      for (const l of state.loot) {
        let g = this.loot.get(l.id);
        if (!g) {
          g = new T.Group();
          g.userData = { kind: "loot", id: l.id };
          mesh(
            new T.OctahedronGeometry(0.27),
            new T.MeshStandardMaterial({
              color: l.ownerId === state.you.id ? 0xf9d590 : 0x96aaa4,
              emissive: 0xb68c3a,
              emissiveIntensity: l.ownerId === state.you.id ? 0.5 : 0.05,
            }),
            0,
            0,
            0,
            g,
          );
          const marker = nameplate(
            l.ownerId === state.you.id ? "◆ Recompensa · F" : "Outro viajante",
            l.ownerId === state.you.id ? "#f7d791" : "#b4c7c0",
          );
          marker.position.y = 0.8;
          marker.scale.multiplyScalar(0.7);
          g.add(marker);
          this.loot.set(l.id, g);
          this.scene.add(g);
        }
        g.position.set(l.x, 0.55 + Math.sin(time * 2.5) * 0.13, l.z);
        g.rotation.y = time * 0.65;
      }
      for (const [id, g] of this.loot)
        if (!drops.has(id)) {
          this.scene.remove(g);
          g.traverse((o) => {
            if (o instanceof T.Mesh) {
              o.geometry.dispose();
              if (o.material instanceof T.Material) o.material.dispose();
            }
            if (o instanceof T.Sprite) disposeLabel(o);
          });
          this.loot.delete(id);
        }
      const enemy = state.enemies.find(
        (e) => e.id === selected && e.state !== "dead",
      );
      this.ring.visible = !!enemy;
      if (enemy) {
        const pos = render.enemies.find((e) => e.id === enemy.id) ?? enemy;
        this.ring.position.set(
          pos.x,
          terrainHeight(pos.x, pos.z) + 0.05,
          pos.z,
        );
      }
      if (state.tick !== this.lastEvents) {
        this.lastEvents = state.tick;
        for (const e of state.events) {
          // Essential numeric feedback remains in reduced mode. Cosmetic
          // waves/projectiles are capped and can be disabled independently.
          if (this.reducedEffects && !["hit","heal"].includes(e.kind)) continue;
          if (this.effects.length >= (this.reducedEffects ? 16 : 48)) continue;
          if (e.sourceId && (e.kind === "hit" || e.kind === "slash")) {
            const a =
              this.players.get(e.sourceId) ?? this.enemies.get(e.sourceId);
            if (a) a.root.userData.swingUntil = time + 0.28;
          }
          if (e.kind === "projectile") {
            const orb = mesh(
              new T.OctahedronGeometry(0.17),
              new T.MeshBasicMaterial({
                color:
                  e.classId === "errante"
                    ? 0xd8c38d
                    : e.classId === "ressonante"
                      ? 0x99ded2
                      : 0xa4b7ff,
                transparent: true,
              }),
              e.x,
              1.4 + terrainHeight(e.x, e.z),
              e.z,
            );
            orb.userData.from = new T.Vector3(e.x, orb.position.y, e.z);
            orb.userData.to = new T.Vector3(
              e.targetX ?? e.x,
              1.1 + terrainHeight(e.targetX ?? e.x, e.targetZ ?? e.z),
              e.targetZ ?? e.z,
            );
            this.scene.add(orb);
            this.effects.push({ root: orb, at: time, type: "projectile" });
          } else if (
            e.kind === "restore" ||
            e.kind === "attune" ||
            e.kind === "barrier"
          ) {
            const ring = mesh(
              new T.TorusGeometry(e.kind === "restore" ? 2.4 : 1, 0.045, 6, 60),
              new T.MeshBasicMaterial({ color: 0x9bdcd3, transparent: true }),
              e.x,
              terrainHeight(e.x, e.z) + 0.3,
              e.z,
            );
            ring.rotation.x = Math.PI / 2;
            this.scene.add(ring);
            this.effects.push({ root: ring, at: time, type: "ring" });
          } else if (e.kind === "hit" || e.kind === "heal") {
            const label = nameplate(
              `${e.kind === "heal" ? "+" : "−"}${e.amount}`,
              e.kind === "heal" ? "#9af0be" : "#ffe1af",
            );
            label.scale.multiplyScalar(0.7);
            label.position.set(e.x, terrainHeight(e.x, e.z) + 2.4, e.z);
            this.scene.add(label);
            this.effects.push({ root: label, at: time, type: "text" });
          } else if (
            e.kind === "nova" ||
            e.kind === "slash" ||
            e.kind === "level"
          ) {
            const ring = new T.Mesh(
              new T.TorusGeometry(
                e.kind === "nova" ? 1.7 : 0.8,
                0.065,
                5,
                32,
                e.kind === "slash" ? Math.PI * 1.4 : Math.PI * 2,
              ),
              new T.MeshBasicMaterial({
                color: e.kind === "level" ? 0xffdc8d : 0x9ee3d3,
                transparent: true,
              }),
            );
            ring.rotation.x = Math.PI / 2;
            ring.position.set(e.x, 0.8, e.z);
            this.scene.add(ring);
            this.effects.push({ root: ring, at: time, type: "ring" });
          }
        }
      }
      if (local) {
        this.abilityPreview.position.set(local.x, terrainHeight(local.x,local.z)+.08,local.z);
        this.abilityPreview.visible = this.previewRange > 0;
        this.target.lerp(
          new T.Vector3(
            local.x,
            terrainHeight(local.x, local.z) + 1.4,
            local.z,
          ),
          1 - Math.exp(-dt * 10),
        );
      }
    } else {
      this.abilityPreview.visible = false;
      this.target.set(0, 1.6, 24);
      this.yaw = -0.25 + Math.sin(time * 0.04) * 0.07;
      if (this.previewActor) animate(this.previewActor, false, time);
    }
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const fx = this.effects[i],
        age = time - fx.at;
      if (fx.type === "projectile")
        fx.root.position.lerpVectors(
          fx.root.userData.from,
          fx.root.userData.to,
          Math.min(1, age / 0.28),
        );
      else if (fx.type === "text") fx.root.position.y += dt * 1.2;
      else fx.root.scale.setScalar(1 + age * 1.8);
      const mat = (fx.root as T.Mesh).material as T.Material & {
        opacity: number;
      };
      mat.opacity = Math.max(0, 1 - age / 0.85);
      if (age > 0.85) {
        this.scene.remove(fx.root);
        if (fx.root instanceof T.Sprite) disposeLabel(fx.root);
        else {
          (fx.root as T.Mesh).geometry.dispose();
          mat.dispose();
        }
        this.effects.splice(i, 1);
      }
    }
    const distance = state ? this.zoom : 6.8;
    const horizontal = Math.cos(this.pitch) * distance;
    const desired = new T.Vector3(
      this.target.x + Math.sin(this.yaw) * horizontal,
      this.target.y + Math.sin(this.pitch) * distance,
      this.target.z + Math.cos(this.yaw) * horizontal,
    );
    const collision = cameraPosition(this.target, desired, this.cameraBoxes, terrainHeight);
    // Approach an obstruction immediately; interpolate only the target. This
    // prevents smoothing the camera through a wall during a sudden orbit.
    this.camera.position.copy(collision.position);
    this.cameraDistance = collision.distance;
    this.cameraObstructed = collision.blocked;
    this.camera.lookAt(this.target);
    this.sun.position.set(this.target.x - 30, 50, this.target.z + 15);
    this.sun.target.position.copy(this.target);
    this.sun.target.updateMatrixWorld();
    this.renderer.render(this.scene, this.camera);
    (window as unknown as { edfMetrics: unknown }).edfMetrics = {
      drawCalls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      geometry: this.renderer.info.memory.geometries,
      simulationDtMs: Math.round(dt * 10000) / 10,
      faction: this.faction,
      quality: this.economical ? "economy" : "standard",
      economical: this.economical,
      localPlayerX: local?.x ?? null,
      localPlayerZ: local?.z ?? null,
      pixelRatio: this.renderer.getPixelRatio(),
      reducedEffects: this.reducedEffects,
      activeEffects: this.effects.length,
      cameraDistance: Math.round(this.cameraDistance*100)/100,
      cameraObstructed: this.cameraObstructed,
      asset: this.scenery.assetState(),
    };
  }
  private disposeActor(a: Actor) {
    a.root.traverse((o) => {
      if (o instanceof T.Mesh) {
        o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m.dispose());
      }
      if (o instanceof T.Sprite) disposeLabel(o);
    });
  }
}
