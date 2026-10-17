import { existsSync } from 'node:fs';
const [major, minor] = process.versions.node.split('.').map(Number);
console.log(`Node: ${process.version} | Sistema: ${process.platform} | Pasta: ${process.cwd()}`);
if (major !== 24 || minor < 13) { console.error('Use Node.js 24 LTS, versão 24.13 ou superior da linha 24. Feche e reabra o PowerShell após instalar.'); process.exit(1); }
if (!existsSync('client/src/main.ts') || !existsSync('server/src/index.ts')) { console.error('Abra o PowerShell na raiz reinos-de-nexo, onde está package.json.'); process.exit(1); }
await import('node:sqlite');
console.log('SQLite integrado disponível. Não é necessário instalar MySQL ou iniciar o XAMPP.');
console.log(existsSync('node_modules') ? 'Dependências presentes.' : 'Próximo comando: npm.cmd ci');
console.log('Para iniciar: npm.cmd run dev | No navegador: http://localhost:5173');
