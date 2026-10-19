"""Build an isolated, neutral anatomy study from the delivered Blender source.

Blender 4.3.2: blender -b --threads 2 --python build_study.py -- --evidence DIR
Never exports or writes runtime assets, saves, original .blend or textures.
"""
from pathlib import Path
import argparse, ast, hashlib, importlib.util, json, math, sys
import bpy
from mathutils import Vector, Matrix

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent
parser = argparse.ArgumentParser()
parser.add_argument('--blend', default=str(HERE/'naquiro-anatomia-002.blend'))
parser.add_argument('--evidence', required=True)
args = parser.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
E = Path(args.evidence); E.mkdir(parents=True, exist_ok=True)
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
source_hashes = {n:sha(SOURCE/n) for n in ['base.blend', 'naquiro-male.blend', 'model.py', 'rig_export.py']}
study_hashes = {n:sha(HERE/n) for n in ['build_study.py','anatomy_body.py','anatomy_head.py']}
bpy.ops.wm.open_mainfile(filepath=str(SOURCE/'base.blend'))

def collection(name):
    c = bpy.data.collections.new(name); bpy.context.scene.collection.children.link(c); return c

archive = collection('00_CHECKPOINT_001_OCULTO')
originals = list(bpy.context.scene.objects)
for ob in originals:
    for c in list(ob.users_collection): c.objects.unlink(ob)
    archive.objects.link(ob)
archive.hide_render = archive.hide_viewport = True
archive['source_sha256'] = source_hashes['base.blend']
archive['note'] = 'Original source objects, costume and accessories retained unchanged in a hidden collection.'
body_collection = collection('01_CORPO_BASE_NEUTRO')
head_collection = collection('02_CABECA_E_MEMBRANAS')
rig_collection = collection('03_RIG_ESTUDO_NAO_RUNTIME')
baseline_collection = collection('80_COMPARACAO_001_NEUTRA_OCULTA')
wire_collection = collection('90_WIREFRAME_CAGE_OCULTO')
studio = collection('99_ESTUDIO_NEUTRO')

def material(name, value, roughness=.73):
    m = bpy.data.materials.new(name); m.use_nodes = True
    m.diffuse_color = (value, value, value, 1)
    p = m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (value, value, value, 1)
    p.inputs['Roughness'].default_value = roughness
    return m

clay = material('ESTUDO_Cinza_Neutro_Sem_Mapas', .32)
eye_clay = material('ESTUDO_Olhos_Cinza_Neutro', .40, .70)
dark = material('ESTUDO_Wireframe_Cinza_Escuro', .035)
floor_mat = material('ESTUDO_Fundo_Cinza', .15, .9)

def module(name):
    spec = importlib.util.spec_from_file_location(name, HERE/(name+'.py'))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); return mod

body_mod, head_mod = module('anatomy_body'), module('anatomy_head')
body_result = body_mod.build_body(clay, body_collection)
body, body_meta = body_result
head_objects, head_meta = head_mod.build_head(clay, eye_clay, head_collection)
head = bpy.data.objects[head_meta['main_mesh']]
assert body.type == head.type == 'MESH'

def center(indices):
    return sum((body.data.vertices[i].co.copy() for i in indices),Vector())/len(indices)

# Capture the authored joint loops before neck welding changes any indices.
joint_targets={}
for side,data in body_meta['limb_loops'].items():
    ar,lr=data['arm_rings'],data['leg_rings']
    joint_targets[side]={'shoulder':Vector(((1 if side=='L' else -1)*.286,.020,1.735)),'elbow':center(ar[7]),
                         'wrist':center(ar[-1]),'knee':center(lr[6]),
                         'ankle':center(lr[14])}
