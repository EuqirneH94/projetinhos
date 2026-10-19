"""Editable, explicitly connected anatomy study. No remesh/decimation.

The authored cage deliberately uses broad anatomical masses rather than a skin
texture.  Dimensions are study coordinates, not a canonical racial height.
"""
import math
import bpy
import bmesh
from mathutils import Vector

TAU = 2.0 * math.pi


class Cage:
    def __init__(self):
        self.v = []
        self.f = []
        self.regions = {}

    def vertex(self, p):
        self.v.append(tuple(p))
        return len(self.v) - 1

    def face(self, ids):
        self.f.append(tuple(ids))

    def bridge(self, a, b):
        """Join loops, choosing the least-distorted cyclic correspondence."""
        if len(a) == len(b):
            def error(loop):
                return sum((Vector(self.v[x]) - Vector(self.v[y])).length_squared
                           for x, y in zip(a, loop))
            candidates = []
            for seq in (b, list(reversed(b))):
                for shift in range(len(seq)):
                    loop = seq[shift:] + seq[:shift]
                    candidates.append((error(loop), loop))
            b = min(candidates, key=lambda item: item[0])[1]
            for j in range(len(a)):
                k = (j + 1) % len(a)
                self.face((a[j], a[k], b[k], b[j]))
            return b
        if len(a) == 2 * len(b):
            # Deliberate 2:1 transition at ankle, not inside knee bend loops.
            # Each sector consists of one quad and one triangle.
            def error(loop):
                return sum((Vector(self.v[a[2*j]]) - Vector(self.v[loop[j]])).length_squared
                           for j in range(len(loop)))
            candidates = []
            for seq in (b, list(reversed(b))):
                for shift in range(len(seq)):
                    loop = seq[shift:] + seq[:shift]
                    candidates.append((error(loop), loop))
            b = min(candidates, key=lambda item: item[0])[1]
            for j in range(len(b)):
                k = (j + 1) % len(b)
                a0, a1, a2 = a[2*j], a[2*j+1], a[(2*j+2) % len(a)]
                self.face((a0, a1, b[k], b[j]))
                self.face((a1, a2, b[k]))
            return b
        raise ValueError('Unsupported cage loop ratio %d:%d' % (len(a), len(b)))

    def tube(self, boundary, sections, axis, up=(0, -1, 0)):
        """Extrude a real boundary with correspondingly sampled oval rings."""
        tangent = Vector(axis).normalized()
        u = Vector(up).normalized()
        u = (u - tangent * u.dot(tangent)).normalized()
        w = tangent.cross(u).normalized()
        count = len(boundary)
        # Fixed geometric sampling makes left/right vertex sets true mirrors.
        # Deriving phase from the first irregular branch-boundary vertex caused
        # a measurable 9 mm side difference in draft01, despite symmetric radii.
        # bridge() still chooses the correct cyclic/winding correspondence.
        phase = 0.0
        direction = 1
        previous = boundary
        rings = []
        for center, ru, rw in sections:
            center = Vector(center)
            ring = []
            for j in range(count):
                angle = phase + direction * TAU * j / count
                p = center + u * (ru * math.cos(angle)) + w * (rw * math.sin(angle))
                ring.append(self.vertex(p))
            previous = self.bridge(previous, ring)
            rings.append(previous)
        return previous, rings

    def cap(self, loop, center):
        # A quad fan, with one central polygon when the perimeter is divisible4.
        # Tips use a small terminal ring and planar quad/n-gon cap, not a spike.
        self.face(tuple(reversed(loop)))


def _gaussian(value, center, width):
    return math.exp(-((value-center)/width)**2)


