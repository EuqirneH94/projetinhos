import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { WebSocket } from 'ws';
import { createGameServer } from '../server/src/server.js';
import { Store, digest } from '../server/src/store.js';
import { Game } from '../server/src/game.js';
import { NPC } from '../shared/config.js';
import { client, until } from './helpers.js';

test('dois clientes veem o mesmo combate, missão e saque; desconectar e retomar preserva o personagem', async () => {
  const server = await createGameServer({ port: 0 });
  try {
    const a = await client(server.port, 'Arin'), b = await client(server.port, 'Nara');
    const p = server.game.players.get(a.welcome.id)!, q = server.game.players.get(b.welcome.id)!, enemy = server.game.enemies.get('brumino-1')!;
    // Fixtures de posição encurtam o teste; todas as ações de combate e recompensa usam WebSocket.
    p.x = q.x = NPC.x; p.z = q.z = NPC.z + 2;
    a.send({ type: 'quest', action: 'accept' }); b.send({ type: 'quest', action: 'accept' });
    await until(() => a.state().you.quest.state === 'active' && b.state().you.quest.state === 'active');
    a.send({ type: 'skill', skill: 'attack', target: enemy.id });
    await until(() => a.messages.some(m => m.type === 'notice' && m.text.includes('perto')));
    assert.equal(enemy.hp, 64); assert.equal(p.cooldowns.attack, 0);
    p.x = q.x = enemy.x; p.z = q.z = enemy.z + 1.9;
    a.send({ type: 'skill', skill: 'attack', target: enemy.id });
    await until(() => enemy.hp === 49);
    a.send({ type: 'skill', skill: 'attack', target: enemy.id });
    await until(() => a.messages.some(m => m.type === 'notice' && m.text.includes('recarregando')));
    assert.equal(enemy.hp, 49);
    b.send({ type: 'skill', skill: 'attack', target: enemy.id }); await until(() => enemy.hp === 34);
    a.send({ type: 'skill', skill: 'cleave', target: enemy.id }); await until(() => enemy.hp === 3);
    b.send({ type: 'skill', skill: 'cleave', target: enemy.id });
    await until(() => a.state().you.xp === 28 && b.state().you.xp === 28);
    assert.equal(a.state().enemies.find(e => e.id === enemy.id)!.state, 'dead');
    assert.equal(b.state().enemies.find(e => e.id === enemy.id)!.hp, 0);
    assert.equal(a.state().you.quest.brumino, 1); assert.equal(b.state().you.quest.brumino, 1);
    const loot = a.state().loot[0]; assert.equal(loot.ownerId, p.id);
    b.send({ type: 'loot', id: loot.id }); a.send({ type: 'loot', id: loot.id }); a.send({ type: 'loot', id: loot.id });
    await until(() => a.state().you.coins === 6 && a.state().loot.length === 0 && b.state().loot.length === 0);
    assert.equal(b.state().you.coins, 0); assert.equal(a.state().you.inventory[0].quantity, 4);
    const token = a.welcome.token; await a.close(); await until(() => b.state().players.length === 1);
    const resumed = await client(server.port, undefined, token);
    assert.equal(resumed.welcome.id, p.id); assert.equal(resumed.state().you.xp, 28); assert.equal(resumed.state().you.coins, 6); assert.equal(resumed.state().you.quest.brumino, 1);
    await resumed.close(); await b.close();
  } finally { await server.close(); }
});

