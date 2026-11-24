# woodson42

A one-screen banner: the masthead, the line “Reality is but an illusion.” in very large type, and a folio mark. Solid 2 renders it at build time, the browser hydrates it, and the reading theme comes from Vercel UI SDK.

## Stack

- **Solid 2** (`solid-js` + `@solidjs/web`) — one render pass on the server, hydration in the browser.
- **Vercel UI SDK** (`@ui-sdk/solid` + `@ui-sdk/core`) — `Toggle` and `Preferences` carry the paper/ink theme, including the pre-hydration script that avoids a flash.
- **Vite 8** — dev server, client bundle, and the SSR bundle used for prerendering.
- **vanilla-extract** — zero-runtime CSS-in-TS in `src/styles/*.css.js`.
- **markdown-it** — compiles the colophon page at build time.

## Local development

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://127.0.0.1:8000`. A middleware in `vite.config.js` server-renders each route with the same `src/entry-server.jsx` the build uses, so dev and production share one rendering path; the client hydrates it.

## Production build

```bash
pnpm install --frozen-lockfile
pnpm build
```

`scripts/build.mjs` runs three steps:

1. `vite build` writes the client bundle to `.output/public/`.
2. `vite build` (SSR) bundles `src/entry-server.jsx` to `.output/server/`.
3. The script imports that bundle and calls `render(path, assets)` for every route, writing `<route>/index.html`.

```bash
pnpm test        # builds if needed, then checks the generated site
pnpm preview     # serve the production build locally
```

## Project shape

- `content/pages/` holds the published Markdown pages (the colophon). `content/articles/` keeps earlier drafts and is not published.
- `src/lib/content-manifest.js` reads the Markdown; `src/lib/content-build.js` renders it and serves it through the `virtual:journal-content` module in `vite.config.js`.
- `src/routes.js` maps a URL to a view and lists the routes to prerender.
- `src/views/Home.jsx` is the banner; `Page.jsx` renders Markdown pages; `NotFoundPage.jsx` is the 404.
- `src/lib/document.js` writes the HTML document: head tags, the theme script, the client assets, and Solid's hydration script.
- `src/styles/*.css.js` is the vanilla-extract visual system.
- `public/` contains the custom-domain `CNAME` and the favicon.
- `tests/site.test.js` verifies the generated site with Node's test runner.

## Deployment

`.github/workflows/deploy-pages.yml` builds the site with pnpm and publishes `.output/public/` to GitHub Pages on every push to `main`.
