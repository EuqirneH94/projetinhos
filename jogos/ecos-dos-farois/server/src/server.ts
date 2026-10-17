import { RELEASE_VERSION } from "../../shared/release.js";
import { diagnostic } from './diagnostics.js';
import { AccountStore, AccountError } from './accounts.js';
import { CLASS_IDS } from '../../shared/identity.js';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { WebSocketServer, WebSocket } from 'ws';
import { Game } from './game.js';
import { Store } from './store.js';
import { parseMessage } from './protocol.js';
import type { ServerMessage } from '../../shared/types.js';
type Connection = { ws: WebSocket; id?: string; accountId?: string; accountToken?: string; leaseId?: string; tokens: number; refill: number; invalid: number; alive: boolean; ip: string };
export async function createGameServer(options: { port?: number; host?: string; store?: Store; accounts?: AccountStore; onFatal?: (error: unknown, phase: string) => void; origins?: string[] } = {}) {
  const game = new Game(), store = options.store ?? new Store();
  const accounts = options.accounts;
  const connections = new Set<Connection>();
  const owners = new Map<string, Connection>();
  const creations = new Map<string, { at: number; count: number }>();
  let storageFailed = false, closing = false, storesClosed = false;
  let closePromise: Promise<void> | undefined;
  const root = resolve(process.cwd(), 'client/dist');
  const origins = new Set((options.origins ?? (process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8787', 'http://127.0.0.1:8787'])).map(o => o.trim()).filter(Boolean));
  let sockets: string;
  try { sockets = [...origins].map(o => { const u = new URL(o.trim()); if (!['http:', 'https:'].includes(u.protocol)) throw new Error('ALLOWED_ORIGINS precisa conter origens http ou https.'); u.protocol = u.protocol === 'https:' ? 'wss:' : 'ws:'; return u.origin; }).join(' '); }
  catch (error) { try { store.close(); } finally { accounts?.close(); } throw error; }
  const http = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ${sockets}; font-src 'self'; media-src 'self' blob:; object-src 'none'; frame-ancestors 'none'`);
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
    if (req.url === '/health') { res.setHeader('Content-Type', 'application/json'); res.statusCode = storageFailed ? 503 : 200; res.end(JSON.stringify({ ok: !storageFailed, players: game.players.size, tick: game.tick, version:RELEASE_VERSION })); return; }
    try {
      const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
      const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
      const body = await readFile(file);
      const mime: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.mp3':'audio/mpeg', '.wav':'audio/wav', '.webp':'image/webp' };
      res.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
      res.setHeader('Cache-Control', extname(file) === '.html' ? 'no-store' : 'public, max-age=3600');
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Arquivo não encontrado. Execute npm run build na raiz do projeto.'); }
  });
  const wss = new WebSocketServer({ noServer: true, maxPayload: 1024, perMessageDeflate: false });
  http.on('upgrade', (req, socket, head) => {
    if (storageFailed || req.url !== '/ws' || connections.size >= 32 || (req.headers.origin && !origins.has(req.headers.origin))) { socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n'); socket.destroy(); return; }
    wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws, req));
  });
  const send = (c: Connection, msg: ServerMessage) => {
    if (c.ws.readyState === WebSocket.OPEN && c.ws.bufferedAmount < 262144) c.ws.send(JSON.stringify(msg));
    else if (c.ws.bufferedAmount >= 262144) c.ws.close(1013, 'Conexão lenta');
  };
  const storageFailure = (error?: unknown, phase = 'storage') => { if (storageFailed) return; storageFailed = true; diagnostic('server_unhealthy', error, { phase }); for (const c of connections) c.ws.close(1011, 'Falha de persistência'); };
  const fatalFailure = (error: unknown, phase: string) => { storageFailure(error, phase); options.onFatal?.(error, phase); };
  const persist = (id: string) => {
    const p = game.players.get(id), c = owners.get(id); if (!p) return;
    if (c?.accountId && c.leaseId && accounts) accounts.save(c.accountId, c.leaseId, game.save(p));
    else store.save(game.save(p));
  };
  // Extended crafting/capture commits the full JSON body before publishing world effects.
  game.commitPlayer = saved => {
    const c = owners.get(saved.id);
    if (!c || storageFailed || closing) throw new Error('Operação persistente sem sessão ativa.');
    if (c.accountId && c.leaseId && accounts) accounts.save(c.accountId, c.leaseId, saved);
    else store.save(saved);
  };
  const leave = (c: Connection) => {
    if (c.id && owners.get(c.id) === c) {
      if (!storageFailed) persist(c.id);
      game.disconnect(c.id); game.players.delete(c.id); game.dirty.delete(c.id); owners.delete(c.id);
    }
    if (c.accountId && c.leaseId) accounts?.release(c.accountId, c.leaseId);
    c.id = undefined; c.leaseId = undefined;
  };
  const flush = () => { try { for (const id of game.dirty) { persist(id); } game.dirty.clear(); } catch (error) { storageFailure(error); } };
  wss.on('connection', (ws, req) => {
    const c: Connection = { ws, tokens: 70, refill: Date.now(), invalid: 0, alive: true, ip: req.socket.remoteAddress ?? 'unknown' }; connections.add(c);
    const timeout = setTimeout(() => { if (!c.id && !c.accountId) ws.close(1008, 'Entrada expirada'); }, 5000);
    ws.on('pong', () => { c.alive = true; });
    ws.on('error', () => {});
    ws.on('message', (data, binary) => {
      if (storageFailed || closing) return;
      try {
      const now = Date.now(); c.tokens = Math.min(70, c.tokens + (now - c.refill) * 0.045); c.refill = now;
      if (--c.tokens < 0) { ws.close(1008, 'Muitas ações'); return; }
      const msg = binary ? null : parseMessage(data.toString());
      if (!msg) { send(c, { type: 'notice', text: 'Ação inválida rejeitada pelo servidor.', kind: 'error' }); if (++c.invalid >= 4) ws.close(1008, 'Mensagens inválidas'); return; }
      if (msg.type === 'account_login') {
        if (!accounts) { send(c, { type: 'account_error', code: 'ACCOUNTS_DISABLED' }); return; }
        if (c.id || c.accountId) { send(c, { type: 'account_error', code: 'ALREADY_AUTHENTICATED' }); return; }
        const accountId = accounts.authenticate(msg.token);
        if (!accountId) { send(c, { type: 'account_error', code: 'UNAUTHORIZED' }); ws.close(4003, 'Sessão inválida'); return; }
        c.accountId = accountId; c.accountToken = msg.token; clearTimeout(timeout);
        send(c, { type: 'account_ready', accountId, classes: CLASS_IDS, classSelection: accounts.allowClassSelection });
        send(c, { type: 'character_list', characters: accounts.list(accountId) }); return;
      }
      if (c.accountId && (!accounts || accounts.authenticate(c.accountToken ?? '') !== c.accountId)) {
        send(c, { type: 'account_error', code: 'UNAUTHORIZED' }); ws.close(4003, 'Sessão inválida'); return;
      }
      if (msg.type === 'character_list' || msg.type === 'character_create' || msg.type === 'character_enter' || msg.type === 'character_leave') {
        if (!accounts || !c.accountId) { send(c, { type: 'account_error', code: 'UNAUTHORIZED' }); return; }
        try {
          if (msg.type === 'character_list') send(c, { type: 'character_list', characters: accounts.list(c.accountId) });
          if (msg.type === 'character_create') {
            accounts.create(c.accountId, msg);
            send(c, { type: 'character_list', characters: accounts.list(c.accountId) });
          }
          if (msg.type === 'character_enter') {
            if (c.id) throw new AccountError('ALREADY_PLAYING');
            const selected = accounts.acquire(c.accountId, msg.characterId);
            c.leaseId = selected.leaseId; c.id = selected.character.id;
            owners.set(c.id, c); game.connect({...selected.save,factionId:selected.character.factionId,raceId:selected.character.raceId,classId:selected.character.classId,appearance:selected.save.appearance??0});
            send(c, { type: 'character_entered', character: selected.character }); send(c, game.snapshot(c.id));
          }
          if (msg.type === 'character_leave') { leave(c); send(c, { type: 'character_left' }); }
        } catch (error) { if (error instanceof AccountError) send(c, { type: 'account_error', code: error.code }); else throw error; }
        return;
      }
      if (msg.type === 'join' || msg.type === 'resume') {
        if (c.id || c.accountId) { send(c, { type: 'notice', kind: 'error', text: 'Esta conexão já tem uma identidade.' }); return; }
        if (msg.type === 'join') {
          for (const [ip, rate] of creations) if (now - rate.at > 60000) creations.delete(ip);
          const rate = creations.get(c.ip) ?? { at: now, count: 0 }; creations.set(c.ip, rate);
          if (++rate.count > 12) { send(c, { type: 'notice', kind: 'error', text: 'Muitas criações de personagem. Aguarde um minuto.' }); ws.close(1008, 'Limite de criações'); return; }
        }
        const saved = msg.type === 'join' ? game.create(msg.nickname,msg.factionId&&msg.raceId&&msg.classId?{factionId:msg.factionId,raceId:msg.raceId,classId:msg.classId,appearance:msg.appearance??0}:undefined) : store.resume(msg.token);
        if (!saved) { send(c, { type: 'notice', kind: 'error', text: 'Chave inválida ou expirada. Crie um viajante ou confira sua chave.' }); ws.close(4003, 'Sessão inválida'); return; }
        const existing = owners.get(saved.id);
        if (existing) { const p = game.players.get(saved.id); if (p) store.save(game.save(p)); existing.ws.close(4001, 'Sessão aberta em outra aba'); }
        const latest = msg.type === 'resume' ? store.resume(msg.token)! : saved;
        const token = msg.type === 'join' ? store.create(saved) : msg.token;
        game.connect(latest); c.id = saved.id; owners.set(c.id, c); clearTimeout(timeout);
        send(c, { type: 'welcome', id: c.id, token, nickname: saved.nickname }); send(c, game.snapshot(c.id)); return;
      }
      if (!c.id || owners.get(c.id) !== c) { send(c, { type: 'notice', kind: 'error', text: 'Entre no mundo antes de enviar ações.' }); return; }
      if (c.accountId && (!c.leaseId || !accounts?.ownsLease(c.accountId, c.leaseId, c.id))) { send(c, { type: 'account_error', code: 'STALE_SESSION' }); ws.close(4003, 'Sessão inválida'); return; }
      if (msg.type === 'ping') { send(c, { type: 'pong', at: msg.at }); return; }
      const p = game.players.get(c.id); if (p) { game.action(p, msg); flush(); }
      } catch (error) { storageFailure(error); }
    });
    ws.on('close', () => {
      clearTimeout(timeout); connections.delete(c);
      try { leave(c); } catch (error) { storageFailure(error, 'disconnect'); if (c.accountId && c.leaseId) accounts?.release(c.accountId, c.leaseId); if (c.id) { game.disconnect(c.id); game.players.delete(c.id); owners.delete(c.id); } }
    });
  });
  const tick = setInterval(() => {
    if (storageFailed || closing) return;
    try { for (const c of connections) if (c.accountId && accounts?.authenticate(c.accountToken ?? '') !== c.accountId) c.ws.close(4003, 'Sessão inválida'); } catch (error) { storageFailure(error, 'authentication'); return; }
    try {
    game.step();
    flush();
    if (game.tick % 2 === 0) {
      const events = game.events.splice(0);
      for (const c of connections) if (c.id && owners.get(c.id) === c) send(c, game.snapshot(c.id, events));
    }
    for (const n of game.notices.splice(0)) { const c = owners.get(n.id); if (c) send(c, { type: 'notice', text: n.text, kind: n.kind }); }
    if (game.tick % 100 === 0) try { for (const id of game.players.keys()) persist(id); } catch (error) { storageFailure(error); }
    } catch (error) { fatalFailure(error, 'tick'); }
  }, 50);
  const heartbeat = setInterval(() => { if (closing) return; try { for (const c of connections) { if (!c.alive) c.ws.terminate(); else { c.alive = false; c.ws.ping(); } } } catch (error) { fatalFailure(error, 'heartbeat'); } }, 15000);
  try {
  await new Promise<void>((ok, fail) => { http.once('error', fail); http.listen(options.port ?? 8787, options.host ?? '127.0.0.1', () => { http.off('error', fail); ok(); }); });
  } catch (error) { clearInterval(tick); clearInterval(heartbeat); wss.close(); store.close(); accounts?.close(); throw error; }
  const address = http.address(); const port = typeof address === 'object' && address ? address.port : 8787;
  const closeStores = () => {
    if (storesClosed) return; storesClosed = true;
    const errors: unknown[] = [];
    try { store.close(); } catch (error) { errors.push(error); }
    try { accounts?.close(); } catch (error) { errors.push(error); }
    if (errors.length) throw new AggregateError(errors, 'Falha ao fechar armazenamento; preserve o lock e os logs.');
  };
  const emergencyClose = () => {
    closing = true; storageFailed = true; clearInterval(tick); clearInterval(heartbeat);
    for (const c of connections) try { c.ws.terminate(); } catch { /* preserve original fatal error */ }
    closeStores();
  };
  return { game, store, port, http, emergencyClose, close(closeOptions: { persist?: boolean } = {}) {
    if (closePromise) return closePromise;
    closing = true; clearInterval(tick); clearInterval(heartbeat);
    closePromise = (async () => {
      let flushError: unknown;
      if (!storageFailed && closeOptions.persist !== false) try { for (const id of game.players.keys()) persist(id); } catch (error) { flushError = error; storageFailure(error, 'shutdown_flush'); }
      // Closing callbacks must not write again, especially after a fatal error.
      storageFailed = true;
      for (const c of connections) c.ws.terminate();
      try {
        await new Promise<void>(ok => wss.close(() => ok()));
        await new Promise<void>(ok => http.close(() => ok()));
      } finally { closeStores(); }
      if (flushError) throw flushError;
    })();
    return closePromise;
  } };
}
