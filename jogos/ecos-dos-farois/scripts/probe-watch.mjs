// Synthetic, isolated databases only. Run: node --import tsx scripts/probe-watch.mjs
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtempSync,rmSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {createServer} from 'node:net';
import {WebSocket} from 'ws';
import {AccountStore} from '../server/src/accounts.ts';
const output=resolve(process.argv[2]??'evidence-watch');mkdirSync(output,{recursive:true});
const results=[];
async function until(read,timeout=15000){const start=Date.now();while(Date.now()-start<timeout){const v=await read();if(v)return v;await new Promise(ok=>setTimeout(ok,20));}throw new Error('Condição verificável não atingida no prazo.');}
async function freePort(){const s=createServer();await new Promise(ok=>s.listen(0,'127.0.0.1',ok));const p=s.address().port;await new Promise(ok=>s.close(ok));return p;}
for(const mode of ['normal','tick']) {
  const dir=mkdtempSync(join(tmpdir(),'edf-watch-')),db=join(dir,'accounts.sqlite'),port=await freePort();
  const store=new AccountStore(db),credential=store.provision(),character=store.create(credential.accountId,{nickname:'WatchLab',factionId:'vigilia',raceId:'valdarios',classId:'sentinela'});store.close();
  let log='',exited=false,ws;
  const child=spawn(process.execPath,['--watch','--watch-preserve-output','--import','tsx','--import',resolve('tests/support/lifecycle-hook.ts'),'server/src/index.ts'],{
    env:{...process.env,HOST:'127.0.0.1',PORT:String(port),DB_PATH:join(dir,'legacy.sqlite'),ACCOUNTS_DB_PATH:db,EDF_TEST_FAILURE:mode},
    stdio:['ignore','pipe','pipe'],detached:process.platform!=='win32',windowsHide:true});
  child.stdout.on('data',b=>{log+=b;});child.stderr.on('data',b=>{log+=b;});
  const done=new Promise((ok,fail)=>{child.once('error',fail);child.once('exit',()=>{exited=true;ok();});});
  try {
    await until(()=>log.includes('"event":"server_ready"'));let snapshots=0,entered=false,closed=false;
    ws=new WebSocket(`ws://127.0.0.1:${port}/ws`);ws.on('error',()=>{});ws.on('close',()=>{closed=true;});
    ws.on('message',b=>{const m=JSON.parse(b.toString());if(m.type==='account_ready')ws.send(JSON.stringify({type:'character_enter',characterId:character.id}));if(m.type==='character_entered')entered=true;if(m.type==='state')snapshots++;});
    await new Promise((ok,fail)=>{ws.once('open',ok);ws.once('error',fail);});ws.send(JSON.stringify({type:'account_login',token:credential.token}));
    await until(()=>mode==='normal'?snapshots>=20:closed&&log.includes('server_shutdown_complete'));
    assert.ok(entered);assert.equal(exited,false,'watch pai deve continuar ativo');
    const listening=await fetch(`http://127.0.0.1:${port}/health`).then(r=>r.ok).catch(()=>false);
    assert.equal(listening,mode==='normal');assert.equal(existsSync(db+'.lock'),mode==='normal');
    results.push({mode,node:process.version,platform:process.platform,watchParentAlive:!exited,characterEntered:entered,snapshots,portHealthy:listening,lockExists:existsSync(db+'.lock')});
  }finally {
    ws?.terminate();
    if(!exited){
      if(process.platform==='win32')await new Promise((ok,fail)=>{const k=spawn('taskkill.exe',['/PID',String(child.pid),'/T','/F'],{windowsHide:true,stdio:'ignore',timeout:10000});k.once('error',fail);k.once('exit',code=>code===0?ok():fail(new Error('taskkill falhou: '+code)));});
      else process.kill(-child.pid,'SIGTERM');
    }
    await until(()=>exited); await done;
    writeFileSync(join(output,`watch-${mode}.log`),log);
    // Wait for THIS test's child, then prove data and safe re-open. Never remove
    // a lock to make this succeed. On Windows force termination exercises V2 recovery.
    await until(()=>{try{const check=new AccountStore(db);try{assert.equal(check.authenticate(credential.token),credential.accountId);assert.equal(check.list(credential.accountId)[0].id,character.id);assert.equal(check.db.prepare('PRAGMA integrity_check').get().integrity_check,'ok');}finally{check.close();}return true;}catch(e){if(['ACCOUNT_WRITER_ACTIVE','LOCK_OWNER_NOT_PROVEN_DEAD'].includes(e.code))return false;throw e;}});
    rmSync(dir,{recursive:true,force:true});
  }
}
writeFileSync(join(output,'watch-result.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results,null,2));
