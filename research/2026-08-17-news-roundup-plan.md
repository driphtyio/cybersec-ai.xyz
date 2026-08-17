# Builder Brief: Content Plan + Scoring Rubric — "Cybersecurity News Roundup — Aug 10–17, 2026"

**Output file (exact):** `/home/techgeek/cybersec-ai.xyz/src/content/blog/2026-08-17-news-roundup.md`
**Slug:** `2026-08-17-news-roundup` · **pubDate:** 2026-08-17 (Monday)
**Audience:** IT pros and security analysts who want data-driven coverage with sources.
**Word count:** 800–1500 hard bounds; target 1100–1400.
**Builders:** DeepSeek V4 Flash / MiMo V2.5 / Poolside Laguna S 2.1 — all three MUST produce the same section skeleton, same H2 texts, same facts, same URLs.

This is the contract for the arena. Every constraint below is mandatory and will be checked by the rubric. When a constraint and your stylistic instinct conflict, **the constraint wins**.

---

## 1. POST ANGLE

- **Lead story:** Metabase CVE-2026-72898 (CVSS 10.0 SQL injection, 0-day, in CISA KEV, breached 5 companies and exposed their connected database credentials).
- **Why it leads:** highest severity of the week (10.0); actively exploited 0-day with confirmed breaches; targets a widely used self-hosted BI tool that IT teams actually run; ships concrete minimum safe releases defenders can act on today; has a specific log signature defenders can hunt for. It also anchors the long-tail keyword (Section 6).
- **One-sentence thesis (for internal framing only, do not print verbatim):** "The week of August 10–17 showed that exposed services — Metabase, macOS Screen Sharing, Cisco SSL VPN — are the attack surface of record, with two CVSS 10.0 flaws and a Microsoft zero-day all demanding patches within days of disclosure."
- **Do NOT re-cover** last week's roundup stories (Coldcard wallet, SCTPhantom, Chrome 151, Snowflake plea, TeamCity/N-central). They may appear only as a one-line cross-link to the Aug 10 roundup.

**Required frontmatter (exact keys, YAML):**
```yaml
---
title: "Metabase Security Vulnerability Patch: CVE-2026-72898 Guide"
description: "Metabase security vulnerability patch guidance for defenders: what the critical flaw does, which versions are safe, plus this week's top CVEs and a checklist."
pubDate: 2026-08-17
tags: ["news-roundup", "cve", "metabase", "patch-tuesday", "patch-management", "vpn-security"]
heroImage: ""
lastVerified: 2026-08-17
---
```
- `heroImage` left empty — the image pipeline fills it from the HERO_IMAGE_PROMPT line (Section 2, item 13).
- The `description` above is 157 chars — use it verbatim (or any 150–160 char prose variant with NO numbers/stats).

---

## 2. REQUIRED SECTIONS (in EXACT order — do not reorder, do not rename)

| # | Section | Content rules |
|---|---------|---------------|
| 1 | **YAML frontmatter** | As above. |
| 2 | **Opening hook** — no heading, plain paragraph right after frontmatter | 40–55 words (hard cap 60). MUST contain the exact phrase **"Metabase security vulnerability patch"** within the first 50 words. One line cross-link to last week: `[last week's roundup](/blog/2026-08-10-news-roundup/)`. |
| 3 | `## How This Was Verified` | 70–90 words. E-E-A-T block. MUST state: (a) sources = vendor advisories and primary reporting (Metabase official blog, Tenable, SecurityAffairs, SecurityWeek, Dutch NCSC, Cisco advisory); (b) what was verified = dates, CVSS scores, affected versions, patch releases, and HTTP 200 checks on every source URL on 2026-08-17; (c) what was NOT independently confirmed = exploit-impact and attribution claims beyond vendor/primary reporting, breach counts beyond published reports, and nothing here was reproduced in a lab; (d) freshness line verbatim: **"Last verified: August 2026"**. |
| 4 | `## Metabase CVE-2026-72898: CVSS 10 SQL Injection, Exploited in the Wild` | 40–60 word self-contained answer paragraph immediately under the H2 (what happened + what to do, skimmable alone), then 120–160 word body. |
| 5 | `## Microsoft Patch Tuesday: 398 CVEs, One Zero-Day Exploited` | 40–60 word answer paragraph, then 90–130 word body. |
| 6 | `## SAP Commerce Cloud CVE-2026-58231: CVSS 10, Patches Out` | 40–60 word answer paragraph, then 80–120 word body. |
| 7 | `## macOS Screen Sharing CVE-2026-65400: Root Access via Port 5900` | 40–60 word answer paragraph, then 80–120 word body. |
| 8 | `## Cisco ASA/FTD CVE-2026-20349: VPN DoS on the KEV List` | 40–60 word answer paragraph, then 60–90 word body. |
| 9 | `## Honorable Mentions` | 1–2 sentence lead-in (15–25 words) + EXACTLY 6 bullets (facts in Section 3.6). |
| 10 | `## Defender Checklist: What to Do This Week` | 1–2 sentence lead-in (15–25 words) + 5–6 numbered actions (Section 3.7). MUST contain internal links to `/frameworks/` and `/scan/`. |
| 11 | `## FAQ` | EXACTLY 3 question-shaped H3s (verbatim texts in Section 3.8), each with a 40–60 word answer. MUST contain an internal link to `/cves/` in one answer. |
| 12 | `## How Do I Patch the Metabase Security Vulnerability (CVE-2026-72898)?` | Question-shaped long-tail H2 (verbatim). 40–60 word answer paragraph (recommended even though this H2 is exempt from the strict rule). |
| 13 | **HERO_IMAGE_PROMPT line** | The VERY LAST line of the file, single line, format: `HERO_IMAGE_PROMPT: <one-sentence image description>` — e.g. a security-operations dashboard / CVE monitor visual. This line is stripped before publishing; it must appear nowhere else in the draft. |

