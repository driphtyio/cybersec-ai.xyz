# Builder Brief: Writing Plan + Scoring Rubric — "MCP Security in 2026: The New Attack Surface of Agentic AI"

**Output file (exact):** `/home/techgeek/cybersec-ai.xyz/src/content/blog/2026-08-20-mcp-security.md`
**Research source:** `/home/techgeek/cybersec-ai.xyz/research/2026-08-20-mcp-security-brief.md` (this plan is the contract; the brief is the source of truth for facts and URLs — do not invent new facts or URLs)
**Audience:** IT pros and security analysts — practitioners who want sources, not rumor.
**Arena note:** This plan is the ONLY brief the competing writers receive. Every fact, URL, and sample lead needed to write a compliant post is embedded below. When a constraint and stylistic instinct conflict, **the constraint wins**.

---

## 1. LOCKED ANGLE (the thesis every writer must commit to)

> **MCP servers are the new npm of the AI supply chain: more than 75,000 of them now run with your privileges and connected credentials, so treat every one as an untrusted, privileged dependency — allow-list, pin, scan, sandbox, and consent at every step, because the 2025–2026 record shows registries and safety alignment will not protect you.**

This is the post's spine. Every section either proves a piece of it (scale, attack mechanics, incidents) or delivers the controls it demands (vetting, containment, policy). The Bottom Line must restate it as a verdict, not soften it.

## 2. TITLE, SLUG & FRONTMATTER

- **Title (MANDATORY, do not change):** `MCP Security in 2026: The New Attack Surface of Agentic AI` — **57 characters (≤65 required)**; primary keyword `MCP Security` lands in the first 2 of the first 5 words; no ALL CAPS, no clickbait.
- **Slug / filename:** `2026-08-20-mcp-security` → file `2026-08-20-mcp-security.md`
- **Primary keyword (MUST appear verbatim early):** `MCP security` — in the first ~100 words of the opening hook.
- **Tags (exactly these 5):** `mcp-security`, `agentic-ai`, `ai-supply-chain`, `prompt-injection`, `llm-security`

**Required frontmatter (exact keys, YAML — `heroImage` left EMPTY; the image pipeline fills it from the HERO_IMAGE_PROMPT line, per repo convention):**

```yaml
---
title: "MCP Security in 2026: The New Attack Surface of Agentic AI"
description: "MCP servers plug into your AI agents with full privileges, making them the new supply-chain attack surface. Here's how they get compromised and secured."
pubDate: "2026-08-20"
heroImage: ""
tags:
  - "mcp-security"
  - "agentic-ai"
  - "ai-supply-chain"
  - "prompt-injection"
  - "llm-security"
lastVerified: "2026-08-20"
---
```

- **Meta description** (the `description:` value): the string above is **152 characters**, one prose sentence, **no raw stats/digits** — use it verbatim or write your own within the same rules (150–160 chars, prose only, no numbers).

---

## 3. REQUIRED SECTIONS (exact H2s, exact order, exact headings)

The post has **exactly 10 H2s**, in this order. No other H2s. No `## Sources` / `## References` section. **H3s are allowed ONLY inside the FAQ.** (The opening hook is plain paragraphs with no heading.)

1. **Opening hook** — no heading; 2–3 stat-driven paragraphs immediately after frontmatter. Keyword `MCP security` in the first ~100 words.
2. `## How This Was Researched` — mandatory honesty block (position 2, directly after the hook). Must include the canonical line verbatim: **`This analysis is based on official documentation and published reports — we did not run hands-on tests. Last researched: August 2026.`**
3. `## What Is MCP, and Why Did It Become the Default?`
4. `## How Does an MCP Server Attack You?`
5. `## What Have the 2025–2026 Incidents Actually Shown?` — **the comparison table lives here** (spec in §5)
6. `## Why Is MCP the New npm of the AI Supply Chain?`
7. `## How Do You Vet an MCP Server Before You Connect It?`
8. `## How Do You Contain a Server That Gets Compromised?`
9. `## What Should Your MCP Security Policy Look Like?`
10. `## The Bottom Line` — the verdict (position 10, near the end)
11. `## FAQ` — exactly 3 question-shaped H3s (see §6)
12. **HERO_IMAGE_PROMPT** — the literal LAST line of the file (see §9 rule 6 and §10)

**Section-to-H2 mapping for the judge:** H2s 3, 4, 6, 7, 8 are question-shaped (`?` ending) as shown. H2s 2, 5, 9, 10, 11 are statement-shaped as shown. Order is fixed.

---

## 4. MUST-INCLUDE FACTS (every draft MUST state these correctly and inline-cite each with its approved URL)

Numbers and dates must appear exactly as written — do not round, alter, or "improve" them. The URL next to each fact is the ONLY approved citation for it. All URLs were curl-verified HTTP 200 on Aug 20, 2026.

