import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { before, describe, test } from 'node:test'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUTPUT = path.join(ROOT, '.output', 'public')

const ARTICLES = [
  'reality-is-but-an-illusion',
  'the-quiet-work-of-attention',
  'making-things-that-last',
]

before(() => {
  if (process.env.SKIP_BUILD === '1') return
  execSync('pnpm build', { cwd: ROOT, stdio: 'inherit' })
})

function read(file) {
  return fs.readFileSync(path.join(OUTPUT, file), 'utf8')
}

function assets(extension) {
  const directory = path.join(OUTPUT, '_build', 'assets')
  return fs.readdirSync(directory).filter((file) => file.endsWith(extension))
}

describe('generated site', () => {
  test('homepage is prerendered with SolidStart assets', () => {
    const index = read('index.html')

    assert.match(index, /Reality is but/)
    assert.match(index, /Latest dispatches/)
    assert.match(index, /Skip to the journal/)
    assert.match(index, /type="module"/)
    assert.match(index, /fonts\.googleapis\.com/)
    assert.match(index, /Reality Is But an Illusion/)
    assert.doesNotMatch(index, /id="vue-tools"/)

    assert.ok(assets('.js').length > 0, 'expected a JavaScript bundle')
    assert.ok(assets('.css').length > 0, 'expected a stylesheet')
  })

  test('article, archive, colophon and 404 pages are generated', () => {
    const article = read('journal/2026/reality-is-but-an-illusion/index.html')
    const archive = read('archive/index.html')
    const colophon = read('about/index.html')
    const notFound = read('404.html')

    assert.match(article, /End of dispatch/)
    assert.match(article, /Reality Is But an Illusion/)
    assert.match(archive, /Making Things That Last/)
    assert.match(colophon, /SolidStart/)
    assert.match(notFound, /Page not found/)
  })

  test('search index is valid and complete', () => {
    const entries = JSON.parse(read('search.json'))

    assert.equal(entries.length, 3)
    assert.deepEqual(
      new Set(entries.map((entry) => entry.title)),
      new Set([
        'Reality Is But an Illusion',
        'The Quiet Work of Attention',
        'Making Things That Last',
      ]),
    )
    assert.ok(entries.every((entry) => entry.url.startsWith('/journal/2026/')))
    assert.ok(entries.every((entry) => !Number.isNaN(Date.parse(entry.date))))
  })

  test('custom domain is preserved', () => {
    assert.equal(read('CNAME').trim(), 'woodson42.com')
  })

  test('every generated internal link resolves', () => {
    const failures = []
    const htmlFiles = fs
      .readdirSync(OUTPUT, { recursive: true })
      .filter((file) => file.endsWith('.html'))

    for (const file of htmlFiles) {
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

  test('output no longer depends on Pelican, Vue or the dev server', () => {
    const htmlFiles = fs
      .readdirSync(OUTPUT, { recursive: true })
      .filter((file) => file.endsWith('.html'))

    for (const file of htmlFiles) {
      const html = read(file)
      assert.doesNotMatch(html, /127\.0\.0\.1:5173/, `${file} still references the Vite dev server`)
      assert.doesNotMatch(html, /Pelican/, `${file} still references Pelican`)
      assert.doesNotMatch(html, /Vue Vapor/, `${file} still references Vue Vapor`)
    }
  })

  test('every expected route is prerendered', () => {
    const expected = [
      'index.html',
      'archive/index.html',
      'about/index.html',
      'search.json',
      '404.html',
      'CNAME',
      ...ARTICLES.map((slug) => `journal/2026/${slug}/index.html`),
      'section/field-notes/index.html',
      'section/journal/index.html',
      'section/workshop/index.html',
      'topic/attention/index.html',
      'topic/beginnings/index.html',
      'topic/craft/index.html',
      'topic/perception/index.html',
      'topic/software/index.html',
      'topic/systems/index.html',
    ]

    for (const file of expected) {
      assert.ok(fs.existsSync(path.join(OUTPUT, file)), `missing ${file}`)
    }
  })
})
