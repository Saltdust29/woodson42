import '../styles/content.css.js'

import { For, Show } from 'solid-js'

import { formatDate } from '../lib/site.js'

export default function Archive(props) {
  return (
    <section class="archive-sheet">
      <header class="archive-header">
        <p class="eyebrow">The complete record</p>
        <h1>Archive</h1>
        <p>Every dispatch, filed in reverse chronological order.</p>
      </header>

      <ol class="archive-list">
        <For
          each={props.route.data}
          fallback={<li class="archive-list__empty">No dispatches have been filed.</li>}
        >
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
    </section>
  )
}
