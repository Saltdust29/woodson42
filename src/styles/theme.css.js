import { globalStyle } from '@vanilla-extract/css'

globalStyle(":root, :root[data-theme='paper']", {
  "colorScheme": "light",
  "--paper": "oklch(92.5% 0.022 83)",
  "--paper-deep": "oklch(87.5% 0.027 80)",
  "--paper-raised": "oklch(95.5% 0.016 83)",
  "--ink": "oklch(20.5% 0.018 62)",
  "--ink-soft": "oklch(36% 0.022 66)",
  "--ink-faint": "oklch(51% 0.025 69)",
  "--rule": "oklch(58% 0.025 73)",
  "--rule-soft": "oklch(78% 0.025 76)",
  "--accent": "oklch(47% 0.145 31)",
  "--accent-dark": "oklch(36% 0.115 30)",
  "--focus": "oklch(50% 0.15 31)",
  "--grain-opacity": "0.17"
})

globalStyle(":root[data-theme='ink']", {
  "colorScheme": "dark",
  "--paper": "oklch(18% 0.015 66)",
  "--paper-deep": "oklch(14.5% 0.014 62)",
  "--paper-raised": "oklch(22% 0.017 69)",
  "--ink": "oklch(89% 0.023 83)",
  "--ink-soft": "oklch(74% 0.025 81)",
  "--ink-faint": "oklch(61% 0.025 78)",
  "--rule": "oklch(45% 0.022 72)",
  "--rule-soft": "oklch(29% 0.019 70)",
  "--accent": "oklch(66% 0.135 35)",
  "--accent-dark": "oklch(76% 0.105 38)",
  "--focus": "oklch(72% 0.14 38)",
  "--grain-opacity": "0.08"
})

