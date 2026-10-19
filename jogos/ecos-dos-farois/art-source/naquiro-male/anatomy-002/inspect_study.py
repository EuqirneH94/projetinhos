"""Read-only structural inspection of the editable Blender anatomy study.

blender -b --threads 2 --python inspect_study.py -- --blend study.blend --out DIR
No save, export, remesh, topology repair or production-file writes occur here.
"""
from pathlib import Path
import argparse
from collections import Counter, defaultdict, deque
import hashlib
import json
import math
import sys

import bpy
from mathutils import Vector, Quaternion, Matrix
from mathutils.kdtree import KDTree

AREA_EPSILON = 1e-12
EDGE_EPSILON = 1e-8
SYMMETRY_TOLERANCE = 2e-6
NEUTRAL_TOLERANCE = 1e-8
COLLECTIONS = ('01_CORPO_BASE_NEUTRO', '02_CABECA_E_MEMBRANAS')
BODY_NAME = 'Corpo_Base_002_Continuo'
RIG_NAME = 'Rig_Anatomia_002_Estudo'


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def bounds(points):
    if not points:
        return None
    return {'minimum': [min(p[k] for p in points) for k in range(3)],
            'maximum': [max(p[k] for p in points) for k in range(3)]}


def topology(mesh, matrix, include_positions=False):
    """Count the actual mesh, and enumerate each connected boundary graph."""
    points = [matrix @ v.co for v in mesh.vertices]
    edge_faces = Counter()
    directions = defaultdict(list)
    adjacency = [[] for _ in points]
    used = set()
    for edge in mesh.edges:
        a, b = edge.vertices
        adjacency[a].append(b)
        adjacency[b].append(a)
    polygon_areas = []
    for polygon in mesh.polygons:
        ids = list(polygon.vertices)
        used.update(ids)
        # Compute world-space area through the actual tessellation below.
        for a, b in zip(ids, ids[1:] + ids[:1]):
            pair = tuple(sorted((a, b)))
            edge_faces[pair] += 1
            directions[pair].append((a, b))
    mesh.calc_loop_triangles()
    areas_by_polygon = [0.0] * len(mesh.polygons)
    for triangle in mesh.loop_triangles:
        a, b, c = (points[k] for k in triangle.vertices)
        areas_by_polygon[triangle.polygon_index] += (b-a).cross(c-a).length * .5
    polygon_areas = areas_by_polygon
    lengths = [(points[e.vertices[0]]-points[e.vertices[1]]).length for e in mesh.edges]
    loose = [list(e.vertices) for e in mesh.edges if edge_faces[tuple(sorted(e.vertices))] == 0]
    over = [list(e) for e, count in edge_faces.items() if count > 2]
    inconsistent = [list(e) for e, ds in directions.items() if len(ds) == 2 and ds[0] == ds[1]]
    boundary_edges = [e for e, count in edge_faces.items() if count == 1]
    badj = defaultdict(list)
    for a, b in boundary_edges:
        badj[a].append(b)
        badj[b].append(a)
    cycles = []
    pending = set(badj)
    while pending:
        seed = min(pending)
        seen = {seed}
        stack = [seed]
        while stack:
            i = stack.pop()
            for j in badj[i]:
                if j not in seen:
                    seen.add(j)
                    stack.append(j)
        pending.difference_update(seen)
        ps = [points[i] for i in sorted(seen)]
        center = sum(ps, Vector()) / len(ps)
        entry = {'vertices': len(seen), 'edges': sum(len(badj[i]) for i in seen)//2,
                 'is_cycle': all(len(badj[i]) == 2 for i in seen),
                 'center': list(center), 'bounds': bounds(ps)}
        if include_positions:
            entry['vertex_indices'] = sorted(seen)
        cycles.append(entry)
    components = []
    pending = set(range(len(points)))
    component_by_vertex = [-1] * len(points)
    while pending:
        seed = min(pending)
        seen = {seed}
        stack = [seed]
        while stack:
            i = stack.pop()
            for j in adjacency[i]:
                if j not in seen:
                    seen.add(j)
                    stack.append(j)
        index = len(components)
        for i in seen:
            component_by_vertex[i] = index
        components.append({'vertices': len(seen), 'bounds': bounds([points[i] for i in seen])})
        pending.difference_update(seen)
    finite = [i for i, p in enumerate(points) if not all(math.isfinite(x) for x in p)]
    counts = Counter(len(p.vertices) for p in mesh.polygons)
    report = {'vertices': len(points), 'edges': len(mesh.edges), 'polygons': len(mesh.polygons),
              'triangles': counts[3], 'quads': counts[4],
              'ngons': sum(v for k, v in counts.items() if k > 4),
              'tessellated_triangles': len(mesh.loop_triangles),
              'nonfinite_vertices': finite, 'bounds': bounds(points),
              'zero_area_faces': [i for i, a in enumerate(polygon_areas) if a <= AREA_EPSILON],
              'minimum_face_area': min(polygon_areas, default=None),
              'minimum_edge_length': min(lengths, default=None),
              'maximum_edge_length': max(lengths, default=None),
              'collapsed_edges': [i for i, length in enumerate(lengths) if length <= EDGE_EPSILON],
              'loose_edges': loose, 'unused_vertices': sorted(set(range(len(points))) - used),
              'edges_with_more_than_two_faces': over,
              'same_direction_shared_edges': inconsistent,
              'boundary_edges': len(boundary_edges), 'boundary_components': cycles,
              'connected_components': components}
    internal = {'points': points, 'lengths': lengths, 'edge_faces': edge_faces,
                'component_by_vertex': component_by_vertex}
    return report, internal


