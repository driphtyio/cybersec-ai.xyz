---
title: "Trivy Review 2026: The Default Container Scanner"
description: "Trivy is the container vulnerability scanner inside GitLab, Harbor, and Docker Desktop. This review covers free limits, Kubernetes gaps, and the upgrade path."
pubDate: "2026-08-19"
tags:
  - tool-review
  - vulnerability-scanning
  - container-security
  - kubernetes
  - devsecops
lastVerified: "2026-08-19"
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/trivy-review-2026-1787162022.webp"
---

Trivy is the **best container vulnerability scanner for Kubernetes** because it is the free, Apache-2.0 engine already running inside GitLab, Harbor, and Docker Desktop. In 2026, you are likely already using Trivy — possibly without knowing it. This review covers what the open-source tool actually does, where its documented limits are, and exactly what you pay for when you move to Aqua's commercial platform. Freshness note: v0.74.0 shipped on 2026-08-14, the ninth release in about six months.

## How We Tested

This review is based on the vendor's official documentation, pricing page, and published benchmarks — we did not run the tool ourselves. All claims are linked inline to primary sources, each verified HTTP-200 on 2026-08-19. We focused on the official Trivy docs, the GitHub CHANGELOG, and Aqua's public announcements. Where the docs flag a feature as experimental or a limitation as known, we report it as such. Last reviewed August 2026.

## What is the best container vulnerability scanner for Kubernetes?

For most teams, Trivy is the honest answer: it is free, Apache-2.0, has 37,503 GitHub stars, and runs from a single binary. But "best" depends on your needs. Trivy OSS covers image, filesystem, repo, and IaC scanning. If you need reachability analysis, admission control, or SAST, that is commercial-only territory.

## Why Trivy Became the Default Scanner

