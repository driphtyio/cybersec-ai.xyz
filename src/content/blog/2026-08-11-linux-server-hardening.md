---
title: "Linux Server Hardening: Complete Security Checklist 2026"
description: "Microsoft's 2024 Digital Defense Report logged 7,000 password attacks/sec and >99% of 600 million daily incidents as identity-based, making Linux…"
pubDate: "2026-08-11"
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/linux-server-hardening-1786474537.webp"
tags:
  - "linux-security"
  - "server-hardening"
  - "ssh"
  - "sysadmin"
  - "devsecops"
lastVerified: "2026-08-11"
---

In the battle for server security, automated attacks are relentless. Microsoft's Digital Defense Report 2024 revealed they blocked over 7,000 password attacks per second, a staggering figure that underscores why a single weak credential can be your downfall [Source](https://www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2024). This guide on **how to harden a Linux server for beginners** provides an actionable checklist to move beyond default settings. With identity attacks making up more than 99% of the 600 million incidents they observed daily, hardening your Linux server is not optional—it's foundational.

The threat is constant, but the defenses are within your control. By systematically applying these configurations, you can dramatically reduce your attack surface. This checklist is designed for both new administrators learning the ropes and seasoned pros looking to audit their standard build.

## How This Guide Was Built

This guide is built from official documentation from Ubuntu, Red Hat, and Fedora, plus NIST SP 800-123, CIS benchmarks, and Microsoft's 2024 threat telemetry. Every source URL was verified live on August 11, 2026. The author is a working sysadmin who has hardened production Linux servers — no live systems were tested for this article.

## Lock Down SSH: Keys, No Root, No Password Auth

