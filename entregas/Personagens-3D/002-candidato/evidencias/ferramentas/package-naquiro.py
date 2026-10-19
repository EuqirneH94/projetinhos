"""Package the reviewed runtime and editable Blender sources separately.

Run only after final build/browser/tests and staging of the complete code.
Archives are complementary independent ZIPs, never split binary streams.
"""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, tarfile, zipfile, zlib

WORK = Path('/workspace/edf-naquiro-production')
REPO = Path('/workspace/projetinhos')
GAME = REPO / 'jogos/ecos-dos-farois'
BASE = '00088c18aa0f789217d13ebf905d5e5ec0d2c7e8'
PREFIX = 'Ecos_dos_Farois_Naquiro_001'
STAGE = WORK / 'release' / PREFIX
OUT = WORK / 'delivery'
MAX_SIZE = 24 * 1024 ** 2

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def runtime_files():
    tracked = set(subprocess.check_output(['git', 'ls-files', '-z'], cwd=GAME).decode().split('\0'))
    for current, dirs, files in os.walk(GAME):
        relative = Path(current).relative_to(GAME)
        dirs[:] = sorted(d for d in dirs if d not in ('.git', '__pycache__', 'data', 'art-source') and not d.startswith('laboratorio-') and not d.endswith('.lock'))
        if relative == Path('node_modules'):
            dirs[:] = [d for d in dirs if d == 'ws']
            files = []
        for name in sorted(files):
            p = Path(current) / name
            if name == 'MANIFEST.sha256' or name == '.env' or name.endswith(('.sqlite', '.sqlite-wal', '.sqlite-shm', '.sqlite.lock', '.blend1', '.pyc')):
                continue
            if name.endswith('.log') and p.relative_to(GAME).as_posix() not in tracked:
                continue
            if p.is_symlink():
                raise RuntimeError(f'Unexpected symlink in distribution: {p}')
            # Preserve the three published, code-only historical checkpoints.
            # New local backups remain private and never enter the runtime.
            if relative.parts and relative.parts[0] == 'checkpoints' and name.endswith('.zip') and p.relative_to(GAME).as_posix() not in tracked:
                continue
            yield p

