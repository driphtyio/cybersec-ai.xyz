---
title: "Checkov Review 2026: Best IaC Security Scanner?"
description: "Checkov review: is this the best IaC security scanner for your team? What it catches, where it stops, and how to wire it into CI so you can start scanning."
pubDate: "2026-09-18"
tags: ["iac security", "checkov", "terraform", "devsecops", "cloud security"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/checkov-review-2026-1789752536.webp"
lastVerified: "2026-09-18"
---

Checkov is the leading open-source candidate for the best IaC security scanner in 2026, and for most teams already living in Terraform, Kubernetes manifests or CloudFormation, it is the default answer. It is Apache-2.0 licensed, maintained by Prisma Cloud (Palo Alto Networks), and free to run with no account. This review is based on the vendor's official documentation, the public repository and pinned release metadata for Checkov — we did not run the tool hands-on.

## How We Tested

This review examined Checkov's official documentation portal, its [CLI command reference](https://www.checkov.io/2.Basics/CLI%20Command%20Reference.html), the [official policy index](https://www.checkov.io/5.Policy%20Index/all.html), the public GitHub repository and its pinned release metadata, and the official GitHub Action repository. Research was completed in September 2026, with repository metrics and the policy count captured on 2026-09-18.

No hands-on lab run was performed. No scan was executed against a live repository, and no output was benchmarked against another scanner. Prisma Cloud platform features — centralized policy management, pull-request annotations, runtime scanning and drift detection — were not tested at all and are described here from vendor documentation only. Where this review states a number, that number comes from a primary source fetched on the review date and is labelled as such.

## What Is the Best IaC Security Scanner in 2026?

For most teams, Checkov is the best IaC security scanner in 2026 because it combines broad framework coverage, a free Apache-2.0 CLI, and native CI output formats like SARIF with no account requirement. It scans Terraform, CloudFormation, Kubernetes, Helm, Dockerfile, Bicep, ARM and more from a single binary.

That answer deserves a caveat. "Best" depends on what you already run. If your container pipeline is standardized on Trivy, you may already have IaC misconfiguration coverage and adding Checkov means a second config surface. If your estate is Terraform-only and small, tfsec's lineage inside Trivy may be enough. Checkov's advantage is breadth plus policy depth: the [official policy index](https://www.checkov.io/5.Policy%20Index/all.html) listed 1,360 unique CKV check IDs on 2026-09-18, and the same CLI handles secrets, container images and open-source packages. For a team that wants one tool to cover IaC and adjacent supply-chain checks, that combination is hard to beat.

## What Checkov Actually Is

Checkov is an open-source static analysis tool for infrastructure as code, container images and open-source packages, maintained by Prisma Cloud (Palo Alto Networks) under the Apache-2.0 license. It was originally created by Bridgecrew, which Palo Alto Networks acquired in 2021, and the source lives at [github.com/bridgecrewio/checkov](https://github.com/bridgecrewio/checkov).

The repository metrics as of 2026-09-18 tell a story of steady, ongoing maintenance: 9,014 stars, 1,412 forks, 169 open issues, created 2019-11-27, with the last push on 2026-09-17. The latest release was 3.3.19, published 2026-09-17, with prebuilt binary archives for linux x86_64, linux arm64, darwin x86_64 and windows x86_64. The [PyPI package](https://pypi.org/project/checkov/) carries the same 3.3.19 version, requires Python >= 3.9, and describes itself as "Infrastructure as code static analysis."

Architecturally, Checkov is a policy-as-code engine. Policies are Python or YAML definitions that match against parsed IaC resources, and the tool ships with a large built-in policy set plus the ability to load custom checks. That design is what makes it extensible enough for teams with internal naming conventions or bespoke cloud patterns — a theme that recurs across [infrastructure security guides](/frameworks/) generally.

## How Do I Install Checkov and Run a First Scan?

Installing Checkov is a single pip command, and a first scan of a directory is one more. The [Quick Start page](https://www.checkov.io/1.Welcome/Quick%20Start.html) documents `pip install checkov` for installation and `checkov -d /path/to/iac` for a directory scan, which is the fastest path from zero to a policy report.

```bash
# Install from PyPI (requires Python >= 3.9)
pip install checkov

# Scan the current directory recursively
checkov -d .

# Emit SARIF for CI upload, writing to a file
checkov -d . -o sarif --output-file-path results.sarif
```

Output is configurable. The `-o`/`--output` flag accepts cli, csv, cyclonedx, cyclonedx_json, spdx, json, junitxml, github_failed_only, gitlab_sast and sarif, and multiple formats can be combined — `-o sarif -o cli` produces both. The `--output-file-path` flag routes each format independently, so `-o cli -o junitxml --output-file-path console,results.xml` writes human-readable output to the terminal and JUnit XML to a file for your CI test reporter.

For narrowing scope during a first pass, `--check` accepts a Checkov check ID (`CKV_...`), a Prisma Cloud check ID (`BC_...`), or a severity level (LOW, MEDIUM, HIGH, CRITICAL). Passing a severity includes every check at or above it; `--skip-check` is the inverse. Other documented flags worth knowing early: `--quiet` shows only failed checks, `--compact` strips code blocks from output, `--skip-framework` excludes a framework entirely, and `CKV_FRAMEWORK` sets the framework via environment variable. If you are evaluating this alongside container work, [our Trivy review](/blog/trivy-review-2026/) covers the overlapping ground.

## Which Frameworks and Clouds Does Checkov Cover?

Checkov's `--framework` flag accepts a long list of targets, and the breadth is the main reason it competes for the best IaC security scanner title. The [official CLI reference](https://www.checkov.io/2.Basics/CLI%20Command%20Reference.html) enumerates them, and the list includes terraform, terraform_plan, cloudformation, kubernetes, kustomize, helm, dockerfile, serverless, arm, bicep, ansible, github_actions, gitlab_ci, bitbucket_pipelines, argo_workflows, openapi, json, yaml, secrets, sca_package, sca_image, github_configuration, gitlab_configuration, bitbucket_configuration and all.

That covers the three major IaC dialects (Terraform HCL, CloudFormation, ARM/Bicep), the Kubernetes toolchain (raw manifests, Kustomize overlays, Helm charts), CI/CD pipeline definitions across GitHub, GitLab and Bitbucket, and supply-chain surfaces via `sca_package` and `sca_image`. Dedicated policy index pages exist per framework, so you can audit coverage before committing.

The one framework worth calling out separately is `terraform_plan`. Rather than scanning raw HCL, Checkov can scan a Terraform plan file, which means variable-driven values are resolved before checks run. That matters in practice: a bucket name assembled from a variable, or a CIDR block computed from a `locals` expression, may be invisible to a raw-HCL scan but fully materialized in the plan. Teams with heavy variable use should treat plan scanning as the more accurate mode, at the cost of a `terraform plan` step in the pipeline. The same principle applies to [Kubernetes security hardening](/blog/kubernetes-security-hardening/), where rendered manifests differ from source templates.

## How Do Suppressions and Fail Thresholds Work?

Suppressions in Checkov are inline comments scoped to the resource, and fail thresholds are CLI flags that control exit codes. Together they are the mechanism teams use to adopt a scanner without breaking every pipeline on day one, and both are documented on the [suppressing and skipping policies](https://www.checkov.io/2.Basics/Suppressing%20and%20Skipping%20Policies.html) and [hard and soft fail](https://www.checkov.io/2.Basics/Hard%20and%20soft%20fail.html) pages.

The suppression syntax is a comment placed inside the resource's scope:

```hcl
resource "aws_s3_bucket" "assets" {
  #checkov:skip=CKV_AWS_20:The bucket is a public static content host
  bucket = "example-assets"
}
```

The check ID is required; the reason is optional but is echoed in output, which is what makes suppressions auditable later. That reason field is the difference between a documented exception and silent debt.

Fail semantics are equally direct. By default a failing scan exits non-zero, which breaks a build. `--soft-fail` makes a failing scan exit 0, so the pipeline proceeds while still printing findings. `--hard-fail-on` and `--soft-fail-on` scope failures to specific severities or check IDs. A common rollout pattern is to start with `--soft-fail` globally, watch which checks fire most often, fix or suppress them, then move to `--hard-fail-on HIGH` and tighten from there. That staged approach is how most teams get from "we have a scanner" to "we have enforcement" without a week of red builds.

## Does Checkov Find Hard-Coded Secrets?

Yes — Checkov scans for common hard-coded credentials inside IaC code blocks, including AWS access keys, Azure service credentials and private keys. The [credentials and secrets page](https://www.checkov.io/2.Basics/Scanning%20Credentials%20and%20Secrets.html) documents the canonical example failure, `CKV_AWS_41: Ensure no hard coded AWS access key and secret key exists`, reported against a `provider.aws` block.

Detection reaches beyond obvious provider blocks. The documented scope includes Lambda environment variables and EC2 `user_data` — both places where a credential can be embedded in a template and shipped straight into a running workload. That is a meaningfully different threat model from a generic secret scanner pointed at a Git history, because the finding surfaces at the configuration layer, before the resource exists.

The secrets framework has its own check IDs (`CKV_SECRET_*`) and can be run in isolation with `--framework secrets`. That isolation is useful in two ways: as a fast pre-commit hook that only checks for credentials, and as a targeted job in a pipeline where full IaC scanning runs elsewhere. For teams layering controls, this pairs naturally with static analysis tools — see [SAST with Semgrep](/blog/semgrep-review-2026/) for the application-code side of the same problem, and the [CVE database](/cves/) for tracking what a leaked credential could reach.

## Wiring Checkov Into CI Without Breaking the Build

The official GitHub Action is `bridgecrewio/checkov-action@v12`, and it is the shortest path to SARIF output in GitHub code scanning. The action repository at [github.com/bridgecrewio/checkov-action](https://github.com/bridgecrewio/checkov-action) documents the pattern, with `output_format: cli,sarif` and `output_file_path: console,results.sarif`, followed by a separate step that uploads the SARIF file.

```yaml
name: checkov
on: [pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: bridgecrewio/checkov-action@v12
        with:
          output_format: cli,sarif
          output_file_path: console,results.sarif
      - uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: results.sarif
```

The `security-events: write` permission is required for the SARIF upload to succeed; without it the job fails at the upload step rather than the scan step, which is a confusing first-run experience. The action repo's latest release tag at review time was v12.1347.0.

GitHub is not the only option. The documentation also covers Jenkins, GitLab CI, Bitbucket Cloud Pipelines, Kubernetes, pre-commit hooks and Docker integrations. For teams that prefer a raw CLI invocation over the action, the `-o sarif --output-file-path results.sarif` command from earlier drops straight into any runner that can upload a SARIF artifact. A [free scan tool](/scan/) running on every pull request is a reasonable starting posture before you invest in platform features.

## Where Checkov Falls Short

Checkov's limitations are mostly about operational scale rather than detection quality. A 1,360-check index is a strength on paper and a triage problem in practice: a first run against a mature repository will surface findings across many frameworks, and someone has to decide which are real, which are suppressed, and which need a custom policy. That work does not disappear because the scanner is free.

Suppressions can silently accumulate as debt. The syntax requires a check ID but the reason is optional, so a codebase can end up with dozens of `#checkov:skip=CKV_...` comments that nobody reviews. There is no built-in expiry. If you adopt suppressions, treat them like any other exception register and audit them on a schedule.

The free CLI is genuinely free and open source under Apache-2.0 with no account, key or subscription. But the workflow features large teams actually want — centralized policy management, pull-request annotations, runtime scanning, drift detection, IDE and VCS integrations — live in Prisma Cloud, the paid platform. Palo Alto Networks describes Checkov as "the leading open source policy-as-code tool powering Prisma Cloud Infrastructure as Code Security" on its [Cloud Code Security page](https://www.paloaltonetworks.com/prisma/cloud/cloud-code-security), and the vendor's only public self-serve entry point is a 30-day trial request form at [start.paloaltonetworks.com](https://start.paloaltonetworks.com/prisma-cloud-request-a-trial). There is no public price list, and this review makes no claim about what Prisma Cloud costs.

Two more caveats. First, SCA and container coverage overlap heavily with Trivy-class tools — `sca_package` and `sca_image` are useful, but if you already run Trivy for images and SBOMs, you are maintaining two scanners for adjacent jobs. tfsec, the Aqua Security Terraform scanner whose [repository](https://github.com/aquasecurity/tfsec) now reads "Tfsec is now part of Trivy," is the clearest example of that consolidation pressure, and [Trivy's IaC coverage docs](https://trivy.dev/latest/docs/coverage/iac/) describe the merged path. Second, beyond wiring the CLI into CI, there is no account-free way to enforce policy consistently across many repositories — org-wide enforcement is a platform feature. Other IaC scanners exist, including KICS and Snyk IaC, but no facts about them were verified for this review.

## FAQ

### Is Checkov free to use?

Yes. The Checkov CLI is free and open source under the Apache-2.0 license and requires no account, API key or subscription. It installs from PyPI with `pip install checkov` and scans a directory immediately. The paid Prisma Cloud platform is a separate product with a 30-day trial request form and no public price list.

### Is Checkov better than tfsec or Trivy?

They overlap but differ in scope. tfsec focused on Terraform and its repository now states it is part of Trivy. Trivy covers IaC misconfiguration alongside container image and SBOM scanning. Checkov covers more frameworks — Terraform, CloudFormation, Kubernetes, Helm, Bicep, ARM and CI pipelines — plus a dedicated secrets framework, from one binary.

### Does Checkov scan Terraform plan files?

Yes. The `terraform_plan` framework is distinct from `terraform` and scans a plan file rather than raw HCL. Because Terraform resolves variables and locals during planning, checks run against materialized values. That catches misconfigurations assembled from variables that a raw-HCL scan would miss. It requires a `terraform plan` step in your pipeline.

## Verdict: Should You Adopt Checkov?

Checkov earns its reputation. It is free, Apache-2.0, actively maintained — release 3.3.19 landed 2026-09-17, one day before this review — and covers more IaC frameworks from one binary than most competitors. The 1,360-check policy index is deep, the CLI output formats map cleanly onto CI systems, and the GitHub Action makes SARIF upload a five-line job. For a Terraform-heavy team with no scanner today, it is the obvious first install. Pair it with [Docker security hardening](/blog/docker-security-hardening/) and [Kubernetes runtime security with Falco](/blog/falco-review-2026/) and you have coverage from configuration through runtime.

Use it if: you manage IaC across more than one framework, you want a free scanner with SARIF and JUnit output, you need inline suppression with auditable reasons, or you want secrets detection at the configuration layer.

Skip it if: your estate is Terraform-only and you already run Trivy for IaC and images, you need centralized multi-repo policy enforcement without building it yourself, or you want drift detection and PR annotations out of the box without paying for Prisma Cloud.

## Related Guides

- [infrastructure security guides](/frameworks/)
- [container scanning with Trivy](/blog/trivy-review-2026/)
- [SAST with Semgrep](/blog/semgrep-review-2026/)
- [Kubernetes runtime security with Falco](/blog/falco-review-2026/)
- [Docker security hardening](/blog/docker-security-hardening/)

<!-- crosslinks -->

## 📖 Related Reads

- **[ToolBrain](https://toolbrain.net/)** — tool reviews, LLM comparisons, and AI workflow guides
- **[CodeIntel Log](https://codeintel.xyz/)** — code quality, debugging, and software engineering benchmarks

*Cross-links automatically generated from None.*
