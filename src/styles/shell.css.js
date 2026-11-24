import { globalStyle } from '@vanilla-extract/css'

globalStyle(".paper-shell", {
  "display": "flex",
  "flexDirection": "column",
  "width": "min(100%, 94rem)",
  "minHeight": "100dvh",
  "marginInline": "auto",
  "padding": "0 clamp(1rem, 4vw, 4.5rem)",
  "overflow": "clip",
  "background": "var(--paper)",
  "borderInline": "1px solid var(--rule-soft)"
})

globalStyle("#main-content", {
  "display": "flex",
  "flex": "1 0 auto",
  "flexDirection": "column"
})
