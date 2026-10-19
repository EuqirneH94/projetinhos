"""Read-only proof that the corrected .blend carries textures and clamped linear tints."""
import bpy,json,hashlib,sys,math
from pathlib import Path
FILE=Path('/workspace/projetinhos/jogos/ecos-dos-farois/art-source/naquiro-male/naquiro-male.blend')
EVIDENCE=Path(__file__).resolve().parent
before=hashlib.sha256(FILE.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(FILE))
images=[]
for image in bpy.data.images:
    if image.source!='FILE':continue
    assert image.packed_file and image.packed_file.size>0,('Unpacked image',image.name)
    images.append({'name':image.name,'width':image.size[0],'height':image.size[1],'packed_bytes':image.packed_file.size,'filepath_is_external_fallback':image.filepath})
assert len(images)==6,images
minimum=[math.inf]*4;maximum=[-math.inf]*4;elements=0;attributes=0
for ob in bpy.data.objects:
    if ob.type!='MESH' or not ob.name.startswith('Naquiro_'):continue
    for attr in ob.data.color_attributes:
        attributes+=1
        for datum in attr.data:
            values=tuple(datum.color)
            assert all(math.isfinite(c) and 0<=c<=1 for c in values),(ob.name,attr.name,values)
            minimum=[min(a,b) for a,b in zip(minimum,values)];maximum=[max(a,b) for a,b in zip(maximum,values)];elements+=1
assert attributes==6 and elements>0,(attributes,elements)
rig=bpy.data.objects['NaquiroRig'];assert len(rig.data.bones)==46
assert len(bpy.data.actions)==11
assert hashlib.sha256(FILE.read_bytes()).hexdigest()==before,'Read-only verification modified the .blend'
report={'file':str(FILE),'sha256':before,'mode':'Opened read-only in Blender 4.3.2; no save, no render, no export','packed_images':images,'all_six_images_packed':True,'linear_vertex_color_attributes':attributes,'linear_vertex_color_elements':elements,'linear_min_rgba':minimum,'linear_max_rgba':maximum,'all_vertex_colors_in_unit_range':True,'bones':len(rig.data.bones),'actions':sorted(a.name for a in bpy.data.actions),'file_unchanged':True,'scope':'Proves file opening and packed resources in cloud Blender; Windows user opening remains pending.'}
(EVIDENCE/'portable-blend.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