| # | Fact (state verbatim-accurate) | Approved source URL |
|---|---|---|
| 1 | **75,556 open-source MCP servers** indexed in the Glama registry **as of August 20, 2026** (quote with the capture date). | https://glama.ai/mcp/servers |
| 2 | **"More than 10,000" published MCP servers** at the Linux Foundation Agentic AI Foundation (AAIF) launch, **December 9, 2025**, when Anthropic donated MCP (with Block's goose and OpenAI's AGENTS.md). | https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation |
| 3 | **MCPTox benchmark** (arXiv:2508.14925, submitted **Aug 19, 2025**): 45 live MCP servers / 353 authentic tools / **1,312 malicious test cases** across 10 risk categories; **o1-mini attack success rate 72.8%**; the highest refusal rate (Claude 3.7 Sonnet) was **under 3%**. | https://arxiv.org/abs/2508.14925 |
| 4 | **GhostSplice** (ASSET Research Group, UMKC; disclosed **Aug 11, 2026**): splitting one malicious instruction across a tool's `description` and `result` fields raised exfiltration compliance from **42% (intact) to 82% (split)** across 11 model/client combos; GPT-4o, Gemini 2.0 Flash, and Llama 3.3 70B went from 0% to 100% compliance. No CVE — described as an architectural flaw. | https://asset-group.github.io/disclosures/ghostsplice/ |
| 5 | **postmark-mcp (npm)**: typosquat impostor built trust over **15 benign versions**, then backdoored v1.0.16–1.0.18 with a **hidden BCC exfiltrating every email an agent sent** to `giftshop.club`; removed from npm **September 25, 2025**; first widely confirmed malicious MCP server. | https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails/ |
| 6 | **Postgres MCP SQL injection** (Datadog): stacked queries (`COMMIT; DROP SCHEMA public CASCADE;`) broke the "read-only" transaction guard for arbitrary writes; server **deprecated July 10, 2025, yet still ~21,000 weekly npm downloads (~1,000 weekly Docker pulls)** — a live example of unpatched privileged MCP dependencies. | https://securitylabs.datadoghq.com/articles/mcp-vulnerability-case-study-SQL-injection-in-the-postgresql-mcp-server/ |
| 7 | **GhostApproval** (Wiz Research, **July 8, 2026**): trust-boundary flaw in **six AI coding assistants** (Amazon Q Developer, Claude Code, Augment, Cursor, Google Antigravity, Windsurf) — approval dialogs showed a harmless symlink name while the write landed on a sensitive target (e.g., SSH config); tracked as **CVE-2026-12958**; patched in Amazon Q Developer 1.69.0. | https://www.wiz.io/blog/ghostapproval-a-trust-boundary-gap-in-ai-coding-assistants ; https://nvd.nist.gov/vuln/detail/CVE-2026-12958 |
| 8 | **Unit 42 (April 30, 2026): 18 high-risk AI browser extensions** reported to Google, including an **MCP-themed RAT targeting AI developers (February 2026)** — a "Chrome MCP Server" extension with a live WebSocket C2 channel executing remote JS via `new Function()`. | https://unit42.paloaltonetworks.com/high-risk-gen-ai-browser-extensions/ |
| 9 | **OWASP MCP Top 10**: v0.1 (2025), beta; **next release scheduled October 2026**; categories MCP01 token mismanagement & secret exposure, MCP02 privilege escalation via scope creep, MCP03 tool poisoning (rug pulls, schema poisoning, tool shadowing), MCP04 supply-chain attacks & dependency tampering, MCP05 command injection & execution, MCP06 intent flow subversion, MCP07 insufficient authentication & authorization, MCP08 lack of audit & telemetry, MCP09 shadow MCP servers, MCP10 context injection & over-sharing. | https://owasp.org/www-project-mcp-top-10/ |
| 10 | **CISA + Five Eyes ("Careful Adoption of Agentic AI Services")**: first joint Five Eyes agentic-AI advisory, published **May 1, 2026** — threat modeling, continuous monitoring, regular security assessments, align with existing risk frameworks. | https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services |
| 11 | **MCP OAuth 2.1 authorization guidance** (spec revision 2026-07-28): user-consent flows, dynamic client registration, exact redirect-URI matching, `state` parameter + CSRF protection, per-client consent storage, incremental scopes via `WWW-Authenticate` challenges, **no wildcard scopes**. | https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization.md |

**Secondary verified facts (use where their section demands; inline-cite with the URL shown):**

