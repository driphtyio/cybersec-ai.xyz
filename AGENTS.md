# CyberSec AI — Agent Instructions

## Directory Guide

| File | Purpose |
|------|---------|
| `DESIGN.md` | Brand design system (colors, typography, spacing) — read before designing pages |

## Task Workflow (for any cron or manual session)

1. **Read** — Load the relevant skill(s): content-pipeline, static-blog, blog-empire. Also check for per-repo skills: `python3 ~/.local/bin/repo-skills-loader.py .`
2. **Check** — `python3 ~/.local/bin/quality-ratchet.py --check cybersecai` to verify quality floor
3. **Write** — Create the post following the Content + Style sections below
4. **Verify** — URLs work, citations are real, no placeholder text (TODO/FIXME)
5. **Deploy** — `bash ~/.hermes/scripts/deploy-cybersecai.sh` — if it fails, read the error and fix
6. **Confirm** — `curl -sL https://cybersec-ai.xyz/blog/ | grep -c "post-slug"` returns ≥1

## Failure Modes

| Symptom | Root Cause | Cause | Fix |
|---------|-----------|-------|-----|
| Build error | Frontmatter schema mismatch — Astro silently drops files that don't match config | Missing import, broken frontmatter | Check `npm run build` output |
| Deploy blocked (no changes) | CI checks `git diff --cached` — new files need explicit staging | `git add -A` not run before diff | Run `git add -A && git diff --cached --quiet` |
| Quality gate blocked | New post below blog floor for word count or citations | Content metrics dropped below floor | Improve post (add citations, word count) |

## Commands

- `npm run dev` — Start local dev server
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally

### Command Output (keep it quiet)

See `~/.hermes/AGENTS-BASE.md` — shared across all blogs.

## Deploy

Run `bash ~/.hermes/scripts/deploy-cybersecai.sh` — runs quality check, builds, and deploys to Cloudflare Pages.

If deploy is blocked:
- New untracked post → `git add -A && git diff --cached --quiet`
- Build error → check `npm run build` output

## Content

Blog posts live in `src/content/blog/` as `.md` files.
Post frontmatter: `title`, `description`, `pubDate`, `tags`, `heroImage` (mandatory).

## Quality Gates (MANDATORY)

## Quality Gates (MANDATORY)

See `~/.hermes/AGENTS-BASE.md` — shared quality gates apply to all blogs. Blog-specific gates below.
## Validation Matrix

See `~/.hermes/AGENTS-BASE.md` — shared across all blogs.

## Stability Guardrails

See `~/.hermes/AGENTS-BASE.md` — shared across all blogs.

## Anti-Patterns (DON'T)

- Don't fabricate tool compatibility claims. Test or cite.
- Don't write posts under 400 words.
- Don't skip the deploy guard.
- Don't reference yourself ("as an AI").
- **Don't silently degrade quality** — A broken image, a failed quality check, or a missing citation must halt deployment. Never ship degraded content to meet a schedule.

## Anti-Rationalization Rules

See `~/.hermes/AGENTS-BASE.md` — shared across all blogs.
