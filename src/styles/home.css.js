import { globalStyle } from '@vanilla-extract/css'

import { reveal } from './global.css.js'

globalStyle(".banner", {
  "position": "relative",
  "display": "grid",
  "flex": "1 0 auto",
  "alignContent": "center",
  "gap": "clamp(1.5rem, 4vh, 7rem)",
  "padding": "clamp(1.5rem, 4.5vh, 6rem) 0 clamp(1.25rem, 3vh, 4rem)"
})

globalStyle(".banner::before", {
  "position": "absolute",
  "top": "0.4rem",
  "left": "0",
  "width": "3rem",
  "height": "0.3rem",
  "background": "var(--accent)",
  "content": "''"
})

globalStyle(".eyebrow", {
  "margin": "0",
  "color": "var(--ink-soft)",
  "fontSize": "0.76rem",
  "fontWeight": "600",
  "letterSpacing": "0.15em",
  "lineHeight": "1.2",
  "textTransform": "uppercase"
})

globalStyle(".eyebrow span, .eyebrow a", {
  "color": "var(--accent-dark)"
})

globalStyle(".banner h1", {
  "maxWidth": "9ch",
  "margin": "1.5rem 0 0 -0.055em",
  "fontSize": "clamp(3.6rem, min(15vw, 17vh), 13rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.075em",
  "lineHeight": "0.76"
})

globalStyle(".banner h1 span, .banner h1 em", {
  "display": "block"
})

globalStyle(".banner h1 em", {
  "marginLeft": "clamp(0rem, 9vw, 8rem)",
  "color": "var(--accent-dark)",
  "fontWeight": "400"
})

globalStyle(".banner__deck", {
  "maxWidth": "42ch",
  "margin": "clamp(1.25rem, 3vh, 2.25rem) 0 0",
  "color": "var(--ink-soft)",
  "fontSize": "clamp(1.15rem, 2.2vw, 1.65rem)",
  "lineHeight": "1.42"
})

globalStyle(".banner__folio", {
  "display": "grid",
  "gridTemplateColumns": "auto 1fr",
  "gap": "1.5rem",
  "alignSelf": "end",
  "paddingTop": "1.25rem",
  "borderTop": "1px solid var(--ink)"
})

globalStyle(".banner__folio p", {
  "margin": "0"
})

globalStyle(".folio-number", {
  "color": "var(--accent-dark)",
  "fontSize": "clamp(3rem, min(12vw, 12vh), 8rem)",
  "fontWeight": "300",
  "lineHeight": "0.73"
})

globalStyle(".banner__folio > div > p:first-child", {
  "maxWidth": "18ch",
  "fontSize": "1.1rem",
  "fontStyle": "italic",
  "lineHeight": "1.3"
})

globalStyle(".folio-detail", {
  "marginTop": "1.5rem",
  "color": "var(--ink-faint)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.72rem",
  "letterSpacing": "0.12em",
  "lineHeight": "1.5",
  "textTransform": "uppercase"
})

globalStyle(".banner__lead, .banner__folio", {
  "animation": `${reveal} 720ms cubic-bezier(0.16, 1, 0.3, 1) both`
})

globalStyle(".banner__folio", {
  "animationDelay": "80ms"
})

globalStyle(".banner", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "minmax(0, 4fr) minmax(15rem, 1fr)",
    "alignItems": "end"
  }
})

globalStyle(".banner__folio", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "1fr",
    "paddingLeft": "1.5rem",
    "borderTop": "0",
    "borderLeft": "1px solid var(--ink)"
  }
})

globalStyle(".banner", {
  "@media (max-width: 39.99rem)": {
    "gap": "1rem",
    "padding": "0.9rem 0 1rem"
  }
})

globalStyle(".banner__deck", {
  "@media (max-width: 39.99rem)": {
    "margin": "1rem 0 0",
    "fontSize": "1.05rem"
  }
})

globalStyle(".banner h1", {
  "@media (max-width: 39.99rem)": {
    "fontSize": "clamp(3.1rem, 14vw, 4.2rem)"
  }
})
