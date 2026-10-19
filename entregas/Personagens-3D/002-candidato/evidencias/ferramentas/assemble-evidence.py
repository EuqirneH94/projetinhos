"""Copy an explicit public evidence allowlist; never copy fixtures or databases."""
from pathlib import Path
import hashlib, json, shutil

WORK = Path('/workspace/edf-naquiro-production')
SOURCE = WORK / 'evidence'
DEST = Path('/workspace/projetinhos/entregas/Personagens-3D/002-candidato/evidencias')
DEST.mkdir(parents=True, exist_ok=True)

def copy(src, rel):
    src = Path(src)
    assert src.is_file(), src
    assert not any(x in src.name.lower() for x in ('.sqlite', '.lock', 'credential', '.blend1'))
    dest = DEST / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)

for name in ['build-color-final.log', 'packaging-run.log', 'preservation-final.json', 'baseline.json']:
    copy(SOURCE/name, name)

for folder in ['tests-final-color', 'color-corrected', 'distribution-reviewed']:
    root = SOURCE/folder
    assert root.is_dir(), root
    for p in sorted(root.rglob('*')):
        if not p.is_file() or p.suffix.lower() not in ['.json', '.log', '.txt', '.md', '.py']:
            continue
        if p.name == 'SHA256SUMS.txt':
            continue  # A fresh public manifest below describes only copied files.
        copy(p, Path(folder)/p.relative_to(root))
for name in ['naquiro-male.gltf', 'naquiro-male.bin']:
    copy(SOURCE/'tests-final-color/before'/name, Path('tests-final-color/before')/name)

for name in ['SOURCE_REVIEW.json', 'REVIEW.md', 'front-face.png', 'profile-face.png', 'three-quarter-full.png', 'surface-distance.json']:
    p = SOURCE/'nose-corrected'/name
    if p.is_file(): copy(p, Path('blender-base')/name)

for name in ['idle-front.png', 'idle-three-quarter.png', 'run-contact.png', 'cast-front.png', 'death-final.png', 'render-provenance.json', 'RIG_REPORT.md']:
    copy(SOURCE/'rig-reviewed/final'/name, Path('blender-rig-historico')/name)
(DEST/'blender-rig-historico/LEIA.md').write_text(
    '# Renders de geometria/poses anteriores à correção das tintas\n\n'
    'São renders Blender reais, com o SHA do `.blend` usado em render-provenance.json. '
    'Antecedem o clamp de COLOR_0 e não aprovam as cores do export final. '
    'A geometria/poses foi comparada no relatório color-corrected; as capturas '
    'corrigidas do Three.js ficam em browser. Não são capturas de gameplay.\n')

for name in ['export-grounding.json', 'check-export-grounding.mjs', 'full-suite-node24.14-contended-attempt-1.txt', 'lifecycle-isolated-idle-node24.14.txt']:
    copy(SOURCE/'tests-reviewed/final'/name, Path('historico-verificacoes')/name)
(DEST/'historico-verificacoes/LEIA.md').write_text(
    '# Verificações históricas\n\n'
    'O log contended-attempt registra uma tentativa rejeitada sob concorrência de CPU. '
    'Não conta como aprovação. A suíte final está em tests-final-color (109/109). '
    'export-grounding mede geometria/poses do buffer anterior ao clamp; '
    'o comparador color-corrected comprova que essas posições/pesos/clips foram preservados. '
    'A penetração residual de cerca de 0,005215 unidade em Run permanece documentada.\n')

browser = SOURCE/'browser-reviewed'
for p in sorted(browser.iterdir()):
    if p.is_file() and p.suffix.lower() in ['.json', '.log', '.md', '.png', '.webm', '.mp4']:
        copy(p, Path('browser')/p.name)
for name in ['lab-face-1280x720.png', 'result-lab.json', 'LEIA.txt']:
    p = browser/'attempt-03-color-incorrect'/name
    if p.is_file(): copy(p, Path('falha-cores-reproduzida')/name)
for attempt in sorted(browser.glob('attempt-*')):
    if not attempt.is_dir(): continue
    for p in sorted(attempt.iterdir()):
        if p.is_file() and p.suffix.lower() in ['.json', '.log', '.txt', '.md']:
            copy(p, Path('tentativas-navegador')/attempt.name/p.name)

review = SOURCE/'artistic-review.md'
if review.is_file(): copy(review, 'artistic-review.md')
for name in ['browser-character-reviewed.py', 'distribution-smoke-naquiro.mjs', 'package-naquiro.py', 'assemble-evidence.py']:
    copy(WORK/'support'/name, Path('ferramentas')/name)
for name in ['failed.log', 'LEIA.md']:
    copy(WORK/'checkpoints/packaging-attempt-1'/name, Path('tentativa-empacotamento-rejeitada')/name)

(DEST/'LEIA.md').write_text(
    '# Evidências do candidato Náquiro 001\n\n'
    'Build e testes finais: build-color-final.log e tests-final-color. '
    'Preservação: preservation-final.json. Correção reproduzida: color-corrected e '
    'falha-cores-reproduzida. Abertura do .blend final: color-corrected/portable-blend.json. '
    'Navegador real e seus métodos/limites: browser. Distribuição/persistência: distribution-reviewed.\n\n'
    'Os arquivos históricos e tentativas falhas estão identificados. '
    'Imagens Blender não são gameplay; capturas estáticas não medem FPS. '
    'Vídeos contínuos não usam pausa de RAF. Não houve execução no Windows ou GPU física. '
    'Fixtures SQLite, credenciais, locks e backups privados foram excluídos por lista explícita. '
    'Ferramentas externas documentam o método e podem conter caminhos da nuvem; '
    'não são pré-requisito para jogar.\n')

hashes = {p.relative_to(DEST).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
          for p in sorted(DEST.rglob('*')) if p.is_file() and p.name != 'SHA256SUMS.txt'}
(DEST/'SHA256SUMS.txt').write_text(''.join(f'{digest}  {name}\n' for name, digest in hashes.items()))
print(json.dumps({'public_evidence_files':len(hashes), 'destination':str(DEST)}, indent=2))
