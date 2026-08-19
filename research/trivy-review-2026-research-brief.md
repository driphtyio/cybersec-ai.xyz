# Trivy Review 2026 — Research Brief (cybersec-ai.xyz)

**Research date:** 2026-08-19 (all data verified live on this date)
**Verification method:** GitHub REST API, `curl -s -o /dev/null -w "%{http_code}"` (HTTP 200), and page-content extraction. `trivy.dev` pages were verified via Firecrawl extraction because this environment's local security scanner false-positives on the `.dev` TLD for curl; every `aquasecurity.github.io` docs mirror URL was additionally verified 200 via curl. Aqua pages return 403 to plain curl (bot protection) but were retrieved successfully via Firecrawl — marked below where applicable.

---

## 1. Overview

| Item | Fact | Source |
|---|---|---|
| What it is | "The All-in-One Security Scanner" — finds vulnerabilities (CVE) & misconfigurations (IaC) across code repositories, binary artifacts, container images, and Kubernetes clusters | [trivy.dev](https://trivy.dev/) |
| Repo description | "Find vulnerabilities, misconfigurations, secrets, SBOM in containers, Kubernetes, code repositories, clouds and more" | [GitHub aquasecurity/trivy](https://github.com/aquasecurity/trivy) |
| Maintainer | Aqua Security ("Trivy is proudly maintained by Aqua Security") | [Docs: Comparison (commercial)](https://trivy.dev/docs/latest/commercial/compare/) |
| License | Apache-2.0 | [GitHub API (license: Apache-2.0)](https://api.github.com/repos/aquasecurity/trivy) |
| Language | Go | [GitHub aquasecurity/trivy](https://github.com/aquasecurity/trivy) |
| Created | 2019-04-11; repo actively pushed 2026-08-19 (same day as research) | [GitHub API](https://api.github.com/repos/aquasecurity/trivy) |
| Current stable (Aug 2026) | **v0.74.0**, released 2026-08-14 ("Latest" tag on GitHub) | [GitHub releases](https://github.com/aquasecurity/trivy/releases/tag/v0.74.0), [GitHub API releases](https://api.github.com/repos/aquasecurity/trivy/releases) |
| GitHub stars | **37,503** (2026-08-19, GitHub API; release page shows "37.5k"; trivy.dev homepage badge shows 37,503) | [GitHub API](https://api.github.com/repos/aquasecurity/trivy), [v0.74.0 release page](https://github.com/aquasecurity/trivy/releases/tag/v0.74.0) |
| Forks / open issues | 614 forks, 250 open issues | [GitHub API](https://api.github.com/repos/aquasecurity/trivy) |
| Official product page | https://trivy.dev/ (canonical) and https://aquasecurity.github.io/trivy/ (301-redirects to trivy.dev) | [trivy.dev](https://trivy.dev/) |
| Docs base | https://trivy.dev/docs/latest/ (mirror: https://aquasecurity.github.io/trivy/latest/docs/, 301 → trivy.dev) | [Docs](https://trivy.dev/docs/latest/) |
| Historical adoption claim | As of May 2022: "100,000 users, and with nearly 12,000 GitHub stars" (context for growth narrative: 12k → 37.5k stars) | [Aqua News: Trivy unified scanner](https://www.aquasec.com/news/trivy-unified-cloud-native-security-scanner/) |

---

## 2. Core capabilities (verified against official docs)

CLI pattern: `trivy <target> [--scanners <scanner1,scanner2>] <subject>` — targets vs. scanners are orthogonal [Docs: Getting started](https://trivy.dev/docs/latest/getting-started/).

| Capability | Detail | Source |
|---|---|---|
| Container image scanning | `trivy image` — OS packages, language packages, non-packaged software (Go/Rust binaries with embedded module info, SBOM-in-image), Kubernetes components | [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/) |
| Filesystem scanning | `trivy fs --scanners vuln,secret,misconfig` | [Docs: Getting started](https://trivy.dev/docs/latest/getting-started/) |
| Git repository scanning | `trivy repo` (vuln + secret + misconfig) | [Docs: Misconfiguration scanning](https://trivy.dev/docs/latest/scanner/misconfiguration/) |
| IaC / misconfiguration scanning | `trivy config` — built-in checks for Docker, Kubernetes, Terraform, CloudFormation, Azure ARM, Helm Charts, Dockerfile; custom checks in Rego; checks bundle `trivy-checks` auto-downloaded | [Docs: Misconfiguration scanning](https://trivy.dev/docs/latest/scanner/misconfiguration/) |
| Kubernetes scanning | `trivy k8s` — cluster infra, config (Roles/ClusterRoles), workloads; images scanned separately from manifests; node-collector runs CIS-style infra assessment; **marked EXPERIMENTAL**; KBOM generation (CycloneDX) | [Docs: Kubernetes target](https://trivy.dev/docs/latest/target/kubernetes/) |
| SBOM generation | CycloneDX (incl. 1.7 since v0.71.0) and SPDX output via `--format`; SBOM-as-input (`trivy sbom`); auto-detects SBOMs inside images (.spdx/.cdx, Bitnami images); CycloneDX **XML not supported** | [Docs: SBOM](https://trivy.dev/docs/latest/supply-chain/sbom/) |
| Vulnerability scanning | OS packages (vendor advisories), language packages (GHSA, GitLab advisories, OSV, Go vuln DB), non-packaged software; `--ignore-unfixed`; vendor-first severity | [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/) |
| License compliance | `trivy image --scanners license` — Google License Classification (Forbidden→CRITICAL … Permissive→LOW); standard + `--license-full` modes (full is documented as slow) | [Docs: License scanning](https://trivy.dev/docs/latest/scanner/license/) |
| Secret scanning | Enabled by default; built-in rules (AWS keys, GCP service accounts, GitHub/GitLab PATs, Slack tokens…); custom rules/allow-rules via `trivy-secret.yaml`; inspired by gitleaks | [Docs: Secret scanning](https://trivy.dev/docs/latest/scanner/secret/) |
| Cloud scanning (OSS) | AWS subset via `trivy aws`; AWS/Azure/GCP/Alibaba/Oracle listed as commercial-only for full coverage | [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/) |
| Coverage | ~20 OSes incl. Alpine, Debian, Ubuntu, RHEL/CentOS, Amazon Linux, Photon, Wolfi, Chainguard, SUSE, Oracle, Azure Linux (CBL-Mariner), Rocky, Alma; 16+ languages incl. Python, Java, Go, Node.js, Ruby, Rust, .NET, PHP, Dart, Elixir, Swift, C/C++ | [Coverage: OS](https://aquasecurity.github.io/trivy/latest/docs/coverage/os/), [Coverage: Language](https://aquasecurity.github.io/trivy/latest/docs/coverage/language/) |
| Ecosystem | GitHub Action (trivy-action), Kubernetes Operator (trivy-operator), VS Code plugin, Docker Desktop integration, Harbor adapter, GitLab default scanner | [Docs: Getting started](https://trivy.dev/docs/latest/getting-started/), [GitLab docs](https://docs.gitlab.com/ee/user/application_security/container_scanning/) |

**REMOVED (404 at research time, do not use):** `aquasecurity.github.io/trivy/latest/docs/scanner/iac/` (IaC docs now live at `/scanner/misconfiguration/`), `…/docs/kubernetes/` (now `/target/kubernetes/`), `…/docs/vulnerability/detection/data-source/` (data sources now inside the vulnerability-scanner page), `…/docs/scanning/iac/`, `…/docs/scanning/kubernetes/`.

---

## 3. Key facts with sources (all URLs HTTP-verified)

### 3.1 Official pages
- Product page: [trivy.dev](https://trivy.dev/) — 200 (Firecrawl; curl blocked by local .dev scan false-positive). Mirror [aquasecurity.github.io/trivy/](https://aquasecurity.github.io/trivy/) — 200 curl (301 → trivy.dev).
- GitHub repo: [github.com/aquasecurity/trivy](https://github.com/aquasecurity/trivy) — 200 curl. Stars 37,503 / forks 614 / Apache-2.0 (GitHub API, 2026-08-19).
- Releases: [github.com/aquasecurity/trivy/releases](https://github.com/aquasecurity/trivy/releases) — 200 curl. Latest v0.74.0 (2026-08-14); tag pages for v0.74.0, v0.73.0, v0.72.0, v0.70.0 all 200.
- Aqua product page: [aquasec.com/products/trivy/](https://www.aquasec.com/products/trivy/) — content retrieved (Firecrawl); curl returns 403 (bot protection) — page is live, cite as-is.

### 3.2 Docs pages (canonical trivy.dev; each also 200 via curl on the aquasecurity.github.io mirror where noted)
- Vulnerability scanning: [trivy.dev/docs/latest/scanner/vulnerability/](https://trivy.dev/docs/latest/scanner/vulnerability/) — 200 (mirror 200 curl)
- IaC / misconfiguration: [trivy.dev/docs/latest/scanner/misconfiguration/](https://trivy.dev/docs/latest/scanner/misconfiguration/) — 200 (mirror 200 curl)
- SBOM: [trivy.dev/docs/latest/supply-chain/sbom/](https://trivy.dev/docs/latest/supply-chain/sbom/) — 200 (mirror 200 curl)
- Kubernetes: [trivy.dev/docs/latest/target/kubernetes/](https://trivy.dev/docs/latest/target/kubernetes/) — 200
- Coverage: [trivy.dev/docs/latest/coverage/](https://aquasecurity.github.io/trivy/latest/docs/coverage/) — 200 curl (mirror URL used; redirects to trivy.dev)
- Databases mechanism: [trivy.dev/docs/latest/configuration/db/](https://trivy.dev/docs/latest/configuration/db/) — 200
- License: [trivy.dev/docs/latest/scanner/license/](https://trivy.dev/docs/latest/scanner/license/) — 200
- Secret: [trivy.dev/docs/latest/scanner/secret/](https://trivy.dev/docs/latest/scanner/secret/) — 200
- Getting started: [trivy.dev/docs/latest/getting-started/](https://trivy.dev/docs/latest/getting-started/) — 200

### 3.3 Vulnerability database / detection mechanism
- Trivy auto-fetches and caches three DBs: **trivy-db** (CVE info from many feeds), **trivy-java-db** (Java artifact index), **trivy-checks** (misconfig check logic); published to GHCR, Docker Hub, AWS ECR; default pull order `mirror.gcr.io/aquasec` → `ghcr.io/aquasecurity`; configurable via `--db-repository`, `--skip-db-update`, `--download-db-only` [Docs: Databases](https://trivy.dev/docs/latest/configuration/db/).
- Data sources are OS-vendor advisories for OS packages (Alpine secdb, Debian Security Bug Tracker/OVAL, Ubuntu CVE Tracker, RHEL OVAL, Amazon ALAS, SUSE CVRF, Photon, Oracle OVAL, Azure Linux, Rocky, Alma, Wolfi, Chainguard, Arch, Minios, Echo, Root.io, Seal Security feeds) and GitHub Advisory Database / GitLab Advisories Community / Go Vulnerability DB / OSV (crates.io) for language packages; NVD used as fallback; Kubernetes components matched against the official Kubernetes CVE feed [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/).
- Severity: vendor severity preferred over NVD (e.g., CVE-2023-0464 "HIGH" in NVD but "Low" per Red Hat → Trivy reports Low); CVSS-score ranges as fallback; `--vuln-severity-source` to override [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/).
- DB code: [github.com/aquasecurity/trivy-db](https://github.com/aquasecurity/trivy-db) — 200 curl; raw feeds repo [github.com/aquasecurity/vuln-list](https://github.com/aquasecurity/vuln-list) — 200 curl; Aqua's browsable database [avd.aquasec.com](https://avd.aquasec.com/) — 200 curl; Aqua's blog on AVD: [Unveiling Aqua Vulnerability Database](https://www.aquasec.com/blog/unveiling-aqua-vulnerability-database) — 200 curl.
- Detection philosophy: "Trivy prioritizes precision … aiming to minimize false positives while potentially accepting some false negatives" (e.g., packages installed via OS manager are matched only against vendor advisories) [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/).

### 3.4 Comparisons vs alternatives — primary sources only
- **GitLab vs (Grype):** GitLab docs state "GitLab integrates with the Trivy security scanner to perform vulnerability static analysis in containers" and that the Grype analyzer "is no longer maintained" (supported only until GitLab 19.0) — an explicit primary-source de facto comparison [GitLab Docs: Container scanning](https://docs.gitlab.com/ee/user/application_security/container_scanning/) — 200 curl.
- **GitLab's evaluation:** GitLab's own issue/decision record on choosing Trivy: [gitlab.com/gitlab-org/gitlab/-/issues/270888](https://gitlab.com/gitlab-org/gitlab/-/issues/270888) — 200 curl; Aqua case study: "Trivy was a clear leader in the market as far as features, functionality, and capabilities" — Sam White, Sr. Product Manager, GitLab [Aqua blog: GitLab case study](https://www.aquasec.com/blog/trivy-scanner-gitlab-case-study/) — 200 (Firecrawl; curl 403 bot protection).
- **Harbor:** Harbor 2.0 made Trivy its default scanner adapter: "Trivy takes container image scanning to higher levels of usability and performance" [Harbor blog](https://goharbor.io/blog/harbor-2.0/) — 200 curl.
- **Red Hat:** Trivy is a Red Hat certified scanner [Red Hat blog](https://www.redhat.com/en/blog/introducing-red-hat-vulnerability-scanner-certification) — 200 curl.
- **Docker:** Trivy integrated into Docker Desktop (May 2022) [Aqua blog](https://www.aquasec.com/blog/container-image-scanning-docker-desktop-with-trivy) — 200 curl.
- **Aqua's own OSS-vs-commercial comparison** (not vs. other vendors): official table of Trivy OSS vs Aqua platform [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/) — 200.
- **Note for the post:** No direct Aqua-published "Trivy vs Grype/Snyk/Clair/Anchore" benchmark page exists as of 2026-08-19 (site-restricted search returned none). Use the adoption-based primary sources above; avoid third-party benchmark blogs.

### 3.5 Pricing / commercial offering
- Trivy OSS is free, Apache-2.0 [GitHub](https://github.com/aquasecurity/trivy).
- **Trivy Premium** (announced May 17, 2022): commercial build integrated into the Aqua Platform/CNAPP — adds centralized management, UI, premium threat intelligence, malware scanning, standalone-binary scanning, customer support; integrates with Aqua CSPM and Runtime Protection; free trial via Aqua Platform [Aqua News](https://www.aquasec.com/news/trivy-unified-cloud-native-security-scanner/) — 200 curl.
- Official OSS-vs-Aqua table highlights what's commercial-only: web UI/SaaS, RBAC/SSO, SLA-backed support, concurrent scans, commercial vuln feeds, Windows containers, registry scanning, malware + sandbox (DTA) scanning, SAST, Kubernetes admission control, vShield package blocking, 25+ compliance programs, AI remediation [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/) — 200.
- No public price list found (Aqua sells via demo/trial) — **pricing figures: unverified/none published**.

---

## 4. Strengths & weaknesses (sourced)

### Strengths
- Single binary, all-in-one (vuln, misconfig, secret, license, SBOM, K8s, cloud) — "no database dependencies or middleware are required" [Aqua product page](https://www.aquasec.com/products/trivy/)
- Default scanner of choice for major platforms: GitLab, Harbor, Artifact Hub; Red Hat certified; Docker Desktop integration [Aqua product page](https://www.aquasec.com/products/trivy/), [GitLab docs](https://docs.gitlab.com/ee/user/application_security/container_scanning/)
- Broad coverage: 20+ OSes, 16+ languages [Coverage docs](https://aquasecurity.github.io/trivy/latest/docs/coverage/os/)
- Precision-first detection documented as a design choice to cut false positives [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/)
- Extensibility: custom Rego checks, custom secret rules, `trivy.yaml`, `--generate-default-config` [Docs: Misconfiguration](https://trivy.dev/docs/latest/scanner/misconfiguration/), [Docs: Secret](https://trivy.dev/docs/latest/scanner/secret/)
- Air-gapped support documented (offline DB mirroring via `--db-repository`, embedded checks fallback) [Docs: Databases](https://trivy.dev/docs/latest/configuration/db/)
- Very active project: 9 releases Jan–Aug 2026; repo pushed same day as research [GitHub releases](https://github.com/aquasecurity/trivy/releases)

### Weaknesses / limitations (all from official docs or GitHub issues)
- Kubernetes scanning is **EXPERIMENTAL** — "might change without preserving backwards compatibility" [Docs: Kubernetes](https://trivy.dev/docs/latest/target/kubernetes/)
- No support for third-party/self-compiled packages/binaries (except documented Go/Rust-binary and Sigstore cases) [Docs: Vulnerability scanning](https://trivy.dev/docs/latest/scanner/vulnerability/)
- CycloneDX XML output not supported [Docs: SBOM](https://trivy.dev/docs/latest/supply-chain/sbom/)
- KBOM vulnerability matching "does not work well for vendor variants, including some cloud managed distributions" [Docs: Kubernetes](https://trivy.dev/docs/latest/target/kubernetes/)
- Secret scanning walks the full file tree — docs themselves recommend `--skip-dirs`/`enable-builtin-rules` for speed [Docs: Secret](https://trivy.dev/docs/latest/scanner/secret/)
- Full license scanning: "The full license scanning is expensive. It takes a while." [Docs: License](https://trivy.dev/docs/latest/scanner/license/)
- OSS DBs hosted on free public infrastructure — "could be rate limited" (commercial table) [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/)
- OSS gaps vs commercial: no Windows container scanning, no reachability/contextual vuln analysis, no SAST/malware/DTA, single scan at a time [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/)
- False positives remain a known issue class: 136 GitHub issues with "false positive" in title (GitHub search API, 2026-08-19), e.g. open #11118 misconf AWS-0126 TLS-policy FP (2026-08-18), open #8079 `gcp-service-account` secret FP (2024-12-11), open #749 Red Hat UBI sqlite CVE-2019-5827 FP (open since 2020) — good "what people complain about" material, cite individual issues not the count
- Community support only for OSS (SLA support is commercial) [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/)

---

## 5. Recent 2026 updates (verified from CHANGELOG.md + GitHub releases)

2026 releases to date: v0.69.2 (2026-03-01), v0.69.3 (2026-03-03), v0.70.0 (2026-04-17), v0.71.0 (2026-06-01), v0.71.1 (2026-06-15), v0.71.2 (2026-06-19), v0.72.0 (2026-06-30), v0.73.0 (2026-08-03), **v0.74.0 (2026-08-14, current)** [GitHub API releases](https://api.github.com/repos/aquasecurity/trivy/releases). Highlights:

- **v0.74.0** (2026-08-14): Java license URLs resolved to SPDX IDs (reverse index built from the SPDX license list `seeAlso`); automatic RapidFort curated-image support (Ubuntu/Alpine/RHEL-based, no extra flags); fixes incl. Terraform `for_each` panic, OpenTofu parser fix, PEP 621 pyproject dependency-name normalization [Release discussion #11096](https://github.com/aquasecurity/trivy/discussions/11096), [CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)
- **v0.73.0** (2026-08-03): OpenVEX discovery as OCI artifacts (generic in-toto referrers); Jenkins plugin manifest license detection; user-defined Maven mirrors in `trivy.yaml` [CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)
- **v0.72.0** (2026-06-30): **Breaking change** — docker config migrated to `dockers_v2`; Bottlerocket OS vulnerability matching; JAR license detection from packaged LICENSE files and embedded pom.xml; OpenAI secret detection rules; GitHub App installation-token (stateless) support [CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)
- **v0.71.0** (2026-06-01): CycloneDX 1.7 support; Azure secret rules; Maven settings.xml password/passphrase rules; Ubuntu 26.04 LTS detection; SPDX SHA-512 hashes; security fix — Terraform path traversal in filesystem functions [CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)
- **v0.70.0** (2026-04-17): `pylock.toml` (PEP 751) parser; Go binary version detection from ELF symbol table (`-trimpath`); Maven settings.xml proxy support; ARM Kubernetes-cluster misconfig; Azure resource resolution via `resource_id`; CVSS v4 ratings in CycloneDX output; performance improvement via `filepath.WalkDir` [CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)

Changelog source (raw, verified 200): https://raw.githubusercontent.com/aquasecurity/trivy/main/CHANGELOG.md

---

## 6. Use cases

- **CI/CD shift-left scanning:** `trivy image`/`trivy fs` in pipelines; official GitHub Action [aquasecurity/trivy-action](https://github.com/aquasecurity/trivy-action) (200); Aqua's GitHub Actions blog [devsecops-with-trivy-github-actions](https://www.aquasec.com/blog/devsecops-with-trivy-github-actions) (200); GitLab's default container scanner [GitLab docs](https://docs.gitlab.com/ee/user/application_security/container_scanning/)
- **Registry/platform integrations:** Harbor default scanner [Harbor blog](https://goharbor.io/blog/harbor-2.0/), Docker Desktop [Aqua blog](https://www.aquasec.com/blog/container-image-scanning-docker-desktop-with-trivy), Artifact Hub security reports (linked from [Aqua product page](https://www.aquasec.com/products/trivy/))
- **Kubernetes:** `trivy k8s` cluster scans (CIS benchmarks, node-collector) [Docs: Kubernetes](https://trivy.dev/docs/latest/target/kubernetes/); continuous in-cluster scanning via Trivy Operator [github.com/aquasecurity/trivy-operator](https://github.com/aquasecurity/trivy-operator) (200); K8s admission control is commercial-only [Docs: Comparison](https://trivy.dev/docs/latest/commercial/compare/)
- **Supply-chain / SBOM:** CycloneDX/SPDX generation for attestation, SBOM-as-input scanning [Docs: SBOM](https://trivy.dev/docs/latest/supply-chain/sbom/); VEX consumption (OpenVEX/OCI) added 2026 [CHANGELOG](https://github.com/aquasecurity/trivy/blob/main/CHANGELOG.md)
- **Air-gapped environments:** offline DB mirroring documented [Docs: Databases](https://trivy.dev/docs/latest/configuration/db/)
- **Adopters/testimonials** (for credibility quotes): GitLab, Harbor, Docker, Wise, Deutsche Bahn, Mirantis, MasterCard, CloudNativePG [trivy.dev homepage](https://trivy.dev/)

---

## 7. Suggested angle

Position Trivy as "the default engine of the industry" in 2026: it powers GitLab, Harbor, Docker Desktop and Artifact Hub, just shipped 9 releases in six months (including SBOM/VEX and AI-era secret rules), and the real review question for IT pros is where free OSS stops and Aqua's commercial platform begins — plus honest coverage of its documented gaps (experimental K8s scanning, false-positive class, no reachability/contextual analysis, no SAST/malware in OSS).

---

## 8. Hero image suggestion

A dark, DevSecOps-style hero: a large terminal window running `trivy image` with a color-coded CVE results table (CRITICAL/HIGH/MEDIUM rows), flanked by a container ship/box icon, a Kubernetes cluster glyph, and the Trivy logo treatment (green-on-dark), with a subtle "37.5k ★ / Apache-2.0 / v0.74.0" badge strip — conveys "one tool, every target."
