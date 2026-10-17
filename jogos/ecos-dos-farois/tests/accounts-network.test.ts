import test from 'node:test';
import assert from 'node:assert/strict';
import { WebSocket } from 'ws';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { AccountStore } from '../server/src/accounts.js';
import { createGameServer } from '../server/src/server.js';
import { until, client } from './helpers.js';
import type { ServerMessage, Snapshot, ClientMessage } from '../shared/types.js';
import type { CharacterInfo } from '../shared/identity.js';
const create = (nickname='Arin'): ClientMessage => ({ type:'character_create',nickname,factionId:'vigilia',raceId:'valdarios',classId:'sentinela' });
async function socket(port:number) {
  const ws=new WebSocket(`ws://127.0.0.1:${port}/ws`),messages:ServerMessage[]=[];
  ws.on('message',data=>messages.push(JSON.parse(data.toString())));
  await new Promise<void>((ok,fail)=>{ws.once('open',()=>ok());ws.once('error',fail);});
  return {ws,messages,send:(msg:unknown)=>ws.send(JSON.stringify(msg)),close:()=>new Promise<void>(ok=>{if(ws.readyState===WebSocket.CLOSED)return ok();ws.once('close',()=>ok());ws.close();}),
    async request(msg:unknown,type:ServerMessage['type']) {const n=messages.length;ws.send(JSON.stringify(msg));return until(()=>messages.slice(n).find(m=>m.type===type));}};
}
async function login(port:number,token:string) {const c=await socket(port);await c.request({type:'account_login',token},'account_ready');await until(()=>c.messages.some(m=>m.type==='character_list'));return c;}
const list=(m:ServerMessage):CharacterInfo[]=>{assert.equal(m.type,'character_list');return (m as Extract<ServerMessage,{type:'character_list'}>).characters;};
const state=(messages:ServerMessage[])=>[...messages].reverse().find(m=>m.type==='state') as Snapshot;

test('WS autentica, cria/lista só personagens próprios e não permite trocar identidade',async()=>{
  const accounts=new AccountStore(),a=accounts.provision(),b=accounts.provision(),server=await createGameServer({port:0,accounts});
  try {
    const ca=await login(server.port,a.token),cb=await login(server.port,b.token),anonymous=await socket(server.port);
    const denied=await anonymous.request(create(),'account_error');assert.equal((denied as any).code,'UNAUTHORIZED');
    const chars=list(await ca.request(create(),'character_list'));assert.equal(chars.length,1);
    assert.equal(list(await cb.request({type:'character_list'},'character_list')).length,0);
    assert.equal((await cb.request({type:'character_enter',characterId:chars[0].id},'account_error') as any).code,'CHARACTER_NOT_FOUND');
    await ca.request({type:'character_enter',characterId:chars[0].id},'character_entered');
    await ca.request({type:'join',nickname:'Bypass'},'notice');assert.equal(server.game.players.size,1);
    assert.equal(server.store.db.prepare('SELECT count(*) AS n FROM players').get()!.n,0);
    await ca.close();await cb.close();await anonymous.close();
  }finally{await server.close();}
});

test('WS cria oito com corrida no último slot, recusa nono e aceita ambos os lados',async()=>{
  const accounts=new AccountStore(),a=accounts.provision(),server=await createGameServer({port:0,accounts});
  try {
    const first=await login(server.port,a.token),second=await login(server.port,a.token);
    for(let i=0;i<7;i++)await first.request(create('Arin'+i),'character_list');
    const n=first.messages.length,m=second.messages.length;
    first.send(create('Oitavo'));second.send({type:'character_create',nickname:'Outro',factionId:'confluencia',raceId:'naquiros',classId:'errante'});
    await until(()=>first.messages.length>n&&second.messages.length>m);
    const replies=[...first.messages.slice(n),...second.messages.slice(m)];
    assert.equal(replies.filter(r=>r.type==='character_list').length,1);assert.equal(replies.filter(r=>r.type==='account_error'&&r.code==='CHARACTER_LIMIT').length,1);
    assert.equal(accounts.list(a.accountId).length,8);
    await first.close();await second.close();
  }finally{await server.close();}
});