- Anthropic introduced MCP on **Nov 25, 2024** with SDKs and reference servers; early adopters Block, Apollo, Zed, Replit, Codeium, Sourcegraph. → https://www.anthropic.com/news/model-context-protocol
- Invariant Labs **tool poisoning attack (TPA)**, Apr 1, 2025: malicious instructions hidden in tool descriptions exfiltrate `~/.ssh/id_rsa` and `~/.cursor/mcp.json`; also demonstrated **rug pulls** and **cross-server shadowing** (re-routing all emails). → https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
- Trail of Bits MCP research series, Apr 2025: **line jumping** (Apr 21 — malicious tool descriptions execute before any tool is called), **conversation-history theft** via trigger phrases (Apr 23), **ANSI terminal deception** (Apr 29), **insecure credential storage** (Apr 30); open-source `mcp-context-protector` (TOFU pinning) at the MCP hub. → https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/ and https://trailofbits.com/mcp/
- WhatsApp MCP exploit, Invariant Labs, Apr 7, 2025: tool poisoning combined with a legitimate WhatsApp MCP server exfiltrated full message histories. → https://invariantlabs.ai/blog/whatsapp-mcp-exploited
- ExtensionTotal, Apr 24, 2025 ("Trust me, I'm local"): Chrome extensions reach **localhost MCP servers (SSE port 3001) with no authentication** — a sandbox escape; any local filesystem/Slack/WhatsApp tool becomes an extension-reachable exfiltration pipe. → https://blog.extensiontotal.com/trust-me-im-local-chrome-extensions-mcp-and-the-sandbox-escape-1875a0ee4823
- Kaspersky Securelist, Sept 15, 2025: MCP as a supply-chain foothold with a working PoC harvesting developer data. → https://securelist.com/model-context-protocol-for-ai-integration-abused-in-supply-chain-attacks/117473/
- `mcp-scan` (Invariant Labs, open source, announced Apr 11, 2025): statically scans configured MCP servers for tool poisoning, rug pulls, shadowing, prompt injection; Snyk recommends running it in CI and on agent hosts. → https://invariantlabs.ai/blog/introducing-mcp-scan
- MCP Security Best Practices (spec 2026-07-28): **confused-deputy problem** (proxies using static client IDs + dynamic registration + consent cookies), **token passthrough forbidden** (audience validation), **SSRF via OAuth metadata discovery** (URLs pointing at `169.254.169.254` or internal services). → https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices.md
- Official MCP Registry: namespace authentication (reverse-DNS, GitHub/DNS verification) for server authenticity; **security scanning delegated to package registries/aggregators**. → https://modelcontextprotocol.io/registry/about.md
- OWASP Top 10 for Agentic Applications 2026 (released Dec 9, 2025; 100+ contributors). → https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- Microsoft AI Red Team Taxonomy of Failure Modes in Agentic AI Systems v2.0 (34 failure modes). → https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/security/Taxonomy-of-Failure-Modes-in-Agentic-AI-Systems-v2-0.pdf
- Vendor adoption (dated): OpenAI MCP docs live → https://developers.openai.com/docs/mcp/ ; Google Cloud official MCP support for Google services, Dec 10, 2025 → https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services ; Microsoft Copilot Studio MCP GA, May 29, 2025 → https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/

**Verification note for the judge and writers:** every URL above returned HTTP 200 to curl on Aug 20, 2026. **Do not cite any URL not listed in this plan.** Do NOT reuse the excluded secondhand claims ("5.5% of public MCP servers poisoned", "41% of servers with zero auth") — they have no primary source and are banned from this post.

**Mitigations the post MUST cover (each inline-cited to its approved source):**
1. **Tool allow-listing & pinning** (per-server tool allow-lists, pin server/tool versions with checksums) → Invariant tool-poisoning blog (above).
2. **mcp-scan static scanning** before/after install, in CI and on agent hosts → https://invariantlabs.ai/blog/introducing-mcp-scan and Snyk postmark blog.
3. **TOFU (trust-on-first-use) pinning** + tool-description validation + ANSI sanitization via `mcp-context-protector` → https://trailofbits.com/mcp/ and the line-jumping disclosure.
4. **Sandboxing / least privilege**: run servers as separate least-privilege OS accounts/containers, restrict network egress, keep credential files out of agent reach (GhostSplice advisory), block localhost MCP endpoints from browser extensions where possible (ExtensionTotal), least-privilege DB roles and patching (Datadog).
5. **OAuth 2.1 with explicit per-client user consent**, audience validation, no token passthrough → authorization.md and security_best_practices.md.
6. **Treat tool descriptions AND tool results as untrusted input** (GhostSplice) — audit both, not just visible tool names.
7. **Shadow-MCP inventory** (OWASP MCP09) — inventory every MCP server, including ones nobody remembers installing; monitor tool-invocation telemetry (OWASP MCP08).

---

## 5. COMPARISON-TABLE SPEC (lives under H2 #5, `## What Have the 2025–2026 Incidents Actually Shown?`)

**One markdown table, exactly 4 columns, exactly 11 rows (header + 11 data rows), no other tables in the post.**

Columns (verbatim header row):
`| Attack / Incident | How it works | Impact | Mitigation |`

Rows (each cell factual per §4; the Attack/Incident cell carries the inline source link):

