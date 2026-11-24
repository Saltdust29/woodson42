import '../styles/content.css.js'

import { Show } from 'solid-js'

import NotFound from '../components/NotFound.jsx'

export default function Page(props) {
  return (
    <Show when={props.route.data} fallback={<NotFound />}>
      {(page) => (
        <article class="page-sheet">
          <header class="page-header">
            <p class="eyebrow">Permanent record</p>
            <h1>{page().title}</h1>
          </header>
          <div class="article-content page-content" innerHTML={page().html} />
        </article>
      )}
    </Show>
  )
}
