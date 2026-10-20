import { resolve } from 'node:path';
import { AccountStore } from '../server/src/accounts.js';

/**
 * Local development only. Provision a single new account in the same isolated
 * database used by the game server. Never paste the printed credential into chat.
 * Run with the server STOPPED (AccountStore enforces the single-writer lock).
 */
const dbPath = process.env.ACCOUNTS_DB_PATH?.trim();
if (!dbPath || dbPath === ':memory:') {
  console.error('Defina ACCOUNTS_DB_PATH com o caminho do banco de contas local antes de executar.');
  process.exitCode = 2;
} else if (process.env.NODE_ENV === 'production') {
  console.error('Provisionamento local bloqueado em NODE_ENV=production.');
  process.exitCode = 2;
} else {
  let store: AccountStore | undefined;
  try {
    store = new AccountStore(resolve(dbPath));
    const { token } = store.provision();
    // Credential is shown only on this terminal, never written to a log/file by us.
    process.stdout.write('\nCONTA_LOCAL_CRIADA\n');
    process.stdout.write('Guarde esta chave em local privado. Nao a envie em capturas ou conversas.\n');
    process.stdout.write('CHAVE_PRIVADA=' + token + '\n');
    process.stdout.write('Acesse http://localhost:5173/accounts.html depois de iniciar o servidor.\n');
  } catch (error) {
    console.error('Nao foi possivel criar a conta. Pare o servidor e confira o caminho do banco.', error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  } finally {
    store?.close();
  }
}
