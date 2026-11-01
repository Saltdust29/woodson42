import MarkdownIt from 'markdown-it'

import { loadArticles, loadPages } from './content-manifest.js'
import { withoutBody } from './content-model.js'

const markdown = new MarkdownIt({ html: true, linkify: false })

export function buildContent() {
  const articles = loadArticles().map((article) => ({
    ...withoutBody(article),
    html: markdown.render(article.body),
    summaryHtml: article.summary ? markdown.render(article.summary).trim() : '',
  }))

  const pages = loadPages().map((page) => ({
    ...withoutBody(page),
    html: markdown.render(page.body),
  }))

  return { articles, pages }
}