test('WS uma sessão por conta entre personagens distintos; leave e close antigo não expulsam a nova',async()=>{
  const accounts=new AccountStore(),a=accounts.provision(),b=accounts.provision();
  const one=accounts.create(a.accountId,create() as any),two=accounts.create(a.accountId,{nickname:'Nara',factionId:'confluencia',raceId:'eluvios',classId:'ressonante'}),other=accounts.create(b.accountId,create('Borin') as any);
  const server=await createGameServer({port:0,accounts});
  try {
    const ca=await login(server.port,a.token),cb=await login(server.port,a.token),cc=await login(server.port,b.token);
    await ca.request({type:'character_enter',characterId:one.id},'character_entered');
    assert.equal((await cb.request({type:'character_enter',characterId:two.id},'account_error') as any).code,'ACCOUNT_IN_USE');
    await cc.request({type:'character_enter',characterId:other.id},'character_entered');assert.equal(server.game.players.size,2);
    ca.send({type:'move',seq:0,x:1,z:0});await until(()=>server.game.players.get(one.id)!.x>0);
    await ca.request({type:'character_leave'},'character_left');await cb.request({type:'character_enter',characterId:two.id},'character_entered');
    await ca.close();assert.ok(server.game.players.has(two.id));
    cb.send({type:'move',seq:0,x:1,z:0});await until(()=>server.game.players.get(two.id)!.x>0);
    await cb.close();await cc.close();
  }finally{await server.close();}
});

test('WS persiste progresso individual em banco de contas e retoma após reiniciar sem token legado',async()=>{
  const dir=mkdtempSync(join(tmpdir(),'edf-ws-')),path=join(dir,'accounts.sqlite');
  let accounts=new AccountStore(path);const a=accounts.provision(),one=accounts.create(a.accountId,create() as any),two=accounts.create(a.accountId,create('Nara') as any);
  let server=await createGameServer({port:0,accounts});
  try {
    const ca=await login(server.port,a.token);await ca.request({type:'character_enter',characterId:one.id},'character_entered');await until(()=>state(ca.messages));
    const p=server.game.players.get(one.id)!;p.coins=47;p.xp=316;p.level=3;p.quest={state:'completed',brumino:3,cerne:2};const expected=server.game.save(p);
    await ca.close();await until(()=>!server.game.players.has(one.id),5000);await server.close();
    accounts=new AccountStore(path);server=await createGameServer({port:0,accounts});const cb=await login(server.port,a.token);await cb.request({type:'character_enter',characterId:one.id},'character_entered');await until(()=>state(cb.messages));
    assert.equal(state(cb.messages).you.coins,47);assert.equal(state(cb.messages).you.xp,316);assert.deepEqual(state(cb.messages).you.inventory,expected.inventory);assert.deepEqual(state(cb.messages).you.quest,expected.quest);
    assert.ok(!cb.messages.some(m=>m.type==='welcome'));assert.equal(server.store.db.prepare('SELECT count(*) AS n FROM sessions').get()!.n,0);
    await cb.request({type:'character_leave'},'character_left');await cb.request({type:'character_enter',characterId:two.id},'character_entered');
    await until(()=>state(cb.messages).you.id===two.id);assert.equal(state(cb.messages).you.coins,0);assert.equal(state(cb.messages).you.quest.state,'available');
    assert.equal(accounts.db.prepare('PRAGMA integrity_check').get()!.integrity_check,'ok');await cb.close();
  }finally{await server.close();rmSync(dir,{recursive:true,force:true});}
});