digit_targets={}
for data in body_meta['hand_data']:
    side=data['side'];digit_targets[side]={}
    for k,digit in enumerate(data['fingers'],1):
        digit_targets[side]['finger'+str(k)]=[center(digit['root']),center(digit['rings'][5]),center(digit['rings'][-1])]
    d=data['thumb'];digit_targets[side]['thumb']=[center(d['root']),center(d['rings'][5]),center(d['rings'][-1])]
    joint_targets[side]['palm']=sum((v[0] for key,v in digit_targets[side].items() if key!='thumb'),Vector())/4
for data in body_meta['foot_data']:
    side=data['side']
    joint_targets[side]['toe_root']=sum((center(d['root']) for d in data['toes']),Vector())/4
    joint_targets[side]['toe_tip']=sum((center(d['rings'][-1]) for d in data['toes']),Vector())/4

# Join only the intentional coincident neck boundaries. No voxel remeshing or
# global merge that could destroy eyelids, finger gaps or membrane borders.
body_loop = list(body_meta['neck_loop']); head_loop = list(head_meta['neck_loop'])
assert len(body_loop) == len(head_loop) >= 16
boundary_distance = max((body.matrix_world@body.data.vertices[a].co - head.matrix_world@head.data.vertices[b].co).length for a,b in zip(body_loop,head_loop))
assert boundary_distance < 1e-5, ('Neck boundary coordinates disagree', boundary_distance)
for ob, indices in [(body,body_loop),(head,head_loop)]:
    g = ob.vertex_groups.new(name='ESTUDO_Solda_Pescoco'); g.add(indices,1,'REPLACE')
bpy.ops.object.select_all(action='DESELECT')
body.select_set(True); head.select_set(True); bpy.context.view_layer.objects.active=body
bpy.ops.object.join()
body.name = 'Corpo_Base_002_Continuo'
import bmesh
bm = bmesh.new(); bm.from_mesh(body.data); bm.verts.ensure_lookup_table()
layer = bm.verts.layers.deform.verify(); gid = body.vertex_groups['ESTUDO_Solda_Pescoco'].index
boundary = [v for v in bm.verts if v[layer].get(gid,0)>.5]
before_neck = len(boundary)
bmesh.ops.remove_doubles(bm, verts=boundary, dist=1e-5)
bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
bm.to_mesh(body.data); bm.free(); body.data.update()
body['neck_weld'] = f'{before_neck} coincident boundary vertices welded; no whole-mesh remesh.'
body['source_scope'] = 'Neutral anatomy study. Runtime and source001 are untouched.'

# Read only the pure weight functions from the existing exporter. Executing the
# exporter itself would write runtime files, so it is deliberately not imported.
with bpy.data.libraries.load(str(SOURCE/'naquiro-male.blend'), link=False) as (src,dst):
    dst.objects = ['NaquiroRig']
rig = dst.objects[0]
assert rig is not None
rig_collection.objects.link(rig); rig.name='Rig_Anatomia_002_Estudo'
rig.animation_data_clear(); rig.show_in_front=True;rig.matrix_world=Matrix.Identity(4)
for pb in rig.pose.bones:
    pb.rotation_mode='QUATERNION';pb.matrix_basis=Matrix.Identity(4)
    pb.location=(0,0,0);pb.scale=(1,1,1);pb.rotation_quaternion=(1,0,0,0)
rig['inherited_pose_cleared']='All transforms neutralized; no Idle grounding offsets inherited.'
rig['scope']='Study of shoulders/elbows/knees. Does not replace the delivered runtime rig or Actions.'
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True);bpy.context.view_layer.objects.active=rig
bpy.ops.object.mode_set(mode='EDIT')
def edit_bone(name,head,tail):
    b=rig.data.edit_bones[name];b.head=head;b.tail=tail
