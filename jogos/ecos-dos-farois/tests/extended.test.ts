import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Game, type Player } from "../server/src/game.js";
import { Store } from "../server/src/store.js";
import { AccountStore } from "../server/src/accounts.js";
import { parseMessage } from "../server/src/protocol.js";
import { CRAFT_STATION, RECIPE, TAMING } from "../shared/extended.js";
import type { ClassId } from "../shared/identity.js";
const craft = (operation = 1) => ({ type: "craft", recipeId: RECIPE.id, operation }) as const;
function fixture(classId: ClassId = "errante") {
  let now = 100000;
  const g = new Game(() => now);
  const p = g.connect(g.create("Explorador", { factionId: "vigilia", raceId: "valdarios", classId, appearance: 0 }));
  p.quest = { state: "completed", brumino: 3, cerne: 2 };
  return { g, p, advance(ms: number) { now += ms; g.step(); } };
}
function prepareCraft(p: Player) {
  p.x = CRAFT_STATION.x; p.z = CRAFT_STATION.z;
  p.materials = { seivaClara: 8 }; p.coins = 20;
}
function prepareCapture(f: ReturnType<typeof fixture>) {
  const e = f.g.enemies.get("brumino-1")!;
  e.hp = 20; f.p.x = e.x; f.p.z = e.z + 3;
  return e;
}
function capture(f: ReturnType<typeof fixture>) {
  const e = prepareCapture(f);
  f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
  f.advance(TAMING.duration);
  assert.ok(f.p.companion);
  return e;
}
test("protocolo estendido rejeita concessões de item, alvo alheio e sequências não inteiras", () => {
  for (const o of [
    { ...craft(), coins: 999 }, { ...craft(), operation: 1.5 }, { ...craft(), operation: 0 },
    { ...craft(), recipeId: "forged" }, { type: "companion", action: "capture", target: "brumino-1", ownerId: "other" },
    { type: "companion", action: "follow", target: "brumino-1" }, { type: "companion", action: "attack" },
  ]) assert.equal(parseMessage(JSON.stringify(o)), null);
  assert.deepEqual(parseMessage(JSON.stringify(craft())), craft());
});
test("save antigo permanece sem campos novos até obter material; crédito é pessoal e limitado", () => {
  const { g, p } = fixture();
  assert.equal(p.materials, undefined); assert.equal(p.companion, undefined);
  const q = g.connect(g.create("Testemunha"));
  const e = prepareCapture({ g, p } as ReturnType<typeof fixture>); e.hp = 1;
  g.action(p, { type: "skill", skill: "attack", target: e.id });
  assert.equal(g.save(p).materials?.seivaClara, 1); assert.equal(q.materials, undefined);
  assert.ok(g.save(p).materials); assert.equal(g.save(q).materials, undefined);
  p.materials = { seivaClara: 99 };
  const second = g.enemies.get("brumino-2")!;
  p.x = second.x; p.z = second.z + 1; second.hp = 1; p.cooldowns.attack = 0;
  g.action(p, { type: "skill", skill: "attack", target: second.id });
  assert.equal(p.materials!.seivaClara, 99);
});
test("fabricação verifica missão, distância e insumos sem débito parcial", () => {
  const { g, p } = fixture(); prepareCraft(p);
  const before = g.save(p); p.quest.state = "active";
  g.action(p, craft()); assert.equal(p.coins, before.coins);
  p.quest.state = "completed"; p.x = 30;
  g.action(p, craft()); assert.deepEqual(p.inventory, before.inventory);
  prepareCraft(p); p.materials!.seivaClara = 1;
  g.action(p, craft()); assert.equal(p.coins, before.coins); assert.equal(p.crafting, undefined);
});
test("mochila cheia preserva material e carteira; liberação permite uma fabricação e replay não duplica", () => {
  const { g, p } = fixture(); prepareCraft(p);
  p.inventory = Array.from({ length: 24 }, () => ({ item: "trainingSword" as const, quantity: 1 }));
  const before = g.save(p); g.action(p, craft());
  assert.deepEqual(g.save(p), before);
  p.inventory.pop(); g.action(p, craft());
  assert.equal(p.coins, 17); assert.equal(p.materials!.seivaClara, 6);
  assert.equal(p.inventory.filter((s) => s.item === "potion").length, 1);
  assert.equal(p.crafting!.serial, 1);
  const after = g.save(p); g.action(p, craft()); g.action(p, craft(3));
  assert.deepEqual(g.save(p), after);
});
test("falha real de SQLite aborta fabricação antes de publicar inventário, consumo ou recibo", () => {
  const { g, p } = fixture(); prepareCraft(p);
  const store = new Store();
  try {
    store.create(g.save(p));
    store.db.exec("CREATE TRIGGER deny_extended BEFORE UPDATE ON players BEGIN SELECT RAISE(ABORT,'extended fixture write failure'); END;");
    g.commitPlayer = (saved) => store.save(saved);
    const before = g.save(p), events = g.events.length;
    assert.throws(() => g.action(p, craft()), /extended fixture write failure/);
    assert.deepEqual(g.save(p), before); assert.equal(g.events.length, events);
    const body = JSON.parse(store.db.prepare("SELECT body FROM players WHERE id=?").get(p.id)!.body as string);
    assert.deepEqual(body, before);
  } finally { store.close(); }
});
test("receita e vínculo sobrevivem fechamento e reabertura do SQLite legado sem mudar versão", () => {
  const dir = mkdtempSync(join(tmpdir(), "edf-extended-"));
  let store: Store | undefined;
  try {
    const f = fixture(); prepareCraft(f.p);
    store = new Store(join(dir, "synthetic.sqlite"));
    const token = store.create(f.g.save(f.p)); f.g.commitPlayer = (s) => store!.save(s);
    f.g.action(f.p, craft()); capture(f);
    const expected = f.g.save(f.p); store.close();
    store = new Store(join(dir, "synthetic.sqlite"));
    assert.deepEqual(store.resume(token), expected);
    const next = new Game().connect(store.resume(token)!);
    assert.equal(next.companion!.id, expected.companion!.id);
    assert.equal(store.db.prepare("PRAGMA integrity_check").get()!.integrity_check, "ok");
    assert.equal(store.db.prepare("PRAGMA user_version").get()!.user_version, 1);
  } finally { store?.close(); rmSync(dir, { recursive: true, force: true }); }
});
test("captura exige Errante, janela de vida, mesma facção e espécie comum", () => {
  const f = fixture("sentinela"), e = prepareCapture(f);
  f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
  assert.equal(f.g.captures.size, 0);
  f.p.classId = "errante";
  for (const hp of [64, 10]) {
    e.hp = hp; f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
    assert.equal(f.g.captures.size, 0);
  }
  e.hp = 20;
  f.g.action(f.p, { type: "companion", action: "capture", target: "confluencia_brumino-1" });
  f.g.action(f.p, { type: "companion", action: "capture", target: "cerne-1" });
  assert.equal(f.g.captures.size, 0); assert.equal(f.p.companion, undefined);
});
test("movimento, dano e desconexão interrompem confiança e liberam reserva", () => {
  for (const interrupt of ["movement", "damage", "disconnect"]) {
    const f = fixture(), e = prepareCapture(f);
    f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
    assert.equal(f.g.captures.size, 1);
    if (interrupt === "movement") f.g.action(f.p, { type: "move", x: 1, z: 0, seq: 1 });
    else if (interrupt === "damage") f.p.hp -= 1;
    else f.g.disconnect(f.p.id);
    f.advance(TAMING.duration);
    assert.equal(f.g.captures.size, 0); assert.equal(f.p.companion, undefined);
  }
});
test("dois Errantes disputam uma reserva; conclusão única persiste antes da remoção sem saque de abate", () => {
  const f = fixture(), e = prepareCapture(f);
  const q = f.g.connect(f.g.create("SegundoErrante", { factionId: "vigilia", raceId: "kordranios", classId: "errante", appearance: 0 }));
  q.quest.state = "completed"; q.x = f.p.x + 1.2; q.z = f.p.z;
  let commits = 0;
  f.g.commitPlayer = (saved) => { commits++; assert.equal(e.state === "dead", false); assert.ok(saved.companion); };
  const xp = f.p.xp, coins = f.p.coins;
  f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
  f.g.action(q, { type: "companion", action: "capture", target: e.id });
  assert.equal(f.g.captures.size, 1);
  f.advance(TAMING.duration - 1); assert.equal(f.p.companion, undefined);
  f.advance(1);
  assert.equal(commits, 1); assert.ok(f.p.companion); assert.equal(q.companion, undefined);
  assert.equal(f.g.companions.size, 1); assert.equal(f.g.loot.size, 0);
  assert.equal(f.p.xp, xp); assert.equal(f.p.coins, coins);
  f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
  assert.equal(commits, 1); assert.equal(f.g.companions.size, 1);
});
test("captura com falha de gravação não remove fera nem cria vínculo/ator parcial", () => {
  const f = fixture(), e = prepareCapture(f);
  f.g.commitPlayer = () => { throw new Error("controlled write failure"); };
  f.g.action(f.p, { type: "companion", action: "capture", target: e.id });
  assert.throws(() => f.advance(TAMING.duration), /controlled write failure/);
  assert.equal(f.p.companion, undefined); assert.equal(f.g.companions.size, 0);
  assert.notEqual(e.state, "dead"); assert.equal(e.hp, 20); assert.equal(f.g.captures.size, 0);
});
test("ativação repetida, reconexão e morte preservam um vínculo e no máximo um ator", () => {
  const f = fixture(); capture(f);
  for (let i = 0; i < 8; i++) f.g.action(f.p, { type: "companion", action: "activate" });
  assert.equal(f.g.companions.size, 1);
  const saved = f.g.save(f.p), p = f.g.connect(saved);
  assert.equal(f.g.companions.size, 1); assert.equal(p.companion!.id, saved.companion!.id);
  p.dead = true; f.advance(100);
  assert.equal(f.g.companions.size, 0); assert.equal(p.companion!.active, false);
  assert.equal(p.companion!.id, saved.companion!.id);
});
test("comandos de fera são do dono; atacar parede/alvo estrangeiro falha e recolher conserva vínculo", () => {
  const f = fixture(); capture(f);
  const actor = f.g.companions.get(f.p.id)!;
  f.g.action(f.p, { type: "companion", action: "stay" }); assert.equal(actor.mode, "stay");
  f.g.action(f.p, { type: "companion", action: "attack", target: "confluencia_brumino-2" });
  assert.equal(actor.target, undefined);
  const e = f.g.enemies.get("brumino-2")!;
  f.p.x = -16; f.p.z = 23; e.x = -9; e.z = 23;
  f.g.action(f.p, { type: "companion", action: "attack", target: e.id });
  assert.equal(actor.target, undefined);
  f.g.action(f.p, { type: "companion", action: "recall" });
  assert.equal(f.g.companions.size, 0); assert.ok(f.p.companion); assert.equal(f.p.companion.active, false);
});
test("campos estendidos persistem por conta e lease, sem compartilhar com o segundo personagem", () => {
  const store = new AccountStore();
  try {
    const a = store.provision(), one = store.create(a.accountId, { nickname: "UmErrante", factionId: "vigilia", raceId: "valdarios", classId: "errante" });
    const two = store.create(a.accountId, { nickname: "OutroErrante", factionId: "vigilia", raceId: "valdarios", classId: "errante" });
    const selected = store.acquire(a.accountId, one.id), f = fixture();
    const p = f.g.connect(selected.save); p.quest.state = "completed"; prepareCraft(p);
    f.g.commitPlayer = (s) => store.save(a.accountId, selected.leaseId, s);
    f.g.action(p, craft()); store.release(a.accountId, selected.leaseId);
    const restored = store.acquire(a.accountId, one.id);
    assert.equal(restored.save.crafting!.serial, 1); assert.equal(restored.save.materials!.seivaClara, 6);
    store.release(a.accountId, restored.leaseId);
    assert.equal(store.acquire(a.accountId, two.id).save.materials, undefined);
  } finally { store.close(); }
});
test("ataque confirmado da fera causa dano no servidor e credita missão/XP ao dono uma única vez", () => {
  const f = fixture(); capture(f);
  const actor = f.g.companions.get(f.p.id)!, e = f.g.enemies.get("brumino-2")!;
  f.p.x = e.x; f.p.z = e.z + 1;
  actor.x = e.x; actor.z = e.z + 1; e.hp = 6;
  f.p.quest = { state: "active", brumino: 0, cerne: 0 };
  f.g.action(f.p, { type: "companion", action: "attack", target: e.id });
  f.advance(50);
  assert.equal(e.state, "dead"); assert.equal(f.p.quest.brumino, 1); assert.ok(f.p.xp > 0);
  assert.equal([...f.g.loot.values()].filter((l) => l.ownerId === f.p.id).length, 1);
  const xp = f.p.xp;
  f.advance(50); f.g.action(f.p, { type: "companion", action: "attack", target: e.id });
  assert.equal(f.p.quest.brumino, 1); assert.equal(f.p.xp, xp);
});

