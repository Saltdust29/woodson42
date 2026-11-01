import fs from 'node:fs'
import path from 'node:path'

import fg from 'fast-glob'

import { groupCategories, groupTags } from './content-model.js'
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

function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/.exec(value ?? '')
  if (!match) return null

  const [, year, month, day, hours = '00', minutes = '00'] = match
  const iso = `${year}-${month}-${day}T${hours}:${minutes}:00+08:00`
  const timestamp = Date.parse(iso)
  if (Number.isNaN(timestamp)) return null

  return { iso, year, timestamp }
}

function readMarkdown(directory) {
  const pattern = path.join(directory, '*.md').replaceAll('\\', '/')
  return fg.sync(pattern, { onlyFiles: true }).sort().map((file) => ({
    file,
    ...parseFrontmatter(fs.readFileSync(file, 'utf8')),
  }))
}

function toArticle(entry) {
  const { data, body } = entry
  const date = parseDate(data.date)
  if (!date) return null

  const slug = data.slug || slugify(path.basename(entry.file, '.md'))
  const category = data.category || 'Uncategorized'
  const tags = (data.tags ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  return {
    title: data.title || slug,
    slug,
    url: `/journal/${date.year}/${slug}/`,
    date: date.iso,
    year: date.year,
    timestamp: date.timestamp,
    category,
    categorySlug: slugify(category),
    categoryUrl: `/section/${slugify(category)}/`,
    tags,
    tagUrls: tags.map((tag) => ({ name: tag, slug: slugify(tag), url: `/topic/${slugify(tag)}/` })),
    summary: data.summary || '',
    reading: data.reading || '3 min read',
    body,
  }
}

function toPage(entry) {
  const { data, body } = entry
  const slug = data.slug || slugify(path.basename(entry.file, '.md'))

  return {
    title: data.title || slug,
    slug,
    url: `/${slug}/`,
    summary: data.summary || SITE.subtitle,
    body,
  }
}

export function loadArticles() {
  return readMarkdown(path.join(CONTENT, 'articles'))
    .map(toArticle)
    .filter(Boolean)
    .sort((a, b) => b.timestamp - a.timestamp)
}

export function loadPages() {
  return readMarkdown(path.join(CONTENT, 'pages')).map(toPage)
}

export function contentRoutes() {
  const articles = loadArticles()
  return [
    ...articles.map((article) => article.url),
    ...loadPages().map((page) => page.url),
    ...groupCategories(articles).map((category) => category.url),
    ...groupTags(articles).map((tag) => tag.url),
  ]
}
