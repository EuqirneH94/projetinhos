/** Packaged-runtime smoke, Node 24.13+; no npm/Blender/development dependency.
 * Run ONLY after final packaging, with no browser/build/test job competing:
 * node distribution-smoke-naquiro.mjs [freshly-extracted-runtime] [evidence-dir]
 * Creates private synthetic SQLite fixtures in the OS temp directory, never
 * touches a user's data path, and never emits credentials or database bodies.
 * HTTP bytes/WS/persistence are tested; this is not visual or Windows approval.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from 'node:net';
import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { setTimeout as pause } from 'node:timers/promises';

const EXPECTED_VERSION = '0.3.1-naquiro.1';
const release = resolve(process.argv[2] ?? '/workspace/edf-naquiro-production/release/Ecos_dos_Farois_Naquiro_001');
const evidence = resolve(process.argv[3] ?? '/workspace/edf-naquiro-production/evidence/distribution-reviewed');
assert.equal(JSON.parse(readFileSync(join(release, 'package.json'), 'utf8')).version, EXPECTED_VERSION);
assert.equal(Number(process.versions.node.split('.')[0]), 24, 'Use the approved Node 24 runtime');
assert.deepEqual(readdirSync(join(release, 'node_modules')).sort(), ['ws'], 'Runtime must contain only its production ws dependency');
const require = createRequire(join(release, 'package.json'));
assert.ok(require.resolve('ws').startsWith(join(release, 'node_modules', 'ws') + sep));
const { WebSocket } = require('ws');
const { AccountStore } = await import(pathToFileURL(join(release, 'build/server/src/accounts.js')));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const manifestOriginal = readFileSync(join(release, 'MANIFEST.sha256'), 'utf8');
function verifyManifest() {
  let count = 0;
  for (const line of manifestOriginal.trim().split('\n')) {
    assert.match(line, /^[a-f0-9]{64}  [^\r\n]+$/);
    const path = resolve(release, line.slice(66));
    assert.ok(path.startsWith(release + sep), 'Manifest paths must stay inside the distribution');
    assert.equal(sha(readFileSync(path)), line.slice(0, 64), `Manifest mismatch: ${relative(release, path)}`);
    count++;
  }
  assert.equal(readFileSync(join(release, 'MANIFEST.sha256'), 'utf8'), manifestOriginal);
  return count;
}
const manifestFiles = verifyManifest();
const privateFixtures = mkdtempSync(join(tmpdir(), 'edf-naquiro-package-synthetic-'));
const accountPath = join(privateFixtures, 'accounts.sqlite'), legacyPath = join(privateFixtures, 'legacy.sqlite');
const secrets = [], connections = new Set(), shutdowns = [], assetEvidence = [];
let child, childExit, serverLog = '', result;
let account = new AccountStore(accountPath);
const credential = account.provision(); secrets.push(credential.token);
const character = account.create(credential.accountId, { nickname: 'PacoteNaquiro', factionId: 'confluencia', raceId: 'naquiros', classId: 'errante' });
// A recognizable synthetic value proves a real stored body, not a new character.
const lease = account.acquire(credential.accountId, character.id);
lease.save.coins = 171;
account.save(credential.accountId, lease.leaseId, lease.save);
account.release(credential.accountId, lease.leaseId); account.close();
assert.equal(existsSync(accountPath + '.lock'), false, 'Fixture provisioning must release its writer lock');
const listener = createServer();
await new Promise((ok, fail) => { listener.once('error', fail); listener.listen(0, '127.0.0.1', ok); });
const port = listener.address().port;
await new Promise(ok => listener.close(ok));
const origin = `http://127.0.0.1:${port}`;
async function until(read, label, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = await read();
    if (value) return value;
    if (child && child.exitCode !== null) throw new Error(`Server exited while waiting for ${label}`);
    await pause(20);
  }
  throw new Error(`Real condition timed out (${timeoutMs} ms): ${label}`);
}
async function health() {
  const response = await fetch(origin + '/health', { signal: AbortSignal.timeout(2000) });
  assert.equal(response.status, 200); const body = await response.json();
  assert.equal(body.ok, true); assert.equal(body.version, EXPECTED_VERSION); return body;
}
async function launch() {
  child = spawn(process.execPath, ['build/server/src/index.js'], {
    cwd: release, env: { ...process.env, HOST: '127.0.0.1', PORT: String(port), DB_PATH: legacyPath, ACCOUNTS_DB_PATH: accountPath, ALLOWED_ORIGINS: origin },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', bytes => { serverLog += bytes; });
  child.stderr.on('data', bytes => { serverLog += bytes; });
  childExit = new Promise((ok, fail) => { child.once('error', fail); child.once('exit', (code, signal) => ok({ code, signal })); });
  await until(async () => { try { return await health(); } catch { return false; } }, 'HTTP health/version');
}
async function stop() {
  const ending = child, exited = childExit;
  if (ending.exitCode === null) ending.kill('SIGINT');
  const deadline = Date.now() + 15000;
  while (ending.exitCode === null && Date.now() < deadline) await pause(20);
  assert.notEqual(ending.exitCode, null, 'Graceful server stop must finish within 15 seconds');
  const outcome = await exited; shutdowns.push(outcome);
  assert.equal(outcome.code, 0, 'The packaged server must stop cleanly');
  assert.equal(existsSync(accountPath + '.lock'), false, 'Normal shutdown must release the account writer lock');
  child = undefined;
}
async function socket() {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`, { origin }), messages = [];
  connections.add(ws);
  ws.on('message', bytes => messages.push(JSON.parse(bytes.toString())));
  ws.on('error', () => {});
  await new Promise((ok, fail) => {
    const timer = setTimeout(() => { ws.terminate(); fail(new Error('WebSocket open timeout (15000 ms)')); }, 15000);
    ws.once('open', () => { clearTimeout(timer); ok(); });
    ws.once('error', error => { clearTimeout(timer); fail(error); });
  });
  return {
    ws, messages,
    send(message) { ws.send(JSON.stringify(message)); },
    async request(message, type) {
      const offset = messages.length; ws.send(JSON.stringify(message));
      return until(() => messages.slice(offset).find(item => item.type === type), `public response ${type}`);
    },
    async close() {
      if (ws.readyState === WebSocket.CLOSED) return;
      ws.close(); await until(() => ws.readyState === WebSocket.CLOSED, 'WebSocket close'); connections.delete(ws);
    },
    state() { return messages.findLast(message => message.type === 'state')?.you; },
  };
}
async function walk(client) {
  const initial = await until(() => client.state(), 'initial public snapshot');
  client.send({ type: 'move', seq: 1, x: 0, z: -1 });
  await until(() => { const current = client.state(); return current && initial.z - current.z > .4 ? current : false; }, 'server-confirmed movement');
  client.send({ type: 'move', seq: 2, x: 0, z: 0 });
  return until(() => { const current = client.state(); return current?.ack >= 2 ? current : false; }, 'server-confirmed stop');
}
function assertSameProgress(after, before) {
  for (const key of ['id', 'nickname', 'coins', 'xp', 'level', 'inventory', 'weapon', 'armor', 'classId', 'factionId', 'raceId', 'appearance', 'quest', 'story', 'x', 'z'])
    assert.deepEqual(after[key], before[key], `Restart changed persisted ${key}`);
}
try {
  await launch();
  const assetManifest = JSON.parse(readFileSync(join(release, 'client/dist/art/characters/naquiro/manifest.json'), 'utf8'));
  const files = [
    'index.html', 'accounts.html', 'character-lab.html', 'art/characters/naquiro/manifest.json',
    ...Object.keys(assetManifest.files).map(file => 'art/characters/naquiro/' + file),
    'art/resonator.gltf', 'art/resonator.bin',
    'audio/01_farol_estavel.wav', 'audio/02_farol_enfraquecido.wav', 'audio/03_farol_critico.wav',
    'audio/04_descarga_arcana.mp3', 'audio/05_barreira_protetora.mp3', 'audio/06_flecha_especial.mp3', 'audio/07_pulso_de_cura.mp3',
  ];
  for (const file of files) {
    const response = await fetch(origin + '/' + file, { signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, file);
    const bytes = Buffer.from(await response.arrayBuffer()), digest = sha(bytes);
    assert.equal(digest, sha(readFileSync(join(release, 'client/dist', file))), file);
    if (file === 'character-lab.html') assert.ok(response.headers.get('content-security-policy')?.includes("img-src 'self' data:"), 'Existing same-origin CSP retained');
    assetEvidence.push({ path: file, status: 200, bytes: bytes.length, sha256: digest });
  }
  const legacy = await socket();
  const welcome = await legacy.request({ type: 'join', nickname: 'PacoteLegado', factionId: 'vigilia', raceId: 'kordranios', classId: 'errante', appearance: 1 }, 'welcome');
  secrets.push(welcome.token);
  const legacyBefore = await walk(legacy);
  assert.equal(legacyBefore.weapon, 'trainingBow');
  const first = await socket();
  await first.request({ type: 'account_login', token: credential.token }, 'account_ready');
  await first.request({ type: 'character_enter', characterId: character.id }, 'character_entered');
  const accountBefore = await walk(first);
  assert.equal(accountBefore.coins, 171); assert.equal(accountBefore.classId, 'errante'); assert.equal(accountBefore.raceId, 'naquiros');
  const second = await socket();
  await second.request({ type: 'account_login', token: credential.token }, 'account_ready');
  assert.equal((await second.request({ type: 'character_enter', characterId: character.id }, 'account_error')).code, 'ACCOUNT_IN_USE');
  assert.equal((await health()).players, 2);
  await legacy.close(); await first.close(); await second.close();
  await until(async () => (await health()).players === 0, 'all public players disconnected and persisted');
  await stop();
  // Inspect the actual files while the writer is closed, then restart the app.
  const diskAccount = new DatabaseSync(accountPath, { readOnly: true });
  try { assertSameProgress(JSON.parse(diskAccount.prepare('SELECT body FROM characters WHERE id=?').get(character.id).body), accountBefore); }
  finally { diskAccount.close(); }
  const diskLegacy = new DatabaseSync(legacyPath, { readOnly: true });
  try { assertSameProgress(JSON.parse(diskLegacy.prepare('SELECT body FROM players WHERE id=?').get(welcome.id).body), legacyBefore); }
  finally { diskLegacy.close(); }
  await launch();
  const resumedLegacy = await socket();
  await resumedLegacy.request({ type: 'resume', token: welcome.token }, 'welcome');
  assertSameProgress(await until(() => resumedLegacy.state(), 'resumed legacy snapshot'), legacyBefore);
  const resumedAccount = await socket();
  await resumedAccount.request({ type: 'account_login', token: credential.token }, 'account_ready');
  await resumedAccount.request({ type: 'character_enter', characterId: character.id }, 'character_entered');
  assertSameProgress(await until(() => resumedAccount.state(), 'resumed account snapshot'), accountBefore);
  await resumedLegacy.close(); await resumedAccount.close();
  await until(async () => (await health()).players === 0, 'resumed players disconnected');
  await stop();
  account = new AccountStore(accountPath);
  try { assert.equal(account.authenticate(credential.token), credential.accountId); assert.equal(account.list(credential.accountId).length, 1); }
  finally { account.close(); }
  for (const databasePath of [accountPath, legacyPath]) {
    const database = new DatabaseSync(databasePath, { readOnly: true });
    try {
      assert.equal(database.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
      assert.equal(database.prepare('PRAGMA foreign_key_check').all().length, 0);
    } finally { database.close(); }
  }
  assert.equal(verifyManifest(), manifestFiles, 'Runtime files must remain byte-identical after smoke');
  result = {
    passed: true, node: process.version, platform: process.platform, releaseVersion: EXPECTED_VERSION,
    packagedRuntimeOnlyWs: true, manifestFiles, runtimeFilesUnchanged: true, httpAssets: assetEvidence,
    legacyEntry: true, naquiroErranteAccountEntry: true, serverConfirmedMovementBothFlows: true,
    secondSessionRejected: true, gracefulRestart: true, accountWriterLockReleasedOnBothStops: true,
    diskSavesEqualBeforeRestart: true, legacyAndAccountProgressEqualAfterRestart: true,
    integrity: 'ok', foreignKeyErrors: 0, shutdowns, realUserDataAccessed: false,
    fixtureLocation: 'Private synthetic temporary directory; paths, credentials and database bodies excluded from this report',
    limits: 'HTTP bytes/public WS/persistence smoke only; no model appearance, physical GPU, Windows, gameplay soak or historical B1.1 reproduction claim',
  };
} finally {
  for (const ws of connections) ws.terminate();
  if (child?.exitCode === null) { child.kill('SIGKILL'); await childExit; }
  mkdirSync(evidence, { recursive: true });
  let safeLog = serverLog;
  const credentialsAbsentFromLogs = secrets.every(secret => !serverLog.includes(secret));
  for (const secret of secrets) safeLog = safeLog.replaceAll(secret, '[REDACTED-SYNTHETIC-CREDENTIAL]');
  writeFileSync(join(evidence, 'distribution-server.log'), safeLog);
  assert.equal(credentialsAbsentFromLogs, true, 'Server logs unexpectedly contained synthetic credentials (redacted in evidence)');
  if (result) {
    writeFileSync(join(evidence, 'distribution-smoke.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result, null, 2));
  }
}
