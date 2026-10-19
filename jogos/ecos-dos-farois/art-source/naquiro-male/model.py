"""Original Náquiro male production study, Blender 4.3+.

No concept pixels or downloaded mesh are used. The anatomical surface is fused
from authored cross sections and relaxed, not a displayed assembly of solids.
This is a reviewable first production candidate, not an approved final asset.
Run: blender -b --python model.py -- [output-directory]
"""
import bpy, math, os, sys, json
import numpy as np
from mathutils import Vector
from math import sin, cos, pi, exp, sqrt

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv and len(sys.argv) > sys.argv.index('--') + 1 else HERE
EVIDENCE = os.environ.get('EDF_MODEL_EVIDENCE', '/workspace/edf-naquiro-production/evidence/model')
os.makedirs(OUT, exist_ok=True)
os.makedirs(os.path.join(OUT, 'textures'), exist_ok=True)
os.makedirs(EVIDENCE, exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for data in list(bpy.data.materials): bpy.data.materials.remove(data)

def image_png(name, data, noncolor=False):
    height, width = data.shape[:2]
    im = bpy.data.images.new(name, width=width, height=height, alpha=True)
    if noncolor: im.colorspace_settings.name='Non-Color'
    rgba = np.ones((height,width,4), dtype=np.float32); rgba[:,:,:3] = np.clip(data,0,1)
    im.pixels.foreach_set(rgba.ravel()); im.filepath_raw=os.path.join(OUT,'textures',name+'.png'); im.file_format='PNG'; im.save()
    return im

# Small, offset, shield-shaped scales. Color has independent broad chromatic
# variation; roughness is not inferred from color. Tangent normals from relief.
N=1024
yy,xx=np.mgrid[0:N,0:N].astype(np.float32)/N
row=np.floor(yy*288)
sx=((xx*192+(row%2)*.5)%1)-.5
sy=(yy*288)%1
ellipse=np.sqrt((sx/.52)**2+((sy-.38)/.63)**2)
edge=np.exp(-((ellipse-.88)/.075)**2)
scale=np.clip(1-ellipse,0,1)
fine=(np.sin(xx*1613+np.cos(yy*897))*np.sin(yy*1741+xx*231))
height=.065*scale-.026*edge+.003*fine
nx=(np.roll(height,1,axis=1)-np.roll(height,-1,axis=1))*9
ny=(np.roll(height,1,axis=0)-np.roll(height,-1,axis=0))*9
norm=np.stack([nx,ny,np.ones_like(nx)],axis=-1); norm/=np.linalg.norm(norm,axis=-1,keepdims=True)
skin_normal=image_png('naquiro_skin_normal',norm*.5+.5,True)
var=np.sin(xx*21+np.sin(yy*23))*np.cos(yy*17+xx*9)*.026
skinrgb=np.zeros((N,N,3),np.float32)
skinrgb[:,:,0]=.115+var+.030*scale-.012*edge
skinrgb[:,:,1]=.285+var+.032*scale-.018*edge
skinrgb[:,:,2]=.315+var+.028*scale-.016*edge
gold=(np.sin(xx*41+yy*29)>.92)*scale*.08
skinrgb[:,:,0]+=gold;skinrgb[:,:,1]+=gold*.3
skin_color=image_png('naquiro_skin_basecolor',skinrgb)
skin_rough=image_png('naquiro_skin_roughness',np.repeat((.47+.08*edge-.045*scale+.015*fine)[:,:,None],3,axis=2),True)

# Leather is authored separate from the skin rather than recoloring its scales.
grain=np.sin(xx*917+np.sin(yy*373))*np.cos(yy*1081-xx*143)
leatherrgb=np.stack([.18+.017*grain,.105+.012*grain,.075+.01*grain],axis=-1)
leather_color=image_png('naquiro_leather_basecolor',leatherrgb)
leather_rough=image_png('naquiro_leather_roughness',np.repeat((.68+.05*grain)[:,:,None],3,axis=2),True)
clothrgb=np.stack([.045+.014*np.sin(xx*2700)*np.sin(yy*2700),.135+.012*np.cos(xx*2800),.18+.012*np.sin(yy*2800)],axis=-1)
cloth_color=image_png('naquiro_cloth_basecolor',clothrgb)

def material(name, color, rough=.5, metal=0, texture=None, vertex=False):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    nodes=m.node_tree.nodes; p=nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
    if texture:
        tex=nodes.new('ShaderNodeTexImage');tex.image=texture; m.node_tree.links.new(tex.outputs['Color'],p.inputs['Base Color'])
    if vertex:
        attr=nodes.new('ShaderNodeVertexColor');attr.layer_name='Color'
        if texture:
            mix=nodes.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1
            m.node_tree.links.new(tex.outputs['Color'],mix.inputs[1]);m.node_tree.links.new(attr.outputs['Color'],mix.inputs[2]);m.node_tree.links.new(mix.outputs[0],p.inputs['Base Color'])
        else:
            mix=nodes.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1;mix.inputs[1].default_value=(*color,1)
            m.node_tree.links.new(attr.outputs['Color'],mix.inputs[2]);m.node_tree.links.new(mix.outputs[0],p.inputs['Base Color'])
    return m

skin=material('01_Pele_Escamas_PBR',(.35,.61,.64),.48,0,skin_color,True)
nd=skin.node_tree.nodes; ps=nd.get('Principled BSDF')
tx=nd.new('ShaderNodeTexImage');tx.image=skin_normal; normalnode=nd.new('ShaderNodeNormalMap');normalnode.inputs['Strength'].default_value=.24
skin.node_tree.links.new(tx.outputs['Color'],normalnode.inputs['Color']);skin.node_tree.links.new(normalnode.outputs['Normal'],ps.inputs['Normal'])
tx=nd.new('ShaderNodeTexImage');tx.image=skin_rough;skin.node_tree.links.new(tx.outputs['Color'],ps.inputs['Roughness'])
hair=material('02_Cabelo_Azul_Petroleo',(.012,.035,.048),.32,.16,vertex=True)
leather=material('03_Couro_Maritimo',(.18,.105,.075),.7,0,leather_color)
tx=leather.node_tree.nodes.new('ShaderNodeTexImage');tx.image=leather_rough;leather.node_tree.links.new(tx.outputs['Color'],leather.node_tree.nodes.get('Principled BSDF').inputs['Roughness'])
cloth=material('04_Tecido_Azul_Profundo',(.04,.13,.18),.84,0,cloth_color)
copper=material('05_Cobre_Madrepérola',(.55,.29,.12),.3,.76,vertex=True)
eye=material('06_Olhos_Membranas',(1,1,1),.29,.02,vertex=True)
dark=hair
MATS=[skin,hair,leather,cloth,copper,eye]

def mesh(name, verts, faces, mat=skin, region='body', color=(1,1,1,1), colors=None, uv=None):
    data=bpy.data.meshes.new(name);data.from_pydata(verts,[],faces);data.materials.append(mat);data.update()
    ob=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(ob);ob['edf_region']=region
    for p in data.polygons:p.use_smooth=True
    col=data.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='POINT')
    for i,item in enumerate(col.data):item.color=(colors[i] if colors else color)
    if uv:
        layer=data.uv_layers.new(name='UVMap')
        for p in data.polygons:
            for li in p.loop_indices:layer.data[li].uv=uv[data.loops[li].vertex_index]
    return ob

