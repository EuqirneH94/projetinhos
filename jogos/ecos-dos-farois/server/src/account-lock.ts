import { DatabaseSync } from 'node:sqlite';
import { createHash, randomUUID } from 'node:crypto';
import { hostname } from 'node:os';
import { readFileSync, writeFileSync, existsSync, renameSync, unlinkSync } from 'node:fs';
export class AccountLockError extends Error {
  constructor(readonly code: string, message: string) { super(message); this.name = 'AccountLockError'; }
}
type RecordV2 = { format: 'edf-account-lock/v2'; pid: number; host: string; nonce: string; database: string; createdAt: string };
const identity = (path: string) => createHash('sha256').update(path).digest('hex');
export function ownerState(pid: number): 'alive' | 'dead' | 'unknown' {
  try { process.kill(pid, 0); return 'alive'; }
  catch (e) { return (e as NodeJS.ErrnoException).code === 'ESRCH' ? 'dead' : 'unknown'; }
}
function record(path: string, dbPath: string): RecordV2 {
  let r: RecordV2;
  try { r = JSON.parse(readFileSync(path, 'utf8')); } catch { throw new AccountLockError('LEGACY_OR_UNKNOWN_LOCK', 'Lock vazio/antigo/inválido: recuperação automática recusada; preserve e comprove manutenção exclusiva.'); }
  if (!r || r.format !== 'edf-account-lock/v2' || !Number.isSafeInteger(r.pid) || r.pid <= 0 || r.host !== hostname() || r.database !== identity(dbPath) || !/^[a-f0-9-]{36}$/.test(r.nonce) || typeof r.createdAt !== 'string') throw new AccountLockError('UNKNOWN_LOCK_OWNER', 'Proprietário/protocolo do lock não reconhecido; nenhuma remoção realizada.');
  return r;
}
/** Hold the OS-released SQLite guard for the ENTIRE data connection lifetime. */
export class AccountLock {
  private guard: DatabaseSync;
  private nonce = randomUUID();
  private released = false;
  readonly path: string;
  constructor(readonly databasePath: string) {
    this.path = databasePath + '.lock';
    this.guard = new DatabaseSync(databasePath + '.guard.sqlite');
    try { this.guard.exec('PRAGMA busy_timeout=0; BEGIN EXCLUSIVE;'); }
    catch (error) { this.guard.close(); throw new AccountLockError('ACCOUNT_WRITER_ACTIVE', 'Guard exclusivo indisponível; outro escritor ou recuperação está ativo.'); }
    try {
      if (existsSync(this.path)) {
        const old = record(this.path, databasePath);
        if (ownerState(old.pid) !== 'dead') throw new AccountLockError('LOCK_OWNER_NOT_PROVEN_DEAD', `PID ${old.pid} vivo ou não verificável; lock preservado.`);
        // Guard held: no conforming writer/recovery can replace this record.
        const archived = this.path + '.orphan-' + old.nonce;
        if (existsSync(archived)) throw new AccountLockError('RECOVERY_ARCHIVE_EXISTS', 'Arquivo de recuperação já existe; preserve evidências e investigue.');
        renameSync(this.path, archived);
        console.error(JSON.stringify({ event: 'account_lock_orphan_isolated', pid: process.pid, oldPid: old.pid, nonce: old.nonce }));
      }
      const r: RecordV2 = { format: 'edf-account-lock/v2', pid: process.pid, host: hostname(), nonce: this.nonce, database: identity(databasePath), createdAt: new Date().toISOString() };
      writeFileSync(this.path, JSON.stringify(r), { flag: 'wx', mode: 0o600 });
    } catch (error) { this.guard.close(); throw error; }
  }
  release() {
    if (this.released) return;
    try {
      if (existsSync(this.path)) {
        if (record(this.path, this.databasePath).nonce !== this.nonce) throw new AccountLockError('LOCK_REPLACED', 'Lock foi substituído; não remover metadado de outro proprietário.');
        unlinkSync(this.path);
      }
    } finally { this.released = true; this.guard.close(); }
  }
}
