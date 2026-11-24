import { globalStyle } from '@vanilla-extract/css'

globalStyle(".journal-tools", {
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "flex-end",
  "gap": "0.3rem"
})

globalStyle(".tool-button", {
  "display": "inline-flex",
  "alignItems": "center",
  "gap": "0.45rem",
  "minHeight": "2.75rem",
  "padding": "0.5rem",
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

globalStyle(".theme-glyph", {
  "color": "var(--accent-dark)",
  "fontSize": "1rem"
})

globalStyle(".tool-button:hover", {
  "@media (hover: hover) and (pointer: fine)": {
    "color": "var(--accent-dark)"
  }
})

globalStyle(".tool-button", {
  "@media (pointer: coarse)": {
    "minHeight": "3rem"
  }
})
