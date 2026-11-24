import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { before, describe, test } from 'node:test'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUTPUT = path.join(ROOT, '.output', 'public')

before(() => {
  if (process.env.SKIP_BUILD === '1') return
  execSync('pnpm build', { cwd: ROOT, stdio: 'inherit' })
})

function read(file) {
  return fs.readFileSync(path.join(OUTPUT, file), 'utf8')
}

function htmlFiles() {
  return fs
    .readdirSync(OUTPUT, { recursive: true })
    .filter((file) => file.endsWith('.html'))
}

describe('generated site', () => {
  test('the homepage is one prerendered banner', () => {
    const index = read('index.html')

    assert.match(index, /Reality is but/)
    assert.match(index, /an illusion\./)
    assert.match(index, /Notes from the edge of the ordinary/)
    assert.match(index, /Skip to the journal/)
    assert.match(index, /fonts\.googleapis\.com/)
    assert.match(index, /<title>woodson42 — Reality is but an illusion<\/title>/)

    assert.doesNotMatch(index, /Latest dispatches/)
    assert.doesNotMatch(index, /story-row/)
    assert.doesNotMatch(index, /\/archive\//)
    assert.doesNotMatch(index, /\/journal\//)
    assert.doesNotMatch(index, /data-slot="dialog-trigger"/)
  })

  test('the page is hydratable', () => {
    const index = read('index.html')

    assert.match(index, /_hk=/)
    assert.match(index, /window\._\$HY/)

    const scripts = index.match(/<script[^>]*type="module"[^>]*>/g) ?? []
    assert.ok(scripts.length > 0, 'expected a client entry script')

    const stylesheets = index.match(/<link[^>]*rel="stylesheet"[^>]*>/g) ?? []
    assert.ok(
      stylesheets.some((tag) => tag.includes('/assets/')),
      'expected the compiled stylesheet',
    )
  })

  test('the reading theme uses Vercel UI SDK parts', () => {
    const index = read('index.html')

    assert.match(index, /data-slot="toggle"/)
    assert.match(index, /data-slot="toggle-icon"/)
    assert.match(index, /data-slot="preferences"/)
    assert.match(index, /data-theme/)
  })

  test('colophon and 404 are the only other pages', () => {
    const colophon = read('about/index.html')
    const notFound = read('404.html')

    assert.match(colophon, /Vercel UI SDK/)
    assert.match(colophon, /<title>Colophon — woodson42<\/title>/)
    assert.match(notFound, /Page not found/)
    assert.match(notFound, /noindex/)
  })

  test('custom domain is preserved', () => {
    assert.equal(read('CNAME').trim(), 'woodson42.com')
  })

  test('every generated internal link resolves', () => {
    const failures = []

    for (const file of htmlFiles()) {
      const pageUrl = `/${file.split(path.sep).join('/')}`
      const html = read(file)
      const targets = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1])

      for (const target of targets) {
        if (/^(#|https?:|mailto:|data:)/.test(target)) continue

        let resolved = decodeURIComponent(new URL(target, `http://site${pageUrl}`).pathname).replace(
          /^\//,
          '',
        )
        if (resolved === '' || resolved.endsWith('/')) resolved += 'index.html'

        if (!fs.existsSync(path.join(OUTPUT, resolved))) {
          failures.push(`${file} -> ${target}`)
        }
      }
    }

    assert.deepEqual(failures, [], `Broken internal links:\n${failures.join('\n')}`)
  })

  test('output no longer depends on SolidStart, Pelican, Vue or the dev server', () => {
    for (const file of htmlFiles()) {
      const html = read(file)
      assert.doesNotMatch(html, /127\.0\.0\.1:(5173|8000)/, `${file} still references a dev server`)
      assert.doesNotMatch(html, /Pelican/, `${file} still references Pelican`)
      assert.doesNotMatch(html, /Vue Vapor/, `${file} still references Vue Vapor`)
      assert.doesNotMatch(html, /@solidjs\/start/, `${file} still references SolidStart`)
    }
  })

  test('only the banner, colophon and 404 are written', () => {
    const expected = ['index.html', 'about/index.html', '404.html', 'CNAME']

    for (const file of expected) {
      assert.ok(fs.existsSync(path.join(OUTPUT, file)), `missing ${file}`)
    }

    for (const removed of ['search.json', 'archive', 'journal', 'section', 'topic']) {
      assert.ok(
        !fs.existsSync(path.join(OUTPUT, removed)),
        `${removed} should no longer be generated`,
      )
    }

    assert.equal(htmlFiles().length, 3)
  })
})
