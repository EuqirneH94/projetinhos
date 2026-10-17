/** Real-time public WebSocket journey. No teleport, clock replacement or grants. */
import { WebSocket } from "ws";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createGameServer } from "../server/src/server.js";
import { AccountStore } from "../server/src/accounts.js";
import { Store } from "../server/src/store.js";
import { blocked, distance } from "../shared/movement.js";
import { FRAGMENTS, BOSS_ID, CLASS_KITS, REWARD_WEAPON } from "../shared/alpha.js";
import { NPC, SHRINE, WORLD } from "../shared/config.js";
import { CRAFT_STATION, RECIPE, TAMING } from "../shared/extended.js";
import type { ClassId, FactionId, RaceId, CharacterInfo } from "../shared/identity.js";
import type { ClientMessage, Snapshot, ServerMessage } from "../shared/types.js";

export const pace = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
export class JourneyClient {
  ws?: WebSocket;
  state?: Snapshot;
  characters?: CharacterInfo[];
  ready = false;
  token = "";
  characterId = "";
  notices: string[] = [];
  errors: string[] = [];
  snapshots = 0;
  events: { kind: string; sourceId?: string; targetId?: string; amount?: number }[] = [];
  sequence = 0;
  actions = 0;
  constructor(public readonly classId: ClassId, public readonly factionId: FactionId,
    public readonly raceId: RaceId, public readonly nickname: string) {}
  send(message: ClientMessage) {
    if (this.ws?.readyState !== WebSocket.OPEN) throw new Error("Socket is not open");
    this.actions++;
    this.ws.send(JSON.stringify(message));
  }
  async until(predicate: () => boolean, ms = 12000, label = "condition") {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      if (predicate()) return;
      if (this.ws && this.ws.readyState === WebSocket.CLOSED)
        throw new Error(`Socket closed waiting for ${label}`);
      await pace(40);
    }
    throw new Error(`Timeout waiting for ${label}: ${this.notices.slice(-3).join(" | ")}`);
  }
  async open(port: number, accountToken?: string) {
    this.state = undefined; this.characters = undefined; this.ready = false;
    this.ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);
    this.ws.on("message", raw => {
      const m = JSON.parse(String(raw)) as ServerMessage;
      if (m.type === "welcome") this.token = m.token;
      if (m.type === "state") {
        this.state = m; this.snapshots++;
        this.events.push(...m.events);
        if (this.events.length > 4000) this.events.splice(0, 2000);
      }
      if (m.type === "character_list") this.characters = m.characters;
      if (m.type === "account_ready") this.ready = true;
      if (m.type === "account_error") this.errors.push(m.code);
      if (m.type === "notice") this.notices.push(m.text);
    });
    await new Promise<void>((ok, fail) => { this.ws!.once("open", ok); this.ws!.once("error", fail); });
    if (accountToken) {
      this.send({ type: "account_login", token: accountToken });
      await this.until(() => this.ready && !!this.characters, 12000, "account login");
      if (!this.characterId) {
        this.send({ type: "character_create", nickname: this.nickname, factionId: this.factionId,
          raceId: this.raceId, classId: this.classId });
        await this.until(() => !!this.characters?.some(c => c.nickname === this.nickname), 12000, "character creation");
        this.characterId = this.characters!.find(c => c.nickname === this.nickname)!.id;
      }
      this.send({ type: "character_enter", characterId: this.characterId });
    } else this.send(this.token ? { type: "resume", token: this.token } : {
      type: "join", nickname: this.nickname, factionId: this.factionId,
      raceId: this.raceId, classId: this.classId, appearance: 0,
    });
    await this.until(() => !!this.state, 12000, "entry into world");
    if (this.state!.you.classId !== this.classId || this.state!.you.factionId !== this.factionId)
      throw new Error("Creation metadata diverged");
  }
  async disconnect(abrupt = false) {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) return;
    await new Promise<void>((ok) => {
      this.ws!.once("close", () => ok());
      if (abrupt) this.ws!.terminate(); else this.ws!.close();
    });
  }
  pathTo(target: { x: number; z: number }) {
    const start = { x: Math.round(this.state!.you.x), z: Math.round(this.state!.you.z) },
      goal = { x: Math.round(target.x), z: Math.round(target.z) };
    const key = (x: number, z: number) => `${x},${z}`, sk = key(start.x, start.z), gk = key(goal.x, goal.z);
    const open = [{ ...start, g: 0, f: distance(start, goal), k: sk }],
      cost = new Map([[sk, 0]]), parent = new Map<string, string>();
    const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
    while (open.length) {
      open.sort((a,b) => a.f-b.f); const n = open.shift()!;
      if (n.k === gk) {
        const out: {x:number;z:number}[] = []; let k = gk;
        while (k !== sk) { const [x,z] = k.split(",").map(Number); out.unshift({x,z}); k = parent.get(k)!; }
        out.push(target); return out;
      }
      for (const [dx,dz] of dirs) {
        const x = n.x+dx, z=n.z+dz;
        if (x<WORLD.minX+1 || x>WORLD.maxX-1 || z<WORLD.minZ+1 || z>WORLD.maxZ-1 || blocked(x,z,0.5)) continue;
        if (dx && dz && (blocked(n.x+dx,n.z,0.5) || blocked(n.x,n.z+dz,0.5))) continue;
        const k=key(x,z), g=n.g+Math.hypot(dx,dz);
        if(g >= (cost.get(k)??Infinity)) continue;
        cost.set(k,g); parent.set(k,n.k); open.push({x,z,k,g,f:g+Math.hypot(goal.x-x,goal.z-z)});
      }
    }
    throw new Error(`No path to ${JSON.stringify(goal)}`);
  }
  support() {
    const p=this.state!.you, now=Date.now();
    if(p.hp < p.maxHp*.45 && p.inventory.some(s=>s.item==="potion") && p.potionAt<now)
      this.send({type:"item",action:"use",slot:p.inventory.findIndex(s=>s.item==="potion")});
    if(!p.casting && p.hp < p.maxHp*.65 && (p.cooldowns.focus??0)<now && p.energy>30)
      this.send({type:"skill",skill:"focus"});
  }
  async walk(target: {x:number;z:number}, precision=.85) {
    const points=this.pathTo(target);
    for(const point of points) {
      const deadline=Date.now()+14000;
      while(distance(this.state!.you,point) > (point===points.at(-1)?precision:.66)) {
        if(this.state!.you.dead) throw new Error("Character died during traversal");
        if(Date.now()>deadline) throw new Error(`Movement blocked: ${JSON.stringify({at:{x:this.state!.you.x,z:this.state!.you.z},point})}`);
        const dx=point.x-this.state!.you.x,dz=point.z-this.state!.you.z,d=Math.hypot(dx,dz);
        this.send({type:"move",seq:this.sequence++,x:dx/d,z:dz/d}); this.support(); await pace(80);
      }
    }
    this.send({type:"move",seq:this.sequence++,x:0,z:0});
    await this.until(()=>this.state!.you.ack>=this.sequence-1,2000,"movement acknowledgement");
  }
  async fight(id: string) {
    let enemy=this.state!.enemies.find(e=>e.id===id)!;
    if (!enemy) throw new Error(`Enemy absent in faction snapshot: ${id}`);
    const range=CLASS_KITS[this.classId].attack.range, initialRange=range>8 ? 8 : 2.3;
    const approaches=[0,Math.PI/4,-Math.PI/4,Math.PI/2,-Math.PI/2,Math.PI].map(angle=>({
      x:enemy.x+Math.sin(angle)*initialRange,z:Math.min(-2,enemy.z+Math.cos(angle)*initialRange)
    })).filter(point=>!blocked(point.x,point.z,.5)&&!blocked(Math.round(point.x),Math.round(point.z),.5));
    if(!approaches.length)throw new Error(`No walkable combat approach: ${id}`);
    await this.walk(approaches[0],1);
    const deadline=Date.now()+65000;
    while((enemy=this.state!.enemies.find(e=>e.id===id)!).state!=="dead") {
      if(this.state!.you.dead || Date.now()>deadline) throw new Error(`Combat failed: ${id}`);
      this.support(); const p=this.state!.you,now=Date.now();
      if(distance(p,enemy)>range-.15) {
        const dx=enemy.x-p.x,dz=enemy.z-p.z,d=Math.hypot(dx,dz);
        this.send({type:"move",seq:this.sequence++,x:dx/d,z:dz/d});
      } else {
        this.send({type:"move",seq:this.sequence++,x:0,z:0});
        if(!p.casting) {
          if((p.cooldowns.guard??0)<now && p.energy>25) this.send({type:"skill",skill:"guard"});
          if(p.cooldowns.cleave<now && p.energy>30) this.send({type:"skill",skill:"cleave",target:id});
          else if(p.cooldowns.attack<now) this.send({type:"skill",skill:"attack",target:id});
        }
      }
      await pace(170);
    }
    this.send({type:"move",seq:this.sequence++,x:0,z:0});
    const drop=this.state!.loot.find(l=>l.ownerId===this.state!.you.id && distance(l,enemy)<2.5);
    if(drop) { await this.walk(drop,2.3); this.send({type:"loot",id:drop.id});
      await this.until(()=>!this.state!.loot.some(l=>l.id===drop.id),3000,"loot collection"); }
  }
  async craftOnce(log: (event:string,data?:unknown)=>void) {
    await this.walk({x:CRAFT_STATION.x,z:CRAFT_STATION.z+1.6});
    const p=this.state!.you,operation=(p.crafting?.serial??0)+1,
      coins=p.coins,materials=p.materials?.seivaClara??0,
      quantity=p.inventory.filter(s=>s.item==="potion").reduce((sum,s)=>sum+s.quantity,0);
    this.send({type:"craft",recipeId:RECIPE.id,operation});
    await this.until(()=>this.state!.you.crafting?.serial===operation,5000,"craft persisted");
    if(this.state!.you.coins!==coins-RECIPE.coinCost || this.state!.you.materials!.seivaClara!==materials-RECIPE.materialCost ||
      this.state!.you.inventory.filter(s=>s.item==="potion").reduce((sum,s)=>sum+s.quantity,0)!==quantity+1)
      throw new Error("Craft costs/output diverged");
    const after=JSON.stringify({coins:this.state!.you.coins,materials:this.state!.you.materials,inventory:this.state!.you.inventory}),tick=this.state!.tick;
    this.send({type:"craft",recipeId:RECIPE.id,operation});
    await this.until(()=>this.state!.tick>tick+2,3000,"duplicate craft processed");
    if(JSON.stringify({coins:this.state!.you.coins,materials:this.state!.you.materials,inventory:this.state!.you.inventory})!==after)
      throw new Error("Duplicate craft changed inventory/costs");
    log("craft_verified_duplicate_refused",{recipeId:RECIPE.id,operation});
  }
  async captureCommon(log:(event:string,data?:unknown)=>void) {
    if(this.classId!=="errante")return;
    // The starter bow at the earned level 3 does 22 damage: two confirmed shots leave 20/64 HP.
    const starter=this.state!.you.inventory.findIndex(s=>s.item==="trainingBow");
    if(starter<0)throw new Error("Starter bow unavailable for controlled low-damage capture");
    this.send({type:"item",action:"equip",slot:starter});
    await this.until(()=>this.state!.you.weapon==="trainingBow",3000,"starter bow equipped");
    const id=this.factionId==="confluencia"?"confluencia_brumino-1":"brumino-1";
    await this.until(()=>this.state!.enemies.find(e=>e.id===id)?.state!=="dead",25000,"wild common beast respawn");
    let enemy=this.state!.enemies.find(e=>e.id===id)!;
    await this.walk({x:enemy.x,z:Math.min(-2,enemy.z+5)},.7);
    while((enemy=this.state!.enemies.find(e=>e.id===id)!).hp/enemy.maxHp>TAMING.maxHp) {
      await this.until(()=>this.state!.you.cooldowns.attack<Date.now(),3000,"bow cooldown");
      const prior=enemy.hp;this.send({type:"skill",skill:"attack",target:id});
      await this.until(()=>this.state!.enemies.find(e=>e.id===id)!.hp<prior,3000,"confirmed bow damage");
    }
    enemy=this.state!.enemies.find(e=>e.id===id)!;
    if(enemy.hp/enemy.maxHp<TAMING.minHp)throw new Error("Capture target over-damaged");
    this.send({type:"companion",action:"capture",target:id});
    await this.until(()=>!!this.state!.you.companion,11000,"real eight-second common beast capture");
    const companionId=this.state!.you.companion!.id;
    if((this.state!.companions??[]).filter(c=>c.ownerId===this.state!.you.id).length!==1)throw new Error("Companion actor count is not one");
    for(const action of ["stay","passive","follow"] as const){this.send({type:"companion",action});
      await this.until(()=>this.state!.you.companion?.mode===action,3000,`companion ${action}`);}
    this.send({type:"companion",action:"recall"});await this.until(()=>!this.state!.you.companion!.active,3000,"companion recalled");
    this.send({type:"companion",action:"activate"});await this.until(()=>!!this.state!.you.companion!.active,3000,"companion activated");
    const reward=this.state!.you.inventory.findIndex(s=>s.item==="dawnBow");this.send({type:"item",action:"equip",slot:reward});
    await this.until(()=>this.state!.you.weapon==="dawnBow",3000,"reward bow reequipped");
    log("common_beast_captured_commands_verified",{companionId,speciesId:TAMING.speciesId});
  }
  async completeJourney(log: (event: string, data?: unknown)=>void = ()=>{}) {
    await this.walk({x:NPC.x+1.3,z:NPC.z+2.2}); this.send({type:"quest",action:"accept"});
    await this.until(()=>this.state!.you.quest.state==="active",5000,"quest accepted"); log("quest_accepted");
    // Confluence enemies intentionally have a suffix; worlds remain isolated.
    const enemyId=(id:string)=>this.factionId==="confluencia"?`confluencia_${id}`:id;
    for(const id of ["brumino-1","brumino-2","brumino-3","cerne-1","cerne-2"]) {
      await this.fight(enemyId(id)); log("enemy_defeated",{id,xp:this.state!.you.xp,hp:Math.round(this.state!.you.hp)});
    }
    await this.until(()=>this.state!.you.quest.state==="ready",5000,"quest ready");
    await this.walk({x:NPC.x+1.3,z:NPC.z+2.2}); this.send({type:"quest",action:"complete"});
    await this.until(()=>this.state!.you.quest.state==="completed",5000,"quest complete");
    const weapon=REWARD_WEAPON[this.classId],slot=this.state!.you.inventory.findIndex(s=>s.item===weapon);
    if(slot<0) throw new Error("Class reward missing"); this.send({type:"item",action:"equip",slot});
    await this.until(()=>this.state!.you.weapon===weapon,5000,"class reward equipped"); log("quest_reward_equipped",{weapon});
    await this.craftOnce(log);
    await this.captureCommon(log);
    for(const f of FRAGMENTS) {
      await this.walk({x:f.x+1,z:f.z+1}); this.send({type:"world",action:"attune",id:f.id});
      await this.until(()=>!!this.state!.you.story?.fragments.includes(f.id),5000,`fragment ${f.id}`); log("fragment_attuned",{id:f.id});
    }
    await this.fight(enemyId(BOSS_ID)); log("boss_defeated");
    await this.walk({x:SHRINE.x+2.5,z:SHRINE.z+1.5}); this.send({type:"world",action:"restore",choice:"flow"});
    await this.until(()=>!!this.state!.you.story?.restored,5000,"restoration");
    const before=structuredClone(this.state!.you),tick=this.state!.tick;
    this.send({type:"world",action:"restore",choice:"repair"});
    await this.until(()=>this.state!.tick>tick+2,3000,"duplicate request processed");
    if(this.state!.you.coins!==before.coins || this.state!.you.story!.choice!=="flow") throw new Error("Duplicate reward or rewritten choice");
    log("journey_complete",{classId:this.classId,factionId:this.factionId,coins:before.coins,level:before.level});
    return before;
  }
}

