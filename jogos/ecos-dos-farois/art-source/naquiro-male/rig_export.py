"""Original Náquiro pilot rig, skin and animation exporter. Blender 4.3+.
Run: blender --background --python art-source/naquiro-male/rig_export.py
Requires model.py output base.blend. No game/database data is read or written.
"""
from pathlib import Path
import bpy, math, json, hashlib, sys, argparse
import numpy as np
from mathutils import Vector, Euler

HERE=Path(__file__).resolve().parent
PROJECT=HERE.parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--base', default=str(HERE/'base.blend'))
parser.add_argument('--out', default=str(PROJECT/'client/public/art/characters/naquiro'))
parser.add_argument('--blend', default=str(HERE/'naquiro-male.blend'))
parser.add_argument('--portable', default=str(HERE/'naquiro-male.glb'))
parser.add_argument('--evidence', default=None, help='Optional measured pose/contact report directory; never reads game saves')
args=parser.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
OUT=Path(args.out); OUT.mkdir(parents=True,exist_ok=True)
BASE_PATH=Path(args.base).resolve()
BASE_BYTES=BASE_PATH.read_bytes();BASE_SHA256=hashlib.sha256(BASE_BYTES).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(BASE_PATH))
# Rebuild only the export skeleton; materials and model remain editable.
for ob in list(bpy.data.objects):
    if ob.type=='ARMATURE': bpy.data.objects.remove(ob,do_unlink=True)
for ac in list(bpy.data.actions): bpy.data.actions.remove(ac)
bpy.ops.object.select_all(action='DESELECT')
arm=bpy.data.armatures.new('NaquiroSkeleton')
rig=bpy.data.objects.new('NaquiroRig',arm);bpy.context.collection.objects.link(rig)
bpy.context.view_layer.objects.active=rig;rig.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')
landmarks={}
def bone(name,head,tail,parent=None,deform=True):
    b=arm.edit_bones.new(name);b.head=head;b.tail=tail;b.use_deform=deform
    if parent:b.parent=arm.edit_bones[parent]
    landmarks[name]=[list(head),list(tail)]
    return b
bone('root',(0,0,0),(0,0,.2))
bone('pelvis',(0,0,1.08),(0,0,1.23),'root')
bone('spine_01',(0,0,1.23),(0,0,1.4),'pelvis')
bone('spine_02',(0,0,1.4),(0,0,1.57),'spine_01')
bone('chest',(0,0,1.57),(0,0,1.76),'spine_02')
bone('neck',(0,0,1.76),(0,0,1.91),'chest')
bone('head',(0,0,1.91),(0,0,2.25),'neck')
bone('hair_01',(0,.045,2.12),(0,.17,2.28),'head')
for side,s in [('L',1),('R',-1)]:
    bone('clavicle_'+side,(0,0,1.73),(s*.31,0,1.73),'chest')
    bone('upperarm_'+side,(s*.31,0,1.73),(s*.53,-.005,1.44),'clavicle_'+side)
    bone('forearm_'+side,(s*.53,-.005,1.44),(s*.66,-.025,1.18),'upperarm_'+side)
    bone('hand_'+side,(s*.66,-.025,1.18),(s*.69,-.03,1.08),'forearm_'+side)
    for i,(xx,tip) in enumerate(zip((.655,.678,.703,.725),(1.03,1.01,1.01,1.03)),1):
        bone(f'finger{i}_01_'+side,(s*xx,-.03,1.125),(s*xx,-.035,(1.125+tip)*.5),'hand_'+side)
        bone(f'finger{i}_02_'+side,(s*xx,-.035,(1.125+tip)*.5),(s*xx,-.04,tip),f'finger{i}_01_'+side)
    bone('thumb_01_'+side,(s*.651,-.032,1.151),(s*.644,-.045,1.11),'hand_'+side)
    bone('thumb_02_'+side,(s*.644,-.045,1.11),(s*.637,-.058,1.07),'thumb_01_'+side)
    bone('thigh_'+side,(s*.145,0,1.05),(s*.155,-.035,.61),'pelvis')
    bone('shin_'+side,(s*.155,-.035,.61),(s*.15,.01,.15),'thigh_'+side)
    bone('foot_'+side,(s*.15,.01,.15),(s*.15,-.2,.075),'shin_'+side)
    bone('toe_'+side,(s*.15,-.2,.075),(s*.15,-.30,.055),'foot_'+side)
    bone('ear_'+side,(s*.125,.015,2.04),(s*.36,.025,2.12),'head')
