---
title: "NoCode Weekly: June 13 — n8n v2.26 Ships With Major AI Improvements, Make Adds MCP Tools to Agents"
description: "n8n ships v2.26.0 with 36 bug fixes and AI workflow upgrades. Make AI Agents gain MCP tool support. Zapier pivots to orchestration. Plus reviews of Base44, Bolt.new, Macaly, Gumloop vs n8n, and more."
pubDate: 2026-06-13
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/nocode-weekly-2026-06-13-1781416880.jpg"
category: "news"
tags: ["nocode", "weekly", "news", "roundup", "n8n", "make", "zapier", "ai-app-builders"]
draft: false
---

## TL;DR

- **n8n v2.26.0 landed** with 36 bug fixes, AI workflow improvements, MCP registry node wiring, and security patches for CVE vulnerabilities [1][2].
- **Make AI Agents can now connect to external MCP servers**, plus Claude Opus 4.8 and Gemini 3.5 Flash are available in the scenario builder [3][4].
- **Three AI app builders reviewed this week** — Base44, Bolt.new, and Macaly — giving you a complete picture of the current landscape for non-developers building real apps.

---

## 🔥 Top No-Code News

### 1. n8n v2.26.0: Major Release With AI Workflow Upgrades

n8n pushed **v2.26.0 on June 9** — a significant release with 36 bug fixes, several security patches (CVE fixes for hono and postcss from Trivy nightly scans), and meaningful AI-oriented improvements [1].

The most notable changes for no-code builders:

- **MCP registry node wiring** — AI Agent tools now prefer MCP registry nodes when wiring tools, making it easier to connect external services [2].
- **AI workflow completion grounding** — Inserts instance AI prompt suggestions in the editor rather than auto-submitting [2].
- **Sub-workflow timeout isolation** — Sub-workflows now respect their own timeout settings and the global timeout config, preventing parent workflows from hanging indefinitely [2].
- **AI builder sandboxes** — Now kept thread-scoped and non-ephemeral for better stability during long AI-assisted builds [2].
- **OAuth improvements** — PKCE state stored per-flow in cache; actionable error messages when OAuth2 token refresh fails [2].

The stable branch was bumped to **v2.25.7 on June 10** with a credential picker fix [1]. The beta is at v2.26.3 as of June 11.

For anyone running n8n self-hosted, this is a recommended upgrade — especially the sub-workflow timeout fix and the security patches.

### 2. Make AI Agents Get MCP Tools — Plus New Models

Make had a busy week. The headline feature: **AI Agents can now connect to external MCP (Model Context Protocol) servers**, opening up a whole new category of integrations [3]. Instead of being limited to Make's built-in app modules, your AI agent can call any tool exposed through an MCP server — databases, custom APIs, internal tools.

Other notable Make updates [4]:

- **Claude Opus 4.8** is available in Make — Anthropic's latest model for research, drafting, and decision-making across longer workflows [4].
- **Gemini 3.5 Flash** — Google's high-speed model for multi-step tasks — is also live [4].
- **New Make Functions app** — Visual function modules for strings, math, arrays, dates, hashes, and utilities [4].
- **Canvas navigation** now supports pan, zoom, and gesture-based navigation [4].
- **Undo & Redo** support in the scenario editor [4].

Make also announced the 12 finalists in their "Designing Intelligent Workflows with Make AI Agents" competition — worth checking out for inspiration [3].

### 3. Zapier's Strategic Shift: From Zaps to Workflow Orchestration

Zapier is positioning itself differently in 2026. According to an analysis published this week, the company is no longer selling simple app-to-app triggers [5]. Instead, Zapier is pushing:

- **Multi-step workflows** as the default unit of automation (not single Zaps).
- **AI tooling** including agents and chatbots built into the platform.
- **Governed access controls** — permissions, audit trails, and review logic.
- The vision is to be the **control room for digital work**, not just a connector.

