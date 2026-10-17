import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, copyFileSync, existsSync, linkSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { AccountStore, AccountError } from '../server/src/accounts.js';
import { Store } from '../server/src/store.js';
import { Game } from '../server/src/game.js';
import { CLASS_IDS, FACTION_RACES, type CharacterInput } from '../shared/identity.js';
import { parseMessage } from '../server/src/protocol.js';
const input = (overrides: Partial<CharacterInput> = {}): CharacterInput => ({ nickname: 'Arin', factionId: 'vigilia', raceId: 'valdarios', classId: 'sentinela', ...overrides });
const code = (name: string) => (error: unknown) => error instanceof AccountError && error.code === name;

test('conta de teste guarda hash e expira credencial sem expor progresso', () => {
  let now = 1000; const store = new AccountStore(':memory:', () => now);
  try {
    const a = store.provision(); assert.equal(store.authenticate(a.token), a.accountId);
    assert.equal(store.authenticate('x'.repeat(43)), undefined); assert.equal(store.authenticate('bad'), undefined);
    const row = store.db.prepare('SELECT token_hash FROM account_tokens').get()!;
    assert.notEqual(row.token_hash, a.token); assert.equal(row.token_hash, createHash('sha256').update(a.token).digest('hex'));
    now += 30 * 24 * 60 * 60 * 1000; assert.equal(store.authenticate(a.token), undefined);
    assert.deepEqual(Object.keys(store.db.prepare('SELECT * FROM accounts').get()!).sort(), ['created_at','id']);
  } finally { store.close(); }
});

test('oito slots por conta, duas facções e isolamento entre proprietários', () => {
  const store = new AccountStore();
  try {
    const a = store.provision(), b = store.provision();
    for (let i=0; i<8; i++) store.create(a.accountId, input(i%2 ? { factionId: 'confluencia', raceId: 'naquiros' } : {}));
    assert.equal(store.list(a.accountId).length, 8); assert.deepEqual(store.list(a.accountId).map(c => c.slot), [1,2,3,4,5,6,7,8]);
    assert.throws(() => store.create(a.accountId, input()), code('CHARACTER_LIMIT'));
    assert.equal(store.create(b.accountId, input()).slot, 1);
    assert.throws(() => store.acquire(b.accountId, store.list(a.accountId)[0].id), code('CHARACTER_NOT_FOUND'));
    assert.throws(() => store.create('forged', input()), code('UNAUTHORIZED'));
  } finally { store.close(); }
});

test('dezesseis combinações da Alpha preservam identidade e equipam armas e armaduras elegíveis', () => {
  const store = new AccountStore(); let count = 0;
  try {
    for (const [factionId, races] of Object.entries(FACTION_RACES)) for (const raceId of races) {
      const a = store.provision();
      for (const classId of CLASS_IDS) {
        const c = store.create(a.accountId, input({ factionId: factionId as CharacterInput['factionId'], raceId, classId }));
        const selected=store.acquire(a.accountId,c.id);
        assert.equal(selected.save.factionId,factionId);assert.equal(selected.save.raceId,raceId);assert.equal(selected.save.classId,classId);
        assert.equal(selected.save.weapon,({sentinela:'trainingSword',arcanista:'trainingStaff',errante:'trainingBow',ressonante:'trainingFocus'} as const)[classId]);
        assert.equal(selected.save.armor,classId==='sentinela'?'plateArmor':classId==='errante'?'leatherArmor':'clothArmor');
        assert.equal(selected.save.hp,120);assert.equal(c.classId,classId);assert.equal(c.mode,'prototype');
        store.release(a.accountId, selected.leaseId); count++;
      }
    }
    assert.equal(count, 16);
  } finally { store.close(); }
});

test('facção/povo e classe forjados são recusados em domínio e protocolo', () => {
  const store = new AccountStore();
  try {
    const a = store.provision();
    for (const bad of [input({ raceId: 'eluvios' }), input({ factionId: 'confluencia', raceId: 'kordranios' }), input({ classId: 'forged' as never }), input({ nickname: '<script>' })]) {
      assert.throws(() => store.create(a.accountId, bad));
      assert.equal(parseMessage(JSON.stringify({ type: 'character_create', ...bad })), null);
    }
    for (const extra of [{ accountId: a.accountId }, { coins: 999 }, { body: {} }]) assert.equal(parseMessage(JSON.stringify({ type:'character_create', ...input(), ...extra })), null);
    assert.equal(parseMessage(JSON.stringify({ type:'character_enter', characterId:'a', accountId:a.accountId })), null);
    assert.equal(store.list(a.accountId).length, 0);
    assert.throws(() => store.db.prepare('INSERT INTO characters VALUES(?,?,?,?,?,?,?,?)').run('x',a.accountId,'Arin',1,'vigilia','eluvios','sentinela','{}'));
  } finally { store.close(); }
});

