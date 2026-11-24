import fs from 'node:fs'
import path from 'node:path'

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import solid from '@solidjs/vite-plugin'
import { defineConfig } from 'vite'

import { buildContent } from './src/lib/content-build.js'
import { escapeHtml } from './src/lib/html.js'

const VIRTUAL_ID = 'virtual:journal-content'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

function journalContent() {
  return {
    name: 'journal-content',
    enforce: 'pre',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      return `export default ${JSON.stringify(buildContent())}`
    },
  }
}

const ASSET_REQUEST = /\.[a-z0-9]+$/i

function journalDevServer() {
  return {
    name: 'journal-dev-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = (request.url ?? '/').split('?')[0]
        if (request.method !== 'GET') return next()

        try {
          const { renderApp, headScripts, pageHead } = await server.ssrLoadModule(
            '/src/entry-server.jsx',
          )

          if (pathname.startsWith('/@') || pathname.startsWith('/node_modules/')) return next()
          if (ASSET_REQUEST.test(pathname)) return next()

          const head = pageHead(pathname)
          const shell = fs.readFileSync(path.join(server.config.root, 'index.html'), 'utf8')
          const html = await server.transformIndexHtml(
            pathname,
            shell
              .replace('<div id="app"></div>', `<div id="app">${renderApp(pathname)}</div>`)
              .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(head.title)}</title>`)
              .replace(
                '<meta name="theme-color"',
                `<meta name="description" content="${escapeHtml(head.description)}">\n    <meta name="theme-color"`,
              )
              .replace('</head>', `${headScripts()}</head>`),
          )

          response.setHeader('content-type', 'text/html')
          response.end(html)
        } catch (error) {
          server.ssrFixStacktrace(error)
          next(error)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [journalContent(), journalDevServer(), solid({ ssr: true }), vanillaExtractPlugin()],
  optimizeDeps: {
    exclude: ['@ui-sdk/core'],
  },
  build: {
    outDir: '.output/public',
  },
  server: {
    host: '127.0.0.1',
    port: 8000,
    watch: { ignored: ['**/.output/**'] },
  },
})
