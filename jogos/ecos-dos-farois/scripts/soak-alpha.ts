/** 30 real minutes of local integration. Synthetic public protocol clients, not a GPU/Windows benchmark. */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { AccountStore } from "../server/src/accounts.js";
import { Store } from "../server/src/store.js";
import { createGameServer } from "../server/src/server.js";
import { JourneyClient, pace } from "./replay-slice.js";

const evidence=resolve(process.argv[2]??"soak-evidence"); mkdirSync(evidence,{recursive:true});
const seconds=Number(process.argv[3]??1800);
if (!Number.isInteger(seconds) || seconds<30 || seconds>7200) throw new Error("Use a real duration of 30..7200 seconds");
const privateDirectory=mkdtempSync(resolve(tmpdir(),"edf-soak-private-")),
  db=resolve(privateDirectory,"legacy.sqlite"), accountDb=resolve(privateDirectory,"accounts.sqlite");
const observedFiles=["server/src/game.ts","server/src/server.ts","server/src/protocol.ts","server/src/store.ts","server/src/accounts.ts","server/src/account-lock.ts","server/src/diagnostics.ts","shared/types.ts","shared/identity.ts","shared/movement.ts","shared/config.ts","shared/alpha.ts","shared/extended.ts","shared/release.ts","scripts/replay-slice.ts","scripts/soak-alpha.ts","package.json","package-lock.json"];
const fingerprint=()=>Object.fromEntries(observedFiles.map(file=>[file,createHash("sha256").update(readFileSync(resolve(file))).digest("hex")]));
let checkpointCommit="unavailable";
try {checkpointCommit=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim();}catch{/* Hashes above identify non-Git candidates too. */}
const started=Date.now(),startedIso=new Date(started).toISOString(),sourceAtStart=fingerprint();
const record=(event:string,data:Record<string,unknown>={})=>console.log(JSON.stringify({at:new Date().toISOString(),elapsedSeconds:(Date.now()-started)/1000,event,...data}));
let accounts=new AccountStore(accountDb);
const credentials=Array.from({length:4},()=>accounts.provision()); // offline operator provisioning, never grants in-world progress
let server=await createGameServer({port:0,store:new Store(db),accounts});
const clients=[
  new JourneyClient("sentinela","vigilia","valdarios","SoakSentinela"),
  new JourneyClient("arcanista","confluencia","eluvios","SoakArcanista"),
  new JourneyClient("ressonante","vigilia","kordranios","SoakRessonante"),
  new JourneyClient("errante","confluencia","naquiros","SoakErrante"),
];
let healthSamples=0,dbChecks=0,restarts=0,reconnections=0,writerRefusals=0,sessionRefusals=0,movementLoops=0,
  completedJourneys=0,healsOnAlly=0,stopped=false,failed:unknown,monitor:ReturnType<typeof setInterval>|undefined;
const invariant=(c:JourneyClient)=>({classId:c.state!.you.classId,factionId:c.state!.you.factionId,
  quest:c.state!.you.quest,story:c.state!.you.story,xp:c.state!.you.xp,coins:c.state!.you.coins,
  inventory:c.state!.you.inventory,weapon:c.state!.you.weapon,armor:c.state!.you.armor,
  materials:c.state!.you.materials,companion:c.state!.you.companion,crafting:c.state!.you.crafting});