def _box(cage, nx, ny, nz, point, holes):
    """Shared-vertex quad box, with intentional rectangular branching holes.

    A hole is (fixed_axis, fixed_coordinate, u0, u1, v0, v1), where the
    remaining axes are in ascending order. Returns its welded coordinate map.
    """
    dims = (nx, ny, nz)
    mapping = {}

    def vertex(coords):
        key = tuple(coords)
        if key not in mapping:
            mapping[key] = cage.vertex(point(*coords))
        return mapping[key]

    for axis in range(3):
        other = [i for i in range(3) if i != axis]
        for side in (0, dims[axis]):
            for u in range(dims[other[0]]):
                for v in range(dims[other[1]]):
                    if any(h[0] == axis and h[1] == side and h[2] <= u < h[3]
                           and h[4] <= v < h[5] for h in holes):
                        continue
                    corners = []
                    for du, dv in ((0, 0), (1, 0), (1, 1), (0, 1)):
                        coords = [0, 0, 0]
                        coords[axis] = side
                        coords[other[0]] = u + du
                        coords[other[1]] = v + dv
                        corners.append(vertex(coords))
                    cage.face(corners)

    def perimeter(hole):
        axis, side, lo, hi, bot, top = hole
        other = [i for i in range(3) if i != axis]
        path = ([(u, bot) for u in range(lo, hi)] +
                [(hi, v) for v in range(bot, top)] +
                [(u, top) for u in range(hi, lo, -1)] +
                [(lo, v) for v in range(top, bot, -1)])
        result = []
        for u, v in path:
            coords = [0, 0, 0]
            coords[axis], coords[other[0]], coords[other[1]] = side, u, v
            result.append(vertex(coords))
        return result
    return [perimeter(hole) for hole in holes]


def _digit(cage, boundary, start, direction, length, radius, flattened=.83):
    direction = Vector(direction).normalized()
    start = Vector(start)
    sections = []
    for t, scale in ((.08, 1), (.22, .94), (.39, .88), (.45, .90),
                     (.51, .84), (.65, .76), (.72, .78), (.79, .68),
                     (.91, .57), (.975, .40), (1.0, .25)):
        # Gentle distal curl: the dorsal/ventral silhouette remains anatomical.
        p = start + direction * (length*t) + Vector((0, -.004*t*t, 0))
        sections.append((p, radius*flattened*scale, radius*scale))
    end, rings = cage.tube(boundary, sections, direction)
    cage.cap(end, start + direction*length)
    return rings


def _hand(cage, side, wrist_loop):
    s = side
    origin = Vector((s*.666, -.018, 1.170))
    longitudinal = Vector((s*.27, -.015, -.963)).normalized()
    across = Vector((s*.963, 0, .27)).normalized()
    normal = Vector((0, -1, 0))
    nx, ny, nz = 11, 2, 6
    length = .081

    def point(i, j, k):
        t = k/nz
        width = .035 + .019*math.sin(t*math.pi*.63)
        thickness = .0115 + .004*math.sin(t*math.pi) - .0025*t
        x = (i/nx*2-1)*width
        depth = (j/ny*2-1)*thickness
        # Thenar eminence is volumetric and fades into wrist/palm.
        depth += .0035*_gaussian(i/nx, .20, .23)*math.sin(t*math.pi)
        return origin + longitudinal*(length*t) + across*x + normal*depth

    wrist = (2, 0, 0, nx, 0, ny)
    roots = [(2, nz, i, i+2, 0, 2) for i in (0, 3, 6, 9)]
    thumb = (0, 0, 0, ny, 2, 4)
    loops = _box(cage, nx, ny, nz, point, [wrist] + roots + [thumb])
    cage.bridge(wrist_loop, loops[0])
    fingers = []
    for k, (loop, finger_length) in enumerate(zip(loops[1:5], (.094, .112, .106, .084))):
        start = sum((Vector(cage.v[i]) for i in loop), Vector())/len(loop)
        spread = (-.14, -.035, .055, .18)[k]
        direction = (longitudinal + across*spread).normalized()
        rings = _digit(cage, loop, start, direction, finger_length, .0114)
        fingers.append({'root': loop, 'rings': rings, 'length': finger_length})
    loop = loops[5]
    start = sum((Vector(cage.v[i]) for i in loop), Vector())/len(loop)
    direction = (longitudinal*.75 - across*.72 + normal*.10).normalized()
    thumb_rings = _digit(cage, loop, start, direction, .073, .014)
    return {'fingers': fingers, 'thumb': {'root': loop, 'rings': thumb_rings},
            'wrist': loops[0], 'side': 'L' if side > 0 else 'R'}