def uvsmart(ob):
    bpy.ops.object.select_all(action='DESELECT');ob.select_set(True);bpy.context.view_layer.objects.active=ob
    bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=1.05,island_margin=.015);bpy.ops.object.mode_set(mode='OBJECT')

def loft(name, sections, n=24, mat=skin, region='body', color=(1,1,1,1), cap=True):
    # Each section: center(x,y,z), x radius, y radius; horizontal planes.
    vs=[];uv=[]
    for j,(center,rx,ry) in enumerate(sections):
        for i in range(n):
            a=2*pi*i/n;vs.append((center[0]+rx*sin(a),center[1]-ry*cos(a),center[2]));uv.append((i/n,j/max(1,len(sections)-1)))
    fs=[]
    for j in range(len(sections)-1):
        for i in range(n):fs.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
    if cap:fs.extend([tuple(range(n-1,-1,-1)),tuple((len(sections)-1)*n+i for i in range(n))])
    return mesh(name,vs,fs,mat,region,color,uv=uv)

def tube(name, points, radii, n=10, mat=skin, region='body', color=(1,1,1,1), flattened=1):
    vs=[];uv=[]
    for j,pt in enumerate(points):
        p=Vector(pt);t=Vector(points[min(j+1,len(points)-1)])-Vector(points[max(0,j-1)]);t.normalize()
        ref=Vector((0,1,0));a=t.cross(ref)
        if a.length<.01:a=t.cross(Vector((1,0,0)))
        a.normalize();b=t.cross(a).normalized()
        for i in range(n):
            angle=2*pi*i/n;q=p+a*cos(angle)*radii[j]+b*sin(angle)*radii[j]*flattened
            vs.append(tuple(q));uv.append((i/n,j/max(1,len(points)-1)))
    fs=[]
    for j in range(len(points)-1):
        for i in range(n):fs.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
    fs.extend([tuple(range(n-1,-1,-1)),tuple((len(points)-1)*n+i for i in range(n))])
    return mesh(name,vs,fs,mat,region,color,uv=uv)

def sphere(name, center, scale, mat, region, color=(1,1,1,1), seg=24,rings=16):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=rings,location=center)
    ob=bpy.context.object;ob.name=name;ob.scale=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    ob.data.materials.append(mat);ob['edf_region']=region
    col=ob.data.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='POINT')
    for item in col.data:item.color=color
    for p in ob.data.polygons:p.use_smooth=True
    return ob