1. **Tool poisoning** (Invariant Labs, Apr 1, 2025) | Malicious instructions hidden inside tool descriptions — invisible to users, read by the model | Exfiltrates SSH keys and `~/.cursor/mcp.json` credentials; cross-server shadowing can re-route all email | Show full tool descriptions in UI; allow-list tools per server; pin versions; scan with mcp-scan
2. **Line jumping & conversation theft** (Trail of Bits, Apr 2025) | Tool descriptions execute before any tool is called; trigger phrases steal history; ANSI escapes hide text from users | Full conversation history exfiltrated without a single tool invocation | mcp-context-protector TOFU pinning; ANSI sanitization; quarantine
3. **MCPTox benchmark** (arXiv, Aug 19, 2025) | 1,312 malicious test cases across 10 risk categories against 45 live servers / 353 tools | o1-mini attack success rate 72.8%; highest refusal rate (Claude 3.7 Sonnet) under 3% | Safety alignment is not a control — assume compromise and layer policy controls
4. **GhostSplice** (ASSET Research Group, Aug 11, 2026) | One instruction split across `description` and `result` fields defeats refusal behavior | Exfiltration compliance 42% → 82%; GPT-4o, Gemini 2.0 Flash, Llama 3.3 70B went 0% → 100% | Treat descriptions AND results as untrusted; sandbox servers; block credential access
5. **Postgres MCP SQLi** (Datadog, 2025) | Stacked queries (`COMMIT; DROP SCHEMA public CASCADE;`) break the read-only transaction guard | Arbitrary writes to connected databases; server deprecated Jul 10, 2025 yet still ~21k weekly npm downloads | Patch; avoid deprecated servers; least-privilege DB roles; treat MCP like any dependency
6. **postmark-mcp backdoor** (npm, Sept 2025) | Typosquat impostor built trust over 15 benign versions, then backdoored v1.0.16–1.0.18 with a hidden BCC | Every email an agent sent exfiltrated to giftshop.club; removed from npm Sept 25, 2025 | Pin versions and hashes; scan in CI; rotate credentials exposed to third-party servers
7. **WhatsApp MCP exploit** (Invariant Labs, Apr 7, 2025) | Poisoned server shares a context with a legitimate WhatsApp MCP server | Full message histories exfiltrated across servers | Enforce cross-server dataflow boundaries; per-server tool allow-lists
8. **Chrome-extension sandbox escape** (ExtensionTotal, Apr 24, 2025) | Browser extensions reach unauthenticated localhost MCP servers (SSE port 3001) | Local filesystem/Slack/WhatsApp tools become extension-reachable exfiltration pipes | Block localhost MCP from extensions; authenticate local endpoints; restrict egress
9. **GhostApproval** (Wiz, Jul 8, 2026) | Approval dialog shows a harmless symlink name while the write lands on a sensitive target | Writes to SSH config and other sensitive files across 6 AI coding assistants; CVE-2026-12958 | Patch assistants (Amazon Q Developer 1.69.0); review symlink targets in approvals
10. **MCP-themed browser-extension RAT** (Unit 42, Feb 2026) | "Chrome MCP Server" extension with live WebSocket C2 executing remote JS via `new Function()` | Remote code execution aimed at AI developers; 1 of 18 high-risk AI extensions reported | Inventory extensions; block sideloaded AI extensions; monitor C2 egress
11. **OAuth confused-deputy & SSRF** (MCP security docs, spec 2026-07-28) | Static client IDs + dynamic registration + consent cookies let proxies steal auth codes; metadata URLs point at `169.254.169.254` | Authorization-code theft and impersonation; SSRF to cloud metadata and internal services | OAuth 2.1 with per-client consent; audience validation; forbid token passthrough; SSRF defenses

**Table rules:** plain markdown pipes; no merged cells; no HTML; keep each cell under ~25 words; source links live in the Attack/Incident column (first cell) only — do not duplicate URLs inside the table.

---

## 6. SECTION-BY-SECTION SPEC (with reusable sample lead paragraphs)

### 6.1 Opening hook (no heading)
2–3 paragraphs, 80–120 words. First paragraph MUST open with a concrete 2026 stat (Fact 1 or 3) and contain the verbatim keyword `MCP security` in the first ~100 words. Suggested shape: (a) scale stat → (b) one real incident that makes it concrete (postmark-mcp or GhostSplice) → (c) what the post delivers (attack surface + controls). Cite Facts 1, 3, 5 in the hook.

### 6.2 `## How This Was Researched` (40–60 words)
Must name the source types (official MCP protocol documentation, vendor security research, academic papers, government advisories), state that every URL was verified live on August 20, 2026, and include the canonical honesty line VERBATIM: `This analysis is based on official documentation and published reports — we did not run hands-on tests. Last researched: August 2026.` Reusable sample (51 words — verify your own lands 40–60):

> This post is built from official protocol documentation, vendor security research, academic papers, and government advisories published through August 2026. Every source URL was checked live on August 20, 2026. This analysis is based on official documentation and published reports — we did not run hands-on tests. Last researched: August 2026.

### 6.3 `## What Is MCP, and Why Did It Become the Default?` (lead 40–60 + 120–180 words of detail)
**Must include:** Facts 2 (AAIF donation, Dec 9, 2025), the Nov 25, 2024 Anthropic introduction, and at least two vendor adoptions (OpenAI docs, Google Cloud Dec 10 2025, Microsoft Copilot Studio May 29 2025). Reusable lead (54 words):

> The Model Context Protocol is an open standard that lets AI agents call tools, read resources, and load prompts from external servers over stdio or HTTP. Anthropic introduced it on November 25, 2024, and by 2026 OpenAI, Google, Microsoft, and AWS all support it, making it the default way agents integrate with your systems.

### 6.4 `## How Does an MCP Server Attack You?` (lead 40–60 + 180–250 words)
**Must include:** tool poisoning + rug pulls + cross-server shadowing (Invariant, Apr 1, 2025); line jumping / conversation theft / ANSI deception (Trail of Bits, Apr 2025); MCPTox results (Fact 3); GhostSplice split-instruction mechanism (Fact 4); classic appsec: Postgres SQLi (Fact 6) and GhostApproval (Fact 7). Explain the structural reason: a server ships code PLUS text metadata into trusted context and runs with the user's privileges. Reusable lead (52 words):

