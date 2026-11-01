import { globalStyle } from '@vanilla-extract/css'

globalStyle(".article-sheet, .page-sheet, .archive-sheet", {
  "padding": "clamp(4rem, 10vw, 9rem) 0"
})

globalStyle(".article-header, .page-header, .archive-header", {
  "maxWidth": "71rem"
})

globalStyle(".article-header h1, .page-header h1, .archive-header h1", {
  "maxWidth": "11ch",
  "margin": "1.5rem 0 0 -0.045em",
  "fontSize": "clamp(4rem, 11vw, 9.5rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.068em",
  "lineHeight": "0.82",
  "textWrap": "balance"
})

globalStyle(".article-header__deck, .archive-header > p:last-child", {
  "maxWidth": "42ch",
  "marginTop": "2.25rem",
  "color": "var(--ink-soft)",
  "fontSize": "clamp(1.2rem, 2.5vw, 1.65rem)",
  "lineHeight": "1.45"
})

globalStyle(".article-header__deck p", {
  "margin": "0"
})

globalStyle(".article-byline", {
  "display": "flex",
  "flexWrap": "wrap",
  "justifyContent": "space-between",
  "gap": "0.5rem 2rem",
  "marginTop": "clamp(3rem, 6vw, 5rem)",
  "paddingBlock": "0.8rem",
  "borderBlock": "1px solid var(--ink)",
  "fontSize": "0.74rem",
  "fontWeight": "600",
  "letterSpacing": "0.12em",
  "textTransform": "uppercase"
})

globalStyle(".article-layout", {
  "display": "grid",
  "gap": "3rem",
  "marginTop": "clamp(3.5rem, 8vw, 7rem)"
})

globalStyle(".article-aside", {
  "color": "var(--ink-faint)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.72rem",
  "letterSpacing": "0.12em",
  "lineHeight": "1.5",
  "textTransform": "uppercase"
})

globalStyle(".article-aside__rule", {
  "display": "block",
  "width": "3rem",
  "height": "0.3rem",
  "marginBottom": "1.25rem",
  "background": "var(--accent)"
})

globalStyle(".article-aside p", {
  "margin": "0"
})

globalStyle(".article-aside ul", {
  "display": "flex",
  "flexWrap": "wrap",
  "gap": "0.5rem 1rem",
  "margin": "0.75rem 0 0",
  "padding": "0",
  "listStyle": "none"
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

globalStyle(".article-content pre", {
  "maxWidth": "100%",
  "padding": "1.25rem",
  "overflowX": "auto",
  "background": "var(--ink)",
  "color": "var(--paper-raised)",
  "fontSize": "0.9rem",
  "lineHeight": "1.6"
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

globalStyle(".article-footer", {
  "display": "flex",
  "flexWrap": "wrap",
  "justifyContent": "space-between",
  "gap": "1rem",
  "marginTop": "clamp(4rem, 9vw, 8rem)",
  "paddingTop": "1rem",
  "borderTop": "3px double var(--ink)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.76rem",
  "fontWeight": "600",
  "letterSpacing": "0.1em",
  "textTransform": "uppercase"
})

globalStyle(".article-footer p", {
  "margin": "0",
  "color": "var(--accent-dark)"
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

globalStyle(".archive-list", {
  "margin": "0",
  "padding": "0",
  "listStyle": "none",
  "borderTop": "3px double var(--ink)"
})

globalStyle(".archive-list li", {
  "display": "grid",
  "gridTemplateColumns": "1fr auto",
  "gap": "0.75rem 1.5rem",
  "padding": "1.5rem 0",
  "borderBottom": "1px solid var(--rule-soft)"
})

globalStyle(".archive-list time", {
  "gridColumn": "1 / -1",
  "color": "var(--ink-faint)",
  "fontSize": "0.72rem",
  "letterSpacing": "0.11em",
  "textTransform": "uppercase"
})

globalStyle(".archive-list p", {
  "margin": "0 0 0.3rem",
  "color": "var(--accent-dark)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.72rem",
  "fontWeight": "600",
  "letterSpacing": "0.1em",
  "textTransform": "uppercase"
})

globalStyle(".archive-list h2", {
  "margin": "0",
  "fontSize": "clamp(1.55rem, 3.5vw, 2.6rem)",
  "fontWeight": "400",
  "letterSpacing": "-0.035em",
  "lineHeight": "1"
})

globalStyle(".archive-list h2 a", {
  "textDecoration": "none"
})

globalStyle(".archive-list > li > span", {
  "alignSelf": "end",
  "color": "var(--ink-faint)",
  "fontSize": "0.74rem"
})

globalStyle(".archive-list li", {
  "@media (min-width: 40rem)": {
    "gridTemplateColumns": "8.5rem minmax(0, 1fr) 2rem",
    "alignItems": "end",
    "padding": "2rem 0"
  }
})

globalStyle(".archive-list time", {
  "@media (min-width: 40rem)": {
    "gridColumn": "auto"
  }
})

globalStyle(".article-layout", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "minmax(9rem, 0.32fr) minmax(0, 1fr)"
  }
})

globalStyle(".article-content", {
  "@media (min-width: 54rem)": {
    "gridColumn": "2"
  }
})

globalStyle(".article-aside", {
  "@media (min-width: 54rem)": {
    "position": "sticky",
    "top": "2rem",
    "alignSelf": "start"
  }
})

globalStyle(".page-sheet", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "minmax(18rem, 0.65fr) minmax(0, 1fr)"
  }
})

