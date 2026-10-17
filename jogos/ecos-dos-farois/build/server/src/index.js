import { DatabaseSync } from 'node:sqlite';
import { AccountStore } from './accounts.js';
import { resolve } from 'node:path';
import { existsSync, realpathSync } from 'node:fs';
import { createGameServer } from './server.js';
import { Store } from './store.js';
import { diagnostic } from './diagnostics.js';
let accounts, store;
let server;
let ending = false;
const emergencyClose = () => {
    if (server)
        server.emergencyClose();
    else {
        try {
            store?.close();
        }
        finally {
            accounts?.close();
        }
    }
};
async function shutdown(code, phase, error) {
    if (ending)
        return;
    ending = true;
    process.exitCode = code;
    diagnostic('server_shutdown_begin', error, { phase, exitCode: code });
    const deadline = setTimeout(() => {
        diagnostic('server_shutdown_timeout', undefined, { phase, exitCode: 1 });
        try {
            emergencyClose();
        }
        catch (cleanup) {
            diagnostic('server_cleanup_failed', cleanup);
        }
        process.exit(1);
    }, 5000);
    try {
        if (server)
            await server.close({ persist: code === 0 });
        else
            emergencyClose();
    }
    catch (cleanup) {
        code = 1;
        diagnostic('server_cleanup_failed', cleanup);
    }
    clearTimeout(deadline);
    diagnostic('server_shutdown_complete', undefined, { phase, exitCode: code });
    process.exit(code);
}
process.on('SIGINT', () => { void shutdown(0, 'SIGINT'); });
process.on('SIGTERM', () => { void shutdown(0, 'SIGTERM'); });
process.on('uncaughtException', error => { void shutdown(1, 'uncaughtException', error); });
process.on('unhandledRejection', error => { void shutdown(1, 'unhandledRejection', error); });
process.on('exit', () => { try {
    emergencyClose();
}
catch (error) {
    diagnostic('server_exit_cleanup_failed', error);
} });
try {
    const port = Number(process.env.PORT ?? 8787);
    if (!Number.isInteger(port) || port < 1 || port > 65535)
        throw new Error('PORT inválida.');
    const dbPath = process.env.DB_PATH ?? 'data/reinos.sqlite', accountPath = process.env.ACCOUNTS_DB_PATH;
    const canonical = (p) => existsSync(p) ? realpathSync(p) : resolve(p);
    if (accountPath && canonical(accountPath) === canonical(dbPath))
        throw new Error('Contas e saves legados exigem bancos separados.');
    // Validate the legacy path read-only before either initializer can write to it.
    if (existsSync(dbPath)) {
        const check = new DatabaseSync(dbPath, { readOnly: true });
        try {
            if (check.prepare('PRAGMA application_id').get().application_id !== 0)
                throw new Error('DB_PATH não é um banco legado do protótipo; nenhum dado foi convertido.');
        }
        finally {
            check.close();
        }
    }
    accounts = accountPath ? new AccountStore(accountPath) : undefined;
    store = new Store(dbPath);
    server = await createGameServer({ port, host: process.env.HOST ?? '127.0.0.1', store, accounts,
        onFatal: (error, phase) => { void shutdown(1, phase, error); } });
    diagnostic('server_ready', undefined, { port: server.port, accountsEnabled: !!accounts });
    console.log(`Ecos dos Faróis • servidor em http://${process.env.HOST ?? '127.0.0.1'}:${server.port}`);
}
catch (error) {
    await shutdown(1, 'startup', error);
}
//# sourceMappingURL=index.js.map