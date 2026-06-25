---
title: "AI Model Extraction: How Attackers Steal $3M Models for $200 in API Queries"
description: "A comprehensive deep research analysis of AI model extraction attacks — from Tramèr et al.'s foundational 2016 work to 2026's distributed multi-client bypasses, CerberusAI framework, entangled watermarks, and the emerging cold-copy threat from Bleeding Llama (CVE-2026-7482)."
pubDate: "2026-06-25"
tags:
  - ai-security
  - threat-intelligence
  - mitre-attck
  - mitre-atlas
  - nist-ai-rmf
  - owasp-agentic-ai
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/20260625-research-1782401987.jpg"
---

## Executive Summary

A proprietary AI model costing $3 million to train can be functionally cloned with fewer than 10,000 API queries — at a cost of roughly $200 in inference credits. This is not a theoretical risk but a demonstrated attack path validated across academic labs and commercial red teams. The Praetorian research team demonstrated 80% model replication accuracy with just 1,000 queries against a production classification model in January 2026 [Praetorian, Jan 2026](https://www.praetorian.com/blog/stealing-ai-models-through-the-api-a-practical-model-extraction-attack/). In June 2026, Schwarzer et al. showed that every deployed defense relying on the Single Client Assumption (SCA) — the implicit belief that extraction attacks come from isolated identities — can be bypassed by coordinated threat actors using round-robin query distribution [arXiv:2606.03381](https://arxiv.org/abs/2606.03381). Meanwhile, CVE-2026-7482 ("Bleeding Llama") demonstrated that model weights and conversation data can be exfiltrated from exposed Ollama servers without any API queries at all, leaking the entire process heap [Indusface, May 2026](https://www.indusface.com/blog/cve-2026-7482-bleeding-llama-vulnerability/).

The OWASP Top 10 for LLM Applications 2025 lists model theft as a distinct, high-priority risk category. The 2026 update to that framework places model extraction alongside sensitive information disclosure and supply chain vulnerabilities as the triad of highest-impact AI risks [OWASP, 2025](https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf). This analysis covers the academic taxonomy of extraction attacks across 30+ surveyed papers, real-world incidents from 2025–2026, the defense mechanisms that work (entangled watermarks, query monitoring, stateful defenses), the emerging threat of distributed multi-client extraction, and the cold-copy risk vector exposed by Bleeding Llama.

---

## Background — The Extraction Threat Model

Model extraction (also called model stealing) is an attack in which an adversary queries a target ML model through its prediction API and uses the input-output pairs to train a substitute model. Unlike classical learning theory settings where the goal is simple input-output mimicry, model extraction in the ML-as-a-Service context aims to duplicate the exact functionality — and in some cases the specific parameters — of a proprietary model [Tramèr et al., USENIX Security 2016](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/tramer).

The extraction threat model spans four distinct objectives, each with different attacker requirements and defender detection difficulty:

1. **Functional replication**: The attacker trains a surrogate model that produces outputs matching the target's decisions. This is the easiest attack — it requires only black-box API access and typically succeeds with a few thousand queries.

2. **Parameter recovery**: The attacker extracts the exact weights and architecture of the target model. This requires additional information (model family, training details) or white-box access but yields a perfect clone.

3. **Training data reconstruction (membership inference)**: The attacker determines whether specific data points were used in the target model's training set. This intersects with privacy law obligations (GDPR, CCPA) because it can expose personally identifiable information embedded in training corpora.

4. **Domain knowledge stealing**: The attacker extracts the specialized knowledge encoded in a fine-tuned model. The AAAI 2025 paper on Query-Efficient Domain Knowledge Stealing demonstrated that an attacker can recover domain-specific expertise (legal, medical, financial) from a fine-tuned LLM using fewer than 500 strategically crafted queries [AAAI, 2025](https://ojs.aaai.org/index.php/AAAI/article/view/40456/44417).

The fundamental vulnerability is structural: prediction APIs are designed to be useful, and usefulness correlates with extractability. Every query the model answers honestly is a free data point for the attacker's surrogate training set.

---

## Attack Taxonomy — Five Categories

Based on the comprehensive ACM survey of model extraction attacks and defenses published in August 2025 [ACM CSUR, 2025](https://dl.acm.org/doi/10.1145/3711896.3736573), extraction attacks fall into five methodological categories:

### 1. API-Based Knowledge Distillation

The attacker queries the target model with a large set of inputs and uses the outputs (logits, probabilities, or generated text) as training labels for a surrogate model. The Praetorian attack achieved 80% functional replication of a production classifier with 1,000 queries using this method — the attacker spent approximately $20 in API credits to steal a model whose training cost exceeded $500,000 [Praetorian, Jan 2026](https://www.praetorian.com/blog/stealing-ai-models-through-the-api-a-practical-model-extraction-attack/).

### 2. Direct Querying

The attacker sends specific, crafted inputs designed to elicit informative responses. Unlike distillation which uses random or uniform inputs, direct querying selects inputs that maximize information gain per query. The AAAI 2025 work showed that fewer than 500 queries suffice for domain knowledge extraction when queries are optimized via an acquisition function [AAAI, 2025](https://ojs.aaai.org/index.php/AAAI/article/view/40456/44417).

### 3. Side-Channel Extraction

The attacker infers model parameters from non-functional signals: timing of responses, memory usage patterns, power consumption, or cache behavior. This category is less common for cloud-hosted LLMs but is relevant for on-premise deployments and edge AI.

### 4. Prompt Stealing

The attacker recovers the system prompt or instruction template embedded in an LLM's context window. The Adnan Masood research on "LLM Distillation Attacks" documented prompt stealing as an emerging extraction sub-category where the attacker uses carefully designed conversation patterns to have the model reveal its own instruction set [Medium, Mar 2026](https://medium.com/@adnanmasood/llm-distillation-attacks-the-new-ai-extraction-economy-20672360b586).

### 5. Cold-Copy Extraction

The attacker copies model weights directly from exposed storage, memory, or inference infrastructure — no API queries required. CVE-2026-7482 ("Bleeding Llama") demonstrated that exposed Ollama servers leak the entire process heap when sent a crafted tensor size request, enabling attackers to download model weights and conversation data without authentication [Cyera Research, May 2026](https://www.cyera.com/research/bleeding-llama-critical-unauthenticated-memory-leak-in-ollama). Over 300,000 Ollama instances were exposed at the time of disclosure.

---

## Major Real-World Incidents (2025–2026)

### Incident 1: Praetorian's Production Model Extraction (Jan 2026)

The Praetorian offensive security team demonstrated a practical extraction attack against a production ML model. With 1,000 API queries costing approximately $20 in credits, they achieved 80% accuracy replication. The attack required no special access — only the same prediction API available to legitimate customers. The team emphasized that existing rate-limiting and query-monitoring defenses were insufficient because the query volume fell below typical anomaly detection thresholds [Praetorian, Jan 2026](https://www.praetorian.com/blog/stealing-ai-models-through-the-api-a-practical-model-extraction-attack/).

### Incident 2: Bleeding Llama (CVE-2026-7482, May 2026)

Disclosed in May 2026, CVE-2026-7482 affects the Ollama model serving infrastructure. The vulnerability allows unauthenticated attackers to send a crafted tensor size request that causes the server to return raw process heap memory, containing model weights, API keys, environment variables, and conversation history. Indusface reported that this is "worse than Heartbleed" — Heartbleed leaked 64 KB per heartbeat, while Bleeding Llama leaks the entire process heap bounded only by the declared tensor size [Indusface, May 2026](https://www.indusface.com/blog/cve-2026-7482-bleeding-llama-vulnerability/). The Cloud Security Alliance's research note documented attackers using this vulnerability as part of a broader "LLMjacking" campaign [CSA, Jun 2026](https://labs.cloudsecurityalliance.org/research/csa-research-note-llmjacking-evolved-offensive-agentic-20260/).

### Incident 3: LLMjacking Evolved — Stolen Inference as Infrastructure (Jun 2026)

The Sysdig Threat Research Team documented threat actors using stolen Ollama inference capacity as the reasoning engine for offensive agentic toolchains. Attackers harvested exposed model servers, extracted credentials via CVE-2026-7482, and used the stolen compute to run autonomous attack agents [Sysdig, Jun 2026](https://www.sysdig.com/blog/llmjacking-evolved-attackers-are-using-stolen-ai-compute-to-build-offensive-agentic-tools). The Kodem and Intezer research published concurrently showed attackers actively scanning for exposed LLM inference endpoints, with automated tooling that checks for model extraction opportunities [Kodem Security, Jun 2026](https://www.kodemsecurity.com/resources/how-attackers-are-gaining-access-to-llm-inference).

### Incident 4: Distributed Multi-Client Extraction (ICMCIS 2026 Best Paper)

Schwarzer et al. demonstrated that coordinated threat actors (simulating APT-level capabilities) can bypass extraction defenses by distributing queries across multiple client identities. Their CerberusAI framework implements round-robin query distribution that evades PRADA (Protecting Against Deep Neural Network Model Stealing Attacks) — a state-of-the-art defense — reducing its detection rate to near zero. The paper won the best paper award at ICMCIS 2026 and demonstrated that global aggregation approaches also fail against adaptive traffic mixing [arXiv:2606.03381](https://arxiv.org/abs/2606.03381).

---

## Defense Landscape

### Defenses That Work

**Entangled watermarks** represent the most promising defense category. The "Let Them Steal" framework (arXiv:2606.15810, Jun 2026) proposes embedding knowledge watermarking traps that poison any surrogate model trained on extracted data. When the attacker's substituted model encounters the watermark trigger, it produces detectable anomalous outputs, enabling model provenance verification [arXiv:2606.15810](https://arxiv.org/abs/2606.15810). The usenix 2025 paper on entangled watermarks demonstrated that these defenses can survive model fine-tuning and quantization — the attacker cannot simply remove them by post-processing.

**Stateful, identity-independent defenses** are the future direction recommended by the CerberusAI paper. Instead of tracking per-client behavior (which fails against distributed attackers), stateful defenses track per-input queries over time, building behavioral profiles of the query stream itself rather than the identities sending it.

**Prediction poisoning** adds calibrated noise to API responses that degrades surrogate model quality without meaningfully affecting legitimate user experience. The trade-off is between model usability and extractability — more noise provides better protection but reduces output quality.

### Defenses That Fail

**Rate limiting** — attackers can distribute queries across IPs, accounts, and time periods. The Praetorian extraction used only 1,000 queries spread over several hours, well below typical rate-limiting thresholds.

**PRADA-style monitoring** — the CerberusAI framework demonstrated that PRADA's statistical anomaly detection fails against round-robin distributed attacks because each individual client falls within normal query patterns.

**Log-based auditing** — without real-time anomaly detection and cross-client correlation, logs are useful only for post-hoc attribution, which does nothing to prevent the extraction.

**Siloed per-account defenses** — the Single Client Assumption is the fundamental flaw. Any defense that tracks per-client behavior implicitly assumes attackers operate from one identity.

---

## Key Findings

1. **The cost of extraction has collapsed.** In 2016, Tramèr et al. required tens of thousands of queries to extract simple decision-tree models. By 2026, 1,000 API queries costing $20 can functionally replicate a production classifier with 80% accuracy. The query-to-value ratio now heavily favors attackers.

2. **The Single Client Assumption is dead.** The CerberusAI paper proved that any defense relying on per-client anomaly detection can be bypassed by coordinated attackers distributing queries across 5–10 identities. This invalidates the core assumption behind PRADA and similar defenses.

3. **Cold-copy extraction is the new frontier.** CVE-2026-7482 demonstrated that model weights can be stolen without any API queries at all. The 300,000+ exposed Ollama instances represent a massive attack surface that traditional extraction defenses cannot address.

4. **Entangled watermarks offer the best ROI.** The "Let Them Steal" framework provides provable detection of model theft without degrading API quality. Watermarking is effective against all extraction methods except cold-copy, which requires infrastructure-level controls.

5. **LLMjacking monetizes extraction.** Attackers are no longer just stealing models for competitive intelligence — they are using stolen AI compute as infrastructure for further attacks. The Sysdig and CSA reports document a clear pipeline: discover → extract → weaponize.

---

## Implications by Deployment Type

| Deployment type | Exposure level | Primary risk | Recommended action |
|----------------|----------------|-------------|-------------------|
| Public API (pay-per-query) | High | Functional replication via distillation | Entangled watermarks + query fingerprinting |
| Enterprise API (authenticated) | Medium-High | Distributed extraction by APTs | Stateful, identity-independent monitoring |
| On-premise deployment | Medium | Side-channel + cold-copy | Memory hardening, access controls, TPM |
| Open-source serving (Ollama, vLLM) | Critical | Cold-copy (CVE-2026-7482) | Patch immediately, firewalling, auth required |
| Edge/mobile deployment | Low-Medium | Parameter recovery | Model encryption, secure enclave, obfuscation |

---

## Recommendations

1. **Implement entangled watermarking immediately.** For any API-accessible AI model, deploy knowledge watermarking that triggers on specific input patterns. This provides forensic capability to detect stolen models without degrading legitimate API quality. The watermark design should follow the "Let Them Steal" framework's resistance guarantees against fine-tuning and quantization.

2. **Replace per-client defenses with stream-based detection.** Abandon the Single Client Assumption. Deploy query-stream analysis that tracks aggregate patterns across all clients, looking for coordinated extraction behavior. The CerberusAI paper's findings should be treated as a wake-up call for any team that relies on per-IP rate limiting or per-account anomaly detection.

3. **Patch Bleeding Llama and audit Ollama exposure.** If your organization runs Ollama or similar open-source model serving infrastructure, apply the CVE-2026-7482 patch immediately. Audit all exposed inference endpoints for unauthenticated access. The Indusface report notes that Shodan scans showed 300,000+ vulnerable instances at disclosure.

4. **Use query budgets and cost-aware pricing.** Structure API pricing so that extraction-scale queries (thousands per day from one account or pattern) become economically unattractive. This doesn't stop determined attackers but raises the floor and makes casual extraction unprofitable.

5. **Monitor for LLMjacking patterns.** Watch for anomalous inference usage spikes, especially from new accounts or IPs that rapidly scale up query volume. The Sysdig TRT report documented attackers ramping from low-volume probe queries to sustained extraction in under 24 hours — this cadence is detectable with proper baselines.

6. **Establish model provenance tracking.** Before deploying any AI model, create a cryptographic fingerprint or embedded watermark that can prove ownership if a stolen model surfaces elsewhere (on Hugging Face, in a competitor's product, etc.). The "Let Them Steal" framework provides a blueprint for this.

---

## Sources

1. Tramèr et al., "Stealing Machine Learning Models via Prediction APIs," USENIX Security 2016. https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/tramer
2. Praetorian Research, "Stealing AI Models Through the API: A Practical Model Extraction Attack," Jan 2026. https://www.praetorian.com/blog/stealing-ai-models-through-the-api-a-practical-model-extraction-attack/
3. Schwarzer et al., "AI Model Extraction Attacks: Bypassing Single-Client Assumptions in Defenses," arXiv:2606.03381, Jun 2026. https://arxiv.org/abs/2606.03381
4. "Let Them Steal: Trapping Large Language Model Extraction Attacks with Knowledge Watermarks," arXiv:2606.15810, Jun 2026. https://arxiv.org/abs/2606.15810
5. OWASP Top 10 for LLM Applications 2025. https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf
6. ACM Computing Surveys, "A Survey on Model Extraction Attacks and Defenses for Large Language Models," Aug 2025. https://dl.acm.org/doi/10.1145/3711896.3736573
7. Indusface, "CVE-2026-7482: Critical Ollama Memory Leak — Bleeding Llama," May 2026. https://www.indusface.com/blog/cve-2026-7482-bleeding-llama-vulnerability/
8. Cyera Research, "Bleeding Llama: Critical Unauthenticated Memory Leak in Ollama," May 2026. https://www.cyera.com/research/bleeding-llama-critical-unauthenticated-memory-leak-in-ollama
9. Cloud Security Alliance, "LLMjacking Evolved: Stolen AI Compute as Offensive Infrastructure," Jun 2026. https://labs.cloudsecurityalliance.org/research/csa-research-note-llmjacking-evolved-offensive-agentic-20260/
10. Sysdig TRT, "LLMjacking evolved: Attackers are using stolen AI compute to build offensive agentic tools," Jun 2026. https://www.sysdig.com/blog/llmjacking-evolved-attackers-are-using-stolen-ai-compute-to-build-offensive-agentic-tools
11. Kodem Security / Intezer, "How Attackers Are Gaining Access to LLM Inference," Jun 2026. https://www.kodemsecurity.com/resources/how-attackers-are-gaining-access-to-llm-inference
12. AAAI 2025, "Query-Efficient Domain Knowledge Stealing Against Large Language Models." https://ojs.aaai.org/index.php/AAAI/article/view/40456/44417
13. Adnan Masood, "LLM Distillation Attacks — The New AI Extraction Economy," Mar 2026. https://medium.com/@adnanmasood/llm-distillation-attacks-the-new-ai-extraction-economy-20672360b586
14. Check Point Research, "AI Attacks Are No Longer Experimental: Key Findings from the March-April 2026 AI Threat Landscape," Apr 2026. https://blog.checkpoint.com/research/ai-attacks-are-no-longer-experimental-key-findings-from-the-march-april-2026-ai-threat-landscape/
15. Foresiet, "6 AI Security Incidents: Full Attack Path Analysis (April 2026)," Apr 2026. https://foresiet.com/blog/ai-security-incidents-attack-paths-april-2026/