Trivy's dominance is not accidental; it is the default engine across the industry's most-used platforms. GitLab made Trivy its default container scanner, and its bundled Grype analyzer is now "no longer maintained" — supported only until GitLab 19.0 ([GitLab Docs](https://docs.gitlab.com/ee/user/application_security/container_scanning/)). Harbor 2.0 made Trivy its default scanner adapter, replacing Clair ([Harbor 2.0 blog](https://goharbor.io/blog/harbor-2.0/)). Docker Desktop integrated Trivy for container image scanning in May 2022 ([Aqua blog](https://www.aquasec.com/blog/container-image-scanning-docker-desktop-with-trivy)). Red Hat certified Trivy as a vulnerability scanner for its ecosystem ([Red Hat blog](https://www.redhat.com/en/blog/introducing-red-hat-vulnerability-scanner-certification)).

The project itself is Apache-2.0, created in 2019, and now sits at 37,503 stars on GitHub ([GitHub aquasecurity/trivy](https://github.com/aquasecurity/trivy)). The growth is steep: roughly 12,000 stars in May 2022 to 37.5k today, driven by Aqua's push to make Trivy a unified cloud-native security scanner ([Aqua News](https://www.aquasec.com/news/trivy-unified-cloud-native-security-scanner/)). For IT pros, the takeaway is simple: if you use GitLab, Harbor, or Docker Desktop, you are already depending on Trivy's detection engine.

## What Trivy Scans

Trivy is a single binary with multiple targets. `trivy image` scans container images; `trivy fs` scans filesystems; `trivy repo` scans remote repositories; `trivy config` handles IaC and misconfiguration scanning with Rego custom checks and the trivy-checks bundle ([Vulnerability scanning docs](https://trivy.dev/docs/latest/scanner/vulnerability/), [Misconfiguration docs](https://trivy.dev/docs/latest/scanner/misconfiguration/)). `trivy k8s` scans Kubernetes clusters — but this target is explicitly marked EXPERIMENTAL ([Kubernetes target docs](https://trivy.dev/docs/latest/target/kubernetes/)).

For SBOM, Trivy supports CycloneDX (including version 1.7) and SPDX; XML output is not supported ([SBOM docs](https://trivy.dev/docs/latest/supply-chain/sbom/)). It also does license scanning and secret scanning (default-on, gitleaks-inspired rules). There is a limited `trivy aws` command in OSS with more AWS features in the commercial build.

Coverage is broad: about 20 operating systems including Wolfi, Chainguard, and Alpine, plus 16+ programming languages ([Coverage docs](https://aquasecurity.github.io/trivy/latest/docs/coverage/)). Detection relies on three auto-fetched databases: trivy-db, trivy-java-db, and trivy-checks ([Databases docs](https://trivy.dev/docs/latest/configuration/db/)).

## Trivy OSS vs Aqua Commercial

The official comparison page is the definitive source here ([Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/)). OSS is free, Apache-2.0, CLI-only, with community support. The commercial Trivy Premium build adds: a web UI/SaaS, RBAC/SSO, SLA support, concurrent scans, commercial vulnerability feeds, Windows container support, registry scanning, malware and DTA sandboxing, SAST, reachability and contextual vulnerability analysis, Kubernetes admission control, 25+ compliance programs, and AI remediation.

Notably, Aqua does not publish a price list; they sell via demo and trial. We will not invent numbers. The honest framing: OSS Trivy covers the core scanning workflow well. You pay when you need context — reachability analysis to prioritize, malware detection, or SAST. For a deeper look at how scanning fits into a compliance program, see our [security frameworks](https://cybersec-ai.xyz/frameworks/) hub.

## Trivy's Honest Weaknesses

Trivy's docs are candid about limitations. Kubernetes scanning is EXPERIMENTAL and "might change without preserving backwards compatibility" ([Kubernetes docs](https://trivy.dev/docs/latest/target/kubernetes/)). The precision-first philosophy "minimizes false positives while potentially accepting some false negatives"; vendor advisories are preferred over NVD, and vendor severity can differ from NVD — for example, CVE-2023-0464 is High in NVD but Low per Red Hat ([Vulnerability scanning docs](https://trivy.dev/docs/latest/scanner/vulnerability/)).

There is a known false-positive issue class, tracked publicly: misconfiguration AWS-0126 false positives ([issue #11118](https://github.com/aquasecurity/trivy/issues/11118)), a gcp-service-account secret false positive ([issue #8079](https://github.com/aquasecurity/trivy/issues/8079)), and a UBI sqlite CVE-2019-5827 false positive ([issue #749](https://github.com/aquasecurity/trivy/issues/749)). CycloneDX XML is unsupported ([SBOM docs](https://trivy.dev/docs/latest/supply-chain/sbom/)), full license scanning is "expensive… takes a while" ([License docs](https://trivy.dev/docs/latest/scanner/license/)), and OSS databases on free public infrastructure "could be rate limited" ([Comparison](https://trivy.dev/docs/latest/commercial/compare/)). For hardening guidance around these limits, see our [Kubernetes security hardening](https://cybersec-ai.xyz/blog/kubernetes-security-hardening/) guide.

## What's New in Trivy in 2026

The release cadence is aggressive — nine releases in roughly six months ([CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)). v0.74.0 (2026-08-14) added RapidFort curated-image support and Java license mapping to SPDX IDs ([release discussion](https://github.com/aquasecurity/trivy/discussions/11096)). v0.73.0 (2026-08-03) added OpenVEX discovery as OCI artifacts. v0.72.0 (2026-06-30) introduced a breaking `dockers_v2` config migration, Bottlerocket matching, and OpenAI secret rules. v0.71.0 (2026-06-01) brought CycloneDX 1.7 support, Ubuntu 26.04 detection, and a Terraform path-traversal fix. v0.70.0 (2026-04-17) added PEP 751 `pylock.toml` support and CVSS v4 in CycloneDX output. Full release history is on [GitHub releases](https://github.com/aquasecurity/trivy/releases).

## FAQ

### Is Trivy free to use?

Yes. The open-source Trivy project is free under Apache-2.0 ([GitHub](https://github.com/aquasecurity/trivy)). Trivy Premium is a commercial build inside the Aqua Platform, adding a web UI, malware scanning, and SLA support ([Aqua News](https://www.aquasec.com/news/trivy-unified-cloud-native-security-scanner/)). Aqua does not publish pricing; you must contact sales for a quote.

### Does Trivy scan Kubernetes clusters?

Yes, via `trivy k8s`, but the target is experimental. It uses a node-collector for CIS infrastructure assessment, scans images separately from manifests, and produces a KBOM in CycloneDX format ([Kubernetes docs](https://trivy.dev/docs/latest/target/kubernetes/)). Kubernetes admission control is commercial-only ([Comparison](https://trivy.dev/docs/latest/commercial/compare/)).

### How accurate is Trivy?

Trivy is precision-first: it minimizes false positives, sometimes accepting false negatives. It prefers vendor advisories over NVD and uses vendor severity when available ([Vulnerability scanning docs](https://trivy.dev/docs/latest/scanner/vulnerability/)). A known class of false positives is tracked in public GitHub issues, so you can check before filing a bug.

Trivy is the free default engine of the industry — GitLab, Harbor, Docker Desktop all trust it. Pay for Aqua only when you need reachability analysis, SAST, or malware scanning; for most teams, the OSS binary is enough.
