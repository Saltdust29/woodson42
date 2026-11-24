import '../styles/home.css.js'

import { SITE } from '../lib/site.js'

export default function Home() {
  return (
    <section class="banner" aria-labelledby="banner-title">
      <div class="banner__lead">
        <p class="eyebrow">
          <span>Field notes</span> / 001
        </p>
        <h1 id="banner-title">
          <span>Reality is but</span>
          <em>an illusion.</em>
        </h1>
        <p class="banner__deck">
          {SITE.subtitle} A quiet place for ideas before they become answers.
        </p>
      </div>

      <aside class="banner__folio" aria-label="Issue note">
        <p class="folio-number">42</p>
        <div>
          <p>Notes from the edge of the ordinary.</p>
          <p class="folio-detail">
            Est. MMXXVI
            <br />
            Updated irregularly
          </p>
        </div>
      </aside>
    </section>
  )
}
