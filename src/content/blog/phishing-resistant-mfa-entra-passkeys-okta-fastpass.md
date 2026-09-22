---
title: "Phishing-Resistant MFA: Entra Passkeys and Okta FastPass"
description: "Deploy phishing-resistant MFA with Microsoft Entra authentication strengths, Okta FastPass, and WebAuthn passkeys, plus enrollment hardening, incident response."
pubDate: "2026-09-22"
tags: ["phishing-resistant mfa", "fido2", "passkeys", "entra id", "okta", "nist 800-63b"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/phishing-resistant-mfa-entra-passkeys-okta-fastpass-1790068129.webp"
lastVerified: "2026-09-22"
---

Phishing-resistant MFA is no longer a nice-to-have. Identity attacks dominate the modern threat picture, and the most common second factors — SMS codes, one-time passwords, simple push approvals — can be relayed, harvested, or socially engineered by an attacker with patience and a proxy. This guide walks through deploying phishing-resistant authentication on the two platforms most enterprises use: Microsoft Entra ID (passkeys, authentication strengths) and Okta Identity Engine (Passkeys and FastPass), then covers enrollment hardening, detection, and phased rollout.

## How This Guide Was Built

This guide is based on desk research of official vendor documentation from Microsoft, Okta, NIST, CISA and the FIDO Alliance, plus Microsoft's September 2026 threat research. We did not run a lab deployment, and no hands-on testing is claimed anywhere in this post. Every configuration detail, licence requirement and failure mode below is drawn directly from primary sources, which are linked inline throughout.

## Why Is Phishable MFA the Weak Link in 2026?

Phishable MFA — SMS, one-time codes, push approvals — leaves session tokens exposed to adversary-in-the-middle proxies and device-code phishing, and the September 2026 passkey-themed campaign shows how attackers weaponise fake enrolment prompts to add attacker-controlled methods and harvest cloud data. Phishing-resistant MFA removes replayable credentials at the authentication layer itself.

The scale of the problem is documented in Microsoft's Digital Defense Report 2024, which reports over 7,000 password attacks per second and more than 600 million cybercriminal and nation-state attacks per day, with identity attacks dominating ([Microsoft Digital Defense Report 2024](https://www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2024)).

The live threat is concrete. Microsoft Security Research documented a campaign, active since May 2026, in which attackers impersonate IT support and use fake passkey and MFA-enrollment prompts. The chain runs: identity-focused social engineering → attacker-added authentication methods for MFA persistence → high-volume Microsoft Graph reconnaissance → SharePoint and OneDrive downloads → email collection through REST APIs via proxy-associated infrastructure. Critically, Microsoft's own assessment is that "despite the frequent use of passkey-themed lures, passkey enrollment is often not the actor's true objective" — the enrolment prompt is bait, not the goal. Microsoft's stated defensive priority after compromise: revoke sessions and remove unauthorised authentication methods ([Microsoft Security blog](https://www.microsoft.com/en-us/security/blog/2026/09/09/passkey-themed-social-engineering-leads-identity-cloud-compromise/)).

Phishing-resistant MFA attacks the root of this chain. WebAuthn/FIDO2 credentials are scoped (origin-bound) to the relying party, so a credential shown to a phishing proxy simply does not work on the real site ([FIDO Alliance](https://fidoalliance.org/passkeys/)). That removes the replayable credential at the authentication layer, before a session token ever exists to steal.

## Device-Bound vs Synced Passkeys: Which Should You Deploy?

NIST recognises synced passkeys only at AAL2; AAL3 requires non-exportable, hardware-based authenticators with verifier impersonation resistance. Deploy device-bound FIDO2 security keys for administrators and regulated workloads, and synced passkeys for general users where the assurance requirement is lower.

NIST SP 800-63B Revision 4, finalised in August 2025, formally recognises syncable authenticators — passkeys synced through a cloud "sync fabric" — at AAL2 only, and requires that the sync fabric itself demand AAL2 authentication before adding a new authenticator. AAL3, by contrast, requires non-exportable, hardware-based authenticators with verifier impersonation resistance ([NIST SP 800-63B Rev. 4](https://pages.nist.gov/800-63-4/sp800-63b/syncable/)). The practical consequence: synced passkeys are a major improvement over SMS, OTP and push, but they do not satisfy high-assurance or federal-style requirements.

Microsoft Entra ID supports both types — synced passkeys and device-bound passkeys (FIDO2 security keys and passkeys in Microsoft Authenticator) — and the underlying mechanism is origin-bound public-key cryptography requiring local user interaction, so the credential cannot be replayed or relayed to a phishing proxy ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2)). Match the passkey type to the persona: device-bound for privileged and regulated users, synced for the broad population.

## How Do You Enable FIDO2 Passkeys in Microsoft Entra ID?

Passkeys work in every Microsoft Entra ID edition, including Entra ID Free, with no extra licences. Create the authentication-methods policy entries, then use group-based passkey profiles to set attestation, passkey type and AAGUID restrictions — with separate profiles for administrators and general users.

Enablement starts in the Authentication methods policy, where you add the FIDO2 security key and passkey methods ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2)). Because passkeys are available in all editions including Entra ID Free, cost is not a blocker for the credential itself — only for Conditional Access features, covered next.

The significant 2026 change is passkey profiles, now generally available. Instead of a single tenant-wide toggle, you create group-based profiles, each of which can set:

- **Attestation** — whether and how the authenticator must prove what it is
- **Passkey type** — device-bound vs synced
- **AAGUID restrictions** — allow-list specific Authenticator Attestation GUIDs so only approved key models enrol ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-passkeys-fido2), [synced passkey profiles](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-synced-passkeys))

