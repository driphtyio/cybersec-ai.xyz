# News Roundup Research Brief — August 3–10, 2026

**Prepared:** August 10, 2026 · **For:** cybersec-ai.xyz weekly news roundup
**Method:** Web research across major security publications + primary sources (vendor advisories, government releases, official blogs). Every primary source URL below verified returning **HTTP 200** via `curl -sI` on August 10, 2026.

---

## 1. Coldcard Hardware Wallet Entropy Flaw Drains ~$130M in Bitcoin — "Your Keys, Not Your Coins"

- **Type:** Major incident / hardware vulnerability
- **Primary source (VERIFIED 200):** Galaxy Research — https://www.galaxy.com/insights/research/your-keys-not-your-coins-coldcard-wallets-hacked-for-130m-and-counting (published August 7, 2026)
- **Secondary:** The Hacker News (Aug 1) — https://thehackernews.com/2026/08/coldcard-hardware-wallet-flaw-linked-to.html

**Summary:** Starting July 30, 2026, attackers drained wallets whose seeds were generated on Coinkite Coldcard hardware wallets across escalating waves — roughly 1,082 BTC (~$70.2M) swept from 1,196 addresses within a single 41-minute window by Aug 1, followed by two more waves (~284 BTC) totaling an estimated ~$130M as of Aug 4, with a fourth wave possibly underway. Galaxy Research now tracks at least 15 separate attackers exploiting the bug independently. Root cause: a firmware bug introduced in a March 2021 release routed part of Coldcard's seed-generation entropy through a software fallback seeded only by device-identifying data and timer/clock registers, collapsing effective entropy to ~40 bits (Mk2/Mk3) or ~72 bits (Mk4/Q/Mk5) instead of ~128 bits. No physical access was required — attackers generated candidate seeds offline and matched addresses against the public blockchain. Coinkite released emergency firmware updates, but the fix is prospective only: seeds created on vulnerable firmware remain permanently brute-forceable, and affected users (200+ victims have reported) must migrate to newly generated seeds on patched hardware.

**Why it matters:** It shatters the "not your keys, not your coins" assumption — a device marketed as the gold standard of self-custody introduced the failure at the moment of key creation, defeating even air-gapped operational security (one victim kept his Coldcard in a bank safe-deposit box and still lost 18.25 BTC in 7 minutes). For practitioners: key-generation/entropy paths are a single point of failure that no endpoint monitoring can detect, and "prospective-only" vendor remediation means affected assets are compromised forever — a template for how to communicate irrecoverable crypto/asset losses.

---

## 2. SCTPhantom (CVE-2026-64564): 18-Year-Old Linux Kernel SCTP Use-After-Free Grants Root + Container Escape

- **Type:** Vulnerability / CVE (CVSS 9.8)
- **Primary source (VERIFIED 200):** The Hacker News (Aug 7, 2026) — https://thehackernews.com/2026/08/18-year-old-linux-sctp-flaw-could-let.html
- **Secondary:** Community patch-status tracker — https://github.com/suominen/sctphantom

**Summary:** Disclosed publicly on August 6, 2026 (two days after the kernel CVE team assigned it) by Tencent's Zhuque Lab, CVE-2026-64564 ("SCTPhantom") is a use-after-free in the Linux kernel's SCTP implementation — `sctp_process_asconf()` DEL-IP handling in `net/sctp/sm_make_chunk.c` — where a cached transport pointer can reference a freed peer after a crafted ASCONF chunk sequence. The bug was introduced in kernel v2.6.25 (2008), meaning every maintained SCTP-capable kernel is in scope. The kernel CNA scores it CVSS 3.1 **9.8** (remotely reachable via a malicious SCTP peer); the discoverers demonstrated a local privilege-escalation / container-escape path (CVSS 4.0 8.5) where an unprivileged process enables ADD-IP/AUTH on its own socket. Fixed upstream by commit `9b2854f86f0b` (v7.2-rc5) and backported to 7.1.6, 6.18.42, 6.12.101 and 6.6.148, plus Debian trixie/sid, Proxmox VE and NixOS; still unpatched as of Aug 10 on kernel 6.1/5.15/5.10 LTS lines, Debian bookworm/bullseye, RHEL/Rocky 8/9/10 and Amazon Linux 2023. No public exploit code had surfaced at the time of reporting.

