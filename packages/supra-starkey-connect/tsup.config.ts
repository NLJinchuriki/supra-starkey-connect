import { defineConfig } from 'tsup'

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
    dts: false, // No type declarations for IIFE
    clean: true,
    target: 'esnext',
    minify: false,
    splitting: false,
    outExtension({ format }) {
      if (format === 'iife') return { js: '.iife.js' }
      return { js: '.js' }
    }
  }
])
