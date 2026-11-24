import { escapeHtml } from './html.js'
import { SITE } from './site.js'

const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600&display=swap">`

export function documentPage({ app, head, assets, scripts: headScripts }) {
  const styles = assets.styles
    .map((href) => `<link rel="stylesheet" crossorigin href="${escapeHtml(href)}">`)
    .join('\n    ')
  const bundle = assets.scripts
    .map((src) => `<script type="module" crossorigin src="${escapeHtml(src)}"></script>`)
    .join('\n    ')

  const article = head.published
    ? `<meta property="article:published_time" content="${escapeHtml(head.published)}">\n    `
    : ''
  const robots = head.noindex ? '<meta name="robots" content="noindex">\n    ' : ''

  return `<!doctype html>
<html lang="${SITE.lang}" data-theme="paper">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#eee7d7">
    <title>${escapeHtml(head.title)}</title>
    <meta name="description" content="${escapeHtml(head.description)}">
    ${robots}<link rel="canonical" href="${escapeHtml(head.canonical)}">
    <meta property="og:type" content="${escapeHtml(head.ogType)}">
    <meta property="og:site_name" content="${escapeHtml(SITE.name)}">
    <meta property="og:title" content="${escapeHtml(head.title)}">
    <meta property="og:description" content="${escapeHtml(head.description)}">
    <meta property="og:url" content="${escapeHtml(head.canonical)}">
    <meta name="twitter:card" content="summary">
    ${article}<link rel="icon" href="/favicon.svg" type="image/svg+xml">
    ${FONT_LINKS}
    ${styles}
    ${headScripts}
  </head>
  <body id="top">
    <div id="app">${app}</div>
    ${bundle}
  </body>
</html>
`
}
