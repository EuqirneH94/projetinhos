import { defineConfig } from 'vite';
export default defineConfig({
  root: 'client',
  server: { host: '127.0.0.1', port: 5173, strictPort: true,
    proxy: { '/ws': { target: 'ws://127.0.0.1:8787', ws: true }, '/health': 'http://127.0.0.1:8787' } },
  build: { outDir: 'dist', emptyOutDir: true, target: 'es2022', rollupOptions: { input: { main: 'client/index.html', accounts: 'client/accounts.html' } } }
});