def expected_boundaries(name, report, evaluated=False):
    """Classify documented openings, never silently accept arbitrary holes."""
    loops = report['boundary_components']
    if name == BODY_NAME:
        expected = 'Two inner eyelid rings only; welded neck must be closed.'
        okay = len(loops) == 2
        for loop in loops:
            x, y, z = loop['center']
            valid = (loop['is_cycle'] and .025 < abs(x) < .075 and -.10 < y < -.045
                     and 2.09 < z < 2.15)
            loop['classification'] = 'intentional_inner_eyelid' if valid else 'UNEXPECTED_BODY_OPENING'
            okay = okay and valid
    elif name in ('ANAT002_Iris_L', 'ANAT002_Iris_R', 'ANAT002_Pupila_L', 'ANAT002_Pupila_R'):
        expected = 'One intentional 32-edge perimeter of the thin anatomical cap conformed onto the closed underlying globe.'
        okay = len(loops) == 1 and loops[0]['is_cycle'] and loops[0]['vertices'] == 32 and loops[0]['edges'] == 32
        for loop in loops:
            loop['classification'] = 'intentional_open_eye_cap_on_closed_globe' if okay else 'UNEXPECTED_EYE_CAP_BOUNDARY'
    elif 'Membrana_' in name or 'Orelha_Membrana_' in name:
        expected = ('Closed thickened membrane after modifiers.' if evaluated else
                    'One open perimeter of editable membrane cage; Solidify supplies thickness.')
        okay = len(loops) == (0 if evaluated else 1) and all(x['is_cycle'] for x in loops)
        for loop in loops:
            loop['classification'] = 'intentional_unthickened_membrane_perimeter'
    else:
        expected = 'Closed anatomical eye surface.'
        okay = len(loops) == 0
        for loop in loops:
            loop['classification'] = 'UNEXPECTED_EYE_SURFACE_OPENING'
    return {'expected': expected, 'pass': bool(okay)}


def mesh_checks(report):
    return all(not report[key] for key in (
        'nonfinite_vertices', 'zero_area_faces', 'collapsed_edges', 'loose_edges',
        'unused_vertices', 'edges_with_more_than_two_faces', 'same_direction_shared_edges'))