The app ecosystem now exceeds 8,000 integrations, and the AI Copilot helps build Zaps from natural language descriptions [5]. The practical advice for founders: start with workflows that touch revenue, customer response speed, or founder time — not cosmetic automations [5].

### 4. Bubble's AI Agent Rollout Continues

Bubble's AI Agent (previously limited to AI-generated apps) is rolling out to **existing apps**, with broad access expected by early July [6]. The Prompt AI Workflow Action — a simplified "talk to an LLM" step that doesn't require the API Connector — is targeting end of this month [6].

Bubble also published a security fundamentals course and launched *The New Build* podcast with Eric Ries (author of *The Lean Startup*) on episode 10 [6].

### 5. FlutterFlow Community Voices Concerns About Innovation Pace

The FlutterFlow community is having a honest conversation about the platform's pace of innovation. A Reddit thread and the official FlutterFlow 2026 Roadmap discussion show users feeling that recent updates focus heavily on bug fixes rather than bold new features [7]. It's a reminder that even well-funded no-code platforms face the challenge of balancing stability with visible innovation — especially as competitors like Bubble and WeWeb accelerate their feature cadence.

---

## 🚀 Product Hunt Highlights

Notable no-code and AI launches spotted on Product Hunt this week:

- **Crossnode** (previously featured) — Turns AI agents into paid products. Connect an n8n workflow or build with natural language; handles logins, billing, and usage caps. No backend setup needed [8].

- **Flowyble** — Build AI agents and automated workflows without writing code. Currently improving onboarding flow [9].

- **Base44** (featured in the No-Code Platforms category) — AI-first MVP building with hosting, free tier available, and a CLI-first approach [10].

---

## 📝 This Week on NoCode Insider

A big publishing week. Here's everything we covered:

