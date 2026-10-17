import { AccountLock } from './account-lock.js';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { CLASS_IDS, validFactionRace, validNickname } from '../../shared/identity.js';
import { Game } from './game.js';
const APP_ID = 0x45444631, TTL = 30 * 24 * 60 * 60 * 1000;
const hash = (token) => createHash('sha256').update(token).digest('hex');
export class AccountError extends Error {
    code;
    constructor(code) {
        super(code);
        this.code = code;
    }
}
const info = (r) => ({ id: r.id, nickname: r.nickname, slot: r.slot, factionId: r.faction_id, raceId: r.race_id, classId: r.class_id, mode: 'prototype' });
/** Independent schema; NEVER migrates a legacy Store database. One process per file. */
export class AccountStore {
    now;
    db;
    lock;
    leases = new Map();
    closed = false;
    allowClassSelection = true;
    constructor(path = ':memory:', now = () => Date.now()) {
        this.now = now;
        if (path !== ':memory:') {
            path = resolve(path);
            mkdirSync(dirname(path), { recursive: true });
            path = existsSync(path) ? realpathSync(path) : resolve(realpathSync(dirname(path)), basename(path));
            if (existsSync(path) && statSync(path).nlink > 1)
                throw new Error('Banco com hardlink não é suportado; use um único caminho físico.');
            this.lock = new AccountLock(path);
        }
        try {
            if (path !== ':memory:' && existsSync(path)) {
                const check = new DatabaseSync(path, { readOnly: true });
                try {
                    if (check.prepare('PRAGMA application_id').get().application_id !== APP_ID || check.prepare('PRAGMA user_version').get().user_version !== 1)
                        throw new Error('Arquivo não reconhecido como banco de contas B1; nenhuma migração foi realizada.');
                }
                finally {
                    check.close();
                }
            }
            this.db = new DatabaseSync(path);
            try {
                this.db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=3000;');
                this.db.exec(`BEGIN IMMEDIATE;
          CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY, created_at INTEGER NOT NULL) STRICT;
          CREATE TABLE IF NOT EXISTS account_tokens(token_hash TEXT PRIMARY KEY CHECK(length(token_hash)=64), account_id TEXT NOT NULL REFERENCES accounts(id), expires_at INTEGER NOT NULL) STRICT;
          CREATE TABLE IF NOT EXISTS characters(
            id TEXT PRIMARY KEY, account_id TEXT NOT NULL REFERENCES accounts(id),
            nickname TEXT NOT NULL, slot INTEGER NOT NULL CHECK(slot BETWEEN 1 AND 8),
            faction_id TEXT NOT NULL CHECK(faction_id IN ('vigilia','confluencia')),
            race_id TEXT NOT NULL,
            class_id TEXT NOT NULL CHECK(class_id IN ('sentinela','arcanista','errante','ressonante')),
            body TEXT NOT NULL CHECK(json_valid(body)),
            UNIQUE(account_id,slot),
            CHECK((faction_id='vigilia' AND race_id IN ('valdarios','kordranios')) OR
                  (faction_id='confluencia' AND race_id IN ('eluvios','naquiros')))
          ) STRICT;
          PRAGMA application_id=${APP_ID}; PRAGMA user_version=1; COMMIT;`);
            }
            catch (error) {
                this.db.close();
                throw error;
            }
        }
        catch (error) {
            this.lock?.release();
            throw error;
        }
    }
    provision(deliver) {
        const accountId = randomUUID(), token = randomBytes(32).toString('base64url');
        this.db.exec('BEGIN IMMEDIATE');
        try {
            this.db.prepare('INSERT INTO accounts VALUES(?,?)').run(accountId, this.now());
            this.db.prepare('INSERT INTO account_tokens VALUES(?,?,?)').run(hash(token), accountId, this.now() + TTL);
            deliver?.({ accountId, token });
            this.db.exec('COMMIT');
        }
        catch (error) {
            this.db.exec('ROLLBACK');
            throw error;
        }
        return { accountId, token };
    }
    authenticate(token) {
        if (!/^[A-Za-z0-9_-]{43}$/.test(token))
            return;
        return this.db.prepare('SELECT account_id FROM account_tokens WHERE token_hash=? AND expires_at>?').get(hash(token), this.now())?.account_id;
    }
    list(accountId) {
        return this.db.prepare('SELECT * FROM characters WHERE account_id=? ORDER BY slot').all(accountId).map(info);
    }
    create(accountId, input) {
        if (!validNickname(input.nickname) || !validFactionRace(input.factionId, input.raceId))
            throw new AccountError('INVALID_CHARACTER');
        if (!CLASS_IDS.includes(input.classId))
            throw new AccountError('CLASS_NOT_APPROVED');
        this.db.exec('BEGIN IMMEDIATE');
        try {
            if (!this.db.prepare('SELECT id FROM accounts WHERE id=?').get(accountId))
                throw new AccountError('UNAUTHORIZED');
            const used = new Set(this.list(accountId).map(c => c.slot));
            const slot = [1, 2, 3, 4, 5, 6, 7, 8].find(n => !used.has(n));
            if (!slot)
                throw new AccountError('CHARACTER_LIMIT');
            // Kits experimentais da Alpha; metadados e elegibilidade continuam validados.
            const p = new Game().create(input.nickname, { factionId: input.factionId, raceId: input.raceId, classId: input.classId, appearance: 0 });
            this.db.prepare('INSERT INTO characters VALUES(?,?,?,?,?,?,?,?)').run(p.id, accountId, input.nickname, slot, input.factionId, input.raceId, input.classId, JSON.stringify(p));
            this.db.exec('COMMIT');
            return { id: p.id, nickname: input.nickname, slot, factionId: input.factionId, raceId: input.raceId, classId: input.classId, mode: 'prototype' };
        }
        catch (error) {
            this.db.exec('ROLLBACK');
            throw error;
        }
    }
    owned(accountId, characterId) {
        const r = this.db.prepare('SELECT * FROM characters WHERE id=? AND account_id=?').get(characterId, accountId);
        if (!r)
            throw new AccountError('CHARACTER_NOT_FOUND');
        return r;
    }
    acquire(accountId, characterId) {
        const row = this.owned(accountId, characterId);
        if (this.leases.has(accountId))
            throw new AccountError('ACCOUNT_IN_USE');
        const p = JSON.parse(row.body);
        if (p.id !== row.id || p.nickname !== row.nickname || !Number.isFinite(p.x) || !Number.isFinite(p.z) || !Number.isInteger(p.level) || p.level < 1 || p.level > 5 || !Array.isArray(p.inventory))
            throw new Error('Save de personagem inválido.');
        const leaseId = randomUUID();
        this.leases.set(accountId, { id: leaseId, characterId });
        return { leaseId, character: info(row), save: p };
    }
    ownsLease(accountId, leaseId, characterId) {
        const lease = this.leases.get(accountId);
        return !!lease && lease.id === leaseId && lease.characterId === characterId;
    }
    save(accountId, leaseId, p) {
        if (!this.ownsLease(accountId, leaseId, p.id))
            throw new AccountError('STALE_SESSION');
        const row = this.owned(accountId, p.id);
        if (p.nickname !== row.nickname)
            throw new AccountError('INVALID_CHARACTER');
        this.db.prepare('UPDATE characters SET body=? WHERE id=? AND account_id=?').run(JSON.stringify(p), p.id, accountId);
    }
    release(accountId, leaseId) {
        if (this.leases.get(accountId)?.id === leaseId)
            this.leases.delete(accountId);
    }
    close() {
        if (this.closed)
            return;
        this.db.close();
        this.closed = true;
        this.leases.clear();
        this.lock?.release();
    }
}
//# sourceMappingURL=accounts.js.map