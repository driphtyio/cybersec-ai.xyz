# DATA_CONTRACT — NoCode Insider

This document defines which files belong to the **system** (auto-updatable by content pipeline crons) and which belong to the **site** (manually maintained, never overwritten by automation).

## Updated By Content Pipeline (safe to overwrite)

| File/Pattern | Purpose |
|---|---|
| `src/content/blog/*.md` | Published blog posts — created/updated by content pipeline crons |
| `public/images/*` | Feature images and asset images — written by image generation scripts |

## NEVER Auto-Updated (manual changes only)

| File/Pattern | Purpose |
|---|---|
| `src/components/*` | Astro UI components |
| `src/layouts/*` | Page layout templates |
| `src/pages/*` | Route pages |
| `src/styles/*` | Global CSS and design tokens |
| `src/assets/*` | Brand fonts, design assets |
| `src/content/config.ts` | Content collection schema |
| `astro.config.mjs` | Astro build configuration |
| `package.json` | Dependencies and scripts |
| `DESIGN.md` | Brand design system documentation |
| `AGENTS.md` | Agent instructions |
| `DATA_CONTRACT.md` | This file |
| `public/favicon.*` | Favicon and browser icons |
| `public/robots.txt` | Crawler configuration |

## Build Artifacts (gitignored — never committed)

| File/Pattern | Purpose |
|---|---|
| `dist/*` | Build output |
| `node_modules/*` | Dependencies |

## The Rule

**Files in the "Updated By Content Pipeline" table may be created, modified, or replaced by automation at any time.** Do not make manual edits in these locations — they will be overwritten.

**Files in the "NEVER Auto-Updated" table will never be touched by automation.** Manual changes are safe here.

**If a cron job needs to write somewhere not listed in the "Updated" table, a contract amendment must be made first.**