test('WS revalida revogação durante jogo e libera lease sem derrubar legado',async()=>{
  const accounts=new AccountStore(),a=accounts.provision(),c=accounts.create(a.accountId,create() as any),server=await createGameServer({port:0,accounts});
  try {
    const ca=await login(server.port,a.token),legacy=await client(server.port,'Legado');await ca.request({type:'character_enter',characterId:c.id},'character_entered');
    const closed=new Promise<number>(ok=>ca.ws.once('close',ok));accounts.db.prepare('UPDATE account_tokens SET expires_at=0 WHERE account_id=?').run(a.accountId);
    ca.send({type:'move',seq:999,x:1,z:0});assert.equal(await closed,4003);await until(()=>!server.game.players.has(c.id));
    assert.equal(server.game.players.get(legacy.welcome.id)!.nickname,'Legado');assert.equal((await (await fetch(`http://127.0.0.1:${server.port}/health`)).json() as any).ok,true);
    assert.throws(()=>accounts.save(a.accountId,'old',new (class {})() as any));await legacy.close();
  }finally{await server.close();}
});

test('servidor sem opt-in recusa conta, mas mantém o fluxo legado',async()=>{
  const server=await createGameServer({port:0});
  try {const c=await socket(server.port);assert.equal((await c.request({type:'account_login',token:'a'.repeat(43)},'account_error') as any).code,'ACCOUNTS_DISABLED');await c.close();const old=await client(server.port,'Arin');await old.close();}
  finally{await server.close();}
});

test('falha de bind libera lock de contas e não encerra servidor alheio',async()=>{
  const dir=mkdtempSync(join(tmpdir(),'edf-bind-')),path=join(dir,'accounts.sqlite'),first=await createGameServer({port:0});
  try {await assert.rejects(createGameServer({port:first.port,accounts:new AccountStore(path)}));assert.equal(existsSync(path+'.lock'),false);const again=new AccountStore(path);again.close();assert.equal((await fetch(`http://127.0.0.1:${first.port}/health`)).status,200);}
  finally{await first.close();rmSync(dir,{recursive:true,force:true});}
});

test('falha real de gravação de conta fecha sessões e sinaliza health sem confirmar progresso',async()=>{
  const accounts=new AccountStore(),a=accounts.provision(),c=accounts.create(a.accountId,create() as any),server=await createGameServer({port:0,accounts});
  try {
    const ca=await login(server.port,a.token);await ca.request({type:'character_enter',characterId:c.id},'character_entered');
    const p=server.game.players.get(c.id)!;p.x=-4;p.z=16;
    const closed=new Promise<number>(ok=>ca.ws.once('close',ok));
    accounts.db.exec("CREATE TRIGGER fail_save BEFORE UPDATE ON characters BEGIN SELECT RAISE(ABORT,'fixture write failure'); END;");
    ca.send({type:'quest',action:'accept'});assert.equal(await closed,1011);
    assert.equal((await fetch(`http://127.0.0.1:${server.port}/health`)).status,503);
    assert.equal(JSON.parse(accounts.db.prepare('SELECT body FROM characters WHERE id=?').get(c.id)!.body as string).quest.state,'available');
  }finally{await server.close();}
});

test('duas seleções simultâneas na mesma conta concedem só uma lease',async()=>{
  const accounts=new AccountStore(),a=accounts.provision(),one=accounts.create(a.accountId,create() as any),two=accounts.create(a.accountId,create('Nara') as any),server=await createGameServer({port:0,accounts});
  try {
    const ca=await login(server.port,a.token),cb=await login(server.port,a.token),n=ca.messages.length,m=cb.messages.length;
    ca.send({type:'character_enter',characterId:one.id});cb.send({type:'character_enter',characterId:two.id});
    await until(()=>ca.messages.slice(n).some(r=>r.type==='character_entered'||r.type==='account_error')&&cb.messages.slice(m).some(r=>r.type==='character_entered'||r.type==='account_error'));
    const replies=[...ca.messages.slice(n),...cb.messages.slice(m)];
    assert.equal(replies.filter(r=>r.type==='character_entered').length,1);assert.equal(replies.filter(r=>r.type==='account_error'&&r.code==='ACCOUNT_IN_USE').length,1);assert.equal(server.game.players.size,1);
    await ca.close();await cb.close();
  }finally{await server.close();}
});
