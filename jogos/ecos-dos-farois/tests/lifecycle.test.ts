import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { createGameServer } from '../server/src/server.js';
import { createServer } from 'node:net';
import { WebSocket } from 'ws';
import { AccountStore } from '../server/src/accounts.js';
import { until } from './helpers.js';

async function port() {
  const socket = createServer(); await new Promise<void>(ok => socket.listen(0, '127.0.0.1', ok));
  const value = (socket.address() as {port:number}).port;
  await new Promise<void>((ok, fail) => socket.close(e => e ? fail(e) : ok())); return value;
}
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'edf-lifecycle-')), path = join(dir, 'accounts.sqlite');
  const store = new AccountStore(path), account = store.provision();
  const character = store.create(account.accountId, { nickname:'CrashLab', factionId:'vigilia', raceId:'valdarios', classId:'sentinela' });
  const lease = store.acquire(account.accountId, character.id);
  lease.save.xp=316; lease.save.coins=47; store.save(account.accountId,lease.leaseId,lease.save); store.release(account.accountId,lease.leaseId);
  const body = store.db.prepare('SELECT body FROM characters WHERE id=?').get(character.id)!.body;
  store.close(); return { dir, path, account, character, body };
}
async function launch(f:ReturnType<typeof fixture>, failure='none', env:NodeJS.ProcessEnv={}) {
  const p = await port(); let log = '', exited = false;
  const child = spawn(process.execPath, ['--import','tsx','--import',pathToFileURL(resolve('tests/support/lifecycle-hook.ts')).href,'server/src/index.ts'], {
    cwd:process.cwd(), env:{...process.env, PORT:String(p), HOST:'127.0.0.1', DB_PATH:join(f.dir,'legacy.sqlite'), ACCOUNTS_DB_PATH:f.path, EDF_TEST_FAILURE:failure,...env},
    stdio:['ignore','pipe','pipe','ipc'], windowsHide:true
  });
  child.stdout!.on('data', b => { log += b.toString(); }); child.stderr!.on('data', b => { log += b.toString(); });
  const done = new Promise<{code:number|null;signal:NodeJS.Signals|null}>((ok, fail) => {
    child.once('error', fail); child.once('exit', (code,signal) => { exited=true; ok({code,signal}); });
  });
  const ready = async () => { await until(() => log.includes('"event":"server_ready"') || exited, 15000); assert.ok(!exited, log); };
  const stop = async () => { if (!exited) child.kill('SIGKILL'); await until(()=>exited,5000); await done; };
  const exit = async () => { await until(()=>exited,15000); return done; };
  return { child, exit, ready, stop, port:p, log:()=>log, exited:()=>exited };
}
async function enter(p:number, f:ReturnType<typeof fixture>) {
  const ws = new WebSocket(`ws://127.0.0.1:${p}/ws`), messages:any[]=[];
  ws.on('message', b=>messages.push(JSON.parse(b.toString()))); ws.on('error',()=>{});
  await new Promise<void>((ok,fail)=>{ws.once('open',ok);ws.once('error',fail);});
  ws.send(JSON.stringify({type:'account_login',token:f.account.token}));
  await until(()=>messages.some(m=>m.type==='account_ready'));
  ws.send(JSON.stringify({type:'character_enter',characterId:f.character.id}));
  await until(()=>messages.some(m=>m.type==='character_entered'));
  return {ws,messages};
}
function verify(f:ReturnType<typeof fixture>) {
  const store = new AccountStore(f.path);
  try {
    assert.equal(store.authenticate(f.account.token),f.account.accountId);
    assert.equal(store.db.prepare('SELECT body FROM characters WHERE id=?').get(f.character.id)!.body,f.body);
    assert.equal(store.db.prepare('PRAGMA integrity_check').get()!.integrity_check,'ok');
    assert.equal(store.db.prepare('PRAGMA foreign_key_check').all().length,0);
    const lease=store.acquire(f.account.accountId,f.character.id); store.release(f.account.accountId,lease.leaseId);
  } finally {store.close();}
}

