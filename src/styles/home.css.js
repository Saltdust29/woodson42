import { globalStyle } from '@vanilla-extract/css'

import { reveal } from './global.css.js'

globalStyle(".hero", {
  "position": "relative",
  "display": "grid",
  "gap": "clamp(3rem, 8vw, 7rem)",
  "padding": "clamp(4rem, 10vw, 9rem) 0 clamp(4.5rem, 11vw, 10rem)",
  "borderBottom": "1px solid var(--ink)"
})

globalStyle(".hero::before", {
  "position": "absolute",
  "top": "2.25rem",
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

globalStyle(".hero h1", {
  "maxWidth": "10ch",
  "margin": "1.5rem 0 0 -0.055em",
  "fontSize": "clamp(4.35rem, 13vw, 11.5rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.072em",
  "lineHeight": "0.76"
})

globalStyle(".hero h1 span, .hero h1 em", {
  "display": "block"
})

globalStyle(".hero h1 em", {
  "marginLeft": "clamp(0rem, 8vw, 7rem)",
  "color": "var(--accent-dark)",
  "fontWeight": "400"
})

globalStyle(".hero__deck", {
  "maxWidth": "37ch",
  "margin": "2.25rem 0 0",
  "color": "var(--ink-soft)",
  "fontSize": "clamp(1.15rem, 2.2vw, 1.65rem)",
  "lineHeight": "1.42"
})

globalStyle(".hero__folio", {
  "display": "grid",
  "gridTemplateColumns": "auto 1fr",
  "gap": "1.5rem",
  "alignSelf": "end",
  "paddingTop": "1.25rem",
  "borderTop": "1px solid var(--ink)"
})

globalStyle(".hero__folio p", {
  "margin": "0"
})

globalStyle(".folio-number", {
  "color": "var(--accent-dark)",
  "fontSize": "clamp(4rem, 12vw, 8rem)",
  "fontWeight": "300",
  "lineHeight": "0.73"
})

globalStyle(".hero__folio > div > p:first-child", {
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

globalStyle(".journal-section, .listing-sheet", {
  "padding": "clamp(4rem, 9vw, 8rem) 0"
})

globalStyle(".section-heading", {
  "display": "grid",
  "gap": "0.8rem",
  "alignItems": "end",
  "marginBottom": "clamp(2rem, 5vw, 4rem)"
})

globalStyle(".section-heading p, .section-heading a", {
  "margin": "0",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.75rem",
  "fontWeight": "600",
  "letterSpacing": "0.12em",
  "textTransform": "uppercase"
})

globalStyle(".section-heading p", {
  "color": "var(--accent-dark)"
})

globalStyle(".section-heading h2", {
  "margin": "0",
  "fontSize": "clamp(2.6rem, 6vw, 5.25rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.055em",
  "lineHeight": "0.9"
})

globalStyle(".section-heading a", {
  "justifySelf": "start"
})

globalStyle(".story-list", {
  "containerType": "inline-size",
  "borderTop": "1px solid var(--ink)"
})

globalStyle(".story-row", {
  "display": "grid",
  "gridTemplateColumns": "2.35rem minmax(0, 1fr) 2rem",
  "gap": "0.75rem",
  "alignItems": "start",
  "padding": "1.5rem 0",
  "borderBottom": "1px solid var(--rule-soft)"
})

globalStyle(".story-row__number, .story-row__arrow", {
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.75rem",
  "fontWeight": "600",
  "letterSpacing": "0.08em"
})

globalStyle(".story-row__number", {
  "paddingTop": "0.25rem",
  "color": "var(--accent-dark)"
})

globalStyle(".story-row__arrow", {
  "display": "grid",
  "minWidth": "2rem",
  "minHeight": "2rem",
  "placeItems": "center",
  "fontSize": "1rem",
  "textDecoration": "none"
})

globalStyle(".story-meta", {
  "display": "flex",
  "flexWrap": "wrap",
  "gap": "0.3rem 1rem",
  "marginBottom": "0.65rem",
  "color": "var(--ink-faint)",
  "fontSize": "0.7rem",
  "fontWeight": "500",
  "letterSpacing": "0.09em",
  "textTransform": "uppercase"
})

globalStyle(".story-meta a", {
  "color": "var(--accent-dark)"
})

globalStyle(".story-row h3", {
  "margin": "0",
  "fontSize": "clamp(1.65rem, 4vw, 2.65rem)",
  "fontWeight": "400",
  "letterSpacing": "-0.035em",
  "lineHeight": "1"
})

globalStyle(".story-row h3 a", {
  "textDecoration": "none"
})

globalStyle(".story-summary", {
  "maxWidth": "55ch",
  "marginTop": "0.85rem",
  "color": "var(--ink-soft)",
  "fontSize": "1rem",
  "lineHeight": "1.55"
})

globalStyle(".story-summary p", {
  "margin": "0"
})

globalStyle(".empty-edition", {
  "padding": "4rem 0"
})

globalStyle(".empty-edition h3", {
  "maxWidth": "18ch",
  "margin": "1rem 0",
  "fontSize": "clamp(2rem, 5vw, 4rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.04em",
  "lineHeight": "0.95"
})

globalStyle(".index-notes", {
  "display": "grid",
  "gap": "clamp(3.5rem, 8vw, 7rem)",
  "padding": "clamp(4.5rem, 10vw, 9rem) 0",
  "borderBlock": "3px double var(--ink)"
})

globalStyle(".index-notes blockquote", {
  "maxWidth": "18ch",
  "margin": "1.5rem 0 0",
  "fontSize": "clamp(2.25rem, 5vw, 4.75rem)",
  "fontWeight": "300",
  "letterSpacing": "-0.05em",
  "lineHeight": "0.98"
})

globalStyle(".index-notes__topics ul", {
  "margin": "1.5rem 0 0",
  "padding": "0",
  "listStyle": "none",
  "borderTop": "1px solid var(--ink)"
})

globalStyle(".index-notes__topics li", {
  "display": "flex",
  "justifyContent": "space-between",
  "gap": "1rem",
  "padding": "0.8rem 0",
  "borderBottom": "1px solid var(--rule-soft)",
  "fontSize": "1.15rem"
})

globalStyle(".index-notes__topics li span", {
  "color": "var(--ink-faint)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "fontSize": "0.75rem"
})

globalStyle(".hero__lead, .hero__folio, .journal-section, .index-notes", {
  "animation": `${reveal} 720ms cubic-bezier(0.16, 1, 0.3, 1) both`
})

globalStyle(".hero__folio", {
  "animationDelay": "80ms"
})

globalStyle(".journal-section", {
  "animationDelay": "140ms"
})

globalStyle(".index-notes", {
  "animationDelay": "200ms"
})

globalStyle(".story-row", {
  "@container (min-width: 42rem)": {
    "gridTemplateColumns": "3rem minmax(0, 1fr) 2.5rem",
    "gap": "1.5rem",
    "padding": "2rem 0"
  }
})

globalStyle(".story-row--featured", {
  "@container (min-width: 42rem)": {
    "paddingBlock": "2.8rem"
  }
})

globalStyle(".story-row--featured h3", {
  "@container (min-width: 42rem)": {
    "maxWidth": "18ch",
    "fontSize": "clamp(2.6rem, 6cqw, 5.4rem)",
    "fontWeight": "300",
    "lineHeight": "0.92"
  }
})

globalStyle(".story-row--featured .story-summary", {
  "@container (min-width: 42rem)": {
    "maxWidth": "50ch",
    "fontSize": "1.14rem"
  }
})

globalStyle(".section-heading", {
  "@media (min-width: 40rem)": {
    "gridTemplateColumns": "auto minmax(0, 1fr) auto"
  }
})

globalStyle(".section-heading h2", {
  "@media (min-width: 40rem)": {
    "textAlign": "center"
  }
})

globalStyle(".section-heading a", {
  "@media (min-width: 40rem)": {
    "justifySelf": "end"
  }
})

globalStyle(".hero", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "minmax(0, 4fr) minmax(15rem, 1fr)",
    "alignItems": "end"
  }
})

globalStyle(".hero__folio", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "1fr",
    "paddingLeft": "1.5rem",
    "borderTop": "0",
    "borderLeft": "1px solid var(--ink)"
  }
})

globalStyle(".index-notes", {
  "@media (min-width: 54rem)": {
    "gridTemplateColumns": "minmax(0, 1.45fr) minmax(18rem, 0.55fr)"
  }
})

globalStyle(".story-row:hover h3 a, .archive-list li:hover h2 a, .search-result:hover strong", {
  "@media (hover: hover) and (pointer: fine)": {
    "color": "var(--accent-dark)"
  }
})

globalStyle(".story-row__arrow:hover", {
  "@media (hover: hover) and (pointer: fine)": {
    "transform": "translate(0.18rem, -0.18rem)"
  }
})

globalStyle(".story-row__arrow", {
  "@media (hover: hover) and (pointer: fine)": {
    "transition": "transform 180ms cubic-bezier(0.25, 1, 0.5, 1)"
  }
})