SSH is the primary gateway to your server and the first line of defense. Secure it by eliminating password authentication and direct root access. Modern OpenSSH installations have sensible defaults; for example, `PermitRootLogin` now defaults to `prohibit-password`, and `PasswordAuthentication` defaults to `yes` [Source](https://man7.org/linux/man-pages/man5/sshd_config.5.html). Your job is to override these securely.

Start by generating a strong key pair. Ubuntu's security documentation explicitly recommends the Ed25519 algorithm for its superior security and performance: `ssh-keygen -t ed25519` [Source](https://ubuntu.com/server/docs/how-to/security/openssh-server/). Copy the public key to your server and then harden the configuration by adding the following directives in a file within `/etc/ssh/sshd_config.d/`, a practice that allows for modular and maintainable configuration [Source](https://ubuntu.com/server/docs/how-to/security/openssh-server/).

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
DebianBanner no
```

Apply changes safely by testing the configuration with `sudo sshd -t` before restarting the service.

Brute-force protection is the other half of the SSH story. Install fail2ban (`sudo apt install fail2ban`), then copy the default configuration with `sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local` — the packaged `jail.conf` is overwritten on upgrades, so you edit the copy. The `sshd` jail is enabled by default and bans an IP for roughly 10 minutes after 5 failed authentication attempts [Source](https://github.com/fail2ban/fail2ban). Two small but worthwhile extras: run `chmod go-w ~/.ssh/authorized_keys` so your key file is not group- or world-writable, and keep `DebianBanner no` (above) so banner grabbers cannot read your OpenSSH version. Changing the SSH port away from 22 is optional defense-in-depth: it reduces automated scan noise but is not a substitute for key-based authentication.

## Turn On the Firewall: UFW, iptables, and nftables Basics

A firewall is a non-negotiable barrier. All Linux firewall tools interact with the netfilter kernel module, but the user-facing tools vary. nftables is the modern successor to iptables and is the default on distributions like RHEL 9 [Source](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page). For beginners and many admins, UFW (Uncomplicated Firewall) provides a user-friendly frontend that ships disabled on Ubuntu by default.

Enable it with a default deny policy: `sudo ufw enable`. Before locking yourself out, allow your management port, typically SSH: `sudo ufw allow 22`. UFW's principles are straightforward and align with best practices: block everything by default, then only permit what is explicitly required [Source](https://ubuntu.com/server/docs/how-to/security/firewalls/). This simple layer stops most opportunistic scanning and attacks.

## Automate Security Updates: unattended-upgrades and dnf-automatic

Unpatched software is a leading cause of breaches. Automating security updates is critical. On Debian/Ubuntu, the `unattended-upgrades` package can be configured to automatically install security updates, which it does by default [Source](https://wiki.debian.org/UnattendedUpgrades). On Red Hat-based systems, `dnf-automatic` provides similar functionality; you enable the timer with `sudo systemctl enable --now dnf-automatic-install.timer` [Source](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_software_with_the_dnf_tool/assembly_automating-software-updates-in-rhel-9_managing-software-with-the-dnf-tool).

This automation ensures critical vulnerabilities are patched without manual intervention, closing a common window of exposure.

## Users & Permissions: Least Privilege with sudo

The principle of least privilege dictates that users and processes should only have the access necessary to perform their function. The NIST SP 800-123 guideline explicitly recommends this as a core security practice [Source](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-123.pdf). In practical terms, this means avoiding the use of the root account for daily tasks.

Create individual user accounts and grant administrative privileges judiciously via `sudo`. Instead of editing the sudoers file directly, add your trusted user to the admin group: `sudo usermod -aG sudo <username>`. This provides a clear audit trail and prevents accidental system-wide changes.

## Harden the File System: Mount Options and Audit Logging

File system hardening involves both mount options and monitoring. Apply `noexec,nodev,nosuid` to world-writable directories like `/tmp`, `/var/tmp`, and `/dev/shm` in `/etc/fstab` to prevent execution of binaries and device file exploits [Source](https://man7.org/linux/man-pages/man5/fstab.5.html). More broadly, enable audit logging to track changes to critical files and system calls, creating a forensic record of system activity.

Distribution-specific CIS benchmarks, such as the one for Ubuntu, bundle hundreds of configuration recommendations covering mounts, permissions, auditing, and more — a practical roadmap for a full hardening audit [Source](https://www.cisecurity.org/benchmark/ubuntu_linux). Red Hat's security guidance adds a related layout tip: place `/var/log/audit/` on a separate mount so audit records cannot fill the root filesystem and are harder for an attacker to tamper with [Source](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/security_hardening/auditing-the-system_security-hardening).

Regularly review permissions and ownership on sensitive files like `/etc/shadow` and `/etc/passwd`. Using tools like `ls -l` and `find` with permission parameters helps identify misconfigurations that could be exploited for privilege escalation.

## Shrink the Attack Surface: Disable Unused Services and Harden systemd Units

Every running service is a potential attack vector, and default installations ship with more enabled than most servers need. Conduct a thorough audit of enabled services with `systemctl list-unit-files --type=service`. Disable any that are not required for the server's function: `sudo systemctl disable --now <service>`. A smaller service footprint means fewer paths for an attacker to exploit.

For services that must run, use `systemd-analyze security` to evaluate and improve their isolation. This tool audits the unit's configuration and assigns an exposure level, offering concrete suggestions for sandboxing and privilege reduction [Source](https://man7.org/linux/man-pages/man1/systemd-analyze.1.html). This proactive step significantly reduces the risk if a service is compromised.

## Watch the Logs: journalctl and auditd Basics

You cannot protect what you cannot see. Centralized log monitoring is essential for detecting breaches and troubleshooting issues. `journalctl` is the primary tool for querying the systemd journal — for example, monitor SSH login attempts in real-time with `journalctl -u ssh.service -f`, or filter by time and severity with `journalctl --since "1 hour ago"` and `journalctl -p err` [Source](https://man7.org/linux/man-pages/man1/journalctl.1.html).

For deeper, kernel-level auditing, configure `auditd`: start it with `sudo service auditd start`, enable it at boot with `sudo systemctl enable auditd`, and define persistent rules under `/etc/audit/rules.d/`. Add rules on the fly with `auditctl` — for example, watch the SSH daemon configuration with `auditctl -w /etc/ssh/sshd_config -p warx -k sshd_config`. Search captured events with `ausearch -k sshd_config` and summarize activity with `aureport` [Source](https://man7.org/linux/man-pages/man8/auditd.8.html). Audit logging is a hard requirement, not a nice-to-have, for compliance with PCI-DSS, FISMA, and STIG [Source](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/security_hardening/auditing-the-system_security-hardening). Regularly reviewing logs for anomalies like failed `sudo` attempts, unusual user logins, or file permission changes is a core operational security habit.

## Putting It Together: The 10-Command Quick Start

This condensed checklist combines the most critical steps from every section above into a single runbook. Execute these commands on a fresh Ubuntu server to establish a strong security baseline. Run them one at a time, test SSH access from a second terminal before logging out, and adapt the service name to your workload.

```bash
ssh-keygen -t ed25519
chmod go-w ~/.ssh/authorized_keys
sudo sshd -t && sudo systemctl restart ssh
sudo ufw enable
sudo ufw allow 22
sudo apt install unattended-upgrades && sudo dpkg-reconfigure unattended-upgrades
sudo usermod -aG sudo <user>
sudo systemctl disable --now <service>
systemd-analyze security <service>
journalctl -u ssh.service -f
```

Remember to replace `<user>` and `<service>` with actual values. This list forms a practical starting point; further hardening is always recommended. For related practices, consider reading our guide on [API security hardening](/blog/2026-08-04-api-security-hardening/) to protect your application layer, or learn about [common bot and exploit patterns](/blog/2026-08-09-bots-exploits/) that these measures will block.

## FAQ

Quick answers to the questions new administrators ask most often when hardening their first servers, from disabling root login to choosing a non-default SSH port. Each answer expands on a section above and points to the official documentation for deeper reading.

### Why should I disable root login over SSH?

Disabling direct root login over SSH is a fundamental security practice. It prevents brute-force attacks specifically targeting the most powerful account on your system. If an attacker needs to gain root access, they must first compromise a standard user account, adding a critical layer of difficulty and detection opportunity. It also enforces a cleaner audit trail, as actions are tied to individual user accounts rather than a shared root session.

### Is changing the SSH port worth it?

Changing the default SSH port from 22 provides a minor security benefit through "security through obscurity." It dramatically reduces the volume of automated, script-kiddie scans and brute-force attempts that target the default port. However, it is not a substitute for proper authentication controls like SSH keys. Port knocking or using a VPN for management access are more robust alternatives if exposing SSH to the internet is a concern.

### How do I enable automatic security updates on Ubuntu?

The most straightforward method is to install and configure the `unattended-upgrades` package. After installation with `sudo apt install unattended-upgrades`, run `sudo dpkg-reconfigure unattended-upgrades` and select "Yes" to enable it. By default, this will automatically download and install security updates for supported packages. You can review and modify its behavior in `/etc/apt/apt.conf.d/50unattended-upgrades`.

A secure server is a maintained server. Implementing this checklist is a major step forward, but remember that security is an ongoing process of monitoring, patching, and adaptation. Regularly review your configurations and stay informed about new threats to ensure your defenses remain effective.

<!-- crosslinks -->

## 📖 Related Reads

- **[CodeIntel Log](https://codeintel.xyz/)** — code quality, debugging, and software engineering benchmarks

*Cross-links automatically generated from None.*
