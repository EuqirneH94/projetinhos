"""Editable neutral Náquiro head study, separate from the shipped 001 asset.

The facial skin is one quad surface: orbital and perioral rings replace real
patches of the head cage and share their boundary vertices. No floating lid,
lip or nasal primitives. Fins and eyeballs remain named anatomical submeshes.
Z up, front -Y. Dimensions are study targets, not approved racial biology.
"""
import math
import bpy
from mathutils import Vector

TAU = math.tau
N = 64
EYE_CY = -.046
EYE_CZ = 2.113
EYE_RX = .023
EYE_RY = .012
EYE_RZ = .013
LID_SKIN_MARGIN = .0018


def _gauss(x, z, cx, cz, sx, sz):
    return math.exp(-((x-cx)/sx)**2-((z-cz)/sz)**2)


def _interp(z, rows, column):
    """Monotone cubic Hermite interpolation, with continuous derivatives.

    Unlike a smoothstep on each segment this does not flatten the tangent at
    every anatomical landmark, which made the first study look terraced.
    """
    if z <= rows[0][0]:
        return rows[0][column]
    h=[b[0]-a[0] for a,b in zip(rows,rows[1:])]
    delta=[(b[column]-a[column])/step for a,b,step in zip(rows,rows[1:],h)]
    slopes=[delta[0]]
    for i in range(1,len(rows)-1):
        if delta[i-1]*delta[i]<=0:
            slopes.append(0.)
        else:
            w1=2*h[i]+h[i-1];w2=h[i]+2*h[i-1]
            slopes.append((w1+w2)/(w1/delta[i-1]+w2/delta[i]))
    slopes.append(delta[-1])
    for i,(a, b) in enumerate(zip(rows, rows[1:])):
        if z <= b[0]:
            t = (z-a[0])/(b[0]-a[0])
            t2=t*t;t3=t2*t;step=b[0]-a[0]
            return ((2*t3-3*t2+1)*a[column]+(t3-2*t2+t)*step*slopes[i]
                    +(-2*t3+3*t2)*b[column]+(t3-t2)*step*slopes[i+1])
    return rows[-1][column]


PROFILE = [
    (1.925,.061,.056,.015), (1.943,.065,.060,.011),
    (1.957,.075,.070,.004), (1.977,.087,.081,.007),
    (2.011,.097,.084,.013), (2.061,.109,.089,.020),
    (2.100,.112,.092,.024), (2.141,.107,.098,.032),
    (2.185,.101,.099,.037), (2.217,.083,.086,.035),
    (2.239,.052,.058,.031), (2.244,.030,.035,.028),
]


def _front_y(x, z):
    rx, ry, cy = [_interp(z, PROFILE, k) for k in (1,2,3)]
    front = math.sqrt(max(0, 1-(x/max(.001,rx))**2))
    y = cy-ry*front
    # Nose bridge, tip and alae are displacement of the continuous skin.
    d = -.018*_gauss(x,z,0,2.111,.017,.045)
    d -= .030*_gauss(x,z,0,2.072,.016,.014)
    d -= .014*sum(_gauss(x,z,s*.017,2.069,.011,.009) for s in (-1,1))
    # Recessed sockets, shaped brow and cheek planes, refined male jaw/chin.
    d += .007*sum(_gauss(x,z,s*.049,2.113,.031,.015) for s in (-1,1))
    d -= .013*sum(_gauss(x,z,s*.047,2.135,.036,.011) for s in (-1,1))
    d -= .006*_gauss(x,z,0,2.136,.018,.018)
    d -= .012*sum(_gauss(x,z,s*.069,2.089,.026,.015) for s in (-1,1))
    d += .004*sum(_gauss(x,z,s*.080,2.045,.020,.026) for s in (-1,1))
    d -= .008*_gauss(x,z,0,2.022,.042,.016)
    d -= .014*_gauss(x,z,0,1.974,.038,.019)
    # Soft philtral pillars link the nose base to the cupid bow continuously.
    d -= .0025*sum(_gauss(x,z,s*.006,2.043,.0035,.012) for s in (-1,1))
    # Nasal aperture is a small geometric crease, not a detached black tube.
    d += .0048*sum(_gauss(x,z,s*.0145,2.062,.0055,.0032) for s in (-1,1))
    return y+d*front**4


