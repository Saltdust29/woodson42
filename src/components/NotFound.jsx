export default function NotFound() {
  return (
    <section class="archive-sheet error-sheet">
      <header class="archive-header">
        <p class="eyebrow">Misfiled / 404</p>
        <h1>Page not found.</h1>
        <p>This address has slipped out of the archive, or perhaps it was never filed.</p>
      </header>
      <a class="error-sheet__link" href="/">
        Return to the front page <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}
