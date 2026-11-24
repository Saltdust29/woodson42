import '../styles/content.css.js'

import { For, Show } from 'solid-js'

import NotFound from '../components/NotFound.jsx'
import { formatDate, SITE } from '../lib/site.js'

export default function Article(props) {
  return (
    <Show when={props.route.data} fallback={<NotFound />}>
      {(article) => (
        <article class="article-sheet">
          <header class="article-header">
            <p class="eyebrow">
              <a href={article().categoryUrl}>{article().category}</a> / {formatDate(article().date)}
            </p>
            <h1>{article().title}</h1>
            <div class="article-header__deck" innerHTML={article().summaryHtml} />
            <div class="article-byline">
              <span>Words by {SITE.author}</span>
              <span>{article().reading}</span>
            </div>
          </header>

          <div class="article-layout">
            <aside class="article-aside">
              <span class="article-aside__rule"></span>
              <p>Filed under</p>
              <ul>
                <For each={article().tagUrls}>
                  {(tag) => (
                    <li>
                      <a href={tag.url}>{tag.name}</a>
                    </li>
                  )}
                </For>
              </ul>
            </aside>

            <div class="article-content" innerHTML={article().html} />
          </div>

          <footer class="article-footer">
            <p>End of dispatch.</p>
            <a href="/archive/">
              Continue through the archive <span aria-hidden="true">→</span>
            </a>
          </footer>
        </article>
      )}
    </Show>
  )
}