def _object(name, verts, faces, material, collection):
    data = bpy.data.meshes.new(name+'_Cage')
    data.from_pydata(verts, [], faces)
    data.materials.append(material)
    data.update()
    ob = bpy.data.objects.new(name, data)
    collection.objects.link(ob)
    for p in data.polygons:
        p.use_smooth = True
    return ob


def _neutral(name, value, roughness=.5):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    mat.diffuse_color = (value,value,value,1)
    p = mat.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (value,value,value,1)
    p.inputs['Roughness'].default_value = roughness
    return mat


def _uvsphere(name, center, scale, material, collection, seg=32, rings=20):
    # Explicit small mesh, avoiding operators and active-collection surprises.
    vs = [tuple(Vector(center)+Vector((0,0,-scale[2])))]
    for j in range(1,rings):
        a = -math.pi/2+math.pi*j/rings
        for i in range(seg):
            b = TAU*i/seg
            vs.append((center[0]+scale[0]*math.cos(a)*math.sin(b),
                       center[1]-scale[1]*math.cos(a)*math.cos(b),
                       center[2]+scale[2]*math.sin(a)))
    vs.append(tuple(Vector(center)+Vector((0,0,scale[2]))))
    fs = []
    for i in range(seg):
        fs.append((0,1+(i+1)%seg,1+i))
    for j in range(rings-2):
        for i in range(seg):
            a=1+j*seg+i; b=1+j*seg+(i+1)%seg
            fs.append((a,b,b+seg,a+seg))
    top=len(vs)-1; row=1+(rings-2)*seg
    for i in range(seg):
        fs.append((row+i,row+(i+1)%seg,top))
    return _object(name,vs,fs,material,collection)


def _eye_cap(name, cx, radius, surface_offset, material, collection):
    """Thin editable iris/pupil cap conformed to the actual globe ellipsoid.

    A shallow UV sphere is not conformal: its lower edge can protrude through
    an otherwise correctly fitted eyelid. These patches stay only 0.1/0.2 mm
    in front of the white globe, beneath the 1.8 mm eyelid safety shell.
    Their outer boundaries intentionally remain open on the underlying globe.
    """
    segments=32; rings=6
    def point(r,a):
        dx=r*math.cos(a);dz=r*math.sin(a)
        q=(dx/EYE_RX)**2+(dz/EYE_RZ)**2
        y=EYE_CY-EYE_RY*math.sqrt(max(0,1-q))-surface_offset
        return (cx+dx,y,EYE_CZ+dz)
    verts=[point(0,0)]
    for j in range(1,rings+1):
        for i in range(segments):
            verts.append(point(radius*j/rings,TAU*i/segments))
    faces=[]
    for i in range(segments):
        faces.append((0,1+i,1+(i+1)%segments))
    for j in range(rings-1):
        inner=1+j*segments;outer=inner+segments
        for i in range(segments):
            ni=(i+1)%segments
            faces.append((inner+i,outer+i,outer+ni,inner+ni))
    ob=_object(name,verts,faces,material,collection)
    ob['attachment_note']='Open anatomical cap conforms to globe ellipsoid; surface offset %.6f m.' % surface_offset
    return ob


