---
title: "The 9 Security Fixes Every SaaS Company Needs"
description: "Enterprise buyers check these 9 things before signing. Here's what they look for, why it matters, and how to fix each one in under 30 minutes."
pubDate: "2026-06-14"
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/img-20260614-230415-1781503463.jpg"
tags:
  - compliance
  - cloud-security
  - Enterprise Readiness
  - DevOps
---

Enterprise security teams have a checklist. It's not secret. They check the same 9 things on every domain they evaluate. Most SaaS companies fail 5 of them — not because the fixes are hard, but because nobody told them what to check.

This guide covers every check the [Security Posture Scanner](/scan/) runs, why each one matters to your buyers, and how to fix it in under 30 minutes.

---

## 1. HSTS (HTTP Strict Transport Security) {#1-hsts}

**Why it matters:** HSTS tells browsers to always use HTTPS for your domain. Without it, a man-in-the-middle attacker can downgrade a user's connection to HTTP on their first visit — even if your site supports HTTPS. Enterprise security teams treat missing HSTS as a basic hygiene failure.

**What buyers see:** "This vendor can't enforce HTTPS. What else aren't they enforcing?"

**How to fix:** Add this header to your web server or CDN configuration. On Cloudflare, enable "Always Use HTTPS" + "HSTS" in the SSL/TLS settings. On Nginx:

```
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
```

Use `max-age=31536000` initially, then increase to `63072000` after confirming no issues. Submit to the [HSTS preload list](https://hstspreload.org/) to protect first-time visitors.

---

## 2. CSP (Content Security Policy) {#2-csp}

**Why it matters:** CSP prevents XSS attacks by telling the browser exactly which sources of content are allowed to load. Without it, an attacker who finds a script injection point can execute arbitrary code in your users' browsers. SOC 2 auditors specifically check for CSP [1].

**What buyers see:** "Unrestricted script execution. One XSS away from account takeover."

**How to fix:** Start with a reporting-only policy to detect what your site actually needs:

```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self'; style-src 'self'; report-uri /csp-report
```

Monitor violations for a week, then switch to enforcement. For most SaaS apps, a policy of `default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'` covers common patterns.

---

## 3. X-Frame-Options {#3-xfo}

**Why it matters:** X-Frame-Options prevents your site from being embedded in an iframe on another domain. Without it, an attacker can overlay your login page on top of their site and steal credentials (clickjacking). This is a OWASP Top 10 issue [2].

**What buyers see:** "Clickjacking possible. Credential theft attack surface open."

**How to fix:** Add one line to your web server config:

```
X-Frame-Options: DENY
```

For most SaaS apps, `DENY` is correct. Use `SAMEORIGIN` only if you embed your own site in iframes (e.g., for dashboards).

---

## 4. X-Content-Type-Options {#4-xcto}

**Why it matters:** This header prevents MIME type sniffing. Without it, an attacker can upload a malicious file disguised as an image, and the browser may execute it as JavaScript. It's a single header that closes an entire attack class.

**What buyers see:** "MIME sniffing enabled. File upload XSS risk."

**How to fix:**

```
X-Content-Type-Options: nosniff
```

This is a one-line fix in any web server, CDN, or reverse proxy. No side effects.

---

## 5. HTTP → HTTPS Redirect {#5-https-redirect}

**Why it matters:** If your site doesn't redirect HTTP to HTTPS, users can accidentally connect over unencrypted HTTP. An attacker on the same network can intercept the request before the redirect happens. Enterprise buyers expect HTTPS to be mandatory, not optional.

**What buyers see:** "Unencrypted traffic accepted. Man-in-the-middle attack surface."

**How to fix:** On Cloudflare, enable "Always Use HTTPS" in SSL/TLS settings. On Nginx:

```
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

Test by visiting `http://yourdomain.com` — it should immediately redirect to `https://yourdomain.com`.

---

## 6. SPF (Sender Policy Framework) {#6-spf}

**Why it matters:** SPF specifies which mail servers are authorized to send email from your domain. Without it, anyone can send emails that appear to come from your company. Phishing attacks targeting your customers, partners, or employees become trivially easy.

**What buyers see:** "Anyone can spoof this company's email. Customer trust at risk."

**How to fix:** Add a TXT record to your DNS:

```
v=spf1 mx include:_spf.google.com include:spf.mandrillapp.com ~all
```

The `~all` means "soft fail" — emails from unauthorized servers are marked as suspicious but not rejected. Use `-all` (hard fail) once you're confident all your legitimate senders are covered. Check your email provider's SPF documentation for the correct include values.

---

## 7. DKIM (DomainKeys Identified Mail) {#7-dkim}

**Why it matters:** DKIM adds a cryptographic signature to your outgoing emails. Receiving servers verify the signature against your DNS record. This proves the email wasn't tampered with in transit. Without DKIM, your emails are more likely to land in spam folders — and enterprise buyers notice [3].

**What buyers see:** "Emails from this vendor can't be verified. Deliverability risk."

**How to fix:** Enable DKIM in your email provider's settings (Google Workspace, Outlook, SendGrid, etc.). They'll give you a DNS record to add:

```
default._domainkey TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ..."
```

After adding it, verify with `dig default._domainkey.yourdomain.com TXT`. Test with [DKIMvalidator.com](https://dkimvalidator.com).

---

## 8. DMARC (Domain-based Message Authentication, Reporting & Conformance) {#8-dmarc}

**Why it matters:** DMARC tells receiving servers what to do when an email fails SPF and DKIM checks. Without DMARC — or with a `p=none` policy — those failed emails still get delivered. Attackers can spoof your domain and the emails reach the inbox. With `p=reject`, spoofed emails are dropped.

65% of enterprise buyers check DMARC policies during vendor evaluation [4]. A missing or permissive policy is a red flag.

**What buyers see:** "Domain spoofable. Anyone can send phishing emails as this company."

**How to fix:** Start with monitoring to see who's sending email as your domain:

```
_dmarc TXT "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"
```

Check reports for a few weeks, then move to quarantine (spam folder) and eventually reject:

```
_dmarc TXT "v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=100"
```

---

## 9. No Redirects to External Domains {#9-external-redirects}

**Why it matters:** If your HTTPS URL redirects to a different domain (e.g., `yoursite.com` → `yoursite.netlify.app`), enterprise buyers see it as a control issue. Who owns the other domain? What's their security posture? Can they change your content?

**What buyers see:** "Content hosted on third-party domain. Loss of control over security."

**How to fix:** Use a CNAME or reverse proxy so your custom domain serves content directly. On Cloudflare Pages, add the custom domain in the project settings — traffic stays on your domain. Never use 301 redirects from your primary domain to a hosting provider's URL.

---

## What To Do Next

Run the **[Security Posture Scanner](/scan/)** against your domain. It checks all 9 items in 10 seconds.

Check your score. If it's below 70, you have work to do. Every fix on this page takes under 30 minutes — and every fix removes a reason for an enterprise buyer to say no.

The companies that close enterprise deals aren't the ones with the best product. They're the ones that make it easiest for the buyer to say yes. Fixing these 9 items costs almost nothing. Losing one deal because you didn't costs everything.

---

[1] SOC 2 Trust Services Criteria, CC6.1 — Logical and Physical Access Controls.
[2] OWASP, "Clickjacking Defense," 2024.
[3] Google Workspace Admin Help, "DKIM: Set up and troubleshoot."
[4] DMARC.org adoption survey, enterprise buyer behavior report, 2025.