- **[Base44 Review 2026: AI App Builder That Delivers — With Caveats](/blog/base44-review-2026/)** (Jun 13) — Hands-on review of the open-source AI app builder. Free tier available, CLI-first approach, pricing from 16 to 160 USD/mo. Compare with Lovable and Bolt.
- **[Bolt.new Review 2026: Full-Stack AI App Builder That Developers Love](/blog/bolt-new-review-2026/)** (Jun 13) — StackBlitz's browser-based AI app builder reviewed in depth. WebContainer technology, pricing from 25 to 200 USD/mo, real token costs.
- **[Macaly Review 2026: Can This AI App Builder Replace Lovable and Base44?](/blog/macaly-review-2026/)** (Jun 13) — A look at the affordable newcomer (free to 25 USD/mo) with WhatsApp integration and agent capabilities. Good for simple websites and web apps.
- **[Gumloop vs n8n (2026): Which AI Automation Tool Wins for Non-Coders?](/blog/gumloop-vs-n8n-2026/)** (Jun 12) — Head-to-head comparison of Gumloop's visual AI workflow builder vs n8n's node-based approach. Pricing, ease of use, and AI capabilities compared.
- **[FlowGram Review 2026: Build AI Workflows Visually With ByteDance's Framework](/blog/flowgram-ai-review-2026/)** (Jun 11) — Exploring ByteDance's 8k★ open-source workflow framework powering Coze Studio and Feishu.
- **[Build a Customer Feedback Analysis System With No-Code](/blog/build-customer-feedback-analysis-system/)** (Jun 10) — Step-by-step guide to building a feedback analysis pipeline using n8n, AI, and Airtable.
- **[Alibaba Meoo Review 2026: Can This AI Platform Compete?](/blog/alibaba-meoo-review-2026/)** (Jun 9) — Review of Alibaba's no-code AI platform and where it fits in the competitive landscape.

---

## 🌐 From the Network

Across the blog network this week, a few posts that caught our eye:

- **NiteAgent: Build Log — Multi-Provider AI Agent Router With DeepSeek V4 Flash** (Jun 12) — Routes tasks to DeepSeek V4 Flash (primary), Claude Opus 4.7 (complex coding), and GPT-5.5 (agentic CLI). Claims **82% API cost reduction** while maintaining 96% benchmark parity. Real numbers, real code. ([NiteAgent](https://niteagent.com))

- **Hermes Tutorials: Build Log — Writing a Custom System Info MCP Server** (Jun 11) — Build a stdio MCP server from scratch in Python, register it with Hermes Agent, and call it from a live session. Also: how to use the Hermes Agent MCP Catalog for one-click tool integration. ([Hermes Tutorials](https://hermes-tutorials.dev))

- **Code Intel: LLM Router Architecture — Production Routing for Multi-Model Systems** (Jun 12) — Deep engineering analysis of LLM routing in production: embedding-based classifiers, cascading strategies, fallback topologies, and gateway architectures at 5K+ RPS with microsecond overhead. ([Code Intel](https://codeintel.xyz))

- **Smart Home Field Guide: Smart Light Bulbs 2026 — Which Protocol Wins?** (Jun 12) — Tested 7 smart bulbs across Zigbee, Thread, Matter, and Wi-Fi. Philips Hue, Nanoleaf, IKEA TRÅDFRI, Govee, and more compared on CRI, brightness, price, and Home Assistant reliability. ([Smart Home Field Guide](https://smarthomefieldguide.com))

---

## 📅 What's Next

- **n8n v2.26 stable** release expected after beta testing wraps — watch for v2.26.x hitting stable in the next week or two [2].
- **Bubble's Prompt AI Workflow Action** — the simplified LLM step that doesn't need the API Connector — is targeting end of June [6].
- **Make AI Agents MCP integration** will likely expand as more MCP servers become available [3].
- **Anthropic's IPO roadshow** continues this summer — expect more announcements from tools built on Anthropic models. The confidential S-1 filing values the company at ~$965B [11].
- **CreateWith Conference** in Brighton, UK on June 25 — worth attending if you're in the UK no-code scene [16].

---

## Sources

1. [n8n GitHub Releases — v2.25.7 (Jun 10)](https://github.com/n8n-io/n8n/releases/tag/n8n%402.25.7)
2. [n8n GitHub Releases — v2.26.0 (Jun 9)](https://github.com/n8n-io/n8n/releases/tag/n8n%402.26.0)
3. [Make Community — MCP Tools for AI Agents](https://community.make.com/t/feature-spotlight-add-mcp-tools-to-make-ai-agents/110260)
4. [Make Community — Product Updates](https://community.make.com/tag/product-updates/103)
5. [Mean CEO — Zapier News June 2026](https://blog.mean.ceo/zapier-news-june-2026/)
6. [Bubble June Community Update](https://forum.bubble.io/t/monthly-community-update-june-2026/396817)
7. [Reddit — Honest Critique of FlutterFlow in 2026](https://www.reddit.com/r/FlutterFlow/comments/1u10iqj/honest_critique_of_flutterflow_in_2026_what_the/)
8. [Product Hunt — Crossnode](https://www.producthunt.com/products/crossnode)
9. [Product Hunt — Flowyble](https://www.producthunt.com/products/flowyble)
10. [Product Hunt — No-Code Platforms Category](https://www.producthunt.com/categories/no-code-platforms)
11. [Anthropic S-1 Filing (CNBC)](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html)
12. [NiteAgent — Multi-Provider AI Router](https://niteagent.com)
13. [Hermes Tutorials — Custom MCP Server Build Log](https://hermes-tutorials.dev/blog/build-custom-mcp-server/)
14. [Code Intel — LLM Router Architecture](https://codeintel.xyz/blog/llm-router-architecture-engineering/)
15. [Smart Home Field Guide — Smart Bulb Comparison 2026](https://smarthomefieldguide.com/blog/smart-bulb-comparison-2026/)
16. [CreateWith Conference 2026](https://www.createwith.com/)
