import { WebSocket } from 'ws';
import assert from 'node:assert/strict';
import type { ServerMessage, Snapshot } from '../shared/types.js';
export async function until<T>(read: () => T | undefined | false, timeout = 5000): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeout) { const value = read(); if (value) return value; await new Promise(ok => setTimeout(ok, 15)); }
  throw new Error('Condição não satisfeita dentro do prazo.');
}
export async function client(port: number, nickname?: string, token?: string) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`), messages: ServerMessage[] = [];
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
