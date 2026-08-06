---
title: "Black Hat 2026: Three Critical CVEs Hit"
description: "Black Hat 2026 critical vulnerabilities — triage the TP-Link, SonicWall, and Adobe flaws that dropped this week, plus what defenders must prioritize now."
pubDate: 2026-08-03
tags: ["black-hat-2026", "cve", "vulnerabilities", "patch-management"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/2026-08-03-news-roundup-1785792885.webp"
lastVerified: 2026-08-03
---

The **Black Hat 2026 critical vulnerabilities** are here: three independently dangerous flaws — in TP-Link, SonicWall, and Adobe products — dropped in the same week as the conference, forcing defenders to triage a patch-priority crisis while traveling. Each is exploitable remotely, and one chain is already being used in the wild. Here's what you need to patch first.

## How This Was Verified

This roundup was verified against primary vendor advisories from TP-Link, SonicWall, and Adobe, plus technical analyses from Positive Technologies, Resecurity, Volexity, and CyberPress. CVE IDs, CVSS scores, publication dates, and affected versions were cross-checked against each source. Exploitation scope and attacker attribution are reported as claimed by researchers, not independently confirmed. Last verified: August 2026.

## TP-Link TL-WR940N: Stack Overflow in RTSP Module

The TP-Link TL-WR940N vulnerability is a stack-based buffer overflow in the router's RTSP connection-tracking module, rated CVSS 8.7 High, affecting hardware version v6 only. [TP-Link's official advisory](https://www.tp-link.com/us/support/faq/5213/) and [Positive Technologies' disclosure](https://dbugs.ptsecurity.com/vulnerability/PT-2026-65866) confirm that a LAN client connecting to a malicious RTSP server triggers memory corruption in the kernel.

This flaw allows unauthenticated remote code execution or denial-of-service, letting an attacker compromise the router, intercept traffic, or deploy persistent malware. The fix is firmware version (EN)_V6_260528(EN), (US)_V6_260528(US), or (JP)_V6_260527(JP), depending on your region. Reporter Ryo Shimada of Powder Keg Technologies found the bug, which requires no authentication but does require user interaction to connect to a malicious server.

## SonicWall SMA 1000: Zero-Day Chain Exploited in the Wild

The SonicWall SMA 1000 zero-day chain consists of CVE-2026-15409 (CVSS 10.0) and CVE-2026-15410, which together allow unauthenticated root access and are already being exploited in the wild. [GBHackers' technical analysis](https://gbhackers.com/sonicwall-sma-zero-days/) and [Resecurity's research](https://www.resecurity.com/blog/article/from-wsproxy-to-root-inc-ransomware-and-sonicwall-sma-exploit-chain) detail how one crafted request to the /wsproxy WebSocket proxy opens a tunnel to localhost-only services.

The attack chain escalates from Erlang RPC to code execution as the couchdb user, then uses a path traversal in the hotfix-removal workflow to reach root. Threat actor UTA0533, documented by Volexity, has used this chain to harvest LDAP credentials and deploy custom malware like KnuckleBall and OrangeTail. SonicWall has released patches for SMA 1000 appliances — apply them immediately if you haven't already.

## Adobe Campaign Classic: CVSS 10.0 RCE

The Adobe Campaign Classic flaw is CVE-2026-48449, a CVSS 10.0 Incorrect Authorization vulnerability (CWE-863) that is network-exploitable with no authentication or user interaction required, plus a companion SQL Injection CVE-2026-48448. [CyberPress's analysis](https://cyberpress.org/critical-adobe-campaign-classic-flaws/) and Adobe's APSB26-114 bulletin confirm full CIA impact for on-premise instances of Campaign Classic v7, build 7.4.3.9397 and earlier.

The SQL injection allows arbitrary file system reads, and the authorization flaw enables complete compromise. The fix is upgrading to build 7.4.3.9398 immediately. Adobe-hosted instances are already patched server-side, so only self-managed deployments are at risk — check your build number now.

## Black Hat 2026: Why This Week Matters for Defenders

Black Hat 2026 matters because the conference week is precisely when attackers test whether distracted defenders miss critical patches, making proactive triage essential. With three remote-code-execution-class flaws dropping as teams converge on Las Vegas, the usual "patch within 30 days" cadence is too slow. The SonicWall chain is already weaponized, and the Adobe flaw requires zero interaction.

Prioritize by exploitability: patch SonicWall SMA 1000 first, then Adobe Campaign Classic, then TP-Link routers. Use your [security frameworks](/frameworks/) to map these to your asset inventory, and check the [CVE database](/cves/) for any related indicators. For broader context, see our [July 27 AI news roundup](/blog/2026-07-27-ai-news-roundup/) on how automation is changing attack speed.

## Patch Priority Checklist for This Week

Use this checklist to turn the triage guidance into concrete action before attackers do:

1. **Inventory exposure.** Identify every SMA 1000 appliance, on-premise Campaign Classic instance, and TL-WR940N v6 router in your environment. Only devices matching these exact product/build versions are affected.
2. **Patch SonicWall first.** The CVE-2026-15409/CVE-2026-15410 chain is weaponized in the wild by UTA0533, so apply the SMA 1000 firmware updates before any other work.
3. **Upgrade Campaign Classic.** Move self-managed instances from build 7.4.3.9397 or earlier to 7.4.3.9398. Adobe-hosted instances need no action.
4. **Flash TP-Link routers.** Apply the regional firmware build (EN/US/JP V6_26052x) for TL-WR940N v6; note the RTSP flaw requires user interaction but no authentication.
5. **Hunt for indicators.** Check VPN and firewall logs for the /wsproxy WebSocket proxy pattern associated with the SonicWall chain, and verify that no unexpected couchdb-user processes are running.
6. **Re-scan after patching.** Re-run your vulnerability scanner against each asset to confirm the CVEs no longer appear before closing the tickets.

## FAQ

### What is the most urgent CVE to patch this week?

The SonicWall SMA 1000 chain (CVE-2026-15409 and CVE-2026-15410) is the most urgent because it's exploited in the wild by UTA0533. It allows unauthenticated root access via a single request. Patch these appliances before anything else, as attackers are actively targeting them.

### Which TP-Link router models are affected by CVE-2026-12935?

Only the TP-Link TL-WR940N hardware version v6 is affected by CVE-2026-12935, a stack overflow in the RTSP module. Other hardware versions are not vulnerable. Check your router's label for "v6" and apply the firmware update (EN, US, or JP variant) to remediate.

### Does the Adobe Campaign Classic flaw affect cloud-hosted instances?

No, the Adobe Campaign Classic flaws (CVE-2026-48449 and CVE-2026-48448) affect only on-premise deployments of build 7.4.3.9397 and earlier. Adobe-hosted instances were patched server-side. If you self-manage, upgrade to build 7.4.3.9398 immediately to close both vulnerabilities.

### How long does it take to patch an SMA 1000 appliance?

The SMA 1000 firmware update typically takes under 30 minutes per appliance, including download, install, and reboot. For large fleets, stage the rollout so the highest-value gateways — internet-facing and VPN endpoints — are patched first, then schedule the remainder during the next maintenance window.
