// Original geometry; reproducible without a DCC tool or network. Units: metres.
// Used as an architectural lens, not as an approved final character/rig asset.
import * as T from 'three';
import { writeFileSync, mkdirSync } from 'node:fs';
const chunks = [], bufferViews = [], accessors = [], meshes = [], nodes = [];
let offset = 0;
function attribute(array, type, target, min, max) {
  const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
  chunks.push(bytes); bufferViews.push({buffer:0, byteOffset:offset, byteLength:bytes.length, target});
  offset += bytes.length;
  const result = accessors.length;
  accessors.push({bufferView:bufferViews.length - 1, componentType:5126, count:array.length / 3, type, ...(min ? {min,max} : {})});
  return result;
}
function part(geometry, material, translation, rotation) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  g.computeBoundingBox(); const b = g.boundingBox;
  const POSITION = attribute(g.attributes.position.array, 'VEC3', 34962, b.min.toArray(), b.max.toArray());
  const NORMAL = attribute(g.attributes.normal.array, 'VEC3', 34962);
  meshes.push({primitives:[{attributes:{POSITION,NORMAL},material}]});
  nodes.push({mesh:meshes.length-1, translation, ...(rotation ? {rotation} : {})});
}
const lens = new T.OctahedronGeometry(.7, 0); lens.scale(.8,1.55,.8);
part(lens,0,[0,0,0]);
for(const y of [-.75,.75]) part(new T.ConeGeometry(.17,.32,8),1,[0,y,0]);
for(const angle of [-.5,.5]) {
 const q = new T.Quaternion().setFromEuler(new T.Euler(angle,.4,0));
 part(new T.TorusGeometry(.76,.026,6,48),1,[0,0,0],q.toArray());
}
const gltf = {
 asset:{version:'2.0',generator:'EDF original create-resonator-asset.mjs',copyright:'Original geometry created for Ecos dos Faróis; redistribution with this project permitted.'},
 scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes,
 materials:[
  {name:'Resonance glass (opaque stylized)',pbrMetallicRoughness:{baseColorFactor:[.12,.57,.66,1],metallicFactor:.26,roughnessFactor:.24},emissiveFactor:[.025,.18,.22]},
  {name:'Aged brass',pbrMetallicRoughness:{baseColorFactor:[.58,.36,.13,1],metallicFactor:.68,roughnessFactor:.38}}
 ],
 // Same-origin binary buffer works with the server's strict connect-src self.
 // Embedded data: buffers are fetched by GLTFLoader and are blocked by that CSP.
 accessors,bufferViews,buffers:[{byteLength:offset,uri:'resonator.bin'}]
};
mkdirSync('client/public/art',{recursive:true});
writeFileSync('client/public/art/resonator.gltf',JSON.stringify(gltf));
writeFileSync('client/public/art/resonator.bin',Buffer.concat(chunks));
console.log(`Original glTF: ${offset} bytes of geometry, ${meshes.length} meshes`);