// Real WebSocket transport with synthetic character data; not a substitute for the manual journey.
async function connectClient(port: number) {
  const { WebSocket } = await import("ws");
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);
  const messages: any[] = [];
  ws.on("message", (raw) => messages.push(JSON.parse(raw.toString())));
  const closed = new Promise<number>((resolve) => ws.once("close", (code) => resolve(code)));
  await new Promise<void>((resolve, reject) => { ws.once("open", resolve); ws.once("error", reject); });
  function until(predicate: (m: any) => boolean) {
    return new Promise<any>((resolve, reject) => {
      const existing = messages.find(predicate);
      if (existing) { resolve(existing); return; }
      const timer = setTimeout(() => { ws.off("message", check); reject(new Error("Timeout esperando confirmação real do servidor")); }, 3000);
      function check(raw: import("ws").RawData) {
        const m = JSON.parse(raw.toString());
        if (predicate(m)) { clearTimeout(timer); ws.off("message", check); resolve(m); }
      }
      ws.on("message", check);
    });
  }
  return { ws, closed, until };
}
test("WebSocket fabrica com sessão real e replay persiste um único resultado", async () => {
  const { createGameServer } = await import("../server/src/server.js");
  const f = fixture(); prepareCraft(f.p);
  const store = new Store(), token = store.create(f.g.save(f.p));
  const server = await createGameServer({ port: 0, store });
  const client = await connectClient(server.port);
  try {
    client.ws.send(JSON.stringify({ type: "resume", token })); await client.until((m) => m.type === "welcome");
    client.ws.send(JSON.stringify(craft())); client.ws.send(JSON.stringify(craft()));
    const confirmed = await client.until((m) => m.type === "state" && m.you.crafting?.serial === 1);
    assert.equal(confirmed.you.coins, 17); assert.equal(confirmed.you.materials.seivaClara, 6);
    assert.equal(store.resume(token)!.inventory[0].quantity, 4);
  } finally { client.ws.terminate(); await server.close(); }
});
test("WebSocket com gravação SQLite recusada fecha 1011 e health503 sem produto/consumo parcial", async () => {
  const { createGameServer } = await import("../server/src/server.js");
  const f = fixture(); prepareCraft(f.p);
  const store = new Store(), before = f.g.save(f.p), token = store.create(before);
  const server = await createGameServer({ port: 0, store });
  const client = await connectClient(server.port);
  try {
    client.ws.send(JSON.stringify({ type: "resume", token })); await client.until((m) => m.type === "welcome");
    store.db.exec("CREATE TRIGGER deny_network_extended BEFORE UPDATE ON players BEGIN SELECT RAISE(ABORT,'network extended fixture write failure'); END;");
    client.ws.send(JSON.stringify(craft()));
    const timer = setTimeout(() => client.ws.terminate(), 3000);
    const closeCode = await client.closed; clearTimeout(timer);
    assert.equal(closeCode, 1011);
    assert.equal((await fetch(`http://127.0.0.1:${server.port}/health`)).status, 503);
    assert.deepEqual(store.resume(token), before);
  } finally { client.ws.terminate(); await server.close(); }
});
