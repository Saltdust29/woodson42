Title: Colophon
Slug: about
Summary: About the woodson42 journal and the machinery behind it.

**woodson42** is a personal field journal about software, systems, design, and the strange texture of ordinary life.

The site is intentionally small. Solid 2 renders plain-text entries into permanent HTML at build time, and a handful of Vercel UI SDK behaviors add search and reading controls without taking ownership of the articles themselves. The visual language borrows from old literary journals and newspaper folios: warm paper, narrow rules, large type, and the occasional red correction mark.

## The machinery

- Articles are written in Markdown.
- A build-time content layer manages the archive, sections, topics, and page metadata.
- Solid 2 and Vercel UI SDK power the searchable index and the theme control.
- Vite and vanilla-extract compile the interface into versioned static assets.

The result is a static publication that remains useful without JavaScript and becomes more convenient when JavaScript is available.

Questions, corrections, and interesting disagreements are always welcome.
