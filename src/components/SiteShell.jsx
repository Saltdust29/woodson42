import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'

export default function SiteShell(props) {
  return (
    <>
      <a class="skip-link" href="#main-content">
        Skip to the journal
      </a>

      <div class="paper-shell">
        <SiteHeader />
        <main id="main-content">{props.children}</main>
        <SiteFooter />
      </div>
    </>
  )
}
