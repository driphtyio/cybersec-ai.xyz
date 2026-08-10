# Builder Brief: Writing Plan + Scoring Rubric — "Weekly Cybersecurity News Roundup — Aug 3–10, 2026"

**Output file (exact):** `/home/techgeek/cybersec-ai.xyz/src/content/blog/2026-08-10-news-roundup.md`
**Research source:** `/home/techgeek/cybersec-ai.xyz/research/2026-08-10-news-roundup-brief.md`
**Audience:** Security practitioners, IT admins, CISOs, security researchers who need a weekly digest.

This is the contract for the arena. Every constraint below is mandatory and will be checked by the rubric. When a constraint and your stylistic instinct conflict, **the constraint wins**.

---

## 1. POST ANGLE & SLUG

- **Angle:** "Weekly Cybersecurity News Roundup — Aug 3–10, 2026" — a practitioner-focused digest of the 5 biggest stories of the window, each with (a) what happened, (b) why it matters to defenders, (c) one concrete action to take.
- **Slug / filename:** `2026-08-10-news-roundup` → file `2026-08-10-news-roundup.md`
- **Primary long-tail keyword (must appear verbatim in title, description, or first paragraph):** "cybersecurity news this week August 2026"

**Required frontmatter (exact keys, YAML):**
```yaml
---
title: "Cybersecurity News This Week: Coldcard $130M Flaw, SCTPhantom Kernel Bug, Chrome 151 Criticals"
description: "Cybersecurity news this week (Aug 3-10, 2026): the Coldcard wallet entropy flaw drained $130M in Bitcoin, SCTPhantom threatens every Linux kernel, and Chrome 151 ships 6 critical fixes."
pubDate: 2026-08-10
tags: ["news-roundup", "cve", "patch-management", "kernel-security", "supply-chain-security"]
heroImage: ""
lastVerified: 2026-08-10
---
```
- Title must contain "Cybersecurity News This Week" (or the keyword) and name ≥2 of the week's stories. Description ≤ 160 characters. `heroImage` left empty — the image pipeline fills it from the HERO_IMAGE_PROMPT (Section 8).

---

## 2. REQUIRED SECTIONS (in exact order)

1. **Opening hook** (no heading — plain paragraph immediately after frontmatter, 50–80 words). Lead with the Coldcard story or a one-line summary of the week; include the keyword "cybersecurity news this week August 2026" naturally.
2. `## How This Was Verified` — the mandatory E-E-A-T block (40–60 words, self-contained; see Section 4 rule 3). State: primary sources = vendor/government advisories (DOJ, CISA KEV JSON feed, Google Chrome Releases, Galaxy Research); all source URLs curl-verified HTTP 200 on Aug 10, 2026; attacker attribution and exploitation claims are as-reported by researchers, not independently confirmed.
3. `## Coldcard Wallet Flaw: ~$130M in Bitcoin Drained` — Story 1 (hardware/entropy failure).
4. `## SCTPhantom (CVE-2026-64564): 18-Year-Old Linux Kernel Flaw` — Story 2.
5. `## Chrome 151: 41 Fixes, 6 Critical Memory-Safety Bugs` — Story 3.
6. `## Snowflake Extortion: Moucka Pleads Guilty, 165+ Victims` — Story 4.
7. `## CISA KEV: TeamCity and N-central Flaws Exploited in the Wild` — Story 5 (both CVEs).
8. `## Honorable Mentions` — 4–6 one-line bullets with inline links (Meta AI incident, RovoBlast, Shai-Hulud/ChainDrop npm worms, SonicWall SMA zero-days, Shelbit sanctions).
9. `## Defender Checklist: What to Do This Week` — 4–6 actionable numbered/bulleted items for practitioners.
10. `## FAQ` — lead paragraph (40–60 words) + exactly **3 question-shaped H3s** (see Section 4).
11. **HERO_IMAGE_PROMPT as the LAST line of the file** (Section 8) — nothing after it.

