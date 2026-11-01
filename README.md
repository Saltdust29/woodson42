# woodson42 journal

A retro-minimal personal journal built with SolidStart, Solid, and vanilla-extract, prerendered to static HTML for GitHub Pages.

## Local development

```bash
pnpm install
pnpm dev
```

The site is served at `http://127.0.0.1:8000`. Content changes reload through Vite, and styles are compiled from `src/styles/*.css.js`.

## Production build

```bash
pnpm install --frozen-lockfile
pnpm build
```

The complete static site is written to `.output/public/`.

```bash
pnpm test        # builds if needed, then checks the generated site
pnpm preview     # serve the production build locally
```

## Project shape

- `content/` contains Markdown articles (`content/articles/`) and pages (`content/pages/`).
- `src/lib/content-manifest.js` reads the Markdown, parses its metadata, and derives every route.
- `src/lib/content.server.js` renders Markdown and exposes the data through server functions.
- `src/routes/` maps the file tree to URLs: home, articles, pages, sections, topics, archive, search index, and 404.
- `src/components/` holds the shared shell, story listings, and the search/theme controls.
- `src/styles/*.css.js` is the vanilla-extract visual system.
- `public/` contains the custom-domain `CNAME` and the favicon.
- `scripts/postbuild.mjs` turns the prerendered 404 page into `404.html`.
- `tests/site.test.js` verifies the generated site with Node's test runner.

## Deployment

`.github/workflows/deploy-pages.yml` builds the site with pnpm and publishes `.output/public/` to GitHub Pages on every push to `main`.
