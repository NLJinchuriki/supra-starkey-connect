// packages/react-example-app/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    // This helps Vite resolve symlinked packages correctly
    preserveSymlinks: true,
    alias: {
      // Optional: Explicitly alias 'scheduler' if needed
      'scheduler': path.resolve(__dirname, 'node_modules/scheduler/index.js')
    },
  },
  optimizeDeps: {
    include: ['supra-starkey-connect', 'scheduler'],
  },
  build: {
    rollupOptions: {
      external: ['scheduler'], // Optionally mark 'scheduler' as external
    },
  },
});