async function main() {
  const evidence=resolve(process.argv[2]??"journey-slice-evidence"); mkdirSync(evidence,{recursive:true});
  const privateDirectory=mkdtempSync(resolve(tmpdir(),"edf-slice-private-"));
  const classes=(process.argv[3]??"sentinela,arcanista,errante,ressonante").split(",") as ClassId[];
  const factions: FactionId[]=["vigilia","confluencia"], results: unknown[]=[];
  for(let n=0;n<classes.length;n++) {
    const classId=classes[n],index=["sentinela","arcanista","errante","ressonante"].indexOf(classId),
      factionId=factions[index%2],raceId:RaceId=factionId==="vigilia"?(index%4===0?"valdarios":"kordranios"):(index%4===1?"eluvios":"naquiros");
    const db=resolve(privateDirectory,`${classId}-legacy.sqlite`),accountDb=resolve(privateDirectory,`${classId}-accounts.sqlite`);
    let accounts=new AccountStore(accountDb); const credential=accounts.provision();
    let server=await createGameServer({port:0,store:new Store(db),accounts});
    const client=new JourneyClient(classId,factionId,raceId,`Jornada${n}`),started=Date.now();
    const log=(event:string,data?:unknown)=>console.log(JSON.stringify({at:new Date().toISOString(),classId,factionId,event,data}));
    try {
      await client.open(server.port,credential.token); const before=await client.completeJourney(log);
      await client.disconnect(); await server.close();
      accounts=new AccountStore(accountDb); server=await createGameServer({port:0,store:new Store(db),accounts});
      await client.open(server.port,credential.token);
      if(JSON.stringify(client.state!.you.story)!==JSON.stringify(before.story) || client.state!.you.coins!==before.coins || client.state!.you.weapon!==before.weapon ||
        JSON.stringify(client.state!.you.materials)!==JSON.stringify(before.materials) || JSON.stringify(client.state!.you.crafting)!==JSON.stringify(before.crafting) ||
        JSON.stringify(client.state!.you.companion)!==JSON.stringify(before.companion))
        throw new Error("Restart/resume diverged");
      results.push({passed:true,classId,factionId,raceId,elapsedSeconds:(Date.now()-started)/1000,accountCreated:true,characterCreatedViaWebSocket:true,
        restartedAndResumed:true,snapshots:client.snapshots,actions:client.actions,quest:client.state!.you.quest,story:client.state!.you.story,weapon:client.state!.you.weapon,
        materials:client.state!.you.materials,crafting:client.state!.you.crafting,companion:client.state!.you.companion});
    } catch(error) { results.push({passed:false,classId,factionId,error:String(error),notices:client.notices.slice(-10)}); throw error; }
    finally { await client.disconnect(); await server.close(); writeFileSync(resolve(evidence,"journey-slice-result.json"),JSON.stringify({method:"Real-time synthetic public WebSocket clients; no teleport, privileged grants or clock replacement. Linux is not Windows/GPU acceptance.",node:process.version,platform:process.platform,results},null,2)); }
  }
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) await main();