**Answer-paragraph rule (owner-mandated):** every story H2 (items 4–8) opens with a 40–60 word self-contained answer paragraph — a mini-TL;DR that states what happened and the one action to take, so a skimmer gets the essentials without reading the body. Interpretation for non-story H2s: Honorable Mentions and Defender Checklist get a 1–2 sentence lead-in; FAQ's H2 is followed directly by its H3s (answers live under the H3s); the long-tail H2 gets a 40–60 word answer.

---

## 3. MUST-INCLUDE FACTS (verbatim — do not change, drop, or add)

Every fact below is curl-verified (HTTP 200 on 2026-08-17). **MUST NOT be changed or dropped:** all CVE identifiers, CVSS scores, dates, version strings, patch release numbers, KEV statuses, and counts. **Do NOT add any fact not listed here** (no invented patch versions for Cisco/SAP, no invented URLs, no extra zero-days, no new numbers).

### 3.1 Metabase CVE-2026-72898 (Story 1)
- CVE-2026-72898, **CVSS 10.0**, unauthenticated **SQL injection via `POST /api/session/reset_password`**.
- 0-day used against **Metabase Cloud**; affects **self-hosted v1.58+**.
- Minimum safe releases (MUST list all six, verbatim): **0.58.24, 0.59.21, 0.60.17, 0.61.11, 0.62.9, 0.63.5**.
- Attack pattern in logs (MUST state): a `reset_password` request returning **400** followed by `GET /api/user/current` returning **200**.
- Impact (MUST state): full admin access, steal connected-database credentials, export data.
- Added to **CISA KEV Aug 11, 2026**.
- Breached **5 companies**, exposing **all connected database credentials** (TechTimes reporting — attribute in prose as "TechTimes reported"; do NOT invent a TechTimes URL; if a link is needed for the sentence, anchor it to the Metabase official URL).
- Citation: [Metabase Security Update](https://www.metabase.com/blog/security-update).

### 3.2 Microsoft Patch Tuesday (Story 2)
- Patch Tuesday **Aug 11, 2026**: **398 CVEs** — **42 critical / 355 important / 1 moderate**.
- **3 zero-days, 1 exploited in the wild** (MUST NOT claim all three were exploited).
- **CVE-2026-68820**: use-after-free in **Windows Ancillary Function Driver for WinSock (`afd.sys`)**, **CVSS 7.0**, local privilege escalation to **SYSTEM**, linked to **Lazarus Group / North Korean actors**.
- **CVE-2026-62878**: **wormable DNS RCE** needing immediate attention.
- Citations: [Tenable Blog](https://www.tenable.com/blog/microsofts-august-2026-patch-tuesday-addresses-398-cves-cve-2026-68820) and [SecurityAffairs](https://securityaffairs.com/197048/security/microsoft-patch-tuesday-for-august-2026-fixed-a-zero-day-and-wormable-rce.html).

### 3.3 SAP Commerce Cloud CVE-2026-58231 (Story 3)
- **CVE-2026-58231**, **CVSS 10**, insufficient authorization checks + input validation → **arbitrary code execution**.
- SAP announced patches **Aug 11, 2026**.
- **Defused honeypots** saw exploitation attempts **Aug 14**; **no public PoC at first sighting**; PoC available **Aug 15** (per KEVIntel).
- **NOT yet in CISA KEV** — MUST state this; do NOT claim it is listed.
- Citation: [SecurityWeek](https://www.securityweek.com/critical-sap-commerce-cloud-vulnerability-exploited-3-days-after-disclosure/).

### 3.4 macOS Screen Sharing CVE-2026-65400 (Story 4)
- **CVE-2026-65400**, high-severity **auth bypass in Screen Sharing** — remote login without valid credentials.
- Apple patched **Aug 6, 2026** in **macOS Tahoe 26.6.1, Sequoia 15.7.9, Sonoma 14.8.9** (MUST list all three, verbatim).
- **Dutch NCSC** advisory **ncsc-2026-0280** reported in-the-wild exploitation on systems with **port 5900** exposed.
- Attackers gain **root** and install a **Monero miner**.
- **~40,000** internet-exposed macOS systems with Screen Sharing enabled (osxreverser, Aug 8).
- Citations: [SecurityWeek macOS Report](https://www.securityweek.com/recent-macos-screen-sharing-vulnerability-exploited-in-attacks/) and [Dutch NCSC Advisory ncsc-2026-0280](https://advisories.ncsc.nl/2026/ncsc-2026-0280.html).

### 3.5 Cisco ASA/FTD CVE-2026-20349 (Story 5)
- **CVE-2026-20349**, **CVSS 8.6**, Remote Access **SSL VPN service DoS** — unauthenticated remote attacker can cause **device reload**.
- Exploited in the wild; **added to CISA KEV** (MUST state).
- Do NOT invent a fixed-release version number (none in the verified facts) — say "patch per the Cisco advisory".
- Citation: [Cisco Security Advisory](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-vpn-dos-dzv4mQFF).

### 3.6 Honorable Mentions (exactly 6 bullets, facts verbatim)
1. **VMware vCenter CVE-2026-59309** — CVSS 9.8 unauthenticated Directory Service bypass, "in attackers' crosshairs".
2. **Microsoft SharePoint CVE-2026-55040** — exploited shortly after PoC release.
3. **Progress Kemp LoadMaster CVE-2026-8037** — added to KEV after **792 exploit attempts**.
4. **TrueConf supply-chain breach** — client installers trojanized with **PhantomCore / PhantomGraph** backdoors.
5. **RingCentral breach** — ~**1.6M** impacted.
6. **French tax authority breach** — **680,000** impacted.

### 3.7 Defender Checklist (5–6 numbered actions — concrete, versioned, no vague items)
1. **Patch Metabase now** — upgrade to a minimum safe release (0.58.24, 0.59.21, 0.60.17, 0.61.11, 0.62.9, or 0.63.5, depending on your line).
2. **Hunt for the Metabase attack signature in logs** — `reset_password` returning 400 followed by `GET /api/user/current` returning 200; on a match, assume compromise: rotate all connected database credentials, revoke admin sessions, export an audit trail.
3. **Apply Microsoft August Patch Tuesday updates**, prioritizing **CVE-2026-68820** (afd.sys EoP) and the wormable DNS RCE **CVE-2026-62878**.
4. **Harden macOS Screen Sharing** — patch to Tahoe 26.6.1 / Sequoia 15.7.9 / Sonoma 14.8.9 and close or firewall **port 5900**.
5. **Update Cisco ASA/FTD** per the Cisco advisory to close the SSL VPN DoS **CVE-2026-20349** (no fixed version number exists in the verified facts — do not invent one).
6. **Apply SAP Commerce Cloud patches for CVE-2026-58231** — treat any internet-reachable Commerce Cloud as exposed (it is NOT yet in CISA KEV, so your own patching cadence is the only control).

### 3.8 FAQ — exactly 3 H3s, verbatim texts, each answer 40–60 words
- `### What is CVE-2026-72898?`
- `### Which Metabase versions are safe to use?` (answer MUST list all six minimum safe releases)
- `### How do I know if my Metabase was exploited?` (answer MUST include the 400 → 200 log signature)
- One FAQ answer MUST contain the internal link `/cves/`.

---

## 4. SOURCE URLS (the ONLY URLs allowed)

Builders MUST cite inline as `[Source Name](url)` and MUST NOT use any URL outside this list. Do not invent URLs (no TechTimes link, no cisa.gov link, no CVE.org links). KEV-status facts are stated without citation or cited via the story's main allowed source.

| Story / use | Citation text (exact) | URL |
|---|---|---|
| Metabase | `[Metabase Security Update]` | https://www.metabase.com/blog/security-update |
| Microsoft | `[Tenable Blog]` | https://www.tenable.com/blog/microsofts-august-2026-patch-tuesday-addresses-398-cves-cve-2026-68820 |
| Microsoft | `[SecurityAffairs]` | https://securityaffairs.com/197048/security/microsoft-patch-tuesday-for-august-2026-fixed-a-zero-day-and-wormable-rce.html |
| SAP | `[SecurityWeek]` | https://www.securityweek.com/critical-sap-commerce-cloud-vulnerability-exploited-3-days-after-disclosure/ |
| macOS | `[SecurityWeek macOS Report]` | https://www.securityweek.com/recent-macos-screen-sharing-vulnerability-exploited-in-attacks/ |
| macOS | `[Dutch NCSC Advisory ncsc-2026-0280]` | https://advisories.ncsc.nl/2026/ncsc-2026-0280.html |
| Cisco | `[Cisco Security Advisory]` | https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-vpn-dos-dzv4mQFF |

**Internal links (required, 4–6 total ≈ 2–5 per 1000 words):**
- `/blog/2026-08-10-news-roundup/` — in the opening hook ("last week's roundup").
- `/blog/2026-08-15-cve-analysis/` — in the Metabase story body.
- `/frameworks/` — in the Defender Checklist.
- `/scan/` — in the Defender Checklist.
- `/cves/` — in one FAQ answer.
- Optional (1 max): `/blog/2026-08-04-api-security-hardening/` in the Metabase body (the flaw is an API endpoint).

**Citation rules:** inline markdown only; NEVER `[N]` numbered references; no "References"/"Sources" section; every story section cites its own source(s); the Microsoft story cites BOTH Tenable and SecurityAffairs; the macOS story cites BOTH SecurityWeek and the NCSC advisory; ≥2 external authority links in the body overall (vendor official + primary reporting).

---

## 5. HEADLINE + META

**Choose one of these two titles (both ≤60 chars, keyword in first 3–5 words, no ALL CAPS/exclamation/clickbait):**
- **Title A (59 chars):** `Metabase Security Vulnerability Patch: CVE-2026-72898 Guide` — full keyword phrase "Metabase security vulnerability patch" in first 4 words.
- **Title B (54 chars):** `Metabase Security Vulnerability: CVE-2026-72898 Patch Guide` — keyword head in first 3 words, "patch" in word 5.

**Meta description (150–160 chars, prose, NO numbers/stats) — use verbatim (157 chars):**
`Metabase security vulnerability patch guidance for defenders: what the critical flaw does, which versions are safe, plus this week's top CVEs and a checklist.`

---

## 6. LONG-TAIL KEYWORD

- **Keyword:** `Metabase security vulnerability patch` (durable query; Metabase is the lead story, so the keyword is on-topic and evergreen).
- **Placement (all three REQUIRED):**
  1. **Title** — keyword phrase (or its head) within the first 3–5 words (both candidate titles satisfy this).
  2. **First 50 words of the body** — the exact phrase "Metabase security vulnerability patch" MUST appear in the opening hook.
  3. **Question-shaped H2** — verbatim: `## How Do I Patch the Metabase Security Vulnerability (CVE-2026-72898)?`
- Do NOT bury the keyword later in the post; it must appear in the hook.

---

## 7. SCORING RUBRIC (weighted, each criterion scored 0–10, then weighted)

Total = Accuracy×0.30 + Sourcing×0.25 + Quality×0.20 + Practicality×0.15 + Engagement×0.10.

### Accuracy (30%) — pass/fail checks
- PASS: Every CVE identifier, CVSS score, date, version string, patch release, and KEV status matches Section 3 verbatim (e.g., 0.60.17 not 0.60.7; Metabase KEV added Aug 11, 2026; SAP NOT in KEV; macOS patched Aug 6, 2026).
- FAIL (any single one = 0 for the criterion): an invented fact — claiming CVE-2026-58231 is in CISA KEV, claiming all 3 Microsoft zero-days were exploited, inventing a fixed-release version for Cisco or SAP, naming products/companies/models not in Section 3.
- PASS: Technical details exact — reset_password 400 → GET /api/user/current 200; afd.sys; port 5900; Monero miner; all six Metabase safe releases listed.
- FAIL: Any hands-on testing claim ("we reproduced", "in our lab", "we verified by exploiting") or any statistic not in Section 3 (allowed stats only: 5 companies, 398/42/355/1, ~40,000 hosts, 792 attempts, 1.6M, 680,000, CVSS scores).

### Sourcing (25%)
- PASS: Every story cites its allowed source inline as `[Source Name](url)`; Microsoft cites both Tenable and SecurityAffairs; macOS cites SecurityWeek + NCSC; ≥2 external authority links in the body.
- FAIL: Any URL outside the Section 4 list (invented TechTimes/cisa.gov/CVE.org link), any `[N]` numbered reference, any "References"/"Sources" section.
- PASS: Citations sit next to the claims they support; internal links present (minimum: /blog/2026-08-10-news-roundup/, /blog/2026-08-15-cve-analysis/, /frameworks/, /scan/, /cves/).
- FAIL: A factual claim with no citation in its story, or zero internal links.

### Quality (20%)
- PASS: Section order, H2 texts, and H3 texts match Section 2/3.8 verbatim; each story H2 has a 40–60 word self-contained answer paragraph immediately under it; FAQ answers are 40–60 words each.
- PASS: Total 800–1500 words; frontmatter has exact keys with pubDate 2026-08-17 and lastVerified 2026-08-17.
- FAIL: HERO_IMAGE_PROMPT missing, not the final line, or appearing anywhere else in the draft (this was a recurring arena failure — the line is stripped pre-publish, so any other occurrence leaks into the published post).
- FAIL: Missing E-E-A-T block, missing "Last verified: August 2026", long-tail H2 not question-shaped, or word count outside 800–1500.

### Practicality (15%)
- PASS: Defender Checklist has 5–6 numbered actions, each with a concrete target (version, log pattern, port number); Metabase remediation lists all six minimum safe releases.
- PASS: E-E-A-T block states sources, what was verified (dates, CVSS, versions, HTTP 200 checks on 2026-08-17), what was NOT independently confirmed, and freshness.
- FAIL: Vague checklist items ("stay vigilant", "patch everything"), or remediation guidance that omits the safe-version list or the 400 → 200 log signature.

### Engagement (10%)
- PASS: Chosen title ≤60 chars with the keyword in the first 3–5 words, no ALL CAPS/exclamation/clickbait; meta description 150–160 chars, prose, no numbers/stats.
- PASS: Keyword "Metabase security vulnerability patch" appears in title, in first 50 words, and in the question-shaped H2; opening hook ≤60 words.
- FAIL: Clickbait title, emoji, ALL CAPS, meta with stats, or keyword absent from any of the three required placements.

---

## 8. ANTI-PATTERNS (builders MUST NOT do any of these)

1. **No `[N]` numbered references** and no "References"/"Sources"/"Further Reading" section — inline `[Source Name](url)` only.
2. **No HERO_IMAGE_PROMPT leakage** — the line appears exactly once, as the final line of the file, nowhere else (stripped before publishing).
3. **No fabricated hands-on testing claims** — never "we tested/reproduced/exploited in our lab". Canonical honest phrasing: the review is based on official documentation and primary reporting, not hands-on testing.
4. **No slop words:** delve, unlock, revolutionize, landscape, game-changer, transformative, "in today's fast-paced world", "stay ahead of threats", "navigate the complex". Also no "In conclusion"/"In summary" filler.
5. **No unverified stats** — only the numbers listed in Section 3; nothing else (no "thousands of companies", no invented percentages).
6. **No hallucination** — restrict every fact to Section 3: no invented model names, vendor products, patch versions for Cisco/SAP, CISA links, extra zero-days, or new CVEs (this was a prior arena failure ×2).
7. **No burying the keyword** — it must appear in the title, the opening hook (first 50 words), and the long-tail H2; do not defer it to the FAQ.
8. **No re-covering last week's stories** (Coldcard, SCTPhantom, Chrome 151, Snowflake, TeamCity/N-central) except the one-line cross-link.
9. **No wrong KEV claims** — SAP is NOT in CISA KEV; Metabase and Cisco ARE.
10. **No style violations** — ALL CAPS titles, exclamation marks, emoji, clickbait ("You won't believe"), or meta descriptions with numbers/stats.
11. **No structural drift** — use the H2 texts from Section 2 verbatim; do not merge, reorder, or rename sections; do not add new H2 sections.
12. **No scope creep** — 800–1500 words; do not exceed the budget with extra commentary per story.

---

*This brief is the single source of truth for the arena. When in doubt, the constraint wins over stylistic instinct.*
