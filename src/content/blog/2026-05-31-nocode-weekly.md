---
title: "NoCode Weekly: May 31 — Webflow Overhauls Pricing, Crossnode Turns Automations into Paid Products"
description: "Webflow simplifies plans (CMS + Business → Premium at $25/mo), Crossnode launches on Product Hunt, Microsoft Power Platform gets MCP Copilot, and Lemonado raises $1.4M seed."
pubDate: 2026-05-31
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/nocode-weekly-2026-05-31-1780247062.jpg"
category: "news"
tags: ["nocode", "weekly", "news", "roundup", "webflow", "crossnode", "microsoft", "make"]
draft: false
---

**TL;DR**
- **Webflow** combined CMS and Business plans into a single Premium plan — Business users save $10/mo [1], CMS users get 10x more items [1].
- **Crossnode** launched on Product Hunt, letting anyone turn n8n workflows into paid client-facing services with billing and analytics included.
- **Microsoft Power Platform** shipped typed Power Fx, MCP Copilot orchestration, and generative pages in its May 2026 update.

---

## 🔥 Top No-Code News

### 1. Webflow Simplifies Pricing — CMS and Business Plans Become Premium

Webflow rolled out its biggest pricing overhaul in years on May 13, consolidating the CMS and Business Site plans into a single **Premium plan** at $39/mo monthly ($25/mo yearly). The changes take effect for existing sites starting June 29, 2026. [1]

Key changes:
- **Business plan drops $10/mo** — from $49/mo to $39/mo (monthly), or $39/mo → $25/mo (yearly) [2]
- **CMS plan triples in value** — 20,000 CMS items (up from 2,000), 40 Collections (up from 20), 300 static pages (up from 150)
- **New Team plan** — all-in-one bundle with 100 CMS Collections, 10 seats, Localization, and page branching
- **AI credits included** in all Workspace plans

