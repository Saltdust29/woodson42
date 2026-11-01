import '../../styles/content.css.js'
import { Meta, Title } from '@solidjs/meta'
import { createAsync } from '@solidjs/router'
import { For, Show } from 'solid-js'

import { getArchiveData } from '../../lib/content.js'
import { formatDate, SITE } from '../../lib/site.js'

export const route = {
  preload: () => getArchiveData(),
}

export default function Archive() {
  const articles = createAsync(() => getArchiveData())

  return (
    <>
      <Title>{`Archive — ${SITE.name}`}</Title>
      <Meta name="description" content={SITE.subtitle} />

      <section class="archive-sheet">
        <header class="archive-header">
          <p class="eyebrow">The complete record</p>
          <h1>Archive</h1>
          <p>Every dispatch, filed in reverse chronological order.</p>
        </header>

        <Show when={articles()}>
          {(entries) => (
            <ol class="archive-list">
              <For each={entries()} fallback={<li class="archive-list__empty">No dispatches have been filed.</li>}>
                {(article, index) => (
                  <li>
                    <time datetime={article.date}>{formatDate(article.date)}</time>
                    <div>
                      <p>{article.category}</p>
                      <h2>
                        <a href={article.url}>{article.title}</a>
                      </h2>
                    </div>
                    <span aria-hidden="true">{String(index() + 1).padStart(2, '0')}</span>
                  </li>
                )}
              </For>
            </ol>
          )}
        </Show>
      </section>
    </>
  )
}
