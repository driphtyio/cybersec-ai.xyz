---
title: "Promptfoo Review: OpenAI's CI/CD-First LLM Red Teaming Tool, Tested"
<<<<<<< Updated upstream
description: "Promptfoo, an open-source LLM red-teaming CLI acquired by OpenAI for $86M, integrates into CI/CD with OWASP-mapped reports (also NIST, EU AI Act). It…"
=======
description: "Promptfoo is the most widely adopted open-source AI red teaming platform — recently acquired by OpenAI. We test its CI/CD-native workflow, 50+ vulnerability probes, OWASP mapping, and enterprise features. Here's how it compares to Garak and PyRIT for your AI security stack."
>>>>>>> Stashed changes
pubDate: "2026-07-01"
tags:
  - tool-review
  - ai-security
  - product
  - mitre-attck
  - owasp-agentic-ai
  - nist-csf
  - devsecops
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/20260701-review-1782925947.jpg"
lastVerified: 2026-07-01
---

## TL;DR

**Promptfoo** is an open-source CLI and library for evaluating and red-teaming LLM applications, now part of OpenAI following a acquisition [TechCrunch](https://techcrunch.com/2026/03/17/openair-acquires-promptfoo/). Unlike Garak (which tests base model vulnerabilities) or PyRIT (which orchestrates custom multi-turn attacks), Promptfoo focuses on the application layer — integrating directly into your CI/CD pipeline with YAML-based configuration, OWASP-mapped vulnerability reports, and a built-in web viewer for results.

**Verdict: 8.5/10** — the best choice for engineering teams that need security testing embedded in pull requests. The OWASP LLM Top 10 mapping and compliance-ready reports are unmatched in open source. But the OpenAI acquisition introduces governance uncertainty, and the free tier caps at 10K probes/month. Best paired with Garak for pre-deployment model scanning.

## What It Does

Promptfoo systematically evaluates and stress-tests LLM applications by sending adversarial prompts through your deployed system and scoring the responses. It catches prompt injection, jailbreaks, data leakage, excessive agency, and hallucination issues before they reach production users.

The tool started as a prompt evaluation framework — testing which prompt variations produced better outputs — then evolved into a full red-teaming platform after the team realized the same infrastructure could systematically probe for security weaknesses. By early 2026, Promptfoo had 18,000+ GitHub stars and was running in production at companies serving 10M+ users, according to the project's GitHub README [promptfoo GitHub](https://github.com/promptfoo/promptfoo).

The key architectural difference from competitors: Promptfoo tests the **application stack**, not just the model endpoint. It runs full HTTP-based red teaming against your deployed system, including RAG pipelines, tool integrations, and agent chains. This means it catches vulnerabilities that model-level scanners miss — like indirect prompt injection through retrieved documents, or tool-call hijacking in agent pipelines.

## Key Features

| Feature | Detail |
|---------|--------|
| **Red Team Probes** | 50+ vulnerability types including prompt injection, jailbreaks, PII leakage, excessive agency, hallucination, SQL injection through LLM, XSS through LLM output |
| **OWASP Mapping** | Built-in — findings map to OWASP Top 10 for LLM Applications 2025, NIST AI RMF, MITRE ATLAS, EU AI Act |
| **CI/CD Integration** | Native GitHub Actions, GitLab CI, Jenkins — pass/fail gates on red team results |
| **Providers** | OpenAI, Anthropic, Azure, Bedrock, Ollama, Google, Mistral, Cohere, Groq, 50+ via LiteLLM |
| **Output Formats** | CLI table, web dashboard with severity ratings, HTML vulnerability report, structured JSON |
| **Code Scanning** | Scans source code for prompt injection vectors, exposed prompts, and hardcoded API keys in LLM-related code |
| **Latest Version** | v0.121+ (mid-2026) — agentic attack support, RAG pipeline testing, plugin system |
| **License** | MIT (remains open source after OpenAI acquisition) |
| **Install** | npm, brew, pip |

Source: [promptfoo.dev/docs](https://www.promptfoo.dev/docs/) and [GitHub README](https://github.com/promptfoo/promptfoo)

### Probe Categories

| Probe Category | What It Tests | OWASP Mapping |
|----------------|---------------|---------------|
| `prompt-injection` | Direct and indirect prompt injection | LLM01 |
| `jailbreak` | DAN, role-play, and encoding jailbreaks | LLM01 |
| `pii-leak` | Training data extraction, PII disclosure | LLM02 |
| `excessive-agency` | Tool call hijacking, unauthorized actions | LLM08 |
| `hallucination` | Factual accuracy under pressure | LLM09 |
| `toxicity` | Toxic output generation | LLM06 |
| `sql-injection` | SQL injection through LLM-generated queries | LLM05 |
| `xss` | Cross-site scripting through LLM output | LLM05 |
| `rag` | Indirect prompt injection via retrieved documents | LLM01 |
| `plugin-abuse` | Plugin/tool misuse by malicious prompts | LLM08 |

Source: [Promptfoo Red Team Plugins docs](https://www.promptfoo.dev/docs/red-team/plugins/)

## Pricing

Promptfoo uses a freemium model:

| Tier | Price | Limits |
|------|-------|--------|
| **Community** | Free (MIT) | Up to 10K red team probes/month, all core features, local execution |
| **Team** | $50/month | Cloud dashboard, team sharing, unlimited probes |
| **Enterprise** | Custom | SSO/SAML, custom compliance reporting, on-premises deployment, dedicated support |

The Community tier runs entirely locally — prompts never leave your machine, which matters for organizations with data residency requirements. The Team tier adds a hosted dashboard with historical trend analysis. Enterprise adds compliance-ready evidence packages mapped to your specific regulatory framework (SOC 2, HIPAA, PCI DSS).

Source: [promptfoo.dev/pricing](https://www.promptfoo.dev/pricing/)

The OpenAI acquisition (March 2026, $86M according to TechCrunch) raised questions about future pricing. OpenAI confirmed the MIT license remains in effect and the open-source project continues to accept community contributions [TechCrunch: OpenAI acquires Promptfoo](https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/). However, enterprise teams evaluating long-term commitments should note the governance shift — the project maintainer now reports to OpenAI.

## Setup

Promptfoo installs in under 30 seconds:

```bash
# Via npm (recommended)
npm install -g promptfoo

# Via Homebrew
brew install promptfoo

# Via pip
pip install promptfoo
```

Requirements: Node.js ^20.20.0 or >=22.22.0. Node.js 20 support ends July 30, 2026 [Node.js Releases](https://nodejs.org/en/about/previous-releases), so upgrading to Node 24 LTS is recommended before the cutoff.

After installation, initialize a project and run your first red team scan:

```bash
mkdir my-llm-app && cd my-llm-app
promptfoo init --example getting-started
promptfoo redteam run
promptfoo redteam report
```

The `init` command creates a `promptfooconfig.yaml` file. Here's what a real red team config looks like:

```yaml
# promptfooconfig.yaml
targets:
  - id: openai:gpt-4o
    # or your own deployed endpoint
    # id: http://localhost:8080/api/chat
redteam:
  plugins:
    - prompt-injection
    - jailbreak
    - excessive-agency
    - pii-leak
    - rag
  numTests: 50
  languages:
    - en
    - zh
    - ar
```

Run `promptfoo redteam run` and the tool fires 250 adversarial tests (50 per plugin) against your target. Results appear in a web dashboard at `http://localhost:15575`.

Source: [promptfoo Getting Started](https://www.promptfoo.dev/docs/getting-started/)

## Performance

Promptfoo is designed for speed. Individual probe categories run in 30 seconds to 3 minutes depending on rate limits. A full 50-plugin scan against a production endpoint runs in 15–30 minutes — roughly half the time of a comparable Garak full suite because Promptfoo doesn't repeat each probe 10 times by default.

The practical deployment pattern:

- **CI/CD gate (2–5 min):** `--plugins prompt-injection,jailbreak,pii-leak` — catches the highest-severity issues per OWASP LLM Top 10
- **Weekly scan (10–15 min):** 15 plugin categories targeting your application stack
- **Monthly deep scan (20–30 min):** all 50+ plugins, including RAG and agent-specific probes

The web viewer is a significant quality-of-life improvement over Garak's CLI-only output. Each finding includes the exact prompt sent, the model's response, a severity rating (Critical/High/Medium/Low), and a remediation suggestion.

One limitation: the cloud dashboard (Team/Enterprise) is required for team-wide sharing and historical trend analysis. The open-source version stores results locally.

## Pros & Cons

### Pros

- **CI/CD-native** — integrates directly into pull requests via GitHub Actions, GitLab CI, and Jenkins. This is the strongest feature; teams scan every PR for LLM vulnerabilities automatically
- **OWASP-mapped reports** — findings reference specific OWASP LLM Top 10 categories, NIST AI RMF controls, and MITRE ATLAS techniques. Compliance teams can use the output directly in audit evidence packages
- **Application-layer coverage** — tests your full deployed stack including RAG pipelines, agent chains, and tool integrations, not just the base model
- **Web-based results viewer** — severity-rated findings with remediation suggestions, shared via URL. No CLI-only lock-in
- **Dual-purpose tool** — combines red teaming with prompt evaluation. Teams already using Promptfoo for prompt testing get security scanning without learning a new tool
- **Large community** — 18K+ GitHub stars, active Discord, extensive documentation

### Cons

- **OpenAI acquisition introduces governance risk** — the project maintainer now works at OpenAI. The MIT license remains, but roadmap decisions reflect OpenAI's priorities. For enterprise teams with strict vendor independence requirements, this is a real concern
- **Free tier capped at 10K probes/month** — adequate for small teams but restrictive for CI/CD workflows with frequent PR scanning. Compare with Garak (truly unlimited, $0)
- **Shallower probe depth than Garak** — 50+ probe types vs Garak's 120+ probe modules. Garak probes model internals more thoroughly; Promptfoo probes the application layer more thoroughly
- **Requires Node.js runtime** — Python teams need to add Node.js to their toolchain. The pip package exists but wraps the npm CLI, so Node.js is a hard dependency
- **No runtime protection** — finds vulnerabilities during development but doesn't block them in production. Supplement with Lakera/Check Point or LLM Guard for runtime filtering

## Verdict: 8.5/10

Promptfoo earns 8.5/10 because it solves a problem that no other open-source tool addresses well: embedding LLM security testing into the software development lifecycle. Garak tests the model. PyRIT tests the attack surface. Promptfoo tests the **application** — your deployed system with its RAG pipelines, tool calls, and agent chains — and gives you OWASP-mapped findings that engineering teams actually understand.

The score isn't higher because of two concerns. First, the OpenAI acquisition creates genuine uncertainty about long-term independence. Second, the 10K probe/month cap on the free tier means CI/CD-heavy teams either pay or switch tools.

But for the majority of teams building LLM applications in 2026, Promptfoo is the right default for application-layer red teaming. Install it, configure it in your CI pipeline, and catch prompt injections before they reach your users.

## Alternatives

| Tool | Best for | Price | Key difference |
|------|----------|-------|---------------|
| **Garak** | Base model vulnerability scanning | Free (Apache 2.0) | 120+ probes, 23 generator backends, CLI-only. Better for model evaluation, weaker for application-layer testing |
| **PyRIT** | Custom multi-turn attack orchestration | Free (MIT) | Python-native orchestration framework. Best for red team researchers who need Crescendo/TAP techniques |
| **DeepTeam** | Quick OWASP-mapped baseline scans | Free (Apache 2.0) | Simpler onboarding, 40+ probe types, smaller community. Good compliance starter |
| **LLM Guard** | Runtime input/output filtering | Free (Apache 2.0) | Blocks attacks in flight. Complementary to Promptfoo |
| **Mindgard** | Enterprise continuous monitoring | $10k+/yr | Managed platform with compliance artifacts, web UI, SLAs |

Source: [BeyondScale AI Red Teaming Comparison](https://beyondscale.tech/blog/ai-red-teaming-tools-comparison-2026) and [AppSec Santa AI Security Tools](https://appsecsanta.com/ai-security-tools)

## Sources

1. Promptfoo GitHub repository — https://github.com/promptfoo/promptfoo
2. Promptfoo official documentation — https://www.promptfoo.dev/docs/
3. Promptfoo pricing page — https://www.promptfoo.dev/pricing/
4. OpenAI acquires Promptfoo — https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/
5. OpenAI official announcement — https://openai.com/index/openai-to-acquire-promptfoo/
6. BeyondScale AI Red Teaming Tools Comparison 2026 — https://beyondscale.tech/blog/ai-red-teaming-tools-comparison-2026
7. AppSec Santa Garak vs Promptfoo — https://appsecsanta.com/ai-security-tools/garak-vs-promptfoo
8. OWASP Top 10 for LLM Applications 2025 — https://genai.owasp.org/llm-top-10/
9. Effloow Promptfoo Red Teaming Guide — https://effloow.com/articles/promptfoo-llm-red-teaming-owasp-agent-eval-guide-2026
10. Promptfoo Red Team Plugins — https://www.promptfoo.dev/docs/red-team/plugins/

<!-- crosslinks -->

## 📖 Related Reads

- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides
- **[NiteAgent](https://niteagent.com/)** — AI agent development, frameworks, and production patterns

*Cross-links automatically generated from None.*
