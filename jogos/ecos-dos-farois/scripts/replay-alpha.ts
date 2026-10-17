/** Percurso real por WebSocket. Não teleporta, não concede itens e não altera Game. */
import { WebSocket } from "ws";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createGameServer } from "../server/src/server.js";
import { Store } from "../server/src/store.js";
import { blocked, distance } from "../shared/movement.js";
import { FRAGMENTS, BOSS_ID, CLASS_KITS } from "../shared/alpha.js";
import { NPC, SHRINE, WORLD } from "../shared/config.js";
import type {
  ClientMessage,
  Snapshot,
  ServerMessage,
} from "../shared/types.js";

const directory = resolve(process.argv[2] ?? "journey-verification");
mkdirSync(directory, { recursive: true });
const db = resolve(directory, "journey.sqlite");
let server = await createGameServer({ port: 0, store: new Store(db) });
let ws: WebSocket | undefined,
  state: Snapshot | undefined,
  token = "",
  notices: string[] = [];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const send = (msg: ClientMessage) => ws!.send(JSON.stringify(msg));
async function until(predicate: () => boolean, ms = 10000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (predicate()) return;
    await sleep(50);
  }
  throw new Error("Condição não atingida. " + notices.slice(-3).join(" | "));
}
async function open(resume = false) {
  state = undefined;
  ws = new WebSocket("ws://127.0.0.1:" + server.port + "/ws");
  ws.on("message", (raw) => {
    const m = JSON.parse(String(raw)) as ServerMessage;
    if (m.type === "welcome") token = m.token;
    if (m.type === "state") state = m;
    if (m.type === "notice") notices.push(m.text);
  });
  await new Promise<void>((ok, fail) => {
    ws!.once("open", ok);
    ws!.once("error", fail);
  });
  send(
    resume
      ? { type: "resume", token }
      : {
          type: "join",
          nickname: "PercursoAlpha",
          factionId: "vigilia",
          raceId: "valdarios",
          classId: "sentinela",
          appearance: 0,
        },
  );
  await until(() => !!state);
}
function pathTo(target: { x: number; z: number }) {
  const start = { x: Math.round(state!.you.x), z: Math.round(state!.you.z) },
    goal = { x: Math.round(target.x), z: Math.round(target.z) };
  const key = (x: number, z: number) => x + "," + z,
    sk = key(start.x, start.z),
    gk = key(goal.x, goal.z);
  const open = [{ ...start, g: 0, f: distance(start, goal), k: sk }],
    cost = new Map([[sk, 0]]),
    parent = new Map<string, string>();
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const n = open.shift()!;
    if (n.k === gk) {
      const out: { x: number; z: number }[] = [];
      let k = gk;
      while (k !== sk) {
        const [x, z] = k.split(",").map(Number);
        out.unshift({ x, z });
        k = parent.get(k)!;
      }
      out.push(target);
      return out;
    }
    for (const [dx, dz] of dirs) {
      const x = n.x + dx,
        z = n.z + dz;
      if (
        x < WORLD.minX + 1 ||
        x > WORLD.maxX - 1 ||
        z < WORLD.minZ + 1 ||
        z > WORLD.maxZ - 1 ||
        blocked(x, z, 0.5)
      )
        continue;
      if (
        dx &&
        dz &&
        (blocked(n.x + dx, n.z, 0.5) || blocked(n.x, n.z + dz, 0.5))
      )
        continue;
      const k = key(x, z),
        g = n.g + Math.hypot(dx, dz);
      if (g >= (cost.get(k) ?? Infinity)) continue;
      cost.set(k, g);
      parent.set(k, n.k);
      open.push({ x, z, k, g, f: g + Math.hypot(goal.x - x, goal.z - z) });
    }
  }
  throw new Error("Sem caminho até " + JSON.stringify(goal));
}
function support() {
  const p = state!.you,
    now = Date.now();
  if (
    p.hp < p.maxHp * 0.45 &&
    p.inventory.some((s) => s.item === "potion") &&
    p.potionAt < now
  ) {
    send({
      type: "item",
      action: "use",
      slot: p.inventory.findIndex((s) => s.item === "potion"),
    });
  }
  if (p.hp < p.maxHp * 0.65 && (p.cooldowns.focus ?? 0) < now && p.energy > 30)
    send({ type: "skill", skill: "focus" });
}
let sequence = 0;
async function walk(target: { x: number; z: number }, precision = 0.85) {
  const points = pathTo(target);
  for (const point of points) {
    const deadline = Date.now() + 14000;
    while (
      distance(state!.you, point) > (point === points.at(-1) ? precision : 0.66)
    ) {
      if (state!.you.dead) throw new Error("Personagem caiu no percurso.");
      if (Date.now() > deadline)
        throw new Error(
          "Movimento bloqueado: " +
            JSON.stringify({ at: { x: state!.you.x, z: state!.you.z }, point }),
        );
      const dx = point.x - state!.you.x,
        dz = point.z - state!.you.z,
        d = Math.hypot(dx, dz);
      send({ type: "move", seq: sequence++, x: dx / d, z: dz / d });
      support();
      await sleep(80);
    }
  }
  send({ type: "move", seq: sequence++, x: 0, z: 0 });
  await sleep(100);
}
async function fight(id: string) {
  let enemy = state!.enemies.find((e) => e.id === id)!;
  await walk({ x: enemy.x, z: enemy.z + 2.3 }, 1.0);
  const deadline = Date.now() + 45000;
  while ((enemy = state!.enemies.find((e) => e.id === id)!).state !== "dead") {
    if (state!.you.dead || Date.now() > deadline)
      throw new Error("Combate não concluído: " + id);
    support();
    const p = state!.you,
      now = Date.now();
    if (distance(p, enemy) > 2.8) {
      const dx = enemy.x - p.x,
        dz = enemy.z - p.z,
        d = Math.hypot(dx, dz);
      send({ type: "move", seq: sequence++, x: dx / d, z: dz / d });
    } else {
      send({ type: "move", seq: sequence++, x: 0, z: 0 });
      if ((p.cooldowns.guard ?? 0) < now && p.energy > 25)
        send({ type: "skill", skill: "guard" });
      if (p.cooldowns.attack < now)
        send({ type: "skill", skill: "attack", target: id });
      if (p.cooldowns.cleave < now && p.energy > 30)
        send({ type: "skill", skill: "cleave", target: id });
    }
    await sleep(170);
  }
  send({ type: "move", seq: sequence++, x: 0, z: 0 });
  const drop = state!.loot.find(
    (l) => l.ownerId === state!.you.id && distance(l, enemy) < 2.5,
  );
  if (drop) {
    await walk(drop, 2.3);
    send({ type: "loot", id: drop.id });
    await sleep(150);
  }
  console.log(
    "COMBATE",
    id,
    "XP",
    state!.you.xp,
    "VIDA",
    Math.round(state!.you.hp),
  );
}
try {
  await open();
  await walk({ x: NPC.x + 1.3, z: NPC.z + 2.2 });
  send({ type: "quest", action: "accept" });
  await until(() => state!.you.quest.state === "active");
  console.log("MISSÃO ACEITA");
  for (const id of [
    "brumino-1",
    "brumino-2",
    "brumino-3",
    "cerne-1",
    "cerne-2",
  ])
    await fight(id);
  await until(() => state!.you.quest.state === "ready");
  await walk({ x: NPC.x + 1.3, z: NPC.z + 2.2 });
  send({ type: "quest", action: "complete" });
  await until(() => state!.you.quest.state === "completed");
  const weapon = state!.you.inventory.findIndex((s) => s.item === "dawnSword");
  if (weapon >= 0) send({ type: "item", action: "equip", slot: weapon });
  console.log("PRIMEIRA MISSÃO CONCLUÍDA");
  for (const f of FRAGMENTS) {
    await walk({ x: f.x + 1, z: f.z + 1 });
    send({ type: "world", action: "attune", id: f.id });
    await until(() => !!state!.you.story?.fragments.includes(f.id));
    console.log("ECO", f.id);
  }
  await fight(BOSS_ID);
  await walk({ x: SHRINE.x + 2.5, z: SHRINE.z + 1.5 });
  send({ type: "world", action: "restore", choice: "flow" });
  await until(() => !!state!.you.story?.restored);
  const before = structuredClone(state!.you);
  const coins = before.coins;
  send({ type: "world", action: "restore", choice: "repair" });
  await sleep(200);
  if (state!.you.coins !== coins || state!.you.story!.choice !== "flow")
    throw new Error("Recompensa duplicada ou escolha reescrita.");
  await new Promise<void>((ok) => {
    ws!.once("close", () => ok());
    ws!.close();
  });
  await server.close();
  server = await createGameServer({ port: 0, store: new Store(db) });
  await open(true);
  if (
    JSON.stringify(state!.you.story) !== JSON.stringify(before.story) ||
    state!.you.coins !== before.coins ||
    state!.you.weapon !== before.weapon
  )
    throw new Error("Retomada divergiu.");
  const report = {
    passed: true,
    method:
      "Cliente WebSocket em tempo real, sem teleporte ou mutação da simulação. Movimento respeita os obstáculos compartilhados.",
    quests: 2,
    fragments: state!.you.story!.fragments,
    boss: state!.you.story!.boss,
    restored: state!.you.story!.restored,
    choice: state!.you.story!.choice,
    coins: state!.you.coins,
    level: state!.you.level,
    weapon: state!.you.weapon,
    restartedAndResumed: true,
    elapsedScope:
      "Jogo local em Linux/Node 24. Não substitui teste de Windows ou carga MMORPG.",
  };
  writeFileSync(
    resolve(directory, "journey-result.json"),
    JSON.stringify(report, null, 2),
  );
  console.log("PERCURSO COMPLETO", JSON.stringify(report));
} catch (error) {
  writeFileSync(
    resolve(directory, "journey-result.json"),
    JSON.stringify(
      { passed: false, error: String(error), notices: notices.slice(-10) },
      null,
      2,
    ),
  );
  throw error;
} finally {
  ws?.terminate();
  await server.close();
}