def _foot(cage, side, ankle_loop):
    s = side
    nx, ny, nz = 11, 10, 2
    xcenter = s*.153

    def point(i, j, k):
        xx = (i/nx*2-1)
        # Front is -Y. Narrow heel and widened metatarsal platform.
        yy = -.158 + .238*j/ny
        halfwidth = .077 - .031*(j/ny)**2
        # The ankle opening is narrower than the forefoot without a rigid cuff.
        if k == nz and 2 <= i <= 10 and 2 <= j <= 10:
            xx = (i-6)/4
            halfwidth = .046
            yy = -.044 + .094*(j-2)/8
        zz = .027 + .040*k/nz
        if k == 0:
            zz += .012*_gaussian(yy, -.005, .055)*(1-abs(xx))
        if k == nz:
            zz += .065*_gaussian(yy, .013, .07)
        return (xcenter + s*xx*halfwidth, yy, zz)

    ankle = (2, nz, 2, 10, 2, 10)  # 32 boundary vertices
    roots = [(1, 0, i, i+2, 0, nz) for i in (0, 3, 6, 9)]
    loops = _box(cage, nx, ny, nz, point, [ankle] + roots)
    cage.bridge(ankle_loop, loops[0])
    toes = []
    for k, (loop, toe_length) in enumerate(zip(loops[1:], (.071, .090, .080, .060))):
        start = sum((Vector(cage.v[i]) for i in loop), Vector())/len(loop)
        direction = Vector((s*(-.13 + k*.085), -1, -.13)).normalized()
        rings = _digit(cage, loop, start, direction, toe_length, .0165, .68)
        toes.append({'root': loop, 'rings': rings, 'length': toe_length})
    return {'ankle': loops[0], 'toes': toes, 'side': 'L' if side > 0 else 'R'}


def _membrane(name, collection, material, a, b, side, scale):
    """Editable thickened partial web; free edge is concave and tips are free."""
    # The web follows 2 adjacent digit surfaces, not a plate closing the tips.
    vertices, faces = [], []
    rows, cols = 6, 8
    for i in range(rows+1):
        t = i/rows
        for j in range(cols+1):
            u = j/cols
            # Low center of free margin makes a concave interdigital arc.
            max_t = .64 - .30*math.sin(math.pi*u)
            at = t*max_t
            pa = a[0].lerp(a[1], at)
            pb = b[0].lerp(b[1], at)
            p = pa.lerp(pb, u)
            p.y += .002*math.sin(math.pi*u)*math.sin(math.pi*t)
            vertices.append(tuple(p))
    for i in range(rows):
        for j in range(cols):
            k = i*(cols+1)+j
            faces.append((k, k+1, k+cols+2, k+cols+1))
    mesh = bpy.data.meshes.new(name+'_Cage')
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    ob = bpy.data.objects.new(name, mesh)
    collection.objects.link(ob)
    ob.data.materials.append(material)
    for p in mesh.polygons:
        p.use_smooth = True
    solid = ob.modifiers.new('Espessura_Editavel_0008', 'SOLIDIFY')
    solid.thickness = .0008
    solid.offset = 0
    sub = ob.modifiers.new('Membrana_Subdivisao_1', 'SUBSURF')
    sub.levels = 1
    sub.render_levels = 1
    ob['edf_region'] = 'web.'+('L' if side > 0 else 'R')
    ob['topology_note'] = 'Separate editable web surface; nonzero thickness modifier. Digit roots are overlaid, not welded into body cage.'
    return ob