bpy.ops.object.mode_set(mode='OBJECT')
rig.show_in_front=True;arm.display_type='OCTAHEDRAL'
rig['asset_id']='EDF-NAQUIRO-MALE-001'
rig['candidate_version']='0.1.0'
rig['class_id']='errante'
rig['rig_notes']='In-place, Blender Z up / front -Y. Export glTF Y up / front +Z. No logical root translation. Hand_L is bow socket.'

segments={n:(Vector(a),Vector(b)) for n,(a,b) in landmarks.items()}
def dist_segment(p,n):
    a,b=segments[n];v=b-a;t=max(0.,min(1.,(p-a).dot(v)/max(v.length_squared,1.e-9)))
    return (p-(a+v*t)).length

def weights(p,region):
    r=region.lower();side='L' if p.x>=0 else 'R'
    # Semantic regions keep separate eyes, membranes and accessories attached correctly.
    aliases={'head':'head','eye':'head','eyes':'head','face':'head','mouth':'head','teeth':'head',
             'hair':'hair_01','hair_01':'hair_01','pelvis':'pelvis','belt':'pelvis','bow':'hand_L','bow_l':'hand_L','bow_r':'hand_R'}
    if r in aliases:return [(aliases[r],1.)]
    for tag in ('ear','clavicle','upperarm','forearm','hand','thigh','shin','foot','toe'):
        if r.replace('.','_').startswith(tag+'_'):
            sd=r[-1].upper()
            if sd in ('L','R'):
                if tag=='ear':return [('ear_'+sd,1.)]
                if tag in ('foot','toe'):return [('foot_'+sd,.78),('toe_'+sd,.22)]
                if tag=='clavicle':return [('clavicle_'+sd,.7),('chest',.3)]
                if tag=='hand':
                    cand=['hand_'+sd]+[f'finger{i}_{j:02}_'+sd for i in range(1,5) for j in (1,2)]+['thumb_01_'+sd,'thumb_02_'+sd]
                    break
                if tag in ('upperarm','forearm'): cand=['upperarm_'+sd,'forearm_'+sd,'hand_'+sd]
                else:cand=[tag+'_'+sd]
                break
    else:
        x=abs(p.x);z=p.z
        if x>.60 and z<1.16 and z>.95:cand=['hand_'+side]+[f'finger{i}_{j:02}_'+side for i in range(1,5) for j in (1,2)]+['thumb_01_'+side,'thumb_02_'+side]
        elif z>1.89:cand=['head','neck']
        elif z>1.76 and x<.22:cand=['neck','head','chest']
        elif x>.47 and z>.91:cand=['upperarm_'+side,'forearm_'+side,'hand_'+side]
        elif x>.275 and z>1.3:cand=['chest','clavicle_'+side,'upperarm_'+side,'forearm_'+side]
        elif z<1.03 and x>.045:cand=['pelvis','thigh_'+side,'shin_'+side,'foot_'+side,'toe_'+side]
        elif z<1.24:cand=['pelvis','spine_01','thigh_'+side]
        elif z<1.48:cand=['pelvis','spine_01','spine_02','chest']
        else:cand=['spine_02','chest','neck','clavicle_'+side]
    # Distance field weights have an overlapping, deformable envelope at every joint.
    scored=sorted(((n,1./max(.035,dist_segment(p,n))**3.8) for n in cand),key=lambda t:-t[1])[:4]
    total=sum(w for _,w in scored)
    return [(n,w/total) for n,w in scored]

meshes=[o for o in bpy.context.scene.objects if o.type=='MESH' and not o.get('edf_no_export',False) and o.get('edf_export',True) and o.get('edf_region')!='studio']

