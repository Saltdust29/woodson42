import fs from 'node:fs'
import path from 'node:path'

import fg from 'fast-glob'

import { SITE, slugify } from './site.js'

const CONTENT = path.resolve('content')

function parseFrontmatter(raw) {
  const text = raw.replace(/\r\n/g, '\n').replace(/^﻿/, '')
  const boundary = text.indexOf('\n\n')
  const header = boundary === -1 ? text : text.slice(0, boundary)
  const body = boundary === -1 ? '' : text.slice(boundary + 2)
  const data = {}

  for (const line of header.split('\n')) {
    if (!line.trim()) continue
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim().toLowerCase()
    const value = line.slice(separator + 1).trim()
    data[key] = value
  }

  return { data, body: body.trim() }
}

function readMarkdown(directory) {
  const pattern = path.join(directory, '*.md').replaceAll('\\', '/')
  return fg.sync(pattern, { onlyFiles: true }).sort().map((file) => ({
    file,
    ...parseFrontmatter(fs.readFileSync(file, 'utf8')),
  }))
}

export function loadPages() {
  return readMarkdown(path.join(CONTENT, 'pages')).map(({ data, body, file }) => {
    const slug = data.slug || slugify(path.basename(file, '.md'))

    return {
      title: data.title || slug,
      slug,
      url: `/${slug}/`,
      summary: data.summary || SITE.subtitle,
      body,
    }
  })
}
