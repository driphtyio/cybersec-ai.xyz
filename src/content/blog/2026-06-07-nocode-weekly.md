---
title: "NoCode Weekly: June 7 — Bubble AI Agent Goes Live for All Apps, Supabase Raises $500M, Airtable Unleashes AI Everywhere"
description: "Bubble's AI agent expands to existing apps with native JSON support and Claude Opus upgrade. Supabase hits $10.5B valuation. Airtable AI custom elements exit beta. Plus Crossnode, Glide review, and more."
pubDate: 2026-06-07
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/nocode-weekly-2026-06-07-1780852034.jpg"
category: "news"
tags: ["nocode", "weekly", "news", "roundup", "bubble", "airtable", "supabase"]
draft: false
---

## TL;DR

- **Bubble's AI agent** is rolling out to all existing (non-AI) apps this month [1], with native JSON parsing, a Claude Opus 4.8 upgrade [1], and a mobile plugin editor in public beta [2].
- **Supabase raised $500M** at a $10.5B valuation in one of the week's largest funding rounds [6] — the open-source backend platform is scaling fast.
- **Airtable's AI custom elements** are out of beta and available to all plans, with field agent triggers now supporting schedules and conditional conditions [4].

---

## 🔥 Top No-Code News

### 1. Bubble AI Agent Goes Mainstream

The June community update from Bubble co-founder Josh dropped a major milestone: the AI Agent (previously limited to AI-generated apps) is now rolling out to **existing apps** [1]. The rollout started with Gold/Silver agency partners and BAMs, with broad access expected by early July [2].

The May ship list was packed [1]:

- **Native JSON support** (Phase 1) — auto-parses JSON from LLM responses, eliminating complex API Connector workarounds [3].
- **Agent model upgrade** to Claude Opus 4.8 — up to 20% faster generation [1].
- **Compound edits** — the agent now makes multiple changes in one step without per-step confirmation [1].
- **Workflow improvements** — disable specific actions without deleting them, and a new "Generate with AI" option in the workflow dropdown [1].
- **Mobile app generation** now uses style variables with lower latency and improved look and feel [1].
- **API Connector call cap doubled** from 2.5 to 5 minutes [1].

What's next? A **Prompt AI Workflow Action** (simplified "talk to an LLM" step, no API Connector required) targets end of this month [1]. The mobile plugin editor (build plugins using any React Native library) is entering public beta [2].

### 2. Airtable: Custom AI Elements Exit Beta, Field Agents Get Smarter

Airtable had a big week. AI-generated custom interface elements are now **out of beta and available to all plans** [4]. Describe what you need in plain language, and Omni builds a custom element. The feature now supports multi-table config, version history, and undo/redo [4].