parts=[]
torso=[(1.00,.115,.105,.012),(1.045,.19,.125,.012),(1.10,.218,.135,.015),(1.16,.202,.125,.009),(1.23,.174,.112,.006),(1.29,.165,.106,0),(1.36,.178,.119,0),(1.43,.207,.139,.002),(1.49,.237,.155,.007),(1.56,.258,.160,.015),(1.63,.267,.152,.022),(1.69,.25,.135,.027),(1.74,.233,.109,.025),(1.78,.165,.085,.024),(1.82,.09,.072,.022),(1.88,.07,.065,.016),(1.94,.073,.068,.006)]
parts.append(loft('torso_sections',[((0,cy,z),rx,ry) for z,rx,ry,cy in torso],40))
for side,sgn in [('L',1),('R',-1)]:
    # Narrow ankle, tibial ridge and two expanding calf profiles avoid tube legs.
    secs=[(.105,.16,.01,.055,.065),(.18,.15,.015,.047,.055),(.27,.151,.015,.056,.067),(.39,.153,.022,.077,.085),(.49,.154,.013,.083,.085),(.58,.155,-.028,.066,.077),(.64,.155,-.035,.069,.077),(.71,.155,-.01,.084,.089),(.83,.154,.016,.104,.105),(.96,.146,.012,.119,.116),(1.06,.143,.01,.123,.126),(1.11,.142,.01,.102,.106)]
    parts.append(loft('leg_'+side,[((sgn*x,y,z),rx,ry) for z,x,y,rx,ry in secs],24))
    armpts=[(sgn*.226,.018,1.733),(sgn*.29,.012,1.72),(sgn*.34,.008,1.671),(sgn*.395,.002,1.596),(sgn*.458,-.003,1.518),(sgn*.518,-.005,1.455),(sgn*.541,-.008,1.413),(sgn*.579,-.013,1.347),(sgn*.615,-.018,1.275),(sgn*.65,-.024,1.208),(sgn*.664,-.025,1.175)]
    parts.append(tube('arm_'+side,armpts,[.089,.108,.095,.088,.078,.064,.063,.073,.063,.045,.041],24,flattened=.88))
    # Palm is a flattened volume oriented across the A-pose forearm axis.
    parts.append(tube('palm_'+side,[(sgn*.661,-.025,1.19),(sgn*.676,-.035,1.147),(sgn*.688,-.043,1.104),(sgn*.69,-.044,1.084)],[.037,.046,.045,.028],16,flattened=.45))
    # Five digits, continuous through voxel union. Four long + opposed thumb.
    for k,(off,length) in enumerate([(-.035,.073),(-.012,.091),(.013,.094),(.035,.077)]):
        x=sgn*(.69+off);z=1.105+(abs(off)-.015)*.23
        parts.append(tube('finger_%s_%d'%(side,k+1),[(x,-.043,z),(x+sgn*.005,-.05,z-length*.48),(x+sgn*.010,-.059,z-length*.88),(x+sgn*.012,-.058,z-length)],[.014,.012,.0095,.004],10,flattened=.78))
    parts.append(tube('thumb_'+side,[(sgn*.651,-.032,1.151),(sgn*.626,-.038,1.118),(sgn*.626,-.05,1.084),(sgn*.637,-.058,1.07)],[.018,.016,.012,.004],10,flattened=.85))
    # Aquatic feet: three long visible toes plus small fourth, with webs below.
    parts.append(loft('foot_base_'+side,[((sgn*.15,-.04,.045),.072,.131),((sgn*.15,-.058,.078),.073,.139),((sgn*.15,-.025,.12),.061,.10),((sgn*.15,.005,.17),.045,.06)],20))
    for k,(dx,endy) in enumerate([(-.052,-.215),(-.017,-.25),(.024,-.24),(.057,-.205)]):
        parts.append(tube('toe_%s_%d'%(side,k+1),[(sgn*(.15+dx*.7),-.11,.066),(sgn*(.15+dx),endy+.04,.055),(sgn*(.15+dx*1.2),endy,.041)],[.022,.018,.007],10,flattened=.65))

# Body-only sculpt union. Eyes, ears, hair and costume remain editable meshes.
bpy.ops.object.select_all(action='DESELECT')
for ob in parts:ob.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();body=bpy.context.object;body.name='Anatomia_Continua'
mod=body.modifiers.new('Uniao_Anatomica_Voxel','REMESH');mod.mode='VOXEL';mod.voxel_size=.008;mod.use_smooth_shade=True
bpy.ops.object.modifier_apply(modifier=mod.name)
sm=body.modifiers.new('Relaxamento_Anatomico','SMOOTH');sm.factor=.58;sm.iterations=5;bpy.ops.object.modifier_apply(modifier=sm.name)
dec=body.modifiers.new('Malha_Candidata','DECIMATE');dec.ratio=min(1,5000/max(1,len(body.data.polygons)));bpy.ops.object.modifier_apply(modifier=dec.name)
body['edf_region']='body';body['topology_note']='Voxel fusion + relaxation + decimation; artist retopology and extreme-deformation review remain pending.'
for p in body.data.polygons:p.use_smooth=True
if body.data.color_attributes.get('Color'):body.data.color_attributes.remove(body.data.color_attributes['Color'])
co=body.data.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='POINT')
for i,v in enumerate(body.data.vertices):
    x,y,z=v.co
    frontal=max(0,min(1,(-y+.03)/.18));pale=frontal*max(0,1-abs(x)/.25)*max(0,1-abs(z-1.52)/.38)
    co.data[i].color=(.76+.25*pale,.91+.12*pale,.98+.08*pale,1)
uvsmart(body)

