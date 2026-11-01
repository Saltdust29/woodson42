import '../styles/footer.css.js'
import { SITE } from '../lib/site.js'

export default function SiteFooter() {
  return (
    <footer class="site-footer">
      <div>
        <span class="footer-mark">W42</span>
        <p>{SITE.subtitle}</p>
      </div>
      <div class="site-footer__meta">
        <p>Typeset with SolidStart &amp; Vite.</p>
        <p>© {SITE.currentYear} {SITE.author}.</p>
      </div>
      <a class="return-link" href="#top" aria-label="Return to top">
        Return to top ↑
      </a>
    </footer>
  )
}