No other H2s. No "Sources"/"References" section at the end.

---

## 3. MUST-INCLUDE FACTS (every draft must contain these, correctly)

### Story 1 — Coldcard (source: Galaxy Research, Aug 7, 2026)
- ~**$130M** in Bitcoin drained; attacks began **July 30, 2026**.
- **1,082 BTC (~$70.2M)** swept from **1,196 addresses** in a single **41-minute window** by Aug 1; two more waves (~284 BTC) followed.
- **≥15 separate attackers** exploiting the flaw independently (Galaxy Research tracking).
- Root cause: firmware bug from a **March 2021 release** routed seed-generation entropy through a software fallback seeded by device-identifying data + timer/clock registers → effective entropy **~40 bits (Mk2/Mk3) or ~72 bits (Mk4/Q/Mk5)** instead of ~128 bits.
- **No physical access required**; attackers generated candidate seeds offline and matched addresses against the public blockchain.
- **200+ victims** have reported; one victim's cold-storage wallet (bank safe-deposit box) lost **18.25 BTC in 7 minutes**.
- Fix is **prospective only**: seeds created on vulnerable firmware remain permanently brute-forceable; users must migrate to newly generated seeds on patched hardware.
- Link: `https://www.galaxy.com/insights/research/your-keys-not-your-coins-coldcard-wallets-hacked-for-130m-and-counting` (+ optionally The Hacker News: `https://thehackernews.com/2026/08/coldcard-hardware-wallet-flaw-linked-to.html`)

### Story 2 — SCTPhantom (source: The Hacker News, Aug 7, 2026)
- **CVE-2026-64564**, CVSS 3.1 **9.8**; local LPE/container-escape path rated CVSS 4.0 **8.5**.
- Use-after-free in `sctp_process_asconf()` DEL-IP handling in `net/sctp/sm_make_chunk.c`; bug introduced in kernel **v2.6.25 (2008)** — every maintained SCTP-capable kernel in scope.
- Disclosed publicly **August 6, 2026** by **Tencent's Zhuque Lab**.
- Fixed upstream by commit **`9b2854f86f0b`** (v7.2-rc5); backported to **7.1.6, 6.18.42, 6.12.101, 6.6.148**, plus Debian trixie/sid, Proxmox VE, NixOS.
- **Still unpatched as of Aug 10** on kernel **6.1/5.15/5.10 LTS**, Debian bookworm/bullseye, **RHEL/Rocky 8/9/10**, Amazon Linux 2023.
- **No public exploit code** at reporting time (do NOT claim in-the-wild exploitation).
- Links: `https://thehackernews.com/2026/08/18-year-old-linux-sctp-flaw-could-let.html` and `https://github.com/suominen/sctphantom` (patch-status tracker)

### Story 3 — Chrome 151 (source: Chrome Releases blog, Aug 6, 2026)
- Shipped **August 6, 2026**: **151.0.7922.108/.109** (Windows/macOS), **151.0.7922.108** (Linux).
- **41 security fixes**, **6 rated Critical** — memory-safety bugs (UAF/out-of-bounds write) in Aura, WebGL, GPU: **CVE-2026-19137, CVE-2026-19149, CVE-2026-19154, CVE-2026-19157, CVE-2026-19170, CVE-2026-19172**.
- **12 of the 41** fixes came from external bug-bounty researchers.
- Separate Aug 1 fix: **CVE-2026-19153** (site-isolation enforcement gap in Workers).
- Links: `https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_01193673229.html` (+ optionally Forbes: `https://www.forbes.com/sites/daveywinder/2026/08/07/google-chrome-151-update-bounty-hunters-discover-12-new-security-bugs/`)

