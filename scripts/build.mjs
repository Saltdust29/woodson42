import fs from 'node:fs'
import path from 'node:path'

import { build } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUTPUT = path.join(ROOT, '.output')
const PUBLIC_DIR = path.join(OUTPUT, 'public')
const SERVER_DIR = path.join(OUTPUT, 'server')

await build({ root: ROOT, logLevel: 'warn' })
await build({
  root: ROOT,
  logLevel: 'warn',
  build: {
    ssr: path.join(ROOT, 'src', 'entry-server.jsx'),
    outDir: SERVER_DIR,
    emptyOutDir: true,
  },
})

const serverEntry = fs
  .readdirSync(SERVER_DIR)
  .find((file) => file.startsWith('entry-server') && file.endsWith('.js'))
if (!serverEntry) throw new Error(`no server entry in ${SERVER_DIR}`)

const { render, prerenderPaths } = await import(
  `${path.join(SERVER_DIR, serverEntry)}?t=${Date.now()}`
)

const shell = fs.readFileSync(path.join(PUBLIC_DIR, 'index.html'), 'utf8')
const assets = {
  scripts: [...shell.matchAll(/<script[^>]*type="module"[^>]*src="([^"]+)"/g)].map((match) => match[1]),
  styles: [...shell.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(
    (match) => match[1],
  ),
}
if (!assets.scripts.length) throw new Error('the built index.html has no client entry script')

for (const pathname of prerenderPaths()) {
  const file =
    pathname === '/404/'
      ? path.join(PUBLIC_DIR, '404.html')
      : path.join(PUBLIC_DIR, pathname, 'index.html')

  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, render(pathname, assets))
  console.log(`prerendered ${pathname}`)
}