def clamp_export_vertex_colors(objects):
    """Keep glTF normalized vertex tints in range without changing source geometry.

    The editable modelling source may contain HDR tint multipliers above 1.
    Blender renders those floats, but the Blender 4.3 glTF exporter quantizes
    COLOR_0 to normalized UNSIGNED_SHORT: values above 1 wrap instead of clamp.
    That produced a dark green face and red jewelry in the browser although
    the Blender preview was blue/turquoise. Clamp the LINEAR .color values
    (never .color_srgb, which would apply another transfer function) before
    packing/saving this rigged .blend and before glTF/GLB export. base.blend is
    opened read-only and remains the unmodified, editable modelling source.
    """
    rows=[];components_clamped=0;minimum=np.full(4,np.inf);maximum=np.full(4,-np.inf)
    for ob in objects:
        for attribute in ob.data.color_attributes:
            values=np.empty(len(attribute.data)*4,dtype=np.float32)
            attribute.data.foreach_get('color',values)
            if not len(values):continue
            values=values.reshape((-1,4))
            if not np.isfinite(values).all():
                raise RuntimeError('Non-finite linear vertex color: '+ob.name+'/'+attribute.name)
            clipped=np.clip(values,0.,1.)
            changed=int(np.count_nonzero(values!=clipped));components_clamped+=changed
            minimum=np.minimum(minimum,values.min(axis=0));maximum=np.maximum(maximum,values.max(axis=0))
            # This property is linear RGBA, including for BYTE_COLOR attributes.
            # It deliberately does not alter UVs, positions, normals or weights.
            attribute.data.foreach_set('color',clipped.ravel())
            actual=np.empty_like(clipped)
            attribute.data.foreach_get('color',actual.ravel())
            if actual.min()<0 or actual.max()>1:
                raise RuntimeError('Linear color clamp failed: '+ob.name+'/'+attribute.name)
            rows.append({'mesh':ob.name,'region':str(ob.get('edf_region','body')),
                'attribute':attribute.name,'domain':attribute.domain,'type':attribute.data_type,
                'elements':len(values),'components_clamped':changed,
                'before_min_rgba':values.min(axis=0).tolist(),'before_max_rgba':values.max(axis=0).tolist(),
                'before_mean_rgba':values.mean(axis=0,dtype=np.float64).tolist(),
                'after_min_rgba':actual.min(axis=0).tolist(),'after_max_rgba':actual.max(axis=0).tolist(),
                'after_mean_rgba':actual.mean(axis=0,dtype=np.float64).tolist()})
    return {'space':'linear RGBA (.color), no additional gamma conversion',
        'reason':'Prevent normalized unsigned glTF COLOR_0 quantization overflow',
        'components_clamped':components_clamped,'before_min_rgba':minimum.tolist(),
        'before_max_rgba':maximum.tolist(),
        'after_min_rgba':[min(r['after_min_rgba'][i] for r in rows) for i in range(4)],
        'after_max_rgba':[max(r['after_max_rgba'][i] for r in rows) for i in range(4)],
        'attributes':rows}

vertex_color_sanitization=clamp_export_vertex_colors(meshes)
if args.evidence:
    color_evidence=Path(args.evidence);color_evidence.mkdir(parents=True,exist_ok=True)
    (color_evidence/'vertex-color-sanitization.json').write_text(json.dumps(vertex_color_sanitization,indent=2)+'\n')
meshstats=[]
for ob in meshes:
    # Mesh modifiers before skin are retained (sculpted surface, thickness, subdivisions).
    if ob.parent:ob.matrix_world=ob.matrix_world.copy();ob.parent=None
    bpy.context.view_layer.objects.active=ob
    for mod in list(ob.modifiers):
        if mod.type=='ARMATURE':ob.modifiers.remove(mod)
    # Resolve n-gons before skinning so Blender can export valid tangents for
    # the normal map; the editable, separate quad source remains in base.blend.
    if any(len(poly.vertices)>4 for poly in ob.data.polygons):
        triangulate=ob.modifiers.new('ExportTriangulate','TRIANGULATE')
        bpy.ops.object.modifier_apply(modifier=triangulate.name)
    for g in list(ob.vertex_groups):ob.vertex_groups.remove(g)
    groups={n:ob.vertex_groups.new(name=n) for n in landmarks if n!='root'}
    region=str(ob.get('edf_region','body'))
    for v in ob.data.vertices:
        p=ob.matrix_world@v.co
        for n,w in weights(p,region):groups[n].add([v.index],w,'REPLACE')
    mod=ob.modifiers.new('NaquiroSkin','ARMATURE');mod.object=rig;mod.use_deform_preserve_volume=False
    ob.parent=rig
    ob['skin_method']='Semantic regions and normalized four-influence distance envelopes; inspect deformation in Blender.'
    meshstats.append({'name':ob.name,'region':region,'vertices':len(ob.data.vertices),'base_polygons':len(ob.data.polygons)})

# Batch by material only after weights have been assigned. Blender join retains UVs,
# vertex colors and named bone groups. Source base.blend preserves the separate parts.
material_batches={}
for ob in meshes:
    key=tuple(m.name if m else '' for m in ob.data.materials)
    material_batches.setdefault(key,[]).append(ob)
merged=[]
for index,(key,parts) in enumerate(material_batches.items(),1):
    bpy.ops.object.select_all(action='DESELECT')
    for ob in parts:ob.select_set(True)
    active=parts[0];bpy.context.view_layer.objects.active=active
    if len(parts)>1:bpy.ops.object.join()
    active.name='Naquiro_'+str(index).zfill(2)+'_'+(key[0] if key else 'Unassigned')
    active['edf_region']='merged_semantic_skin';active['edf_source_parts']=len(parts)
    merged.append(active)