def inspect_materials(objects):
    reports = {}
    for ob in objects:
        for mat in ob.data.materials:
            if mat is None or mat.name in reports:
                continue
            errors = []
            if not mat.use_nodes or mat.node_tree is None:
                errors.append('Material does not expose a node-based Principled surface.')
                reports[mat.name] = {'pass': False, 'errors': errors}
                continue
            nodes = mat.node_tree.nodes
            principled = [node for node in nodes if node.type == 'BSDF_PRINCIPLED']
            prohibited = [node.name for node in nodes if node.type in (
                'TEX_IMAGE', 'VERTEX_COLOR', 'NORMAL_MAP', 'BUMP', 'ATTRIBUTE') or node.type.startswith('TEX_')]
            if prohibited:
                errors.append('Texture, vertex-color, attribute or normal-processing nodes present.')
            if len(principled) != 1:
                errors.append('Expected exactly one Principled BSDF.')
            values = {}
            if len(principled) == 1:
                p = principled[0]
                for key in ['Base Color', 'Metallic', 'Roughness', 'Normal', 'Emission Color', 'Emission Strength']:
                    socket = p.inputs.get(key)
                    if socket is None:
                        continue
                    if socket.is_linked:
                        errors.append(key + ' is linked rather than a neutral constant.')
                    val = socket.default_value
                    values[key] = list(val) if hasattr(val, '__len__') else float(val)
                color = values.get('Base Color', [1, 0, 0, 1])
                if max(color[:3])-min(color[:3]) > NEUTRAL_TOLERANCE or abs(color[3]-1) > NEUTRAL_TOLERANCE:
                    errors.append('Base color is not opaque neutral grey.')
                if abs(values.get('Metallic', 1)) > NEUTRAL_TOLERANCE:
                    errors.append('Metallic response is nonzero.')
                emission = values.get('Emission Color', [0, 0, 0, 1])[:3]
                if max(abs(v) for v in emission) > NEUTRAL_TOLERANCE and values.get('Emission Strength', 0) > NEUTRAL_TOLERANCE:
                    errors.append('Emissive response is nonzero.')
            reports[mat.name] = {'pass': not errors, 'errors': errors,
                                 'prohibited_nodes': prohibited, 'principled_inputs': values}
    return reports


def inspect_portability():
    images = []
    for image in bpy.data.images:
        if image.source != 'FILE':
            continue
        packed_file = image.packed_file
        packed_tiles = list(image.packed_files)
        packed = packed_file is not None or bool(packed_tiles)
        images.append({'name': image.name, 'source': image.source,
                       'packed': packed, 'packed_entries': len(packed_tiles),
                       'packed_bytes': packed_file.size if packed_file else
                           sum(entry.packed_file.size for entry in packed_tiles),
                       'external_file_present': Path(bpy.path.abspath(image.filepath)).is_file()})
    libraries = [{'name': lib.name, 'filename': Path(lib.filepath).name,
                  'external_file_present': Path(bpy.path.abspath(lib.filepath)).is_file()}
                 for lib in bpy.data.libraries]
    unpacked = [image['name'] for image in images if not image['packed']]
    return {'pass': not unpacked and not libraries, 'file_images': images,
            'unpacked_file_images': unpacked, 'linked_libraries': libraries,
            'method': 'Every FILE image must be embedded/packed, including the hidden checkpoint; no externally linked .blend libraries allowed.',
            'limits': 'Read-only dependency inspection; no file is unpacked, relinked or saved.'}


