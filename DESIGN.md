---
version: alpha
name: nocodeinsider-design
description: "A dark-theme no-code automation blog anchored on deep charcoal canvas (#0d0d12) with green accent (#22c55e) as the single chromatic signature. The system reads as approachable, step-by-step guidance: friendly but professional. The green accent appears on links, CTAs, callout borders, and success indicators. Page rhythm relies on screenshots, flow diagrams, and tool interface captures rather than code blocks. Typography uses Inter for readability across devices."

colors:
  primary: "#22c55e"
  primary-hover: "#34d96a"
  primary-muted: "#22c55e33"
  ink: "#e8e8ed"
  ink-muted: "#a0a0b0"
  ink-subtle: "#6b6b7b"
  ink-tertiary: "#4a4a58"
  canvas: "#0d0d12"
  surface-1: "#14141b"
  surface-2: "#1a1a23"
  surface-3: "#1e1e28"
  surface-card: "#16161f"
  hairline: "#23232e"
  hairline-strong: "#2a2a36"
  inverse-canvas: "#ffffff"
  inverse-surface-1: "#f5f5f7"
  inverse-ink: "#000000"
  semantic-success: "#22c55e"
  semantic-warning: "#eab308"
  semantic-error: "#ef4444"
  semantic-info: "#3b82f6"
  accent-blue: "#3b82f6"
  accent-orange: "#f97316"

typography:
  display-xl:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.8px
  display-lg:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: -0.4px
  display-md:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: -0.2px
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.28
    letterSpacing: 0px
  subheadline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.32
    letterSpacing: 0px
  body-lg:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.70
    letterSpacing: 0px
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0px
  body-sm:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0px
  code:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0px
  code-sm:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0px

spacing:
  section: 56px
  card-padding: 20px
  content-gap: 18px
  element-gap: 10px
  inline-gap: 6px

border-radius:
  sm: 6px
  md: 10px
  lg: 14px
  xl: 18px
  full: 9999px

shadows:
  card: "0 2px 8px rgba(0,0,0,0.25)"
  elevated: "0 4px 16px rgba(0,0,0,0.35)"
  modal: "0 8px 32px rgba(0,0,0,0.45)"

design-principles:
  - "Dark-first: default to dark backgrounds, light text"
  - "Green as single accent: success-oriented, growth-focused"
  - "Screenshots-first: tool interface captures and flow diagrams over code blocks"
  - "Accessible reading: 15px body text, generous line-height, clear step numbering"
  - "Friendly professionalism: approachable tone but credible tool recommendations"
  - "Step-by-step clarity: every tutorial must have numbered steps with screenshots"

anti-patterns:
  - "No purple gradients — green accent only"
  - "No indigo hero sections — green on dark canvas is the signature"
  - "No sans-serif-only typography — body uses Inter, display can go warmer"
  - "No left-border accent cards in purple/indigo — use green border if needed"
  - "No blue→cyan trust gradients — use flat green or neutral surface"
  - "No emoji as UI icons — use SVG icons or Unicode symbols sparingly"
  - "No placeholder/lorem images — always use real tool screenshots"
  - "No over-engineered SVG blobs — keep illustrations simple and functional"
  - "No fabricated stats or projections — every figure needs a source citation"
  - "No AI-writing tics ('delve into', 'comprehensive guide', 'landscape of') — write direct plain language"
