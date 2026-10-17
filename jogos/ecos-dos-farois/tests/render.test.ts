import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { assetSlot } from "../client/src/render-assets.js";
import * as T from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { cameraPosition } from "../client/src/render-camera.js";
import { animate, warrior } from "../client/src/models.js";
import { CLASS_IDS, FACTION_RACES } from "../shared/identity.js";

const flat = () => 0;
test("camera volume stops before a wall and its corner without changing player coordinates", () => {
  const player = new T.Vector3(0,1.4,0), desired = new T.Vector3(0,3,10);
  const wall = new T.Box3(new T.Vector3(-2,0,4),new T.Vector3(2,8,6));
  const result = cameraPosition(player,desired,[wall],flat);
  assert.equal(result.blocked,true);
  assert.ok(result.position.z < 3.69);
  assert.ok(!wall.containsPoint(result.position));
  assert.deepEqual(player.toArray(),[0,1.4,0]);
  // A centre ray at x=2.2 misses this wall, but the camera body must not.
  const corner = cameraPosition(new T.Vector3(2.2,1.4,0),new T.Vector3(2.2,3,10),[wall],flat);
  assert.equal(corner.blocked,true);
});
test("camera detects a ridge along the path and stays finite at collider boundaries", () => {
  const ridge = (x:number,z:number) => z > 4 && z < 6 ? 5 : 0;
  assert.equal(cameraPosition(new T.Vector3(0,1.5,0),new T.Vector3(0,3,10),[],ridge).blocked,true);
  const box = new T.Box3(new T.Vector3(-1,0,-1),new T.Vector3(1,8,1));
  const inside = cameraPosition(new T.Vector3(0,1.4,0),new T.Vector3(0,3,10),[box],flat);
  assert.ok(inside.distance <= .45);
  assert.ok(inside.position.toArray().every(Number.isFinite));
  const clear = cameraPosition(new T.Vector3(0,1.5,0),new T.Vector3(0,3,10),[],flat);
  assert.equal(clear.blocked,false);
  assert.deepEqual(clear.position.toArray(),[0,3,10]);
});
test("all sixteen visual race/class kits animate with finite geometry and bounded render parts", () => {
  // Visual identity may change silhouette, never gameplay data.
  const signatures = new Set<string>();
  for (const race of [...FACTION_RACES.vigilia,...FACTION_RACES.confluencia]) for (const klass of CLASS_IDS) {
    const actor = warrior(0x315e7c,false,race,klass,1);
    animate(actor,true,2.5);
    actor.root.updateMatrixWorld(true);
    const bounds = new T.Box3().setFromObject(actor.root);
    assert.ok(bounds.max.y > 1.5 && bounds.max.y < 3.4);
    let meshes = 0, triangles = 0;
    actor.root.traverse(o => {
      if (!(o instanceof T.Mesh)) return;
      meshes++;
      triangles += (o.geometry.index?.count ?? o.geometry.attributes.position.count)/3;
      const position = o.geometry.attributes.position;
      for(let i=0;i<position.count;i++)
        assert.ok(Number.isFinite(position.getX(i)) && Number.isFinite(position.getY(i)) && Number.isFinite(position.getZ(i)));
      o.geometry.dispose();
      for(const m of Array.isArray(o.material)?o.material:[o.material]) m.dispose();
    });
    assert.ok(meshes <= 24, `unbatched kit: ${race}/${klass}: ${meshes}`);
    assert.ok(triangles < 30000, `over-budget kit: ${race}/${klass}: ${triangles}`);
    signatures.add(`${race}/${klass}:${bounds.max.y.toFixed(2)}`);
    assert.equal(actor.root.userData.artStatus,"provisional-original-procedural");
  }
  assert.equal(signatures.size,16);
});
test("distributed original glTF parses as actual geometry with provenance and no external asset host", async () => {
  const text = await readFile(new URL("../client/public/art/resonator.gltf",import.meta.url),"utf8");
  const json = JSON.parse(text);
  assert.equal(json.asset.version,"2.0");
  assert.match(json.asset.copyright,/Original geometry/);
  // The production CSP permits same-origin requests, not data: fetches.
  assert.ok(json.buffers.every((b:{uri:string})=>b.uri === "resonator.bin"));
  const buffer = await readFile(new URL("../client/public/art/resonator.bin",import.meta.url));
  assert.equal(buffer.length,json.buffers[0].byteLength);
  const http = createServer((request,response) => {
    if(request.url === "/resonator.bin") response.end(buffer);
    else {response.statusCode=404;response.end();}
  });
  await new Promise<void>(resolve => http.listen(0,"127.0.0.1",resolve));
  const address = http.address(); assert.ok(address && typeof address!=="string");
  // Three's fetch loader uses this browser event for binary loading.
  // Node 24 has fetch but no ProgressEvent; supply only that DOM event here.
  const prior = globalThis.ProgressEvent;
  if (!prior) Object.defineProperty(globalThis,"ProgressEvent",{configurable:true,value:class extends Event {
    lengthComputable: boolean; loaded:number; total:number;
    constructor(type:string,init:ProgressEventInit={}) {super(type); this.lengthComputable=!!init.lengthComputable;this.loaded=init.loaded??0;this.total=init.total??0;}
  }});
  let gltf;
  try { gltf = await new GLTFLoader().parseAsync(text,`http://127.0.0.1:${address.port}/`); }
  finally {
    if(!prior) Reflect.deleteProperty(globalThis,"ProgressEvent");
    await new Promise<void>((resolve,reject)=>http.close(error=>error?reject(error):resolve()));
  }
  let count = 0;
  gltf.scene.traverse(o => {if(o instanceof T.Mesh) {count++; o.geometry.computeBoundingBox(); assert.ok(o.geometry.boundingBox?.max.y! > o.geometry.boundingBox?.min.y!);}});
  assert.equal(count,5);
  const box = new T.Box3().setFromObject(gltf.scene);
  assert.ok(box.max.y > 1 && box.max.y < 1.2);
});