def inspect_weights(objects, rig):
    bones = {b.name for b in rig.data.bones if b.use_deform}
    reports = {}
    for ob in objects:
        group_names = {group.index: group.name for group in ob.vertex_groups}
        unweighted, bad_sums, excess, nonfinite = [], [], [], []
        max_influences, lo, hi = 0, math.inf, -math.inf
        used = set()
        for v in ob.data.vertices:
            bone_weights = [(group_names.get(g.group, ''), g.weight) for g in v.groups
                            if group_names.get(g.group, '') in bones]
            positives = [(n, w) for n, w in bone_weights if w > 1e-8]
            used.update(n for n, w in positives)
            if not positives:
                unweighted.append(v.index)
            if any(not math.isfinite(w) or w < 0 for n, w in bone_weights):
                nonfinite.append(v.index)
            total = sum(w for n, w in bone_weights)
            lo, hi = min(lo, total), max(hi, total)
            if abs(total-1) > 1e-5:
                bad_sums.append({'vertex': v.index, 'sum': total})
            if len(positives) > 4:
                excess.append(v.index)
            max_influences = max(max_influences, len(positives))
        modifiers = [m for m in ob.modifiers if m.type == 'ARMATURE']
        modifier_ok = len(modifiers) == 1 and modifiers[0].object == rig
        ignored = [g.name for g in ob.vertex_groups if g.name not in bones]
        reports[ob.name] = {'pass': not any([unweighted, bad_sums, excess, nonfinite]) and modifier_ok,
                            'unweighted_vertices': unweighted, 'invalid_weight_sums': bad_sums,
                            'over_four_influences': excess, 'nonfinite_or_negative_weights': nonfinite,
                            'maximum_bone_influences': max_influences,
                            'minimum_weight_sum': lo, 'maximum_weight_sum': hi,
                            'bone_groups_used': sorted(used), 'ignored_nonbone_groups': ignored,
                            'single_armature_modifier_targets_study_rig': modifier_ok}
    return reports


def symmetry(points):
    tree = KDTree(len(points))
    for i, p in enumerate(points):
        tree.insert(p, i)
    tree.balance()
    distances = []
    worst = []
    for i, p in enumerate(points):
        target = Vector((-p.x, p.y, p.z))
        _co, _idx, distance = tree.find(target)
        distances.append(distance)
        if distance > SYMMETRY_TOLERANCE:
            worst.append({'vertex': i, 'distance': distance, 'coordinate': list(p)})
    return {'method': 'Nearest reflected vertex across world X=0, all anatomy meshes together.',
            'tolerance': SYMMETRY_TOLERANCE, 'maximum_distance': max(distances, default=0),
            'mean_distance': sum(distances)/len(distances) if distances else 0,
            'vertices_above_tolerance': len(worst),
            'worst_vertices': sorted(worst, key=lambda x: x['distance'], reverse=True)[:20],
            'pass': not worst}


