"""Compare decoded exported GLTF bytes and palettes before/after tint correction."""
import json,struct,hashlib
from pathlib import Path
HERE=Path(__file__).resolve().parent
BEFORE=HERE/'before/naquiro-male.gltf'
AFTER=Path('/workspace/projetinhos/jogos/ecos-dos-farois/client/public/art/characters/naquiro/naquiro-male.gltf')
def load(path):
    doc=json.loads(path.read_text());buf=[(path.parent/b['uri']).read_bytes() for b in doc['buffers']]
    def acc(i):
        a=doc['accessors'][i];v=doc['bufferViews'][a['bufferView']]
        fmt,size={5120:('b',1),5121:('B',1),5122:('h',2),5123:('H',2),5125:('I',4),5126:('f',4)}[a['componentType']]
        n={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}[a['type']]
        data=buf[v['buffer']];offset=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',n*size)
        raw=b''.join(data[offset+j*stride:offset+j*stride+n*size] for j in range(a['count']))
        rows=[struct.unpack_from('<'+fmt*n,raw,j*n*size) for j in range(a['count'])]
        if a.get('normalized'):rows=[tuple(x/{5120:127,5121:255,5122:32767,5123:65535}[a['componentType']] for x in r) for r in rows]
        return {'data_sha256':hashlib.sha256(raw).hexdigest(),'count':a['count'],'componentType':a['componentType'],'normalized':a.get('normalized',False),'type':a['type']},rows
    return doc,acc
old,oa=load(BEFORE);new,na=load(AFTER)
assert len(old['meshes'])==len(new['meshes'])
checks=[];palettes=[];tangent_recalculation=[]
for mi,(om,nm) in enumerate(zip(old['meshes'],new['meshes'])):
    for pi,(op,np) in enumerate(zip(om['primitives'],nm['primitives'])):
        assert set(op['attributes'])==set(np['attributes'])
        for semantic in op['attributes']:
            if semantic=='COLOR_0':continue
            os,ov=oa(op['attributes'][semantic]);ns,nv=na(np['attributes'][semantic])
            if semantic=='TANGENT' and os!=ns:
                # Tangents are recalculated by Blender's exporter. Preserve and
                # disclose the one measured 1e-4 component difference; do not
                # rewrite exported binary bytes to manufacture exact equality.
                different=[{'vertex':i,'before':a,'after':b,'maximum_absolute_delta':max(abs(x-y) for x,y in zip(a,b))} for i,(a,b) in enumerate(zip(ov,nv)) if a!=b]
                assert len(ov)==len(nv) and len(different)==1
                assert max(r['maximum_absolute_delta'] for r in different)<=.00011
                tangent_recalculation.extend(different)
                checks.append({'mesh':mi,'primitive':pi,'semantic':semantic,'identical':False,'data_sha256':ns['data_sha256'],'reason':'Blender tangent recalculation; one component differs by 1e-4; geometry and normals unchanged'})
            else:
                assert os==ns,(mi,pi,semantic,os,ns)
                checks.append({'mesh':mi,'primitive':pi,'semantic':semantic,'identical':True,'data_sha256':ns['data_sha256']})
        assert oa(op['indices'])[0]==na(np['indices'])[0],(mi,'indices')
        os,oc=oa(op['attributes']['COLOR_0']);ns,nc=na(np['attributes']['COLOR_0'])
        def palette(rows):
            return {'min_rgba':[min(r[i] for r in rows) for i in range(4)],'max_rgba':[max(r[i] for r in rows) for i in range(4)],'mean_rgba':[sum(r[i] for r in rows)/len(rows) for i in range(4)]}
        material=new['materials'][np['material']]['name']
        palettes.append({'mesh':nm['name'],'material':material,'before':palette(oc),'after':palette(nc),'changed_rows':sum(o!=n for o,n in zip(oc,nc)),'encoded':ns})
        if 'Pele' in material:assert min(min(r[:3]) for r in nc)>=.5,'Pigmented skin texture requires pale (not wrapped dark) vertex tints'
assert old['materials']==new['materials'],'Materials changed'
assert old['skins']==new['skins'],'Skin bind definitions changed'
for os,ns in zip(old['skins'],new['skins']):assert oa(os['inverseBindMatrices'])[0]==na(ns['inverseBindMatrices'])[0]
assert old['animations']==new['animations'],'Animation track metadata changed'
for animation in old['animations']:
    for sampler in animation['samplers']:
        for key in ('input','output'):
            assert oa(sampler[key])[0]==na(sampler[key])[0],(animation['name'],key)
assert old['nodes']==new['nodes'],'Nodes/bone poses changed'
manifest=json.loads((AFTER.parent/'manifest.json').read_text())
base=Path('/workspace/projetinhos/jogos/ecos-dos-farois/art-source/naquiro-male/base.blend')
assert hashlib.sha256(base.read_bytes()).hexdigest()==manifest['source_base']['sha256']=='257f577ad7ab65a15ff11d8b7c51039b9009352ed0507f80678834c1c5c331da'
result={'source_base_sha256':manifest['source_base']['sha256'],'base_unchanged':True,'vertex_color_sanitization':{k:v for k,v in manifest['vertex_color_sanitization'].items() if k!='attributes'},'geometry_uv_normals_weights_joints':checks,'indices_identical':True,'materials_identical':True,'nodes_and_bone_transforms_identical':True,'skin_bindings_identical':True,'animation_tracks_and_samples_identical':True,'palettes':palettes,'tangent_recalculation_difference':tangent_recalculation}
(HERE/'export-before-after.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
