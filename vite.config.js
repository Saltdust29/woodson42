import { solidStart } from '@solidjs/start/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

import { buildContent } from './src/lib/content-build.js'
import { contentRoutes } from './src/lib/content-manifest.js'

const VIRTUAL_ID = 'virtual:journal-content'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

function journalContent() {
  return {
    name: 'journal-content',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      return `export default ${JSON.stringify(buildContent())}`
    },
  }
}

export default defineConfig({
  plugins: [journalContent(), solidStart(), vanillaExtractPlugin(), nitro()],
  server: {
    host: '127.0.0.1',
    watch: { ignored: ['**/.output/**'] },
  },
  nitro: {
    preset: 'github_pages',
    prerender: {
      routes: ['/', '/archive/', '/404', '/search.json', ...contentRoutes()],
      crawlLinks: true,
      failOnError: true,
    },
  },
})