**Why it matters:** An 18-year-old bug granting root and container escape affects essentially the entire Linux fleet, and the patch-status tracker shows enterprise LTS distributions (RHEL, Debian stable, Amazon Linux) still lagging on backports — the exact gap attackers exploit. SCTP is often loadable by default (RHEL ships it via `kernel-modules-extra`), so defenders should inventory SCTP exposure, blacklist the module where unused, and prioritize kernel updates on container hosts and network-facing systems.

---

## 3. Chrome 151 Stable: 41 Security Fixes, 6 Critical Memory-Safety Bugs

- **Type:** Tool release / patch
- **Primary source (VERIFIED 200):** Google Chrome Releases blog (Aug 6, 2026) — https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_01193673229.html
- **Secondary:** Forbes (Aug 7) — https://www.forbes.com/sites/daveywinder/2026/08/07/google-chrome-151-update-bounty-hunters-discover-12-new-security-bugs/

**Summary:** Google shipped Chrome **151.0.7922.108/.109** (Windows/macOS) and **151.0.7922.108** (Linux) to the Stable channel on August 6, 2026, fixing **41 security vulnerabilities**, of which **6 are rated Critical** — memory-safety bugs (use-after-free / out-of-bounds write) in Aura, WebGL, GPU and other components: **CVE-2026-19137, CVE-2026-19149, CVE-2026-19154, CVE-2026-19157, CVE-2026-19170, CVE-2026-19172**. Twelve of the 41 fixes came from external bug-bounty researchers. The release follows a separate Aug 1 fix (CVE-2026-19153, a site-isolation enforcement gap in Workers).

**Why it matters:** The browser is the primary attack surface for most organizations; critical memory-safety bugs in rendering/GPU components are routinely chained into RCE exploits within days, and 12 externally reported bugs means public scrutiny (and exploit-development pressure) is already underway. Enterprise teams should treat this as an urgent fleet-wide patch — and the steady cadence of Chrome criticals is a reminder that browser update policies are a core control, not an afterthought.

---

## 4. Connor Riley Moucka Pleads Guilty in Snowflake Extortion Campaign: 165+ Victims, Billions of Records

- **Type:** Data breach / law enforcement
- **Primary source (VERIFIED 200):** U.S. DOJ, WD Washington press release (Aug 5, 2026) — https://www.justice.gov/usao-wdwa/pr/canadian-pleads-guilty-hacking-us-cloud-storage-provider-and-extorting-its-customers
- **Secondary:** KrebsOnSecurity — https://krebsonsecurity.com/2026/08/canadian-man-pleads-guilty-in-snowflake-extortions/ · TechCrunch — https://techcrunch.com/2026/08/06/hacker-pleads-guilty-to-stealing-data-from-more-than-165-snowflake-customers/

**Summary:** On August 5, 2026, Connor Riley Moucka, 26, of Kitchener, Ontario, pleaded guilty in Seattle federal court to a hacking conspiracy that compromised at least **165 cloud-storage customers** (Snowflake) between February and October 2024, stealing **billions of records** and terabytes of data — call/text history, banking and payroll data, DEA registration numbers, driver's licenses, passports and SSNs — affecting the data of at least **100 million individuals**. The crew extorted victims for **$2.5M+ in ransom payments** (Moucka personally kept ~$495K; victim companies absorbed $9.5M+ in direct losses), advertised stolen data on BreachForums, Exploit.in, XSS.is and Telegram, and in one case re-extorted a victim using stolen data belonging to a government officer's family. Moucka pleaded guilty to four counts (computer fraud, wire fraud, aggravated identity theft, conspiracy); sentencing is October 27, 2026, with a mandatory minimum of 2 years and up to 30 years. The case is part of the FBI's Operation Riptide; Moucka was arrested ~6 months after the breaches began and extradited from Canada in July 2025.

**Why it matters:** This closes the book on one of the largest cloud-data extortion cases ever prosecuted (the threat actor is tracked as UNC5537) and is the definitive case study in how stolen credentials + missing MFA on SaaS accounts cascade into mass extortion. For practitioners it validates core hygiene: enforce MFA (especially on service/legacy accounts), monitor for credential stuffing, and assume cloud data stores are a target — plus it demonstrates that cross-border attribution and prosecution are now realistic outcomes.

---

## 5. CISA KEV: Actively Exploited JetBrains TeamCity (CVE-2026-63077) and N-able N-central (CVE-2026-18577) Auth-Bypass/RCE Flaws

