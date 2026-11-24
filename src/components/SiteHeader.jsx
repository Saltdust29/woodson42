import '../styles/header.css.js'

import { SITE } from '../lib/site.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function SiteHeader() {
  return (
    <header class="site-header">
      <div class="edition-line" aria-label="Publication details">
        <span>Independent web journal</span>
        <span class="edition-line__center">Vol. I&nbsp;&nbsp;·&nbsp;&nbsp;No. 42</span>
        <span>Shanghai / UTC+8</span>
      </div>

      <a class="masthead" href="/" aria-label={`${SITE.name} home`}>
        <span class="masthead__word">woodson</span>
        <span class="masthead__mark" aria-hidden="true">
          42
        </span>
      </a>

      <div class="nav-line">
        <nav class="site-nav" aria-label="Primary navigation">
          <a href="/about/">Colophon</a>
        </nav>
        <div class="journal-tools-shell">
          <div class="journal-tools">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
