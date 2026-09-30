---
title: "Suricata 8 Review 2026: Is It Still Worth the Upgrade?"
description: "Suricata remains a capable open-source intrusion detection and prevention engine; this review weighs its features, security record, and migration costs."
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/suricata-8-review-2026-1790790583.webp"
pubDate: "2026-09-30"
tags: ["suricata", "ids", "ips", "network security", "zeek", "snort"]
lastVerified: "2026-09-30"
---

## What Is Suricata 8, and What It Is Not

Suricata 8 is the current stable release of the open-source network intrusion detection, prevention, and security-monitoring engine maintained by the Open Information Security Foundation, and version 8.0.7, published 2026-09-15, is the latest stable release according to the official GitHub release page.

It is licensed GPL-2.0 and developed by the [OISF](https://oisf.net/), a community-run non-profit; the [public repository](https://github.com/OISF/suricata) shows 6.7k stars, 1.8k forks, 180 watchers, and 19,610 commits as of 2026-09-30, with topics spanning ids, ips, nsm, and threat-hunting. Suricata inspects traffic and emits structured [EVE JSON output](https://docs.suricata.io/en/latest/output/eve/eve-json-format.html) — alert, http, dns, tls, flow, fileinfo, and anomaly events — correlated by flow_id since 2014.

What it is not: not a SIEM, because it does not store or correlate events across an enterprise; not an endpoint agent, because it sees network traffic rather than host processes; and not a full packet-capture appliance, because it records metadata and extracted files but is not a retention platform. [NIST SP 800-94](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-94.pdf), the canonical [guide to IDPS design and selection](https://www.nist.gov/publications/guide-intrusion-detection-and-prevention-systems-idps), frames exactly this kind of tool as one layer in a defense-in-depth design. Suricata's job is the wire.

## The 2026 Deadline: Suricata 7 Is End of Life

Suricata 7 is end of life because 7.0.17, released 2026-07-09, is the final release in the series, and the official OISF announcement tells users to upgrade to 8.0, making the migration a security-relevant deadline rather than a routine refresh for anyone still running the older branch.

The 7 line had a good run: [8.0.0, the first stable release of the new series](https://github.com/OISF/suricata/releases/tag/suricata-8.0.0), arrived in July 2025 after two years of Suricata 7, preceded by one beta and one release candidate. But [7.0.17 is the end of the road](https://github.com/OISF/suricata/releases/tag/suricata-7.0.17) — no further fixes will ship for the 7 series. Notably, 7.0.17 itself was a security release: CVE-2026-57228, rated HIGH, affects 7.0.x and was fixed in that final release. Teams still on 7 are now running an engine with no patch path, which for an IDS/IPS is a compounding risk: the tool that is supposed to detect attacks will itself carry unpatched defects. The upgrade window is not optional; it is a matter of when, not if.

## What's New in Suricata 8: Rust Rewrites, New Parsers, Faster Init

Suricata 8 brings Rust rewrites, new protocol parsers, and faster initialization, and the official 8.0.0 announcement describes detection-engine optimizations, a Rust replacement for LibHTP, and new parsers such as ARP, DoH, LDAP, mDNS, POP3, and Websocket for the 8.0 series.

The Rust migration is the headline. [LibHTP](https://github.com/OISF/libhtp), the HTTP parsing library, has been replaced by a Rust version — joint work by Todd Mortimer of the Canadian Centre for Cyber Security and Philippe Antoine of the Suricata team. FTP, MIME, ENIP, suricatasc, byte_extract, and the base64 decoder were also converted, along with SIP, RFB, and MQTT conversions. The minimum supported Rust version rose to 1.75.0 from 1.63.0 in 7.0, which matters for distributions building from source.

New protocol parsers and loggers include ARP, DNS over HTTPS, LDAP, Multicast DNS, POP3, SDP (parsed within SIP), SIP over TCP, and Websocket. On the detection side, 8.0 adds transactional rules (both directions in a single rule), txbits (xbits scoped to transactions), the `absent` keyword, log/detect parity across LDAP, MIME-email, vlan.id, DNS, SMTP, FTP, and TLS, dataset JSON enrichment, new transforms (from_base64, entropy, luaxform), the `requires` keyword, and richer integer keywords (hex, negated ranges, enumerations, bitmask).

Performance claims in the [8.0.0 announcement](https://forum.suricata.io/t/suricata-8-0-0-released/5854) are directional, not verified: detection-engine optimizations (branch prediction, hash), faster PCAP reading, and faster initialization through port grouping, MPM caching, and IP-insertion. We did not benchmark any of this — see the scope note at the end — so treat these as "the project says it is faster," not as measured fact. The [performance documentation](https://docs.suricata.io/en/latest/performance/index.html) is the right starting point for capacity planning.

## Suricata-as-Firewall Mode: What It Is and Why It Is Still Experimental

Suricata-as-firewall mode is an experimental Suricata 8 feature with a default-drop policy and a deterministic packet pipeline, and the 8.0.0 announcement explicitly labels it EXPERIMENTAL, warning that it may change during the 8.0 lifecycle, so it is not production-ready today.

The idea: a more formalized dialect of the rule language with a deterministic packet pipeline and a default-drop policy, turning Suricata from an alerting engine into an inline enforcement point. Ongoing feature work includes configurable default policies, separate ips/firewall statistics, iprep support in firewall mode, and FTP/NTP hook states. All of that is promising for teams that want a single rule language across detection and enforcement. But the announcement's own wording is the guidance: EXPERIMENTAL, subject to change during the 8.0 lifecycle. We do not recommend it for default-drop production deployments, and neither does the project. If you need a firewall, use a firewall; if you want inline blocking with Suricata, the [mature IPS path](https://docs.suricata.io/en/latest/ips/index.html) is the supported route.

## Rules in Practice: The Real Cost of 51,283 ET Open Alerts

Suricata 8 ships with Suricata-Update, the official rule manager that by default pulls the Emerging Threats Open ruleset, which on 2026-09-30 measured 46,701,916 bytes, 141,590 lines, and 51,283 enabled alert rules with 51,283 unique SIDs, a substantial tuning burden for any team.

[Suricata-Update](https://docs.suricata.io/en/latest/rule-management/suricata-update.html) has been bundled since Suricata 4.1 and, by default, downloads the [ET Open ruleset](https://rules.emergingthreats.net/open/) from Proofpoint Emerging Threats into /var/lib/suricata/rules/suricata.rules. The measured file — [emerging-all.rules](https://rules.emergingthreats.net/open/suricata-7.0.3/emerging-all.rules) — is 46.7 MB of rules text. Every one of those 51,283 SIDs is a potential alert, and most of them will fire on a normal enterprise network within days. Tuning is not optional; it is the job. Expect to spend real time on thresholding, suppression, and disabling rules that do not fit your environment. [ET Pro](https://www.proofpoint.com/us/threat-insight/et-pro-ruleset) is the commercial ruleset for organizations that want curated, paid coverage instead of the community set.

One 8.0 behavior change makes tuning more predictable but also stricter: unknown `requires` conditions are now treated as unmet, meaning the rule is not loaded at all. A typo or a missing dependency silently removes detection coverage, so audit your rule set after upgrade. For downstream analysis, EVE JSON feeds tools like EveBox, Elastic/Kibana, a Splunk app, Scirius CE, and Wazuh — see [our Wazuh review](/blog/wazuh-review/) for how a SIEM layer consumes this kind of alert stream.

## Security Track Record: The 8.0.6 CVE Wave and AI-Assisted Discovery

Suricata 8.0.6, released 2026-07-09, was a security release fixing CVE-2026-57227 (HIGH) and CVE-2026-57228 (HIGH, 7.0.x) among others, and the OISF attributes the higher-than-usual issue volume to AI(-assisted) analysis, with thanks to Trail of Bits in collaboration with Anthropic in the release notes.

The full [8.0.6 set](https://github.com/OISF/suricata/releases/tag/suricata-8.0.6): CVE-2026-57227 (HIGH, affects 8.0.x and 7.0.x), CVE-2026-57229 (MODERATE, 8.0.x), CVE-2026-57224 (MODERATE, 8.0.x), CVE-2026-57222 (MODERATE, 8.0.x and 7.0.x), and CVE-2026-57228 (HIGH, 7.0.x), plus several tickets still pending CVE assignment. The [official announcement](https://suricata.io/2026/07/09/suricata-8-0-6-and-7-0-17-released/) states the higher-than-usual issue volume "reflects a change in vulnerability reporting volume as a result of the rise of AI(-assisted) analysis," and the thanks list includes Trail of Bits in collaboration with Anthropic. Suricata-Update 1.3.8 also shipped with a security fix, and the OISF signing key (2BA9C98CCDF1E93A) has had its expiry refreshed.

The [OISF severity policy](https://github.com/OISF/suricata/security/policy) is worth internalizing: CRITICAL is reserved for Tier-1 features enabled by default with remotely triggerable traffic-based code execution, and HIGH covers Tier-1 defaults where loss of visibility or availability is possible. Nothing in the 8.0.6 wave was rated CRITICAL under that policy. The broader lesson for defenders is double-edged: AI-assisted analysis is finding more vulnerabilities in our tools, which is good for patching velocity but means security teams should expect larger, more frequent CVE batches. For context on how AI is changing the attacker and defender toolchains alike, see our coverage of [securing the AI stack](/blog/securing-the-ai-stack/). Track assignments via [CVE](https://cve.mitre.org/) and [NVD](https://nvd.nist.gov/), and review the [security advisories](https://github.com/OISF/suricata/security/advisories) page for the full history.

## Suricata 8 vs Zeek 9.0 LTS vs Snort 3

Suricata 8, Zeek 9.0 LTS, and Snort 3 are all mature open-source network security tools, but they differ in license, detection model, logging depth, and inline prevention, as the comparison below shows, drawing on each project's official announcements and documentation.

| Evaluation area | Suricata 8.0 | Zeek 9.0 LTS | Snort 3 | 2026 takeaway |
|---|---|---|---|---|
| License and maintainer | GPL-2.0; OISF community non-profit | BSD; Zeek Project | GPL; Cisco/Talos | All three are open source; BSD is the most permissive |
| Primary role | IDS/IPS/NSM engine | Network security monitor | Open-source IPS | Suricata and Snort alert; Zeek observes and logs |
| Detection model / rule language | Suricata rule language with transactional rules, txbits, datasets | Zeek scripting language, scriptable analysis | Snort 3 rule/IPS language | Snort and Suricata are rule-driven; Zeek is script-driven |
| Inline IPS support | Mature IPS mode; firewall mode experimental | Not an inline IPS by design | Inline IPS is the core use case | For inline blocking today, Suricata IPS or Snort 3 |
| Logging and evidence quality | EVE JSON: alert, http, dns, tls, flow, fileinfo, anomaly | Rich, scriptable protocol logs; cluster deployment | Alert-centric with app-id and logging | Zeek wins on log depth; Suricata on correlated alert events |
| Ruleset access and tuning burden | ET Open (51,283 rules) or ET Pro; high tuning burden | No ruleset model; write scripts | Subscriber Ruleset (paid) or Community Ruleset (free) | All three require skilled tuning |
| Deployment complexity | Moderate; AF_PACKET native, PF_RING/Napatech now plugins | Moderate; cluster mode for scale | Moderate | Plugin moves in 8.0 add a step for some capture setups |
| Community and commercial backing | OISF; Stamus Networks, Corelight, Proofpoint | Zeek Project; Corelight heritage | Cisco/Talos | Strong commercial ecosystems around all three |
| Best fit for security analysts | Alert-driven detection and inline prevention | Deep protocol visibility and forensics | Inline IPS with vendor-backed rules | Match the tool to the primary workflow |

[Zeek 9.0 LTS](https://zeek.org/2026/09/introducing-zeek-9/), released 2026-09-17 and building on 8.1 and 8.2, is the forensics-first option: its strength is rich, scriptable protocol logs and cluster deployment. [Snort 3](https://www.snort.org/snort3) from Cisco/Talos is the natural choice for teams already invested in its ecosystem, with the paid Subscriber Ruleset versus the free Community Ruleset. Licensing contrast: Suricata GPL-2.0, Snort GPL, Zeek BSD. Commercial vendors built on Suricata include [Stamus Networks](https://www.stamus-networks.com/), [Corelight](https://corelight.com/), and Proofpoint (the ET rules). If you are also evaluating host-layer coverage, [our Nessus review](/blog/nessus-review-2026/) covers the vulnerability-scanning side of the same workflow.

## Migrating from Suricata 7 to 8: A Practical Checklist

Migrating from Suricata 7 to 8 is a practical checklist of breaking changes documented in the official upgrade notes, covering renamed statistics, new protocol variables, plugin moves, and stricter rule loading behavior that can silently drop rules during startup if unaddressed.

Work through these before you cut over, using the [official 7-to-8 upgrade notes](https://docs.suricata.io/en/suricata-8.0.0/upgrade.html):

- **Statistics rename:** `stats.whitelist` is now `stats.score` in eve.json — update dashboards and parsers.
- **SIP variables:** the new `SIP_PORTS` variable is introduced; SIP handling changes accordingly.
- **SIP counters:** the SIP counter is split into `sip_tcp` and `sip_udp`.
- **DNS logging:** made more consistent; review any DNS-dependent queries.
- **Capture plugins:** PF_RING moved to a plugin; Napatech moved to a plugin — install the plugins explicitly if you use them.
- **Dataset memory:** dataset String length now counts toward memcap — re-check memory budgets.
- **Lua detection:** Lua detection scripts are now sandboxed — test custom scripts.
- **Rule gating:** unknown `requires` is treated as unmet, so the rule is not loaded — audit rule coverage after upgrade.

The docs "latest" branch currently reads 9.0.0-dev, which is unreleased development material — do not treat it as the 8.0 documentation. Pin your reading to the 8.0.0 docs until 9.0 ships.

## FAQ

These are the questions security analysts ask most often about Suricata 8 in 2026, answered directly from the official release notes, the project documentation, and the measured ruleset data gathered for this desk-research review rather than from hands-on testing or lab work.

### Is Suricata 8 still free and open source in 2026?

Yes. Suricata is licensed GPL-2.0 and maintained by the OISF, a community-run non-profit; the repository and [release artifacts](https://suricata.io/download/) are public, with source tarballs and Windows MSI installers published for each stable release.

### Which Suricata version should a new deployment use in 2026?

Use 8.0.7, the latest stable release, published 2026-09-15. Do not start new deployments on 7.0.17 — it is the final 7-series release and the line is end of life.

### Can Suricata 8 replace my firewall?

No. Suricata-as-firewall mode is EXPERIMENTAL per the 8.0.0 announcement and may change during the 8.0 lifecycle; it is not production-ready. Use Suricata's mature IPS mode for inline blocking, and keep a dedicated firewall at the perimeter.

### How much tuning does ET Open require?

A lot. The measured ET Open ruleset carries 51,283 enabled alert rules and 51,283 unique SIDs; plan for thresholding, suppression, and environment-specific disables. ET Pro is the paid alternative for curated coverage.

### Suricata 8 or Zeek 9.0 LTS for network forensics?

For deep, scriptable protocol logs and cluster-scale forensics, [Zeek 9.0 LTS](https://zeek.org/) is the stronger fit. For alert-driven detection with correlated EVE JSON events and inline prevention, Suricata 8 is the better choice. Many teams run both.

## The Bottom Line

The bottom line is that Suricata 8 is worth the upgrade for anyone still on Suricata 7, because 7.0.17 is the final 7-series release and the line is end of life, while 8.0.7 is the current stable release carrying the 8.0.6 security fixes, per the official OISF release announcements.

Stay on 8.0.x and move to 8.0.7 if you have not already. Wait on the firewall mode: it is experimental, and the announcement says so. Look elsewhere if your primary need is deep protocol forensics (Zeek 9.0 LTS) or you are already standardized on Cisco's ecosystem (Snort 3). Suricata 8 remains a capable, well-maintained, GPL-2.0 open-source engine — worth the upgrade, with eyes open on the tuning burden.

## How This Guide Was Built

This guide was built as desk research on official documentation, release notes, the public repository and its metadata, and published CVE entries, measured on 2026-09-30, with no hands-on deployment, load testing, lab traffic, or rule-tuning session performed at any point.

Performance changes are reported as directional claims from the project's own announcements, not verified measurements. Rule counts and file sizes for ET Open were measured directly from the published ruleset on 2026-09-30. CVE severities are stated per the OISF's own severity policy and release notes. Community vitality note: [SuriCon 2026](https://suricon.net/) is scheduled for Lisbon in November 2026, a reasonable signal of the project's ongoing momentum.

<!-- crosslinks -->

## 📖 Related Reads

- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides
- **[CodeIntel Log](https://codeintel.xyz/)** — code quality, debugging, and software engineering benchmarks

*Cross-links automatically generated from None.*
