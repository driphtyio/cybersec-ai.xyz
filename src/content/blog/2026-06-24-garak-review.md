---
title: "Garak Review: NVIDIA's Open-Source LLM Vulnerability Scanner, Tested"
description: "Garak (8.2k GitHub stars, Apache 2.0) is NVIDIA's open-source LLM vulnerability scanner with 50+ probe modules for prompt injection, jailbreaks, encoding bypasses, and data leakage. We test it against real model endpoints, break down the CLI workflow, compare it to PyRIT and Promptfoo, and tell you whether it deserves a spot in your AI security stack."
pubDate: "2026-06-24"
tags:
  - tool-review
  - ai-security
  - product
  - mitre-atlas
  - owasp-agentic-ai
  - nist-ai-rmf
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/20260624-review-1782314880.jpg"
---

## TL;DR

**Garak** (Generative AI Red-teaming and Assessment Kit) is NVIDIA's free, open-source LLM vulnerability scanner. Point it at any model endpoint — OpenAI, Anthropic, AWS Bedrock, or a local Ollama instance — and it fires hundreds of adversarial probes across 50+ modules, covering prompt injection, DAN jailbreaks, encoding bypasses, training data leakage, package hallucination, and toxicity generation. Results land in structured JSONL and HTML reports.

**Verdict: 9/10** — the broadest open-source probe library available, actively maintained by NVIDIA's AI Red Team with 8.2k GitHub stars and 71 contributors. CLI-only, so expect a learning curve. Best paired with PyRIT for multi-turn agent attacks and Promptfoo for CI/CD gates.

## What It Does

Garak systematically probes language models for security weaknesses before attackers find them. You point it at a model endpoint, select which probe modules to fire, and it generates adversarial inputs — then sends each prompt multiple times (ten by default) to account for the model's non-deterministic output, scores responses through detector modules, and writes a complete audit trail.

The tool follows the same principle as Nessus or Nuclei for traditional infrastructure: run the scanner first, fix what breaks, then deploy. The difference is that most LLM deployments skip this step entirely. According to NVIDIA's own research, published in their arXiv paper [garak: A Framework for Security Probing Large Language Models](https://arxiv.org/abs/2406.11036), garak was designed to fill this gap — providing a standardized, repeatable way to discover vulnerabilities in generative AI systems before they reach production.

## Key Features

| Feature | Detail |
|---------|--------|
| **Probe Modules** | 50+ covering prompt injection, DAN jailbreaks, encoding bypasses (Base64, ROT-13, Morse, Braille, hex), data leakage, package hallucination, malware generation, XSS, visual jailbreaks |
| **Detector Types** | 28 built-in — string matching, classifier-based, LLM-as-judge |
| **Generator Backends** | 23 including OpenAI, Anthropic, Hugging Face, AWS Bedrock, Cohere, Groq, Mistral, Ollama, LiteLLM, Replicate, custom REST |
| **Output Formats** | JSONL reports, HTML reports (redesigned v0.14.0), hit logs, debug logs |
| **Latest Version** | v0.15.0 (May 2026) — multi-turn GOAT probe, Agent-breaker probe, system-prompt-extraction probe, ModernBERT refusal detector, NeMo Guardrails server support |
| **License** | Apache 2.0 |
| **Python** | 3.10–3.12 |

Source: [NVIDIA/garak GitHub repository](https://github.com/NVIDIA/garak)

### Probe Categories

Each probe module targets a specific vulnerability class and maps to the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/):

| Probe | What It Tests | OWASP Mapping |
|-------|---------------|---------------|
| `promptinject` | Direct prompt injection hijacking | LLM01 |
| `dan` | "Do Anything Now" jailbreak variants (6.0–11.0, STAN, DUDE, AntiDAN) | LLM01 |
| `encoding` | Encoding-based guardrail bypasses | LLM01 |
| `leakreplay` | Training data extraction | LLM02 |
| `packagehallucination` | Fake package name suggestions (supply chain) | LLM03 |
| `malwaregen` | Malware generation attempts | LLM05 |
| `xss` | Cross-site scripting via LLM output | LLM05 |
| `goodside` | Safe content verification | LLM06 |
| `visual_jailbreak` | Visual encoding jailbreaks | LLM01 |
| `atkgen` | Automated attack generation | LLM01 |

