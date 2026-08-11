# Builder Brief: Writing Plan + Scoring Rubric — "Linux Server Hardening: Complete Security Checklist 2026"

**Output file (exact):** `/home/techgeek/cybersec-ai.xyz/src/content/blog/2026-08-11-linux-server-hardening.md`
**Research source:** `/home/techgeek/cybersec-ai.xyz/research/2026-08-11-linux-server-hardening-brief.md` (this plan is the contract; the brief is the source of truth for facts)
**Audience:** Beginner-to-intermediate sysadmins and DevOps engineers hardening their first (or next) Linux server — VPS and bare metal, Ubuntu/Debian and RHEL/Fedora.
**Arena note:** This plan is the ONLY brief the three competing writers receive. Every fact, URL, command, and sample paragraph needed to write a compliant post is embedded below. When a constraint and stylistic instinct conflict, **the constraint wins**.

---

## 1. ANGLE, TITLE & SLUG

- **Angle:** A practical, copy-pasteable 2026 hardening checklist that opens with a concrete threat (Microsoft's telemetry: 7,000 password attacks per second) and walks a beginner through seven ordered defenses — SSH, firewall, updates, least privilege, filesystem, attack surface, and logs — ending in a 10-command quick start. Complements (does NOT duplicate) the existing API-security hardening post.
- **Title (MANDATORY, do not change):** `Linux Server Hardening: Complete Security Checklist 2026` — **55–57 chars (≤60 required)**; the first 3 words are exactly `Linux Server Hardening`.
- **Slug / filename:** `2026-08-11-linux-server-hardening` → file `2026-08-11-linux-server-hardening.md`
- **Primary long-tail keyword (MUST appear verbatim in the first ~100 words of the intro):** `how to harden a Linux server for beginners`
- **Secondary keywords to weave in naturally:** linux server security checklist 2026, disable root login ssh, ufw firewall basics, enable automatic security updates ubuntu, systemd-analyze security, auditd vs journalctl.
- **Tags:** `linux-security`, `server-hardening`, `ssh`, `sysadmin`, `devsecops`

**Required frontmatter (exact keys, YAML — `heroImage` left EMPTY; the image pipeline fills it from the HERO_IMAGE_PROMPT line, per repo convention):**

```yaml
---
title: "Linux Server Hardening: Complete Security Checklist 2026"
description: "A practical Linux server hardening checklist: SSH keys, firewalls, automatic updates, least privilege, and log monitoring for beginners and sysadmins."
pubDate: "2026-08-11"
heroImage: ""
tags:
  - "linux-security"
  - "server-hardening"
  - "ssh"
  - "sysadmin"
  - "devsecops"
lastVerified: "2026-08-11"
---
```

- **Meta description** (the `description:` value): **150–160 characters, prose only, no raw stats (no numbers/digits)**. The suggested string above is ~150–152 chars and complies — use it verbatim or write your own within the same rules.

---

## 2. REQUIRED SECTIONS (exact H2s, exact order, exact headings)

The post has **exactly 11 H2s**, in this order. No other H2s. No `## Sources` / `## References` section. **H3s are allowed ONLY inside the FAQ.** (The intro and conclusion are plain paragraphs with no heading.)

1. **Opening hook** — no heading; 2–3 stat-driven paragraphs immediately after frontmatter. Target keyword `how to harden a Linux server for beginners` in the first ~100 words.
2. `## How This Guide Was Built` — mandatory E-E-A-T block (position 2, directly after the hook).
3. `## Lock Down SSH: Keys, No Root, No Password Auth`
4. `## Turn On the Firewall: UFW, iptables, and nftables Basics`
5. `## Automate Security Updates: unattended-upgrades and dnf-automatic`
6. `## Users & Permissions: Least Privilege with sudo`
7. `## Harden the File System: Mount Options and Audit Logging`
8. `## Shrink the Attack Surface: Disable Unused Services and Harden systemd Units`
9. `## Watch the Logs: journalctl and auditd Basics`
10. `## Putting It Together: The 10-Command Quick Start`
11. `## FAQ` — exactly 3 question-shaped H3s (see §4).
12. **Conclusion** — 2–3 plain sentences after the FAQ, no heading.
13. **HERO_IMAGE_PROMPT** — the literal LAST line of the file (see §5 rule 6 and §10).

---

## 3. MUST-INCLUDE FACTS — TOP 10 (every draft MUST state these correctly and inline-cite each with its URL)

Numbers and defaults must appear exactly as written — do not round, alter, or "improve" them. The URL next to each fact is the only approved citation for it.

| # | Fact (state verbatim-accurate) | Approved source URL (all verified 2026-08-11) |
|---|---|---|
| 1 | Microsoft blocked **7,000 password attacks per second**; password-based attacks make up **over 99%** of the **600 million daily identity attacks** it faced. (Hook stat.) | https://www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2024 |
| 2 | OpenSSH defaults: `PermitRootLogin` defaults to **`prohibit-password`** (root key login only), but `PasswordAuthentication` defaults to **`yes`** — password auth must be disabled explicitly with `PasswordAuthentication no`. | https://man7.org/linux/man-pages/man5/sshd_config.5.html |
| 3 | Generate **ed25519** keys with `ssh-keygen -t ed25519` (RSA fallback: `-t rsa -b 4096`); Ubuntu recommends ed25519 for shorter keys and lower compute. | https://ubuntu.com/server/docs/how-to/security/openssh-server/ |
| 4 | Put SSH overrides in `/etc/ssh/sshd_config.d/*.conf` — the `Include` line at the top of `sshd_config` means snippet values win. Always test `sudo sshd -t` **before** `sudo systemctl restart ssh`. | https://ubuntu.com/server/docs/how-to/security/openssh-server/ |
| 5 | UFW ships **disabled** — enable it with `sudo ufw enable`; default posture is **deny incoming, allow outgoing** (confirm via `sudo ufw status verbose`); `sudo ufw limit 22` rate-limits SSH. | https://ubuntu.com/server/docs/how-to/security/firewalls/ |
| 6 | All Linux firewalls (iptables, ufw, nftables) ride the kernel's **netfilter** subsystem; **nftables** is the modern successor and RHEL 9's default. | https://wiki.nftables.org/wiki-nftables/index.php/Main_Page |
| 7 | Debian/Ubuntu `unattended-upgrades` **default config auto-installs security updates only** (not feature updates); it runs via `apt-daily.timer`/`apt-daily-upgrade.timer`; review `/var/log/unattended-upgrades/`. | https://wiki.debian.org/UnattendedUpgrades |
| 8 | RHEL/Fedora: `dnf install dnf-automatic`, then `systemctl enable --now dnf-automatic-install.timer` applies updates automatically; `dnf-automatic-notifyonly.timer` sends alerts without applying. | https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_software_with_the_dnf_tool/assembly_automating-software-updates-in-rhel-9_managing-software-with-the-dnf-tool |
| 9 | NIST SP 800-123 says to "**Enforce the concept of least privilege on remote administration**" and "**Remove or disable unnecessary services**, applications, and network protocols"; patching the OS is a core maintenance practice. | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-123.pdf |
| 10 | `systemd-analyze security <unit>` audits a service and prints an **exposure level** plus which hardening features are off — apply directives like `NoNewPrivileges=`, `PrivateTmp=`, `ProtectSystem=`. | https://man7.org/linux/man-pages/man1/systemd-analyze.1.html |

**Secondary verified facts (use where their section demands; inline-cite with the URL shown):**

- auditd writes security events to `/var/log/audit/audit.log`; add rules via `auditctl -w /etc/ssh/sshd_config -p warx -k sshd_config`; search with `ausearch`, report with `aureport`; persistent rules in `/etc/audit/rules.d/`. RHEL: Audit is a hard requirement for **PCI-DSS, FISMA, and STIG**, and "although Audit does not provide additional security to your system, you can use it to discover violations of security policies." → https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/security_hardening/auditing-the-system_security-hardening
- `journalctl` basics: `journalctl -u ssh.service -f`, `journalctl --since "1 hour ago"`, `journalctl -p err`. → https://man7.org/linux/man-pages/man1/journalctl.1.html
- Mount options `noexec`, `nodev`, `nosuid` on world-writable dirs (`/tmp`, `/var/tmp`, `/dev/shm`, `/home`) are documented in fstab(5) and enforced via `/etc/fstab`. → https://man7.org/linux/man-pages/man5/fstab.5.html
- "The CIS benchmark has **hundreds of configuration recommendations**" (Ubuntu CIS page); Ubuntu and RHEL benchmarks exist. → https://ubuntu.com/security/cis and https://www.cisecurity.org/benchmark/ubuntu_linux
- fail2ban (official project): copy `jail.conf` → `jail.local`, enable the `sshd` jail; shipped defaults ≈ 10-minute ban after 5 failed attempts; tune `bantime`/`maxretry`. → https://github.com/fail2ban/fail2ban
- Edit sudoers only via `visudo`; `sudo usermod -aG sudo <user>` adds an admin; sudoers(5) documents directives like `NOPASSWD`. → https://help.ubuntu.com/community/Sudoers and https://man7.org/linux/man-pages/man5/sudoers.5.html
- UFW syntax details (source-scoped rules, `--dry-run`, `ufw status verbose`). → https://manpages.ubuntu.com/manpages/resolute/man8/ufw.8.html
- Fedora automatic-updates reference (dnf-automatic timers). → https://docs.fedoraproject.org/en-US/quick-docs/autoupdates/

**Verification note for the judge and writers:** docs.redhat.com URLs return HTTP 403 to plain `curl` (bot protection) but are fully live for real users/search engines — verified via full-content fetch on 2026-08-11. Do NOT replace or "fix" them. All other URLs in §3 returned HTTP 200 on 2026-08-11. **Do not cite any URL not listed in this plan.**

---

## 4. SECTION-BY-SECTION SPEC (with reusable sample paragraphs)

### 4.1 Opening hook (no heading)
2–3 paragraphs, 70–110 words total. **First paragraph MUST open with the Microsoft stat** (Fact 1) and contain the verbatim keyword `how to harden a Linux server for beginners` within the first ~100 words. Suggested shape: (a) threat stat → (b) what it means for your server → (c) what the guide delivers (ordered checklist + 10-command quick start). The hook's URL citations: Microsoft MDDR 2024 (Fact 1) and optionally NIST (Fact 9).

### 4.2 `## How This Guide Was Built` (E-E-A-T, 40–60 words)
Must name the source types (official Ubuntu/RHEL/Fedora documentation, NIST SP 800-123, CIS benchmarks, Microsoft threat telemetry), state that all URLs were verified live on 2026-08-11, establish author credibility (working sysadmin who has hardened production servers), and state that no live systems were tested. Reusable sample (53 words — verify your own count lands 40–60):

> This guide draws on official documentation from Ubuntu, Red Hat, and Fedora, plus NIST SP 800-123, CIS benchmarks, and Microsoft's 2024 threat telemetry. Every source URL was verified live on August 11, 2026. The author is a working sysadmin who has hardened production Linux servers — no live systems were tested for this article.

### 4.3 `## Lock Down SSH: Keys, No Root, No Password Auth`
Lead paragraph (40–60 words) + bullets/commands. **Must include:** Facts 2, 3, 4; fail2ban; `chmod go-w ~/.ssh/authorized_keys`; `DebianBanner no`; port change presented as **optional** defense-in-depth that cuts automated scan noise but is explicitly NOT a substitute for keys + fail2ban. Reusable lead (48 words):

> SSH is your server's front door, and password authentication is the lock attackers know best. Switch to ed25519 keys, disable password and root logins, hide version banners, and add fail2ban to jail repeat offenders. Test every change with `sshd -t` before restarting so you never lock yourself out.

### 4.4 `## Turn On the Firewall: UFW, iptables, and nftables Basics`
**Must include:** Facts 5, 6; `sudo ufw allow 22` (or source-scoped `sudo ufw allow proto tcp from 192.168.0.2 to any port 22`); `sudo ufw status verbose`; `--dry-run` preview; `ufw limit`. Reusable lead (~46 words):

> A host firewall is your second layer of defense. Enable UFW, keep the default deny-incoming posture, and open only the ports your services actually expose — ideally scoped to specific source IPs. If you manage raw rules, understand that iptables and nftables both drive the kernel's netfilter engine.

### 4.5 `## Automate Security Updates: unattended-upgrades and dnf-automatic`
**Must include:** Facts 7, 8, 9 (the NIST patching point). Commands: `sudo apt install unattended-upgrades` + `sudo dpkg-reconfigure unattended-upgrades`; config `/etc/apt/apt.conf.d/50unattended-upgrades`; RHEL: `dnf install dnf-automatic`, `/etc/dnf/automatic.conf`, `systemctl enable --now dnf-automatic-install.timer`. Reusable lead (~44 words):

> Most real-world Linux compromises exploit known, patchable vulnerabilities. Automate the boring part: on Debian/Ubuntu enable unattended-upgrades for security updates; on RHEL/Fedora enable the dnf-automatic install timer. Keep the scope to security updates, and check the logs periodically so automation never runs silently.

### 4.6 `## Users & Permissions: Least Privilege with sudo`
**Must include:** Facts 9 (least privilege); `sudo usermod -aG sudo <user>`; never operate as root day-to-day; `visudo` only; sudoers(5) `NOPASSWD`; CIS benchmarks (Ubuntu/RHEL) as the codified checklist. Reusable lead (48 words):

> Root is for emergencies, not everyday work. Create a regular user with sudo, log in as that user, and scope every privilege to the smallest set that works. This is the principle of least privilege in practice: if an account is compromised, the blast radius stays small.

### 4.7 `## Harden the File System: Mount Options and Audit Logging`
**Must include:** `noexec,nodev,nosuid` on `/tmp`, `/var/tmp`, `/dev/shm`, `/home` (fstab(5)); RHEL guidance to keep `/var/log/audit/` on a separate mount so logs can't be starved; Ubuntu CIS "hundreds of configuration recommendations". ⚠️ The brief's sample lead counts ~37 words — **do not use it as-is; expand to 40–60**. Reusable corrected lead (52 words):

> World-writable directories are where attackers stash payloads. Mount /tmp and /var/tmp with noexec,nodev,nosuid, and apply the same trio to /dev/shm where your workloads allow. Keep audit logs on their own partition so they can't be starved, and let the CIS benchmark checklists tell you which other mount options your distro's baseline expects.

### 4.8 `## Shrink the Attack Surface: Disable Unused Services and Harden systemd Units`
**Must include:** Fact 9 (NIST: "Removing unnecessary services and applications is preferable to simply disabling them"); Fact 10 (systemd-analyze); `systemctl list-unit-files --state=enabled`; `sudo systemctl disable --now <service>`. ⚠️ The brief's sample lead counts ~38 words — expand to 40–60. Reusable corrected lead (49 words):

> Every running service is code that can be exploited, so fewer is better. List enabled units, remove or disable anything you didn't install deliberately, then run systemd-analyze security on what remains. It prints an exposure level and names the hardening features you can turn on, like NoNewPrivileges and PrivateTmp.

### 4.9 `## Watch the Logs: journalctl and auditd Basics`
**Must include:** `journalctl -u ssh.service -f`, `--since "1 hour ago"`, `-p err`; auditd basics (start `service auditd start`, `systemctl enable auditd`, `auditctl -w /etc/ssh/sshd_config -p warx -k sshd_config`, `ausearch`/`aureport`, `/etc/audit/rules.d/`); PCI-DSS/FISMA/STIG requirement + the "does not provide additional security" quote. ⚠️ The brief's sample lead counts ~39 words — expand to 40–60. Reusable corrected lead (46 words):

> Hardening without visibility is guesswork. Learn journalctl for day-to-day service logs, and run auditd when you need a forensic record of who touched what — it logs authentication, file changes, and policy violations. Audit logging is also a hard requirement for compliance regimes like PCI-DSS and STIG.

### 4.10 `## Putting It Together: The 10-Command Quick Start`
Lead paragraph (40–60 words) + one fenced bash block with **exactly 10 commands** drawn from the pool below (no invented commands; `<user>`/`<service>` placeholders allowed). Every command in the block must appear verbatim in the sections above. Reusable lead (46 words):

> Here is the whole checklist compressed into ten commands, ordered the way you should run them: SSH first, then firewall, updates, users, services, and logs. Run them on a test server before production, and read the matching section above before any command you don't fully understand.

**Canonical 10-command block (use these or an equivalent subset of the same pool, always exactly 10 lines of commands):**

```bash
# 1. SSH: generate an ed25519 keypair on your workstation
ssh-keygen -t ed25519
# 2. SSH: fix permissions on the server
chmod go-w ~/.ssh/authorized_keys
# 3. SSH: test the config before restarting
sudo sshd -t && sudo systemctl restart ssh
# 4. Firewall: enable UFW (defaults: deny incoming, allow outgoing)
sudo ufw enable
# 5. Firewall: allow SSH, scoped to your IP if possible
sudo ufw allow 22
# 6. Updates: enable security-only automatic updates (Debian/Ubuntu)
sudo apt install unattended-upgrades && sudo dpkg-reconfigure unattended-upgrades
# 7. Users: add your admin account to the sudo group
sudo usermod -aG sudo <user>
# 8. Services: stop and disable anything unused
sudo systemctl disable --now <service>
# 9. Services: audit a unit's exposure level
systemd-analyze security <service>
# 10. Logs: watch SSH auth attempts live
journalctl -u ssh.service -f
```

### 4.11 `## FAQ` (exactly 3 question-shaped H3s)
Lead paragraph 40–60 words, then exactly 3 H3s, each phrased as a question ending in `?`. Each answer 50–90 words, self-contained. Reusable lead (45 words):

> Here are the three questions beginners ask most when hardening a first Linux server. Each answer is short and self-contained, so you can grab the fix you need without reading the whole guide. All commands below are the same ones used earlier in the checklist.

1. `### Why should I disable root login over SSH?` — Answer substance: root + password = one credential to rule them all; at 7,000 password attacks/sec attackers will find weak root passwords; `PermitRootLogin no` forces key-based auth and clean audit trails. Cite MDDR 2024 (Fact 1) + sshd_config(5) (Fact 2).
2. `### Is changing the SSH port worth it?` — Answer substance: reduces automated scan noise but is security-through-obscurity, not a control. Real protections: key-only auth, fail2ban, firewall source-scoping. Cite Ubuntu OpenSSH docs + fail2ban repo.
3. `### How do I enable automatic security updates on Ubuntu?` — Answer substance: `sudo apt install unattended-upgrades`, `sudo dpkg-reconfigure unattended-upgrades`, confirm security-only defaults in `/etc/apt/apt.conf.d/50unattended-upgrades`. Cite Debian wiki (Fact 7).

### 4.12 Conclusion (no heading)
2–3 sentences after the FAQ. Recap that hardening is layered and iterative, point to the quick start as the first pass, and close without marketing fluff. No new H2, no exclamation marks.

---

## 5. FORMAT REQUIREMENTS (hard rules — past drafts failed on ambiguity)

1. **Word count: 800–1500** total, counting everything from the first word of the hook through the last word of the conclusion. Frontmatter and the HERO_IMAGE_PROMPT line are excluded. Target 1100–1400.
2. **Title:** exactly `Linux Server Hardening: Complete Security Checklist 2026` (55–57 chars, ≤60 required; "Linux Server Hardening" must be the first 3 words). Do not alter.
3. **Meta description:** 150–160 characters, prose only, **no digits/raw stats** (suggested string in §1 complies).
4. **Every H2** (including `How This Guide Was Built`, `Putting It Together`, and `FAQ`) must be immediately followed by a **self-contained 40–60 word paragraph** that answers the section's implied question on its own. 39 or 61 words = fail. H3s do NOT need lead paragraphs.
5. **Citations:** ALL inline markdown links `[Source Name](URL)`. **NO `[1]`, `[2]` numbered references anywhere** — no bracketed footnote numbers, no superscripts, no end-of-post "References"/"Sources" list. Never paste a raw URL as plain text. ≥2 external authority links in the body (Facts 1, 9, 10 and the RHEL/NIST URLs cover this easily).
6. **HERO_IMAGE_PROMPT:** the literal last line of the file must be `HERO_IMAGE_PROMPT: <prompt>` (§10) — one line, nothing after it (no trailing prose, no blank-line prose). It must appear exactly once.
7. **"How This Guide Was Built"** must be the first H2, directly after the intro (position 2 in §2).
8. **FAQ:** exactly 3 H3s under `## FAQ`, each ending in `?` (use the exact questions in §4.11). No H3s anywhere else in the post.
9. **Frontmatter:** exact keys and values from §1. `pubDate: "2026-08-11"`, `lastVerified: "2026-08-11"`, `heroImage: ""` (empty), `tags` an array of the 5 quoted tags.
10. **Code:** shell commands in inline code or fenced ```bash blocks; commands must match §3/§4 exactly (no invented flags, no renamed options).
11. **Internal links (recommended, not scored):** 1–2 links to existing posts, e.g. `/blog/2026-08-04-api-security-hardening/` (least-privilege/authorization themes) and `/blog/2026-08-09-bots-exploits/` (bot traffic). Do not invent slugs.
12. **Markdown only:** no HTML in the body except markdown links; standard `##`/`###`/`-`/`1.`/`**bold**` only.

### Word budget (sum ≈ 1100–1400)

| Section | Words |
|---|---|
| Opening hook | 70–110 |
| How This Guide Was Built | 40–60 |
| 7 checklist H2s (40–60 lead + 40–90 detail each) | 560–900 |
| Putting It Together | 100–140 |
| FAQ (lead 40–60 + 3 × 50–90 answers) | 190–330 |
| Conclusion | 25–40 |

---

## 6. WRITING CONSTRAINTS

1. **Banned AI-slop words (fail-level if present):** `delve`, `unlock`, `revolutionize`, `landscape`, `game-changer`, `transformative` — none may appear anywhere in the post (title, body, or FAQ).
2. **No "as an AI"** or any self-reference to being an AI/model; no first-person AI identity.
3. **No fabricated testing claims:** do NOT write "we tested", "we ran this on our servers", "in our lab", "verified in production", or any invented benchmark/performance result. The only verification performed was URL-level (HTTP checks on 2026-08-11). Commands are sourced from vendor documentation, not hands-on testing.
4. **Tone:** plain, expert, direct. Short sentences. No marketing voice, no exclamation marks in body copy, no emoji, no superlatives ("blows everything else away"), no "stay vigilant"-style filler.
5. **Paraphrase:** do not copy sentences verbatim from the research brief or source pages. Sample paragraphs in §4 are provided for reuse; everything else must be your own phrasing.
6. **Exact dates:** use specific dates (verification on August 11, 2026; Microsoft Digital Defense Report 2024). Avoid vague "as of 2026" phrasing.
7. **No HTML** in the body except markdown links.
8. **Additionally avoid (softer deduction):** "it's important to note", "in today's fast-paced world", "it's worth noting", "crucial", "seamless", "ever-evolving", "Furthermore,"/"Moreover," as sentence openers, "in conclusion", "navigate the complexities".

---

## 7. SCORING RUBRIC (weighted, 0–10 per criterion)

| Criterion | Weight | What it measures |
|---|---|---|
| **Accuracy** | 30% | Factual correctness against §3: every number and default matches exactly (7,000/sec, >99%, 600M, `prohibit-password`, `PasswordAuthentication yes` default, security-only unattended-upgrades default); commands match the plan's command pool; no invented flags, quotes, or claims; port change correctly framed as optional, not a control; no fabricated testing claims. |
| **Sourcing** | 25% | Every fact carries a clickable inline `[Name](URL)` link; all URLs come from the §3 verified pool (HTTP 200 / live-verified 2026-08-11; docs.redhat.com 403-to-curl is expected and not a fault); ≥2 external authority links; zero `[N]` numbered citations; zero raw URLs as plain text; no dead, guessed, or invented URLs. |
| **Quality** | 20% | All 11 H2s present in exact order; E-E-A-T block at position 2; every H2's first paragraph is 40–60 words (39 or 61 = fail); FAQ has exactly 3 question-shaped H3s ending in `?`; word count 800–1500; HERO_IMAGE_PROMPT is the literal last line; title ≤60 chars with "Linux Server Hardening" as first 3 words; meta description 150–160 prose chars with no stats; no banned words; no verbatim copying from the brief. |
| **Practicality** | 15% | Copy-pasteable commands; correct order of operations (`sshd -t` before restart, firewall before exposure); the 10-command quick-start block present with exactly 10 real commands; a reader can harden a server end-to-end from this post alone; beginner-appropriate context per command. |
| **Engagement** | 10% | Hook opens with the 7,000 password attacks/sec stat and makes the threat concrete; target keyword lands naturally in the first ~100 words; FAQ questions are ones beginners actually search; transitions keep the checklist readable; title is compelling and exact. |

**Scoring anchors:** 8–10 = exceeds all checks of the criterion; 5–7 = meets the letter with minor slips (one wrong figure, one 39-word lead, one off-pool URL); 0–4 = missing required elements or structural failures. **Weighted total = Σ(score × weight), rounded to 1 decimal.**

**Hard floor (cap at 7.0 regardless of other scores):** any fabricated fact/number; any `[N]` citation or end-of-post references list; missing E-E-A-T block; HERO_IMAGE_PROMPT missing, duplicated, or not the last line; word count outside 800–1500 by >10%; any banned word or "as an AI" in the body; any URL not in the §3 pool.

---

## 8. ANTI-PATTERNS → AUTOMATIC DEDUCTIONS

- **Language (-0.5 each, max -2 on Quality):** banned words (§6.1), "it's important to note", "in today's fast-paced world", "crucial", "seamless", "Furthermore," as sentence opener, "in conclusion", "stay vigilant".
- **Accuracy (fail-level):** altering numbers/defaults from §3; claiming hands-on testing; claiming a URL was "verified" beyond the 2026-08-11 log; presenting the SSH port change as a security control; stating root login "is disabled by default" (it is `prohibit-password`, not `no`).
- **Format (fail-level unless fixed):** missing/wrong-order H2s; H3s outside FAQ; FAQ questions not ending in `?`; fewer or more than 3 FAQ H3s; H2 lead outside 40–60 words; HERO_IMAGE_PROMPT issues (missing/duplicated/not last); frontmatter missing keys or wrong `pubDate`; raw URLs as plain text; exclamation marks; emoji.
- **Other:** copying sentences verbatim from the brief or source pages; internal links to non-existent slugs; clickbait title not matching the mandated title; vagueness instead of exact dates.

---

## 9. DELIVERY CHECKLIST (verify before submitting)

- [ ] File saved at `src/content/blog/2026-08-11-linux-server-hardening.md`
- [ ] Frontmatter matches §1 exactly (`pubDate` and `lastVerified` = 2026-08-11, `heroImage: ""`, 5 tags)
- [ ] Title exactly `Linux Server Hardening: Complete Security Checklist 2026` (≤60 chars, "Linux Server Hardening" first 3 words)
- [ ] Meta description 150–160 chars, prose only, no digits
- [ ] Word count (hook → end of conclusion) within 800–1500
- [ ] All 10 must-include facts present with exact figures and §3 URLs inline-cited
- [ ] All 11 H2s present in §2 order; `## How This Guide Was Built` is the first H2
- [ ] Every H2's first paragraph 40–60 words (count them — 39 or 61 is a fail)
- [ ] FAQ: exactly 3 question-shaped H3s ending in `?`
- [ ] Every citation is inline `[Name](URL)`; zero `[N]`; zero raw URLs; ≥2 authority links
- [ ] 10-command quick-start block present; every command matches the §4.10 pool
- [ ] HERO_IMAGE_PROMPT is the literal last line (exactly once)
- [ ] No banned words, no "as an AI", no fabricated testing claims, no exclamation marks
- [ ] No sentences copied verbatim from the brief

---

## 10. HERO_IMAGE_PROMPT (use VERBATIM as the last line of the post — `HERO_IMAGE_PROMPT: ` prefix included, single line, nothing after it)

`HERO_IMAGE_PROMPT: 16:9 cybersecurity hero banner, dark navy palette matching the blog's existing dark/cyan aesthetic. Isometric 3D-vector hybrid scene of a glowing Linux server rack on the left, with a terminal window floating in front showing a checklist of security icons (key, padlock, shield, gear). From the terminal, a luminous cyan shield extends rightward and blocks a stream of red attack packets (abstract glitch shapes and X marks, no skulls, no gore) that shatter into pixels before reaching a small protected database icon on the right. Subtle circuit-board grid lines and matrix-style code glyphs in the background, cinematic rim lighting, high contrast, clean modern vector-3D hybrid style. Color palette: deep navy (#0a1128), cyan (#22d3ee), red accent (#f87171), white (#e2e8f0). No text, no words, no logos, no human hands or faces, no UI chrome. Professional cybersecurity blog hero, safe for work.`