def build_body(material, collection):
    cage = Cage()
    n = 64
    # z, half-width, depth, center-Y. Broad transitions articulate bones/muscles.
    profile = [
        (1.025, .245, .133, .014), (1.075, .233, .137, .018),
        (1.125, .217, .137, .014), (1.185, .194, .122, .010),
        (1.250, .174, .112, .008), (1.325, .175, .120, .010),
        (1.400, .196, .135, .014), (1.475, .226, .149, .018),
        (1.535, .247, .154, .024), (1.590, .258, .150, .025),
        (1.650, .264, .141, .026), (1.700, .259, .126, .026),
        (1.750, .235, .112, .025), (1.800, .218, .092, .024),
        (1.825, .135, .074, .021), (1.860, .080, .065, .018),
        (1.895, .065, .058, .016), (1.925, .061, .056, .015),
    ]
    torso = []
    for row, (z, rx, ry, cy) in enumerate(profile):
        loop = []
        for j in range(n):
            th = TAU*j/n
            x, y = rx*math.sin(th), cy-ry*math.cos(th)
            front = max(0.0, math.cos(th))
            back = max(0.0, -math.cos(th))
            # Broad pec lobes, sternum and serratus transitions are real volume.
            pec = .017*_gaussian(abs(x), .105, .082)*_gaussian(z, 1.585, .085)
            sternum = .007*_gaussian(x, 0, .021)*_gaussian(z, 1.535, .16)
            abdomen = .007*_gaussian(abs(x), .059, .037)*_gaussian(z, 1.365, .15)
            clavicle_z = 1.720 + .046*math.sin(min(1, abs(x)/.26)*math.pi*.5)
            clavicle = .007*_gaussian(z, clavicle_z, .018)*_gaussian(abs(x), .13, .13)
            oblique = .004*_gaussian(abs(x), .133, .045)*_gaussian(z, 1.365, .12)
            y -= (pec - sternum + abdomen + oblique)*front**3 + clavicle*front**6
            # The rectangular armhole's anterior/posterior borders originally
            # sat behind BOTH the pectoral/scapular surface and the first arm
            # ring. That produced an insertion-like vertical groove. Restore
            # tissue volume along that local border, tapering across adjacent
            # angular sectors and into the actual lower axillary recess.
            # This retains chest/shoulder landmarks without flattening torso.
            shoulder_fill = {8: .012, 9: .025, 10: .030,
                             11: .027, 12: .018, 13: .006}.get(row, 0)
            side_angle = math.asin(min(1, abs(math.sin(th))))
            border_weight = _gaussian(side_angle, math.pi*3/8, .23)
            cos_th = math.cos(th)
            if abs(cos_th) > 1e-10:
                y -= math.copysign(shoulder_fill*border_weight*
                                   min(1, abs(cos_th)/.30), cos_th)
            # Scapula to latissimus, sacrum to gluteal transition.
            y += back**3*(.012*_gaussian(abs(x), .115, .07)*_gaussian(z, 1.65, .11)
                         + .015*_gaussian(abs(x), .104, .075)*_gaussian(z, 1.095, .09)
                         - .006*_gaussian(x, 0, .025)*_gaussian(z, 1.37, .27))
            # Subtle clavicular and trapezius slope avoids a flat shoulder shelf.
            zz = z + .010*_gaussian(z, 1.78, .065)*(1-abs(math.sin(th)))
            # Lift the lowest axillary edge toward the arm; the prior vertical
            # side opening left a long narrow cleft despite being manifold.
            # This is an authored tissue transition, not a global smoothing pass.
            side_lifts = {8: .065, 9: .045, 10: .027, 11: .010,
                          12: -.008, 13: -.015}
            zz += side_lifts.get(row, 0)*abs(math.sin(th))**8
            if row == len(profile)-1:  # contractual neck loop, undistorted
                x, y, zz = .061*math.sin(th), .015-.056*math.cos(th), 1.925
            loop.append(cage.vertex((x, y, zz)))
        torso.append(loop)
    # Branch openings: angular eight sectors and vertical five intervals =>26.
    hole_low, hole_high = 8, 13
    holes = ((12, 20), (44, 52))
    for i in range(len(torso)-1):
        for j in range(n):
            if hole_low <= i < hole_high and any(a <= j < b for a, b in holes):
                continue
            cage.face((torso[i][j], torso[i][(j+1)%n],
                       torso[i+1][(j+1)%n], torso[i+1][j]))

    # Saddle crotch: both legs share exactly the same central boundary edges.
    bottom = torso[0]
    crotch = [bottom[32]]
    for k in range(1, 32):
        t = k/32
        y = .014 + .122*math.cos(math.pi*t)
        z = 1.025 - .072*math.sin(math.pi*t)
        crotch.append(cage.vertex((0, y, z)))
    crotch.append(bottom[0])
    leg_boundaries = [bottom[:33] + crotch[1:-1],
                      bottom[32:] + [bottom[0]] + list(reversed(crotch[1:-1]))]
    hands, feet = [], []
    limb_metadata = {}
    for s, (jlo, jhi), leg_loop in zip((1, -1), holes, leg_boundaries):
        side_name = 'L' if s > 0 else 'R'
        boundary = ([torso[hole_low][j] for j in range(jlo, jhi)] +
                    [torso[i][jhi] for i in range(hole_low, hole_high)] +
                    [torso[hole_high][j] for j in range(jhi, jlo, -1)] +
                    [torso[i][jlo] for i in range(hole_high, hole_low, -1)])
        arm_sections = [
            ((s*.276, .020, 1.685), .080, .092),
            ((s*.315, .017, 1.667), .082, .090),
            ((s*.349, .012, 1.630), .079, .085),
            ((s*.389, .007, 1.580), .069, .078),
            ((s*.433, .002, 1.524), .061, .070),
            ((s*.475, -.004, 1.477), .055, .058),
            ((s*.495, -.009, 1.455), .052, .055),
            ((s*.509, -.012, 1.432), .056, .059),
            ((s*.523, -.014, 1.408), .060, .063),
            ((s*.549, -.014, 1.367), .060, .062),
            ((s*.579, -.014, 1.320), .057, .058),
            ((s*.611, -.016, 1.266), .049, .052),
            ((s*.638, -.018, 1.220), .037, .043),
            ((s*.651, -.018, 1.192), .028, .036),
        ]
        arm_end, arm_rings = cage.tube(boundary, arm_sections, (s*.64, 0, -.77))
        hands.append(_hand(cage, s, arm_end))
        # Ascending anatomical masses, with repeated support either side of knee.
        leg_sections = [
            ((s*.143, .019, .982), .118, .112),
            ((s*.151, .012, .925), .114, .112),
            ((s*.155, .003, .845), .106, .106),
            ((s*.157, -.008, .760), .092, .094),
            ((s*.157, -.024, .689), .079, .082),
            ((s*.157, -.034, .652), .071, .075),
            ((s*.157, -.039, .625), .070, .073),
            ((s*.156, -.034, .598), .071, .074),
            ((s*.155, -.021, .560), .076, .079),
            ((s*.154, .003, .498), .083, .086),
            ((s*.153, .017, .423), .080, .084),
            ((s*.153, .024, .348), .066, .073),
            ((s*.153, .023, .273), .052, .060),
            ((s*.153, .020, .211), .046, .053),
            ((s*.153, .016, .170), .043, .049),
            ((s*.153, .015, .148), .043, .049),
        ]
        leg_end, leg_rings = cage.tube(leg_loop, leg_sections, (0, 0, -1))
        feet.append(_foot(cage, s, leg_end))
        # Moderate biceps/triceps, patella, tibial ridge and calf asymmetry.
        # Keep landmarks in the real cage and avoid relying on normal maps.
        for ring in arm_rings:
            for vertex_id in ring:
                x, y, z = cage.v[vertex_id]
                frontness = max(0, min(1, (-y+.015)/.09))
                backness = max(0, min(1, (y-.015)/.09))
                y -= .007*_gaussian(z, 1.59, .075)*frontness**2
                y += .008*_gaussian(z, 1.62, .085)*backness**2
                cage.v[vertex_id] = (x, y, z)
        for ring in leg_rings:
            for vertex_id in ring:
                x, y, z = cage.v[vertex_id]
                frontness = max(0, min(1, (-y+.010)/.10))
                y -= frontness**3*(.008*_gaussian(z, .625, .026)
                                     + .007*_gaussian(z, .79, .11)
                                     + .005*_gaussian(z, .40, .12))
                cage.v[vertex_id] = (x, y, z)
        limb_metadata[side_name] = {'arm_rings': arm_rings, 'leg_rings': leg_rings,
                                   'armhole_loop': boundary}

    # Remove no-longer-used interior branch vertices, preserving honest indices.
    used = sorted({i for face in cage.f for i in face})
    remap = {old: new for new, old in enumerate(used)}
    mesh = bpy.data.meshes.new('Naquiro_Anatomia_Cage_Quads')
    mesh.from_pydata([cage.v[i] for i in used], [],
                     [tuple(remap[i] for i in face) for face in cage.f])
    mesh.update()
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    body = bpy.data.objects.new('Corpo_Base_002_Cage_Conectado', mesh)
    collection.objects.link(body)
    body.data.materials.append(material)
    for p in mesh.polygons:
        p.use_smooth = True
    sub = body.modifiers.new('Estudo_Subdivisao_1_Editavel', 'SUBSURF')
    sub.levels = 1
    sub.render_levels = 1
    body['edf_region'] = 'body'
    body['topology_note'] = 'Explicit cage: welded torso/shoulders/arms/5-digit hands/pelvis/legs/4-toe feet. Neck intentionally open64 for head join. 32 transition triangles per ankle; digit tips contain small n-gon caps. No remesh or decimate.'

    membranes = []
    def end_points(digit):
        root = sum((Vector(cage.v[i]) for i in digit['root']), Vector())/len(digit['root'])
        tip = sum((Vector(cage.v[i]) for i in digit['rings'][-1]), Vector())/len(digit['rings'][-1])
        return root, tip
    for data in hands:
        s = 1 if data['side'] == 'L' else -1
        digits = data['fingers']
        for k in range(3):
            membranes.append(_membrane('Membrana_Mao_%s_%d'%(data['side'], k+1),
                             collection, material, end_points(digits[k]),
                             end_points(digits[k+1]), s, .001))
    for data in feet:
        s = 1 if data['side'] == 'L' else -1
        for k in range(3):
            membranes.append(_membrane('Membrana_Pe_%s_%d'%(data['side'], k+1),
                             collection, material, end_points(data['toes'][k]),
                             end_points(data['toes'][k+1]), s, .001))
    def mapped_digit(data):
        return {**data, 'root': [remap[i] for i in data['root']],
                'rings': [[remap[i] for i in loop] for loop in data['rings']]}

    metadata = {
        'neck_loop': [remap[i] for i in torso[-1]],
        'neck_boundary': {'count': 64, 'z': 1.925, 'rx': .061, 'ry': .056,
                          'cy': .015, 'order': 'i=0 front(-Y); x=rx*sin(2pi*i/64), y=cy-ry*cos(...)'},
        'extra_objects': membranes,
        'membranes': membranes,
        'junctions': {'body_limbs_digits': 'welded single cage',
                      'neck': 'intentional open boundary64 for head weld',
                      'membranes': 'separate thickened editable overlays at interdigital roots'},
        'technical_conventions': {'hand_digits': 5, 'foot_digits': 4,
                                  'height_not_canonical': True},
        'limits': ['Ankle32 triangle transitions per side and small digit-tip caps remain candidates for manual retopology.',
                   'Separate membranes need pose-specific collision/weight review.',
                   'A predominantly quad cage is not proof of final deformation quality.'],
        'limb_loops': {s: {k: [[remap[i] for i in loop] for loop in loops]
                           if k.endswith('rings') else [remap[i] for i in loops]
                          for k, loops in data.items()}
                       for s, data in limb_metadata.items()},
        'hand_data': [{**data, 'wrist': [remap[i] for i in data['wrist']],
                       'fingers': [mapped_digit(digit) for digit in data['fingers']],
                       'thumb': mapped_digit(data['thumb'])}
                      for data in hands],
        'foot_data': [{**data, 'ankle': [remap[i] for i in data['ankle']],
                       'toes': [mapped_digit(digit) for digit in data['toes']]}
                      for data in feet],
    }
    return body, metadata