### Story 4 — Snowflake / Moucka (source: DOJ WD Washington, Aug 5, 2026)
- **Connor Riley Moucka, 26, Kitchener, Ontario** — pleaded guilty **August 5, 2026**, Seattle federal court.
- Compromised **≥165 cloud-storage customers** (Snowflake), **February–October 2024**; **billions of records**; data of **≥100 million individuals**.
- Extorted **$2.5M+ in ransoms**; Moucka personally kept **~$495K**; victim companies absorbed **$9.5M+** in direct losses.
- Data advertised on BreachForums, Exploit.in, XSS.is, Telegram.
- Guilty to **4 counts**; sentencing **October 27, 2026**; mandatory minimum 2 years, up to 30.
- Part of FBI's **Operation Riptide**; threat actor tracked as **UNC5537**; extradited from Canada July 2025.
- Link: `https://www.justice.gov/usao-wdwa/pr/canadian-pleads-guilty-hacking-us-cloud-storage-provider-and-extorting-its-customers` (+ optionally KrebsOnSecurity `https://krebsonsecurity.com/2026/08/canadian-man-pleads-guilty-in-snowflake-extortions/` or TechCrunch `https://techcrunch.com/2026/08/06/hacker-pleads-guilty-to-stealing-data-from-more-than-165-snowflake-customers/`)

### Story 5 — CISA KEV (source: CISA KEV catalog / JSON feed)
- **CVE-2026-63077** (added to KEV **Aug 5**, due Aug 8): CWE-502, CVSS **9.8**, **JetBrains TeamCity On-Premises before 2026.1.3 / 2025.11.7** — **unauthenticated RCE via the agent polling protocol**; patch plugin available for older versions.
- **CVE-2026-18577** (added to KEV **Aug 3**, due Aug 6): CWE-288 authentication bypass/account takeover in **N-able N-central**, all current versions incl. **2026.3** (hosted + on-prem); incomplete patch for **CVE-2026-18556**; active exploitation confirmed by N-able **Aug 2**; hotfix **2026.3.1.7** (+ second hotfix Aug 6).
- KEV JSON feed contains **1,662 entries**; listing makes remediation **binding for U.S. federal agencies under BOD 26-04**.
- Links: `https://www.cisa.gov/known-exploited-vulnerabilities-catalog`, `https://blog.jetbrains.com/teamcity/2026/07/cve-2026-63077/`, `https://www.huntress.com/blog/n-able-vulnerability-exploitation`, `https://nvd.nist.gov/vuln/detail/CVE-2026-63077`

### Honorable mentions (inline-link bullets; URLs as given in the brief — do NOT claim HTTP-200 verification for these)
- Meta AI model hacked another company during testing (Aug 6): `https://www.infosecurity-magazine.com/news/meta-ai-exploit-incident/`
- Atlassian "RovoBlast" Rovo AI data exfiltration (Aug 10): `https://www.infosecurity-magazine.com/news/rovoblast-atlassian-rovo-url/`
- Shai-Hulud / ChainDrop self-propagating npm supply-chain worms (Aug 4–7): `https://cyberpress.org/shai-hulud-npm-worm-returns/`
- SonicWall SMA zero-days (WebSocket request → root): `https://gbhackers.com/sonicwall-sma-zero-days/`
- US Treasury sanctions Iranian $6B crypto exchange Shelbit (Aug 10): `https://www.infosecurity-magazine.com/news/us-sanctions-iranian-6bn-crypto/`

**Rule:** every fact above that carries a number, date, CVE, or version MUST appear exactly as written. Do not round, alter, or "improve" figures. Story sections may only cite the URLs listed above (all curl-verified HTTP 200 on Aug 10, 2026).

---

## 4. WRITING CONSTRAINTS (hard requirements — these exist because past drafts were ambiguous)