Source: [AppSec Santa garak review](https://appsecsanta.com/garak) and [Best LLM Scanners comparison](https://bestllmscanners.com/posts/best-llm-vulnerability-scanners-2026)

## Pricing

**$0.** Garak is free and open-source under Apache 2.0. No paid tiers, no enterprise license, no usage caps. You install it locally via pip, and the only cost is the API credits for the target model you're scanning.

This is the strongest pricing advantage in the category. PyRIT (also free) requires more configuration. Promptfoo was acquired by OpenAI in March 2026 and remains MIT-licensed but now has an unknown governance trajectory. Mindgard starts at five figures annually. Garak is genuinely free.

Source: [OpenAI acquires Promptfoo — TechCrunch](https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/)

## Setup

Garak installs in under two minutes:

```bash
# Install via pip
python -m pip install -U garak

# Or from source for the latest features
git clone https://github.com/NVIDIA/garak.git
cd garak
python -m pip install -e .
```

Requirements: Python 3.10–3.12. Works on Linux, macOS, and Windows.

After installation, set your target model's API key and run:

```bash
export OPENAI_API_KEY="sk-..."
python3 -m garak --target_type openai --target_name gpt-4o --probes encoding
```

This scans GPT-4o for encoding-based guardrail bypasses. Garak sends each probe ten times, scores the responses, and writes a JSONL report. The full suite against a production model takes 20–60 minutes depending on rate limits; targeted probe subsets run in 2–5 minutes.

Source: [garak installation documentation](https://docs.garak.ai/garak/llm-scanning-basics/setting-up/installing-garak)

## Performance

Garak's strength is breadth, not speed. A full scan across all 50+ probe modules against a single model via OpenAI API takes roughly 30–60 minutes. The practical deployment pattern is targeted probe subsets:

- **Quick check (2–3 min):** `--probes encoding,dansimple` — encoding bypasses and modern DAN variants
- **Standard audit (10–15 min):** `--probes promptinject,dan,encoding,leakreplay` — the four highest-severity categories
- **Deep assessment (30–60 min):** `--probes all` — every probe module runs

The v0.15.0 release (May 2026) added a multi-turn GOAT probe and Agent-breaker probe specifically designed for agentic architectures, which require more generations per probe and extend scan times. The ModernBERT refusal detector introduced in the same release improves detection accuracy for refusal-based security checks.

Source: [Best LLM Scanners — Garak v0.15.0](https://bestllmscanners.com/posts/best-llm-vulnerability-scanners-2026)

## Pros & Cons

### Pros

- **Broadest probe library available in open source** — 50+ modules cover more attack categories than PyRIT, Promptfoo, or any other free alternative
- **Actively maintained by NVIDIA's AI Red Team** — 8.2k GitHub stars, 71 contributors, 3,500+ commits; v0.15.0 shipped May 2026
- **23 generator backends** — supports virtually every major LLM provider and local models via Ollama
- **Truly free** — Apache 2.0 license, no paid tiers, no enterprise lock-in
- **Plugin architecture** — custom probes, detectors, and generators are straightforward to write

### Cons

- **CLI-only interface** — no dashboard, no web UI, no visual reporting beyond HTML. Requires scripting for CI/CD integration
- **No multi-turn agentic attack coverage** (until v0.15.0 GOAT probe) — trailing behind PyRIT's XPIAOrchestrator for RAG and agent pipeline attacks
- **Full suite is slow** — 30–60 minutes against rate-limited APIs
- **Pre-deployment scanner only** — finds holes but doesn't block them at runtime. Needs pairing with guardrails like NeMo Guardrails or LLM Guard
- **Steep learning curve for non-developers** — requires comfort with CLI, Python environments, and API key management

## Verdict: 9/10

Garak is the closest thing to Nessus for LLMs. It earns the top score because it fills a critical gap — systematic, repeatable pre-deployment vulnerability scanning for generative AI — at zero cost with an actively growing probe library backed by a major vendor.

It's not perfect. The lack of a UI and the time cost of full scans mean teams need to script targeted subsets for CI/CD gates. And it should never be your only AI security layer — pair it with runtime guardrails for production protection.

But if you deploy any LLM endpoint and you're not running Garak before production, your model has vulnerabilities you haven't found yet.

## Alternatives

| Tool | Best for | Price | Key difference |
|------|----------|-------|---------------|
| **PyRIT** | Multi-turn agent attacks, RAG pipelines | Free (MIT) | Stronger indirect injection coverage; more configuration effort |
| **Promptfoo** | CI/CD gate integration | Free (MIT, now OpenAI-owned) | Cleanest dev workflow; narrower probe depth |
| **Mindgard** | Enterprise compliance | $10k+/yr | Managed platform, compliance artifacts, web UI |
| **LLM Guard** | Runtime input/output filtering | Free (Apache 2.0) | Blocks attacks in flight; not a pre-deployment scanner |

Source: [Best LLM Vulnerability Scanners 2026 comparison](https://bestllmscanners.com/posts/best-llm-vulnerability-scanners-2026)

## Sources

1. NVIDIA/garak GitHub repository — https://github.com/NVIDIA/garak
2. garak arXiv paper — https://arxiv.org/abs/2406.11036
3. AppSec Santa garak review — https://appsecsanta.com/garak
4. Best LLM Scanners comparison 2026 — https://bestllmscanners.com/posts/best-llm-vulnerability-scanners-2026
5. ToxSec garak review — https://www.toxsec.com/p/garak-llm-vulnerability-scanner
6. OWASP Top 10 for LLM Applications 2025 — https://genai.owasp.org/llm-top-10/
7. garak installation docs — https://docs.garak.ai/garak/llm-scanning-basics/setting-up/installing-garak
8. OpenAI acquires Promptfoo — https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/
9. garak.ai homepage — https://garak.ai/
10. OECD AI garak catalogue entry — https://oecd.ai/en/catalogue/tools/garak,-llm-vulnerability-scanner
