# Builder Brief: Tenable Nessus Vulnerability Scanner Review

**Prepared:** 2026-08-12
**For:** cybersec-ai.xyz — Step 2 builder prompt (A/B/C generation)
**Word count target:** 1,000–1,300 words (hard floor 800, hard ceiling 1,500)
**Status:** All external URLs verified HTTP 200 via `curl -sL` on 2026-08-12. Facts below were extracted verbatim from the live page (full-text cache: `/home/techgeek/.hermes/cache/web/www.tenable.com-7ce5c8b3f3.md`).

---

## 1. Review Angle & Unique Value Proposition

**Angle:** Nessus is the commercial baseline of the vulnerability scanning industry — "the first tool in your cybersecurity toolbox," per Tenable. This review evaluates whether that premium status is still justified at 2026 prices, and exactly who should pay ($4,790–$6,790/yr) vs. who is fine with the free tier or free alternatives.

**UVP vs. the rest of cybersec-ai.xyz:** Every prior tool review is open-source or AI-security focused (Wazuh, Nuclei, Giskard, Lakera Guard, Promptfoo, Garak). This is the blog's **first commercial enterprise scanner review** — the "paid gold standard" counterpart to the free/fast [Nuclei review](https://cybersec-ai.xyz/blog/nuclei-projectdiscovery-review/). Positioning sentence the builder must reflect: *Nuclei is the fast, free, template-driven scanner for the hunt; Nessus is the deep, credentialed, compliance-grade baseline you run continuously.* Do NOT re-review Nuclei's feature set — only contrast.

**Verdict stance (required):** Balanced but decisive — Nessus is the accuracy and coverage leader with best-in-class risk prioritization (CVSS v4 + EPSS + VPR), and it earns its price for regulated/enterprise teams; small teams should start with the free Essentials tier (16 IPs) or OpenVAS, and upgrade only when compliance or scale demands it.

---

## 2. Required Sections — EXACT H2 headings (use verbatim, in this order)

Post structure: H1 (title) → intro (2–3 paragraphs, **long-tail keyword "Tenable Nessus review 2026" in the first 100 words**, stats-first hook) → the 9 H2s below → closing verdict paragraph is H2 #9 itself (no extra H2 after it).

Every H2 must open with a self-contained 40–60 word answer paragraph before any bullets/lists.

