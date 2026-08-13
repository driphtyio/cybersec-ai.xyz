---
title: "Ransomware in 2026: Record Volume, AI Tooling, Data Theft"
description: "Check Point: July 2026 ransomware hit 964 leak-site victims (+49% June, +87% YoY), topping H1's 672; Q2 saw 2,139 (+33% YoY). North America took 45% (US…"
pubDate: 2026-08-13
tags: ["ransomware", "threat landscape", "extortion", "data theft", "AI security"]
lastVerified: 2026-08-13
---

Ransomware volume surged in July 2026, with 964 victims reported on leak sites — up 49% from June and 87% year over year, shattering the H1 2026 average of roughly 672 incidents per month [Check Point](https://blog.checkpoint.com/security/july-2026-cyber-threats-surge-ransomware-attacks-double-year-over-year-as-genai-data-exposure-widens/).

## How This Was Researched

This analysis is based on official documentation and published reports — we did not run hands-on tests. Last researched: August 2026. Sources include Check Point's July 2026 threat report and Q2 2026 ransomware overview, CISA's AA26-222A advisory on Gunra ransomware, and Ransom-DB's Q1 2026 landscape report.

## Why did ransomware volume break its pattern in mid-2026?

July 2026 marked a decisive break from the H1 2026 trend, with 964 ransomware victims reported on leak sites — a 49% increase from June and an 87% year-over-year jump that dwarfed the roughly 672 monthly average seen earlier in the year [Check Point](https://blog.checkpoint.com/security/july-2026-cyber-threats-surge-ransomware-attacks-double-year-over-year-as-genai-data-exposure-widens/). Q2 2026 recorded 2,139 total victims, flat compared to Q1 but up 33% year over year, reinforcing that the upward pressure is persistent rather than seasonal [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/).

Geographically, North America accounted for 45% of reported incidents, with the U.S. alone representing 39.4%, while Europe and APAC followed at 28% and 17% respectively [Check Point](https://blog.checkpoint.com/security/july-2026-cyber-threats-surge-ransomware-attacks-double-year-over-year-as-genai-data-exposure-widens/). The Business Services sector bore the brunt, representing roughly one-third of all reported victims, indicating that supply chains and service providers remain attractive targets for broad-impact campaigns.

This surge was not driven by a single group or tactic. Instead, it reflects a fragmented ecosystem where more actors are operating simultaneously, each contributing smaller volumes but collectively pushing total incident counts higher.

## How is the ransomware market restructuring?

The ransomware landscape is fragmenting rapidly: the number of active ransomware groups jumped from 71 in Q1 2026 to 93 in Q2 — the highest on record — while the top-10 groups' collective share of victims dropped from 71% to 57.6% [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). This shift suggests a wider mid-tier of operators filling the void left by dominant players consolidating or fading.

Qilin maintained its lead for a fourth consecutive quarter with 279 victims in Q2, though The Gentlemen grew 62% and outpaced Qilin in June [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). LockBit also resurged, climbing from 12 to 59 victims in a single month — a 391% spike — while newcomers AiLock and Vect appeared from zero baseline [Ransom-DB](https://www.ransom-db.com/blog/ransomware-threat-landscape-report-march-2026). Meanwhile, Cl0p — which had been prominent in Q1 following its Oracle E-Business Suite campaign — nearly vanished from the landscape [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/).

This diversification reduces the effectiveness of group-specific threat intelligence and increases the operational burden on defenders who must now monitor a broader set of actors with varying capabilities and TTPs.

## What does the leaked Gentlemen operation tell us about AI-built tooling?

Leaked backend data from The Gentlemen reveals a lean operation: a core team of approximately nine people operating on a 90/10 affiliate split — the highest commission rate advertised in the market [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). More notably, the group's administrator, identified as "Zeta88," built the ransomware management panel in roughly three days using AI coding assistants [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/).

This acceleration in tool development lowers the barrier to entry for new ransomware operators. Where previously building a functional RaaS platform required weeks of manual development and deep technical expertise, AI-assisted coding enables rapid prototyping and deployment. The implication is clear: expect more groups to emerge with sophisticated tooling in shorter timeframes.

DeadLock, another active group first observed in July 2025, exemplifies this trend by rotating blockchain-based command-and-control proxy addresses and leveraging legitimate remote management tools to blend into normal traffic [Check Point](https://blog.checkpoint.com/security/july-2026-cyber-threats-surge-ransomware-attacks-double-year-over-year-as-genai-data-exposure-widens/).

## Why is data theft replacing encryption as the leverage?

Ransom payment rates have collapsed to approximately 23%, down sharply from 85% in 2019, largely because organizations with robust backups can recover from encryption without paying [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). As encryption loses its coercive power, operators are pivoting to exfiltration-first extortion, where the threat of public data disclosure becomes the primary leverage point.

Despite the lower payment rates, on-chain ransomware payments still totaled over $820 million in 2025 [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). This figure underscores that while fewer victims pay, those who do often pay larger sums, and the overall financial incentive for operators remains substantial.

The shift also changes the defender's focus: detecting exfiltration becomes as critical as preventing encryption. Traditional backup strategies mitigate the encryption threat, but they offer no protection against data leaks — making data loss prevention (DLP) and network egress monitoring essential components of a modern ransomware defense strategy.

## What should defenders prioritize in late 2026?

Initial access remains the primary battleground. The Gentlemen's campaign pipeline relied heavily on VPN scanning, brute-force attacks, and brokered credentials [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). Defenders should prioritize patching known exploited vulnerabilities (KEVs) on internet-facing systems, particularly VPN gateways and RDP-exposed infrastructure, as recommended by CISA in its AA26-222A advisory [CISA](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-222a).

Implementing and regularly testing offline, immutable backups in a physically separate and segmented location is another critical step [CISA](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-222a). Network segmentation should be used to limit lateral movement once an attacker gains a foothold [CISA](https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-222a). Additionally, phishing-resistant multi-factor authentication (MFA) should be enforced wherever possible, as credential-based access remains a top initial access vector [Ransom-DB](https://www.ransom-db.com/blog/ransomware-threat-landscape-report-march-2026).

Defenders should also monitor for exfiltration indicators, including unusual data transfers to external IPs or cloud storage services. CVE-2023-4966 (Citrix Bleed) continues to be exploited by groups like Qilin and LockBit for initial access [Ransom-DB](https://www.ransom-db.com/blog/ransomware-threat-landscape-report-march-2026), so patching this vulnerability should be treated as urgent.

For SaaS teams seeking structured guidance, reviewing the [Linux Server Hardening checklist](/blog/2026-08-11-linux-server-hardening/) and staying current with [recent CVEs](/cves/) can help close common attack paths. Regular [security scanning](/scan/) of internet-facing assets is also recommended to catch misconfigurations before adversaries do. For a broader approach, consult the [security frameworks hub](/frameworks/) to align your defenses with established best practices.

## FAQ

### Is ransomware volume still increasing in 2026?

Yes — July 2026 saw 964 victims on leak sites, a 49% increase from June and 87% year over year, breaking the H1 2026 average of roughly 672 incidents per month [Check Point](https://blog.checkpoint.com/security/july-2026-cyber-threats-surge-ransomware-attacks-double-year-over-year-as-genai-data-exposure-widens/).

### Are new ransomware groups still emerging?

Yes — AI-assisted tool development is lowering barriers, and Q2 2026 saw active groups rise from 71 to 93, the highest on record [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/).

### Should we still back up our data?

Yes — backups neutralize encryption-based attacks, which is why payment rates fell to ~23% from 85% in 2019 [Check Point](https://blog.checkpoint.com/security/ransomware-didnt-slow-down-in-q2-2026-it-just-spread-out/). However, backups alone won't stop data theft, so exfiltration detection is also essential.

<!-- crosslinks -->

## 📖 Related Reads

- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides

*Cross-links automatically generated from None.*
