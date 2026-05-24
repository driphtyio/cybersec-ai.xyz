# NoCode Insider — Agent Instructions

## Task Workflow (for any cron or manual session)

1. **Read** — Load the relevant skill(s): content-pipeline, static-blog, blog-empire
2. **Check** — `python3 ~/.local/bin/quality-ratchet.py --check nocodeinsider` to verify quality floor
3. **Write** — Create the post following the Content + Style sections below
4. **Verify** — URLs work, citations are real, no placeholder text (TODO/FIXME)
5. **Deploy** — `bash ~/.hermes/scripts/deploy-ni.sh` — if it fails, read the error and fix
6. **Confirm** — `curl -sL https://nocodeinsider.com/blog/ | grep -c "post-slug"` returns ≥1

## Failure Modes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Build error | Missing import, broken frontmatter | Check `npm run build` output |
| Deploy blocked (no changes) | `git add -A` not run before diff | Run `git add -A && git diff --cached --quiet` |
| Quality gate blocked | Content metrics dropped below floor | Improve post (add citations, word count) |

## Commands

- `npm run dev` — Start local dev server
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally

## Deploy

Run `bash ~/.hermes/scripts/deploy-ni.sh` — runs quality check, builds, and deploys to Cloudflare Pages.

If deploy is blocked:
- New untracked post → `git add -A && git diff --cached --quiet`
- Build error → check `npm run build` output

## Content

Blog posts live in `src/content/blog/` as `.md` files.
Post frontmatter: `title`, `description`, `pubDate`, `tags`, `heroImage` (optional).

## Quality Gates (MANDATORY)

1. **No unsourced stats** — Tool pricing, feature counts, and automation metrics need sources.
2. **Minimum length** — Posts under 400 words are skipped.
3. **Deploy guard** — Always `git add -A` before diff check.

## Anti-Patterns (DON'T)

- Don't fabricate tool compatibility claims. Test or cite.
- Don't write posts under 400 words.
- Don't skip the deploy guard.
- Don't reference yourself ("as an AI").
- **Don't silently degrade quality** — A broken image, a failed quality check, or a missing citation must halt deployment. Never ship degraded content to meet a schedule.

## Anti-Rationalization Rules (from addyosmani/agent-skills)

The following thoughts are incorrect and must be ignored:
- "This post is too short for quality checks"
- "I can just write this quickly without loading a skill"
- "I'll verify the claims after publishing"
- "The outline is obvious, I don't need to write it down"

Correct behavior: always load the relevant skill(s) first, always run quality checks before deploy, always verify claims before shipping.

## Style

- Dark theme with green accent
- Focus: AI workflow automation for non-developers
- Real tool names, step-by-step instructions, screenshots
- Headings: Sentence case.