Run separate profiles for admins and general users — admins on device-bound keys with strict AAGUID allow-lists, general users on synced passkeys.

Before rollout, check device readiness. Microsoft's documented minimums: Windows 10 22H2 for Windows Hello for Business, Windows 11 22H2 for the best passkey experience, macOS 13 Ventura, iOS 17, Android 14. Older operating systems require external authenticators such as FIDO2 security keys ([Microsoft Learn deployment guide](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-deploy-phishing-resistant-passwordless-authentication)).

## How Do Entra Conditional Access Authentication Strengths Work?

An authentication strength is a Conditional Access control specifying which combinations of authentication methods may access a resource. Microsoft ships three built-ins — Multifactor authentication, Passwordless MFA, and Phishing-resistant MFA — and Conditional Access requires an Entra ID P1 licence.

The three built-in strengths are ordered by restrictiveness: **Multifactor authentication** is the most permissive, **Passwordless MFA** sits in the middle, and **Phishing-resistant MFA** is the most restrictive. The phishing-resistant strength accepts exactly three method types: Windows Hello for Business / platform credential, FIDO2 security key, and multifactor certificate-based authentication ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths)).

Two operational points matter for practitioners. First, this is where the licence bill lands: passkeys themselves are free in every edition, but applying authentication strengths requires Conditional Access, which requires Microsoft Entra ID P1. Second, strengths combine with authentication contexts to gate sensitive actions inside an application — for example, requiring the phishing-resistant strength only when a user performs a privileged operation in a finance app, rather than at every sign-in. That lets you reserve hardware keys for the handful of actions that genuinely need AAL3-equivalent assurance while keeping the daily experience friction-free.

## What Is the Okta Equivalent: Passkeys and FastPass?

In Okta Identity Engine, Passkeys (FIDO2 WebAuthn) and Okta FastPass are the phishing-resistant authenticators. Enable them, configure authenticator enrollment policies, then require a phishing-resistant possession factor in app sign-in policies — with the enrollment toggle turned on to prevent downgrade attacks.

The documented configuration path is three steps: set up and enable the authenticators → configure authenticator enrollment policies → require a phishing-resistant possession factor in app sign-in policies ([Okta Help](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/phishing-resistant-auth.htm)).

One tenant toggle deserves special attention: **"Require phishing-resistant authenticator to enroll additional authenticators."** Once enabled, a user adding any later authenticator must first authenticate with a phishing-resistant one. This is your anti-downgrade control — it prevents the September-2026-style attack pattern where an attacker who has phished a weaker session adds their own MFA method. Note the deliberate carve-out: a user with no authenticators enrolled can still enrol the methods their enrollment policy allows, so this does not block onboarding ([Okta Help](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/require-phishing-resistant-authenticator.htm)).