Field agents (Airtable's AI automation layer) now support **schedule-based and condition-based triggers** alongside the existing automatic and manual modes. The configuration UI was redesigned for easier setup [4].

Other notable Airtable releases [4]:

- **Interface Extensions SDK** — open beta for developers to create custom extensions.
- **ChatGPT integration** — query and update Airtable data directly within ChatGPT conversations [5].
- **16 integrations for Field Agents** — including Gmail, Outlook, Google Calendar, Microsoft Teams, Notion, Zoom, Linear, HubSpot, GitHub, and more [4].

### 3. Supabase Raises $500M at $10.5B Valuation

Supabase closed a **$500M funding round** led by GIC, bringing its valuation to $10.5 billion [6]. The open-source Firebase alternative is the backend of choice for many no-code builders, especially paired with FlutterFlow, WeWeb, and Lovable [6].

This is one of the week's biggest funding rounds across all of tech, tied with Impulse Space and Flourish at $500M [6].

### 4. Bubble's June Livestream & New Podcast

Josh and Emmanuel hosted a **June 3 livestream** demoing the new AI features and announced *The New Build* podcast featuring Eric Ries (author of *The Lean Startup*) on episode 10 [2]. They also published a new **Bubble security fundamentals course** taught by Petter, author of the Bubble Manual [1].

### 5. Framer Adds Spam Protection to Forms

Framer rolled out **new spam protection features** for forms this week, with two modes: Basic (rule-based checks) and Advanced (stronger filtering) [11].

---

## 🚀 Product Hunt Highlights

This week's notable no-code launches on Product Hunt:

- **Crossnode** — Turns AI agents into paid products. Connect an n8n workflow or build with natural language; Crossnode handles logins, billing, and usage caps. No backend or payment setup needed [7].

- **OnSpace AI** — An AI-first no-code app builder that generates full-stack web and mobile apps (including iOS and Android) from natural language descriptions. Comes with managed backend, auth, and payments built in [8].

- **Subterranean** — Build complete production-ready full-stack web applications by collaborating with a team of AI agents. Integrates database, backend, and UI generation into one flow [9].

- **ElevenAgents Agent Templates** — Pre-built voice and chat agent templates for customer support, AI SDRs, and internal enablement. Point at your knowledge base and deploy [10].

---

## 📝 This Week on NoCode Insider

Here's what we published this week:

- **[Glide Review 2026: Turn Spreadsheets Into Apps Fast — But Watch the Pricing](/blog/glide-review-2026/)** (Jun 6) — A 60-day hands-on test of Glide covering its AI features, pricing breakdown, and who should (and shouldn't) use it in 2026.

- **[Airtable vs NocoDB (2026): Which Database Platform Wins for Your Team?](/blog/airtable-vs-nocodb-comparison-2026/)** (Jun 5) — Detailed comparison covering pricing at scale, open-source flexibility, and when to choose each for your no-code stack.

- **[Gumloop Review 2026: The No-Code AI Automation Platform That Raised $50M from Benchmark](/blog/gumloop-deep-review-2026/)** (Jun 4) — Hands-on review of Gumloop's visual AI workflow builder with pricing from $0 to $497/mo and comparisons with n8n, Make, and Zapier [17].

- **[The 60-70% Trap: What AI and No-Code Tools Still Can't Do in 2026](https://nocodeinsider.com/blog/the-60-70-trap-what-ai-and-no-code-tools-still-cant-do-in-2026/)** (Jun 3) — The 30-40% of your SaaS that still needs real engineering — edge cases, billing logic, security, and performance under load.

---

## 🌐 From the Network

A few highlights from across the blog network this week:

- **ToolBrain** tracked the **Anthropic S-1 filing** — a confidential IPO filing at ~$965B valuation with plans for an October 2026 listing [12]. ([ToolBrain](https://toolbrain.net))

- **Code Intel** published an excellent engineering deep-dive on **Prompt Caching in Production** — covering four caching layers (KV/prefix, prompt, semantic, and exact-response) with architecture patterns and provider pricing analysis [14].

- **NiteAgent** released a practical guide on taking the **OpenAI Agents SDK to production** — multi-agent patterns, guardrails, session tracing, and multi-model routing with working code [15].

- **Hermes Tutorials** published a guide on **Building a Compound Engineering Workflow** in Hermes Agent — mapping the methodology to cron jobs and autonomous pipelines [16].

---

## 📅 What's Next

- **Bubble's Prompt AI Workflow Action** (simplified LLM step) ships by end of June — watch for it [1].
- **Airtable Superagent** (the standalone AI product from the DeepSky acquisition) is in early access — handles complex market research and competitive intelligence tasks [4].
- **Anthropic's IPO roadshow** will start later this summer — expect more no-code/AI tools riding Anthropic models to announce integrations [12].
- **CreateWith Conference** in Brighton, UK on June 25 — if you're in the UK no-code scene, worth attending. ([RSVP](https://www.createwith.com/conference))

---

## Sources

1. [Bubble June Community Update](https://forum.bubble.io/t/monthly-community-update-june-2026/396817)
2. [Bubble May 2026 AMA Recap](https://bubble.io/blog/may-2026-founder-ama/)
3. [Native JSON Parsing in Bubble API Connector](https://forum.bubble.io/t/new-feature-native-json-parsing-is-now-available-in-the-api-connector/396794)
4. [Airtable Community Announcements](https://community.airtable.com/announcements-6)
5. [Airtable What's New](https://www.airtable.com/whatsnew)
6. [Crunchbase — Biggest Funding Rounds June 5, 2026](https://news.crunchbase.com/venture/biggest-funding-rounds-june-5-2026/)
7. [Product Hunt — Crossnode](https://www.producthunt.com/products/crossnode)
8. [Product Hunt — OnSpace AI](https://www.producthunt.com/products/onspace-ai-no-code-app-builder)
9. [Product Hunt — Subterranean](https://www.producthunt.com/products/subterranean-3)
10. [Product Hunt — ElevenAgents Templates](https://www.producthunt.com/products/elevenlabs-agent-templates)
11. [Framer Updates — Spam Protection](https://www.framer.com/updates)
12. [Anthropic S-1 Filing (CNBC)](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html)
13. [ToolBrain — AI Tool Reviews](https://toolbrain.net)
14. [Code Intel — Prompt Caching Production Architecture](https://codeintel.xyz/blog/prompt-caching-production-architecture/)
15. [NiteAgent — OpenAI Agents SDK Production Guide](https://niteagent.com/blog/openai-agents-sdk-production-guide-2026/)
16. [Hermes Tutorials — Compound Engineering Workflow](https://hermes-tutorials.dev/blog/build-compound-engineering-workflow-hermes-agent/)
17. [Gumloop Review 2026 — NoCode Insider](https://nocodeinsider.com/blog/gumloop-deep-review-2026/)

<!-- crosslinks -->

## 📖 Related Reads

- **[NiteAgent](https://niteagent.com/)** — AI agent development, frameworks, and production patterns
- **[Hermes Tutorials](https://hermes-tutorials.dev/)** — Hermes Agent setup, configuration, and advanced workflows
- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides
- **[CodeIntel Log](https://codeintel.xyz/)** — code quality, debugging, and software engineering benchmarks

*Cross-links automatically generated from NoCode Insider.*
