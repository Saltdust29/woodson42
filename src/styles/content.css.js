import { globalStyle } from '@vanilla-extract/css'

globalStyle(".page-sheet, .archive-sheet", {
  "padding": "clamp(4rem, 10vw, 9rem) 0"
})

globalStyle(".page-header, .archive-header", {
  "maxWidth": "71rem"
})

globalStyle(".page-header h1, .archive-header h1", {
  "maxWidth": "11ch",
  "margin": "1.5rem 0 0 -0.045em",
  "fontSize": "clamp(4rem, 11vw, 9.5rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.068em",
  "lineHeight": "0.82",
  "textWrap": "balance"
})

globalStyle(".archive-header > p:last-child", {
  "maxWidth": "42ch",
  "marginTop": "2.25rem",
  "color": "var(--ink-soft)",
  "fontSize": "clamp(1.2rem, 2.5vw, 1.65rem)",
  "lineHeight": "1.45"
})

globalStyle(".article-content", {
  "maxWidth": "66ch",
  "fontSize": "clamp(1.1rem, 1.3vw, 1.28rem)",
  "lineHeight": "1.72"
})

globalStyle(".article-content > p:first-child::first-letter", {
  "float": "left",
  "margin": "0.08em 0.1em 0 -0.04em",
  "color": "var(--accent-dark)",
  "fontSize": "4.8em",
  "fontWeight": "400",
  "lineHeight": "0.72"
})

globalStyle(".article-content p", {
  "margin": "0 0 1.72em"
})

globalStyle(".article-content h2, .article-content h3", {
  "margin": "2.2em 0 0.7em",
  "fontWeight": "400",
  "letterSpacing": "-0.035em",
  "lineHeight": "1"
})

globalStyle(".article-content h2", {
  "fontSize": "clamp(2rem, 4vw, 3.25rem)"
})

globalStyle(".article-content h3", {
  "fontSize": "clamp(1.5rem, 3vw, 2.2rem)"
})

globalStyle(".article-content blockquote", {
  "margin": "2.5em 0",
  "padding": "0.2em 0 0.2em clamp(1.25rem, 4vw, 3rem)",
  "borderLeft": "0.25rem solid var(--accent)",
  "color": "var(--ink-soft)",
  "fontSize": "clamp(1.45rem, 3vw, 2.25rem)",
  "fontStyle": "italic",
  "lineHeight": "1.25"
})

globalStyle(".article-content code", {
  "fontFamily": "ui-monospace, 'SFMono-Regular', Consolas, monospace",
  "fontSize": "0.86em"
})

globalStyle(".article-content img", {
  "maxWidth": "100%",
  "height": "auto",
  "filter": "saturate(0.72) contrast(1.04)"
})

globalStyle(".article-content hr", {
  "width": "5rem",
  "margin": "4rem 0",
  "border": "0",
  "borderTop": "3px double var(--ink)"
})

globalStyle(".page-sheet", {
  "display": "grid",
  "gap": "clamp(4rem, 9vw, 8rem)"
})

globalStyle(".page-content", {
  "maxWidth": "62ch"
})

globalStyle(".archive-header", {
  "marginBottom": "clamp(3rem, 7vw, 6rem)"
})

globalStyle(".error-sheet", {
  "minHeight": "58vh"
})

globalStyle(".error-sheet__link", {
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.78rem",
  "fontWeight": "600",
  "letterSpacing": "0.12em",
  "textTransform": "uppercase"
})

globalStyle(".page-sheet", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "minmax(18rem, 0.65fr) minmax(0, 1fr)"
  }
})
