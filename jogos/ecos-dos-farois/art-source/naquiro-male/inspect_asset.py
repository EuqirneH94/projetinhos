"""Read actual glTF accessors: finite data, normalized skin, animated poses.
Python 3 standard library only. This is structural evidence, not artistic approval.
"""
import argparse, json, struct, math, hashlib
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('asset');parser.add_argument('--report');args=parser.parse_args()
p=Path(args.asset).resolve();root=p.parent;binary=None
content=p.read_bytes()
if content[:4]==b'glTF':
    magic,version,length=struct.unpack_from('<III',content)
    assert version==2 and length==len(content),'Invalid GLB header'
    cursor=12;doc=None
    while cursor<length:
        size,kind=struct.unpack_from('<II',content,cursor);cursor+=8
        chunk=content[cursor:cursor+size];assert len(chunk)==size;cursor+=size
        if kind==0x4E4F534A:doc=json.loads(chunk)
        elif kind==0x004E4942:binary=chunk
    assert doc is not None and binary is not None,'GLB needs JSON and BIN chunks'
else:doc=json.loads(content)
def external(uri):
    q=(root/uri).resolve()
    assert q.is_relative_to(root) and ':' not in uri and not uri.startswith('/'),uri
    return q.read_bytes()
buffers=[]
for b in doc.get('buffers',[]):
    data=external(b['uri']) if 'uri'in b else binary
    assert data is not None and len(data)>=b['byteLength'];buffers.append(data)