test('falha de escrita reverte criação e não consome vaga', () => {
  const store = new AccountStore();
  try {
    const a = store.provision();
    store.db.exec("CREATE TRIGGER fail_character BEFORE INSERT ON characters BEGIN SELECT RAISE(ABORT,'fixture write failure'); END;");
    assert.throws(() => store.create(a.accountId, input())); assert.equal(store.list(a.accountId).length, 0);
    store.db.exec('DROP TRIGGER fail_character'); assert.equal(store.create(a.accountId, input()).slot, 1);
    assert.deepEqual(store.db.prepare('PRAGMA foreign_key_check').all(), []);
  } finally { store.close(); }
});

test('lease por conta rejeita segunda sessão, escrita alheia e liberação antiga', () => {
  const store = new AccountStore();
  try {
    const a = store.provision(), b = store.provision();
    const first = store.create(a.accountId,input()), second = store.create(a.accountId,input({ factionId:'confluencia',raceId:'eluvios' }));
    const lease = store.acquire(a.accountId,first.id);
    assert.throws(() => store.acquire(a.accountId,second.id),code('ACCOUNT_IN_USE'));
    assert.throws(() => store.save(b.accountId,lease.leaseId,lease.save),code('STALE_SESSION'));
    store.release(a.accountId,'wrong'); assert.equal(store.ownsLease(a.accountId,lease.leaseId,first.id),true);
    store.release(a.accountId,lease.leaseId); const next = store.acquire(a.accountId,second.id);
    store.release(a.accountId,lease.leaseId); assert.equal(store.ownsLease(a.accountId,next.leaseId,second.id),true);
    assert.throws(() => store.save(a.accountId,lease.leaseId,lease.save),code('STALE_SESSION'));
  } finally { store.close(); }
});

test('personagem, carteira e missão persistem; backup frio restaura dados sem migrar legado', () => {
  const dir=mkdtempSync(join(tmpdir(),'edf-b1-')), path=join(dir,'accounts.sqlite'), backup=join(dir,'backup.sqlite');
  let store: AccountStore | undefined;
  try {
    store=new AccountStore(path); const a=store.provision(); const one=store.create(a.accountId,input()),two=store.create(a.accountId,input());
    const lease=store.acquire(a.accountId,one.id); lease.save.coins=47; lease.save.xp=316; lease.save.level=3; lease.save.quest={state:'completed',brumino:3,cerne:2}; store.save(a.accountId,lease.leaseId,lease.save);
    const expected=structuredClone(lease.save); store.close(); store=undefined; copyFileSync(path,backup);
    store=new AccountStore(backup); assert.equal(store.authenticate(a.token),a.accountId); assert.equal(store.list(a.accountId).length,2);
    const restored=store.acquire(a.accountId,one.id); assert.deepEqual(restored.save,expected); store.release(a.accountId,restored.leaseId);
    assert.equal(store.acquire(a.accountId,two.id).save.coins,0);
    assert.equal(store.db.prepare('PRAGMA integrity_check').get()!.integrity_check,'ok'); assert.deepEqual(store.db.prepare('PRAGMA foreign_key_check').all(),[]);
  } finally { store?.close(); rmSync(dir,{recursive:true,force:true}); }
});

test('banco v1 é recusado como contas sem alterar bytes; rollback conserva token e save v1', () => {
  const dir=mkdtempSync(join(tmpdir(),'edf-v1-')),path=join(dir,'legacy.sqlite');
  try {
    let legacy=new Store(path); const p=new Game().create('Arin');p.coins=47;const token=legacy.create(p); legacy.close();
    const before=readFileSync(path); assert.throws(()=>new AccountStore(path),/não reconhecido/); assert.deepEqual(readFileSync(path),before); assert.equal(existsSync(path+'.lock'),false);
    legacy=new Store(path);assert.deepEqual(legacy.resume(token),p);assert.equal(legacy.db.prepare('PRAGMA user_version').get()!.user_version,1);legacy.close();
  } finally { rmSync(dir,{recursive:true,force:true}); }
});

test('arquivo de contas tem um único escritor de mundo e rejeita versão futura', () => {
  const dir=mkdtempSync(join(tmpdir(),'edf-lock-')),path=join(dir,'accounts.sqlite');
  try {
    const a=new AccountStore(path);assert.throws(()=>new AccountStore(path));a.close();
    const alias=join(dir,'alias.sqlite');linkSync(path,alias);assert.throws(()=>new AccountStore(alias),/hardlink/);unlinkSync(alias);
    const b=new AccountStore(path);b.db.exec('PRAGMA user_version=2');b.close();const before=readFileSync(path);
    assert.throws(()=>new AccountStore(path),/não reconhecido/);assert.deepEqual(readFileSync(path),before);
  } finally { rmSync(dir,{recursive:true,force:true}); }
});


test('provisionamento reverte conta e token se entrega da credencial falhar', () => {
  const store=new AccountStore();
  try {
    assert.throws(()=>store.provision(()=>{throw new Error('fixture credential delivery failure');}));
    assert.equal(store.db.prepare('SELECT count(*) AS n FROM accounts').get()!.n,0);
    assert.equal(store.db.prepare('SELECT count(*) AS n FROM account_tokens').get()!.n,0);
    const a=store.provision();assert.equal(store.authenticate(a.token),a.accountId);
  } finally {store.close();}
});
