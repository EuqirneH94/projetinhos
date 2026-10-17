// Read-only diagnosis: NEVER deletes, renames, opens the DB or acquires a guard.
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { hostname } from 'node:os';
const input = process.argv[2];
if (!input) { console.error('Uso: node scripts/inspect-account-lock.mjs CAMINHO_DO_BANCO_DE_CONTAS'); process.exit(2); }
const absolute=resolve(input), path=existsSync(absolute)?realpathSync(absolute):resolve(realpathSync(dirname(absolute)),basename(absolute));
const result={node:process.version,platform:process.platform,lockExists:existsSync(path+'.lock'),guardExists:existsSync(path+'.guard.sqlite'),status:'NO_LOCK',action:'Inspeção não prova exclusividade nem autoriza remover arquivos.'};
if(result.lockExists) {
  try {
    const r=JSON.parse(readFileSync(path+'.lock','utf8'));
    if(r.format!=='edf-account-lock/v2'||r.host!==hostname()||r.database!==createHash('sha256').update(path).digest('hex')||!Number.isSafeInteger(r.pid)||r.pid<=0)throw new Error('Unknown');
    result.ownerPid=r.pid;
    try{process.kill(r.pid,0);result.status='OWNER_ALIVE';}
    catch(e){result.status=e.code==='ESRCH'?'V2_OWNER_DEAD_GUARD_REQUIRED':'OWNER_NOT_VERIFIABLE';}
    result.action='Somente a inicialização B1.1, com guard exclusivo e metadado validado, pode recuperar V2 comprovadamente órfão.';
  }catch{result.status='LEGACY_OR_UNKNOWN';result.action='Recuperação automática recusada. Comprove manutenção exclusiva e preserve backup/evidências conforme guia.';}
}
console.log(JSON.stringify(result,null,2));
