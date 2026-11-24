Title: Colophon
Slug: about
Summary: About the woodson42 banner and the machinery behind it.

**woodson42** is a one-screen banner: a masthead, one sentence held in very large type, and a folio mark. Nothing scrolls past it, and nothing is filed behind it.

## The machinery

- The page is written in Markdown and compiled at build time.
- Solid 2 renders the route to HTML, and the browser hydrates it.
- A Vercel UI SDK `Toggle` with a saved preference carries the reading theme.
- Vite and vanilla-extract compile the interface into versioned static assets.

The result is a static page that reads correctly without JavaScript, and can switch between paper and ink when JavaScript is available.

Questions, corrections, and interesting disagreements are always welcome.
