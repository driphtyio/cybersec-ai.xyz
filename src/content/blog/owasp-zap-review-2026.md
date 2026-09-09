---
title: "OWASP ZAP Review 2026: Free DAST With LLM-Era Smarts"
description: "Our OWASP ZAP review covers its new LLM support add-on, MCP server scanning, authentication fixes, and CI automation for teams choosing a free DAST scanner in 2026."
pubDate: "2026-09-09"
tags: ["tool-review", "zap", "dast", "web-security", "mcp", "llm-security"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/owasp-zap-review-2026-1788976051.webp"
lastVerified: "2026-09-09"
---

Is OWASP ZAP still free in 2026? Yes — entirely free, with no paid tier, and the tool has never been more capable. Our verdict: ZAP remains the strongest free DAST scanner available, and this year has widened the gap. The opt-in [LLM Support add-on](https://www.zaproxy.org/blog/2026-08-07-zap-llm-support/) launched in August, [first-class MCP server scanning](https://www.zaproxy.org/blog/2026-05-21-scanning-mcp-servers-with-zap/) arrived in May, and the Client Spider is now the [recommended crawler](https://www.zaproxy.org/blog/2026-09-08-zap-updates-august-2026/) ahead of the AJAX Spider's removal from nightly and weekly Docker images the week of September 14, 2026. For teams testing modern, AI-adjacent web applications on a zero budget, nothing else free comes close. One thing to unlearn before you start: the project left OWASP behind, and the scanner you download today is branded "ZAP by Checkmarx" — more on that below.

## How We Tested

This review is based on the vendor's official website, documentation, release notes, and blog posts — we did not run the tool hands-on. Last reviewed: September 2026.

## What Is ZAP and Why Isn't It Called OWASP ZAP Anymore?

ZAP (Zed Attack Proxy) is the world's most widely used web app scanner — free, open source, and a GitHub Top 1000 community project ([zaproxy.org](https://www.zaproxy.org/)). And no, it is not called OWASP ZAP anymore: that label now signals an outdated source, because the project left OWASP more than three years ago.

The split happened in stages. The Core Team left OWASP in September 2023 and joined the Linux Foundation's Software Security Project ([ownership docs](https://www.zaproxy.org/docs/zap-ownership/)). On September 24, 2024, the team announced it was joining forces with Checkmarx, which now employs three Core Team members to work on ZAP — the reason you'll see "ZAP by Checkmarx" branding on releases ([announcement](https://www.zaproxy.org/blog/2024-09-24-zap-has-joined-forces-with-checkmarx/)). The project remains free and open source, with weekly releases published to [GitHub](https://github.com/zaproxy/zaproxy).

## Core Features: Proxy, Scanners, and Authentication Handling

ZAP's core feature set covers the full DAST workflow: a local intercepting proxy, the JavaScript-aware Client Spider — the recommended crawler since July 2026 — passive scanning, active scanning, and fuzzing ([feature docs](https://www.zaproxy.org/docs/desktop/start/features/)). Authentication, the usual failure point for automated scanners, received a major overhaul across 2025.

Browser Based Authentication auto-fills login forms, handles multi-screen flows, and supports TOTP; Client Script Authentication replays recorded Zest scripts for unusual login sequences; session-token auto-detection tracks authenticated state; and the new Authentication Report documents logins with screenshots and HTTP logs ([2025 highlights](https://www.zaproxy.org/blog/2026-02-02-zap-updates-2025-highlights-2026-plans/)). The current stable release, 2.17.0 (finalized late 2025), added alert de-duplication, headless and CI performance optimizations, policy-based alert tagging, and WAVSEP-based benchmarking ([release notes](https://www.zaproxy.org/docs/desktop/releases/2.17.0/)). A REST API, scripting, reporting, SBOM generation, and the add-on Marketplace round out the toolkit ([features](https://www.zaproxy.org/docs/desktop/start/features/)).

## The 2026 Differentiator: LLM Support and MCP Server Scanning

Two 2026 releases set ZAP apart from every other free scanner this September. The LLM Support add-on, launched in August 2026, connects Claude, Gemini, Azure OpenAI, Ollama, or any OpenAI-compatible endpoint to a tabbed chat panel inside ZAP ([launch post](https://www.zaproxy.org/blog/2026-08-07-zap-llm-support/)). The MCP add-on, launched in May 2026, makes Model Context Protocol servers first-class scan targets ([MCP post](https://www.zaproxy.org/blog/2026-05-21-scanning-mcp-servers-with-zap/)).

Both are deliberate about control. LLM Support is strictly optional and opt-in: you choose the provider and the key, and the add-on powers an LLM-driven OpenAPI importer plus a "Review using LLM/AI" option for Alert Filters ([add-on docs](https://www.zaproxy.org/docs/desktop/addons/llm-support/)). It also integrates with the MCP add-on, so the model can call ZAP's own tools mid-session. The MCP add-on performs the full MCP handshake, enumerates every tool, resource, and prompt a server exposes, then sends representative requests so the JSON-RPC traffic lands in ZAP's history and sites tree — from there, passive scanning, active scanning, fuzzing, and reporting work exactly as they do for any API. Given how much sensitive surface an exposed MCP server presents, the timing matters; our guide to [MCP security risks](/blog/2026-08-20-mcp-security/) covers the threat model in depth.

## Automation and CI/CD Integration

ZAP's Automation Framework defines complete scan plans as YAML, and version 2.17.0 added policy-based alert tagging to those plans ([2.17.0 release](https://www.zaproxy.org/docs/desktop/releases/2.17.0/)). Official Docker images ship weekly (latest tag: `w2026-09-08`), and the [`action-mcp-scan` GitHub Action](https://github.com/zaproxy/action-mcp-scan) brings MCP server scanning into CI pipelines with one workflow file.

The Client Spider now runs inside Automation Framework plans (Phase 1, May 2026), so JavaScript-heavy apps no longer need a separate crawl step ([May 2026 update](https://www.zaproxy.org/blog/2026-06-02-zap-updates-may-2026/)). Note the cleanup in container images: starting the week of September 14, 2026, the AJAX Spider and DOM XSS add-ons are removed from nightly and weekly Docker releases. Both remain installable from the Marketplace, and the OWASP PTK add-on is now the recommended route for DOM XSS testing ([August 2026 update](https://www.zaproxy.org/blog/2026-09-08-zap-updates-august-2026/)). For pipeline-integrated testing more broadly, our [scanner comparison hub](/scan/) maps how DAST fits alongside other scanning categories.

## Is OWASP ZAP Still Free in 2026?

Yes — ZAP is completely free in 2026, with no paid tier, trial limits, feature gating, or scan quotas. Funding comes from Checkmarx, which employs three of the project's Core Team members ([ownership docs](https://www.zaproxy.org/docs/zap-ownership/)), and every add-on in the ZAP Marketplace is community-contributed and free ([zaproxy.org](https://www.zaproxy.org/)).

Downloads cover Windows 64-bit and 32-bit, Linux installers and packages, macOS builds for both Intel and Apple Silicon, and a cross-platform package ([download page](https://www.zaproxy.org/download/)). One practical note: current releases are unsigned, so your browser or operating system may flag the installer. Checksums are published on the [v2.17.0 GitHub release page](https://github.com/zaproxy/zaproxy/releases/tag/v2.17.0), so verify before running.

## OWASP ZAP vs Burp Suite: What's Different in 2026?

ZAP and Burp Suite are both leading web application scanners, but their 2026 economics differ: ZAP is fully free and open source with no paid tier, while Burp Pro is a paid product and Burp Community, though free, limits active scanning — as our [Burp Suite Review 2026](/blog/burp-suite-review-2026/) details.

On the ZAP side of the ledger, 2026 brought first-class MCP server scanning, opt-in LLM integration, the community Marketplace, and a Client Spider that has replaced the aging AJAX Spider for JavaScript-heavy apps ([August 2026 update](https://www.zaproxy.org/blog/2026-09-08-zap-updates-august-2026/)). For the current state of Burp's feature set and pricing, see the sibling review. Team preference plays a role, but for CI-native DAST against AI-era targets such as MCP servers — and for budgets of exactly zero — ZAP is the stronger free option. Scanner choice is one layer anyway; our [security frameworks](/frameworks/) hub covers how tooling maps to governance requirements.

## Who Should Use ZAP?

ZAP suits three audiences in 2026: security analysts running DAST against web apps and APIs, DevSecOps teams embedding scans into CI/CD via the Automation Framework and GitHub Actions, and researchers probing MCP servers or experimenting with LLM-assisted testing. It is the right tool when budget is zero and control over scanner behavior matters ([zaproxy.org](https://www.zaproxy.org/); [features](https://www.zaproxy.org/docs/desktop/start/features/)).

Open source means you can script, extend, and audit everything — an advantage teams with strict procurement requirements shouldn't underestimate. It is the wrong fit for organizations that want a fully managed scanner with a support contract behind it; those buyers should evaluate commercial DAST platforms. And if your scope is infrastructure rather than web applications, that's a different category — our [Nessus Review 2026](/blog/nessus-review-2026/) covers network vulnerability scanning.

## FAQ

### Is OWASP ZAP safe to use on production systems?

ZAP includes an intercepting proxy, active scanner, and fuzzer that will send attack payloads to targets. Active scanning against production can trigger alerts, degrade performance, or corrupt data. Use ZAP against staging or test environments unless you have explicit authorization and understand the risk. The Automation Framework supports controlled, policy-based scans to reduce noise.

### Does OWASP ZAP work with Docker and Kubernetes?

ZAP publishes official Docker images with weekly release tags (latest: `w2026-09-08`). The Automation Framework runs headless inside containers, so the same YAML plans that work on a laptop run unchanged in CI. For MCP targets, the `action-mcp-scan` GitHub Action wraps ZAP for container-based pipelines, letting teams scan Model Context Protocol servers on every build.

### Can ZAP scan APIs and MCP servers, not just web pages?

Yes. ZAP imports OpenAPI, GraphQL, and SOAP definitions for API scanning. The MCP add-on (launched May 2026) performs the full Model Context Protocol handshake, enumerates every tool, resource, and prompt, then runs passive scanning, active scanning, and fuzzing against the JSON-RPC traffic. The LLM Support add-on can also drive OpenAPI import via an LLM.

<!-- crosslinks -->

## 📖 Related Reads

- **[Hermes Tutorials](https://hermes-tutorials.dev/)** — Hermes Agent setup, configuration, and advanced workflows
- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides
- **[NiteAgent](https://niteagent.com/)** — AI agent development, frameworks, and production patterns
- **[CodeIntel Log](https://codeintel.xyz/)** — code quality, debugging, and software engineering benchmarks

*Cross-links automatically generated from None.*