meshes=merged

FPS=24;bpy.context.scene.render.fps=FPS
# Original hand-authored keyed performances. World-axis deltas are converted to each bone's rest frame.
def setrot(name,xyz):
    b=rig.pose.bones[name]; rest=arm.bones[name].matrix_local.to_quaternion()
    b.rotation_mode='QUATERNION';b.rotation_quaternion=rest.inverted()@Euler(tuple(math.radians(v) for v in xyz),'XYZ').to_quaternion()@rest

def setloc(name,xyz):rig.pose.bones[name].location=arm.bones[name].matrix_local.to_3x3().inverted()@Vector(xyz)
def reset():
    for b in rig.pose.bones:b.location=(0,0,0);b.rotation_mode='QUATERNION';b.rotation_quaternion=(1,0,0,0);b.scale=(1,1,1)
def rotadd(name,xyz):
    b=rig.pose.bones[name]; rest=arm.bones[name].matrix_local.to_quaternion()
    q=rest.inverted()@Euler(tuple(math.radians(v) for v in xyz),'XYZ').to_quaternion()@rest
    b.rotation_quaternion=b.rotation_quaternion@q

def walking(t,run=False):
    a=2*math.pi*t;s=math.sin(a);power=39 if run else 24
    pelvis_z=(-.16 if run else -.085)+(.018 if run else .008)*(1-math.cos(2*a))
    setloc('pelvis',(0,0,pelvis_z))
    setrot('spine_01',(-8 if run else -2,0,-3*s));setrot('chest',(-4 if run else 1,0,3*s))
    for side,sign in [('L',1),('R',-1)]:
        phase=(t+(0 if sign==1 else .5))%1
        stance=.5 if run else .62;stride=1.0 if run else .60
        if phase<stance:
            u=phase/stance;y=-stride*.5+stride*u;z=.15
        else:
            u=(phase-stance)/(1-stance);smooth=u*u*(3-2*u)
            y=stride*.5-stride*smooth;z=.15+(.22 if run else .11)*math.sin(math.pi*u)
        # Analytic sagittal-plane two-bone IK, then baked into ordinary FK bones.
        hip_z=1.05+pelvis_z;dy=y;dz=z-hip_z;d=math.sqrt(dy*dy+dz*dz)
        L1=math.sqrt(.035**2+.44**2);L2=math.sqrt(.045**2+.46**2)
        d=min(d,L1+L2-.001);uy=dy/max(1e-6,math.sqrt(dy*dy+dz*dz));uz=dz/max(1e-6,math.sqrt(dy*dy+dz*dz))
        along=(L1*L1-L2*L2+d*d)/(2*d);height=math.sqrt(max(0,L1*L1-along*along))
        ky=uy*along+uz*height;kz=hip_z+uz*along-uy*height
        thigh=math.atan2(ky,hip_z-kz)-math.atan2(-.035,.44)
        shin=math.atan2(y-ky,kz-z)-math.atan2(.045,.46)-thigh
        setrot('thigh_'+side,(math.degrees(thigh),0,0));setrot('shin_'+side,(math.degrees(shin),0,0))
        setrot('foot_'+side,(-math.degrees(thigh+shin),0,0));setrot('toe_'+side,(-8*max(0,math.sin(math.pi*phase)),0,0))
        armwave=math.sin(2*math.pi*phase)
        setrot('upperarm_'+side,(armwave*(30 if run else 18)-4,sign*25,sign*2))
        setrot('forearm_'+side,(-40 if run else -17,0,0))
        setrot('ear_'+side,(0,2*math.sin(a+.6)*sign,0))
    setrot('hair_01',(2*math.sin(a-.5),0,0));setrot('head',(2,0,-2*s))

