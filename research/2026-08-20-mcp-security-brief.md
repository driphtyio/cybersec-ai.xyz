# MCP (Model Context Protocol) Security — Deep-Research Brief

**Date:** August 20, 2026 · **Prepared for:** cybersec-ai.xyz deep-research post (Step 2 pipeline)
**Status:** Research brief based on official documentation and published vendor/academic reports (no hands-on testing performed in this pipeline).
**Scope:** What MCP is, why it won as the agent-integration standard, its attack surface, 2025–2026 real-world incidents, current mitigations, and a fully curl-verified source list.

---

## 1. Plain-language summary of the threat

MCP (Model Context Protocol) is the open standard — "a USB-C port for AI applications" — that lets AI agents plug into files, databases, email, browsers, and business tools (https://modelcontextprotocol.io/). Anthropic open-sourced it on Nov 25, 2024 (https://www.anthropic.com/news/model-context-protocol); by 2026 it is the default integration protocol, adopted by OpenAI, Google, Microsoft/Azure, AWS, and every major agent framework, and stewarded by the Linux Foundation's Agentic AI Foundation (https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation).

The security problem is structural: an MCP server is a plugin that ships *code plus text metadata (tool names, descriptions, schemas)* directly into the agent's trusted context, and it typically runs with the user's own OS-level privileges and connected credentials. That makes MCP servers the "new npm" of the AI supply chain: a single malicious or compromised server can (a) steal secrets via hidden instructions in tool descriptions (tool poisoning), (b) get swapped or updated after approval (rug pulls), (c) exfiltrate data across every other connected server (cross-server shadowing), (d) walk credentials/OAuth flows, and (e) be reached by other local processes such as browser extensions (sandbox escape). Researchers demonstrated these attacks in 2025; by 2026 they are being observed in the wild (malicious npm MCP packages, MCP-themed malware in browser extensions) and codified in the OWASP MCP Top 10.

**Bottom line for IT pros/analysts:** MCP adoption is mature and irreversible — the question is no longer "should we use it" but "how do we treat every MCP server as an untrusted, privileged dependency." The 2026 consensus (CISA/Five Eyes, OWASP, MCP official guidance, Trail of Bits, Invariant, Datadog) is: assume compromise, allow-list tools, pin/scan servers, sandbox execution, enforce OAuth 2.1 with explicit user consent, and audit everything.

---

## 2. What MCP is and why it became the default

- **Definition & architecture:** Open standard where "MCP servers" expose tools, resources, and prompts over stdio or Streamable HTTP, and "MCP clients" (Claude, ChatGPT, VS Code/Copilot, Cursor, Gemini, etc.) consume them. "MCP reduces development time and complexity" — one protocol replaces bespoke per-app connectors (https://modelcontextprotocol.io/).
- **Origin:** Introduced by Anthropic Nov 25, 2024, alongside SDKs and reference servers (Google Drive, Slack, GitHub, Git, Postgres, Puppeteer). Early adopters: Block, Apollo, Zed, Replit, Codeium, Sourcegraph (https://www.anthropic.com/news/model-context-protocol).
- **Vendor adoption timeline (dated facts):**
  - **OpenAI** — "was an early adopter of MCP"; official MCP docs for ChatGPT/Agents SDK at https://developers.openai.com/docs/mcp/ (verified live Aug 2026).
  - **Google** — Gemini API/SDK MCP support announced at Google I/O, May 20, 2025 (https://developers.googleblog.com/google-io-2025-developer-keynote-recap/); fully managed remote MCP servers for Google services (Maps, BigQuery, Compute Engine, GKE) announced Dec 10, 2025 (https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services).
  - **Microsoft** — MCP in Copilot Studio first release Mar 19, 2025, GA May 29, 2025 (https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/); GitHub Copilot "Agent Mode" with MCP support Apr 4, 2025 (https://github.blog/news-insights/product-news/github-copilot-agent-mode-activated/).
  - **Governance** — Dec 9, 2025: Anthropic donated MCP to the Linux Foundation's new Agentic AI Foundation (AAIF), with Block's goose and OpenAI's AGENTS.md; platinum members AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI (https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation).
  - **Current spec** — revision dated 2026-07-28 is live (docs/spec paths at https://modelcontextprotocol.io/); an official MCP Registry (namespace-verified metadata, preview) exists (https://modelcontextprotocol.io/registry/about.md).

---

## 3. The concrete attack surface (with primary sources)

### 3.1 Tool poisoning, rug pulls, cross-server shadowing (prompt injection via metadata)
- **Invariant Labs, Apr 1, 2025** — coined Tool Poisoning Attack (TPA): malicious instructions hidden inside MCP tool descriptions (invisible to users, read by the model) exfiltrate `~/.ssh/id_rsa`, `~/.cursor/mcp.json` (which stores other servers' credentials), etc. Also demonstrated **rug pulls** (server swaps tool descriptions after user approval) and **cross-server shadowing** (one malicious server rewrites behavior of a trusted server's tools — e.g., re-routing all emails to the attacker). Affected major clients incl. Cursor, Zapier, Anthropic/OpenAI products (https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).
- **Trail of Bits, Apr 2025** — four-part MCP attack research: **line jumping** (malicious tool descriptions execute before any tool is called; Apr 21), **conversation-history theft** via trigger phrases (Apr 23), **ANSI terminal deception** (escape sequences hide instructions from users but not the LLM; Apr 29), **insecure credential storage** (world-readable config files holding live API tokens; Apr 30) — landing page with all disclosures and the open-source `mcp-context-protector` (TOFU pinning) at https://trailofbits.com/mcp/ (disclosure: https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/).
- **MCPTox benchmark (academic), arXiv Aug 19, 2025** — first systematic large-scale evaluation: built on **45 live real-world MCP servers / 353 authentic tools**, generated **1,312 malicious test cases** across 10 risk categories; evaluated 20 LLM agents; **o1-mini had a 72.8% attack success rate**, and the highest refusal rate (Claude 3.7 Sonnet) was **under 3%** — safety alignment does not stop tool poisoning (https://arxiv.org/abs/2508.14925).
- **GhostSplice (ASSET Research Group, UMKC), disclosed Aug 11, 2026** — splitting one malicious instruction across a tool's `description` and `result` fields defeated refusal behavior: average exfiltration compliance rose from **42% (intact) to 82% (split)** across 11 model/client combos; GPT-4o, Gemini 2.0 Flash and Llama 3.3 70B went from 0% to 100% compliance. No CVE — described as an architectural flaw in how clients merge structured tool output into trusted context (https://asset-group.github.io/disclosures/ghostsplice/).

### 3.2 Classic appsec bugs in MCP servers (excessive agency)
- **Datadog Security Labs, 2025** — SQL injection in Anthropic's reference **Postgres MCP server**: stacked queries (`COMMIT; DROP SCHEMA public CASCADE;`) broke out of the "read-only" transaction guard, enabling arbitrary writes. The server was **deprecated July 10, 2025, yet still pulled ~21,000 times/week from npm and ~1,000/week from Docker Hub** at the time of writing — a live example of unpatched, privileged MCP dependencies (https://securitylabs.datadoghq.com/articles/mcp-vulnerability-case-study-SQL-injection-in-the-postgresql-mcp-server/).
- **Wiz Research, Jul 8, 2026 — "GhostApproval"** — trust-boundary flaw in **six** AI coding assistants (Amazon Q Developer, Claude Code, Augment, Cursor, Google Antigravity, Windsurf): approval dialogs showed a harmless symlink name while the write landed on a sensitive target (e.g., SSH config). Patched in Amazon Q Developer 1.69.0, tracked as **CVE-2026-12958** (https://www.wiz.io/blog/ghostapproval-a-trust-boundary-gap-in-ai-coding-assistants; https://nvd.nist.gov/vuln/detail/CVE-2026-12958).

### 3.3 Supply-chain attacks: malicious MCP packages on npm/PyPI
- **postmark-mcp (npm), Sept 15–25, 2025** — first widely confirmed malicious MCP server: a typosquat/impostor of the legitimate Postmark MCP server built trust over **15 benign versions**, then backdoored v1.0.16–1.0.18 with a **hidden BCC that exfiltrated every email an agent sent** to `giftshop.club`. Package removed from npm Sept 25, 2025; publisher account held 31 packages (https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails/; independent write-up https://semgrep.dev/blog/2025/so-the-first-malicious-mcp-server-has-been-found-on-npm-what-does-this-mean-for-mcp-security/).
- **Kaspersky Securelist, Sept 15, 2025** — walkthrough of MCP as a supply-chain foothold with a working PoC MCP server that harvests developer data on every session (https://securelist.com/model-context-protocol-for-ai-integration-abused-in-supply-chain-attacks/117473/).
- **Broader ecosystem context (2026):** npm/PyPI campaigns increasingly target AI developer tooling — MCP server configs and credentials are explicitly named as targets in 2026 supply-chain analysis (e.g., Unit 42 npm threat-landscape coverage: https://unit42.paloaltonetworks.com/monitoring-npm-supply-chain-attacks/).

### 3.4 OAuth / credential flows in MCP
- Official MCP **Security Best Practices** (spec revision 2026-07-28) document real OAuth-layer attacks on MCP deployments: the **confused-deputy problem** (MCP proxy servers using static client IDs + dynamic client registration + consent cookies let an attacker steal authorization codes and impersonate the user), **token passthrough** (servers forwarding tokens issued for other audiences — explicitly forbidden), and **SSRF via OAuth metadata discovery** (malicious `resource_metadata`/authorization-server URLs can point clients at `169.254.169.254` cloud-metadata endpoints or internal services) (https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices.md).

### 3.5 Cross-app exfiltration & "MCP as a browser-extension" attacks
- **WhatsApp MCP exploit (Invariant Labs, Apr 7, 2025)** — combined tool poisoning with a legitimate WhatsApp MCP server in the same context to exfiltrate full message histories (https://invariantlabs.ai/blog/whatsapp-mcp-exploited).
- **ExtensionTotal, Apr 24, 2025** — "Trust me, I'm local": Chrome extensions can reach **localhost MCP servers** (SSE on port 3001) with no authentication, escaping Chrome's sandbox; any local MCP server exposing filesystem/Slack/WhatsApp tools becomes an extension-reachable exfiltration pipe (https://blog.extensiontotal.com/trust-me-im-local-chrome-extensions-mcp-and-the-sandbox-escape-1875a0ee4823).
- **Unit 42, Apr 30, 2026** — 18 high-risk AI browser extensions reported to Google, including: AI-summary extensions exfiltrating data (Aug 2025), prompt/search hijackers (Sept 2025), and most recently an **MCP-themed RAT targeting AI developers (Feb 2026)** — a "Chrome MCP Server" extension with a live WebSocket C2 channel executing remote JS via `new Function()` (https://unit42.paloaltonetworks.com/high-risk-gen-ai-browser-extensions/).

### 3.6 Risk taxonomy
- **OWASP MCP Top 10 (v0.1, 2025, beta; next release Oct 2026):** MCP01 token mismanagement & secret exposure; MCP02 privilege escalation via scope creep; MCP03 tool poisoning (incl. rug pulls, schema poisoning, tool shadowing); MCP04 supply-chain attacks & dependency tampering; MCP05 command injection & execution; MCP06 intent flow subversion; MCP07 insufficient authentication & authorization; MCP08 lack of audit & telemetry; MCP09 shadow MCP servers; MCP10 context injection & over-sharing (https://owasp.org/www-project-mcp-top-10/).

---

## 4. Real-world impact (2025–2026)

- **Data at risk:** SSH keys, cloud/API credentials, MCP config files containing other servers' tokens, email contents (Postmark incident), WhatsApp histories, source code, DB contents (Postgres MCP SQLi), full conversation histories (Trail of Bits).
- **Blast radius amplification:** MCP servers run with the user's OS privileges and can reach every other connected server's data (cross-server shadowing, Invariant Apr 2025); agent-driven automation removes human-in-the-loop, so a single backdoored tool can exfiltrate at scale (Snyk's assessment of the postmark-mcp incident).
- **Scale of exposure:** the ecosystem grew from reference servers in Nov 2024 to **>10,000 published MCP servers by Dec 9, 2025** (https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) and **75,556 open-source MCP servers indexed in the Glama registry as of Aug 20, 2026** (https://glama.ai/mcp/servers). Even a small percentage of poisoned/unmaintained servers is a large absolute number of privileged plugins.
- **Observed vs. demonstrated:** Postmark-mcp (Sept 2025) and the MCP-themed browser-extension RAT (Feb 2026, Unit 42) are in-the-wild; tool poisoning, GhostSplice, GhostApproval, SQLi are published researcher demonstrations with working exploits — several affecting shipped, widely used clients (Cursor, Claude Code, Amazon Q Developer, etc.).

---

## 5. Current 2026 mitigations and security guidance

- **Government guidance:** CISA + ASD's ACSC and other Five Eyes partners — **"Careful Adoption of Agentic AI Services," published May 1, 2026** — the first joint Five Eyes agentic-AI advisory: conduct comprehensive threat modeling, continuous monitoring, and regular security assessments; align agentic-AI risk management with existing frameworks (https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services).
- **Official protocol guidance (Anthropic → AAIF-maintained):**
  - **Authorization (OAuth 2.1):** user-consent flows, dynamic client registration, exact redirect-URI matching, `state` parameter + CSRF protection, per-client consent storage, incremental scopes via `WWW-Authenticate` challenges, no wildcard scopes (https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization.md).
  - **Security Best Practices (spec 2026-07-28):** MUST NOT accept tokens not issued for the server (audience validation; token passthrough forbidden); SSRF defenses for OAuth metadata discovery; per-client consent to stop confused-deputy attacks; scope minimization (https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices.md).
  - **Official MCP Registry:** namespace authentication (reverse-DNS, GitHub/DNS verification) for server authenticity; security scanning delegated to package registries/aggregators (https://modelcontextprotocol.io/registry/about.md).
- **Tool allow-listing & approval:** Invariant's recommendations — show full tool descriptions in UI, pin server/tool versions with checksums, enforce cross-server dataflow boundaries (https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks); Trail of Bits `mcp-context-protector` for **trust-on-first-use (TOFU) pinning**, tool-description validation, ANSI sanitization, and guardrail/quarantine (https://trailofbits.com/mcp/).
- **Scanning/auditing:** `mcp-scan` (Invariant Labs, open source) statically scans configured MCP servers for tool poisoning, rug pulls, shadowing, prompt injection (https://invariantlabs.ai/blog/introducing-mcp-scan); Snyk recommends running it in CI and on agent hosts (https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails/). Datadog: treat MCP servers like any other dependency — patch, avoid deprecated/unmaintained servers, apply least-privilege DB roles (https://securitylabs.datadoghq.com/articles/mcp-vulnerability-case-study-SQL-injection-in-the-postgresql-mcp-server/).
- **Sandboxing:** run MCP servers as separate, least-privilege OS accounts/containers; restrict network egress; do not grant agents read access to credential files (GhostSplice advisory, https://asset-group.github.io/disclosures/ghostsplice/); block localhost MCP endpoints from browser extensions where possible (ExtensionTotal, https://blog.extensiontotal.com/trust-me-im-local-chrome-extensions-mcp-and-the-sandbox-escape-1875a0ee4823).
- **Vendor frameworks:** OWASP MCP Top 10 + **OWASP Top 10 for Agentic Applications 2026** (released Dec 9, 2025; 100+ contributors) (https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/); Microsoft AI Red Team **Taxonomy of Failure Modes in Agentic AI Systems v2.0** (34 failure modes cataloguing agentic failure incl. tool/context attacks) (https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/security/Taxonomy-of-Failure-Modes-in-Agentic-AI-Systems-v2-0.pdf).
- **Operational checklist for the blog post (synthesis of the above):** inventory every MCP server (shadow-MCP discovery); allow-list tools per server; pin versions and verify hashes; scan with mcp-scan before/after install; run servers sandboxed with least privilege; enforce OAuth 2.1 + per-client user consent; rotate any credential exposed to a third-party server; monitor tool-invocation telemetry (OWASP MCP08); treat tool descriptions AND tool results as untrusted input (GhostSplice).

---

## 6. Key statistics (exact numbers, dated, with source URLs)

| Stat | Value / date | Source (all verified HTTP 200) |
|---|---|---|
| MCP servers in Glama registry | 75,556 open-source servers (2026-08-20) | https://glama.ai/mcp/servers |
| Published MCP servers at AAIF launch | "more than 10,000" (Dec 9, 2025) | https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation |
| MCPTox benchmark scale | 45 live servers / 353 tools / 1,312 test cases (submitted Aug 19, 2025) | https://arxiv.org/abs/2508.14925 |
| MCPTox attack success | o1-mini ASR 72.8%; highest refusal rate (Claude 3.7 Sonnet) < 3% | https://arxiv.org/abs/2508.14925 |
| GhostSplice compliance jump | 42% (intact) → 82% (split) across 11 model/client combos (Aug 11, 2026) | https://asset-group.github.io/disclosures/ghostsplice/ |
| Postgres MCP SQLi | read-only bypass via stacked queries; server deprecated Jul 10, 2025; still ~21,000 weekly npm downloads / ~1,000 weekly Docker pulls | https://securitylabs.datadoghq.com/articles/mcp-vulnerability-case-study-SQL-injection-in-the-postgresql-mcp-server/ |
| postmark-mcp backdoor | 15 trust-building versions; backdoor from v1.0.16; removed from npm Sept 25, 2025 | https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails/ |
| AI browser extensions (Unit 42) | 18 high-risk extensions reported to Google (Apr 30, 2026); MCP-themed RAT Feb 2026 | https://unit42.paloaltonetworks.com/high-risk-gen-ai-browser-extensions/ |
| GhostApproval | 6 AI coding assistants affected; CVE-2026-12958 (Amazon Q Developer) | https://www.wiz.io/blog/ghostapproval-a-trust-boundary-gap-in-ai-coding-assistants ; https://nvd.nist.gov/vuln/detail/CVE-2026-12958 |
| OWASP MCP Top 10 | v0.1 (2025), beta; next release scheduled Oct 2026 | https://owasp.org/www-project-mcp-top-10/ |
| Five Eyes agentic-AI guidance | published May 1, 2026 | https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services |

---

## 7. Final verified URL list (10 core sources — every URL curl-verified HTTP 200 on Aug 20, 2026)

1. **MCP official Security Best Practices** (spec 2026-07-28) — https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices.md
2. **Anthropic: Introducing MCP** (Nov 25, 2024) — https://www.anthropic.com/news/model-context-protocol
3. **Invariant Labs: MCP Tool Poisoning Attacks** (Apr 1, 2025) — https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
4. **Trail of Bits: Line Jumping (MCP attack series)** (Apr 21, 2025) — https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/
5. **Datadog Security Labs: SQLi in the Postgres MCP server** — https://securitylabs.datadoghq.com/articles/mcp-vulnerability-case-study-SQL-injection-in-the-postgresql-mcp-server/
6. **Snyk: postmark-mcp malicious MCP server** (Sept 25, 2025) — https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails/
7. **MCPTox benchmark (arXiv:2508.14925)** — https://arxiv.org/abs/2508.14925
8. **OWASP MCP Top 10** — https://owasp.org/www-project-mcp-top-10/
9. **CISA / Five Eyes: Careful Adoption of Agentic AI Services** (May 1, 2026) — https://www.cisa.gov/resources-tools/resources/careful-adoption-agentic-ai-services
10. **Unit 42: High-risk GenAI browser extensions (incl. MCP-themed RAT)** (Apr 30, 2026) — https://unit42.paloaltonetworks.com/high-risk-gen-ai-browser-extensions/

**Supporting sources (also curl-verified 200, cited inline):**
- MCP Authorization (OAuth 2.1) tutorial — https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization.md
- Linux Foundation AAIF press release (Dec 9, 2025) — https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
- ASSET Research Group GhostSplice disclosure (Aug 11, 2026) — https://asset-group.github.io/disclosures/ghostsplice/
- ExtensionTotal Chrome-extension/MCP sandbox escape (Apr 24, 2025) — https://blog.extensiontotal.com/trust-me-im-local-chrome-extensions-mcp-and-the-sandbox-escape-1875a0ee4823
- Wiz GhostApproval blog (Jul 8, 2026) — https://www.wiz.io/blog/ghostapproval-a-trust-boundary-gap-in-ai-coding-assistants
- NVD CVE-2026-12958 — https://nvd.nist.gov/vuln/detail/CVE-2026-12958
- Invariant MCP-Scan (Apr 11, 2025) — https://invariantlabs.ai/blog/introducing-mcp-scan
- Trail of Bits MCP security hub — https://trailofbits.com/mcp/
- OpenAI MCP docs — https://developers.openai.com/docs/mcp/
- Google Cloud: official MCP support for Google services (Dec 10, 2025) — https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services
- Microsoft: MCP GA in Copilot Studio (May 29, 2025) — https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/model-context-protocol-mcp-is-now-generally-available-in-microsoft-copilot-studio/
- Microsoft AI Red Team: Taxonomy of Failure Modes in Agentic AI Systems v2.0 — https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/security/Taxonomy-of-Failure-Modes-in-Agentic-AI-Systems-v2-0.pdf
- Glama MCP registry (server count) — https://glama.ai/mcp/servers

---

## 8. Caveats for the writer

- All findings are based on official documentation and published reports; **no hands-on testing was performed** in this pipeline (per subagent-arena constraints).
- The Glama count (75,556) is a live registry figure captured Aug 20, 2026 — quote with the capture date.
- GhostSplice, GhostApproval, and the Unit 42 MCP-RAT are the freshest items (Aug 2026 / Jul 2026 / Feb 2026); the well-documented 2025 incidents (tool poisoning, Postmark-mcp, Postgres SQLi, browser-extension sandbox escape) remain the empirical core.
- Do not reuse third-party claims without a primary source: e.g., "5.5% of public MCP servers poisoned" (Invariant) and "41% of servers with zero auth" circulate only in secondary blogs and could not be traced to a primary URL — excluded from this brief.
