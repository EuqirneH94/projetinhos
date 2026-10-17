import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
export const digest = (token) => createHash('sha256').update(token).digest('hex');
const SESSION_TTL = 30 * 24 * 60 * 60 * 1000;
/** Um banco por processo. Nunca abra o mesmo arquivo em duas instâncias de mundo. */
export class Store {
    now;
    db;
    put;
    get;
    extend;
    insertSession;
    constructor(path = ':memory:', now = () => Date.now()) {
        this.now = now;
        if (path !== ':memory:') {
            path = resolve(path);
            mkdirSync(dirname(path), { recursive: true });
        }
        this.db = new DatabaseSync(path);
        this.db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 3000;');
        const version = this.db.prepare('PRAGMA user_version').get();
        if (version.user_version > 1) {
            this.db.close();
            throw new Error('Banco de uma versão mais nova. Faça backup e use a versão correta do jogo.');
        }
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        nickname TEXT NOT NULL,
        body TEXT NOT NULL CHECK(json_valid(body)),
        updated_at INTEGER NOT NULL
      ) STRICT;
      CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT PRIMARY KEY CHECK(length(token_hash) = 64),
        player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
        expires_at INTEGER NOT NULL
      ) STRICT;
      CREATE INDEX IF NOT EXISTS sessions_expiration ON sessions(expires_at);
      PRAGMA user_version = 1;
    `);
        this.db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(this.now());
        this.put = this.db.prepare('INSERT INTO players(id,nickname,body,updated_at) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET nickname=excluded.nickname,body=excluded.body,updated_at=excluded.updated_at');
        this.get = this.db.prepare('SELECT players.id,players.body FROM sessions JOIN players ON players.id=sessions.player_id WHERE sessions.token_hash=? AND sessions.expires_at>?');
        this.extend = this.db.prepare('UPDATE sessions SET expires_at=? WHERE token_hash=?');
        this.insertSession = this.db.prepare('INSERT INTO sessions(token_hash,player_id,expires_at) VALUES(?,?,?)');
    }
    save(p) { this.put.run(p.id, p.nickname, JSON.stringify(p), this.now()); }
    create(p) {
        const token = randomBytes(32).toString('base64url');
        this.db.exec('BEGIN IMMEDIATE');
        try {
            this.save(p);
            this.insertSession.run(digest(token), p.id, this.now() + SESSION_TTL);
            this.db.exec('COMMIT');
        }
        catch (error) {
            this.db.exec('ROLLBACK');
            throw error;
        }
        return token;
    }
    resume(token) {
        const hash = digest(token), row = this.get.get(hash, this.now());
        if (!row)
            return;
        const p = JSON.parse(row.body);
        if (p.id !== row.id || !Number.isFinite(p.x) || !Number.isFinite(p.z) || !Number.isInteger(p.level) || p.level < 1 || p.level > 5 || !Array.isArray(p.inventory))
            throw new Error('Progresso inválido no banco. Restaure um backup antes de continuar.');
        this.extend.run(this.now() + SESSION_TTL, hash);
        return p;
    }
    close() { this.db.close(); }
}
//# sourceMappingURL=store.js.map