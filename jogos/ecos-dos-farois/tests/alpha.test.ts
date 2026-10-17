import test from "node:test";
import assert from "node:assert/strict";
import { Game } from "../server/src/game.js";
import { Store } from "../server/src/store.js";
import { parseMessage } from "../server/src/protocol.js";
import { FRAGMENTS, BOSS_ID } from "../shared/alpha.js";
import { NPC, SHRINE } from "../shared/config.js";
import type { ClassId, FactionId } from "../shared/identity.js";
function fixture(
  classId: ClassId = "sentinela",
  factionId: FactionId = "vigilia",
) {
  let now = 100000;
  const g = new Game(() => now);
  const p = g.connect(
    g.create("Aventureiro", {
      classId,
      factionId,
      raceId: factionId === "vigilia" ? "valdarios" : "eluvios",
      appearance: 1,
    }),
  );
  return {
    g,
    p,
    advance(ms: number) {
      now += ms;
      g.step();
    },
  };
}
test("combate à distância pertence ao kit da classe; cliente não pode impor dano ou classe livre", () => {
  const a = fixture("arcanista"),
    e = a.g.enemies.get("brumino-1")!;
  a.p.x = e.x;
  a.p.z = e.z + 11;
  a.g.action(a.p, { type: "skill", skill: "attack", target: e.id });
  assert.equal(e.hp, 51);
  const b = fixture("sentinela"),
    f = b.g.enemies.get("brumino-1")!;
  b.p.x = f.x;
  b.p.z = f.z + 11;
  b.g.action(b.p, { type: "skill", skill: "attack", target: f.id });
  assert.equal(f.hp, 64);
  assert.equal(
    parseMessage(
      JSON.stringify({
        type: "skill",
        skill: "cleave",
        damage: 999,
        target: e.id,
      }),
    ),
    null,
  );
  assert.equal(
    parseMessage(
      JSON.stringify({
        type: "join",
        nickname: "Invasor",
        factionId: "vigilia",
        raceId: "naquiros",
        classId: "arcanista",
        appearance: 0,
      }),
    ),
    null,
  );
});
test("conjuração só causa dano ao concluir e movimento a interrompe sem consumir energia", () => {
  const { g, p, advance } = fixture("arcanista"),
    e = g.enemies.get("brumino-1")!;
  p.x = e.x;
  p.z = e.z - 10;
  g.action(p, { type: "skill", skill: "cleave", target: e.id });
  assert.ok(p.casting);
  assert.equal(e.hp, 64);
  assert.equal(p.energy, 100);
  g.action(p, { type: "move", seq: 1, x: 1, z: 0 });
  assert.equal(p.casting, undefined);
  advance(1200);
  assert.equal(e.hp, 64);
  assert.equal(p.energy, 100);
  p.x = e.x;
  p.z = e.z - 10;
  g.action(p, { type: "move", seq: 2, x: 0, z: 0 });
  g.action(p, { type: "skill", skill: "cleave", target: e.id });
  advance(1150);
  assert.equal(e.hp, 26);
  assert.ok(p.energy < 80);
});
test("facções iniciam em mundos separados; alvo e eventos de outra facção são recusados", () => {
  const { g, p } = fixture(),
    q = g.connect(
      g.create("OutroLado", {
        classId: "errante",
        factionId: "confluencia",
        raceId: "naquiros",
        appearance: 2,
      }),
    );
  const e = g.enemies.get("brumino-1")!;
  q.x = e.x;
  q.z = e.z + 1;
  g.action(q, { type: "skill", skill: "attack", target: e.id });
  assert.equal(e.hp, 64);
  assert.deepEqual(
    g.snapshot(p.id).players.map((x) => x.id),
    [p.id],
  );
  assert.deepEqual(
    g.snapshot(q.id).players.map((x) => x.id),
    [q.id],
  );
  assert.ok(
    g.snapshot(q.id).enemies.every((x) => x.id.startsWith("confluencia_")),
  );
  g.events.push({
    kind: "level",
    x: 0,
    z: 0,
    targetId: p.id,
    factionId: "vigilia",
  });
  assert.equal(g.snapshot(q.id, g.events).events.length, 0);
});
test("equipamentos incompatíveis não alteram inventário, arma ou armadura", () => {
  const { g, p } = fixture("errante");
  p.inventory.push(
    { item: "dawnSword", quantity: 1 },
    { item: "plateArmor", quantity: 1 },
  );
  const before = structuredClone(p.inventory);
  g.action(p, { type: "item", action: "equip", slot: 1 });
  g.action(p, { type: "item", action: "equip", slot: 2 });
  assert.equal(p.weapon, "trainingBow");
  assert.equal(p.armor, "leatherArmor");
  assert.deepEqual(p.inventory, before);
  p.inventory.push({ item: "dawnBow", quantity: 1 });
  g.action(p, { type: "item", action: "equip", slot: 3 });
  assert.equal(p.weapon, "dawnBow");
  assert.equal(p.inventory[3].item, "trainingBow");
});
test("ressonâncias e restauração exigem distância, progresso, chefe e escolha; recompensa única", () => {
  const { g, p } = fixture();
  p.quest = { state: "completed", brumino: 3, cerne: 2 };
  p.x = FRAGMENTS[0].x;
  p.z = FRAGMENTS[0].z;
  g.action(p, { type: "world", action: "attune", id: "eco-2" });
  assert.equal(p.story!.fragments.length, 0);
  for (const f of FRAGMENTS) {
    p.x = f.x;
    p.z = f.z;
    g.action(p, { type: "world", action: "attune", id: f.id });
    g.action(p, { type: "world", action: "attune", id: f.id });
  }
  assert.equal(p.story!.fragments.length, 3);
  p.x = SHRINE.x;
  p.z = SHRINE.z + 3;
  g.action(p, { type: "world", action: "restore", choice: "repair" });
  assert.equal(p.coins, 0);
  p.story!.boss = true;
  g.action(p, { type: "world", action: "restore", choice: "flow" });
  assert.equal(p.coins, 30);
  assert.equal(p.xp, 130);
  assert.equal(p.story!.choice, "flow");
  g.action(p, { type: "world", action: "restore", choice: "repair" });
  assert.equal(p.coins, 30);
  assert.equal(p.xp, 130);
  assert.equal(p.story!.choice, "flow");
});
test("história e aparência persistem; a restauração pessoal não altera a história de outro jogador", () => {
  const { g, p } = fixture(),
    q = g.connect(
      g.create("Testemunha", {
        classId: "sentinela",
        factionId: "vigilia",
        raceId: "kordranios",
        appearance: 0,
      }),
    );
  p.quest.state = "completed";
  p.story = {
    fragments: FRAGMENTS.map((f) => f.id),
    boss: true,
    restored: true,
    choice: "repair",
  };
  const store = new Store();
  try {
    const token = store.create(g.save(p)),
      saved = store.resume(token)!;
    assert.deepEqual(saved.story, p.story);
    assert.equal(saved.appearance, 1);
    assert.equal(saved.classId, "sentinela");
    assert.equal(g.snapshot(q.id).you.story!.restored, false);
  } finally {
    store.close();
  }
});
test("barreira reduz dano temporariamente e cura usa recurso e recarga no servidor", () => {
  const a = fixture(),
    e = a.g.enemies.get("brumino-1")!;
  a.p.x = e.x;
  a.p.z = e.z + 1;
  a.p.hp = 80;
  a.g.action(a.p, { type: "skill", skill: "guard" });
  assert.equal(a.p.energy, 80);
  a.advance(700);
  assert.ok(a.p.hp > 73);
  assert.ok(a.g.snapshot(a.p.id).you.barrier);
  const b = fixture("ressonante");
  b.p.hp = 20;
  b.g.action(b.p, { type: "skill", skill: "focus" });
  assert.equal(b.p.hp, 20);
  b.advance(900);
  assert.equal(b.p.hp, 88);
  const energy = b.p.energy;
  b.g.action(b.p, { type: "skill", skill: "focus" });
  assert.equal(b.p.hp, 88);
  assert.equal(b.p.energy, energy);
});
test("chefe concede crédito pessoal somente aos participantes elegíveis", () => {
  const { g, p } = fixture(),
    boss = g.enemies.get(BOSS_ID)!;
  p.x = boss.x;
  p.z = boss.z + 2;
  boss.hp = 1;
  g.action(p, { type: "skill", skill: "attack", target: boss.id });
  assert.equal(boss.state, "dead");
  assert.equal(p.story!.boss, true);
  const spectator = g.connect(g.create("Distante"));
  assert.equal(spectator.story?.boss ?? false, false);
});
