"""Render actual Blender study cameras, control cage and diagnostic poses.

No image compositing, simulated poses, texture substitution or runtime writes.
"""
from pathlib import Path
import argparse, hashlib, json, math, sys
import bpy
from mathutils import Vector, Quaternion, Matrix

HERE=Path(__file__).resolve().parent
p=argparse.ArgumentParser()
p.add_argument('--blend',default=str(HERE/'naquiro-anatomia-002.blend'))
p.add_argument('--out',required=True)
p.add_argument('--views',default='front,side,back,three-quarter,face-front,face-side,face-three-quarter,shoulder,hand-dorsal,hand-palmar,feet-dorsal,feet-side,feet-sole,ear')
p.add_argument('--samples',type=int,default=8)
p.add_argument('--engine',choices=['cycles','workbench'],default='cycles')
p.add_argument('--width',type=int,default=800)
p.add_argument('--height',type=int,default=1100)
p.add_argument('--clip-end',type=float,default=None,help='Optional real camera far clipping distance, recorded per image.')
p.add_argument('--mode',choices=['neutral','wire','baseline'],default='neutral')
p.add_argument('--pose',choices=['rest','arms90','arms-up','elbow90','knee90','hand-curl','toe-up'],default='rest')
a=p.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
blend=Path(a.blend).resolve();out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
digest=hashlib.sha256(blend.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(blend))
scene=bpy.context.scene
for name,hide in [('01_CORPO_BASE_NEUTRO',a.mode!='neutral'),('02_CABECA_E_MEMBRANAS',a.mode!='neutral'),('80_COMPARACAO_001_NEUTRA_OCULTA',a.mode!='baseline'),('90_WIREFRAME_CAGE_OCULTO',a.mode!='wire')]:
    c=bpy.data.collections[name];c.hide_render=hide;c.hide_viewport=hide
if a.mode=='wire':
    for ob in bpy.data.collections['90_WIREFRAME_CAGE_OCULTO'].objects:
        for modifier in ob.modifiers:
            if modifier.type=='WIREFRAME': modifier.offset=0
rig=bpy.data.objects['Rig_Anatomia_002_Estudo']
for b in rig.pose.bones:
    b.rotation_mode='QUATERNION';b.matrix_basis=Matrix.Identity(4)
    b.location=(0,0,0);b.scale=(1,1,1);b.rotation_quaternion=(1,0,0,0)
rotations=[]
def rotate(name,axis,degrees):
    b=rig.pose.bones[name]
    local=b.bone.matrix_local.to_quaternion().inverted()@Vector(axis)
    b.rotation_quaternion=Quaternion(local,math.radians(degrees))
    rotations.append({'bone':name,'world_rest_axis':axis,'degrees':degrees})
if a.pose in ['arms90','arms-up']:
    degrees=62 if a.pose=='arms90' else 115
    rotate('upperarm_L',(0,1,0),-degrees);rotate('upperarm_R',(0,1,0),degrees)
elif a.pose=='elbow90':
    rotate('forearm_L',(1,0,0),-90);rotate('forearm_R',(1,0,0),-90)
elif a.pose=='knee90':
    rotate('thigh_L',(1,0,0),-25);rotate('shin_L',(1,0,0),90)
elif a.pose=='hand-curl':
    for side in ['L','R']:
        for digit in range(1,5):
            rotate(f'finger{digit}_01_{side}',(1,0,0),-40)
            rotate(f'finger{digit}_02_{side}',(1,0,0),-45)
elif a.pose=='toe-up':
    rotate('toe_L',(1,0,0),-25);rotate('toe_R',(1,0,0),-25)
bpy.context.view_layer.update()
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=a.samples;scene.cycles.use_denoising=False
if a.engine=='workbench':
    scene.render.engine='BLENDER_WORKBENCH'
    shading=scene.display.shading
    shading.light='STUDIO';shading.color_type='MATERIAL';shading.show_cavity=False
    shading.show_specular_highlight=False;shading.show_shadows=False;shading.background_type='WORLD'
    shading.studio_light='paint.sl'
    scene.view_settings.view_transform='Standard'
    scene.view_settings.look='None'
    scene.display.render_aa='16'
scene.render.resolution_x=a.width;scene.render.resolution_y=a.height;scene.render.resolution_percentage=100
records=[]
for view in a.views.split(','):
    camera=bpy.data.objects['CAM_'+view];scene.camera=camera
    # Rest comparison cameras retain their identical authored scale. A posed
    # full-body study needs enough frame for raised arms and extended fingers.
    if a.pose!='rest' and view in ['front','side','back','three-quarter']:
        points=[];inverse=camera.matrix_world.inverted()
        for collection_name in ['01_CORPO_BASE_NEUTRO','02_CABECA_E_MEMBRANAS']:
            for ob in bpy.data.collections[collection_name].objects:
                if ob.type!='MESH': continue
                evaluated=ob.evaluated_get(bpy.context.evaluated_depsgraph_get())
                mesh=evaluated.to_mesh()
                points.extend(inverse@(evaluated.matrix_world@v.co) for v in mesh.vertices)
                evaluated.to_mesh_clear()
        lo=[min(p[k] for p in points) for k in (0,1)]
        hi=[max(p[k] for p in points) for k in (0,1)]
        camera.data.ortho_scale=1.10*max(hi[1]-lo[1],(hi[0]-lo[0])*a.height/a.width)
        camera.location+=camera.matrix_world.to_quaternion()@Vector(((lo[0]+hi[0])/2,(lo[1]+hi[1])/2,0))
        bpy.context.view_layer.update()
    if a.clip_end is not None:
        if a.clip_end<=camera.data.clip_start:
            raise ValueError('Far clipping distance must exceed near clipping distance')
        camera.data.clip_end=a.clip_end
    bpy.data.objects['ESTUDIO_Chao'].hide_render=(view=='feet-sole')
    file=out/f'{a.mode}-{a.pose}-{view}.png';scene.render.filepath=str(file)
    bpy.ops.render.render(write_still=True)
    records.append({'file':file.name,'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'camera':camera.name,'type':camera.data.type,'orthographic_scale':camera.data.ortho_scale,'clip_start':camera.data.clip_start,'clip_end':camera.data.clip_end,'location':list(camera.location),'rotation_euler':list(camera.rotation_euler)})
report={'blend_sha256':digest,'blender':bpy.app.version_string,'mode':a.mode,'pose':a.pose,'pose_rotations':rotations,'resolution':[a.width,a.height],'samples':a.samples if a.engine=='cycles' else None,'renderer':'Cycles CPU; actual neutral study materials' if a.engine=='cycles' else 'Blender Workbench paint.sl studio; material gray, Standard color, shadows/cavity/specular disabled, no texture or postprocessing','cage_method':'Actual mesh polygon edges via Wireframe modifier offset=0 for both sides of thin surfaces, Subsurf disabled' if a.mode=='wire' else None,'posed_full_body_camera_fit':'Evaluated geometry bounds with 10 percent margin' if a.pose!='rest' else None,'images':records,'source_blend_unchanged':hashlib.sha256(blend.read_bytes()).hexdigest()==digest}
(out/f'render-{a.mode}-{a.pose}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('RENDER_STUDY_OK',len(records),a.mode,a.pose,digest)
