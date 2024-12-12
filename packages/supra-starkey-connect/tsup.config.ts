import { defineConfig } from 'tsup'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig([
  // ESM and CJS Build Configuration
  {
    entry: ['lib/ssc.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    sourcemap: true,
    dts: true,
    clean: true,
    target: 'esnext',
    minify: false,
    splitting: true,
    outExtension({ format }) {
      if (format === 'esm') return { js: '.esm.js' }
      if (format === 'cjs') return { js: '.cjs.js' }
      return { js: '.js' }
    }
  },
  // IIFE Build Configuration
  {
    entry: ['lib/browser.ts'],
    outDir: 'dist',
    format: ['iife'],
    sourcemap: true,
    dts: false,
    clean: true,
    target: 'esnext',
    minify: false,
    splitting: false,
    esbuildPlugins: [
      NodeGlobalsPolyfillPlugin({
        process: true, // Polyfill `process`
        buffer: true // Polyfill `Buffer`
      }),
      NodeModulesPolyfillPlugin() // Polyfill Node.js modules like `Buffer`
    ],
    define: {
      global: 'window' // Define `global` as `window` for browsers
    },
    outExtension({ format }) {
      if (format === 'iife') return { js: '.iife.js' }
      return { js: '.js' }
    }
  }
])