test("asset loading replaces fallback only on success and retains it on HTTP failure", async () => {
  const body = await readFile(new URL("../client/public/art/resonator.gltf",import.meta.url));
  const buffer = await readFile(new URL("../client/public/art/resonator.bin",import.meta.url));
  const http = createServer((request,response) => {
    if(request.url === "/good.gltf") {response.setHeader("content-type","model/gltf+json");response.end(body);}
    else if(request.url === "/resonator.bin") {response.setHeader("content-type","application/octet-stream");response.end(buffer);}
    else {response.statusCode=404;response.end("unavailable");}
  });
  await new Promise<void>(resolve => http.listen(0,"127.0.0.1",resolve));
  const address = http.address(); assert.ok(address && typeof address!=="string");
  const prior = globalThis.ProgressEvent;
  if(!prior) Object.defineProperty(globalThis,"ProgressEvent",{configurable:true,value:class extends Event {
    constructor(type:string,_init:ProgressEventInit={}) {super(type);}
  }});
  try {
    const fallback = new T.Group(); fallback.name="local-procedural-fallback";
    const missing = assetSlot(fallback,`http://127.0.0.1:${address.port}/missing.gltf`);
    await missing.ready;
    assert.equal(missing.root.userData.assetState,"fallback");
    assert.equal(missing.root.children[0],fallback);
    const loaded = assetSlot(new T.Group(),`http://127.0.0.1:${address.port}/good.gltf`);
    await loaded.ready;
    assert.equal(loaded.root.userData.assetState,"loaded");
    let meshes=0; loaded.root.traverse(o=>{if(o instanceof T.Mesh) meshes++;});
    assert.equal(meshes,5);
    const disposed = assetSlot(new T.Group(),`http://127.0.0.1:${address.port}/good.gltf`);
    disposed.dispose(); await disposed.ready;
    assert.equal(disposed.root.children.length,0,"late load must not resurrect a disposed scene");
    loaded.dispose(); missing.dispose();
  } finally {
    if(!prior) Reflect.deleteProperty(globalThis,"ProgressEvent");
    await new Promise<void>((resolve,reject)=>http.close(error=>error?reject(error):resolve()));
  }
});
