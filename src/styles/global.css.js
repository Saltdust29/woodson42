import { globalStyle, keyframes } from '@vanilla-extract/css'

globalStyle("*", {
  "boxSizing": "border-box"
})

globalStyle("html", {
  "minWidth": "20rem",
  "scrollBehavior": "smooth",
  "background": "var(--paper-deep)",
  "color": "var(--ink)",
  "fontFamily": "'Newsreader', 'Iowan Old Style', 'Baskerville', 'Times New Roman', serif",
  "fontKerning": "normal",
  "textRendering": "optimizeLegibility"
})

globalStyle("body", {
  "minHeight": "100dvh",
  "margin": "0",
  "background": "var(--paper-deep)",
  "color": "var(--ink)"
})

globalStyle("body::before", {
  "position": "fixed",
  "zIndex": "20",
  "inset": "0",
  "pointerEvents": "none",
  "opacity": "var(--grain-opacity)",
  "backgroundImage": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E\")",
  "content": "''",
  "mixBlendMode": "multiply"
})

globalStyle("::selection", {
  "background": "var(--accent)",
  "color": "var(--paper-raised)"
})

globalStyle("a", {
  "color": "inherit",
  "textDecorationThickness": "0.065em",
  "textUnderlineOffset": "0.18em"
})

globalStyle("button, input", {
  "font": "inherit"
})

globalStyle("button, a", {
  "WebkitTapHighlightColor": "transparent"
})

globalStyle("button:focus-visible, a:focus-visible, input:focus-visible", {
  "outline": "2px solid var(--focus)",
  "outlineOffset": "4px"
})

globalStyle(".sr-only", {
  "position": "absolute",
  "width": "1px",
  "height": "1px",
  "padding": "0",
  "overflow": "hidden",
  "clip": "rect(0, 0, 0, 0)",
  "whiteSpace": "nowrap",
  "border": "0"
})

globalStyle(".skip-link", {
  "position": "fixed",
  "zIndex": "100",
  "top": "0.75rem",
  "left": "0.75rem",
  "padding": "0.75rem 1rem",
  "transform": "translateY(-180%)",
  "background": "var(--ink)",
  "color": "var(--paper)",
  "fontFamily": "'Archivo Narrow', sans-serif",
  "textTransform": "uppercase",
  "transition": "transform 180ms cubic-bezier(0.25, 1, 0.5, 1)"
})

globalStyle(".skip-link:focus", {
  "transform": "translateY(0)"
})

globalStyle("html", {
  "@media (prefers-reduced-motion: reduce)": {
    "scrollBehavior": "auto !important"
  }
})

globalStyle("*, *::before, *::after", {
  "@media (prefers-reduced-motion: reduce)": {
    "animationDuration": "0.01ms !important",
    "animationDelay": "0ms !important",
    "scrollBehavior": "auto !important",
    "transitionDuration": "0.01ms !important"
  }
})

export const reveal = keyframes({
  "from": {
    "transform": "translateY(1.25rem)",
    "opacity": "0"
  },
  "to": {
    "transform": "translateY(0)",
    "opacity": "1"
  }
})