neck_z=head_meta['neck_boundary']['z']
edit_bone('neck',(0,0,1.79),(0,.015,neck_z))
edit_bone('head',(0,.015,neck_z),(0,.028,2.25))
for side,p in joint_targets.items():
    sign=1 if side=='L' else -1
    edit_bone('clavicle_'+side,(0,.02,1.735),p['shoulder'])
    edit_bone('upperarm_'+side,p['shoulder'],p['elbow'])
    edit_bone('forearm_'+side,p['elbow'],p['wrist'])
    edit_bone('hand_'+side,p['wrist'],p['palm'])
    edit_bone('thigh_'+side,(sign*.145,.016,1.05),p['knee'])
    edit_bone('shin_'+side,p['knee'],p['ankle'])
    edit_bone('foot_'+side,p['ankle'],p['toe_root'])
    edit_bone('toe_'+side,p['toe_root'],p['toe_tip'])
    edit_bone('ear_'+side,(sign*.110,.015,2.11),(sign*.20,.08,2.17))
    for name,(root,mid,tip) in digit_targets[side].items():
        edit_bone(name+'_01_'+side,root,mid)
        edit_bone(name+'_02_'+side,mid,tip)
bpy.ops.object.mode_set(mode='OBJECT')
for pb in rig.pose.bones:pb.matrix_basis=Matrix.Identity(4)
segments = {b.name:(b.head_local.copy(),b.tail_local.copy()) for b in rig.data.bones}
tree = ast.parse((SOURCE/'rig_export.py').read_text())
pure = ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in ['dist_segment','weights']], type_ignores=[])
namespace={'Vector':Vector,'segments':segments}
exec(compile(pure,'original_weight_functions_readonly','exec'),namespace)
weights = namespace['weights']
anatomy_objects = [o for c in [body_collection,head_collection] for o in c.objects if o.type=='MESH']
for ob in anatomy_objects:
    if ob == body: region='body'
    else: region=str(ob.get('edf_region','head'))
    for g in list(ob.vertex_groups):
        if g.name != 'ESTUDO_Solda_Pescoco': ob.vertex_groups.remove(g)
    groups={n:ob.vertex_groups.new(name=n) for n in segments if n!='root'}
    for v in ob.data.vertices:
        if ob.name.startswith('Membrana_Mao_'):
            _,_,side,number=ob.name.split('_');k=int(number.split('.')[0])
            u=(v.index%9)/8;t=(v.index//9)/6
            at=t*(.64-.30*math.sin(math.pi*u))
            distal=max(0,min(1,(at-.32)/.28))
            assigned=[(f'finger{k}_01_{side}',(1-u)*(1-distal)),
                      (f'finger{k}_02_{side}',(1-u)*distal),
                      (f'finger{k+1}_01_{side}',u*(1-distal)),
                      (f'finger{k+1}_02_{side}',u*distal)]
        elif ob.name.startswith('Membrana_Pe_'):
            side=ob.name.split('_')[2];t=(v.index//9)/6
            assigned=[('foot_'+side,1-.65*t),('toe_'+side,.65*t)]
        else: assigned=weights(ob.matrix_world@v.co,region)
        for n,w in assigned:
            if w>0: groups[n].add([v.index],w,'REPLACE')
    mod=ob.modifiers.new('Deformacao_de_Estudo','ARMATURE'); mod.object=rig
    mod.use_deform_preserve_volume=True
    # Skin must precede subdivision; the editable cage remains available.
    while ob.modifiers.find(mod.name)>0:
        index=ob.modifiers.find(mod.name)
        if ob.modifiers[index-1].type not in ['SUBSURF']: break
        bpy.context.view_layer.objects.active=ob
        bpy.ops.object.modifier_move_up(modifier=mod.name)
    ob['deformation_limit']='Distance-envelope study weights; manual corrective weighting/poses still require review.'

# A neutral material-only comparison, at the same cameras and scale. No old
# clothing, hair or jewelry is shown. Original objects themselves stay archived.
for src in originals:
    if src.type!='MESH': continue
    region=str(src.get('edf_region',''))
    if region not in ['body','head'] and not region.startswith(('ear.','hand.','foot.')): continue
    names=[m.name.lower() for m in src.data.materials if m]
    if any(any(s in n for s in ['cobre','couro','tecido','cabelo']) for n in names) and not src.name.startswith(('Pupila','Narina','Linha_Oral')): continue
    ob=src.copy(); ob.data=src.data.copy(); baseline_collection.objects.link(ob); ob.name='ANTES001_'+src.name
    ob.hide_render=False; ob.hide_set(False); ob.data.materials.clear(); ob.data.materials.append(clay)
    for f in ob.data.polygons:f.material_index=0
baseline_collection.hide_render=baseline_collection.hide_viewport=True

# True control-cage wireframe, from the actual polygon edges, not a painted
# texture. Subdivision is disabled on the cage view; count both in inspection.
for src in anatomy_objects:
    ob=src.copy(); ob.data=src.data.copy(); wire_collection.objects.link(ob); ob.name='CAGE_'+src.name
    for m in list(ob.modifiers):
        if m.type!='ARMATURE': ob.modifiers.remove(m)
    ob.data.materials.clear(); ob.data.materials.append(clay); ob.data.materials.append(dark)
    for f in ob.data.polygons:f.material_index=0
    w=ob.modifiers.new('Arestas_Reais_Cage','WIREFRAME');w.thickness=.0007;w.use_replace=False;w.offset=1;w.material_offset=1
wire_collection.hide_render=wire_collection.hide_viewport=True

def move_to(ob,c):
    for previous in list(ob.users_collection):previous.objects.unlink(ob)
    c.objects.link(ob)

bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.018))
floor=bpy.context.object;floor.name='ESTUDIO_Chao';move_to(floor,studio);floor.data.materials.append(floor_mat)
world=bpy.data.worlds.new('ESTUDIO_Mundo_Neutro');world.use_nodes=True
world.node_tree.nodes['Background'].inputs[0].default_value=(.13,.13,.13,1)
world.node_tree.nodes['Background'].inputs[1].default_value=.08
scene=bpy.context.scene;scene.world=world
for name,pos,energy,size in [('Key',(-3,-4,5),350,2.4),('Fill',(4,-2,3.5),85,3),('Rim',(2,3,4),250,3)]:
    data=bpy.data.lights.new('ESTUDIO_'+name,'AREA');data.energy=energy;data.shape='DISK';data.size=size
    ob=bpy.data.objects.new(data.name,data);studio.objects.link(ob);ob.location=pos
    ob.rotation_euler=(Vector((0,0,1.25))-ob.location).to_track_quat('-Z','Y').to_euler()

