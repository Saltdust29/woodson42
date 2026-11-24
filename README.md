# woodson42 journal

A retro-minimal personal journal built with Solid 2 and [Vercel UI SDK](https://ui-sdk.dev), prerendered to static HTML for GitHub Pages. No meta-framework: Vite builds the site, a small Node script renders every route, and the browser hydrates it.

## Stack

- **Solid 2** (`solid-js` + `@solidjs/web`) — components run once; the build emits hydratable markup.
- **Vercel UI SDK** (`@ui-sdk/solid` + `@ui-sdk/core`) — headless behavior for the search palette (Dialog + Command), the reading-theme toggle (Toggle + Preferences), focus management and ARIA.
- **Vite 8** — dev server, client bundle, and the SSR bundle used for prerendering.
- **vanilla-extract** — zero-runtime CSS-in-TS for the visual system in `src/styles/*.css.js`.
- **markdown-it** — the build-time content layer turns Markdown into HTML plus a virtual content module.

## Local development

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://127.0.0.1:8000`. A middleware in `vite.config.js` server-renders each route with the same `entry-server.jsx` the build uses, so dev and production share one rendering path; the client hydrates it.

## Production build

```bash
pnpm install --frozen-lockfile
pnpm build
```

`scripts/build.mjs` runs three steps:

1. `vite build` writes the client bundle to `.output/public/`.
2. `vite build` (SSR) bundles `src/entry-server.jsx` to `.output/server/`.
3. The script imports that bundle and calls `render(path, assets)` for every route, writing `<route>/index.html`. `search.json` is written from the same content layer.

```bash
pnpm test        # builds if needed, then checks the generated site
pnpm preview     # serve the production build locally
```

## Project shape

- `content/` contains Markdown articles (`content/articles/`) and pages (`content/pages/`).
- `src/lib/content-manifest.js` reads the Markdown and parses its metadata; `src/lib/content-build.js` renders it and exposes it through the `virtual:journal-content` module served by `vite.config.js`.
- `src/routes.js` maps a URL to a view and holds the list of routes to prerender.
- `src/views/` holds one component per route; `src/components/` the shared shell, listings, search palette, and theme control.
- `src/lib/document.js` writes the HTML document: head tags, the reading-theme script, the client assets, and Solid's hydration script.
- `src/styles/*.css.js` is the vanilla-extract visual system.
- `public/` contains the custom-domain `CNAME` and the favicon.
- `tests/site.test.js` verifies the generated site with Node's test runner.

## Deployment

`.github/workflows/deploy-pages.yml` builds the site with pnpm and publishes `.output/public/` to GitHub Pages on every push to `main`.