def build_head(material, eye_material, collection):
    """Return (objects, metadata), including main_mesh and ordered neck_loop.

    Boundary is exactly 64 vertices at z=1.925, cy=.015, rx=.061, ry=.056.
    Index 0 faces -Y; x=rx*sin(theta), y=cy-ry*cos(theta). The caller may
    weld it to the identically sampled body boundary without a bridging gap.
    """
    verts=[]; faces=[]; objects=[]
    zrows=[1.925+(2.244-1.925)*j/63 for j in range(64)]
    for row,z in enumerate(zrows):
        rx,ry,cy=[_interp(z,PROFILE,k) for k in (1,2,3)]
        for i in range(N):
            a=TAU*i/N; x=rx*math.sin(a); c=math.cos(a)
            y=cy-ry*c
            if c>0 and row>0:
                # Reuse one projection function for nose/lids/mouth attachment.
                y=_front_y(x,z)
            verts.append((x,y,z))
    # Mouth and orbit patches are actually removed, then replaced by rings.
    nearest=lambda z:min(range(64),key=lambda j:abs(zrows[j]-z))
    patches=[('eye.L',2,8,nearest(2.096),nearest(2.134),.049,2.113),
             ('eye.R',56,62,nearest(2.096),nearest(2.134),-.049,2.113),
             ('mouth',-5,5,nearest(2.006),nearest(2.040),0,2.022)]
    removed=set()
    for name,lo,hi,bottom,top,cx,cz in patches:
        removed.update((j,i%N) for j in range(bottom,top) for i in range(lo,hi))
    for j in range(63):
        for i in range(N):
            if (j,i) not in removed:
                faces.append((j*N+i,j*N+(i+1)%N,(j+1)*N+(i+1)%N,(j+1)*N+i))

    # Remaining construction below deliberately shares indices with the head.
    patch_metadata={}
    for name,lo,hi,bottom,top,cx,cz in patches:
        outline=([bottom*N+i%N for i in range(lo,hi)]+
                 [j*N+hi%N for j in range(bottom,top)]+
                 [top*N+i%N for i in range(hi,lo,-1)]+
                 [j*N+lo%N for j in range(top,bottom,-1)])
        sx=max(abs(verts[k][0]-cx) for k in outline)
        sz=max(abs(verts[k][2]-cz) for k in outline)
        angles=[math.atan2((verts[k][2]-cz)/sz,(verts[k][0]-cx)/sx) for k in outline]
        previous=outline
        if name.startswith('eye'):
            ring_defs=[(.34,.0275,.014,.012),(.68,.0235,.0090,.0070),(1,.0200,.0058,.0038)]
            for t,rx,upper,lower in ring_defs:
                current=[]
                for k,a in enumerate(angles):
                    x=cx+rx*math.cos(a)
                    q=math.sin(a)
                    z=cz+(upper if q>=0 else lower)*q*(.73+.27*abs(q))+.0015*math.cos(a)*(1 if cx>0 else -1)
                    # Final lid edge is fitted to the globe's elliptical skin.
                    g=max(.025,1-((x-cx)/EYE_RX)**2-((z-cz)/EYE_RZ)**2)
                    globe_y=EYE_CY-EYE_RY*math.sqrt(g)-LID_SKIN_MARGIN
                    y=_front_y(x,z)*(1-t)+globe_y*t
                    current.append(len(verts));verts.append((x,y,z))
                for k in range(len(current)):
                    nk=(k+1)%len(current)
                    faces.append((previous[k],previous[nk],current[nk],current[k]))
                previous=current
            # A support ring only .65 mm behind the lid prevents paper edges.
            inside=[]
            for k in previous:
                x,y,z=verts[k]; inside.append(len(verts)); verts.append((x,y+.00065,z))
            for k in range(len(previous)):
                nk=(k+1)%len(previous);faces.append((previous[k],previous[nk],inside[nk],inside[k]))
            patch_metadata[name]={'outer_boundary':outline,'lid_boundary':previous,'inner_boundary':inside}
        else:
            # Outer skin -> vermilion volume -> closed-looking oral edge -> cavity.
            for rx,upper,lower,projection in [(.040,.009,.008,0),(.0375,.0054,.0047,-.0025),(.0355,.00060,.00050,-.0010),(.0335,.00050,.00045,.005)]:
                current=[]
                for a in angles:
                    q=math.sin(a); x=rx*math.cos(a)
                    # Cupid bow is small and male rather than a detached tube.
                    z=cz+(upper if q>=0 else lower)*q-.0012*(abs(x)/rx)**1.8
                    if q>0:
                        z-=.0011*math.exp(-(x/.009)**2)*q
                        z+=.0012*math.exp(-((abs(x)-.013)/.008)**2)*q
                    y=_front_y(x,z)+projection
                    current.append(len(verts));verts.append((x,y,z))
                for k in range(len(current)):
                    nk=(k+1)%len(current);faces.append((previous[k],previous[nk],current[nk],current[k]))
                previous=current
            # Narrow oral interior closes behind the lips. It is a cavity,
            # not a floating line placed in front of the facial surface.
            center=len(verts);verts.append((0,_front_y(0,cz)+.007,cz))
            for k in range(len(previous)):
                faces.append((previous[k],previous[(k+1)%len(previous)],center))
            patch_metadata[name]={'outer_boundary':outline,'inner_boundary':previous}

    # Crown cap is an editable 16x16 quad grid sharing the final 64-ring.
    # A square-to-disc parameterization avoids a high-valence scalp pole.
    perimeter=[]
    m=16
    perimeter += [(i,0) for i in range(m)]
    perimeter += [(m,j) for j in range(m)]
    perimeter += [(i,m) for i in range(m,0,-1)]
    perimeter += [(0,j) for j in range(m,0,-1)]
    mapping={p:63*N+k for k,p in enumerate(perimeter)}
    # Preserve exact perimeter order; transfinite interpolation fills the disk.
    def boundary(u,v):
        # The four arcs correspond directly to the head's ordered top loop.
        def arc(s):
            a=TAU*s;return Vector((.030*math.sin(a),.028-.035*math.cos(a),2.244))
        p00,p10,p11,p01=[arc(k/4) for k in range(4)]
        b=arc(u/4);r=arc(.25+v/4);t=arc(.75-u/4);l=arc(1-v/4)
        bil=p00*(1-u)*(1-v)+p10*u*(1-v)+p11*u*v+p01*(1-u)*v
        p=b*(1-v)+t*v+l*(1-u)+r*u-bil
        p.z=2.244+.006*math.sin(math.pi*u)*math.sin(math.pi*v)
        return tuple(p)
    for j in range(1,m):
        for i in range(1,m):
            mapping[(i,j)]=len(verts);verts.append(boundary(i/m,j/m))
    for j in range(m):
        for i in range(m):
            faces.append((mapping[(i,j)],mapping[(i+1,j)],mapping[(i+1,j+1)],mapping[(i,j+1)]))

    # Fit ALL facial skin over the globe, including the shared original cage
    # boundary. Fitting only the last lid edge leaves some surrounding annulus
    # points behind the white globe, so its full oval leaks through the skin.
    # A safety shell also allows the editable Catmull-Clark surface to shrink
    # slightly without cutting through the underlying eyeball. The tiny wall
    # behind the aperture is intentionally excluded: it turns into the socket.
    inner_lid_wall=set(k for name,data in patch_metadata.items()
                       if name.startswith('eye') for k in data['inner_boundary'])
    fitted_skin_vertices=set()
    for vi,(x,y,z) in enumerate(verts):
        if vi in inner_lid_wall or y>=0:
            continue
        for cx in (-.049,.049):
            q=((x-cx)/EYE_RX)**2+((z-EYE_CZ)/EYE_RZ)**2
            if q<=1.08:
                front=EYE_CY-EYE_RY*math.sqrt(max(0,1-q))-LID_SKIN_MARGIN
                if y>front:
                    y=front
                    fitted_skin_vertices.add(vi)
        verts[vi]=(x,y,z)

    # Prune unused vertices from the removed eye/mouth rectangles.
    used=set(k for face in faces for k in face)
    remap={old:new for new,old in enumerate(sorted(used))}
    head=_object('ANAT002_Cabeca_Quad_Integrada',[verts[k] for k in sorted(used)],
                 [tuple(remap[k] for k in f) for f in faces],material,collection)
    head['edf_region']='head'
    head['topology_note']='Continuous quad orbital/perioral skin; 64-vertex neck boundary for true body weld. Oral cavity fan and separate anatomical eye/fins disclosed.'
    sub=head.modifiers.new('Superficie_Subdivisao_Editavel','SUBSURF');sub.levels=1;sub.render_levels=1
    objects.append(head)
    iris_mat=_neutral('ANAT002_Iris_Cinza',.19,.47)
    pupil_mat=_neutral('ANAT002_Pupila_Cinza',.075,.44)
    for side,sgn in [('L',1),('R',-1)]:
        cx=sgn*.049
        objects.append(_uvsphere('ANAT002_Globo_'+side,(cx,EYE_CY,EYE_CZ),(EYE_RX,EYE_RY,EYE_RZ),eye_material,collection))
        objects.append(_eye_cap('ANAT002_Iris_'+side,cx,.0070,.0001,iris_mat,collection))
        objects.append(_eye_cap('ANAT002_Pupila_'+side,cx,.0028,.0002,pupil_mat,collection))
        objects.extend(_build_ear(side,sgn,material,collection))
    return objects,{'main_mesh':head.name,'neck_loop':[remap[i] for i in range(N)],
                    'neck_boundary':{'count':N,'z':1.925,'center_y':.015,'rx':.061,'ry':.056,'ordering':'i0 front -Y; x=rx*sin(theta), y=cy-ry*cos(theta)'},
                    'patches':{name:{label:[remap[k] for k in ids] for label,ids in data.items()} for name,data in patch_metadata.items()},
                    'eyelid_fit':{'globe_center_y':EYE_CY,'globe_center_z':EYE_CZ,
                                  'globe_radii':[EYE_RX,EYE_RY,EYE_RZ],
                                  'skin_margin':LID_SKIN_MARGIN,
                                  'fitted_cage_vertices':len(fitted_skin_vertices & used),
                                  'method':'All facial skin over projected globe ellipse fitted to safety shell; inner aperture wall excluded.'},
                    'limits':['Ear roots are separate anatomical surfaces overlapping lateral skull, not welded.',
                              'Iris and pupil are open thin caps on the globe, not closed independent spheres.',
                              'Oral cavity has a small triangle fan behind lip surface; facial skin annuli are quads.',
                              'Neutral study has no facial expression rig or final facial retopology approval.']}


