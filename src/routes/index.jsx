import '../styles/home.css.js'
import { Meta } from '@solidjs/meta'
import { createAsync } from '@solidjs/router'
import { For, Show } from 'solid-js'

import StoryRow from '../components/StoryRow.jsx'
import { getHomeData } from '../lib/content.js'
import { SITE } from '../lib/site.js'

export const route = {
  preload: () => getHomeData(),
}

export default function Home() {
  const data = createAsync(() => getHomeData())

  return (
    <Show when={data()}>
      {(home) => (
        <>
          <Meta name="description" content={SITE.subtitle} />

          <section class="hero" aria-labelledby="hero-title">
            <div class="hero__lead">
              <p class="eyebrow">
                <span>Editor’s letter</span> / 001
              </p>
              <h1 id="hero-title">
                <span>Reality is but</span>
                <em>an illusion.</em>
              </h1>
              <p class="hero__deck">
                {SITE.subtitle} A quiet place for ideas before they become answers.
              </p>
            </div>

            <aside class="hero__folio" aria-label="Issue note">
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

          <section class="journal-section" aria-labelledby="latest-heading">
            <header class="section-heading">
              <p>Filed observations</p>
              <h2 id="latest-heading">Latest dispatches</h2>
              <a href="/archive/">
                Complete archive <span aria-hidden="true">→</span>
              </a>
            </header>

            <div class="story-list">
              <Show
                when={home().articles.length}
                fallback={
                  <div class="empty-edition">
                    <p class="eyebrow">The presses are quiet</p>
                    <h3>The first dispatch is still being typeset.</h3>
                    <p>Return soon. The blank page is part of the record.</p>
                  </div>
                }
              >
                <For each={home().articles}>
                  {(article, index) => (
                    <StoryRow article={article} number={index() + 1} featured={index() === 0} />
                  )}
                </For>
              </Show>
            </div>
          </section>

          <section class="index-notes" aria-label="Journal index">
            <div class="index-notes__statement">
              <p class="eyebrow">Working principle</p>
              <blockquote>“Keep only what remains interesting after the noise has passed.”</blockquote>
            </div>

            <div class="index-notes__topics">
              <p class="eyebrow">Current index</p>
              <ul>
                <For
                  each={home().tags}
                  fallback={
                    <li>
                      <span>Unclassified</span>
                      <span>00</span>
                    </li>
                  }
                >
                  {(tag) => (
                    <li>
                      <a href={tag.url}>{tag.name}</a>
                      <span>{String(tag.count).padStart(2, '0')}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </section>
        </>
      )}
    </Show>
  )
}
