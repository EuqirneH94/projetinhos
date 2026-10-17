import test from 'node:test';
import assert from 'node:assert/strict';
import { Game } from '../server/src/game.js';
import { SKILLS, SPAWN } from '../shared/config.js';
function arena() {
  let now = 100000;
  const game = new Game(() => now), p = game.connect(game.create('Arin'));
  const e = game.enemies.get('brumino-1')!;
  for (const id of game.enemies.keys()) if (id !== e.id) game.enemies.delete(id);
  p.x = e.x; p.z = e.z + 2;
  return { game, p, e, advance(ms: number) { now += ms; }, tick(n: number) { for (let i = 0; i < n; i++) { now += 50; game.step(); } } };
}
test('alcance, recarga e energia são verificados antes do dano', () => {
  const a = arena(), { game, p, e } = a;
  game.action(p, { type: 'skill', skill: 'attack', target: e.id }); assert.equal(e.hp, e.maxHp - SKILLS.attack.damage);
  game.action(p, { type: 'skill', skill: 'attack', target: e.id }); assert.equal(e.hp, e.maxHp - SKILLS.attack.damage);
  a.advance(749); game.action(p, { type: 'skill', skill: 'attack', target: e.id }); assert.equal(e.hp, 49);
  a.advance(1); game.action(p, { type: 'skill', skill: 'attack', target: e.id }); assert.equal(e.hp, 34);
  p.z += 15; game.action(p, { type: 'skill', skill: 'cleave', target: e.id }); assert.equal(e.hp, 34); assert.equal(p.energy, 100); assert.equal(p.cooldowns.cleave, 0);
  p.z = e.z + 2; p.energy = 24; game.action(p, { type: 'skill', skill: 'cleave', target: e.id }); assert.equal(e.hp, 34);
  p.energy = 100; game.action(p, { type: 'skill', skill: 'cleave', target: e.id }); assert.equal(e.hp, 3); assert.equal(p.energy, 75);
});
test('círculo atinge área e morte de um inimigo só é processada uma vez', () => {
  const { game, p, e } = arena(); e.hp = 1;
  game.action(p, { type: 'skill', skill: 'nova' }); assert.equal(e.state, 'dead'); assert.equal(game.loot.size, 1); assert.equal(p.energy, 65);
  game.action(p, { type: 'skill', skill: 'attack', target: e.id }); assert.equal(game.loot.size, 1);
});
test('IA persegue, ataca e retorna; personagem morto aguarda para reaparecer', () => {
  const a = arena(), { game, p, e } = a; p.z = e.z + 4;
  a.tick(25); assert.ok(['chase', 'attack'].includes(e.state)); a.tick(35); assert.ok(p.hp < 120);
  p.x = SPAWN.x; p.z = SPAWN.z; a.tick(180); assert.equal(e.target, undefined); assert.ok(['return', 'patrol'].includes(e.state)); assert.equal(e.hp, e.maxHp);
  p.x = e.x; p.z = e.z + 1; p.hp = 1; a.tick(35); assert.equal(p.dead, true);
  game.action(p, { type: 'respawn' }); assert.equal(p.dead, true);
  a.advance(3001); game.action(p, { type: 'respawn' }); assert.equal(p.dead, false); assert.equal(p.hp, 120); assert.equal(p.x, SPAWN.x); assert.equal(p.z, SPAWN.z);
});