views={
 'front':((0,-6,1.14),(0,0,1.14),2.60),
 'side':((6,0,1.14),(0,0,1.14),2.60),
 'back':((0,6,1.14),(0,0,1.14),2.60),
 'three-quarter':((4,-6,2.1),(0,0,1.14),2.60),
 'face-front':((0,-4,2.09),(0,0,2.09),.43),
 'face-side':((4,0,2.09),(0,0,2.09),.43),
 'face-three-quarter':((2,-4,2.16),(0,0,2.09),.46),
 'shoulder':((1.5,-4,2.3),(.25,0,1.68),.70),
 'hand-dorsal':((.72,-3,1.10),(.70,-.04,1.10),.37),
 'hand-palmar':((.72,3,1.10),(.70,-.04,1.10),.37),
 'feet-dorsal':((.35,-2,1.2),(0,-.10,.09),.80),
 'feet-side':((3,-.05,.20),(.15,-.08,.10),.53),
 'feet-sole':((0,-.10,-3),(0,-.10,.08),.80),
 'ear':((1,-3,2.16),(.16,0,2.13),.34),
}
for name,(pos,target,scale) in views.items():
    data=bpy.data.cameras.new('CAM_'+name);data.type='ORTHO';data.ortho_scale=scale
    ob=bpy.data.objects.new(data.name,data);studio.objects.link(ob);ob.location=pos
    ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler()