DURATIONS={'Idle':2.5,'Walk':1.,'Run':.667,'Jump':.9,'Land':.5,'Attack':1.,'Cast':1.5,'Hit':.5,'Death':1.4,'Recover':1.5,'Swim':1.5}
def performance(name,t):
    a=2*math.pi*t
    for side,s in [('L',1),('R',-1)]:
        # The modelling A-pose is only a bind pose. Relax the shoulders in every
        # performance, including the first/last frames of all one-shot clips.
        setrot('upperarm_'+side,(-4,s*25,0))
        setrot('forearm_'+side,(-10,0,0))
        curl=12 if name not in ('Cast','Swim') else 4
        if name=='Attack':curl=22 if side=='L' else 35*math.sin(math.pi*t)
        for i in range(1,5):
            setrot(f'finger{i}_01_'+side,(-curl,0,0));setrot(f'finger{i}_02_'+side,(-curl*.75,0,0))
        setrot('thumb_01_'+side,(-curl*.45,0,s*curl*.4))
    if name=='Idle':
        setloc('pelvis',(0,0,0));setrot('spine_02',(1.1*math.sin(a),0,0));setrot('chest',(-1.2*math.sin(a),0,0))
        setrot('head',(1.1*math.sin(a+.4),0,1.2*math.sin(a)));setrot('hair_01',(1.5*math.sin(a-.4),0,0))
        for sd,s in [('L',1),('R',-1)]:setrot('ear_'+sd,(0,s*2*math.sin(a+.5),0));setrot('hand_'+sd,(0,0,s*1.6*math.sin(a)))
    elif name in ('Walk','Run'):walking(t,name=='Run')
    elif name=='Jump':
        # Presentation only: pelvis lift and folded legs; logical root is fixed.
        crouch=max(0,1-t/.22) if t<.22 else 0;air=math.sin(math.pi*max(0,(t-.18)/.82))
        setloc('pelvis',(0,0,-.16*crouch+.38*air));setrot('spine_01',(16*crouch-8*air,0,0))
        for sd,s in [('L',1),('R',-1)]:
            setrot('thigh_'+sd,(-24*crouch-25*air,0,s*4*air));setrot('shin_'+sd,(45*crouch+50*air,0,0));setrot('foot_'+sd,(-18*crouch-15*air,0,0));setrot('upperarm_'+sd,(-4-55*air,s*(25-8*air),s*12*air))
    elif name=='Land':
        b=math.sin(math.pi*t)*(1-t)
        setloc('pelvis',(0,0,-.18*b));setrot('spine_01',(22*b,0,0))
        for sd,s in [('L',1),('R',-1)]:setrot('thigh_'+sd,(-35*b,0,0));setrot('shin_'+sd,(66*b,0,0));setrot('foot_'+sd,(-26*b,0,0));setrot('upperarm_'+sd,(-4-23*b,s*25,s*8*b))
    elif name=='Attack':
        # Bow anticipation, draw, release, recovery. Left hand is the bow socket.
        k=min(1,t/.32) if t<.72 else max(0,(1-t)/.28);draw=min(1,max(0,(t-.12)/.4)) if t<.67 else max(0,(.86-t)/.19)
        setrot('spine_01',(0,0,-12*k));setrot('chest',(0,0,-10*k));setrot('head',(0,0,14*k))
        setrot('upperarm_L',(-4-73*k,25-37*k,-40*k));setrot('forearm_L',(-10+2*k,0,-12*k));setrot('hand_L',(0,8*k,0))
        setrot('upperarm_R',(-4-51*k,-25+25*k,35*k));setrot('forearm_R',(-10-15*k,-45*draw,28*draw));setrot('hand_R',(0,0,-20*draw));setrot('hair_01',(3*math.sin(math.pi*t),0,0))
    elif name=='Cast':
        k=math.sin(math.pi*min(1,t/.24)/2) if t<.24 else (1 if t<.78 else max(0,(1-t)/.22))
        setrot('spine_02',(-8*k,0,4*k));setrot('head',(-6*k,0,-5*k))
        for sd,s in [('L',1),('R',-1)]:
            setrot('upperarm_'+sd,(-4-60*k,s*25*(1-k),-s*25*k));setrot('forearm_'+sd,(-10-15*k,0,-s*16*k));setrot('hand_'+sd,(0,s*18*k,s*5*math.sin(a)*k));setrot('ear_'+sd,(0,s*6*k,0))
    elif name=='Hit':
        k=math.sin(math.pi*t)*(1-t)**.4
        setrot('pelvis',(10*k,0,-5*k));setrot('spine_01',(20*k,0,11*k));setrot('chest',(8*k,0,8*k));setrot('head',(-18*k,0,-8*k))
        setrot('upperarm_L',(-4-24*k,25,5*k));setrot('upperarm_R',(-4-14*k,-25,-12*k))
    elif name in ('Death','Recover'):
        # Falling sideward with pelvis drop keeps the logical root unchanged.
        q=t if name=='Death' else 1-t;q=q*q*(3-2*q)
        setloc('pelvis',(.12*q,.05*q,-.80*q));setrot('pelvis',(8*q,88*q,0));setrot('spine_01',(20*q,0,6*q));setrot('chest',(12*q,0,-5*q));setrot('head',(12*q,-5*q,-15*q))
        setrot('thigh_L',(-25*q,0,-10*q));setrot('shin_L',(65*q,0,0));setrot('thigh_R',(-10*q,0,15*q));setrot('shin_R',(38*q,0,0))
        setrot('upperarm_L',(-4-6*q,25+30*q,-6*q));setrot('forearm_L',(-10,0,0));setrot('hand_L',(0,-55*q,0))
        setrot('upperarm_R',(-4-6*q,-25-30*q,6*q));setrot('forearm_R',(-10-10*q,0,0));setrot('hand_R',(0,55*q,0))
    elif name=='Swim':
        # Laboratory presentation only, no swimming mechanic or root displacement.
        setloc('pelvis',(0,0,.15+.025*math.sin(a)));setrot('pelvis',(-68,0,0));setrot('spine_01',(-8,0,2*math.sin(a)));setrot('head',(38,0,0))
        for sd,s in [('L',1),('R',-1)]:
            phase=a+(0 if s==1 else math.pi)
            setrot('upperarm_'+sd,(-95+45*math.sin(phase),0,-s*(12+22*math.cos(phase))))
            setrot('forearm_'+sd,(-20-30*max(0,math.sin(phase)),0,0));setrot('thigh_'+sd,(16*math.sin(phase),0,0));setrot('shin_'+sd,(18+14*math.sin(phase),0,0));setrot('foot_'+sd,(-22,0,0));setrot('ear_'+sd,(0,s*8*math.sin(a),0))