# A sculpted cross-section head. Nose, cheek planes, socket recesses, muzzle and
# chin are displacements of ONE face surface, not attached nose/head primitives.
headprofile=[(1.886,.025,.035,.0),(1.913,.054,.055,-.012),(1.943,.078,.076,-.003),(1.975,.098,.086,0),(2.015,.111,.092,.005),(2.055,.126,.102,.010),(2.092,.123,.105,.014),(2.13,.118,.108,.021),(2.17,.111,.105,.026),(2.209,.092,.090,.028),(2.24,.054,.060,.025),(2.25,.008,.010,.022)]
vs=[];uv=[];cols=[];R=48;S=48
def interp(z,c):return float(np.interp(z,[p[0] for p in headprofile],[p[c] for p in headprofile]))
def gauss(x,z,cx,cz,sx,sz):return exp(-((x-cx)/sx)**2-((z-cz)/sz)**2)
def face_displacement(x,z):
    d=-.021*gauss(x,z,0,2.075,.020,.052)-.024*gauss(x,z,0,2.042,.021,.018)
    d-=.012*(gauss(x,z,.024,2.035,.014,.012)+gauss(x,z,-.024,2.035,.014,.012))
    d+=.025*(gauss(x,z,.054,2.101,.036,.022)+gauss(x,z,-.054,2.101,.036,.022))
    d-=.019*(gauss(x,z,.054,2.129,.041,.012)+gauss(x,z,-.054,2.129,.041,.012))
    d-=.015*(gauss(x,z,.071,2.062,.030,.017)+gauss(x,z,-.071,2.062,.030,.017))
    d-=.018*gauss(x,z,0,1.989,.049,.019)+.013*gauss(x,z,0,1.939,.043,.019)
    return d
def face_y(x,z):
    """Front surface shared by the head and its fitted mouth/nasal details."""
    rx,ry,cy=interp(z,1),interp(z,2),interp(z,3)
    angle=math.asin(max(-1,min(1,x/max(.0001,rx))))
    return cy-ry*cos(angle)+face_displacement(x,z)*max(0,cos(angle))**7
for j in range(R):
    z=1.886+(2.25-1.886)*j/(R-1);rx,ry,cy=interp(z,1),interp(z,2),interp(z,3)
    for i in range(S):
        a=2*pi*i/S;x=rx*sin(a);y=cy-ry*cos(a);front=max(0,cos(a))**7
        d=face_displacement(x,z)
        y+=d*front;vs.append((x,y,z));uv.append((i/S,j/(R-1)))
        # Nose, chin and central face are pearlescent, temple fields cooler.
        central=exp(-(x/.085)**2)*front;cols.append((.90+.22*central,.98+.12*central,1+.09*central,1))
fs=[]
for j in range(R-1):
    for i in range(S):fs.append((j*S+i,j*S+(i+1)%S,(j+1)*S+(i+1)%S,(j+1)*S+i))
fs.extend([tuple(range(S-1,-1,-1)),tuple((R-1)*S+i for i in range(S))])
head=mesh('Cabeca_Esculpida',vs,fs,skin,'head',colors=cols,uv=uv)

for side,sgn in [('L',1),('R',-1)]:
    center=(sgn*.054,-.073,2.102)
    sphere('Olho_3D_'+side,center,(.026,.016,.014),eye,'head',(.66,.78,.78,1),24,16)
    # True three-dimensional iris/cornea/pupil, not a painted face marker.
    sphere('Iris_'+side,(sgn*.054,-.0875,2.103),(.0108,.0025,.0108),eye,'head',(.12,.43,.38,1),20,12)
    sphere('Anel_Iris_'+side,(sgn*.054,-.0895,2.103),(.0078,.0013,.0080),eye,'head',(.23,.58,.44,1),16,10)
    sphere('Pupila_'+side,(sgn*.054,-.091,2.103),(.0042,.0012,.0065),dark,'head',(.028,.055,.064,1),16,10)
    # Orbital skin annulus partly covers the sclera, producing an almond-shaped
    # opening. It also blends the separate eyeball into the sculpted cheek.
    orbit=[];ouv=[]
    for ring in range(4):
        t=ring/3
        for ii in range(32):
            angle=2*pi*ii/32
            rx=.0255+t*.014;rz=(.0105 if sin(angle)>0 else .008)+t*.016
            ox=sgn*(.054+rx*cos(angle));oz=2.102+rz*sin(angle)
            oy=-.089+t*.019+.005*abs(cos(angle))
            orbit.append((ox,oy,oz));ouv.append((ii/32,t))
    of=[]
    for ring in range(3):
        for ii in range(32):of.append((ring*32+ii,ring*32+(ii+1)%32,(ring+1)*32+(ii+1)%32,(ring+1)*32+ii))
    mesh('Orbita_Anatomica_'+side,orbit,of,skin,'head',(.94,1.04,1.08,1),uv=ouv)
    for upper in [True,False]:
        pts=[]
        for j in range(17):
            t=j/16;xx=(t*2-1)*.0255;zz=(sin(pi*t)*(.0105 if upper else -.008))+.002*(t-.5)
            pts.append((sgn*(.054+xx),-.084-.005*sin(pi*t),2.102+zz))
        tube(('Palpebra_Superior_' if upper else 'Palpebra_Inferior_')+side,pts,[.0028+.0007*sin(pi*j/16) for j in range(17)],6,skin,'head',(.62,.83,.87,1))
    # Thin brow strand with a clear taper, leaving brow plane visible.
    tube('Sobrancelha_'+side,[(sgn*.020,-.107,2.135),(sgn*.042,-.117,2.14),(sgn*.067,-.108,2.139),(sgn*.087,-.089,2.132)],[.002,.0055,.005,.0005],7,hair,'head',(.48,.68,.76,1),.44)
    nasal_points=[(sgn*.012,2.031),(sgn*.022,2.033),(sgn*.028,2.035)]
    tube('Narina_'+side,[(x,face_y(x,z)-.0008,z) for x,z in nasal_points],[.0015,.0028,.001],6,dark,'head',(.15,.18,.18,1),.65)

