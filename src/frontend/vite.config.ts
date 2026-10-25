import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: '../src/app/static',
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: { main: path.resolve(__dirname, 'src/main.ts') },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: asset => (
          asset.name?.endsWith('.css') ? 'assets/main.css' : 'assets/[name]-[hash][extname]'
        ),
      },
    },
  },
})