def evaluated_bounds():
    """Measure deformed mesh vertices, not undeformed object bounding boxes."""
    bpy.context.view_layer.update()
    graph=bpy.context.evaluated_depsgraph_get()
    lo=np.full(3,np.inf);hi=np.full(3,-np.inf);count=0
    for ob in meshes:
        evaluated=ob.evaluated_get(graph);data=evaluated.to_mesh()
        points=np.empty(len(data.vertices)*3,dtype=np.float64)
        data.vertices.foreach_get('co',points)
        points=points.reshape((-1,3));matrix=np.asarray(evaluated.matrix_world,dtype=np.float64)
        points=points@matrix[:3,:3].T+matrix[:3,3]
        if not np.isfinite(points).all():raise RuntimeError('Non-finite deformed vertices: '+ob.name)
        if len(points):lo=np.minimum(lo,points.min(axis=0));hi=np.maximum(hi,points.max(axis=0));count+=len(points)
        evaluated.to_mesh_clear()
    return {'minimum':lo.tolist(),'maximum':hi.tolist(),'size':(hi-lo).tolist(),'vertices':count}

# Calibrate against evaluated feet, then constrain the actual lowest surface.
# This changes the pelvis pose only: the exported logical root stays at zero.
reset();performance('Idle',0)
source_neutral_min_z=evaluated_bounds()['minimum'][2]
neutral_ground_offset=.003-source_neutral_min_z
GROUNDED={'Idle','Walk','Run','Attack','Cast','Hit'}
rig.animation_data_create()
clipstats=[];pose_measurements=[];contacts={'Walk':{'L':[],'R':[]},'Run':{'L':[],'R':[]}}
for name,duration in DURATIONS.items():
    action=bpy.data.actions.new(name=name);action.use_fake_user=True;rig.animation_data.action=action
    last=round(duration*FPS)+1
    # Bake every frame at 24 FPS; contact IK is evaluated before key insertion.
    frames=list(range(1,last+1))
    for f in frames:
        bpy.context.scene.frame_set(f);reset();phase=(f-1)/(last-1);performance(name,phase)
        floor_correction=0.
        if name!='Swim':
            rig.pose.bones['pelvis'].location+=arm.bones['pelvis'].matrix_local.to_3x3().inverted()@Vector((0,0,neutral_ground_offset))
            # Grounded actions keep actual sole clearance at 3 mm. Airborne and
            # fallen presentations are only lifted out of penetration, preserving
            # jump height and the final sideways corpse rather than a node offset.
            before=evaluated_bounds()
            floor_correction=.003-before['minimum'][2]
            if name not in GROUNDED:floor_correction=max(0.,floor_correction)
            if floor_correction:
                rig.pose.bones['pelvis'].location+=arm.bones['pelvis'].matrix_local.to_3x3().inverted()@Vector((0,0,floor_correction))
        bounds=evaluated_bounds()
        feet={sd:list(rig.matrix_world@rig.pose.bones['foot_'+sd].head) for sd in ('L','R')}
        if name in contacts:
            stance=.5 if name=='Run' else .62
            for sd,offset in [('L',0),('R',.5)]:
                foot_phase=(phase+offset)%1
                if .02<foot_phase<stance-.02:
                    contacts[name][sd].append({'time_in_stance':foot_phase*(last-1)/FPS,'position':feet[sd]})
        pose_measurements.append({'clip':name,'frame':f,'phase':phase,'bounds':bounds,'feet':feet,'floor_lift':max(0.,floor_correction),'floor_correction':floor_correction})
        for b in rig.pose.bones:
            b.keyframe_insert(data_path='location',frame=f,group=b.name)
            b.keyframe_insert(data_path='rotation_quaternion',frame=f,group=b.name)
    for fc in action.fcurves:
        for k in fc.keyframe_points:k.interpolation='LINEAR'
    clipstats.append({'name':name,'frames':last,'duration_seconds':(last-1)/FPS,'channels':len(action.fcurves)})
