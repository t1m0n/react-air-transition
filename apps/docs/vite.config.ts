import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.GITHUB_PAGES === 'true' ? '/react-air-transition/' : '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'react-air-transition': path.resolve(
        root,
        '../../packages/react-air-transition/src/index.ts',
      ),
    },
  },
});
