// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" data-theme="paper">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#eee7d7" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600&display=swap"
            rel="stylesheet"
          />
          <script innerHTML="document.documentElement.dataset.theme = localStorage.getItem('journal-theme') || 'paper'" />
          {assets}
        </head>
        <body id="top">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