function checkDb() {
  const check=new DatabaseSync(accountDb,{readOnly:true});
  try {
    const integrity=check.prepare("PRAGMA integrity_check").all(),foreignKeys=check.prepare("PRAGMA foreign_key_check").all(),
      accountCount=check.prepare("SELECT count(*) AS n FROM accounts").get()!.n,
      characterCount=check.prepare("SELECT count(*) AS n FROM characters").get()!.n;
    if(JSON.stringify(integrity)!=='[{"integrity_check":"ok"}]' || foreignKeys.length || Number(accountCount)!==4 || Number(characterCount)!==4)
      throw new Error("SQLite integrity/count invariant failed");
    dbChecks++;record("sqlite_readonly_check",{integrity:"ok",foreignKeyErrors:0,accounts:accountCount,characters:characterCount});
  } finally {check.close();}
}
async function health(strictPlayers=true) {
  const response=await fetch(`http://127.0.0.1:${server.port}/health`,{signal:AbortSignal.timeout(3000)}),body=await response.json();
  if(!response.ok || !body.ok || (strictPlayers&&body.players!==4)) throw new Error(`Unhealthy server: ${JSON.stringify(body)}`);
  healthSamples++;record("health",{status:response.status,players:body.players,tick:body.tick,
    memoryRssMb:Math.round(process.memoryUsage().rss/1024/1024),snapshots:clients.map(c=>c.snapshots)});
}
async function secondSessionRefused() {
  const first=clients[0],duplicate=new JourneyClient(first.classId,first.factionId,first.raceId,"DuplicateSoak");
  // Read/login and a character_enter are public; existing selected character avoids accidental creation.
  duplicate.characterId=first.characterId;
  try {
    // open intentionally rejects its normal world-entry wait, so perform the authenticated messages directly.
    const {WebSocket}=await import("ws"); duplicate.ws=new WebSocket(`ws://127.0.0.1:${server.port}/ws`);
    duplicate.ws.on("message",raw=>{const m=JSON.parse(String(raw));if(m.type==="account_ready") duplicate.ready=true;
      if(m.type==="account_error") duplicate.errors.push(m.code);});
    await new Promise<void>((ok,fail)=>{duplicate.ws!.once("open",ok);duplicate.ws!.once("error",fail);});
    duplicate.send({type:"account_login",token:credentials[0].token});
    await duplicate.until(()=>duplicate.ready,5000,"duplicate account authentication");
    duplicate.send({type:"character_enter",characterId:first.characterId});
    await duplicate.until(()=>duplicate.errors.includes("ACCOUNT_IN_USE"),5000,"second session rejection");
    const prior=first.snapshots;await first.until(()=>first.snapshots>prior,3000,"first session remains active");
    sessionRefusals++;record("second_session_refused_first_retained");
  } finally {await duplicate.disconnect();}
}
function concurrentWriterRefused() {
  let rejected=false;
  try {const unexpected=new AccountStore(accountDb);unexpected.close();}
  catch(error) {rejected=(error as {code?:string}).code==="ACCOUNT_WRITER_ACTIVE";if(!rejected)throw error;}
  if(!rejected)throw new Error("A concurrent account writer was accepted");
  writerRefusals++;record("concurrent_writer_refused");
}
async function restart() {
  const before=clients.map(c=>JSON.stringify(invariant(c)));
  for(const c of clients)await c.disconnect();
  await server.close();checkDb();accounts=new AccountStore(accountDb);
  server=await createGameServer({port:0,store:new Store(db),accounts});
  for(let n=0;n<clients.length;n++){await clients[n].open(server.port,credentials[n].token);
    if(JSON.stringify(invariant(clients[n]))!==before[n])throw new Error(`Restart changed persisted progress for ${clients[n].classId}`);}
  restarts++;record("server_restarted_all_four_progress_equal");await health();
}
try {
  for(let n=0;n<clients.length;n++)await clients[n].open(server.port,credentials[n].token);
  record("soak_started",{requestedSeconds:seconds,node:process.version,platform:process.platform,checkpointCommit,workingTree:"Candidate changes are identified by source hashes; checkpoint is not the final deliverable commit.",
    method:"Four synthetic public WebSocket clients; real-time movement, combat, quests and independent faction worlds. Separate synthetic SQLite files. No clock replacement, teleport or grants.",sourceAtStart});
  await health();checkDb();concurrentWriterRefused();await secondSessionRefused();
  monitor=setInterval(()=>{if(!stopped)void health(false).catch(error=>{failed??=error;});},10000);
  // Two simultaneous complete public journeys, one in each faction; the other two accounts remain genuine logged-in allies.
  await Promise.all(clients.slice(0,2).map(async c=>{await c.completeJourney((event,data)=>record(event,{classId:c.classId,factionId:c.factionId,data}));completedJourneys++;}));
  // Test an allied heal through damage taken naturally: walk both allies to an enemy and let it attack the Sentinela.
  const tank=clients[0],healer=clients[2];
  await Promise.all([tank.walk({x:-8,z:-5}),healer.walk({x:-3,z:-5})]);
  await tank.until(()=>tank.state!.you.hp<tank.state!.you.maxHp-10,20000,"natural enemy damage");
  const priorHeal=healer.events.filter(e=>e.kind==="heal"&&e.sourceId===healer.state!.you.id&&e.targetId===tank.state!.you.id).length;
  healer.send({type:"skill",skill:"focus",target:tank.state!.you.id});
  await healer.until(()=>healer.events.filter(e=>e.kind==="heal"&&e.sourceId===healer.state!.you.id&&e.targetId===tank.state!.you.id).length>priorHeal,5000,"heal confirmed on real allied account");
  healsOnAlly++;record("real_ally_heal_confirmed");
  await Promise.all([tank.walk({x:0,z:24}),healer.walk({x:2,z:24})]);
  let nextReconnect=Date.now()+20000,nextRestart=Date.now()+300000,nextDb=Date.now()+60000;
  while(Date.now()-started<seconds*1000) {
    if(failed)throw failed;
    await Promise.all(clients.map((c,n)=>c.walk({x:(movementLoops%2?1:-1)*(n%2?3:1),z:movementLoops%2?24:19})));
    movementLoops++;
    for(const c of clients)c.send({type:"ping",at:Date.now()});
    if(Date.now()>nextReconnect) {
      const n=reconnections%clients.length,before=JSON.stringify(invariant(clients[n]));
      await clients[n].disconnect(true);await pace(120);await clients[n].open(server.port,credentials[n].token);
      if(JSON.stringify(invariant(clients[n]))!==before)throw new Error("Network-loss resume changed progress");
      reconnections++;record("abrupt_network_loss_resumed",{classId:clients[n].classId});nextReconnect=Date.now()+20000;
    }
    if(Date.now()>nextDb){checkDb();await secondSessionRefused();concurrentWriterRefused();nextDb=Date.now()+60000;}
    if(Date.now()>nextRestart){clearInterval(monitor);await restart();monitor=setInterval(()=>{if(!stopped)void health(false).catch(error=>{failed??=error;});},10000);nextRestart=Date.now()+300000;}
    await pace(250);
  }
  if(failed)throw failed;clearInterval(monitor);monitor=undefined;await restart();
  record("soak_duration_reached",{actualSeconds:(Date.now()-started)/1000});
} catch(error) {failed=error;record("soak_failed",{error:String(error),notices:clients.map(c=>({classId:c.classId,notices:c.notices.slice(-5)}))});process.exitCode=1;}
finally {
  stopped=true;if(monitor)clearInterval(monitor);
  for(const c of clients)await c.disconnect();await server.close();
  try {if(clients.every(c=>c.characterId))checkDb();}catch(error){failed??=error;process.exitCode=1;}
  const sourceAtEnd=fingerprint(),sourceUnchanged=JSON.stringify(sourceAtStart)===JSON.stringify(sourceAtEnd),actualSeconds=(Date.now()-started)/1000;
  const result={passed:!failed,startedIso,finishedIso:new Date().toISOString(),requestedSeconds:seconds,actualSeconds,
    real30MinuteRun:seconds>=1800&&actualSeconds>=1800,node:process.version,platform:process.platform,checkpointCommit,
    method:"Local integration with four synthetic protocol clients. Not a graphical play session, Windows validation or MMORPG-scale performance test.",
    counts:{healthSamples,dbChecks,restarts,reconnections,writerRefusals,sessionRefusals,movementLoops,completedJourneys,healsOnAlly,
      snapshots:clients.map(c=>({classId:c.classId,factionId:c.factionId,snapshots:c.snapshots,actions:c.actions}))},
    sourceUnchanged,sourceAtStart,sourceAtEnd,error:failed?String(failed):undefined};
  writeFileSync(resolve(evidence,"soak-result.json"),JSON.stringify(result,null,2));record("soak_finished",result);
}