test('processo real: character_enter recebe 20 estados, encerra e reabre preservando conta/personagem', {timeout:30000}, async()=>{
  const f=fixture(), s=await launch(f);
  try {await s.ready();const c=await enter(s.port,f);await until(()=>c.messages.filter(m=>m.type==='state').length>=20,10000);
    c.ws.terminate();s.child.send('shutdown');assert.equal((await s.exit()).code,0);
    assert.equal(existsSync(f.path+'.lock'),false);verify(f);
  } finally {await s.stop();rmSync(f.dir,{recursive:true,force:true});}
});
for (const failure of ['tick','rejection','exception','exit']) {
  test(`processo real: falha controlada ${failure} libera lock e permite reinício`,{timeout:30000},async()=>{
    const f=fixture(),s=await launch(f,failure);
    try {
      await s.ready();const c=await enter(s.port,f);const result=await s.exit();c.ws.terminate();
      assert.equal(result.code,failure==='exit'?9:1,s.log());assert.equal(existsSync(f.path+'.lock'),false,s.log());
      if(failure!=='exit') {assert.match(s.log(),/server_shutdown_complete/);assert.match(s.log(),/EDF_CONTROLLED_/);}
      assert.ok(!s.log().includes(f.account.token),'credencial não pode constar no log'); verify(f);
      const again=await launch(f);try{await again.ready();again.child.send('shutdown');assert.equal((await again.exit()).code,0);}finally{await again.stop();}
    } finally {await s.stop();rmSync(f.dir,{recursive:true,force:true});}
  });
}
test('término forçado: guard liberado pelo SO, órfão arquivado, dois reinícios disputam um único escritor', {timeout:30000}, async()=>{
  const f=fixture(),first=await launch(f); const contenders:Awaited<ReturnType<typeof launch>>[]=[];
  try {
    await first.ready();const c=await enter(first.port,f);await until(()=>c.messages.some(m=>m.type==='state'));
    const old=readFileSync(f.path+'.lock','utf8');first.child.kill('SIGKILL');await first.exit();c.ws.terminate();
    assert.equal(readFileSync(f.path+'.lock','utf8'),old);
    contenders.push(...await Promise.all([launch(f),launch(f)]));
    await until(()=>contenders.some(s=>s.exited())&&contenders.some(s=>s.log().includes('"event":"server_ready"')),15000);
    const loser=contenders.find(s=>s.exited())!,winner=contenders.find(s=>!s.exited())!;
    assert.equal((await loser.exit()).code,1);assert.match(loser.log(),/ACCOUNT_WRITER_ACTIVE/);
    assert.equal(readdirSync(f.dir).filter(n=>n.includes('.lock.orphan-')).length,1);
    const archive=readdirSync(f.dir).find(n=>n.includes('.lock.orphan-'))!;
    assert.equal(readFileSync(join(f.dir,archive),'utf8'),old);
    assert.throws(()=>new AccountStore(f.path),/Guard exclusivo/);
    winner.child.send('shutdown');assert.equal((await winner.exit()).code,0);verify(f);
  } finally {await first.stop();for(const s of contenders)await s.stop();rmSync(f.dir,{recursive:true,force:true});}
});
test('lock B1 vazio e proprietário vivo são preservados e bloqueiam recuperação automática',()=>{
  const f=fixture();
  try {
    writeFileSync(f.path+'.lock','',{flag:'wx'});assert.throws(()=>new AccountStore(f.path),/recuperação automática recusada/);
    assert.equal(readFileSync(f.path+'.lock','utf8'),'');rmSync(f.path+'.lock');
    const a=new AccountStore(f.path),record=readFileSync(f.path+'.lock','utf8');a.close();writeFileSync(f.path+'.lock',record);
    assert.throws(()=>new AccountStore(f.path),/vivo ou não verificável/);assert.equal(readFileSync(f.path+'.lock','utf8'),record);
  }finally{rmSync(f.dir,{recursive:true,force:true});}
});
test('falha de inicialização diagnosticada libera somente recursos próprios', {timeout:30000},async()=>{
  const f=fixture(),s=await launch(f,'none',{ALLOWED_ORIGINS:'invalid-url'});
  try {assert.equal((await s.exit()).code,1);assert.match(s.log(),/startup/);assert.equal(existsSync(f.path+'.lock'),false);verify(f);}
  finally{await s.stop();rmSync(f.dir,{recursive:true,force:true});}
});

test('API: origem inválida libera recursos e encerramento é idempotente',async()=>{
  const f=fixture();
  try {
    await assert.rejects(createGameServer({port:0,accounts:new AccountStore(f.path),origins:['invalid-url']}));
    assert.equal(existsSync(f.path+'.lock'),false);
    const server=await createGameServer({port:0,accounts:new AccountStore(f.path)});
    await Promise.all([server.close(),server.close()]);assert.equal(existsSync(f.path+'.lock'),false);verify(f);
  }finally{rmSync(f.dir,{recursive:true,force:true});}
});
test('release recusa apagar metadado substituído e falha de schema limpa lock próprio',()=>{
  const f=fixture();
  try {
    const store=new AccountStore(f.path), r=JSON.parse(readFileSync(f.path+'.lock','utf8'));
    r.nonce=randomUUID();const changed=JSON.stringify(r);writeFileSync(f.path+'.lock',changed);
    assert.throws(()=>store.close(),/substituído/);assert.equal(readFileSync(f.path+'.lock','utf8'),changed);
    rmSync(f.path+'.lock');verify(f);
    const invalid=join(f.dir,'invalid.sqlite');writeFileSync(invalid,'not a database');
    assert.throws(()=>new AccountStore(invalid));assert.equal(existsSync(invalid+'.lock'),false);
    assert.equal(readFileSync(invalid,'utf8'),'not a database');
  }finally{rmSync(f.dir,{recursive:true,force:true});}
});
