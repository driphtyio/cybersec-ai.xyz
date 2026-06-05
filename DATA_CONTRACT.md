# Data Contract — Astro Blog Repo

This file defines which files are **system code** (safe to auto-update via git pull or build tooling) and which are **user data** (never touched by automated processes).

## User Layer (NEVER auto-updated)

Your content, images, and personal customizations. No automated process may modify these.

| Path | Purpose |
|------|---------|
| `src/content/blog/*.md`, `src/content/posts/*.md` | Blog post content (markdown) |
| `src/content/` (all subdirectories) | Content collections |
| `public/images/` | Feature images, inline images, media |
| `public/favicon*`, `public/robots.txt` | Site identity files |
| `public/*.pdf`, `public/CNAME` | Static assets you own |
| `src/data/` | Site data files (authors, metadata) |
| `.env`, `.env.*` | Environment variables and secrets |

## System Layer (safe to auto-update)

Framework, components, config, and build tooling. These can be replaced safely.

| Path | Purpose |
|------|---------|
| `src/components/` | Astro/Vue/React components |
| `src/layouts/` | Page layouts |
| `src/styles/` | CSS, Tailwind config |
| `src/pages/` | Route pages |
| `src/lib/`, `src/utils/` | Utility code |
| `astro.config.mjs`, `tailwind.config.*` | Build configuration |
| `package.json`, `tsconfig.json` | Dependencies |
| `src/content/config.ts` | Content collection schemas |
| `public/js/`, `public/css/` (if generated) | Compiled assets |
| `netlify.toml`, `wrangler.toml`, `vercel.json` | Deploy configuration |

## The Rule

**User Layer files are your writing and media. System files are the engine. Engines can be upgraded; writing is never rewritten.**