# Mouth has two shaped lip edges and a separate narrow oral seam.
for upper in [True,False]:
    pts=[]
    for j in range(25):
        x=-.042+.084*j/24;t=x/.042
        z=1.986+((.007*(1-t*t)-.004*exp(-(t/.23)**2)) if upper else -.006*(1-t*t))
        pts.append((x,face_y(x,z)-.0015,z))
    tube('Labio_Superior' if upper else 'Labio_Inferior',pts,[.001+.0032*sin(pi*j/24) for j in range(25)],7,skin,'head',(1.05,.87,.84,1),.75)
oral_points=[(-.04,1.985),(-.02,1.985),(0,1.984),(.02,1.985),(.04,1.985)]
tube('Linha_Oral',[(x,face_y(x,z)-.001,z) for x,z in oral_points],[.0005,.0014,.0016,.0014,.0005],6,dark,'head')

# Ear fans have interpolated thickness, curved margins and skeletal ribs.
for side,sgn in [('L',1),('R',-1)]:
    root=Vector((sgn*.109,.013,2.075))
    ends=[(sgn*.152,-.005,2.035),(sgn*.207,.010,2.065),(sgn*.256,.020,2.110),(sgn*.274,.035,2.175),(sgn*.226,.020,2.159),(sgn*.165,.009,2.148)]
    verts=[];f=[];cols=[];uv=[]
    for j in range(6):
        end=Vector(ends[j])
        for k in range(5):
            t=k/4;p=root.lerp(end,t);p.y-=.018*sin(pi*t)*sin(pi*j/5)
            verts.append(tuple(p));uv.append((t,j/5));cols.append((.42+.14*t,.125+.10*t,.095+.08*t,1))
    for j in range(5):
        for k in range(4):f.append((j*5+k,j*5+k+1,(j+1)*5+k+1,(j+1)*5+k))
    ob=mesh('Orelha_Membrana_'+side,verts,f,eye,'ear.'+side,colors=cols,uv=uv)
    sol=ob.modifiers.new('Espessura_Membrana','SOLIDIFY');sol.thickness=.0025;sol.offset=0;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=sol.name)
    for j,end in enumerate(ends):
        # Front-facing ribs sit above the bowed membrane rather than behind it.
        mid=root.lerp(Vector(end),.57);mid.y-=.024
        tube('Nervura_Orelha_%s_%d'%(side,j),[tuple(root),tuple(mid),end],[.0045,.003,.0009],6,skin,'ear.'+side,(.88,1.04,1.10,1))
    rim=[]
    for j in range(1,len(ends)):rim.append(ends[j])
    tube('Borda_Orelha_'+side,rim,[.0035]*len(rim),7,skin,'ear.'+side,(.8,1.01,1.05,1))

# Webs are thin curved surfaces. Their vertex positions remain separate and
# editable so rigging can blend adjacent finger/toe weights, not only hand bone.
for side,sgn in [('L',1),('R',-1)]:
    for k,(aa,bb) in enumerate([(-.035,-.012),(-.012,.013),(.013,.035)]):
        verts=[(sgn*(.69+aa),-.045,1.105),(sgn*(.69+bb),-.045,1.105),(sgn*(.697+bb),-.051,1.069),(sgn*(.697+(aa+bb)/2),-.05,1.078),(sgn*(.697+aa),-.051,1.073)]
        ob=mesh('Membrana_Mao_%s_%d'%(side,k),verts,[(0,1,2,3,4)],skin,'hand.'+side,(.9,1.04,1.08,1));uvsmart(ob)
        mod=ob.modifiers.new('WebThickness','SOLIDIFY');mod.thickness=.0015;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=mod.name)
    for k,(a,b) in enumerate([(-.052,-.017),(-.017,.024),(.024,.057)]):
        verts=[(sgn*(.15+a*.7),-.12,.066),(sgn*(.15+b*.7),-.12,.066),(sgn*(.15+b),-.215,.047),(sgn*(.15+(a+b)*.5),-.196,.051),(sgn*(.15+a),-.205,.047)]
        ob=mesh('Membrana_Pe_%s_%d'%(side,k),verts,[(0,1,2,3,4)],skin,'foot.'+side,(.88,1.04,1.10,1));uvsmart(ob)
        mod=ob.modifiers.new('WebThickness','SOLIDIFY');mod.thickness=.002;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=mod.name)

