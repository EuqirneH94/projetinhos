import test from 'node:test';
import assert from 'node:assert/strict';
import { WebSocket } from 'ws';
import { createGameServer } from '../server/src/server.js';
import { parseMessage } from '../server/src/protocol.js';
import { blocked, move } from '../shared/movement.js';
import { HOUSES, WORLD } from '../shared/config.js';
import type { ServerMessage, Snapshot } from '../shared/types.js';
export async function client(port: number, nickname?: string, token?: string) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);
  const messages: ServerMessage[] = [];
  ws.on('message', b => messages.push(JSON.parse(b.toString())));
  await new Promise<void>((ok, fail) => { ws.once('open', () => ok()); ws.once('error', fail); });
  ws.send(JSON.stringify(token ? { type: 'resume', token } : { type: 'join', nickname }));
  const welcome = await until(() => messages.find(m => m.type === 'welcome'));
  assert.equal(welcome.type, 'welcome'); if (welcome.type !== 'welcome') throw new Error('No welcome');
  await until(() => messages.find(m => m.type === 'state'));
  return { ws, messages, welcome,
    state: () => [...messages].reverse().find(m => m.type === 'state') as Snapshot,
    send: (message: unknown) => ws.send(JSON.stringify(message)),
    close: () => new Promise<void>(ok => { if (ws.readyState === WebSocket.CLOSED) { ok(); return; } ws.once('close', () => ok()); ws.close(); })
  };
}
export async function until<T>(read: () => T | undefined | false, timeout = 2500): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeout) { const value = read(); if (value) return value; await new Promise(ok => setTimeout(ok, 15)); }
  throw new Error('Condição não satisfeita dentro do prazo.');
}
test('protocolo rejeita posição, dano, energia, apelido HTML e entradas malformadas', () => {
  for (const msg of ['{', 'null', '[]', JSON.stringify({ type: 'move', seq: 1, x: 20, z: 0 }), JSON.stringify({ type: 'move', seq: 1, x: 1, z: 0, hp: 9999 }), JSON.stringify({ type: 'skill', skill: 'attack', damage: 999 }), JSON.stringify({ type: 'join', nickname: '<script>' }), 'x'.repeat(513)]) assert.equal(parseMessage(msg), null);
  assert.ok(parseMessage(JSON.stringify({ type: 'join', nickname: 'Luiz Henrique' })));
  assert.ok(parseMessage(JSON.stringify({ type: 'move', seq: 1, x: 0.7, z: 0.7 })));
});
test('movimento normaliza diagonal, limita tempo e respeita obstáculos e bordas', () => {
  const a = { x: 0, z: -1 }; move(a, 1, -1, 1000); assert.ok(Math.hypot(a.x, a.z + 1) <= WORLD.speed * 0.05 + 1e-10);
  const house = HOUSES[0]; assert.equal(blocked(house.x, house.z), true);
  const edge = { x: WORLD.maxX - WORLD.radius, z: 0 }; for (let i = 0; i < 100; i++) move(edge, 1, 0, 0.05); assert.ok(edge.x <= WORLD.maxX - WORLD.radius);
});
test('dois WebSockets recebem IDs diferentes e observam movimento autoritativo', async () => {
  const server = await createGameServer({ port: 0 });
  try {
    const a = await client(server.port, 'Arin'), b = await client(server.port, 'Nara');
    assert.notEqual(a.welcome.id, b.welcome.id); assert.notEqual(a.welcome.token, b.welcome.token);
    assert.equal(a.welcome.token.length, 43);
    await until(() => a.state().players.length === 2 && b.state().players.length === 2);
    assert.ok(Math.hypot(a.state().you.x - b.state().you.x, a.state().you.z - b.state().you.z) > 1, 'Entrada deve separar os modelos dos dois jogadores.');
    const before = a.state().you.x;
    let seq = 0;
    const moving = setInterval(() => a.send({ type: 'move', seq: seq++, x: 1, z: 0 }), 50);
    try { await until(() => b.state().players.some(p => p.id === a.welcome.id && p.x > before + 0.4), 5000); }
    finally { clearInterval(moving); }
    a.send({ type: 'move', seq: seq++, x: 0, z: 0 });
    const published = b.state().players.find(p => p.id === a.welcome.id)!;
    assert.ok(!('token' in published)); assert.ok(!('inventory' in published));
    a.send({ type: 'move', seq: seq++, x: 999, z: 0 });
    await until(() => a.messages.some(m => m.type === 'notice' && m.kind === 'error'));
    assert.ok(server.game.players.get(a.welcome.id)!.x < before + 2);
    await a.close(); await until(() => b.state().players.length === 1); await b.close();
  } finally { await server.close(); }
});
