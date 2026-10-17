import { writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { AccountStore } from '../server/src/accounts.js';
const [command, dbPath, credentialPath] = process.argv.slice(2);
if (command !== 'create' || !dbPath || !credentialPath) throw new Error('Uso: node --import tsx scripts/account-admin.ts create CAMINHO_DB_NOVO ARQUIVO_CREDENCIAL_NOVO');
if (resolve(dbPath) === resolve(credentialPath) || existsSync(credentialPath)) throw new Error('Arquivo de credencial deve ser novo e distinto do banco.');
const store = new AccountStore(dbPath);
try {
  let delivered = false;
  try {
    store.provision(credential => { writeFileSync(credentialPath, JSON.stringify(credential), { flag: 'wx', mode: 0o600 }); delivered = true; });
  } catch (error) { if (delivered) unlinkSync(credentialPath); throw error; }
  console.log('Conta de teste provisionada. Credencial gravada no arquivo privado indicado; não compartilhe esse arquivo.');
} finally { store.close(); }