def neck_and_connectivity(body, mesh_report, internals):
    points = internals['points']
    # The body builder preserves this metadata group at the actual weld. The
    # group only locates a candidate plane: independent edge incidences and
    # component traversal below establish genuine shared topology.
    neck_group = body.vertex_groups.get('ESTUDO_Solda_Pescoco')
    marked = [v.index for v in body.data.vertices if neck_group and
              any(g.group == neck_group.index and g.weight > .5 for g in v.groups)]
    ring_points = [points[i] for i in marked]
    plane_z = sum(p.z for p in ring_points)/len(ring_points) if ring_points else 0
    center_y = (max(p.y for p in ring_points)+min(p.y for p in ring_points))/2 if ring_points else 0
    rx = max(abs(p.x) for p in ring_points) if ring_points else 0
    ry = (max(p.y for p in ring_points)-min(p.y for p in ring_points))/2 if ring_points else 0
    neck = [i for i, p in enumerate(points) if rx > 0 and ry > 0
            and abs(p.z-plane_z) < 2e-6
            and abs((p.x/rx)**2 + ((p.y-center_y)/ry)**2-1) < 1e-4]
    nset = set(neck)
    edges = [(a, b, faces) for (a, b), faces in internals['edge_faces'].items() if a in nset and b in nset]
    landmarks = {}
    for name, predicate in {
        'torso': lambda p: abs(p.x) < .12 and 1.4 < p.z < 1.65,
        'neck': lambda p: abs(p.x) < .07 and 1.9 < p.z < 1.99,
        'head': lambda p: 2.03 < p.z < 2.20,
        'left_hand': lambda p: p.x > .65 and 1.0 < p.z < 1.20,
        'right_hand': lambda p: p.x < -.65 and 1.0 < p.z < 1.20,
        'left_foot': lambda p: p.x > .10 and p.z < .15,
        'right_foot': lambda p: p.x < -.10 and p.z < .15,
    }.items():
        ids = [i for i, p in enumerate(points) if predicate(p)]
        landmarks[name] = {'vertices': len(ids),
                           'component_indices': sorted({internals['component_by_vertex'][i] for i in ids})}
    okay = (1.8 < plane_z < 2.05 and len(neck) == 64 and len(edges) == 64 and all(n == 2 for a, b, n in edges)
            and len(mesh_report['connected_components']) == 1
            and all(info['vertices'] > 0 and info['component_indices'] == [0] for info in landmarks.values()))
    return {'pass': okay, 'neck_ring_vertices': len(neck), 'neck_ring_edges': len(edges),
            'measured_neck_plane_z': plane_z, 'measured_ring_rx_ry_center_y': [rx, ry, center_y],
            'neck_edge_face_incidence_histogram': dict(Counter(n for a, b, n in edges)),
            'metadata_group_vertices': len(marked),
            'metadata_group_matches_measured_ring': set(marked) == nset,
            'landmarks': landmarks,
            'method': 'Actual mesh-edge graph, metadata-located and independently coordinate-matched 64 vertex neck ring, two incident faces per ring edge; no overlap claimed as weld.'}


