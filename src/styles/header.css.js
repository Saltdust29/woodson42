import { globalStyle } from '@vanilla-extract/css'

globalStyle(".site-header", {
  "paddingTop": "max(1rem, env(safe-area-inset-top))"
})

globalStyle(".edition-line, .nav-line, .story-meta, .eyebrow, .article-byline, .site-footer, .archive-list time, .archive-list > li > span, .search-result > span, .search-result time", {
  "fontFamily": "'Archivo Narrow', 'Arial Narrow', sans-serif"
})

globalStyle(".edition-line", {
  "display": "grid",
  "gridTemplateColumns": "minmax(0, 1fr) minmax(0, 1fr)",
  "gap": "0.35rem 1rem",
  "padding": "0.55rem 0",
  "borderBlock": "1px solid var(--ink)",
  "fontSize": "0.72rem",
  "fontWeight": "600",
  "letterSpacing": "0.14em",
  "lineHeight": "1",
  "textTransform": "uppercase"
})

globalStyle(".edition-line__center", {
  "gridColumn": "1 / -1",
  "gridRow": "2",
  "color": "var(--accent-dark)",
  "textAlign": "center"
})

globalStyle(".edition-line > span:last-child", {
  "textAlign": "right"
})

globalStyle(".masthead", {
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "center",
  "minHeight": "clamp(5rem, min(16vw, 15vh), 14rem)",
  "textDecoration": "none"
})

globalStyle(".masthead__word", {
  "marginLeft": "-0.04em",
  "fontSize": "clamp(3.4rem, min(19vw, 14vh), 14.75rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.078em",
  "lineHeight": "0.72"
})

globalStyle(".masthead__mark", {
  "display": "grid",
  "width": "clamp(2.1rem, min(5vw, 5vh), 4.5rem)",
  "aspectRatio": "1",
  "marginLeft": "clamp(0.25rem, 1vw, 1rem)",
  "placeItems": "center",
  "transform": "rotate(-5deg)",
  "background": "var(--accent)",
  "color": "var(--paper-raised)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "clamp(1rem, 2.4vw, 1.8rem)",
  "fontWeight": "600",
  "letterSpacing": "0.02em"
})

globalStyle(".nav-line", {
  "display": "grid",
  "alignItems": "center",
  "gap": "0",
  "minHeight": "3.5rem",
  "borderBlock": "3px double var(--ink)"
})

globalStyle(".site-nav", {
  "display": "flex",
  "justifyContent": "space-between",
  "gap": "clamp(0.9rem, 3vw, 2.5rem)",
  "minWidth": "0",
  "overflowX": "auto",
  "scrollbarWidth": "none"
})

globalStyle(".journal-tools-shell", {
  "borderTop": "1px solid var(--rule-soft)"
})

globalStyle(".site-nav::-webkit-scrollbar", {
  "display": "none"
})

globalStyle(".site-nav a", {
  "position": "relative",
  "flex": "0 0 auto",
  "padding": "1rem 0",
  "fontSize": "0.78rem",
  "fontWeight": "600",
  "letterSpacing": "0.12em",
  "textDecoration": "none",
  "textTransform": "uppercase"
})

globalStyle(".site-nav a::after", {
  "position": "absolute",
  "right": "0",
  "bottom": "0.62rem",
  "left": "0",
  "height": "1px",
  "transform": "scaleX(0)",
  "transformOrigin": "right",
  "background": "var(--accent)",
  "content": "''",
  "transition": "transform 220ms cubic-bezier(0.25, 1, 0.5, 1)"
})

globalStyle(".edition-line", {
  "@media (min-width: 40rem)": {
    "display": "flex",
    "flexWrap": "wrap",
    "justifyContent": "space-between"
  }
})

globalStyle(".edition-line__center", {
  "@media (min-width: 40rem)": {
    "color": "var(--accent-dark)"
  }
})

globalStyle(".edition-line__center, .edition-line > span:last-child", {
  "@media (min-width: 40rem)": {
    "textAlign": "initial"
  }
})

globalStyle(".nav-line", {
  "@media (min-width: 40rem)": {
    "display": "flex",
    "justifyContent": "space-between",
    "gap": "1rem"
  }
})

globalStyle(".site-nav", {
  "@media (min-width: 40rem)": {
    "justifyContent": "initial"
  }
})

globalStyle(".journal-tools-shell", {
  "@media (min-width: 40rem)": {
    "borderTop": "0"
  }
})

globalStyle(".site-nav a:hover::after", {
  "@media (hover: hover) and (pointer: fine)": {
    "transform": "scaleX(1)",
    "transformOrigin": "left"
  }
})


globalStyle(".masthead", {
  "@media (max-width: 39.99rem)": {
    "minHeight": "3.25rem"
  }
})

globalStyle(".edition-line", {
  "@media (max-width: 39.99rem)": {
    "padding": "0.4rem 0"
  }
})

globalStyle(".site-header", {
  "@media (max-width: 39.99rem)": {
    "paddingTop": "0.6rem"
  }
})
