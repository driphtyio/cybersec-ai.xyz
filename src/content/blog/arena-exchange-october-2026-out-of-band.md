---
title: "Out-of-Band Exchange Update October 2026: What CVE-2026-96940 Means for Your Servers"
description: "Microsoft's early Exchange fix closes an authenticated privilege flaw; this guide maps patch paths, support limits, and a rollout plan for admins."
pubDate: 2026-10-05
tags: ["Exchange Server", "Patch Tuesday", "CVE Analysis", "Microsoft Security"]
lastVerified: "2026-10-05"
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/arena-exchange-october-2026-out-of-band-1791238817.webp"
---

Microsoft released an out-of-band Exchange Server security update on October 2, 2026—11 days before October Patch Tuesday on October 13—to fix [CVE-2026-96940](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940), an Important authenticated elevation-of-privilege vulnerability. The version 2 installers cover Subscription Edition, Exchange 2019, and Exchange 2016 paths, while the risk signals require care: Microsoft says exploitation is “More Likely,” but [EPSS](https://api.first.org/data/v1/epss?cve=CVE-2026-96940) is 0.00496 and the [October 2 MSRC revision](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940) records `exploited: No` and `publicly disclosed: No`.

## How This Guide Was Built

This guide cross-checks the [MSRC vulnerability record](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940), the [Security Update Guide](https://msrc.microsoft.com/update-guide/en-US), the [Exchange team update](https://techcommunity.microsoft.com/blog/exchange/released-september-2026-v2-exchange-server-security-updates/4561718), and the [EPSS record](https://api.first.org/data/v1/epss?cve=CVE-2026-96940). Desk research from official Microsoft sources (MSRC APIs, KB pages, Exchange team blog) plus EPSS, fetched 2026-10-05 — no Exchange server was installed, no update was run, no lab testing was performed.

## What Changed in the October 2026 Release

Microsoft’s October release was an out-of-band Exchange Server update dated October 2, 11 days before Patch Tuesday, and it added exactly one new Microsoft CVE while repackaging September fixes as version 2 for affected on-premises products ([MSRC October guide](https://msrc.microsoft.com/update-guide/en-US), [Exchange team blog](https://techcommunity.microsoft.com/blog/exchange/released-september-2026-v2-exchange-server-security-updates/4561718)).

Microsoft calls the release "October 2026 Early Security Updates": the MSRC record carries an `InitialReleaseDate` of `2026-10-02T07:00:00Z`, version `1.0`, and a single revision. The Exchange team's second-version announcement is dated September, but it is the release note the updated KB pages themselves point to for the ESU rules, cumulative-SU guidance, hybrid caveats, and known-issues list covering this October 2, 2026 revision.

Patch Tuesday falls on `2026-10-13`. As of October 5, the MSRC Security Update Guide's `2026-Oct` bucket contained 106 CVE entries ([SUG](https://msrc.microsoft.com/update-guide/en-US)), including the Azure Linux and open-source backlog published October 1–3. The Exchange issue was the only new Microsoft-server CVE dated October 2 in that bucket.

[WindowsReport](https://windowsreport.com/microsoft-warns-exchange-admins-to-patch-critical-flaw-immediately/) reported that Microsoft issued the second version of the September Exchange updates specifically to address CVE-2026-96940 — noting it should be installed immediately, particularly on internet-facing servers — with the flaw stemming from weak authorization controls. The Microsoft severity rating itself is [Important](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940), not the Critical tier some third-party headlines use.

## CVE-2026-96940 Risk and Reach

CVE-2026-96940 is an Important elevation-of-privilege vulnerability — Microsoft's advisory describes weak authorization and tags it [CWE-1390, Weak Authentication](https://cwe.mitre.org/data/definitions/1390.html) — with an 8.8 base score and 7.7 temporal score ([MSRC](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940), [CVE record](https://www.cve.org/CVERecord?id=CVE-2026-96940)). It is reachable over the network, needs low privileges (a valid account) and no user interaction, and rates confidentiality, integrity, and availability high.

The exact vector is:

`CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H/E:U/RL:O/RC:C`

MSRC maps the flaw to [CWE-1390, Weak Authentication](https://cwe.mitre.org/data/definitions/1390.html); Microsoft is the CNA, customer action is required, and the advisory's "Exploitation More Likely" assessment governs patch priority. The C/I/H ratings describe the worst case for this authorization class; the FAQ below quotes the concrete impact.

The October 2 revision records publicly disclosed as No and exploited as No; that status does not override the "Exploitation More Likely" assessment — it is a point-in-time disclosure posture, not a patch-priority downgrade.

EPSS records a score of 0.00496—approximately 0.5%—and a percentile of 0.4038 on October 5 [EPSS](https://api.first.org/data/v1/epss?cve=CVE-2026-96940) — a baseline result, not elevated. Pair it with Microsoft's threat assessment: apply the update promptly, and claim neither source as proof of exploitation.

## Patch Matrix: Four Fixed Build Paths

The verified October packages provide one fixed build for each listed Exchange Server path: match product and cumulative update before downloading rather than assuming a similarly named installer applies on a given server ([Subscription Edition KB](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129955), [Exchange 2019 CU15 KB](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956)).

| Product | Security update | Fixed build |
|---|---|---|
| Exchange Server Subscription Edition RTM (x64) | [KB5129955](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129955) | `15.02.2562.053` |
| Exchange Server 2019 CU15 (x64) | [KB5129956](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956) | `15.02.1748.053` |
| Exchange Server 2019 CU14 (x64) | [KB5129957](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129957) | `15.02.1544.048` |
| Exchange Server 2016 CU23 (x64) | [KB5129958](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129958) | `15.01.2507.075` |

The [official Microsoft download page](https://www.microsoft.com/en-us/download/details.aspx?id=108855) identifies the Subscription Edition payload as `Microsoft Exchange Server Subscription Edition RTM SU10V2`, with the filename `ExchangeSubscriptionEdition-KB5129955-x64-en.exe`. The KB page publishes SHA-256 `40B3825435C072298896563DA623E288F79A9B913E2B674FFC7CA4A38547857F`; confirm the hash of your downloaded installer against that published value before running it.

KB5129955 replaces the August 11, 2026 Subscription Edition update, KB5121573. [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/Search.aspx?q=KB5129955) metadata lists KB5129955 at 341.4 MB (358,034,749 bytes), dated October 1; September's [KB5121608](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5121608) was 341.4 MB (358,002,837 bytes), dated September 8.

## What the Version 2 Packages Cover

Each version 2 security update carries CVE-2026-96940 plus the two remote-code-execution issues fixed in September; across all four product paths the packages are cumulative, not single-CVE patches, so one installer per product decides the whole CVE set at once ([KB5129955](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129955), [KB5129956](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956), [KB5129957](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129957), [KB5129958](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129958)).

| CVE | Type | CVSS | Note |
|---|---|---|---|
| `CVE-2026-96940` | Elevation of privilege; weak authorization per the advisory, tagged `CWE-1390` Weak Authentication | 8.8 base; 7.7 temporal | Released October 2; Important; exploitation assessed More Likely |
| `CVE-2026-55007` | Double free (`CWE-415`); unauthenticated RCE | 8.1 base; 7.1 temporal | Released September 8; `AV:N/AC:H/PR:N/UI:N`; exploitation assessed Less Likely |
| `CVE-2026-69355` | External control of file name or path (`CWE-73`); RCE | 8.8 base; 7.7 temporal | Released September 8; `AV:N/AC:L/PR:L/UI:N`; exploitation assessed Less Likely |

The September issues were already fixed in the earlier package; version 2 adds the October elevation-of-privilege flaw, so all three must be considered when assessing whether an Exchange server has received the current security update.

The comparison also prevents a common triage error: the new CVE is an authenticated privilege-escalation issue, while the two earlier entries are unauthenticated remote-code-execution issues with different weaknesses and prerequisites — one installer does not make their attack paths equivalent.

## Admin Action Checklist

An effective Exchange response starts with an inventory, support and ESU checks, the correct cumulative update, installation on every relevant server, a reboot, and fixed-build verification; hybrid deployments must include management-only servers ([Health Checker tools](https://microsoft.github.io/CSS-Exchange/), [Exchange 2019 guidance](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956)) in the same pass.

- **Inventory every server.** Use the Exchange Server Health Checker script from [CSS-Exchange](https://microsoft.github.io/CSS-Exchange/) to record each server’s product, cumulative update, and installed build.
- **Confirm support status.** Determine whether the deployment is covered by current product support or Period 2 ESU before selecting an update path.
- **Match the exact KB.** Compare the installed product and cumulative update with the four-row matrix rather than relying on the installer's general name.
- **Install only the latest supported SU.** Security updates are cumulative; if the cumulative update is supported, Microsoft says to install only its latest security update.
- **Validate the Subscription Edition payload.** Confirm the package name, executable filename, and published SHA-256 before installation.
- **Follow the Exchange Update Wizard.** Use its directions for the selected topology and cumulative-update path.
- **Cover hybrid deployments.** Install the update on all Exchange servers, including machines used only for management.
- **Reboot after setup.** Treat the reboot as part of completing the documented installation process.
- **Use SetupAssist for errors.** If setup fails, follow Microsoft’s SetupAssist troubleshooting process.
- **Verify the fixed build.** Compare the installed build with the exact value in the matrix.
- **Review the authentication certificate.** If its configuration changes after installing the security update, rerun the Hybrid Configuration Wizard. Then record any server that cannot be updated, with the next action to bring it onto a supported path.

## ESU Deadline: End of October 2026

Exchange Server 2016 and Exchange Server 2019 are out of support; only Period 2 Extended Security Update enrollees receive their security updates during the May-through-October 2026 Period 2 window, and that window closes at the end of this month ([KB5129956 ESU guidance](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956)).

KB5129956 states that Exchange Server 2019 ESU enrollees receive released security updates until the end of October 2026, and the Exchange team's announcement applies the same May-through-October 2026 eligibility frame to both Exchange 2016 and Exchange 2019 Period 2 enrollees ([Exchange team blog](https://techcommunity.microsoft.com/blog/exchange/released-september-2026-v2-exchange-server-security-updates/4561718)) — the documented window closes at the end of this month.

Organizations not enrolled in Period 2 ESU must migrate to Exchange Server SE; treat any Exchange 2016 or Exchange 2019 deployment as a migration project. Install the applicable update now if entitled, then use the remaining ESU period to complete the migration rather than deferring both decisions until the deadline.

## Known Issues and Cumulative Behavior

The current security updates have two disclosed operational issues, both to be resolved in a future update ([KB5129955](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129955), [KB5129956](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956)): the published calendar `.ics` can return HTTP 500 in calendar applications, and missing Korean WordBreaker rule files can deadlock ContentEngine in Korean-language email scenarios.

Administrators should record both issues in a rollout plan: Microsoft's published resolution is a future update, with no replacement build or permanent workaround listed.

The security updates are cumulative: if an organization’s cumulative update is supported, Microsoft’s instruction is to install only the latest security update for that path. The fixed-build check remains necessary because “latest installed” and “required fixed build” should be verified from the server itself.

## Detection and Defense in Depth

Defense in depth starts by finding every unpatched Exchange server, then adds identity and mailbox-access review, because Microsoft says successful exploitation can expose other users' mailboxes within the same organization under this flaw ([MSRC FAQ](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940)); neither step replaces the update itself.

Start with configuration exposure rather than compromise claims. Compare inventory output with the fixed-build matrix to identify servers that still require patching. A build below the target confirms a patch gap, not compromise; a matching build confirms the update state, not that exploitation never occurred.

Behavioral review should follow Microsoft's stated impact. Correlate authentication and mailbox-access records for unexpected activity — for on-prem Exchange, that means reviewing server-side mailbox audit logging (mailbox audit log `Logon`/`MailboxLogin`-class actions) corroborated by IIS logs on the Client Access role — and investigate apparent access to other users' mailboxes, retaining the same-organization boundary when defining the incident scope. Treat anomalies as investigation inputs rather than automatic proof of this CVE.

The October 2 "exploited: No / publicly disclosed: No" status is historical, not a guarantee for later activity — Microsoft's "Exploitation More Likely" assessment supports prioritizing the patch.

Account defenses such as [Phishing-Resistant MFA: Entra Passkeys and Okta FastPass](/blog/phishing-resistant-mfa-entra-passkeys-okta-fastpass/) can form part of a broader identity program, but Microsoft's cited documentation does not present phishing-resistant MFA as a substitute for installing this security update. Preserve the inventory, selected KB, package identity, installation result, and verified build as patch evidence.

## The Bottom Line

The October 2026 out-of-band release is the required fix for every affected, supported on-premises Exchange server because it closes an authenticated path to other mailboxes in the same organization, including hybrid deployments with management-only machines ([MSRC impact statement](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940)).

The Bottom Line: inventory all Exchange servers, select the matching KB, install the latest cumulative security update, reboot, and verify the fixed build. Do not wait for the October 13 Patch Tuesday date—the out-of-band package was already released on October 2. Then confirm Period 2 ESU entitlement for any Exchange 2016 or 2019 machine immediately, because the documented update window closes at the end of this month; organizations outside it must migrate to Exchange Server SE ([Exchange team blog](https://techcommunity.microsoft.com/blog/exchange/released-september-2026-v2-exchange-server-security-updates/4561718)).

Exchange Online requires no customer action (Microsoft deployed the related service-side fix); the matrix applies to on-premises servers, including management-only machines in hybrid environments. Clear documentation and verifiable build evidence support the operational credibility discussed in [Your Security Posture Is Costing You Enterprise Deals](/blog/your-security-posture-is-costing-you-deals/).

## FAQ

This FAQ consolidates the deployment scope, customer-action boundary, and support deadline for CVE-2026-96940 from Microsoft's published October documentation; each answer is self-contained, so a reader can act from any single question without scanning the full guide ([MSRC record](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940), [KB5129956](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956)).

### What does CVE-2026-96940 allow an attacker to do?

Microsoft’s [MSRC FAQ](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940) states: “An authenticated attacker who successfully exploited this vulnerability could gain unauthorized access to other users' mailboxes within the same organization and read email messages and attachments. The vulnerability does not allow access across tenant boundaries.” Keep the investigation scope inside one organization: messages and attachments in other users’ mailboxes matter; cross-tenant access does not.

### Does Exchange Online require the same installation action?

No customer action is required for Exchange Online because Microsoft has already deployed the related service-side fix. The installation instructions apply to on-premises Exchange Server, and hybrid organizations must install the security updates on all Exchange servers, including management-only machines ([MSRC FAQ](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96940)).

### Who is eligible for the October security updates?

Exchange Server 2016 and Exchange Server 2019 are out of support. Only Period 2 ESU enrollees receive security updates during the May-through-October 2026 window, and [KB5129956](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956) states that 2019 enrollees receive released updates through the end of October; non-enrolled organizations must migrate to Exchange Server SE.

### Which servers and build should administrators patch first?

Treat every affected on-premises Exchange server as in scope, including hybrid management-only machines. Inventory the installed product and cumulative update, choose the matching KB, install only the latest supported security update, reboot after setup, and verify the fixed build from the matrix ([KB5129955](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129955), [KB5129956](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129956), [KB5129957](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129957), [KB5129958](https://support.microsoft.com/en-us/servicing/exchange/server/update/2026/5129958)).