1. **Word count:** 800–1200 words total (count everything from the opening hook through the last FAQ answer; frontmatter and HERO_IMAGE_PROMPT excluded). Target 950–1100.
2. **Citations:** ALL inline markdown links `[Source Name](URL)`. **NO `[1]`, `[2]` numbered references anywhere** — no bracketed footnote numbers, no superscripts, no end-of-post "References" list.
3. **Every H2** (including `How This Was Verified` and `FAQ`) must be immediately followed by a **40–60 word self-contained paragraph** that answers the section's implied question on its own (a reader skimming only that paragraph gets the story's core). Additional paragraphs under the same H2 are unrestricted in length. Count words carefully — 39 or 61 words is a fail.
4. **E-E-A-T block:** `## How This Was Verified` must appear directly after the opening hook (position 2 in Section 2), 40–60 words, and must name the primary-source types and the HTTP-200 verification method.
5. **FAQ:** exactly 3 H3s under `## FAQ`, each phrased as a question ending in `?` (e.g., "Which Coldcard users need to act immediately?", "Is my Linux kernel affected by CVE-2026-64564?", "What does a CISA KEV listing mean for non-federal organizations?"). Each answer 50–90 words, self-contained.
6. **HERO_IMAGE_PROMPT:** the literal last line of the file must be `HERO_IMAGE_PROMPT: <prompt>` — see Section 8. Nothing (not even a newline of prose) after it.
7. **External authority links:** ≥2 of the verified primary URLs (DOJ, CISA, Chrome Releases, Galaxy Research, JetBrains, Huntress, NVD, THN, GitHub tracker) in the body — story sections will naturally exceed this.
8. **Internal contextual links:** exactly 3–4 internal links (2–5 per 1000 words) to EXISTING pages only. Approved targets: `/blog/2026-08-03-news-roundup/` (last week's roundup), `/blog/2026-08-08-cve-analysis/`, `/blog/2026-08-04-api-security-hardening/`, `/blog/2026-07-27-ai-news-roundup/`, `/cves/`, `/frameworks/`. Do not invent slugs. Place at least one internal link in the Defender Checklist section.
9. **Tone:** plain, expert, direct. Short sentences. No marketing voice, no second person plural "we at this blog", no exclamation marks in body copy.
10. **No HTML** in the body except markdown links; use standard markdown (`##`, `###`, `-`, `1.`, `**bold**`).

### Suggested word budget (sum ≈ 950–1100)
| Section | Words |
|---|---|
| Opening hook | 50–80 |
| How This Was Verified | 40–60 |
| 5 story sections (40–60 lead + 40–80 detail each) | 450–620 |
| Honorable Mentions | 60–80 |
| Defender Checklist | 80–110 |
| FAQ (lead + 3 Q&As) | 170–220 |

---

## 5. SCORING RUBRIC (weighted, 0–10 per criterion)

| Criterion | Weight | What it measures |
|-----------|--------|------------------|
| Accuracy | 30% | Factual correctness against the brief: every number, CVE ID, date, version, and dollar amount matches Section 3 exactly; no invented claims (no un-sourced exploitation claims, no "all devices affected" overreach, Coldcard fix correctly described as prospective-only). |
| Sourcing | 25% | Real, verifiable URLs (the verified list from the brief), inline `[Name](URL)` links only, no `[N]` numbered citations, no dead/fabricated URLs, ≥2 authority links, 3–4 real internal links to existing slugs. |
| Quality | 20% | Clear, skimmable writing; all required sections present in order; E-E-A-T block present; FAQ with 3 question-shaped H3s; every H2 followed by a 40–60 word self-contained paragraph; word count 800–1200; HERO_IMAGE_PROMPT is the last line. |
| Practicality | 15% | Actionable defender guidance: each story maps to a concrete action (patch, inventory, migrate seeds, enforce MFA), and the Defender Checklist is specific and executable, not generic ("stay vigilant"). |
| Engagement | 10% | Compelling title and hook that make a busy practitioner want to read; story order and transitions hold attention; FAQ answers real questions the audience would ask. |

**Scoring anchors:** 8–10 = exceeds on all checks of the criterion; 5–7 = meets the letter but with minor slips (one wrong figure, one unverified URL, one off-spec paragraph); 0–4 = missing required elements, wrong facts, or structural failures. **Weighted total = Σ(score × weight), rounded to 1 decimal.** A hard floor: any draft that fabricates a fact, uses `[N]` citations, omits the E-E-A-T block, or misses the 800–1200 word window by >10% is capped at 7.0 regardless of other scores.

---

## 6. ANTI-PATTERNS TO AVOID (automatic deductions)

**Language (AI-slop, -0.5 each occurrence, max -2):** "delve", "landscape", "in today's fast-paced world", "it's important to note", "it's worth noting", "game-changer", "robust", "cutting-edge", "seamless", "ever-evolving", "crucial", "Furthermore," / "Moreover," as sentence openers, "stay tuned", "in conclusion", "navigate the complexities", "in the realm of", "unprecedented" (unless literally true of the $130M heist).

**Fabrication / accuracy (fail-level):**
- Inventing exploit-in-the-wild claims (SCTPhantom had NO public exploit at reporting time — do not claim otherwise).
- Altering numbers, dates, CVE IDs, CVSS scores, or versions from Section 3.
- Claiming the Coldcard fix "patches" affected wallets — it is prospective only; affected seeds stay compromised forever.
- Claiming any URL was "verified" beyond the 10 URLs in the brief's verification log (honorable-mention URLs were not curl-verified).
- Saying "we tested/confirmed this exploit" or any fake hands-on testing claim.

**Format (fail-level unless fixed):**
- Any `[N]` numbered citation or end-of-post references list.
- Missing H2s, wrong H2 order, H3s used outside FAQ, FAQ questions not ending in `?`.
- Any H2 whose first paragraph falls outside 40–60 words.
- HERO_IMAGE_PROMPT missing, not the last line, or appearing twice.
- Frontmatter missing keys, wrong `pubDate` (must be 2026-08-10), or `tags` not an array.
- Raw URLs pasted as plain text instead of markdown links.

**Other:**
- Copying sentences verbatim from the brief or source pages (paraphrase).
- Internal links to slugs that don't exist in `src/content/blog/` or the approved list.
- Clickbait title that names stories not in the post, or emoji in title/body.
- Exclamation marks in body copy; marketing superlatives ("blows everything else away").
- "As of August 2026" vagueness — always use exact dates (Aug 3, Aug 5, Aug 6, etc.).
- Leaving the FAQ out, or fewer than 2 / more than 3 FAQ H3s.
- Word count outside 800–1200 (excluding frontmatter + HERO_IMAGE_PROMPT).

---

## 7. DELIVERY CHECKLIST (builders verify before submitting)

- [ ] File saved at `src/content/blog/2026-08-10-news-roundup.md`
- [ ] Frontmatter matches Section 1 exactly (pubDate 2026-08-10)
- [ ] Word count (hook → end of FAQ) within 800–1200
- [ ] All Section 3 facts present with exact figures
- [ ] Every citation is inline `[Name](URL)`; zero `[N]`
- [ ] Every H2 has a 40–60 word first paragraph (verify by counting)
- [ ] "How This Was Verified" is the first H2 after the hook
- [ ] FAQ: exactly 3 question-shaped H3s
- [ ] 3–4 internal links from the approved list; ≥2 authority links
- [ ] HERO_IMAGE_PROMPT is the literal last line
- [ ] No anti-pattern words or fabricated claims

---

## 8. HERO_IMAGE_PROMPT (use verbatim as the last line of the post)

`HERO_IMAGE_PROMPT: Wide 16:9 cinematic cybersecurity newsroom scene, dark command-center desk at night with three monitors showing a plunging Bitcoin wallet-drain chart, a Linux kernel code diff, and a red CISA KEV alert banner; a Chrome browser window and a hardware wallet in the foreground; photorealistic, teal-and-red rim lighting, shallow depth of field, high detail, no text artifacts`
