## Weekly UI/UX Deep Dive — 2026-07-05

### Findings for CyberSec AI (cybersec-ai.xyz)

#### HIGH Severity
- **Missing robots meta on homepage and blog listing** — These pages lack `<meta name="robots" content="index, follow">`.
  - URL: https://cybersec-ai.xyz/, https://cybersec-ai.xyz/blog
  - Expected: `<meta name="robots" content="index, follow">`
  - Found: No robots meta tag
  - Note: Blog POSTS do have the robots meta tag correctly.

- **No about page exists** — /about, /about/, /about-us, /team all return 404. An about page is important for E-E-A-T signals and establishing site credibility.
  - URL: https://cybersec-ai.xyz/about
  - Expected: HTTP 200 with about content
  - Found: HTTP 404

#### MEDIUM Severity
- **og:image uses favicon.svg on all pages** — Social sharing images should be 1200x630 PNG/JPG. A small SVG favicon will render poorly on social platforms.
  - URL: All pages
  - Expected: `og-default.png` or similar 1200x630 image
  - Found: `https://cybersec-ai.xyz/favicon.svg`
  - Note: Blog posts correctly use R2-hosted hero images for og:image, but the fallback is still favicon.svg.

#### Passing Checks
- ✅ Homepage: title, viewport, canonical, og tags all present
- ✅ Blog listing: title unique, h1 matches content
- ✅ Blog posts: unique title per post, BlogPosting JSON-LD, robots meta, og:title/og:url per-URL
- ✅ Non-existent slugs properly return 404 (only blog in empire with correct behavior)
- ✅ All R2-hosted hero images return HTTP 200
