import { contentPaths, findPage } from './lib/content.js'

const NOT_FOUND = { name: 'notFound', params: {}, data: null }

const PATTERNS = [
  { name: 'home', segments: [] },
  { name: 'page', segments: [':page'] },
]

function resolve(name, params) {
  if (name === 'home') return { name, params, data: null }

  const page = findPage(params.page)
  return page ? { name, params, data: page } : NOT_FOUND
}

export function matchRoute(pathname) {
  const segments = pathname.split('/').filter(Boolean)

  for (const pattern of PATTERNS) {
    if (pattern.segments.length !== segments.length) continue

    const params = {}
    let matched = true

    for (let index = 0; index < segments.length; index += 1) {
      const expected = pattern.segments[index]
      if (expected.startsWith(':')) {
        try {
          params[expected.slice(1)] = decodeURIComponent(segments[index])
        } catch {
          matched = false
          break
        }
      } else if (expected !== segments[index]) {
        matched = false
        break
      }
    }

    if (matched) return resolve(pattern.name, params)
  }

  return NOT_FOUND
}

export function prerenderPaths() {
  return ['/', '/404/', ...contentPaths]
}

export { NOT_FOUND }