# Solid swept hair locks: tapered, directional and irregular, with dark-blue
# highlight strands. No cones, transparency cards or unexportable hair systems.
for k in range(23):
    a=-1.22+2.44*(k%12)/11
    band=k//12;z=2.18+(.014*sin(k*2.31) if not band else -.012);x=.105*sin(a);y=-.079+.040*abs(sin(a))+.068*band
    length=.21+.09*(.5+.5*cos(k*2.13));endz=2.08-length*.45 if band else 2.13-length*.35
    pts=[(x,y,z-.025),(x*.96,y+.030,z+.037),(x*1.08,y+.12,z+.055),(x*1.25,y+.19,z+.005),(x*1.34,y+.21,endz)]
    tube('Mecha_Cabelo_%02d'%k,pts,[.001,.019,.022,.015,.0012],6,hair,'hair',(.74+.12*sin(k),.90,1.0,1),.52)
    if k%7==0:
        tube('Reflexo_Mecha_%02d'%k,[(p[0]+.004,p[1]-.006,p[2]+.007) for p in pts[:-1]],[.001,.0018,.0013,.0003],5,hair,'hair',(1.2,1.5,1.7,1))
# Forehead roots are backwards, angular, unifying volume instead of a cone crest.
for k in range(7):
    x=(k-3)*.025
    tube('Mecha_Frontal_%02d'%k,[(x,-.082,2.146+abs(x)*.32+.014*sin(k*2)),(x*.88,-.034,2.217+.014*sin(k)),(x*.72,.055,2.265+.013*cos(k)),(x*.83,.145,2.225),(x*.95,.18,2.13+.025*sin(k))],[.001,.015,.020,.013,.001],6,hair,'hair',(.8,1,1.13,1),.5)
# Three stranded hanging braids at the temples and back.
for side,sgn in [('L',1),('R',-1)]:
    for j in range(2):
        pts=[]
        for t in np.linspace(0,1,15):pts.append((sgn*(.103+.026*j)+.006*sin(t*pi*9+j),.045+.026*j+.007*cos(t*pi*9+j),2.16-t*(.43+.06*j)))
        tube('Tranca_%s_%d'%(side,j),pts,[.0105*(1-.65*q/14) for q in range(15)],7,hair,'hair',(.78,.95,1.04,1))
        for q in [5,10]:
            p=pts[q];tube('Conta_Tranca_%s_%d_%d'%(side,j,q),[(p[0],p[1],p[2]-.009),(p[0],p[1],p[2]+.009)],[.012,.012],9,copper,'hair',(.75,.77,.55,1))

# Costume: short fitted leather side jacket, layered marine textiles and belt.
# Cloth panels are real meshes with fold fields and modest thickness.
def panel(name, points, rows=8, cols=8, mat=cloth, region='pelvis', color=(1,1,1,1)):
    # Four corners [top left,top right,bottom right,bottom left].
    vv=[];uv=[]
    for j in range(rows+1):
        t=j/rows;l=Vector(points[0]).lerp(Vector(points[3]),t);r=Vector(points[1]).lerp(Vector(points[2]),t)
        for i in range(cols+1):
            u=i/cols;p=l.lerp(r,u);p.y+=sin(u*pi*5)*.007*sin(t*pi*.9);vv.append(tuple(p));uv.append((u,t))
    ff=[]
    for j in range(rows):
        for i in range(cols):a=j*(cols+1)+i;ff.append((a,a+1,a+cols+2,a+cols+1))
    ob=mesh(name,vv,ff,mat,region,color,uv=uv);mod=ob.modifiers.new('Borda_Tecido','SOLIDIFY');mod.thickness=.003;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=mod.name)
    return ob

# Asymmetric shoulder vest built from torso-surface patch, not armor spheres.
for side,sgn in [('L',1),('R',-1)]:
    sections=[]
    for z in [1.33,1.40,1.49,1.58,1.67,1.735]:
        rx=float(np.interp(z,[p[0] for p in torso],[p[1] for p in torso]))+.009
        ry=float(np.interp(z,[p[0] for p in torso],[p[2] for p in torso]))+.009
        cy=float(np.interp(z,[p[0] for p in torso],[p[3] for p in torso]))
        sections.append((z,rx,ry,cy))
    vv=[];uv=[]
    for j,(z,rx,ry,cy) in enumerate(sections):
        for i in range(10):
            angle=(.41+1.9*i/9)*sgn;vv.append((rx*sin(angle),cy-ry*cos(angle),z));uv.append((i/9,j/5))
    ff=[]
    for j in range(5):
        for i in range(9):a=j*10+i;ff.append((a,a+1,a+11,a+10))
    ob=mesh('Colete_Lateral_'+side,vv,ff,leather,'chest',uv=uv);mod=ob.modifiers.new('Couro_Espessura','SOLIDIFY');mod.thickness=.007;bpy.context.view_layer.objects.active=ob;bpy.ops.object.modifier_apply(modifier=mod.name)
    # Front edges have stitched contrast, narrow, not huge gold outlines.
    edgepts=[(sgn*rx*sin(.41),cy-ry*cos(.41)-.002,z) for z,rx,ry,cy in sections]
    tube('Costura_Colete_'+side,edgepts,[.0018]*len(edgepts),5,copper,'chest',(.65,.77,.58,1))

