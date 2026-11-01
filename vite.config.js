import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    cors: {
      origin: `http://127.0.0.1:${process.env.PELICAN_PORT || '8000'}`,
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./theme/static/dist', import.meta.url)),
    emptyOutDir: true,
    manifest: true,
    rolldownOptions: {
      input: fileURLToPath(new URL('./frontend/main.js', import.meta.url)),
    },
  },
})
