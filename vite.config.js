import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
      outDir: 'dist'
    },
    test: {
     environment: 'jsdom',
     setupFiles: './vitest.setup.js',
     css: true,
     globals: true
    }
})
