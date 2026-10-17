import test from 'node:test';
import assert from 'node:assert/strict';
import { Game, type Enemy, type Player } from '../server/src/game.js';
import { NPC, QUEST, XP_LEVELS } from '../shared/config.js';
function fixture() {
  let now = 100000;
  const game = new Game(() => now), p = game.connect(game.create('Arin'));
  const nearNpc = (player = p) => { player.x = NPC.x; player.z = NPC.z + 2; };
  const kill = (enemy: Enemy, player = p) => {
    now += 1000; enemy.hp = 1; enemy.state = 'patrol'; enemy.participants.clear();
    player.x = enemy.x; player.z = enemy.z + 2;
    game.action(player, { type: 'skill', skill: 'attack', target: enemy.id });
  };
  return { game, p, nearNpc, kill, advance(ms: number) { now += ms; } };
}
test('missão requer NPC, objetivos e entrega; recompensa é concedida uma vez', () => {
  const f = fixture(), { game, p } = f;
  game.action(p, { type: 'quest', action: 'accept' }); assert.equal(p.quest.state, 'available');
  f.nearNpc(); game.action(p, { type: 'quest', action: 'accept' }); assert.equal(p.quest.state, 'active');
  game.action(p, { type: 'quest', action: 'complete' }); assert.equal(p.coins, 0);
  for (let i = 0; i < 3; i++) f.kill(game.enemies.get('brumino-1')!);
  for (let i = 0; i < 2; i++) f.kill(game.enemies.get('cerne-1')!);
  assert.equal(p.quest.state, 'ready'); assert.equal(p.xp, 176); assert.equal(p.level, 2);
  game.action(p, { type: 'quest', action: 'complete' }); assert.equal(p.quest.state, 'ready');
  f.nearNpc(); game.action(p, { type: 'quest', action: 'complete' });
  assert.equal(p.quest.state, 'completed'); assert.equal(p.xp, 176 + QUEST.xp); assert.equal(p.level, 3); assert.equal(p.coins, QUEST.coins);
  assert.equal(p.inventory.filter(s => s.item === 'dawnSword').length, 1);
  game.action(p, { type: 'quest', action: 'complete' }); assert.equal(p.xp, 316); assert.equal(p.coins, QUEST.coins);
});
test('inventário cheio cancela toda a entrega; liberar espaço permite a entrega', () => {
  const { game, p, nearNpc } = fixture(); nearNpc(); p.quest = { state: 'ready', brumino: 3, cerne: 2 };
  p.inventory = Array.from({ length: 24 }, () => ({ item: 'trainingSword', quantity: 1 }));
  game.action(p, { type: 'quest', action: 'complete' }); assert.equal(p.quest.state, 'ready'); assert.equal(p.xp, 0); assert.equal(p.coins, 0); assert.equal(p.inventory.length, 24);
  game.action(p, { type: 'item', action: 'discard', slot: 0 }); assert.equal(p.inventory.length, 23);
  game.action(p, { type: 'quest', action: 'complete' }); assert.equal(p.quest.state, 'completed'); assert.equal(p.inventory.length, 24);
});
test('participantes recebem crédito uma vez; somente o maior dano coleta um único saque', () => {
  const { game, p, advance } = fixture(), b = game.connect(game.create('Nara')), e = game.enemies.get('brumino-1')!;
  p.x = b.x = e.x; p.z = b.z = e.z + 2; p.quest.state = b.quest.state = 'active';
  game.action(p, { type: 'skill', skill: 'attack', target: e.id }); game.action(b, { type: 'skill', skill: 'attack', target: e.id });
  game.action(p, { type: 'skill', skill: 'cleave', target: e.id }); advance(800); game.action(b, { type: 'skill', skill: 'attack', target: e.id });
  assert.equal(e.state, 'dead'); assert.equal(p.xp, 28); assert.equal(b.xp, 28); assert.equal(p.quest.brumino, 1); assert.equal(b.quest.brumino, 1);
  const loot = [...game.loot.values()][0]; assert.equal(loot.ownerId, p.id);
  game.action(b, { type: 'loot', id: loot.id }); assert.equal(game.loot.size, 1); assert.equal(b.coins, 0);
  p.z += 10; game.action(p, { type: 'loot', id: loot.id }); assert.equal(p.coins, 0); p.z = e.z + 2;
  game.action(p, { type: 'loot', id: loot.id }); assert.equal(game.loot.size, 0); assert.equal(p.coins, 6); assert.equal(p.inventory[0].quantity, 4);
  game.action(p, { type: 'loot', id: loot.id }); game.action(b, { type: 'loot', id: loot.id }); assert.equal(p.coins, 6); assert.equal(b.coins, 0);
});
test('equipamento troca no mesmo espaço; tônicos curam, consomem e têm recarga', () => {
  const { game, p, advance } = fixture();
  p.inventory.push({ item: 'dawnSword', quantity: 1 }, { item: 'barkArmor', quantity: 1 });
  game.action(p, { type: 'item', action: 'equip', slot: 1 }); assert.equal(p.weapon, 'dawnSword'); assert.equal(p.inventory[1].item, 'trainingSword');
  game.action(p, { type: 'item', action: 'equip', slot: 2 }); assert.equal(p.armor, 'barkArmor'); assert.equal(p.inventory[2].item, 'tunic');
  p.hp = 20; game.action(p, { type: 'item', action: 'use', slot: 0 }); assert.equal(p.hp, 85); assert.equal(p.inventory[0].quantity, 2);
  game.action(p, { type: 'item', action: 'use', slot: 0 }); assert.equal(p.hp, 85); assert.equal(p.inventory[0].quantity, 2);
  advance(8001); game.action(p, { type: 'item', action: 'use', slot: 0 }); assert.equal(p.hp, 120); assert.equal(p.inventory[0].quantity, 1);
  advance(8001); game.action(p, { type: 'item', action: 'use', slot: 0 }); assert.equal(p.inventory[0].quantity, 1);
});
test('progressão chega ao nível 5 e limita a experiência sem ultrapassar o teto', () => {
  const f = fixture(), e = f.game.enemies.get('brumino-1')!;
  for (let i = 0; i < 35; i++) f.kill(e);
  assert.equal(f.p.level, 5); assert.equal(f.p.xp, XP_LEVELS[4]); assert.equal(f.game.hp(f.p), 216);
});