contact_report={}
for name,sides in contacts.items():
    samples=[];per_side={}
    for sd,rows in sides.items():
        times=np.array([r['time_in_stance'] for r in rows]);positions=np.array([r['position'] for r in rows])
        velocity=np.polyfit(times,positions[:,1],1)
        per_side[sd]={'samples':len(rows),'measured_velocity_metres_per_second':float(velocity[0]),
            'linear_contact_residual_max_metres':float(abs(positions[:,1]-np.polyval(velocity,times)).max()),
            'vertical_contact_range_metres':float(np.ptp(positions[:,2])),
            'lateral_contact_range_metres':float(np.ptp(positions[:,0])), 'samples_blender_z_up':rows}
        samples.append(float(velocity[0]))
    contact_report[name]={'measured_metres_per_second':sum(samples)/len(samples),'sides':per_side}
    if min(samples)<=0:raise RuntimeError('Locomotion contact moves in the wrong direction: '+name)
measurement_summary={}
for name in DURATIONS:
    rows=[r for r in pose_measurements if r['clip']==name]
    measurement_summary[name]={'frames_evaluated':len(rows),
        'minimum_floor_z':min(r['bounds']['minimum'][2] for r in rows),
        'maximum_height_z':max(r['bounds']['maximum'][2] for r in rows),
        'final_bounds':rows[-1]['bounds'],'maximum_floor_lift':max(r['floor_lift'] for r in rows),
        'minimum_floor_correction':min(r['floor_correction'] for r in rows),
        'maximum_floor_correction':max(r['floor_correction'] for r in rows)}
if args.evidence:
    evidence=Path(args.evidence);evidence.mkdir(parents=True,exist_ok=True)
    (evidence/'evaluated-poses.json').write_text(json.dumps({'summary':measurement_summary,'frames':pose_measurements},indent=2)+'\n')
    (evidence/'locomotion-contact.json').write_text(json.dumps(contact_report,indent=2)+'\n')
rig.animation_data.action=bpy.data.actions['Idle'];bpy.context.scene.frame_set(1)
bpy.context.scene.frame_start=1;bpy.context.scene.frame_end=61
# Keep exporter selection explicit; cameras/lights/studio floor are excluded.
bpy.ops.object.select_all(action='DESELECT');rig.select_set(True)
for o in meshes:o.select_set(True)
bpy.context.view_layer.objects.active=rig
# Portable editable source: original Blender node graphs are retained for preview.
# A GLTF-only copy below expresses the same multiplication as glTF base * COLOR_0.
for image in bpy.data.images:
    if image.source!='FILE':continue
    source=HERE/'textures'/Path(image.filepath).name
    if source.exists():image.filepath=str(source)
    if not source.exists() and not image.packed_file:raise RuntimeError('Missing source texture: '+image.name)
    # Loaded Blender FILE images may be lazy: has_data can be false although
    # valid PNG bytes are on disk. Pack the actual file and verify the result.
    image.pack()
    if not image.packed_file:raise RuntimeError('Texture was not packed: '+image.name)
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=args.blend)
source_materials={}
for ob in meshes:
    for slot in ob.material_slots:
        original=slot.material
        if original is None:continue
        if original.name not in source_materials:
            copy=original.copy();copy.name=original.name+'_glTF'
            shader=copy.node_tree.nodes.get('Principled BSDF')
            base=shader.inputs['Base Color']
            for link in list(base.links):copy.node_tree.links.remove(link)
            # Texture and vertex color are both multiplied by glTF natively. A
            # Blender MixRGB graph obscures that standard binding to the exporter.
            texture=next((node for node in copy.node_tree.nodes if node.type=='TEX_IMAGE' and node.image and 'basecolor'in node.image.name),None)
            if texture:copy.node_tree.links.new(texture.outputs['Color'],base);base.default_value=(1,1,1,1)
            else:base.default_value=original.diffuse_color
            source_materials[original.name]=copy
        slot.material=source_materials[original.name]