def archives(files, family):
    weighted = sorted(((len(zlib.compress(p.read_bytes(), 9)) + len(str(rel)) + 256, p, rel) for p, rel in files), reverse=True)
    count = max(1, (sum(x[0] for x in weighted) + MAX_SIZE - 1) // MAX_SIZE)
    while True:
        bins = [[] for _ in range(count)]; weights = [0] * count
        for weight, p, rel in weighted:
            i = weights.index(min(weights)); weights[i] += weight; bins[i].append((p, rel))
        outputs = []
        for i, items in enumerate(bins, 1):
            suffix = '' if count == 1 else f'_Parte_{i}_de_{count}'
            path = OUT / f'{family}{suffix}.zip'
            with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
                for p, rel in sorted(items, key=lambda x: str(x[1])):
                    z.write(p, PREFIX + '/' + rel.as_posix())
            outputs.append(path)
        if all(p.stat().st_size <= MAX_SIZE for p in outputs):
            break
        for p in outputs: p.unlink()
        count += 1
    actual = {}
    for p in outputs:
        with zipfile.ZipFile(p) as z:
            assert z.testzip() is None
            for name in z.namelist():
                assert name not in actual, name
                actual[name] = hashlib.sha256(z.read(name)).hexdigest()
    assert len(actual) == len(files)
    for p, rel in files:
        assert actual[PREFIX + '/' + rel.as_posix()] == sha(p), rel
    return [{'file':p.name, 'bytes':p.stat().st_size, 'sha256':sha(p)} for p in outputs]

OUT.mkdir(parents=True, exist_ok=True)
if STAGE.exists():
    raise RuntimeError('Use a new release directory; preserve previous verified packages.')
STAGE.mkdir(parents=True)
paths = list(runtime_files())
for p in paths:
    dest = STAGE / p.relative_to(GAME); dest.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(p, dest)
manifest = '\n'.join(f'{sha(p)}  {p.relative_to(STAGE).as_posix()}' for p in sorted(STAGE.rglob('*')) if p.is_file()) + '\n'
(STAGE / 'MANIFEST.sha256').write_text(manifest)
(GAME / 'MANIFEST.sha256').write_text(manifest)
# Manifest is the final generated tracked artifact; no implementation edits here.
subprocess.run(['git', 'add', 'jogos/ecos-dos-farois/MANIFEST.sha256'], cwd=REPO, check=True)
patch = OUT / 'EDF_ALPHA_0_3_PARA_NAQUIRO_001.patch'
patch.write_bytes(subprocess.check_output(['git', 'diff', '--binary', BASE, '--', 'jogos/ecos-dos-farois', ':!jogos/ecos-dos-farois/art-source'], cwd=REPO))
verify = WORK / 'patch-verification'
verify.mkdir(exist_ok=False)
baseline_tar = WORK / 'baseline-game.tar'
with baseline_tar.open('wb') as stream:
    subprocess.run(['git', 'archive', BASE, 'jogos/ecos-dos-farois'], cwd=REPO, stdout=stream, check=True)
with tarfile.open(baseline_tar) as t: t.extractall(verify, filter='data')
# /workspace itself can have tooling Git metadata. Keep this plain exported
# tree outside ancestor-repository discovery so apply cannot silently skip it.
verify_env = {**os.environ, 'GIT_CEILING_DIRECTORIES': str(WORK)}
discovery = subprocess.run(['git', 'rev-parse', '--show-toplevel'], cwd=verify, env=verify_env, capture_output=True)
assert discovery.returncode != 0, 'Patch verification must use the plain exported baseline, not an ancestor checkout'
subprocess.run(['git', 'apply', '--check', str(patch)], cwd=verify, env=verify_env, check=True)
subprocess.run(['git', 'apply', str(patch)], cwd=verify, env=verify_env, check=True)
distribution = [(p, p.relative_to(STAGE)) for p in sorted(STAGE.rglob('*')) if p.is_file()]
patched_root = verify / 'jogos/ecos-dos-farois'
for p, rel in distribution:
    assert (patched_root / rel).is_file() and sha(p) == sha(patched_root / rel), rel
stage_set = {rel.as_posix() for _, rel in distribution}
patch_set = {p.relative_to(patched_root).as_posix() for p in patched_root.rglob('*') if p.is_file()}
assert stage_set == patch_set, (sorted(stage_set-patch_set), sorted(patch_set-stage_set))
sources = []
for p in sorted((GAME / 'art-source').rglob('*')):
    if not p.is_file() or '__pycache__' in p.parts or p.name.endswith(('.blend1', '.pyc', '.log')): continue
    sources.append((p, p.relative_to(GAME)))
assert any(p.name == 'naquiro-male.blend' for p, _ in sources)
assert any(p.name == 'naquiro-male.glb' for p, _ in sources)
report = {
    'version':json.loads((GAME / 'package.json').read_text())['version'],
    'baseline_commit':BASE,
    'runtime_files':len(distribution),
    'source_files':len(sources),
    'runtime_archives':archives(distribution, 'Ecos_dos_Farois_Naquiro_001_Jogo'),
    'source_archives':archives(sources, 'Ecos_dos_Farois_Naquiro_001_Fontes_Blender'),
    'patch':{'file':patch.name, 'bytes':patch.stat().st_size, 'sha256':sha(patch)},
    'all_zip_crcs_passed':True,
    'all_zip_unions_equal_inputs':True,
    'patch_clean_apply_to_published_baseline':True,
    'patched_bytes_equal_runtime_distribution':True,
    'maximum_archive_bytes':MAX_SIZE,
    'userdata_credentials_development_dependencies_excluded':True,
    'instructions':'Independent complementary ZIPs: extract every Jogo part into the same new directory; optional Fontes_Blender parts merge the source folder. Do not concatenate ZIPs.'
}
(OUT / 'PACKAGING.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
