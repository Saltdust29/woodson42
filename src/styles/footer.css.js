import { globalStyle } from '@vanilla-extract/css'

globalStyle(".site-footer", {
  "display": "grid",
  "gap": "clamp(1rem, 2.5vw, 2rem)",
  "padding": "clamp(1.4rem, 4.5vh, 5.5rem) 0 max(1.4rem, env(safe-area-inset-bottom))",
  "fontSize": "0.76rem",
  "letterSpacing": "0.06em",
  "lineHeight": "1.5",
  "textTransform": "uppercase"
})

globalStyle(".site-footer p", {
  "maxWidth": "36ch",
  "margin": "0.5rem 0 0"
})

globalStyle(".footer-mark", {
  "display": "inline-block",
  "padding": "0.25rem 0.4rem",
  "transform": "rotate(-3deg)",
  "background": "var(--accent)",
  "color": "var(--paper-raised)",
  "fontWeight": "600"
})

globalStyle(".site-footer__meta", {
  "color": "var(--ink-faint)"
})

globalStyle(".return-link", {
  "alignSelf": "end",
  "justifySelf": "start",
  "fontWeight": "600"
})

globalStyle(".site-footer", {
  "@media (min-width: 40rem)": {
    "gridTemplateColumns": "minmax(0, 1fr) minmax(0, 1fr) auto"
  }
})

globalStyle(".return-link", {
  "@media (min-width: 40rem)": {
    "justifySelf": "end"
  }
})


globalStyle(".site-footer", {
  "@media (max-width: 39.99rem)": {
    "gap": "0.55rem",
    "padding": "0.85rem 0 max(0.85rem, env(safe-area-inset-bottom))"
  }
})