belt=loft('Cinto_Couro',[((0,.007,1.105),.225,.144),((0,.006,1.16),.212,.138)],40,leather,'pelvis')
# Flared overlapping panels, fore and side leave knees/ankles free and exposed.
panel('Tecido_Frontal',[(-.13,-.149,1.115),(.135,-.15,1.115),(.105,-.173,.65),(-.05,-.172,.69)],4,6,cloth,'pelvis')
panel('Tecido_Traseiro',[(.14,.143,1.12),(-.14,.144,1.12),(-.125,.182,.68),(.125,.182,.68)],4,6,cloth,'pelvis')
for side,sgn in [('L',1),('R',-1)]:
    panel('Saia_Couro_'+side,[(sgn*.105,-.142,1.12),(sgn*.229,-.031,1.11),(sgn*.285,-.012,.78),(sgn*.159,-.158,.84)],6,4,leather,'thigh.'+side)
    # Fine edge trim follows folds and is weighted to the same thigh.
    tube('Borda_Saia_'+side,[(sgn*.105,-.146,1.12),(sgn*.127,-.155,.97),(sgn*.159,-.162,.84)],[.0028,.0028,.0028],6,copper,'thigh.'+side,(.78,.71,.50,1))

# Curved cross-body belt on the outside of the jacket follows chest profile.
strap=[]
for j in range(16):
    t=j/15;z=1.15+t*.605;x=-.156+t*.385
    ry=float(np.interp(z,[p[0] for p in torso],[p[2] for p in torso]));rx=float(np.interp(z,[p[0] for p in torso],[p[1] for p in torso]));cy=float(np.interp(z,[p[0] for p in torso],[p[3] for p in torso]))
    y=cy-ry*sqrt(max(.2,1-(x/max(.1,rx))**2))-.017;strap.append((x,y,z))
tube('Correia_Diagonal',strap,[.022]*len(strap),8,leather,'chest',flattened=.16)
for off in [-.015,.015]:tube('Costura_Correia_'+str(off),[(x+off,y-.004,z) for x,y,z in strap],[.0012]*len(strap),5,copper,'chest',(.65,.65,.49,1))

# Copper/pearl ornament is art only: it does not create an inventory item.
sphere('Fecho_Madreperola',(0,-.156,1.13),(.034,.009,.028),copper,'pelvis',(.93,.98,.82,1),24,12)
sphere('Fecho_Pedra',(0,-.165,1.13),(.020,.006,.016),eye,'pelvis',(.13,.56,.57,1),20,12)
necklace=[]
for i in range(21):
    t=pi*i/20;necklace.append((.106*cos(t),-.072-.026*sin(t),1.84-.095*sin(t)))
tube('Colar_Fibra',necklace,[.003]*21,6,leather,'neck')
sphere('Colar_Perola',(0,-.105,1.744),(.018,.007,.026),copper,'chest',(.98,1.02,.9,1),18,10)
for side,sgn in [('L',1),('R',-1)]:
    # Bracers follow the A-pose arm rather than unaligned cuffs.
    pts=[(sgn*.575,-.012,1.355),(sgn*.615,-.018,1.275),(sgn*.648,-.024,1.215)]
    tube('Bracadeira_'+side,pts,[.076,.066,.048],16,leather,'forearm.'+side,flattened=.88)
    for j,p in enumerate([pts[0],pts[-1]]):
        tangent=Vector(pts[-1])-Vector(pts[0]);tangent.normalize();r=.077 if j==0 else .049
        tube('Aro_Bracadeira_%s_%d'%(side,j),[tuple(Vector(p)-tangent*.003),tuple(Vector(p)+tangent*.003)],[r,r],16,copper,'forearm.'+side,(.76,.74,.53,1),.88)
    # Ankle wrap leaves all aquatic foot anatomy visible.
    loft('Tornozeleira_'+side,[((sgn*.15,.01,.16),.049,.059),((sgn*.15,.01,.195),.05,.06)],20,leather,'shin.'+side)
    sphere('Brinco_'+side,(sgn*.15,-.006,2.052),(.007,.006,.011),copper,'ear.'+side,(1.0,.88,.63,1),14,8)
    tube('Brinco_Pendente_'+side,[(sgn*.15,-.006,2.045),(sgn*.157,-.009,2.022),(sgn*.153,-.008,2.001)],[.0015,.002,.001],6,copper,'ear.'+side)
    sphere('Brinco_Perola_'+side,(sgn*.153,-.008,1.998),(.005,.004,.008),copper,'ear.'+side,(.9,1.02,.96,1),12,8)

# Bow: a recognizably curved wooden/copper recurved arc and taut string. The
# existing Errante remains the only mechanical equipment source.
bow=[]
for t in np.linspace(-1,1,23):bow.append((.738+.077*(t*t)-.014*math.sin(t*pi*2),-.032,.1+1.08+t*.47))
tube('Arco_Piloto',bow,[.008+.005*(1-abs(t)) for t in np.linspace(-1,1,23)],8,leather,'bow_L',flattened=.8)
tube('Corda_Arco',[bow[0],(.738,-.034,1.18),bow[-1]],[.0012,.0012,.0012],5,dark,'bow_L',(.8,.9,.88,1))
tube('Empunhadura_Arco',[(.738,-.032,1.14),(.738,-.032,1.22)],[.016,.016],10,leather,'bow_L',flattened=.8)
for ob in bpy.context.scene.objects:
    if ob.get('edf_region')=='bow_L':ob.location+=Vector((-.063,.004,-.05))

