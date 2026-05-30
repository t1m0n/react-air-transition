import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [
        process.env.ANALYZE
          ? visualizer({
              open: true,
            })
          : undefined,
      ],
      external: ['react', 'react/jsx-runtime', 'react-dom', 'animejs', /^react-transition-group(\/.*)?$/],
      output: {
        globals: {
          react: 'react',
        },
        format: 'esm',
      },
    },
  },
});