Know the caveats before you promise phishing resistance to your users. Okta Identity Engine treats only passkey (FIDO2 WebAuthn) and smart card authenticators as phishing resistant unless the phishing-resistance constraint is explicitly ticked in the policy rule ([Okta Security Knowledge](https://support.okta.com/help/s/article/Okta-Security-Knowledge-Phishing-Resistance?language=en_US)). On macOS, an SSO extension profile is required for FastPass to be phishing-resistant in Safari. Universal Windows Platform apps need a script. And some routers' DNS rebind protection blocks Okta Verify's secure channel, causing phishing-resistance checks to fail.

The good news for detection: when Okta declines a phishing attempt, the event lands in the System Log — for example, a message such as "Okta FastPass declined phishing attempt." That is a ready-made detection signal for your SIEM.

## How Should You Harden Enrollment and Recovery?

Enrol users with Temporary Access Pass rather than SMS or OTP fallback, keep dedicated break-glass accounts excluded from Conditional Access, restrict AAGUIDs per group, and require a phishing-resistant authenticator before any additional authenticator can be enrolled.

Temporary Access Pass (TAP) is Microsoft's intended onboarding mechanism: a time-limited, sign-in-only credential that gets a user through first enrolment without ever exposing a phishable SMS or OTP path. Pair it with per-persona groups so each passkey profile and authentication strength targets exactly the population it should.

Break-glass accounts need explicit handling: keep two dedicated emergency accounts excluded from Conditional Access policies and from phishing-resistant enforcement, monitored for any use, so a misconfigured strength policy cannot lock your tenant.

On the Okta side, the enrollment toggle covered above is your hardening control — it ensures every subsequently enrolled authenticator was added over a phishing-resistant session ([Okta Help](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/require-phishing-resistant-authenticator.htm)).

Finally, calibrate expectations using CISA's framing: any form of MFA is better than none — SMS and authenticator codes raise attacker cost — but SMS, one-time codes and simple push are not phishing-resistant and should not be relied on for high-value targets ([CISA](https://www.cisa.gov/cyber-guidance-small-businesses)). Phishing-resistant MFA is the destination; phishable MFA is better than nothing while you get there.

## How Do You Detect and Revoke a Compromise?

Inspect sign-in logs and authentication-method registration events, then revoke all sessions for affected users, remove unauthorised authentication methods, reset credentials, and audit Graph, SharePoint, OneDrive and Exchange activity — Microsoft names session revocation and method removal as the top priorities.

Microsoft's guidance for the September 2026 campaign is explicit: revoke sessions and remove unauthorised authentication methods first, because attacker-added MFA methods provide persistence even after a password reset ([Microsoft Security blog](https://www.microsoft.com/en-us/security/blog/2026/09/09/passkey-themed-social-engineering-leads-identity-cloud-compromise/)).

Triage checks for a suspected identity compromise:

- **Newly added authentication methods** — the persistence mechanism in the 2026 campaign; check the Entra audit log for registration events the user doesn't recognise
- **App consents** — illicit OAuth grants that survive password resets
- **Mailbox rules** — forwarding or deletion rules that hide attacker activity
- **Graph, SharePoint, OneDrive and Exchange activity** — the campaign's post-compromise stages were Graph reconnaissance followed by SharePoint/OneDrive downloads and email collection via REST APIs, so audit those data paths for anomalous volume or unfamiliar source IPs

On Okta, watch the System Log for the declined-phishing signal — "Okta FastPass declined phishing attempt" — which indicates an active attempt against a user, and correlate it with subsequent authenticator enrolment events ([Okta Help](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/phishing-resistant-auth.htm)).

## What Are the Most Common Deployment Failure Modes?

Unsupported devices, incompatible app WebViews and missing platform extensions cause most failures. Okta needs an SSO extension profile on macOS and a script for UWP apps, DNS rebind protection can break FastPass checks, and legacy OS versions need external FIDO2 keys.

The documented failure modes, in rough order of frequency:

1. **WebView incompatibility** — apps with incompatible WebView implementations fail with **Access denied** when embedded browsers cannot complete the WebAuthn ceremony ([Okta Help](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/phishing-resistant-auth.htm)). Expect this in legacy line-of-business apps.
2. **macOS missing the SSO extension profile** — without it, FastPass is not phishing-resistant in Safari even though sign-in appears to succeed.
3. **UWP apps** — Universal Windows Platform apps need a script; unconfigured, they fail silently or block sign-in.
4. **DNS rebind protection** — some routers block Okta Verify's secure channel, so phishing-resistance checks fail even though the network is fine. Users will blame the authenticator; the fix is on the router ([Okta Security Knowledge](https://support.okta.com/help/s/article/Okta-Security-Knowledge-Phishing-Resistance?language=en_US)).
5. **OS version floors** — before you start, verify devices meet the minimums: Windows 10 22H2, Windows 11 22H2, macOS 13 Ventura, iOS 17, Android 14. Anything older needs external FIDO2 security keys ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-deploy-phishing-resistant-passwordless-authentication)).