# Sparse scaled temple ornaments, turquoise lower than copper in luminance.
for side,sgn in [('L',1),('R',-1)]:
    for j in range(3):
        x=sgn*(.076+.005*(j%2));z=2.059+j*.018
        sphere('Escama_Temporal_%s_%d'%(side,j),(x,-.082,z),(.0052,.0015,.0043),copper,'head',(.5,.65,.6,1),10,6)

# Stable mesh metadata; materials and packed copies remain external PNG sources.
for ob in list(bpy.context.scene.objects):
    if ob.type=='MESH':
        if not ob.data.uv_layers:uvsmart(ob)
        if len(ob.data.materials) and ob.data.materials[0]==skin:
            tiling=.41666667 if ob.name=='Cabeca_Esculpida' else 1.0
            for item in ob.data.uv_layers.active.data:item.uv*=tiling
        ob['edf_author']='Ecos dos Faróis / original authored procedural Blender study'
        ob['edf_candidate']='naquiro-male-0.1.0'
        ob.select_set(False)

scene=bpy.context.scene
scene['edf_landmarks']=json.dumps({'pelvis':[0,0,1.08],'chest':[0,0,1.57],'neck':[0,0,1.86],'head':[0,0,2.06],'shoulder_L':[.31,0,1.73],'elbow_L':[.53,-.005,1.44],'wrist_L':[.66,-.025,1.18],'hip_L':[.145,0,1.05],'knee_L':[.155,-.035,.61],'ankle_L':[.15,.01,.15]})
scene['edf_note']='Candidate for visual and deformation review. Not human-approved final art. Canonical body height is unspecified; 2.3 is a rendering scale only.'
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=False
# Keep headless cloud generation predictable on hosts exposing many CPUs.
scene.render.threads_mode='FIXED';scene.render.threads=int(os.environ.get('EDF_BLENDER_THREADS','2'))
scene.render.resolution_x=1200;scene.render.resolution_y=1400;scene.render.resolution_percentage=100
scene.world.color=(.045,.045,.045)
scene.view_settings.view_transform='AgX'
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=False

def area(name,loc,power,color,size,target=(0,0,1.2)):
    data=bpy.data.lights.new(name,'AREA');data.energy=power;data.color=color;data.shape='DISK';data.size=size
    ob=bpy.data.objects.new(name,data);scene.collection.objects.link(ob);ob.location=loc;ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler();return ob
area('Studio_Key',(-3,-4,5),560,(.84,.93,1),4)
area('Studio_Fill',(3,-2,2.8),330,(.55,.85,.89),3)
area('Studio_Rim',(1,3,3.5),700,(1,.72,.44),3)
# A separate preview ground is hidden from export by its region marker.
ground=mesh('Studio_Ground',[(-200,-200,-.009),(200,-200,-.009),(200,200,-.009),(-200,200,-.009)],[(0,1,2,3)],material('Studio_Only',(.055,.07,.075),.85),'studio')
ground['edf_export']=False
camdata=bpy.data.cameras.new('Studio_Camera');cam=bpy.data.objects.new('Studio_Camera',camdata);scene.collection.objects.link(cam);scene.camera=cam
camdata.type='ORTHO';camdata.ortho_scale=2.65

# Save editable geometry first so rig production can run before preview renders.
# Pack authored maps and retain relative paths: the source also opens on a
# Windows machine without the cloud workspace's absolute folder names.
for im in [skin_color,skin_normal,skin_rough,leather_color,leather_rough,cloth_color]:
    im.pack();im.filepath='//textures/'+im.name+'.png'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,'base.blend'))
stats={'meshes':0,'vertices':0,'triangles':0,'materials':len(MATS),'maps':6,'height_representation':2.3,'retopology':'voxel-relaxed decimated candidate; hand retopology and extreme deformation review pending'}
for ob in scene.objects:
    if ob.type=='MESH' and ob.get('edf_region')!='studio':
        ob.data.calc_loop_triangles();stats['meshes']+=1;stats['vertices']+=len(ob.data.vertices);stats['triangles']+=len(ob.data.loop_triangles)
with open(os.path.join(OUT,'model-stats.json'),'w') as f:json.dump(stats,f,indent=2)
print('EDF_MODEL_READY',json.dumps(stats),flush=True)

def render(name,loc,target,scale=2.65,res=(1200,1400)):
    cam.location=loc;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler();camdata.ortho_scale=scale
    scene.render.resolution_x=res[0];scene.render.resolution_y=res[1];scene.render.filepath=os.path.join(EVIDENCE,name+'.png');bpy.ops.render.render(write_still=True)

if os.environ.get('EDF_SKIP_PREVIEWS')!='1':
    render('model-three-quarter',(3,-5,2.8),(0,0,1.16))
    render('model-front',(0,-5,1.3),(0,0,1.16))
    render('model-profile',(5,0,1.3),(0,0,1.16))
    render('model-back',(0,5,1.3),(0,0,1.16))
    render('model-face',(.42,-1,2.17),(0,-.015,2.06),.63,(1200,1200))
