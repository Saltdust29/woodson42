import '../../../../styles/content.css.js'
import { Meta, Title } from '@solidjs/meta'
import { createAsync } from '@solidjs/router'
import { For, Show } from 'solid-js'

import NotFound from '../../../../components/NotFound.jsx'
import { getArticleData } from '../../../../lib/content.js'
import { formatDate, SITE } from '../../../../lib/site.js'

export const route = {
  preload: ({ params }) => getArticleData(params.year, params.slug),
}

export default function Article(props) {
  const article = createAsync(() => getArticleData(props.params.year, props.params.slug))

  return (
    <Show when={article()} fallback={<NotFound />}>
      {(entry) => (
        <>
          <Title>{`${entry().title} — ${SITE.name}`}</Title>
          <Meta name="description" content={entry().summary} />

          <article class="article-sheet">
            <header class="article-header">
              <p class="eyebrow">
                <a href={entry().categoryUrl}>{entry().category}</a> / {formatDate(entry().date)}
              </p>
              <h1>{entry().title}</h1>
              <div class="article-header__deck" innerHTML={entry().summaryHtml} />
              <div class="article-byline">
                <span>Words by {SITE.author}</span>
                <span>{entry().reading}</span>
              </div>
            </header>

            <div class="article-layout">
              <aside class="article-aside">
                <span class="article-aside__rule"></span>
                <p>Filed under</p>
                <ul>
                  <For each={entry().tagUrls}>
                    {(tag) => (
                      <li>
                        <a href={tag.url}>{tag.name}</a>
                      </li>
                    )}
                  </For>
                </ul>
              </aside>

              <div class="article-content" innerHTML={entry().html} />
            </div>

            <footer class="article-footer">
              <p>End of dispatch.</p>
              <a href="/archive/">
                Continue through the archive <span aria-hidden="true">→</span>
              </a>
            </footer>
          </article>
        </>
      )}
    </Show>
  )
}
