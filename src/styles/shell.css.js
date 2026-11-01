import { globalStyle } from '@vanilla-extract/css'

globalStyle(".paper-shell", {
  "width": "min(100%, 94rem)",
  "minHeight": "100vh",
  "marginInline": "auto",
  "padding": "0 clamp(1rem, 4vw, 4.5rem)",
  "overflow": "clip",
  "background": "var(--paper)",
  "borderInline": "1px solid var(--rule-soft)"
})