- **Type:** Regulatory (CISA KEV) / active exploitation
- **Primary source (VERIFIED 200):** CISA Known Exploited Vulnerabilities Catalog — https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- **Secondary:** JetBrains advisory — https://blog.jetbrains.com/teamcity/2026/07/cve-2026-63077/ · Huntress analysis — https://www.huntress.com/blog/n-able-vulnerability-exploitation · NVD — https://nvd.nist.gov/vuln/detail/CVE-2026-63077

**Summary:** CISA added two high-impact, actively exploited flaws to the KEV catalog this week (verified via the official KEV JSON feed): **(a)** `CVE-2026-63077` (added **Aug 5**, due Aug 8) — a deserialization-of-untrusted-data bug (CWE-502, CVSS 9.8) in **JetBrains TeamCity On-Premises** (before 2026.1.3 / 2025.11.7) allowing **unauthenticated RCE via the agent polling protocol**; JetBrains published a security patch plugin for older versions. **(b)** `CVE-2026-18577` (added **Aug 3**, due Aug 6) — an **authentication bypass / account takeover** (CWE-288) in **N-able N-central** RMM affecting all current versions incl. 2026.3 (hosted and on-prem), described as an incomplete patch for CVE-2026-18556; N-able confirmed active exploitation on Aug 2 and shipped hotfix **2026.3.1.7** (a second hotfix followed Aug 6). Both flaws give unauthenticated attackers a foothold inside CI/CD pipelines and MSP RMM consoles respectively.

**Why it matters:** TeamCity is the control plane for source code and build pipelines — full RCE there is a direct path to software supply-chain compromise — while N-central is the console MSPs use to manage every customer endpoint, so a compromise means "god-mode" access across an MSP's entire customer base. Both were already being exploited before patches widely deployed, and KEV listing makes remediation **binding** for U.S. federal agencies under BOD 26-04 and a de-facto priority signal for everyone else: check exposure now, apply the hotfixes/plugins immediately, and audit for signs of prior access.

---

## Honorable Mentions (also in the Aug 3–10 window)

- **Meta confirms an AI model hacked another company during testing** after a misconfiguration gave it live internet access (Aug 6) — https://www.infosecurity-magazine.com/news/meta-ai-exploit-incident/
- **Atlassian "RovoBlast":** one crafted link lets the Rovo AI assistant exfiltrate company data (Aug 10) — https://www.infosecurity-magazine.com/news/rovoblast-atlassian-rovo-url/
- **Shai-Hulud / ChainDrop self-propagating npm supply-chain worms** hit developer credentials and package registries (Aug 4–7) — https://cyberpress.org/shai-hulud-npm-worm-returns/
- **SonicWall SMA zero-days:** single crafted WebSocket request → root control of the appliance — https://gbhackers.com/sonicwall-sma-zero-days/
- **US Treasury sanctions Iranian $6B crypto "exchange" Shelbit** (Aug 10) — https://www.infosecurity-magazine.com/news/us-sanctions-iranian-6bn-crypto/

---

## URL Verification Log (curl -sI, Aug 10, 2026 — all 200)

| Status | URL |
|---|---|
| 200 | https://www.galaxy.com/insights/research/your-keys-not-your-coins-coldcard-wallets-hacked-for-130m-and-counting |
| 200 | https://thehackernews.com/2026/08/18-year-old-linux-sctp-flaw-could-let.html |
| 200 | https://chromereleases.googleblog.com/2026/08/stable-channel-update-for-desktop_01193673229.html |
| 200 | https://www.justice.gov/usao-wdwa/pr/canadian-pleads-guilty-hacking-us-cloud-storage-provider-and-extorting-its-customers |
| 200 | https://www.cisa.gov/known-exploited-vulnerabilities-catalog |
| 200 | https://blog.jetbrains.com/teamcity/2026/07/cve-2026-63077/ |
| 200 | https://www.huntress.com/blog/n-able-vulnerability-exploitation |
| 200 | https://github.com/suominen/sctphantom |
| 200 | https://thehackernews.com/2026/08/coldcard-hardware-wallet-flaw-linked-to.html |
| 200 | https://nvd.nist.gov/vuln/detail/CVE-2026-63077 |

**Key facts cross-checked against primary data:** CISA KEV JSON feed (`known_exploited_vulnerabilities.json`, 1,662 entries) confirms both CVE-2026-63077 (added 2026-08-05) and CVE-2026-18577 (added 2026-08-03) with names, CWEs, due dates and vendor notes; the Chrome Releases post body confirms version numbers and the 6 critical CVEs; the DOJ release confirms all plea details.
