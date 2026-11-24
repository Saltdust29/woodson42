import MarkdownIt from 'markdown-it'

import { loadPages } from './content-manifest.js'

const markdown = new MarkdownIt({ html: true, linkify: false })

export function buildContent() {
  const pages = loadPages().map(({ body, ...page }) => ({
    ...page,
    html: markdown.render(body),
  }))

  return { pages }
}
