import '../styles/home.css.js'

import { formatDate } from '../lib/site.js'

export default function StoryRow(props) {
  return (
    <article class={`story-row${props.featured ? ' story-row--featured' : ''}`}>
      <div class="story-row__number" aria-hidden="true">
        {String(props.number).padStart(2, '0')}
      </div>
      <div class="story-row__body">
        <div class="story-meta">
          <a href={props.article.categoryUrl}>{props.article.category}</a>
          <span>{formatDate(props.article.date)}</span>
          <span>{props.article.reading}</span>
        </div>
        <h3>
          <a href={props.article.url}>{props.article.title}</a>
        </h3>
        <div class="story-summary" innerHTML={props.article.summaryHtml} />
      </div>
      <a class="story-row__arrow" href={props.article.url} aria-label={`Read ${props.article.title}`}>
        ↗
      </a>
    </article>
  )
}