> Attackers hide malicious instructions in tool metadata that humans never see but models read, swap tool definitions after approval, and split instructions across description and result fields to defeat refusals. Researchers at Invariant Labs, Trail of Bits, and the ASSET Research Group documented these attacks in 2025 and 2026 with working demonstrations.

### 6.5 `## What Have the 2025–2026 Incidents Actually Shown?` (lead 40–60 + the §5 table + 60–100 words)
Lead paragraph, then the table, then 1 short paragraph distinguishing **observed in the wild** (postmark-mcp Sept 2025; MCP-themed RAT Feb 2026) from **researcher demonstrations with working exploits** (tool poisoning, GhostSplice, GhostApproval, SQLi) — several affecting shipped, widely used clients (Cursor, Claude Code, Amazon Q Developer). Reusable lead (48 words):

> The documented record runs from April 2025 tool poisoning through the August 2026 GhostSplice disclosure, with at least one confirmed in-the-wild attack: postmark-mcp backdoored npm packages exfiltrating sent email in September 2025. The table below maps each verified incident to its mechanism, impact, and the mitigation that applies.

### 6.6 `## Why Is MCP the New npm of the AI Supply Chain?` (lead 40–60 + 120–180 words)
**Must include:** Facts 1 and 2 (75,556 / >10,000) and the structural argument: servers run with the user's OS privileges and connected credentials; agent automation removes the human-in-the-loop so one backdoored tool exfiltrates at scale (Snyk's postmark assessment); blast radius amplification via cross-server shadowing (Invariant); OWASP MCP04 names supply-chain attacks as a category (Fact 9). Reusable lead (51 words):

> The ecosystem grew from reference servers in late 2024 to more than 10,000 published MCP servers by December 9, 2025, and 75,556 open-source servers indexed in the Glama registry as of August 20, 2026. Every one of them runs with your privileges and your connected credentials, so scale is the threat.

### 6.7 `## How Do You Vet an MCP Server Before You Connect It?` (lead 40–60 + 150–220 words)
**Must include:** mitigations 1, 2, 3 (allow-listing/pinning; mcp-scan; TOFU/mcp-context-protector) + Fact on the MCP Registry (namespace verification; scanning delegated — cite registry/about.md) + the postmark lesson (Fact 5: 15 benign versions — trust takes time to build and can be cashed in). Reusable lead (45 words):

> Vet servers the way you vet any privileged dependency: allow-list only the tools you need, pin exact versions with checksums, scan configurations with mcp-scan, and apply trust-on-first-use pinning so approved servers cannot silently change. The official MCP Registry also verifies publisher namespaces to reduce typosquatting.

### 6.8 `## How Do You Contain a Server That Gets Compromised?` (lead 40–60 + 150–220 words)
**Must include:** mitigations 4, 5, 6 (sandboxing/least privilege; OAuth 2.1 consent; treat descriptions AND results as untrusted) + confused-deputy / token passthrough / SSRF (security_best_practices.md) + ExtensionTotal localhost warning + credential rotation (Snyk). Reusable lead (51 words):

> Assume any MCP server can be hostile and design around it: run servers as separate least-privilege accounts or containers, restrict network egress, keep credential files out of agent reach, and use OAuth 2.1 with explicit per-client user consent instead of blanket tokens. Treat tool descriptions and tool results as untrusted input.

### 6.9 `## What Should Your MCP Security Policy Look Like?` (lead 40–60 + 150–220 words)
**Must include:** mitigation 7 (shadow-MCP inventory + tool-invocation telemetry, OWASP MCP08/MCP09) + the ordered controls list (inventory → allow-list → pin/scan → sandbox → OAuth 2.1 consent → rotate exposed credentials → monitor) + OWASP MCP Top 10 (Fact 9) + CISA/Five Eyes May 1, 2026 advisory (Fact 10) + OWASP Agentic Top 10 2026 + Microsoft taxonomy as optional frameworks. Reusable lead (50 words):

> Codify seven controls: inventory every MCP server including shadow MCP, allow-list tools per server, pin and scan before install, sandbox execution, enforce OAuth 2.1 consent, rotate credentials exposed to third-party servers, and monitor tool-invocation telemetry. The OWASP MCP Top 10 and the CISA-led Five Eyes advisory give you the framework.

### 6.10 `## The Bottom Line` (40–60 words — the verdict)
One crisp verdict paragraph restating the LOCKED ANGLE: adoption is mature and irreversible; the evidence shows safety alignment does not stop tool poisoning (cite MCPTox, Fact 3); treat every server as an untrusted privileged dependency with the seven controls; the payoff is agent productivity without handing over SSH keys, mailboxes, and databases. Reusable sample (53 words):

> MCP adoption is mature and irreversible, and the evidence shows safety alignment does not stop tool poisoning. Treat every MCP server as an untrusted, privileged dependency: allow-list, pin, scan, sandbox, and consent at every step. Do that and you get the productivity of agents without handing attackers your SSH keys, mailboxes, and databases.