def pose(rig, name):
    for bone in rig.pose.bones:
        bone.matrix_basis = Matrix.Identity(4)
        bone.location = (0, 0, 0)
        bone.scale = (1, 1, 1)
        bone.rotation_mode = 'QUATERNION'
        bone.rotation_quaternion = (1, 0, 0, 0)
    rotations = []
    def rotate(bone_name, axis, degrees):
        bone = rig.pose.bones[bone_name]
        local_axis = bone.bone.matrix_local.to_quaternion().inverted() @ Vector(axis)
        bone.rotation_quaternion = Quaternion(local_axis, math.radians(degrees))
        rotations.append({'bone': bone_name, 'world_rest_axis': axis, 'degrees': degrees})
    if name in ('arms90', 'arms-up'):
        degrees = 62 if name == 'arms90' else 115
        rotate('upperarm_L', (0, 1, 0), -degrees)
        rotate('upperarm_R', (0, 1, 0), degrees)
    elif name == 'elbow90':
        rotate('forearm_L', (1, 0, 0), -90)
        rotate('forearm_R', (1, 0, 0), -90)
    elif name == 'knee90':
        rotate('thigh_L', (1, 0, 0), -25)
        rotate('shin_L', (1, 0, 0), 90)
    elif name == 'hand-curl':
        # Partial closing only. Thumb opposition and collision acceptance are
        # deliberately outside these structural measurements.
        for side in ('L', 'R'):
            for digit in range(1, 5):
                rotate(f'finger{digit}_01_{side}', (1, 0, 0), -40)
                rotate(f'finger{digit}_02_{side}', (1, 0, 0), -45)
    elif name == 'toe-up':
        rotate('toe_L', (1, 0, 0), -25)
        rotate('toe_R', (1, 0, 0), -25)
    bpy.context.view_layer.update()
    return rotations


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--blend', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
    blend = Path(args.blend).resolve()
    out = Path(args.out).resolve()
    out.mkdir(parents=True, exist_ok=True)
    before = digest(blend)
    bpy.ops.wm.open_mainfile(filepath=str(blend))
    scene = bpy.context.scene
    objects = sorted({o for name in COLLECTIONS for o in bpy.data.collections[name].objects if o.type == 'MESH'}, key=lambda x: x.name)
    rig = bpy.data.objects[RIG_NAME]
    archive = bpy.data.collections['00_CHECKPOINT_001_OCULTO']
    source_pose = []
    for bone in rig.pose.bones:
        q = bone.rotation_quaternion if bone.rotation_mode == 'QUATERNION' else bone.rotation_euler.to_quaternion()
        if (bone.location.length > 1e-6 or (bone.scale-Vector((1,1,1))).length > 1e-6
                or abs(abs(q.w)-1) > 1e-6 or Vector((q.x, q.y, q.z)).length > 1e-6):
            source_pose.append({'bone': bone.name, 'location': list(bone.location),
                                'rotation_quaternion': list(q), 'scale': list(bone.scale)})
    report = {'study_id': scene.get('study_id'), 'blender': bpy.app.version_string,
              'source_blend': blend.name, 'source_sha256_before': before,
              'read_only': True, 'tolerances': {'polygon_area': AREA_EPSILON,
                'edge_length': EDGE_EPSILON, 'symmetry': SYMMETRY_TOLERANCE,
                'normalized_weight_sum': 1e-5},
              'archive': {'name': archive.name, 'hide_render': archive.hide_render,
                          'hide_viewport': archive.hide_viewport,
                          'object_count': len(archive.objects),
                          'pass': archive.hide_render and archive.hide_viewport and len(archive.objects) > 0},
              'rig': {'name': rig.name, 'bones': len(rig.data.bones),
                      'pass': len(rig.data.bones) == 46,
                      'source_pose_nonidentity_channels': source_pose,
                      'source_pose_is_neutral': not source_pose},
              'materials': inspect_materials(objects), 'portability': inspect_portability(),
              'weights': inspect_weights(objects, rig), 'objects': {}, 'poses': {},
              'limits': ['Structural checks do not certify self-intersection absence, anatomical correctness or final rig/deformation quality.',
                         'Separate membrane/fin/eye meshes remain separate; only the main body/head/neck and limb/digit cage is tested as one connected surface.',
                         'Iris/pupil caps intentionally have one 32-edge open perimeter each and overlap the closed underlying eye globe; they are not welded facial skin.',
                         'Six poses are in-memory diagnostic transformations of the study rig, not replacement runtime Actions.',
                         'Symmetry is vertex proximity across X=0, not a proof of perfect mirrored polygon connectivity.']}
    pose(rig, 'rest')
    all_points = []
    rest_lengths = {}
    body_internal = None
    for ob in objects:
        cage, internals = topology(ob.data, ob.matrix_world)
        cage['boundary_expectation'] = expected_boundaries(ob.name, cage)
        cage['pass'] = mesh_checks(cage) and cage['boundary_expectation']['pass']
        evaluated_ob = ob.evaluated_get(bpy.context.evaluated_depsgraph_get())
        evaluated_mesh = evaluated_ob.to_mesh()
        evaluated, evinternals = topology(evaluated_mesh, evaluated_ob.matrix_world)
        evaluated['boundary_expectation'] = expected_boundaries(ob.name, evaluated, evaluated=True)
        evaluated['pass'] = mesh_checks(evaluated) and evaluated['boundary_expectation']['pass']
        all_points.extend(internals['points'])
        rest_lengths[ob.name] = evinternals['lengths']
        evaluated_ob.to_mesh_clear()
        report['objects'][ob.name] = {'cage': cage, 'evaluated': evaluated,
            'modifiers': [{'name': m.name, 'type': m.type, 'viewport': m.show_viewport,
                           'render': m.show_render, **({'levels': m.levels, 'render_levels': m.render_levels} if m.type == 'SUBSURF' else {}),
                           **({'thickness': m.thickness} if m.type == 'SOLIDIFY' else {})} for m in ob.modifiers]}
        if ob.name == BODY_NAME:
            report['body_connectivity'] = neck_and_connectivity(ob, cage, internals)
    report['symmetry'] = symmetry(all_points)
    count_keys = ('vertices', 'edges', 'polygons', 'triangles', 'quads', 'ngons', 'tessellated_triangles')
    report['geometry_totals'] = {kind: {key: sum(entry[kind][key] for entry in report['objects'].values())
                                      for key in count_keys} for kind in ('cage', 'evaluated')}
    for name in ('arms90', 'arms-up', 'elbow90', 'knee90', 'hand-curl', 'toe-up'):
        entry = {'rotations': pose(rig, name), 'objects': {}}
        for ob in objects:
            evaluated_ob = ob.evaluated_get(bpy.context.evaluated_depsgraph_get())
            mesh = evaluated_ob.to_mesh()
            metrics, internals = topology(mesh, evaluated_ob.matrix_world)
            old = rest_lengths[ob.name]
            new = internals['lengths']
            if len(old) != len(new):
                metrics['rest_edge_count_changed'] = True
                metrics['edge_length_ratio_to_rest'] = None
            else:
                ratios = [a/b for a, b in zip(new, old) if b > EDGE_EPSILON]
                metrics['rest_edge_count_changed'] = False
                metrics['edge_length_ratio_to_rest'] = {'minimum': min(ratios, default=None),
                    'maximum': max(ratios, default=None),
                    'edges_below_quarter_rest_length': sum(x < .25 for x in ratios),
                    'edges_above_four_times_rest_length': sum(x > 4 for x in ratios)}
            # Posed boundaries may move; their topology (cycle counts) must match rest.
            rest = report['objects'][ob.name]['evaluated']
            metrics['boundary_topology_matches_rest'] = (
                metrics['boundary_edges'] == rest['boundary_edges'] and
                [x['vertices'] for x in metrics['boundary_components']] == [x['vertices'] for x in rest['boundary_components']])
            metrics['pass'] = mesh_checks(metrics) and not metrics['rest_edge_count_changed'] and metrics['boundary_topology_matches_rest']
            entry['objects'][ob.name] = metrics
            evaluated_ob.to_mesh_clear()
        entry['pass'] = all(x['pass'] for x in entry['objects'].values())
        report['poses'][name] = entry
    # The source file is never saved by the inspector; transformations above exist only in memory.
    report['source_sha256_after'] = digest(blend)
    report['source_blend_unchanged'] = report['source_sha256_after'] == before
    checks = {
        'archive_hidden': report['archive']['pass'],
        'standalone_images_and_no_linked_libraries': report['portability']['pass'],
        '46_study_bones': report['rig']['pass'],
        'source_study_rig_neutral_pose_channels': report['rig']['source_pose_is_neutral'],
        'neutral_materials': all(x['pass'] for x in report['materials'].values()),
        'normalized_max_four_bone_weights': all(x['pass'] for x in report['weights'].values()),
        'cage_and_evaluated_geometry': all(x[k]['pass'] for x in report['objects'].values() for k in ('cage', 'evaluated')),
        'continuous_body_neck_head_and_limbs': report.get('body_connectivity', {}).get('pass', False),
        'neutral_symmetry': report['symmetry']['pass'],
        'six_finite_nondegenerate_diagnostic_poses': all(x['pass'] for x in report['poses'].values()),
        'source_unchanged': report['source_blend_unchanged']}
    report['checks'] = checks
    report['pass'] = all(checks.values())
    (out/'inspection-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
    print('ANATOMY_INSPECTION', 'PASS' if report['pass'] else 'FAIL', json.dumps(checks, ensure_ascii=False))
    print('INSPECTED_SOURCE_SHA256', before)
    if not report['pass']:
        raise RuntimeError('Anatomy study failed structural checks; read inspection-report.json without relaxing expectations.')


if __name__ == '__main__':
    main()