scene.camera=bpy.data.objects['CAM_front']
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=8
scene.cycles.use_denoising=False  # Debian Blender build has no OpenImageDenoise.
scene.display.shading.light='STUDIO'
scene.display.shading.color_type='MATERIAL'
scene.display.shading.show_cavity=False
scene.display.shading.show_specular_highlight=False
scene.display.shading.show_shadows=False
scene.display.shading.studio_light='paint.sl'
scene.display.shading.background_type='WORLD'
scene.display.render_aa='16'
scene.render.resolution_x=800;scene.render.resolution_y=1100;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=False
scene.view_settings.view_transform='AgX'
scene['study_id']='EDF-NAQUIRO-ANATOMIA-002'
scene['scope']='Anatomy only; neutral materials; source001 hidden. No runtime export.'
scene['technical_height_not_canonical']=2.25
scene['views']=json.dumps(views)
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            area.spaces.active.shading.type='SOLID';area.spaces.active.shading.color_type='MATERIAL'
            area.spaces.active.shading.show_cavity=False
            area.spaces.active.shading.show_shadows=False
            area.spaces.active.shading.show_specular_highlight=False
            area.spaces.active.shading.light='STUDIO'
            area.spaces.active.shading.studio_light='paint.sl'
            area.spaces.active.region_3d.view_perspective='CAMERA'
bpy.ops.object.select_all(action='DESELECT');body.select_set(True);bpy.context.view_layer.objects.active=body
text=bpy.data.texts.new('LEIA_CORPO_BASE_002')
text.write('Náquiro masculino — estudo anatômico 002\n\nCorpo cinza sem mapas, roupa/cabelo/acessórios ocultos.\nColeção00: checkpoint001 completo, não alterado.\nColeções01/02: nova anatomia. Coleção03: rig de estudo, sem substituir runtime.\nColeção80: comparação001 no mesmo material/luz/câmera.\nColeção90: wireframe do cage real (sem subdivisão).\n\nEste arquivo não exporta sobre o jogo. Abra as câmeras CAM_front/side/back e aproximações.\nPesos são um estudo por envelopes; correções manuais e aceite humano continuam necessários.\nFontes Python e relatório acompanham a entrega.\n')
bpy.ops.file.pack_all()
dest=Path(args.blend);dest.parent.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(dest),compress=True)
assert source_hashes=={n:sha(SOURCE/n) for n in source_hashes}, 'Original source changed unexpectedly'
assert study_hashes=={n:sha(HERE/n) for n in study_hashes}, 'Study sources changed during build; rebuild from a frozen revision'

def safe(value):
    if isinstance(value,dict):return {str(k):safe(v) for k,v in value.items()}
    if isinstance(value,(list,tuple)):return [safe(v) for v in value]
    if value is None or isinstance(value,(str,int,float,bool)):return value
    return getattr(value,'name',str(value))
report={'study_id':scene['study_id'],'blender':bpy.app.version_string,'blend':dest.name,'blend_sha256':sha(dest),'original_sources_unchanged':source_hashes,'study_sources_sha256':study_hashes,'neck_weld':{'coincident_vertices_before':before_neck,'maximum_boundary_error':boundary_distance},'body':safe(body_meta),'head':safe(head_meta),'study_joint_landmarks':safe(joint_targets),'digit_landmarks':safe(digit_targets),'membrane_weights':'Hands: bilinear blend of the two adjacent digits, max4 normalized influences. Feet: foot/toe collective blend.','anatomy_objects':[o.name for o in anatomy_objects],'cameras':views,'neutral_material':'No texture, vertex color, metallic or emissive inputs','archive_hidden':archive.hide_render and archive.hide_viewport,'runtime_exported':False}
(E/'build-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('ANATOMY_STUDY_SAVED',dest,sha(dest))