### 6.11 `## FAQ` (lead 40–60 words + exactly 3 question-shaped H3s, each answer 40–60 words)
Lead, then exactly 3 H3s, each phrased as a question ending in `?`. Each answer is 40–60 words, self-contained, with inline source link(s). Reusable lead (46 words):

> These are the questions security teams ask most when MCP shows up in their environment. Each answer is short, self-contained, and linked to its source, so you can grab the answer without re-reading the whole post. Use them to brief colleagues or defend an audit.

1. `### Is it safe to install MCP servers from official registries?` — Registry listing is not a security review: the MCP Registry verifies publisher namespaces, but scanning is delegated to registries/aggregators, and postmark-mcp shipped from npm after 15 benign versions. Pin versions, scan with mcp-scan, treat every server as untrusted. Cite registry/about.md + Fact 5 + mcp-scan. Sample answer (47 words):
   > Registry listing is not a security review. The MCP Registry verifies publisher namespaces, but scanning is delegated to package registries and aggregators, and the postmark-mcp backdoor shipped from npm after 15 benign versions. Treat every server as untrusted, pin versions, and scan with mcp-scan before first use.
2. `### Do local MCP servers need OAuth, or only remote ones?` — The official authorization guidance applies consent/registration/redirect/CSRF protections to any server walking OAuth flows; the confused-deputy attack shows proxies can steal codes even locally; and unauthenticated localhost endpoints were reachable by browser extensions. Cite authorization.md + security_best_practices.md + ExtensionTotal. Sample answer (48 words):
   > Both. The official authorization guidance applies consent, dynamic client registration, redirect matching, and CSRF protections to any server that walks OAuth flows, and the confused-deputy attack shows proxies can steal codes even locally. Even without OAuth, localhost servers need authentication — browser extensions reached unauthenticated local MCP endpoints.
3. `### How do I detect a poisoned MCP server before it is too late?` — Scan with mcp-scan before and after install; pin versions and checksums; monitor tool-invocation telemetry (OWASP MCP08); audit tool descriptions AND results because GhostSplice shows split instructions evade refusals. Cite mcp-scan + GhostSplice + OWASP MCP Top 10. Sample answer (47 words):
   > Scan configurations with mcp-scan before and after install, pin server versions and checksums so approved tools cannot change, and monitor tool-invocation telemetry for unexpected calls. GhostSplice shows instructions split across description and result fields evade refusal behavior, so audits must review both, not just visible tool names.

### 6.12 No separate conclusion
The post ends with the FAQ. `## The Bottom Line` (6.10) is the verdict; do not add a closing section after the FAQ.

---

## 7. FORMAT REQUIREMENTS (hard rules — past drafts failed on ambiguity)

1. **Word count: 1500–2500** total, counting everything from the first word of the hook through the last word of the FAQ. Frontmatter, the table, and the HERO_IMAGE_PROMPT line are excluded from the count. Target 1900–2200.
2. **Title:** exactly `MCP Security in 2026: The New Attack Surface of Agentic AI` (57 chars, ≤65 required; `MCP Security` within the first 5 words). Do not alter.
3. **Meta description:** 150–160 characters, one prose sentence, **no digits/raw stats** (sample in §2 complies at 152 chars).
4. **Every H2** (including `How This Was Researched`, `The Bottom Line`, and `FAQ`) must be immediately followed by a **self-contained 40–60 word paragraph** that answers the section's implied question on its own and carries ≥1 inline source link. 39 or 61 words = fail. Never open with "In this section...". H3s do NOT need lead paragraphs.
5. **Citations:** ALL inline markdown links `[Source Name](URL)`. **NO `[1]`, `[2]` numbered references anywhere** — no bracketed footnote numbers, no superscripts, no end-of-post "References"/"Sources" list. Never paste a raw URL as plain text. **≥10 external source links** in the body and **≥2 external primary sources** (arXiv, NVD, Anthropic, Linux Foundation, modelcontextprotocol.io all qualify — Facts 2, 3, 7, 11 and the Anthropic link cover this easily).
6. **HERO_IMAGE_PROMPT:** the literal last line of the file must be `HERO_IMAGE_PROMPT: <prompt>` (§10) — one line, nothing after it. It must appear exactly once.
7. **`## How This Was Researched`** must be the first H2, directly after the opening hook (position 2 in §3).
8. **FAQ:** exactly 3 H3s under `## FAQ`, each ending in `?` (use the exact questions in §6.11). No H3s anywhere else in the post.
9. **Frontmatter:** exact keys and values from §2. `pubDate: "2026-08-20"`, `lastVerified: "2026-08-20"`, `heroImage: ""` (empty), `tags` an array of the 5 quoted tags.
10. **Comparison table:** exactly one table, 4 columns × 12 lines (header + 11 rows) per §5. No other tables.
11. **Internal links (MANDATORY):** **4–8 links total** to site hubs — `/cves/` inside §6.5 (GhostApproval row context), `/scan/` inside §6.7 (mcp-scan), `/frameworks/` inside §6.9 (OWASP/CISA frameworks) — plus `/cves/` again near the NVD CVE-2026-12958 mention. Do NOT invent other slugs; sibling posts may be added only if their slugs are confirmed to exist in `src/content/blog/`.
12. **Markdown only:** no HTML in the body except markdown links; standard `##`/`###`/`-`/`1.`/`**bold**`/tables only.