1. `## How We Tested` — E-E-A-T disclosure. House style (mirror wazuh-review.md): "This review is based on Tenable's official product page, sub-pages, and documentation — we did not run the tool hands-on" (unless builder actually ran Essentials, then say so). List the sources cited + "last reviewed August 2026."
2. `## What is Tenable Nessus?` — definition, 26+ years of history, plugin-based architecture, market position (most widely deployed, powers the Tenable One Exposure Management platform).
3. `## Key Features and Capabilities` — bullet list: plugin architecture (319K+ plugins, 100+ new weekly, 117K+ CVEs covered), credentialed deep scanning, configuration/compliance/security audits, web app scanning (5 FQDNs), external attack surface scans, remediation guidance, 24/7 Zero Day Research.
4. `## Risk Scoring: CVSS v4, EPSS, and VPR` — explain how Nessus prioritizes: CVSS v4 base scoring, EPSS (exploit probability) and VPR (Tenable's proprietary priority rating, applied to Top 10 Vulns). This is the section that differentiates Nessus from free scanners and justifies the price. Tie to internal hubs: [security frameworks](https://cybersec-ai.xyz/frameworks/) and [CVE analysis](https://cybersec-ai.xyz/cves/).
5. `## Pricing Model` — required pricing table (see §3, exact figures) + add-ons row. Note the free trial for Professional/Expert and the 7-day free Expert upgrade path.
6. `## Nessus vs. Alternatives` — required comparison table: Nessus vs Qualys VMDR vs Rapid7 InsightVM vs OpenVAS/Greenbone (+ one row linking the [Nuclei review](https://cybersec-ai.xyz/blog/nuclei-projectdiscovery-review/)). Columns: Type / Price / Key Difference. Keep competitor claims high-level (their cited product pages only).
7. `## Pros and Cons` — two bullet lists (Pros / Cons). Must include at least 5 pros and 4 cons.
8. `## FAQ` — exactly 3 Q&As (see §5).
9. `## Verdict` — decisive recommendation with the required stance; internal links to at least one sibling review ([Nuclei](https://cybersec-ai.xyz/blog/nuclei-projectdiscovery-review/), optionally [Wazuh](https://cybersec-ai.xyz/blog/wazuh-review/)) and the [/scan/ hub](https://cybersec-ai.xyz/scan/).

---

## 3. Must-Include Facts (all verified verbatim on the cited pages, 2026-08-12)

Every fact below MUST appear with an inline markdown link to its source. No other statistics may be introduced without verification.

| # | Fact | Source (all ✅ 200) |
|---|---|---|
| 1 | **Pricing:** Nessus Essentials FREE (up to 16 IPs); Nessus Professional **$4,790/year**; Nessus Expert **$6,790/year** | https://www.tenable.com/products/nessus (Pro/Expert prices) · https://www.tenable.com/products/nessus/nessus-essentials (free tier) |
| 2 | **Add-ons:** Advanced Support $400 · Nessus Fundamentals training $275 · Nessus Fundamentals + Advanced $385 | https://www.tenable.com/products/nessus |
| 3 | **Six-sigma accuracy:** "industry's lowest false positive rate," **.32 defects per 1 million scans** | https://www.tenable.com/products/nessus |
| 4 | **Coverage:** **117K+ CVEs**, **319K+ plugins**, **100+ new plugins released weekly** | https://www.tenable.com/products/nessus |
| 5 | **Risk scoring:** CVSS v4, EPSS, and VPR (for Top 10 Vulns) | https://www.tenable.com/products/nessus · https://www.tenable.com/blog/epss-shows-strong-performance-in-predicting-exploits-says-study-from-cyentia-and-first (EPSS evidence) |
| 6 | **Compliance:** configuration, compliance, and security audits | https://www.tenable.com/products/nessus |
| 7 | **Web app scanning:** 5 FQDNs (option to add more) | https://www.tenable.com/products/nessus |
| 8 | **Attack surface:** external attack surface scans included | https://www.tenable.com/products/nessus |
| 9 | **Adoption:** "tens of thousands of organizations worldwide" + **over 4 million downloads**; 26+ years; powers Tenable One Exposure Management Platform | https://www.tenable.com/products/nessus |
| 10 | **Recognition:** only vendor named a Customers' Choice in the 2025 Gartner Peer Insights Voice of the Customer for Vulnerability Assessment | https://www.tenable.com/products/nessus |
| 11 | **Nessus Pro vs Expert:** both include unlimited IT vulnerability assessments, web app scans (5 FQDNs), external attack surface scans; Expert is the upgrade tier for modern/cloud attack surface | https://www.tenable.com/products/nessus/nessus-professional · https://www.tenable.com/products/nessus/nessus-expert |
| 12 | **Training option:** Nessus Fundamentals on-demand video course ($275) | https://www.tenable.com/education/courses/nessus-fundamentals |

**Competitor URLs for the comparison table (all ✅ 200):** Qualys VMDR https://www.qualys.com/apps/vulnerability-management/ · Rapid7 InsightVM https://www.rapid7.com/products/insightvm/ · OpenVAS/Greenbone https://www.openvas.org/

### ⛔ DO NOT CLAIM (hallucination guard — hard failures)
- ❌ **"43,000+ organizations"** — NOT on the verified page. The page says "tens of thousands of organizations" + "over 4 million downloads." Use the verified phrasing only.
- ❌ **"$3,499/yr"** — stale figure from the Nuclei review's alternatives table. Use the verified $4,790/$6,790.
- ❌ Any claim Nessus is open source, GPL-licensed, or free beyond the 16-IP Essentials tier.
- ❌ Specific CVEs "detected by Nessus," benchmark scores, scan-speed numbers, or competitor feature claims beyond what the cited product pages state.
- ❌ "As an AI…" self-reference; placeholder text; TODO/FIXME.

---

## 4. Weighted 0–10 Scoring Rubric (for the judge)

Judge scores each criterion 0–10, multiplies by weight, sums → 0–100, divides by 10 → final 0–10 score. **Pass threshold: ≥ 7.5/10.**

| # | Criterion | Weight | What the judge checks |
|---|---|---|---|
| 1 | **Fact accuracy & citation integrity** | 2.5 | All 12 must-include facts present and linked to the exact verified URLs; zero hallucinations; none of the ⛔ DO NOT CLAIM items appear; pricing verbatim ($4,790/$6,790/$400/$275/$385) |
| 2 | **Brief compliance & structure** | 2.0 | All 9 H2 headings verbatim and in order; 800–1,500 words; complete frontmatter incl. `heroImage` + `lastVerified: "2026-08-12"`; 3 FAQ Q&As; 40–60 word lead paragraph under each H2 |
| 3 | **Review depth & balance** | 2.0 | Genuine Pros (≥5) and Cons (≥4); specific technical detail (plugin architecture, CVSS v4 vs EPSS vs VPR explained, 5-FQDN web scanning, six-sigma stat); decisive, credible verdict matching the required stance |
| 4 | **SEO & internal linking** | 1.5 | Title ≤ 60 chars; keyword "Tenable Nessus review 2026" in first 100 words + meta description; meta 150–160 chars; links to ≥2 of [/frameworks/](https://cybersec-ai.xyz/frameworks/), [/cves/](https://cybersec-ai.xyz/cves/), [/scan/](https://cybersec-ai.xyz/scan/), plus ≥1 sibling review (Nuclei/Wazuh) |
| 5 | **Hero image** | 1.0 | Present (R2 URL), 16:9, dark navy/cyan palette (#0a1128/#22d3ee), no text, no logos, no stock-photo clichés, matches blog aesthetic |
| 6 | **Readability & formatting** | 1.0 | Pricing and alternatives in tables; scannable bullets; no placeholder/lorem; clean markdown; no broken links (all URLs from §3) |

---

## 5. Long-Tail Keyword Target

- **Primary:** `Tenable Nessus review 2026` — use exact-ish in H1-intro sentence (first 100 words) and meta description.
- **Secondary (weave in naturally, 2–3 max):** `Nessus Professional vs Expert` · `Nessus Essentials free vs Professional` · `Nessus vs OpenVAS` · `best enterprise vulnerability scanner` · `CVSS v4 vs EPSS vs VPR`.

**FAQ candidates (exactly 3):**
1. **Is Nessus free?** — Essentials tier free for up to 16 IPs; Pro/Expert are paid with free trials. (Cite Essentials + product page.)
2. **Nessus Professional vs Expert — which should I choose?** — Same core scanning; Expert targets the modern/cloud attack surface and includes external attack surface scans; Pro is the classic internal/IT baseline. (Cite Pro/Expert pages.)
3. **Is Nessus worth it compared to free scanners like OpenVAS?** — Six-sigma accuracy (.32 defects/1M scans), 319K+ plugins, CVSS v4/EPSS/VPR prioritization, compliance audits vs. OpenVAS's free, community-driven model with higher tuning burden. (Cite product page + OpenVAS.)

---

## 6. Title Pattern (≤ 60 chars)

- **Primary (59 chars):** `Nessus Review 2026: The Vulnerability Scanner Gold Standard`
- **Alternate (43 chars):** `Tenable Nessus Review 2026: Is It Worth It?`
- **Slug:** `nessus-review-2026`
- Rule: brand/product + year up front; a verdict hook after the colon; never exceed 60 chars.

## 7. Meta Description Formula

`[Product] review: [positioning phrase] — [3–4 evaluated capabilities separated by commas], pricing, and alternatives.`

- Target **150–160 chars**, no raw stats/numbers, keyword included.
- **Reusable example (158 chars):**
  `Tenable Nessus review: industry-standard vulnerability scanner — CVSS v4, EPSS and VPR scoring, compliance audits, web app scans, pricing, and alternatives.`

---

## 8. Frontmatter (exact)

```yaml
---
title: "Nessus Review 2026: The Vulnerability Scanner Gold Standard"
description: "Tenable Nessus review: industry-standard vulnerability scanner — CVSS v4, EPSS and VPR scoring, compliance audits, web app scans, pricing, and alternatives."
pubDate: "2026-08-12"
heroImage: "<R2-hosted image URL — see §9 prompt>"
tags: ["tool-review", "vulnerability-scanning", "tenable", "compliance", "devsecops"]
lastVerified: "2026-08-12"
---
```

## 9. HERO_IMAGE_PROMPT (exact, use as-is for generation)

```
16:9 cybersecurity hero banner, dark navy palette matching the blog's existing dark/cyan aesthetic. Isometric 3D-vector hybrid scene: a large glowing radar-sweep console on the left, sweeping a stylized network map of connected server nodes (small cube/rack icons). The cyan sweep beam highlights vulnerable nodes in red; a luminous cyan shield rises from the console and blocks a stream of red threat packets (abstract glitch shapes and X marks, no skulls, no gore) that shatter into pixels on the right. Subtle circuit-board grid and matrix-style code glyphs in the background, cinematic rim lighting, high contrast, clean modern vector-3D hybrid style. Color palette: deep navy (#0a1128), cyan (#22d3ee), red accent (#f87171), white (#e2e8f0). No text, no words, no logos, no human hands or faces, no UI chrome. Professional cybersecurity blog hero, safe for work.
```

## 10. Delivery Instructions (builder)

- Write to `src/content/blog/2026-08-12-nessus-review.md` (or `nessus-review-2026.md` matching slug).
- Verify with `npm run build`; deploy via `bash ~/.hermes/scripts/deploy-cybersecai.sh`; confirm with `curl -sL https://cybersec-ai.xyz/blog/ | grep -c "nessus-review"` returns ≥1.
- Do NOT modify the Nuclei review's stale $3,499 pricing (out of scope) — just use correct figures in the new post.
- All inline citations use markdown links to §3 URLs. No numbered references.