The catch for power users: Business plan bandwidth drops from 100GB to 50GB, and Webflow Cloud CPU limits halved at the Premium tier. High-traffic sites may need bandwidth add-ons. Full details at [Webflow Help Center](https://help.webflow.com/hc/en-us/articles/51059955082387-Updated-pricing-and-simplified-plans-for-May-2026).

### 2. Crossnode Launches — Turn n8n Automations into Paid Services

Crossnode hit Product Hunt this week with a premise that resonates with anyone who's built an n8n workflow and thought "I could sell this." The platform lets you upload automations from n8n (or build them in natural language) and package them as client-facing products with built-in billing, usage caps, analytics, and customer portals. No backend setup, no payment integration work.

It slots into the growing category of "automation monetization" platforms — alongside Gumloop and AgentCraft — but focuses specifically on making the n8n-to-SaaS pipeline seamless. [Product Hunt — Crossnode](https://www.producthunt.com/products/crossnode)

### 3. Microsoft Power Platform May 2026 Update: MCP Meets Low-Code

Microsoft's May 2026 Power Platform update shipped several features that bridge the gap between AI coding agents and low-code development:

- **Typed Power Fx (GA)** — strongly typed formulas reduce runtime errors in Power Apps
- **MCP Copilot orchestration** — Copilot can now orchestrate app building through the Model Context Protocol, connecting to tools like Claude Code for natural-language app creation
- **Generative pages** — context-aware pages that adapt layout and data sources at runtime
- **Canvas Authoring MCP Server** — migrate InfoPath forms to Power Apps Canvas Apps through natural conversation

The Copilot Studio update also made [computer-using agents generally available](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/new-and-improved-computer-using-agents-a-new-workflows-experience-and-real-time-voice-experiences/), alongside redesigned workflows and Work IQ extensibility. [Microsoft Power Platform Blog](https://www.microsoft.com/en-us/power-platform/blog/2026/05/14/whats-new-in-power-platform-may-2026-feature-update/)

### 4. Make Adds AI Agents and Analytics Dashboard

Make (formerly Integromat) quietly shipped two significant updates this month: an **Analytics Dashboard** that gives visibility into workflow performance and utilization over time, and deeper **AI agent integration** alongside its traditional visual automation builder. Make now positions "agentic automation" as a hybrid model where AI agents and automated workflows operate side-by-side within the same visual canvas.

With 400+ pre-built AI app integrations, Make continues to close the feature gap with Zapier while maintaining its pricing advantage for high-volume workflows. [Make Product Page](https://www.make.com/en/product)

### 5. Lemonado Raises $1.4M Seed from Zendesk Co-Founder

Stockholm-based Lemonado, an AI-native no-code platform for building custom business applications, secured $1.4M in seed funding with participation from Zendesk co-founder Alexander Aghassipour. The platform lets non-developers automate workflows, build data visualizations, and integrate datasets from HubSpot, Postgres, and Google Sheets — all without code. [3]

Lemonado's pitch is that traditional software suites are too rigid for modern workflows. Instead, teams build exactly what they need using a "building block" system that handles live data computation at scale. Customers include Planhat, The Octopus Club, and WorkTripp. [Tech Funding News](https://techfundingnews.com/lemonado-no-code-platform/)

---

## 🚀 Product Hunt Highlights

**Crossnode** — Turn any n8n or natural-language-defined automation into a paid product with portals, billing, and usage caps. No backend setup required.

**OnSpace AI** — AI-first full-stack app builder that generates web, iOS, and Android apps from chat-based prompts. Ships with Supabase backend, Stripe payments, and GitHub export.

**Needle 2.0** — "Vibe-automate" workflows and earn passive income. An automation platform that observes how your team works and suggests automations proactively.

---

## 📝 This Week on NoCode Insider

**[Build a No-Code RAG Pipeline with n8n](https://nocodeinsider.com/blog/2026-05-30-build-rag-pipeline-n8n/)** — Full tutorial on building a Retrieval-Augmented Generation pipeline entirely in n8n's visual editor: ingest documents, chunk and embed into vector stores, and query via AI agents. No Python required.

**[Bubble Review 2026](https://nocodeinsider.com/blog/bubble-review-2026/)** — Honest deep-dive into Bubble's strengths (fastest way to ship a web app without code) and pain points (WU pricing at scale, vendor lock-in, no code export). Covers the new native mobile builder and AI app builder.

**[Bubble vs FlutterFlow vs WeWeb 2026](https://nocodeinsider.com/blog/bubble-vs-flutterflow-vs-weweb-2026/)** — Three-way comparison across pricing at scale, code ownership, performance, and AI features. Decision framework for which platform fits your project type.

**[80% of AI Automations Get Abandoned](https://nocodeinsider.com/blog/2026-05-25-when-not-to-use-ai-automations/)** — When simple conditional logic beats GPT-4. A reality check for anyone reaching for AI when a webhook + spreadsheet would do.

---

## 🌐 From the Network

**[ToolBrain — Daily AI Briefing: May 30](https://toolbrain.net)** — Anthropic projects $10.9B Q2 revenue (first operating profit), OpenAI files S-1 for IPO, Gemini 3.5 Flash goes GA, Salesforce cuts 231-day migration to 13 days with Claude Code.

**[NiteAgent — 51 Agent System Prompts: Compound Engineering Architecture](https://niteagent.com/blog/51-agent-system-prompts-compound-engineering/)** — Deconstructing Every Inc's system of 51 specialized agent definitions and what AI agent developers can learn from their review, research, and security prompt structures.

**[CodeIntel — Compound Engineering: The 80/20 Rule That Changes AI Code Quality](https://codeintel.xyz/blog/compound-engineering-80-20-rule/)** — Deep analysis of why spending 80% of time on planning and review produces higher quality AI-generated code than the common prompt-burst approach.

**[Hermes Tutorials — Build a Compound Engineering Workflow in Hermes Agent](https://hermes-tutorials.dev/blog/build-compound-engineering-workflow-hermes-agent/)** — Step-by-step guide to implementing Every Inc's methodology using Hermes Agent's skill and cron system.

---

## 📅 What's Next

Webflow's pricing changes kick in for existing customers on June 29 — if you're on a Business plan, now is the time to check your bandwidth usage and decide whether the new Premium plan saves or costs you money. Microsoft's Copilot Studio computer-using agents are now GA, and Make's Analytics Dashboard is worth a look if you're running high-volume workflows and need visibility into what's actually working.

On NoCode Insider next week: a deep dive into FlutterFlow's 2026 pricing at scale, n8n webhook patterns for real-time data pipelines, and a review of how no-code platforms are handling AI agent integrations.

---

## References
- [1] (citation needed)
- [2] (citation needed)
- [3] (citation needed)
- [4] (citation needed)
- [5] (citation needed)
- [6] (citation needed)
- [7] (citation needed)
- [8] (citation needed)