components={5120:('b',1),5121:('B',1),5122:('h',2),5123:('H',2),5125:('I',4),5126:('f',4)}
shapes={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT2':4,'MAT3':9,'MAT4':16}
def accessor(i):
    a=doc['accessors'][i];v=doc['bufferViews'][a['bufferView']];fmt,size=components[a['componentType']];n=shapes[a['type']]
    off=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',n*size);data=buffers[v['buffer']]
    rows=[struct.unpack_from('<'+fmt*n,data,off+j*stride) for j in range(a['count'])]
    if a.get('normalized') and a['componentType']!=5126:
        div={5120:127,5121:255,5122:32767,5123:65535}[a['componentType']]
        rows=[tuple(max(-1,x/div) for x in row) for row in rows]
    assert all(math.isfinite(x) for row in rows for x in row),f'Nonfinite accessor {i}'
    return rows
allacc=[accessor(i) for i in range(len(doc.get('accessors',[])))]
clips={a['name']:a for a in doc.get('animations',[])}
expected={'Idle','Walk','Run','Jump','Land','Attack','Cast','Hit','Death','Recover','Swim'}
assert set(clips)==expected,sorted(clips)
clipstats=[]
for name,a in clips.items():
    varied=0;duration=0
    for s in a['samplers']:
        times=allacc[s['input']];values=allacc[s['output']]
        assert times and len(values)==len(times)*(3 if s.get('interpolation')=='CUBICSPLINE' else 1),name
        # Exporters correctly collapse constant translation/scale tracks to a
        # single key. Varying rotation tracks still need a positive duration.
        assert len(times)==1 or times[-1][0]>times[0][0],name
        assert all(times[j][0]<=times[j+1][0] for j in range(len(times)-1)),name
        duration=max(duration,times[-1][0]-times[0][0]);varied+=int(any(any(abs(x-y)>1e-5 for x,y in zip(v,values[0])) for v in values[1:]))
    assert duration>0 and varied>=3,f'{name} has too few evaluated changing channels: {varied}'
    for ch in a['channels']:
        node=doc['nodes'][ch['target']['node']]
        if node.get('name')=='root':
            s=a['samplers'][ch['sampler']];values=allacc[s['output']]
            assert all(all(abs(x-y)<1e-6 for x,y in zip(v,values[0])) for v in values),f'Root motion in {name}'
    clipstats.append({'name':name,'duration':duration,'channels':len(a['channels']),'varying_channels':varied})
triangles=0;vertices=0;skinned=0;blended=0;maxerr=0;meshstats=[];colorstats=[]
for m in doc.get('meshes',[]):
    for prim in m['primitives']:
        at=prim['attributes'];pos=allacc[at['POSITION']];vertices+=len(pos)
        assert 'TEXCOORD_0'in at,m['name']
        assert 'JOINTS_0'in at and 'WEIGHTS_0'in at,m['name']
        assert 'COLOR_0'in at,m['name']
        colors=allacc[at['COLOR_0']];assert len(colors)==len(pos)
        assert all(all(0<=v<=1 for v in row) for row in colors),('Invalid glTF vertex color range',m['name'])
        material=doc['materials'][prim['material']]['name']
        colorstats.append({'mesh':m['name'],'material':material,
            'linear_min_rgba':[min(r[i] for r in colors) for i in range(4)],
            'linear_max_rgba':[max(r[i] for r in colors) for i in range(4)],
            'linear_mean_rgba':[sum(r[i] for r in colors)/len(colors) for i in range(4)],
            'component_type':doc['accessors'][at['COLOR_0']]['componentType'],
            'normalized':doc['accessors'][at['COLOR_0']].get('normalized',False)})
        # This asset's skin pigment is already supplied by the blue base-color
        # texture. Its vertex colors are pale linear tints. HDR values used to
        # wrap at unsigned-short export, producing blue values near zero and a
        # dark green face while staying inside the superficial [0,1] test.
        if 'Pele_Escamas' in material:
            assert min(min(row[:3]) for row in colors)>=.5,('Wrapped skin vertex tint',m['name'])
        uv=allacc[at['TEXCOORD_0']];assert len(uv)==len(pos)
        weights=allacc[at['WEIGHTS_0']];joints=allacc[at['JOINTS_0']]
        assert len(weights)==len(joints)==len(pos)
        err=max(abs(sum(w)-1) for w in weights);maxerr=max(maxerr,err);assert err<1e-4,(m['name'],err)
        assert all(all(w>=0 for w in row) for row in weights)
        skin_count=max(len(s['joints']) for s in doc['skins']);assert all(all(j<skin_count for j in row) for row in joints)
        blended+=sum(sum(w>.02 for w in row)>1 for row in weights);skinned+=len(weights)
        ix=allacc[prim['indices']] if 'indices'in prim else [(i,) for i in range(len(pos))]
        assert all(row[0]<len(pos) for row in ix)
        count=len(ix)//3;triangles+=count;meshstats.append({'mesh':m['name'],'triangles':count,'vertices':len(pos),'blended_vertices':sum(sum(w>.02 for w in row)>1 for row in weights)})
assert blended>0,'Skin has only rigid weights'
images=[]
for image in doc.get('images',[]):
    uri=image.get('uri',f"bufferView:{image.get('bufferView')}")
    if 'uri'in image:content=external(uri)
    else:
        v=doc['bufferViews'][image['bufferView']];offset=v.get('byteOffset',0);content=buffers[v['buffer']][offset:offset+v['byteLength']]
    assert content[:8]==b'\x89PNG\r\n\x1a\n',uri
    w,h=struct.unpack('>II',content[16:24]);assert 0<w<=2048 and 0<h<=2048,(uri,w,h)
    images.append({'uri':uri,'width':w,'height':h,'bytes':len(content)})
assert triangles<=30000,('Triangle budget exceeded',triangles)
assert len(doc.get('materials',[]))<=6,'Material budget exceeded'
assert all(len(s['joints'])<=80 for s in doc['skins']),'Skeleton budget exceeded'
assert len(doc.get('meshes',[]))<=6,'Mesh batching budget exceeded'
result={'asset':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'triangles':triangles,'vertices':vertices,
        'skinned_vertices':skinned,'blended_vertices':blended,'maximum_weight_sum_error':maxerr,
        'materials':len(doc.get('materials',[])),'skins':len(doc['skins']),
        'joint_counts':[len(s['joints']) for s in doc['skins']],'images':images,'clips':clipstats,'meshes':meshstats,
        'vertex_colors':colorstats,
        'scope':'Actual exported buffer validation. Does not approve anatomy, clipping, aesthetics or physical GPU performance.'}
if args.report:Path(args.report).write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