def _build_ear(side, sgn, material, collection):
    """Curved posterior fin, small rim and continuous discrete root volume."""
    controls=[(.113,.012,2.077),(.145,.035,2.082),(.176,.061,2.118),
              (.201,.083,2.171),(.172,.059,2.156),(.141,.030,2.151),(.110,.010,2.132)]
    # Closed Catmull interpolation softens the fan margin while preserving point.
    contour=[]
    for i in range(len(controls)):
        a,b,c,d=[Vector(controls[k%len(controls)]) for k in (i-1,i,i+1,i+2)]
        for n in range(4):
            t=n/4
            p=.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t)
            contour.append(p)
    center=Vector((.132,.024,2.116));vs=[];fs=[];n=len(contour)
    for t in (.18,.37,.58,.80,1):
        for i,p in enumerate(contour):
            q=center.lerp(p,t)
            # Low-amplitude rays and saddle curvature, never rigid cone rods.
            q.y-=.0065*math.sin(math.pi*t)+.0012*math.cos(TAU*i/4)*math.sin(math.pi*t)
            vs.append((sgn*q.x,q.y,q.z))
    for j in range(4):
        for i in range(n):
            f=(j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i)
            fs.append(f if sgn>0 else tuple(reversed(f)))
    # Central root uses a very small fan inside the skull overlap, explicitly.
    k=len(vs);vs.append((sgn*center.x,center.y,center.z))
    for i in range(n):
        f=(k,(i+1)%n,i);fs.append(f if sgn>0 else tuple(reversed(f)))
    ob=_object('ANAT002_Orelha_Membrana_'+side,vs,fs,material,collection)
    ob['edf_region']='ear.'+side
    ob['attachment_note']='Anatomical fin separate from skull; concealed 5 mm overlap at root, not a welded root.'
    sub=ob.modifiers.new('Curvatura_Fina_Editavel','SUBSURF');sub.levels=1;sub.render_levels=1
    sol=ob.modifiers.new('Espessura_Anatomica_1p8mm','SOLIDIFY');sol.thickness=.0018;sol.offset=0
    return [ob]