test('arquivo SQLite preserva todos os campos após fechar e reiniciar o servidor', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'nexo-db-')), path = join(directory, 'reinos.sqlite');
  let server = await createGameServer({ port: 0, store: new Store(path) });
  try {
    const a = await client(server.port, 'Arin'), p = server.game.players.get(a.welcome.id)!;
    Object.assign(p, { xp: 316, level: 3, coins: 47, weapon: 'dawnSword', armor: 'barkArmor', hp: 101, energy: 73, potionAt: Date.now() + 8000 });
    p.quest = { state: 'completed', brumino: 3, cerne: 2 }; p.inventory = [{ item: 'potion', quantity: 2 }, { item: 'tunic', quantity: 1 }];
    p.cooldowns.cleave = Date.now() + 5000;
    const expected = server.game.save(p);
    const token = a.welcome.token; await a.close();
    // O close do cliente não confirma o close do servidor. Neste último, save é
    // síncrono e antecede a remoção de players; aguardar essa condição, não um sleep.
    await until(() => !server.game.players.has(p.id), 5000);
    const persisted = server.store.resume(token);
    assert.ok(persisted, 'A sessão deve recuperar a fixture após o fechamento no servidor.');
    for (const key of ['id', 'nickname', 'xp', 'level', 'coins', 'weapon', 'armor', 'potionAt'] as const) assert.equal(persisted[key], expected[key]);
    assert.deepEqual(persisted.inventory, expected.inventory); assert.deepEqual(persisted.quest, expected.quest); assert.deepEqual(persisted.cooldowns, expected.cooldowns);
    await server.close();
    server = await createGameServer({ port: 0, store: new Store(path) });
    const b = await client(server.port, undefined, token), after = b.state().you;
    for (const key of ['id', 'nickname', 'xp', 'level', 'coins', 'weapon', 'armor', 'potionAt'] as const) assert.equal(after[key], persisted[key]);
    assert.deepEqual(after.inventory, persisted.inventory); assert.deepEqual(after.quest, persisted.quest); assert.deepEqual(after.cooldowns, persisted.cooldowns);
    assert.ok(after.hp >= persisted.hp && after.hp <= after.maxHp); assert.ok(after.energy >= persisted.energy);
    const row = server.store.db.prepare('SELECT token_hash FROM sessions').get()!; assert.equal(row.token_hash, digest(token)); assert.notEqual(row.token_hash, token);
    await b.close();
  } finally { await server.close(); rmSync(directory, { recursive: true, force: true }); }
});

test('retomar a mesma sessão substitui o socket antigo sem apagar o novo jogador', async () => {
  const server = await createGameServer({ port: 0 });
  try {
    const a = await client(server.port, 'Arin'); const code = new Promise<number>(ok => a.ws.once('close', n => ok(n)));
    const b = await client(server.port, undefined, a.welcome.token);
    assert.equal(await code, 4001); await until(() => b.state().players.length === 1);
    assert.equal(server.game.players.size, 1); assert.equal(b.state().you.id, a.welcome.id);
    b.send({ type: 'move', seq: 0, x: 1, z: 0 }); await until(() => b.state().you.x > 0); await b.close();
  } finally { await server.close(); }
});

test('sessões expiram por inatividade; tokens incorretos não recuperam progresso', () => {
  let now = 100000; const store = new Store(':memory:', () => now), game = new Game();
  try { const token = store.create(game.create('Arin')); assert.equal(store.resume('x'.repeat(43)), undefined); assert.ok(store.resume(token)); now += 31 * 24 * 60 * 60 * 1000; assert.equal(store.resume(token), undefined); }
  finally { store.close(); }
});

test('origem não autorizada, quadro muito grande e spam são rejeitados', async () => {
  const server = await createGameServer({ port: 0 });
  try {
    await new Promise<void>((ok, fail) => {
      const ws = new WebSocket(`ws://127.0.0.1:${server.port}/ws`, { origin: 'https://invalid.example' }); ws.on('error', () => {});
      ws.on('unexpected-response', (req, res) => { try { assert.equal(res.statusCode, 403); req.destroy(); ok(); } catch (e) { fail(e); } }); ws.on('open', () => fail(new Error('Origem não deveria ser aceita.')));
    });
    const large = new WebSocket(`ws://127.0.0.1:${server.port}/ws`); large.on('error', () => {});
    const closed = new Promise<number>(ok => large.once('close', code => ok(code)));
    await new Promise<void>(ok => large.once('open', () => ok())); large.send('x'.repeat(2048)); assert.equal(await closed, 1009);
    const spam = await client(server.port, 'Nara'); const limited = new Promise<number>(ok => spam.ws.once('close', code => ok(code)));
    for (let i = 0; i < 100; i++) spam.send({ type: 'ping', at: Date.now() }); assert.equal(await limited, 1008);
  } finally { await server.close(); }
});

test('HTTP serve o cliente compilado e restringe acesso a arquivos fora de dist', async () => {
  const server = await createGameServer({ port: 0 });
  try {
    const root = await fetch(`http://127.0.0.1:${server.port}/`); assert.equal(root.status, 200); assert.match(await root.text(), /Ecos dos Faróis/); assert.match(root.headers.get('content-security-policy')!, /frame-ancestors 'none'/);
    const health = await fetch(`http://127.0.0.1:${server.port}/health`); assert.equal((await health.json() as { ok: boolean }).ok, true);
    const outside = await fetch(`http://127.0.0.1:${server.port}/%2e%2e%2fpackage.json`); assert.notEqual(outside.status, 200);
    const post = await fetch(`http://127.0.0.1:${server.port}/`, { method: 'POST' }); assert.equal(post.status, 405);
  } finally { await server.close(); }
});
