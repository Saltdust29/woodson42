import { globalStyle } from '@vanilla-extract/css'

globalStyle(".journal-tools", {
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "flex-end",
  "gap": "0.3rem"
})

globalStyle(".tool-button, .close-button", {
  "minHeight": "2.75rem",
  "border": "0",
  "background": "transparent",
  "color": "var(--ink)",
  "cursor": "pointer",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.75rem",
  "fontWeight": "600",
  "letterSpacing": "0.1em",
  "textTransform": "uppercase"
})

globalStyle(".tool-button", {
  "display": "inline-flex",
  "alignItems": "center",
  "gap": "0.45rem",
  "padding": "0.5rem"
})

globalStyle(".tool-button svg", {
  "width": "1rem",
  "fill": "none",
  "stroke": "currentColor",
  "strokeLinecap": "square",
  "strokeWidth": "1.5"
})

globalStyle(".tool-button kbd", {
  "display": "none",
  "minWidth": "1.25rem",
  "padding": "0.1rem 0.25rem",
  "border": "1px solid var(--rule)",
  "font": "inherit",
  "lineHeight": "1",
  "textAlign": "center"
})

globalStyle(".theme-glyph", {
  "color": "var(--accent-dark)",
  "fontSize": "1rem"
})

globalStyle(".search-dialog", {
  "width": "min(66rem, calc(100% - 1.5rem))",
  "maxHeight": "min(48rem, calc(100dvh - 1.5rem))",
  "padding": "0",
  "overflow": "auto",
  "border": "1px solid var(--ink)",
  "borderRadius": "0",
  "background": "var(--paper)",
  "color": "var(--ink)",
  "boxShadow": "0 1.5rem 5rem oklch(12% 0.018 62 / 0.28)"
})

globalStyle(".search-dialog::backdrop", {
  "background": "oklch(14% 0.015 62 / 0.72)"
})

globalStyle(".search-sheet", {
  "padding": "clamp(1.25rem, 5vw, 4rem)"
})

globalStyle(".search-sheet__header", {
  "display": "flex",
  "alignItems": "start",
  "justifyContent": "space-between",
  "gap": "1rem",
  "paddingBottom": "1.5rem",
  "borderBottom": "3px double var(--ink)"
})

globalStyle(".search-sheet h2", {
  "margin": "0.65rem 0 0",
  "fontSize": "clamp(2.5rem, 7vw, 5.5rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.055em",
  "lineHeight": "0.9"
})

globalStyle(".close-button", {
  "flex": "0 0 auto",
  "padding": "0.4rem"
})

globalStyle(".search-field", {
  "position": "relative",
  "display": "block",
  "marginTop": "2rem"
})

globalStyle(".search-field input", {
  "width": "100%",
  "padding": "0.9rem 5rem 0.9rem 0",
  "border": "0",
  "borderBottom": "1px solid var(--ink)",
  "borderRadius": "0",
  "background": "transparent",
  "color": "var(--ink)",
  "fontSize": "clamp(1.35rem, 3vw, 2rem)"
})

globalStyle(".search-field input::placeholder", {
  "color": "var(--ink-faint)",
  "opacity": "1"
})

globalStyle(".search-field__count", {
  "position": "absolute",
  "right": "0",
  "bottom": "1.2rem",
  "color": "var(--ink-faint)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.72rem",
  "letterSpacing": "0.1em",
  "textTransform": "uppercase"
})

globalStyle(".search-results", {
  "minHeight": "12rem",
  "marginTop": "1.5rem"
})

globalStyle(".search-result", {
  "position": "relative",
  "display": "grid",
  "gridTemplateColumns": "minmax(0, 1fr) auto",
  "gap": "0.3rem 1rem",
  "padding": "1.2rem 0",
  "borderBottom": "1px solid var(--rule-soft)",
  "textDecoration": "none"
})

globalStyle(".search-result > span", {
  "color": "var(--accent-dark)",
  "fontSize": "0.7rem",
  "fontWeight": "600",
  "letterSpacing": "0.11em",
  "textTransform": "uppercase"
})

globalStyle(".search-result strong", {
  "gridColumn": "1",
  "fontSize": "clamp(1.4rem, 3vw, 2rem)",
  "fontWeight": "400",
  "letterSpacing": "-0.03em",
  "lineHeight": "1"
})

globalStyle(".search-result p", {
  "display": "none",
  "gridColumn": "1",
  "maxWidth": "58ch",
  "margin": "0.35rem 0 0",
  "color": "var(--ink-soft)",
  "lineHeight": "1.45"
})

globalStyle(".search-result time", {
  "gridColumn": "2",
  "gridRow": "1 / span 3",
  "alignSelf": "center",
  "color": "var(--ink-faint)",
  "fontSize": "0.72rem"
})

globalStyle(".search-state", {
  "padding": "3rem 0",
  "color": "var(--ink-soft)",
  "fontSize": "1.1rem"
})

globalStyle(".search-state--empty strong", {
  "display": "block",
  "marginTop": "0.75rem",
  "color": "var(--ink)",
  "fontSize": "2rem",
  "fontWeight": "400"
})

globalStyle(".tool-button kbd", {
  "@media (min-width: 40rem)": {
    "display": "inline-block"
  }
})

globalStyle(".search-result p", {
  "@media (min-width: 40rem)": {
    "display": "block"
  }
})

globalStyle(".tool-button:hover, .close-button:hover", {
  "@media (hover: hover) and (pointer: fine)": {
    "color": "var(--accent-dark)"
  }
})

globalStyle(".search-result:hover", {
  "@media (hover: hover) and (pointer: fine)": {
    "paddingInline": "0.65rem",
    "background": "var(--paper-raised)"
  }
})

globalStyle(".search-result", {
  "@media (hover: hover) and (pointer: fine)": {
    "transition": "padding 180ms cubic-bezier(0.25, 1, 0.5, 1), background 180ms linear"
  }
})

globalStyle(".tool-button, .close-button, .site-nav a", {
  "@media (pointer: coarse)": {
    "minHeight": "3rem"
  }
})

