import '../styles/home.css.js'
import { A } from '@solidjs/router'

import { formatDate } from '../lib/site.js'

export default function StoryRow(props) {
  return (
    <article class={`story-row${props.featured ? ' story-row--featured' : ''}`}>
      <div class="story-row__number" aria-hidden="true">
        {String(props.number).padStart(2, '0')}
      </div>
      <div class="story-row__body">
        <div class="story-meta">
          <A href={props.article.categoryUrl}>{props.article.category}</A>
          <span>{formatDate(props.article.date)}</span>
          <span>{props.article.reading}</span>
        </div>
        <h3>
          <A href={props.article.url}>{props.article.title}</A>
        </h3>
        <div class="story-summary" innerHTML={props.article.summaryHtml} />
      </div>
      <A class="story-row__arrow" href={props.article.url} aria-label={`Read ${props.article.title}`}>
        ↗
      </A>
    </article>
  )
}