common=dict(export_copyright='Original Ecos dos Farois Naquiro pilot; project-authored Blender geometry, maps, rig and animations.',use_selection=True,export_animations=True,export_animation_mode='ACTIONS',export_nla_strips=True,
            export_frame_range=False,export_force_sampling=True,export_anim_single_armature=True,
            export_skins=True,export_influence_nb=4,export_all_influences=False,export_def_bones=True,
            export_yup=True,export_extras=True,export_cameras=False,export_lights=False,
            export_materials='EXPORT',export_texcoords=True,export_normals=True,export_tangents=True,
            export_morph=True,export_leaf_bone=False,export_optimize_animation_size=True,
            export_vertex_color='ACTIVE',export_all_vertex_colors=False,
            export_image_format='AUTO',export_texture_dir='textures',export_keep_originals=False)
bpy.ops.export_scene.gltf(filepath=str(OUT/'naquiro-male.gltf'),export_format='GLTF_SEPARATE',**common)
bpy.ops.export_scene.gltf(filepath=args.portable,export_format='GLB',**common)
# Export-time stats use actual glTF buffers, not source declarations.
gltf=json.loads((OUT/'naquiro-male.gltf').read_text())
actual_clips=[a['name'] for a in gltf.get('animations',[])]
if set(actual_clips)!=set(DURATIONS):raise RuntimeError('Export clips mismatch: '+str(actual_clips))
tris=sum(gltf['accessors'][p['indices']]['count']//3 if 'indices'in p else gltf['accessors'][p['attributes']['POSITION']]['count']//3 for m in gltf['meshes'] for p in m['primitives'])
files={str(p.relative_to(OUT)): {'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(OUT.rglob('*')) if p.is_file() and p.name!='manifest.json'}
report={'asset_id':'EDF-NAQUIRO-MALE-001','candidate_version':'0.1.0','class_id':'errante','status':'production candidate; artistic and Windows/GPU approval pending',
        'source':'Original surface model, textures, rig and keyed animation generated in Blender by project scripts; concept sheets guide design, no third-party model/texture extraction.',
        'runtime':'/art/characters/naquiro/naquiro-male.gltf','portable':'art-source/naquiro-male/naquiro-male.glb',
        'coordinate_system':{'source_up':'Z','source_front':'-Y','runtime_up':'Y','runtime_front':'+Z','origin':'feet','nominal_height':2.3,'height_is_canonical':False},
        'source_base':{'file':BASE_PATH.name,'bytes':len(BASE_BYTES),'sha256':BASE_SHA256},
        'vertex_color_sanitization':vertex_color_sanitization,
        'source_files':{str(p.relative_to(HERE)):{'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted([HERE/'model.py',HERE/'rig_export.py',HERE/'inspect_asset.py']+list((HERE/'textures').glob('*.png')))},
        'portable_source_images_packed':True,
        'triangle_count':tris,'materials':len(gltf.get('materials',[])),'skins':len(gltf.get('skins',[])),
        'bones':list(landmarks),'bone_landmarks_blender':landmarks,'clips':clipstats,'exported_clips':actual_clips,
        'sockets':{'bow':'hand_L','draw':'hand_R','back':'chest'},'max_vertex_influences':4,
        'locomotion_nominal_metres_per_second':{n:contact_report[n]['measured_metres_per_second'] for n in contacts},
        'locomotion_contact_measurements':contact_report,
        'foot_grounding':{'source_neutral_surface_min_z':source_neutral_min_z,'neutral_pelvis_offset_z':neutral_ground_offset,'target_surface_min_z':.003,'grounded_clips':sorted(GROUNDED),'airborne_or_fallen_clips':['Jump','Land','Death','Recover'],'swim_uses_floor_constraint':False,'logical_root_translation':[0,0,0]},
        'evaluated_animation_bounds':measurement_summary,
        'locomotion_contact':{'Walk':{'stride_metres':.60,'stance_fraction':.62},'Run':{'stride_metres':1.,'stance_fraction':.5}},
        'locomotion':'in-place; root bone has no translated or rotated animation; pelvis motion only',
        'laboratory_only_clips':['Jump','Land','Swim'],'mesh_source_stats':meshstats,'files':files}
if hashlib.sha256(BASE_PATH.read_bytes()).hexdigest()!=BASE_SHA256:raise RuntimeError('Base source changed during export; checkpoint and repeat against frozen input')
(OUT/'manifest.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print('NAQUIRO_EXPORT_REPORT '+json.dumps({'triangles':tris,'materials':report['materials'],'bones':len(landmarks),'clips':actual_clips,'files':len(files)}))
