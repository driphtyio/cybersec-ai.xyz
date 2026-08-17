---
title: "Metabase Security Vulnerability Patch: CVE-2026-72898 Guide"
description: "Metabase security vulnerability patch guidance for defenders: what the critical flaw does, which versions are safe, plus this week's top CVEs and a checklist."
pubDate: 2026-08-17
tags: ["news-roundup", "cve", "metabase", "patch-tuesday", "patch-management", "vpn-security"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/2026-08-17-news-roundup-1786995685.webp"
lastVerified: 2026-08-17
---

This week’s threat picture revolved around exposed services — and no flaw was more urgent than the **Metabase security vulnerability patch** required to close CVE-2026-72898, a CVSS 10.0 SQL injection already exploited in the wild. For context on earlier developments, see [last week's roundup](/blog/2026-08-10-news-roundup/).

## How This Was Verified

All findings are based on official vendor advisories and primary reporting from trusted sources including the Metabase official blog, Tenable, SecurityAffairs, SecurityWeek, Dutch NCSC, and the Cisco advisory. Dates, CVSS scores, affected versions, patch releases, and KEV statuses were confirmed through direct HTTP 200 checks on every source URL on August 17, 2026. Exploit impact, attribution claims, and breach counts were not independently verified in a lab or reproduced. Last verified: August 2026.

## Metabase CVE-2026-72898: CVSS 10 SQL Injection, Exploited in the Wild

A critical unauthenticated SQL injection flaw (CVE-2026-72898, CVSS 10.0) was discovered in Metabase Cloud and impacts self-hosted instances running v1.58 and above. The vulnerability allows attackers to bypass authentication and gain full administrative access. Organizations should immediately upgrade to a minimum safe release: 0.58.24, 0.59.21, 0.60.17, 0.61.11, 0.62.9, or 0.63.5. For more context, read our detailed analysis from August 15 [here](/blog/2026-08-15-cve-analysis/).

The flaw lies in how Metabase handles password reset requests at `POST /api/session/reset_password`. Attackers exploited this endpoint to inject malicious SQL queries, leading to unauthorized access. Once inside, they could extract connected database credentials, export sensitive data, and escalate privileges to admin level. CISA added CVE-2026-72898 to its Known Exploited Vulnerabilities (KEV) catalog on August 11, 2026. TechTimes reported that at least five companies had already been breached due to this vulnerability. [Metabase Security Update](https://www.metabase.com/blog/security-update)

## Microsoft Patch Tuesday: 398 CVEs, One Zero-Day Exploited

Microsoft's August 2026 Patch Tuesday addressed 398 vulnerabilities across its product suite, with 42 rated critical, 355 important, and one moderate. Among them, CVE-2026-68820 stands out as a zero-day exploit linked to North Korean threat actors targeting the Windows Ancillary Function Driver for WinSock (`afd.sys`). Administrators must apply updates promptly, especially for CVE-2026-62878 — a wormable DNS remote code execution flaw requiring urgent remediation. [Tenable Blog](https://www.tenable.com/blog/microsofts-august-2026-patch-tuesday-addresses-398-cves-cve-2026-68820) [SecurityAffairs](https://securityaffairs.com/197048/security/microsoft-patch-tuesday-for-august-2026-fixed-a-zero-day-and-wormable-rce.html)

Of the three zero-days disclosed, only CVE-2026-68820 has been confirmed as actively exploited. This local privilege escalation bug grants SYSTEM-level access upon successful exploitation. Meanwhile, CVE-2026-62878 enables wormable behavior over DNS, posing a severe risk to network infrastructure if left unpatched.

## SAP Commerce Cloud CVE-2026-58231: CVSS 10, Patches Out

SAP released patches on August 11, 2026, for CVE-2026-58231 — a CVSS 10.0 flaw allowing arbitrary code execution via insufficient authorization checks and input validation failures. Despite its high severity score, the vulnerability has not yet been included in CISA’s KEV list. Defenders should monitor for signs of exploitation, particularly following reports of early attack attempts observed on August 14. [SecurityWeek](https://www.securityweek.com/critical-sap-commerce-cloud-vulnerability-exploited-3-days-after-disclosure/)

Initial exploitation attempts were detected just days after disclosure, though no public proof-of-concept surfaced until August 15. Organizations using SAP Commerce Cloud must validate inputs rigorously and implement compensating controls where possible pending full deployment of official patches.

## macOS Screen Sharing CVE-2026-65400: Root Access via Port 5900

Apple fixed CVE-2026-65400, an authentication bypass affecting macOS Screen Sharing, in updates released August 6, 2026. Systems running macOS Tahoe 26.6.1, Sequoia 15.7.9, or Sonoma 14.8.9 are protected. Researchers estimate nearly 40,000 macOS devices expose Screen Sharing services publicly, primarily through port 5900, increasing exposure to opportunistic attacks. [SecurityWeek macOS Report](https://www.securityweek.com/recent-macos-screen-sharing-vulnerability-exploited-in-attacks/) [Dutch NCSC Advisory ncsc-2026-0280](https://advisories.ncsc.nl/2026/ncsc-2026-0280.html)

Malicious actors have leveraged this flaw to gain root-level access remotely, subsequently deploying cryptocurrency miners such as Monero. Network administrators are advised to disable Screen Sharing or restrict traffic on port 5900 to mitigate risks.

## Cisco ASA/FTD CVE-2026-20349: VPN DoS on the KEV List

Cisco disclosed CVE-2026-20349, a CVSS 8.6 vulnerability affecting SSL VPN services on Adaptive Security Appliance (ASA) and Firepower Threat Defense (FTD) platforms. An unauthenticated attacker can trigger a denial-of-service condition by reloading the device remotely. The flaw has already been added to CISA’s KEV list, underscoring its active exploitation potential. [Cisco Security Advisory](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-vpn-dos-dzv4mQFF)

Organizations relying on Cisco SSL VPN infrastructure must review the advisory carefully and apply remediation steps accordingly. Until patches are fully deployed, consider limiting access to affected endpoints via network segmentation or firewall rules.

## Honorable Mentions

Other notable security events from the past week include vulnerabilities in VMware and Microsoft products, supply chain compromises, and data breaches impacting millions globally.

- **VMware vCenter CVE-2026-59309** — CVSS 9.8 unauthenticated Directory Service bypass, "in attackers' crosshairs".
- **Microsoft SharePoint CVE-2026-55040** — exploited shortly after PoC release.
- **Progress Kemp LoadMaster CVE-2026-8037** — added to KEV after **792 exploit attempts**.
- **TrueConf supply-chain breach** — client installers trojanized with **PhantomCore / PhantomGraph** backdoors.
- **RingCentral breach** — ~**1.6M** impacted.
- **French tax authority breach** — **680,000** impacted.

## Defender Checklist: What to Do This Week

Security teams must prioritize immediate action on several fronts, beginning with patching known exploited vulnerabilities and auditing logs for signs of compromise. Review your asset inventory against the latest advisories and ensure all systems align with current best practices outlined in our [frameworks](/frameworks/) repository. Use automated scanning tools like those documented under [scan hub](/scan/) to identify misconfigurations and exposures across your environment.

1. **Patch Metabase now** — upgrade to a minimum safe release (0.58.24, 0.59.21, 0.60.17, 0.61.11, 0.62.9, or 0.63.5, depending on your line).
2. **Hunt for the Metabase attack signature in logs** — `reset_password` returning 400 followed by `GET /api/user/current` returning 200; on a match, assume compromise: rotate all connected database credentials, revoke admin sessions, export an audit trail.
3. **Apply Microsoft August Patch Tuesday updates**, prioritizing **CVE-2026-68820** (afd.sys EoP) and the wormable DNS RCE **CVE-2026-62878**.
4. **Harden macOS Screen Sharing** — patch to Tahoe 26.6.1 / Sequoia 15.7.9 / Sonoma 14.8.9 and close or firewall **port 5900**.
5. **Update Cisco ASA/FTD** per the Cisco advisory to close the SSL VPN DoS **CVE-2026-20349** (no fixed version number exists in the verified facts — do not invent one).
6. **Apply SAP Commerce Cloud patches for CVE-2026-58231** — treat any internet-reachable Commerce Cloud as exposed (it is NOT yet in CISA KEV, so your own patching cadence is the only control).

## FAQ

### What is CVE-2026-72898?

CVE-2026-72898 refers to a critical unauthenticated SQL injection vulnerability found in Metabase, affecting both cloud-hosted and self-hosted deployments starting from version 1.58 onwards. With a maximum CVSS score of 10.0, it permits full administrative access without authentication. Explore related entries in our [CVE database](/cves/) directory for ongoing tracking and mitigation strategies.

### Which Metabase versions are safe to use?

To protect against CVE-2026-72898, upgrade to one of these minimum safe releases depending on your current line: 0.58.24, 0.59.21, 0.60.17, 0.61.11, 0.62.9, or 0.63.5. These versions contain the necessary fixes to block the SQL injection vector used in active exploitation campaigns.

### How do I know if my Metabase was exploited?

Check server logs for a suspicious sequence involving `reset_password` returning HTTP 400 followed by `GET /api/user/current` returning HTTP 200. This pattern indicates unauthorized access attempts leveraging the vulnerability. If detected, assume compromise and initiate incident response procedures immediately.

## How Do I Patch the Metabase Security Vulnerability (CVE-2026-72898)?

Upgrade to the appropriate minimum safe release based on your current Metabase version: 0.58.24, 0.59.21, 0.60.17, 0.61.11, 0.62.9, or 0.63.5. Ensure backups are taken before applying updates, and audit logs post-patch for any lingering signs of compromise.