Microsoft's phishing-resistant passwordless workbook (Preview) can assess your tenant's device readiness before the first wave.

## What Does a Phased Rollout Look Like?

Start with one persona — usually admins or highly regulated users — in a dedicated Entra group, enforce the phishing-resistant strength for that group, expand to developers and then non-admins, and review enrollment success and failure signals between waves.

Microsoft's deployment guidance is persona-based: (1) admins and highly privileged or highly regulated users, (2) developers and DevOps/DevSecOps staff who manage automations, (3) non-admins. The recommendation is to deploy phishing-resistant passwordless broadly, but start with a single persona, each backed by a dedicated Entra group ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-deploy-phishing-resistant-passwordless-authentication)).

There is federal precedent for the staged approach. CISA documents a USDA migration that moved an entire user population to phishing-resistant MFA in phases — proof that a full-population migration is achievable when sequenced properly ([CISA](https://www.cisa.gov/resources-tools/resources/phishing-resistant-multi-factor-authentication-mfa-success-story-usdas-fast-identity-online-fido)). Between waves, track enrolment completion rates, helpdesk tickets, and the WebView/Access-denied failures above; fix the blockers before widening scope.

Microsoft's own framing for the journey is worth adopting internally: "don't let perfect be the enemy of good." A synced passkey for every user today is worth more than a device-bound key for every user next year.

**Verdict:** if you run Entra ID, deploy passkey profiles now (they work on Entra ID Free), buy the P1 licences for Conditional Access authentication strengths, and enforce the Phishing-resistant MFA strength for your admin group first. If you run Okta, enable Passkeys and FastPass, tick the phishing-resistance constraint in your policies, and turn on the enrollment toggle before your next helpdesk-impersonation campaign arrives — because on current evidence, it will.

## FAQ

### Can synced passkeys satisfy AAL3 or federal identity requirements?

No. NIST SP 800-63B Revision 4 recognises syncable authenticators at AAL2 only, and requires the sync fabric to authenticate at AAL2 before adding a new authenticator. AAL3 requires non-exportable, hardware-based authenticators with verifier impersonation resistance ([NIST](https://pages.nist.gov/800-63-4/sp800-63b/syncable/)). For federal-style or high-assurance workloads, deploy device-bound FIDO2 security keys; synced passkeys remain a strong improvement over SMS and push for everyone else.

### Do I need Entra ID P1 for passkeys, or only for authentication strengths?

Passkeys are available in all Microsoft Entra ID editions, including Entra ID Free — no extra licence required ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passkeys-fido2)). You need Entra ID P1 only for Conditional Access features, including authentication strengths ([Microsoft Learn](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths)). So you can enrol users on passkeys at no licence cost, but enforcing the Phishing-resistant MFA strength as a sign-in condition requires P1.

### What is the safest way to recover a lost FIDO2 security key without falling back to SMS?

Use a Temporary Access Pass issued over a verified helpdesk interaction, then have the user enrol a replacement key in the same session — TAP is a time-limited credential that grants only sign-in, not full account takeover surface. Keep the Okta parallel in mind: with the "Require phishing-resistant authenticator to enroll additional authenticators" toggle on, a replacement key must be enrolled over a phishing-resistant session, which is exactly the protection you want ([Okta Help](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/require-phishing-resistant-authenticator.htm)). Avoid SMS or OTP fallback entirely; CISA's guidance is that phishable methods should not backstop high-value targets ([CISA](https://www.cisa.gov/cyber-guidance-small-businesses)).
