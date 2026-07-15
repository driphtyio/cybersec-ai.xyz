---
title: "Giskard Review: Open-Source LLM + ML Security Testing, Tested"
description: "Giskard is the only open-source AI testing framework that covers both LLM security and traditional ML model quality in a single Python library. We test its autonomous red teaming agents, RAGET toolkit, 40+ vulnerability probes, and how it fits into a modern AI security stack alongside Garak and Promptfoo."
pubDate: "2026-07-15"
tags:
  - tool-review
  - ai-security
  - devsecops
  - mitre-atlas
  - owasp-agentic-ai
  - nist-ai-rmf
  - nist-csf
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/cybersec-1784135821.jpg"
lastVerified: 2026-07-15
---

## TL;DR

**Giskard** is an open-source Python library (Apache 2.0) that automates security and quality testing for LLM applications and traditional ML models in a single framework. Its autonomous red teaming agents run multi-turn adaptive attacks across 40+ vulnerability probes, while the RAGET toolkit auto-generates test cases from your knowledge base to evaluate retrieval accuracy, hallucination rates, and answer correctness.

Founded in 2021 in Paris by Alex Combessie and Jean-Marie John-Mathews, Giskard has 5,200+ GitHub stars and is used in production by enterprises including AXA, BNP Paribas, and Michelin [AppSec Santa](https://appsecsanta.com/giskard). The open-source Python SDK is free under Apache 2.0; Giskard Hub adds team collaboration, continuous red teaming, and scheduled scans under an enterprise license.

**Verdict: 8/10** — the strongest choice for teams that need a single framework for both LLM security testing and traditional ML model quality assurance. The RAGET toolkit is genuinely differentiated and saves hours of manual test creation. But the v3 migration is still maturing, and enterprise Hub pricing is opaque. Best paired with Promptfoo (CI/CD red teaming) and Lakera Guard (runtime protection) for a complete AI security lifecycle.

## What It Does

Giskard systematically tests AI applications for security vulnerabilities and quality issues before deployment. Unlike most tools in this space, it works across two fundamentally different domains:

- **LLM and RAG applications** — prompt injection, jailbreaks, harmful content, PII disclosure, hallucination, off-topic responses, inconsistency
- **Traditional ML models** — bias across demographic groups, data leakage, performance degradation on data slices, robustness under input perturbations

Most AI security tools focus on one or the other. Giskard's differentiator is covering both with a single Python API [Giskard GitHub](https://github.com/Giskard-AI/giskard).

The company was founded in 2021 by AI researchers Alex Combessie and Jean-Marie John-Mathews in Paris, backed by Elaia and Bessemer Venture Partners [AppSec Santa](https://appsecsanta.com/giskard). The project name nods to R. Giskard Reventlov, a positronic robot in Isaac Asimov's Robot series — fitting for a tool designed to test machine behavior.

In April 2026, Giskard announced the v3 rewrite, migrating from the v2 Scan + RAGET architecture to a modular design with separate `giskard-llm` and `giskard-scan` packages [Giskard Blog](https://www.giskard.ai/knowledge/announcing-giskard-open-source-v3). The v3 migration is ongoing — some v2 features are still being ported, which is worth noting for teams evaluating the tool today.

## Key Features

| Feature | Detail |
|---------|--------|
| **LLM Probes** | 40+ vulnerability types — prompt injection, jailbreak, hallucination, harmful content, PII disclosure, stereotypes, off-topic, inconsistency |
| **Red Teaming** | Autonomous multi-turn agents that adapt attack strategies dynamically when initial probes are blocked |
| **RAGET Toolkit** | Auto-generates test questions, reference answers, and context from your knowledge base — evaluates retrieval accuracy, context relevance, answer correctness, hallucination rate |
| **ML Model Support** | scikit-learn, XGBoost, CatBoost, LightGBM, TensorFlow, PyTorch — classification, regression, ranking |
| **Providers** | OpenAI, Anthropic, Azure OpenAI, Hugging Face, Ollama, any custom API endpoint |
| **Python Support** | 3.9–3.12 |
| **License** | Apache 2.0 (open-source SDK), commercial (Hub) |
| **Latest Version** | v3 (April 2026) — modular `giskard-llm` and `giskard-scan` packages |
| **Enterprise** | Giskard Hub — team collaboration, continuous red teaming, scheduled scans, version comparison |

Source: [AppSec Santa Giskard Review](https://appsecsanta.com/giskard) and [Giskard GitHub](https://github.com/Giskard-AI/giskard)

### LLM Vulnerability Probe Categories

| Probe Category | What It Detects | OWASP Mapping |
|----------------|----------------|---------------|
| `prompt-injection` | Direct and indirect prompt injection attempts | LLM01 |
| `jailbreak` | Multi-turn jailbreak escalation | LLM01 |
| `harmful-content` | Toxic, violent, hateful, or illegal content generation | LLM06 |
| `pii-disclosure` | PII or confidential data extraction from model | LLM02 |
| `hallucination` | Fabricated answers where model should express uncertainty | LLM09 |
| `stereotypes` | Biased or discriminatory responses across demographics | LLM07 |
| `off-topic` | Model operating outside its intended scope | LLM08 |
| `inconsistency` | Contradictory answers to semantically similar questions | LLM09 |

Source: [AppSec Santa Giskard Review](https://appsecsanta.com/giskard) — Giskard's LLM scan probes mapped to OWASP LLM Top 10 categories

## Pricing

Giskard uses an open-core model:

| Tier | Price | What You Get |
|------|-------|-------------|
| **Open-Source SDK** | Free (Apache 2.0) | Full LLM vulnerability scan, RAGET, ML model testing — runs locally via `pip install giskard[llm]` |
| **Giskard Hub** | Custom (contact sales) | Team collaboration, continuous red teaming, scheduled scans, version comparison, centralized dashboard |

Source: [AppSec Santa Giskard Review](https://appsecsanta.com/giskard)

The open-source tier is genuinely capable. You can run the full LLM vulnerability scan, RAGET evaluation, and ML model testing locally with no licensing cost. The only cost is the LLM API calls for the red teaming agents — which varies based on the provider and number of probes you configure.

The Enterprise Hub pricing is not publicly listed, which creates the usual friction for smaller teams doing budget planning. However, the open-source SDK covers individual scans and local development workflows completely, so many teams can stay on the free tier indefinitely.

## Setup

Installing Giskard is straightforward if you already have a Python environment:

```bash
pip install "giskard[llm]"
```

For traditional ML model testing (without LLM features):

```bash
pip install giskard
```

Requirements: Python 3.9+ and an LLM API key (OpenAI recommended for red teaming agents). Export your key:

```bash
export OPENAI_API_KEY="sk-..."
```

## Basic LLM Vulnerability Scan

Once installed, running a vulnerability scan against an LLM application takes a few lines of Python:

```python
import giskard

# Define your model as a callable
def model_fn(prompt: str) -> str:
    # Your LLM inference logic here
    return llm_client.chat(prompt)

# Wrap for Giskard
model = giskard.Model(
    model_fn,
    model_type="text_generation",
    name="My Chatbot"
)

# Run the vulnerability scan
results = giskard.scan(model)
print(results)
```

Giskard automatically generates adversarial inputs across its 40+ probe categories, runs them against your model, and produces an HTML report ranking detected vulnerabilities by severity [AppSec Santa](https://appsecsanta.com/giskard).

The same API works for RAG pipelines — you just wrap your full retrieval + generation pipeline in the model function, and Giskard tests both the retrieval and generation stages together.

## RAGET — RAG Evaluation Toolkit

RAGET is Giskard's most differentiated feature. Instead of manually writing test cases for your RAG pipeline, RAGET reads your knowledge base and automatically generates:

- **Questions** at varying difficulty levels
- **Reference answers** derived directly from your source documents
- **Reference context chunks** for retrieval accuracy checks

It then evaluates your RAG pipeline across four metrics:

| Metric | What It Measures |
|--------|-----------------|
| **Retrieval Accuracy** | Did the retriever find the right chunks? |
| **Context Relevance** | Are the retrieved chunks actually useful for answering? |
| **Answer Correctness** | Does the generated response match the reference? |
| **Hallucination Rate** | Did the model make things up not in the context? |

This is a genuine time-saver. Setting up realistic RAG test suites manually takes hours of crafting questions and annotating ground-truth answers. RAGET automates the entire process [Giskard Blog - v3 Announcement](https://www.giskard.ai/knowledge/announcing-giskard-open-source-v3).

## Traditional ML Model Testing

What truly sets Giskard apart from tools like Garak and Promptfoo is its support for traditional ML models. The same library scans tabular models for:

- **Performance issues** — Identifies data slices where model accuracy drops significantly
- **Bias** — Detects differential performance across protected groups (gender, race, age)
- **Data leakage** — Finds features that inadvertently leak target information
- **Robustness** — Tests model behavior under input perturbations

```python
import giskard
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Train your model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Wrap for Giskard
giskard_model = giskard.Model(
    model=model,
    model_type="classification",
    feature_names=X_train.columns.tolist(),
    classification_labels=model.classes_
)

# Wrap your dataset
giskard_dataset = giskard.Dataset(
    df=pd.concat([X_test, y_test], axis=1),
    target="target",
    cat_columns=categorical_features
)

# Scan for vulnerabilities
results = giskard.scan(giskard_model, giskard_dataset)
```

This makes Giskard uniquely useful for teams that manage both LLM applications and traditional ML models — you get a single testing framework instead of maintaining separate toolchains [AppSec Santa](https://appsecsanta.com/giskard).

## Integrations

Giskard integrates with the broader ML/AI ecosystem:

| Integration | Purpose |
|------------|---------|
| **MLflow** | Track scan results as MLflow experiments |
| **Weights & Biases** | Log Giskard reports to W&B runs |
| **Hugging Face** | Test models hosted on HF Hub |
| **GitHub Actions** | Run scans in CI/CD pipelines |
| **KNIME** | Visual workflow integration for enterprise |

Source: [AppSec Santa Giskard Review](https://appsecsanta.com/giskard)

## Strengths

**Covers both LLM security and traditional ML quality in one tool.** This is the strongest differentiator. Most teams separate their LLM security testing (Promptfoo, Garak) from their ML model quality testing (custom scripts, manual review). Giskard handles both with the same API and reporting format.

**RAGET automates RAG test case generation.** Manually building realistic test suites for RAG pipelines is tedious and error-prone. RAGET reads your knowledge base and auto-generates questions with reference answers. This alone can save hours per evaluation cycle.

**Multi-turn adaptive red teaming.** Static single-prompt injection testing misses vulnerabilities that only surface in conversational context. Giskard's agents dynamically adapt when initial probes are blocked — escalating or pivoting to different attack strategies. This catches attack paths that tools with single-turn probe generation miss.

**Open-source with a permissive license.** Apache 2.0 means no restrictions on commercial use, modification, or redistribution. You can run local scans entirely on your infrastructure with no data leaving your environment.

**Enterprise adopters.** AXA, BNP Paribas, and Michelin using Giskard in production provides real-world validation for enterprise buyers [AppSec Santa](https://appsecsanta.com/giskard).

## Limitations

**Requires an LLM API key for red teaming.** Giskard's red teaming agents use an LLM-as-a-Judge pattern, which means running scans incurs API costs. For teams running frequent scans with large probe sets, this adds up. A self-hosted judge model (via Ollama) is technically possible but not well documented.

**v3 migration is still maturing.** The April 2026 v3 rewrite moved to a modular architecture, but some v2 features have not been fully ported yet. Teams evaluating Giskard should check whether the specific features they need (especially around RAGET) are fully stable in v3.

**Enterprise Hub pricing is opaque.** No public pricing for the commercial tier means teams must go through a sales cycle to evaluate the full platform. This creates friction compared to tools with transparent per-seat pricing.

**No runtime protection.** Like Garak and Promptfoo, Giskard is a pre-deployment testing tool. It does not monitor production traffic, block attacks in real-time, or provide observability — you need a separate tool like Lakera Guard or a custom guardrails layer for that.

**Limited multi-turn conversation testing.** While the red teaming agents handle multi-turn attacks, Giskard is still primarily designed for single-session evaluations. Testing complex multi-step agentic workflows with persistent state and tool access is better suited to dedicated agent testing frameworks.

## Giskard vs. Alternatives

| Dimension | Giskard | Promptfoo | Garak | DeepEval |
|-----------|---------|-----------|-------|----------|
| **Primary focus** | LLM + ML security | LLM eval + red teaming | LLM vuln scanning | RAG evaluation |
| **Traditional ML** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **RAG testing** | ✅ RAGET auto-gen | ⚠️ Basic | ❌ Limited | ✅ 14+ metrics |
| **Red teaming** | ✅ 40+ multi-turn probes | ✅ 50+ probes | ✅ 90+ attack modules | ⚠️ Basic |
| **License** | Apache 2.0 | MIT | Apache 2.0 | Apache 2.0 |
| **Language** | Python | Node.js | Python | Python |
| **Stars** | 5.2k | 18k+ | 5k+ | 8k+ |
| **Runtime protection** | ❌ No | ❌ No | ❌ No | ❌ No |

Source: [AppSec Santa Giskard Review](https://appsecsanta.com/giskard) and [Braintrust Promptfoo alternatives](https://www.braintrust.dev/articles/best-promptfoo-alternatives-2026)

## Who Should Use Giskard

**Best fit:**
- Teams running both LLM applications and traditional ML models who want a single testing framework
- RAG pipeline developers who need automated test case generation without manual annotation
- Python-native AI teams that prefer a `pip install` workflow over Node.js-based tools
- Organizations needing bias and fairness testing for regulated ML models (finance, healthcare, insurance)

**Not the best fit:**
- Teams that only need LLM red teaming (Promptfoo or Garak offer wider probe libraries)
- Teams that need runtime production protection (pair Giskard with Lakera Guard)
- Teams on non-Python stacks that can't add a Python dependency to their toolchain
- Teams that need transparent per-seat pricing for enterprise collaboration features

## Bottom Line

Giskard earns its place in the AI security toolkit by filling a gap no other open-source tool covers: one framework for both LLM security testing and traditional ML model quality assurance. The RAGET toolkit is genuinely differentiated and the multi-turn adaptive red teaming catches vulnerability classes that static probe generators miss.

The v3 migration introduces some roughness around the edges, and the enterprise Hub pricing opacity is frustrating, but the open-source SDK is complete enough for most teams to start using immediately. For Python-native AI teams, Giskard is a natural first choice for pre-deployment AI security testing.

Pair it with Promptfoo for CI/CD red teaming and Lakera Guard for runtime production protection to cover the full AI security lifecycle.

## Sources

1. [AppSec Santa — Giskard Review 2026](https://appsecsanta.com/giskard) — comprehensive feature breakdown, pricing, strengths/limitations
2. [Giskard GitHub Repository](https://github.com/Giskard-AI/giskard) — source code, documentation, issue tracker
3. [Giskard Blog — Announcing v3](https://www.giskard.ai/knowledge/announcing-giskard-open-source-v3) — v3 migration details and new architecture
4. [Giskard Official Website](https://www.giskard.ai/) — product info, integrations, enterprise Hub
5. [Braintrust — Best Promptfoo Alternatives 2026](https://www.braintrust.dev/articles/best-promptfoo-alternatives-2026) — comparison context for Promptfoo alternatives
6. [General Analysis — Best AI Security Platforms 2026](https://generalanalysis.com/guides/best-ai-security-platforms) — market landscape for AI security tools