### Word budget (sum ≈ 1900–2200)

| Section | Words |
|---|---|
| Opening hook | 80–120 |
| How This Was Researched | 40–60 |
| What Is MCP (lead + detail) | 160–240 |
| How Does an MCP Server Attack You (lead + detail) | 220–310 |
| Incidents + table context (lead + 60–100 after table) | 100–160 (table excluded) |
| New npm of the AI supply chain | 160–240 |
| Vet before connect | 190–280 |
| Contain a compromised server | 190–280 |
| Policy section | 190–280 |
| The Bottom Line | 40–60 |
| FAQ (lead + 3 × 40–60) | 160–240 |

---

## 8. WRITING CONSTRAINTS

1. **Banned AI-slop words (fail-level if present anywhere):** `delve`, `unlock`, `revolutionize`, `landscape`, `game-changer`, `transformative`.
2. **No "as an AI"** or any self-reference to being an AI/model; no first-person AI identity.
3. **No fabricated testing claims:** do NOT write "we tested", "we ran this on our servers", "in our lab", "verified in production", or any invented benchmark/performance result. The only verification performed was URL-level (HTTP checks on Aug 20, 2026). The canonical honesty line in §6.2 is the ONLY permitted testing disclaimer — use it verbatim.
4. **Tone:** plain, expert, direct. Short sentences. No marketing voice, no exclamation marks in body copy, no emoji, no superlatives ("blows everything else away"), no "stay vigilant"-style filler.
5. **Paraphrase:** do not copy sentences verbatim from the research brief or source pages. Sample paragraphs in §6 are provided for reuse; everything else must be your own phrasing.
6. **Exact dates:** use specific dates (verified August 20, 2026; GhostSplice disclosed August 11, 2026; CISA advisory May 1, 2026). Avoid vague "as of 2026" phrasing.
7. **No HTML** in the body except markdown links.
8. **Additionally avoid (softer deduction):** "it's important to note", "in today's fast-paced world", "it's worth noting", "crucial", "seamless", "ever-evolving", "Furthermore,"/"Moreover," as sentence openers, "in conclusion", "navigate the complexities".

---

## 9. SCORING RUBRIC (weighted, 0–10 per criterion)

| Criterion | Weight | What it measures (apply mechanically) |
|---|---|---|
| **Accuracy** | 30% | • Every MUST-INCLUDE FACT in §4 appears with exact numbers and dates: 75,556 (Aug 20, 2026); >10,000 (Dec 9, 2025); 72.8% ASR; refusal <3%; 42%→82% (Aug 11, 2026); 15 benign versions, backdoor v1.0.16, removed Sept 25, 2025; deprecated Jul 10, 2025, ~21,000 weekly npm downloads; 6 assistants, CVE-2026-12958; 18 extensions, MCP RAT Feb 2026; OWASP MCP Top 10 v0.1 beta, next release Oct 2026; CISA/Five Eyes May 1, 2026. • No rounding or "improving"; no fabricated testing claims; no invented tools/URLs/incidents; each incident attributed to the correct researcher and date (Invariant Apr 1 2025, ToB Apr 2025, MCPTox Aug 19 2025, Datadog 2025, Snyk Sept 2025, ExtensionTotal Apr 24 2025, Wiz Jul 8 2026, Unit 42 Apr 30 2026, GhostSplice Aug 11 2026). • Technical mechanisms accurate (stacked queries vs. read-only guard; hidden BCC; split description/result; confused deputy; no wildcard scopes; SSRF via `169.254.169.254`). |
| **Sourcing** | 25% | • Every claim carries an inline `[Source Name](URL)` link; all URLs come from the §4 approved pool (curl-verified HTTP 200 Aug 20, 2026) — zero URLs outside the pool. • ≥10 external links and ≥2 external primary sources (arXiv, NVD, Anthropic, Linux Foundation, modelcontextprotocol.io). • Zero `[N]` numbered citations, zero footnotes, zero References/Sources section, zero raw URLs as plain text; every H2 lead contains ≥1 inline source link; table rows carry links in the Attack/Incident cell. |
| **Quality** | 20% | • All 10 H2s present in the §3 order; `## How This Was Researched` is the first H2 with the canonical honesty line verbatim; no extra H2s; H3s only inside FAQ. • Every H2's first paragraph is 40–60 words (39 or 61 = fail) and self-contained; FAQ has exactly 3 question-shaped H3s ending in `?`, each answered in 40–60 words. • Word count 1500–2500; title ≤65 chars with keyword in first 5 words; description 150–160 prose chars with no stats; comparison table present with 4 columns and 11 rows; HERO_IMAGE_PROMPT is the literal last line; frontmatter keys exact; 4–8 internal hub links; no banned words; no verbatim copying from the brief. |
| **Practicality** | 15% | • All 7 mitigations from §4 are covered with actionable specifics (mcp-scan, mcp-context-protector/TOFU, allow-listing + version pinning, least-privilege accounts/containers + egress controls, OAuth 2.1 per-client consent, descriptions AND results as untrusted, shadow-MCP inventory + telemetry). • A reader can build an MCP security checklist end-to-end from this post alone; the policy section gives ordered steps; the FAQ answers operational questions; the table's Mitigation column gives a concrete control per incident. |
| **Engagement** | 10% | • Opening hook leads with a concrete 2026 stat (75,556 or 72.8%) and names a real incident within the first 100 words; keyword `MCP security` lands naturally early. • Question-shaped H2s match real operator questions; the comparison table is scannable; the Bottom Line gives a crisp verdict; no AI-slop words or marketing filler. |

