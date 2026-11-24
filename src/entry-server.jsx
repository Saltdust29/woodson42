import { generateHydrationScript, renderToString } from '@solidjs/web'
import { preferencesScript } from '@ui-sdk/core'

import App from './app.jsx'
import { documentPage } from './lib/document.js'
import { headFor } from './lib/meta.js'
import { theme } from './lib/preferences.js'
import { matchRoute, prerenderPaths } from './routes.js'

function renderApp(pathname) {
  return renderToString(() => <App url={pathname} />)
}

function pageHead(pathname) {
  return headFor(matchRoute(pathname), pathname)
}

function headScripts() {
  return `<script>${preferencesScript([theme])}</script>${generateHydrationScript()}`
}

function render(pathname, assets) {
  return documentPage({
    app: renderApp(pathname),
    head: pageHead(pathname),
    assets,
    scripts: headScripts(),
  })
}

export { headScripts, pageHead, prerenderPaths, render, renderApp }
