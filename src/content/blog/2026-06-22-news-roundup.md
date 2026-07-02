---
title: "Weekly AI Cybersecurity News Roundup — June 15–22, 2026"
description: "Anthropic forced to shut down Fable 5 and Mythos 5 models, SearchLeak vulnerability turns M365 Copilot into a one-click data exfiltration weapon, LiteLLM gateway RCE added to CISA KEV, Infinite Campus breach exposes school staff records, and FortiBleed campaign cracks Fortinet admin credentials."
pubDate: "2026-06-22"
tags:
  - news-roundup
  - ai-security
  - threat-intelligence
  - mitre-attck
  - nist-csf
  - mitre-atlas
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/20260622-news-1782138319.jpg"
---

## Top Stories

### Anthropic Shuts Down Fable 5 and Mythos 5 After US Export Control Directive

On June 12, the US Secretary of Commerce issued an export control directive ordering Anthropic to immediately suspend access to its two most advanced AI models — Fable 5 and Mythos 5 — citing national security concerns [The Record](https://therecord.media/anthropic-says-gov-forced-it-to-disable-cyber-ai-models). Anthropic complied within hours, abruptly disabling both models for all users worldwide, not just international ones. The models had been publicly available for only days before the shutdown.

Cybersecurity veterans pushed back hard. A group of security researchers and practitioners published an open letter arguing the ban is "dangerous" because it removes defensive AI tools from the hands of organizations that need them most [TechCrunch](https://techcrunch.com/2026/06/15/cybersecurity-vets-protest-dangerous-us-government-ban-on-anthropics-most-powerful-models/). The directive raises unresolved questions about how governments will handle dual-use AI capabilities — models that can both detect vulnerabilities and exploit them — and whether broad bans create more risk than they prevent.

### SearchLeak: M365 Copilot Turned Into a One-Click Data Exfiltration Weapon

Wiz Research disclosed SearchLeak, a prompt injection vulnerability in Microsoft 365 Copilot that allowed attackers to exfiltrate sensitive data via the search index [Wiz](https://www.wiz.io/blog/searchleak-microsoft-365-copilot-vulnerability). Microsoft addressed the vulnerability in a June 2026 security update. The attack required no user interaction beyond opening a malicious document, making it one of the most severe AI security incidents of 2026.

Microsoft has patched the vulnerability, but SearchLeak is part of a worrying pattern. AI assistants that can read your email, access your documents, and summarize your calendar create a fundamentally new exfiltration surface. Traditional DLP tools don't monitor AI-to-AI data flows, and the prompt injection vector bypasses most existing controls. This is the third major Copilot vulnerability in 2025-2026, following EchoLeak (CVE-2025-32711) and the Reprompt attack disclosed in January.

Source: [OECD AI Incidents Monitor](https://oecd.ai/en/incidents/2026-06-15-ed77)

## Breaches & Incidents

### Infinite Campus: 137,000 School Staff Records Exposed via Salesforce

The ShinyHunters extortion gang stole personal information from more than 137,000 school staff accounts in a Salesforce data theft attack targeting Infinite Campus, a student information system used by 3,200 school districts across 46 states [BleepingComputer](https://www.bleepingcomputer.com/news/security/infinite-campus-data-breach-affects-137-000-school-staff-accounts/). The attackers accessed a Salesforce instance containing names and contact details, then leaked a 1.2GB archive of documents on their data leak site when the extortion demand wasn't met.

The breach happened in March but the data was published on Have I Been Pwned on June 15. The incident highlights a recurring problem in edtech: school districts rely on SaaS platforms that manage millions of sensitive records, but those platforms' security postures — particularly around third-party integrations like Salesforce — don't always match the sensitivity of the data they hold [TechRepublic](https://www.techrepublic.com/article/news-infinite-campus-salesforce-breach-school-staff-data/).

### FortiBleed: 74,000 Fortinet Admin Credentials Cracked

On June 18, the Australian Cyber Security Centre issued a critical alert about FortiBleed, an active credential harvesting campaign targeting Fortinet FortiGate firewalls across 194 countries [Help Net Security via DIESEC](https://diesec.com/2026/06/top-5-cybersecurity-news-stories-june-19-2026/). A Russian-speaking criminal group extracted SSL VPN configuration files from exposed FortiGate devices, then cracked the admin credential hashes using a 45-GPU cluster running 1.16 billion attempts. The result: 73,932 verified, working administrator credentials — including access to Fortune 500 companies, government agencies, and NATO contractors.

The critical detail: there's no new vulnerability. Fortinet introduced PBKDF2-based password hashing in recent FortiOS versions, but existing credentials are NOT automatically migrated. An organization that patched to a PBKDF2 version without forcing every admin to re-authenticate is still using SHA-256 hashes — the ones FortiBleed cracked. Hudson Rock has published a free credential lookup tool. If you manage Fortinet devices, force re-authentication across your entire fleet today.

### JetBrains Marketplace: 15 Malicious AI Plugins Stole Developer API Keys for Eight Months

On June 16, JetBrains confirmed that 15 third-party plugins on the JetBrains Marketplace had been stealing AI provider API keys since October 2025 [BleepingComputer via DIESEC](https://diesec.com/2026/06/top-5-cybersecurity-news-stories-june-19-2026/). Two plugins — CodeGPT AI Assistant and DeepSeek AI Assist — had over 25,000 downloads each. They appeared fully functional, delivering their advertised features while silently exfiltrating API keys for OpenAI, Anthropic, DeepSeek, and others via plaintext HTTP to a hardcoded C2 IP. Total installs across all 15 plugins: more than 70,000.

The eight-month gap between publication and takedown shows that IDE plugin marketplaces lack the security scanning rigor that ecosystems like npm have developed. JetBrains removed all plugins, blocked the publisher accounts, and remotely disabled them in installed IDEs.

## AI-Powered Threats

### LiteLLM CVE-2026-42271: AI Gateway RCE Added to CISA KEV

On June 8, CISA added CVE-2026-42271 to its Known Exploited Vulnerabilities catalog with a federal remediation deadline of June 22 [CISA](https://www.cisa.gov/news-events/alerts/2026/06/11/cisa-adds-one-known-exploited-vulnerability-catalog). The vulnerability is a command injection flaw in LiteLLM, the open-source AI gateway used to route API traffic to OpenAI, Anthropic, Azure OpenAI, and dozens of other providers. Two MCP server preview endpoints accepted full server configuration in the request body, including command, arguments, and environment variables — and spawned them as subprocesses.

Chained with CVE-2026-48710 (a Starlette host-header bypass), the combined attack reaches CVSS 10.0 — unauthenticated remote code execution on any internet-exposed LiteLLM deployment. Given LiteLLM's role as the aggregation layer holding API keys for every connected AI provider, this is a critical infrastructure vulnerability. Fix: LiteLLM 1.83.7 and Starlette 1.0.1.

### Vertiv UPS Management Cards: Authentication Bypass and RCE

Claroty's Team82 disclosed two critical vulnerabilities in Vertiv Liebert UPS management cards on June 12 [SecurityWeek via DIESEC](https://diesec.com/2026/06/top-5-cybersecurity-news-stories-june-19-2026/). CVE-2025-46412 (CVSS 9.8) enables authentication bypass on the web interface, while CVE-2025-41426 (CVSS 9.8) allows remote code execution via stack-based buffer overflow. Together, an attacker with network access to the management card can execute arbitrary code on a device that controls the power state of every server on that UPS circuit — meaning a forced physical shutdown of server racks.

The power management layer is rarely part of standard IT security processes. These vulnerabilities are the logical next step in the attack chain that previously targeted backup infrastructure: if you own the UPS, there's no graceful shutdown.

### Ransomware Surged 48% in May, AI Driving Faster Breakout Times

The NCC Group's May 2026 threat report [NCC Group](https://www.nccgroup.com/us/research-blog/monthly-threat-pulse-may-2026/) recorded a 48% month-over-month increase in ransomware incidents, with AI-assisted tooling accelerating the window from initial access to payload deployment. LockBit 4.0 and BlackCat/ALPHV variants accounted for the majority of incidents, with healthcare and education sectors hit hardest.

## Policy & Regulation

### White House Executive Order on AI Cybersecurity

On June 2, President Trump signed an Executive Order directing federal agencies to deploy AI-enabled cybersecurity tools and establish an AI Security Center [LinkedIn / AI Security Executive Briefing](https://www.linkedin.com/pulse/ai-security-executive-briefing-friday-12-june-2026-spencer-j-dimbe). The order also mandates coordinated action on national security considerations around advanced AI capabilities.

The White House action comes alongside a flurry of state-level AI regulation. Colorado, California, Texas, and Illinois now have active AI governance rules, and the FTC has begun fining companies for deceptive AI practices under existing consumer protection authority [VerifyWise](https://verifywise.ai/blog/state-of-ai-governance-regulations-united-states-2026). No comprehensive federal AI law has passed, but the regulatory patchwork is growing fast.

### CISA Added Multiple CVEs to KEV Catalog

CISA made multiple additions to its Known Exploited Vulnerabilities catalog this week, including:

- June 11: One vulnerability added [CISA](https://www.cisa.gov/news-events/alerts/2026/06/11/cisa-adds-one-known-exploited-vulnerability-catalog)
- June 15: Two vulnerabilities added, including a Cisco flaw [CISA](https://www.cisa.gov/news-events/alerts/2026/06/16/cisa-adds-one-known-exploited-vulnerability-catalog)
- June 18: One additional vulnerability [CISA](https://www.cisa.gov/news-events/alerts/2026/06/18/cisa-adds-one-known-exploited-vulnerability-catalog)

The consistent cadence of KEV additions confirms that exploitation of known vulnerabilities remains the primary attack vector for both state-sponsored and criminal groups.

## New Tools

### OpenAI Launches Daybreak for AI-Powered Vulnerability Detection

OpenAI released Daybreak, an AI-powered vulnerability detection tool built on GPT-5.5-Cyber [The Hacker News](https://thehackernews.com/2026/05/openai-launches-daybreak-for-ai-powered.html). While launched in May, the tool is seeing increasing adoption as organizations grapple with AI-accelerated vulnerability discovery timelines. Daybreak competes directly with similar offerings from SentinelOne, Darktrace, and CrowdStrike in the rapidly growing AI security tools market.

### Microsoft Build 2026: AI Security and Governance Push

At Microsoft Build 2026 (June 2), Microsoft announced new AI governance and security features for its platform, emphasizing the ability to maintain context without sacrificing security controls [Microsoft](https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/). The announcements come as Microsoft faces increasing scrutiny over Copilot security vulnerabilities, with three major disclosure events in the past 18 months.

## What to Watch

1. **LiteLLM exploitation window**: With CISA's federal remediation deadline of June 22, expect more exploit activity targeting unpatched LiteLLM instances this week. Check if your organization has any internet-exposed AI gateways.

2. **IDE supply chain attacks**: The JetBrains Marketplace incident is unlikely to be the last. Expect similar campaigns targeting VS Code extensions, PyPI packages, and npm modules that handle AI API keys.

3. **Fortinet credential fallout**: The 74,000 cracked FortiGate credentials are now circulating. Organizations that haven't forced administrator re-authentication should treat every FortiGate as potentially compromised.

4. **SearchLeak copycat attacks**: The M365 Copilot prompt injection technique described by Varonis will likely be adapted for other AI assistants — Google Gemini for Workspace, Slack AI, and custom enterprise chatbots.

5. **AI model governance tensions**: The Anthropic shutdown sets a precedent for government intervention in AI model deployment. Watch for similar actions against other frontier models and the inevitable legal challenges.

6. **Vertiv UPS exploitation**: With proof-of-concept code expected to follow Team82's disclosure, UPS management cards on the network should be treated as critical security assets and isolated where possible.

---

*All sources cited inline above. This roundup covers major developments from June 15–22, 2026. News is aggregated from BleepingComputer, The Record, TechCrunch, Varonis, CISA, OECD AI Incidents Monitor, DIESEC, CrowdStrike, WEF, and other security news sources.*

<!-- crosslinks -->

## 📖 Related Reads

- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides
- **[Hermes Tutorials](https://hermes-tutorials.dev/)** — Hermes Agent setup, configuration, and advanced workflows

*Cross-links automatically generated from None.*