**Scoring anchors:** 8–10 = exceeds all checks of the criterion; 5–7 = meets the letter with minor slips (one wrong figure, one 39-word lead, one off-pool URL); 0–4 = missing required elements or structural failures. **Weighted total = Σ(score × weight), rounded to 1 decimal. Threshold: 8.0.**

**Hard floor (cap at 7.0 regardless of other scores):** any fabricated fact/number; any `[N]` citation or end-of-post references list; missing canonical honesty line; H2 lead outside 40–60 words; any banned word or "as an AI"; any URL not in the §4 pool; missing comparison table; HERO_IMAGE_PROMPT missing, duplicated, or not the last line; word count outside 1500–2500 by >10%.

---

## 10. ANTI-PATTERNS → AUTOMATIC DEDUCTIONS

- **Language (-0.5 each, max -2 on Quality):** banned words (§8.1), "it's important to note", "in today's fast-paced world", "crucial", "seamless", "Furthermore," as sentence opener, "in conclusion", "stay vigilant".
- **Accuracy (fail-level):** altering numbers/dates from §4; claiming hands-on testing; using the excluded secondhand stats ("5.5% poisoned", "41% zero auth"); presenting GhostSplice as a CVE (it has none) or GhostApproval without CVE-2026-12958; misdating any incident.
- **Format (fail-level unless fixed):** missing/wrong-order H2s; H3s outside FAQ; fewer or more than 3 FAQ H3s; FAQ questions not ending in `?`; H2 lead outside 40–60 words; FAQ answers outside 40–60 words; table missing/extra tables/wrong columns; HERO_IMAGE_PROMPT issues; frontmatter missing keys or wrong `pubDate`; raw URLs as plain text; exclamation marks; emoji.
- **Other:** copying sentences verbatim from the brief or source pages; internal links to non-existent slugs; clickbait title not matching the mandated title; vagueness instead of exact dates.

---

## 11. DELIVERY CHECKLIST (verify before submitting)

- [ ] File saved at `src/content/blog/2026-08-20-mcp-security.md`
- [ ] Frontmatter matches §2 exactly (`pubDate` and `lastVerified` = 2026-08-20, `heroImage: ""`, 5 tags)
- [ ] Title exactly `MCP Security in 2026: The New Attack Surface of Agentic AI` (57 chars ≤65, `MCP Security` in first 5 words)
- [ ] Meta description 150–160 chars, one prose sentence, no digits
- [ ] Word count (hook → end of FAQ) within 1500–2500 (table excluded)
- [ ] All 11 MUST-INCLUDE facts present with exact figures/dates and §4 URLs inline-cited
- [ ] All 10 H2s present in §3 order; `## How This Was Researched` is the first H2 with the canonical honesty line verbatim
- [ ] Every H2's first paragraph 40–60 words with ≥1 inline source link (count them — 39 or 61 is a fail)
- [ ] FAQ: exactly 3 question-shaped H3s ending in `?`, each answer 40–60 words
- [ ] Comparison table: exactly 1 table, 4 columns, 11 rows, links in the Attack/Incident cell
- [ ] Every citation is inline `[Name](URL)`; zero `[N]`; zero raw URLs; ≥10 external links; ≥2 primary sources; 4–8 internal hub links (/cves/, /scan/, /frameworks/)
- [ ] HERO_IMAGE_PROMPT is the literal last line (exactly once)
- [ ] No banned words, no "as an AI", no fabricated testing claims, no exclamation marks, no emoji
- [ ] No sentences copied verbatim from the brief; no excluded secondhand stats

---

## 12. HERO_IMAGE_PROMPT (use VERBATIM as the last line of the post — `HERO_IMAGE_PROMPT: ` prefix included, single line, nothing after it)

`HERO_IMAGE_PROMPT: 16:9 cybersecurity hero banner, dark navy palette matching the blog's existing dark/cyan aesthetic. Isometric 3D-vector hybrid scene: on the left, a large glowing AI agent head icon (abstract neural-node sphere) connected by luminous cyan cables to a cluster of small server cubes marked with generic plug/port symbols, representing MCP servers. One server cube in the middle is cracked and leaking red data streams (abstract pixel shards and glitch fragments, no skulls, no gore) toward a row of credential icons (key, lock, mail envelope, database cylinder) on the right, where a thin shield outline intercepts part of the stream. Subtle circuit-board grid lines and faint code-glyph text in the background, cinematic rim lighting, high contrast, clean modern vector-3D hybrid style. Color palette: deep navy (#0a1128), cyan (#22d3ee), red accent (#f87171), white (#e2e8f0). No text, no words, no logos, no human hands or faces, no UI chrome. Professional cybersecurity blog hero, safe for work.`
