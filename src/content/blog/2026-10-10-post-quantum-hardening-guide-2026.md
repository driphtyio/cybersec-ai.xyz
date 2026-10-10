---
title: "Post-Quantum Readiness Hardening Guide for 2026: Inventory, Hybrid TLS and SSH, and Migration Sequencing"
description: "A vendor-neutral 2026 hardening guide for post-quantum readiness: inventory your cryptography, enable hybrid ML-KEM key exchange in TLS and SSH, and sequence the migration by exposure."
pubDate: "2026-10-10"
tags: ["security-guide", "post-quantum", "cryptography", "tls", "ssh", "hardening"]
lastVerified: "2026-10-10"
---

CISA frames the [Post-Quantum Cryptography Initiative](https://www.cisa.gov/quantum) as the work needed to address risks quantum computing poses to critical infrastructure and government networks during the transition to PQC. This guide gives IT and security teams a vendor-neutral, hardening-focused playbook for 2026. It follows three questions, in order: what to inventory, what to enable now (hybrid TLS and SSH key exchange), and how to sequence the migration.

## Why 2026 Is the Year to Move From Planning to Hardening

The standards that practitioners will deploy are no longer drafts. On August 13, 2024, [NIST published FIPS 203](https://csrc.nist.gov/pubs/fips/203/final), the *Module-Lattice-Based Key-Encapsulation Mechanism Standard*, which specifies ML-KEM and its three parameter sets (ML-KEM-512, ML-KEM-768, and ML-KEM-1024), ordered by increasing security strength and decreasing performance. On the same day, NIST approved three PQC standards: FIPS 203, FIPS 204, and FIPS 205 (per the [CISA PQC page](https://www.cisa.gov/quantum)). With finalized primitives in hand, vendor stacks and open-source libraries now ship ML-KEM and hybrid mechanisms that real systems can negotiate.

The threat model is straightforward. Adversaries can harvest today's TLS and SSH traffic and decrypt it later when a cryptographically relevant quantum computer becomes available — the "harvest-now, decrypt-later" risk. The mitigation is to put quantum-resistant key agreement in front of every Internet-facing session and every administrative tunnel, even if you keep classical algorithms as a fallback.

## Section 1: What to Inventory Before You Change Anything

Inventory comes before changes. Before flipping a single switch, build a complete picture of where cryptography actually lives.

- **Public-facing TLS endpoints.** Edge load balancers, API gateways, CDNs, and customer-facing web servers. Note the TLS library (OpenSSL, BoringSSL, wolfSSL, LibreSSL, NSS, etc.) and the current supported version.
- **Internal TLS.** Service mesh sidecars, mTLS between microservices, database connections, and admin consoles.
- **SSH access.** Every host that accepts `sshd` connections: jump hosts, bastion servers, build runners, and production Linux/Unix fleets. Capture the OpenSSH version and the active `KexAlgorithms` list.
- **VPN and IPsec.** IPsec gateways that use IKEv2 with ECDHE, plus any SSL-VPN concentrators.
- **PKI and certificates.** Root and issuing CAs, the algorithms used in subject public keys (RSA vs. ECDSA vs. Ed25519), and the validity windows of certificates in active rotation.
- **Code signing and update infrastructure.** OS package signing keys, container image signing, and firmware update channels.
- **Hardware and firmware.** HSMs, smart cards, TPMs, and network gear — these have slower update cycles and often need a separate plan.
- **Long-lived data.** Anything encrypted today whose confidentiality must hold for 5–10+ years: legal records, medical data, intellectual property, and certain categories of personal data.

Output a single inventory spreadsheet with: asset, protocol, library/version, current key-exchange method, certificate algorithm, owner, and migration status. This sheet becomes the input for everything that follows.

## Section 2: What to Enable Now — Hybrid TLS Key Exchange

Hybrid key agreement combines a classical ECDHE exchange with an ML-KEM exchange so that the session is secure if either algorithm holds. [RFC 10024](https://www.rfc-editor.org/info/rfc10024) defines three PQ/T hybrid key agreement mechanisms for TLS 1.3: `X25519MLKEM768`, `SecP256r1MLKEM768`, and `SecP384r1MLKEM1024`. The mechanism names pair an elliptic-curve Diffie–Hellman group (X25519, P-256, or P-384) with an ML-KEM parameter set. Enabling any of these in your TLS 1.3 stack gives you post-quantum protection today without dropping classical fallback.

Practical steps for your TLS stack:

1. **Upgrade your TLS library** to a release that exposes hybrid groups in its default configuration negotiation. Verify that ML-KEM-768 is the parameter set offered; ML-KEM-1024 is the higher-strength but slower option for high-value endpoints.
2. **Prefer the X25519-based hybrid first** unless a peer you must serve requires a NIST-curve group. `X25519MLKEM768` is the usual starting point.
3. **Reorder key-exchange groups, not just enable them.** Place the hybrid groups ahead of classical-only ECDHE groups in `supported_groups` so a peer that supports both negotiates the hybrid.
4. **Monitor handshake failures.** Some legacy peers and middleboxes may reject the larger ClientHello. Track connection-error rates per endpoint through the rollout, and set your own threshold for rollback.
5. **Keep a classical fallback group enabled** until telemetry confirms every meaningful client has moved to a hybrid-capable build.

Do not remove ECDHE entirely during this phase. The point of hybrid is exactly that — the classical component protects you if ML-KEM is ever found weak.

## Section 3: What to Enable Now — Hybrid SSH Key Exchange

Administrative SSH is the highest-leverage place to reduce harvest-now exposure because operators reuse these sessions for years. [OpenSSH 10.0 was released on 2025-04-09](https://www.openssh.com/txt/release-10.0), and the [OpenSSH project](https://www.openssh.org/) is the reference for its releases. Review your `KexAlgorithms` line in `sshd_config` and `ssh_config`, and run `ssh -Q kex` on your own build to confirm which hybrid ML-KEM-based exchanges it supports.

Practical steps for SSH:

1. **Standardize on OpenSSH 10.0 or later across the jump-host fleet.** Older daemons may be missing the ML-KEM-based KEX entries entirely.
2. **Set `KexAlgorithms` explicitly** to put the hybrid PQ/T KEX first, followed by your existing classical curves.
3. **Test from a representative sample of client platforms** — Linux, macOS, and Windows (OpenSSH Win32 or third-party builds) — to confirm the negotiated algorithm in `ssh -vvv` output.
4. **Disable weak classical KEX algorithms** that you may have left enabled for legacy device compatibility; do this after confirming nothing in the fleet relies on them.
5. **Re-key long-lived tunnels** by reconnecting established sessions so that the new KEX is actually used.

Both ends matter. The server must offer a hybrid KEX and the client must offer it too. A hybrid-capable client talking to a non-hybrid server still gets only classical protection, so update clients as well as `sshd`.

## Section 4: Sequencing the Migration

You cannot migrate every endpoint on the same day. Sequence the work by exposure and data lifetime.

| Phase | Scope | Action | Done-when signal |
|---|---|---|---|
| 0 | Inventory | Complete the asset sheet from Section 1 | All eight inventory categories have owners and statuses |
| 1 | Public TLS edge | Enable `X25519MLKEM768` and keep classical fallback | Hybrid share of handshakes meets a target you set on your dashboard |
| 2 | SSH fleet | Upgrade to OpenSSH 10.0+ and set explicit `KexAlgorithms` | All bastion hosts show PQ/T KEX in `ssh -vvv` |
| 3 | Internal TLS | Roll hybrid to service mesh, API gateways, and DB TLS | Mesh-wide KEX telemetry shows hybrid dominance |
| 4 | PKI refresh | Plan certificate reissues on your normal lifecycle, using FIPS 204 and FIPS 205 as the signature references | Reissue pipeline tested in staging |
| 5 | VPN, IPsec, hardware | Engage vendors for roadmaps; track long-lifecycle devices separately | Vendor PQC roadmap dates logged per asset |
| 6 | Crypto-agility | Wrap KEX, signature, and algorithm selection in a config-driven layer so the next swap is mechanical | A change to a config flag flips the algorithm fleet-wide |

Two planning documents should sit alongside this sequence. [NIST IR 8547](https://csrc.nist.gov/pubs/ir/8547/ipd) (initial public draft), *Transition to Post-Quantum Cryptography Standards*, describes NIST's expected approach to transition from quantum-vulnerable algorithms to post-quantum signature and key-establishment schemes. Treat it as a draft framework: do not pre-commit to disallowance dates from it, and check the live NIST page for its current status. The [CISA PQC Initiative](https://www.cisa.gov/quantum) page sets the policy context for U.S. critical infrastructure and federal reporting expectations.

## Section 5: Comparison Table — Hybrid TLS Mechanisms in RFC 10024

| Mechanism | Classical component | ML-KEM parameter set | Best fit |
|---|---|---|---|
| `X25519MLKEM768` | X25519 ECDHE | ML-KEM-768 | Default for most public TLS endpoints |
| `SecP256r1MLKEM768` | NIST P-256 ECDHE | ML-KEM-768 | Environments with FIPS-aligned curves as a baseline |
| `SecP384r1MLKEM1024` | NIST P-384 ECDHE | ML-KEM-1024 | High-value, long-lived, or regulated sessions |

All three are PQ/T hybrid key agreement mechanisms for TLS 1.3 defined by [RFC 10024](https://www.rfc-editor.org/info/rfc10024) and all combine ML-KEM with ECDHE. This guide does not publish performance numbers for these mechanisms; benchmark them on your own hardware before choosing a default for latency-sensitive endpoints. The right default for most teams in 2026 is `X25519MLKEM768` on the public edge and a stronger option on a short list of high-value endpoints. For the wider deployment picture, the [NIST post-quantum cryptography project](https://csrc.nist.gov/projects/post-quantum-cryptography) and the [Cloudflare post-quantum internet report](https://blog.cloudflare.com/pq-2025/) are the places to track adoption.

## Section 6: Operational Hygiene That Pays Off Twice

- **Turn on cryptographic-agility knobs.** Read KEX and signature choices from configuration, not from compiled defaults, so that the next algorithm swap is a config change rather than a redeploy.
- **Capture handshake telemetry.** For TLS, export the negotiated group from your edge logs; for SSH, periodically sample `ssh -vvv` output from representative clients.
- **Rehearse rollback.** Every hybrid rollout needs a tested rollback to the previous `KexAlgorithms` and group order. A ClientHello that a legacy middlebox drops is one failure mode to plan for.
- **Document the "why."** Each row in the inventory should record not just the current state but the rationale, so that future operators understand the security and compatibility trade-offs that were made.

## Section 7: FAQ

**Q: Is ML-KEM the right algorithm to focus on first?**
A: Yes for key establishment. [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final) standardizes ML-KEM with three parameter sets (ML-KEM-512, ML-KEM-768, ML-KEM-1024). For signatures, the same-day-approval family also includes [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final) and [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final), but signature migration is a longer project because it touches PKI and code signing.

**Q: Do I have to disable classical key exchange?**
A: No. Hybrid mechanisms defined in [RFC 10024](https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem/) carry both a classical ECDHE component and an ML-KEM component; the session is protected if either holds. Disable pure-classical fallback only after telemetry confirms every meaningful peer negotiates a hybrid.

**Q: Which OpenSSH release should I standardize on?**
A: [OpenSSH 10.0](https://www.openssh.com/txt/release-10.0), released 2025-04-09, is the baseline this guide uses. Confirm with `ssh -Q kex` on your own build which hybrid KEX names it offers before you remove any classical-only fallback.

**Q: Where do I find the authoritative transition guidance?**
A: [NIST IR 8547](https://csrc.nist.gov/pubs/ir/8547/ipd) (initial public draft) describes NIST's expected approach to the transition. Treat its current text as the migration framework, not as a finalized schedule.

**Q: What's the single highest-impact change in 2026?**
A: Enable `X25519MLKEM768` on the public TLS edge and upgrade the SSH fleet to OpenSSH 10.0 with an explicit `KexAlgorithms` list. Those two changes address the most exposed sessions first.

## The Bottom Line

Inventory first, enable hybrid second, sequence by exposure third. [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final) and its siblings [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final) and [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final) are final; the on-the-wire mechanisms defined in [RFC 10024](https://www.rfc-editor.org/info/rfc10024) are published; and [OpenSSH 10.0](https://www.openssh.com/txt/release-10.0) is in your package manager. The work for security teams in 2026 is operational: complete the inventory, flip the switches in the right order, and keep the rollback path warm.

## How This Guide Was Built

This guide is based on NIST, CISA, IETF and vendor documentation; we did not run these configurations hands-on. Facts come from the official sources linked inline, and the operational sequencing is the author's recommendation: [NIST FIPS 203](https://csrc.nist.gov/pubs/fips/203/final), the [CISA PQC Initiative page](https://www.cisa.gov/quantum), [NIST IR 8547 (initial public draft)](https://csrc.nist.gov/pubs/ir/8547/ipd), [IETF RFC 10024](https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem/), and the [OpenSSH 10.0 release notes](https://www.openssh.com/txt/release-10.0). No statistics or vendor numbers are quoted, and no benchmarks were run.
