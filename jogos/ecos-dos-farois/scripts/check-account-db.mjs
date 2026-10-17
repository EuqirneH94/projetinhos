import {DatabaseSync} from 'node:sqlite';
if(!process.argv[2]){console.error('Uso: node scripts/check-account-db.mjs CAMINHO_DO_BANCO');process.exit(2);}
const db=new DatabaseSync(process.argv[2],{readOnly:true});
try {
  if(db.prepare('PRAGMA application_id').get().application_id!==0x45444631||db.prepare('PRAGMA user_version').get().user_version!==1)throw new Error('Não é banco de contas B1 reconhecido.');
  const integrity=db.prepare('PRAGMA integrity_check').all(),foreignKeys=db.prepare('PRAGMA foreign_key_check').all();
  const result={integrity:integrity.map(r=>r.integrity_check),foreignKeyErrors:foreignKeys.length,
    accounts:db.prepare('SELECT count(*) AS n FROM accounts').get().n,
    characters:db.prepare('SELECT count(*) AS n FROM characters').get().n};
  console.log(JSON.stringify(result,null,2));
  if(result.integrity.length!==1||result.integrity[0]!=='ok'||foreignKeys.length)process.exitCode=1;
}finally{db.close();}
