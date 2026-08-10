---
title: "Cybersecurity News This Week: Coldcard $130M Flaw, SCTPhantom Kernel Bug, Chrome 151 Criticals"
description: "This week's cybersecurity news roundup covers the Coldcard wallet attack, a long-dormant Linux kernel flaw, urgent Chrome fixes, and fresh CISA warnings."
pubDate: 2026-08-10
tags: ["news-roundup", "cve", "patch-management", "kernel-security", "supply-chain-security"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/2026-08-10-news-roundup-1786390601.webp"
lastVerified: 2026-08-10
---

The biggest cybersecurity news this week is the Coldcard hardware wallet entropy flaw that let attackers drain $130M in Bitcoin from cold storage. Add an 18-year-old Linux kernel bug, six critical Chrome fixes, a guilty plea in the Snowflake extortions, and two new CISA KEV entries.

## How This Was Verified

Primary sources are vendor and government advisories: the DOJ press release, CISA's Known Exploited Vulnerabilities catalog and JSON feed, Google Chrome Releases, and Galaxy Research. All source URLs were curl-verified HTTP 200 on Aug 10, 2026; claims are as reported by researchers.

## Coldcard Wallet Flaw: ~$130M in Bitcoin Drained

A firmware bug in Coldcard hardware wallets reduced seed-generation entropy to as little as ~40 bits, letting attackers brute-force private keys offline and drain roughly $130M in Bitcoin from wallets marketed as the gold standard of self-custody. Attacks began July 30, 2026, and Galaxy Research counts at least 15 independent attackers exploiting the flaw. The fix is prospective only — existing seeds remain permanently compromised, and users must migrate to newly generated seeds on patched hardware.

The root cause traces to a March 2021 firmware release that routed entropy through a software fallback seeded by device-identifying data and timer registers. Effective entropy dropped to ~40 bits on Mk2/Mk3 devices and ~72 bits on Mk4/Q/Mk5. No physical access was required — attackers generated candidate seeds offline and matched them against the blockchain.

Galaxy Research reports 1,082 BTC (~$70M) swept in a single 41-minute window by Aug 1, with two more waves of roughly 284 BTC following in subsequent days. Over 200 victims have reported losses — one cold-storage wallet kept in a bank safe-deposit box lost 18.25 BTC in seven minutes. The device never left the vault, proving that offline storage alone does not protect against a seed-entropy flaw. Users with vulnerable-firmware seeds must migrate to new seeds on patched hardware. See [Galaxy Research](https://www.galaxy.com/insights/research/your-keys-not-your-coins-coldcard-wallets-hacked-for-130m-and-counting) and [The Hacker News](https://thehackernews.com/2026/08/coldcard-hardware-wallet-flaw-linked-to.html) for technical details, and our earlier [AI news roundup](/blog/2026-07-27-ai-news-roundup/) for context on how hardware-wallet failures ripple through the broader security ecosystem.

## SCTPhantom (CVE-2026-64564): 18-Year-Old Linux Kernel Flaw

CVE-2026-64564 is a use-after-free in the SCTP subsystem's DEL-IP handling, rated CVSS 9.8, with a local privilege-escalation path at CVSS 8.5. The bug was introduced in kernel v2.6.25 in 2008, so every maintained SCTP-capable kernel is affected. Tencent's Zhuque Lab disclosed it publicly in early August 2026.

The upstream fix is commit `9b2854f86f0b`, backported to kernels 7.1.6, 6.18.42, 6.12.101, and 6.6.148, plus Debian trixie/sid, Proxmox VE, and NixOS. Kernels 6.1, 5.15, and 5.10 LTS remain unpatched as of Aug 10, as do Debian bookworm/bullseye, RHEL/Rocky 8/9/10, and Amazon Linux 2023. On RHEL, the SCTP module ships via `kernel-modules-extra`, meaning it may be loadable by default even if your applications do not use it. Check the [patch-status tracker](https://github.com/suominen/sctphantom) and [The Hacker News coverage](https://thehackernews.com/2026/08/18-year-old-linux-sctp-flaw-could-let.html). For a deeper look at how kernel flaws get KEV-listed, see our [CVE analysis](/blog/2026-08-08-cve-analysis/).

## Chrome 151: 41 Fixes, 6 Critical Memory-Safety Bugs

Chrome 151 shipped August 6, 2026 as versions 151.0.7922.108/.109 for Windows, macOS, and Linux, with 41 security fixes — six rated Critical, all memory-safety bugs in Aura, WebGL, and the GPU process. External bug-bounty researchers contributed 12 of the fixes. The browser remains the primary attack surface for most organizations, and critical memory-safety bugs in rendering and GPU components are routinely chained into remote code execution exploits within days of disclosure.

The six Critical CVEs are CVE-2026-19137, CVE-2026-19149, CVE-2026-19154, CVE-2026-19157, CVE-2026-19170, and CVE-2026-19172. Assume these bugs are exploitable. The [Chrome Releases blog](https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_01193673229.html) and [Forbes](https://www.forbes.com/sites/daveywinder/2026/08/07/google-chrome-151-update-bounty-hunters-discover-12-new-security-bugs/) have details — force-update all browsers this week.

## Snowflake Extortion: Moucka Pleads Guilty, 165+ Victims

Connor Riley Moucka, 26, of Kitchener, Ontario, pleaded guilty on August 5, 2026 to hacking at least 165 cloud-storage customers of Snowflake between February and October 2024. The campaign compromised billions of records, including data of over 100 million individuals. Stolen data included call and text history, banking and payroll records, driver's licenses, passports, and Social Security numbers — advertised for sale on BreachForums, Exploit.in, XSS.is, and Telegram.

Moucka personally kept $495K of the $2.5M+ extorted; victim companies absorbed $9.5M+ in losses. He pleaded guilty to four counts, facing a two-year mandatory minimum and up to 30 years; sentencing is October 27, 2026. Extradited from Canada in July 2025, he was tracked by the FBI as UNC5537. The [DOJ press release](https://www.justice.gov/usao-wdwa/pr/canadian-pleads-guilty-hacking-us-cloud-storage-provider-and-extorting-its-customers) and [KrebsOnSecurity](https://krebsonsecurity.com/2026/08/canadian-man-pleads-guilty-in-snowflake-extortions/) detail the case.

## CISA KEV: TeamCity and N-central Flaws Exploited in the Wild

CISA added two vulnerabilities to its Known Exploited Vulnerabilities catalog this week. CVE-2026-63077, added August 5, is an unauthenticated remote code execution flaw in JetBrains TeamCity On-Premises; CVE-2026-18577, added August 3, is an authentication bypass in N-able N-central. Both are confirmed exploited in the wild.

CVE-2026-63077, scored CVSS 9.8, exploits TeamCity's agent polling protocol via unsafe deserialization; a patch plugin covers older versions. CVE-2026-18577 affects all current N-central versions, including 2026.3, as an incomplete patch for CVE-2026-18556; N-able confirmed exploitation on Aug 2, with hotfix 2026.3.1.10 released Aug 6.

The KEV catalog lists 1,662 entries. For U.S. federal agencies, remediation is binding under BOD 26-04; for everyone else, a KEV listing means active exploitation — treat it as urgent. See the [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog), [JetBrains advisory](https://blog.jetbrains.com/teamcity/2026/07/cve-2026-63077/), [Huntress analysis](https://www.huntress.com/blog/n-able-vulnerability-exploitation), and the [NVD entry](https://nvd.nist.gov/vuln/detail/CVE-2026-63077).

## Honorable Mentions

Several smaller stories rounded out the week, spanning AI-assistant flaws, supply-chain worms, appliance zero-days, and sanctions. The SonicWall zero-days and the self-propagating npm worms deserve attention even though they did not make the main sections. Here is what to know:

- Atlassian's Rovo AI has a data-exfiltration flaw, "RovoBlast" ([InfoSecurity Magazine](https://www.infosecurity-magazine.com/news/rovoblast-atlassian-rovo-url/)).
- The Shai-Hulud and ChainDrop self-propagating npm worms are back ([CyberPress](https://cyberpress.org/shai-hulud-npm-worm-returns/)).
- SonicWall SMA zero-days grant root access via WebSocket requests ([GBHackers](https://gbhackers.com/sonicwall-sma-zero-days/)).
- The US Treasury sanctioned Iranian exchange Shelbit for laundering $6B ([InfoSecurity Magazine](https://www.infosecurity-magazine.com/news/us-sanctions-iranian-6bn-crypto/)).

## Defender Checklist: What to Do This Week

Use this checklist to turn this week's news into concrete action. Each item maps to a story above, with links to primary sources and related guides. Start with the Coldcard migration first, then kernel patching, then browser and server updates.

1. Coldcard users should treat all seeds created since March 2021 as compromised. Generate new seeds on patched hardware and migrate funds now — affected seeds are permanently brute-forceable. See [last week's roundup](/blog/2026-08-03-news-roundup/).
2. Patch Linux kernels to 7.1.6, 6.18.42, 6.12.101, or 6.6.148. On 6.1, 5.15, or 5.10 LTS or RHEL/Rocky 8/9/10, check the [patch tracker](https://github.com/suominen/sctphantom) daily; disable SCTP if unused.
3. Force-update Chrome to 151.0.7922.108 or later everywhere; the six Critical memory-safety bugs are likely exploitable.
4. TeamCity On-Premises: apply the patch plugin or upgrade to 2026.1.3/2025.11.7. N-able N-central: apply hotfix 2026.3.1.10 or later.
5. Review cloud-storage exposure — the Snowflake case shows what happens when internet-facing data stores lack MFA and access controls. Our [API security hardening guide](/blog/2026-08-04-api-security-hardening/) covers baseline controls.
6. Subscribe to the [CISA KEV JSON feed](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) and automate alerts — every KEV listing is an emergency, not a suggestion.

## FAQ

This FAQ answers the three questions defenders asked most this week; each answer is self-contained, so you can skim straight to the relevant section if you are short on time. For deeper technical analysis, see our [CVE analysis](/blog/2026-08-08-cve-analysis/) and the [CVE database](/cves/).

### Which Coldcard users need to act immediately?

Coldcard users who generated a seed on firmware released since March 2021 must assume that seed is compromised. The flaw affects Mk2, Mk3, Mk4, Q, and Mk5 devices, and offline brute-forcing works even against cold storage. There is no patch for existing seeds — generate a new seed on updated firmware, then move your Bitcoin.

### Is my Linux kernel affected by CVE-2026-64564?

If you run a maintained kernel with SCTP support, you are likely affected; the bug dates to v2.6.25 (2008). Patched versions are 7.1.6, 6.18.42, 6.12.101, and 6.6.148; unpatched lines include 6.1, 5.15, and 5.10 LTS, plus RHEL/Rocky 8/9/10, Debian, and Amazon Linux 2023. Check the [patch-status tracker](https://github.com/suominen/sctphantom); disable the SCTP module if you cannot patch.

### What does a CISA KEV listing mean for non-federal organizations?

A KEV listing means CISA has confirmed active exploitation in the wild. For federal agencies, remediation is mandatory under BOD 26-04; for private organizations, it is a strong signal to prioritize that CVE above others. Patch by the CISA-specified due date — three days for both — in any sector. See the [CVE database](/cves/).

HERO_IMAGE_PROMPT: Wide 16:9 cinematic cybersecurity newsroom scene, dark command-center desk at night with three monitors showing a plunging Bitcoin wallet-drain chart, a Linux kernel code diff, and a red CISA KEV alert banner; a Chrome browser window and a hardware wallet in the foreground; photorealistic, teal-and-red rim lighting, shallow depth of field, high detail, no text artifacts
