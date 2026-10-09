---
title: "Your Data Is in the Pile: What the August 2026 Breach Wave Means for You"
description: "ShinyHunters pay-or-leak breaches and related data leaks from August 2026: what was exposed at Carhartt, Chess.com, McKesson, Manchester Airports Group, Neogen and Questel, and what to do now."
pubDate: "2026-10-09"
tags: ["consumer-alert", "data-breach", "phishing", "identity-theft", "privacy"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/2026-10-09-consumer-alert-1791575943.webp"
lastVerified: "2026-10-09"
---

The August 2026 ShinyHunters "pay or leak" breaches and the related Chess.com scrape show that whether your data was stolen or scraped, your email address is likely in the pile — and the practical consumer response is the same either way: verify, harden, and report.

This post is based on breach records and published reporting, not hands-on testing. Counts, dates, and sensitivity flags come from [Have I Been Pwned](https://haveibeenpwned.com/) breach records and the reporting linked in each case. Where a detail is unverified, it is labeled as such.

---

## What ShinyHunters' "Pay or Leak" Extortion Actually Is

The extortion model works like this: a threat actor claims to have stolen an organization's data and demands payment. If the organization refuses to pay, the actor publishes the data — emails, names, phone numbers, addresses, and sometimes far more sensitive details — for anyone on the internet to download. The consumer is not the extortion target; the organization is. But when the data goes public, personal information goes with it.

This wave of incidents, concentrated in August 2026, is primarily attributed to a group known as ShinyHunters. The [Carhartt](https://haveibeenpwned.com/Breach/Carhartt), [McKesson](https://haveibeenpwned.com/Breach/McKesson), [Neogen](https://haveibeenpwned.com/Breach/Neogen), and [Questel](https://haveibeenpwned.com/Breach/Questel) breaches are all linked to ShinyHunters' "pay or leak" campaigns. One incident in this set — the [Manchester Airports Group](https://haveibeenpwned.com/Breach/ManchesterAirportsGroup) breach — was claimed by a different actor, [FulcrumSec](https://www.bleepingcomputer.com/news/security/fulcrumsec-claims-manchester-airports-hack-theft-of-86-gb-of-data/), not ShinyHunters. The [Chess.com](https://haveibeenpwned.com/Breach/Chess2026) leak, meanwhile, appears to have a different origin altogether, as discussed below.

The common thread is not a single hacker but a pattern: organizations get breached or scraped, the data gets published, and consumers bear the consequences. Corporate contact lists and customer emails get exposed even when the organization is not consumer-facing — as the [Questel](https://sqmagazine.co.uk/questel-confirms-vishing-breach-shinyhunters-leak/) and [Neogen](https://cybernews.com/security/shinyhunters-neogen-breach-food-safety/) cases make clear.

---

## The Six Breaches at a Glance

| Breach | Data exposed | Unique records | Sensitivity (per HIBP) | What to do first |
|---|---|---|---|---|
| Carhartt | Emails, names, phone numbers, physical addresses | ~12.9M | Verified, not sensitive | Check HIBP; watch for phishing using your address |
| Chess.com (Chess2026) | Usernames, names, countries, account data | 4.6M unique emails (~7.3M rows) | Verified | Check HIBP; secure account credentials |
| McKesson | DOB, names, genders, employers, personal health data | 6.4M | Verified, SENSITIVE | Check HIBP; heightened scam awareness; monitor credit |
| Manchester Airports Group | Customer emails, phone numbers, vehicle/service-related personal info | 8.8M | Verified, not sensitive | Check HIBP; watch for travel-themed vishing/texts |
| Neogen | Mostly corporate contact emails | 436k | Verified, not sensitive | Check HIBP; beware business-email impersonation |
| Questel | Names, employers, job titles, addresses, phones (mostly B2B) | 1.2M | Verified, not sensitive | Check HIBP; beware vishing targeting your work role |

---

## Case-by-Case: What Each Breach Exposed

**Carhartt** (carhartt.com) — ShinyHunters' "pay or leak" extortion, August 2026. The published corpus contains approximately [12.9 million unique email addresses](https://haveibeenpwned.com/Breach/Carhartt) along with names, phone numbers, and physical addresses. [HIBP lists the breach as verified and not sensitive](https://haveibeenpwned.com/Breach/Carhartt). As Troy Hunt [noted in his analysis](https://www.troyhunt.com/a-cautionary-tale-about-data-breach-claims-verification-and-carhartt), millions of synthetic records not tied to real people were excluded from the verified corpus — an important caveat discussed in a later section.

**Chess.com** (HIBP name: Chess2026) — approximately [7.3 million rows covering 4.6 million unique emails](https://haveibeenpwned.com/Breach/Chess2026), including usernames, names, countries, and account data. [HIBP lists it as verified](https://haveibeenpwned.com/Breach/Chess2026). Published [analysis points to scraping](https://securityaffairs.com/197174/breaking-news/chess-com-leak-exposes-7-3-million-users-evidence-points-to-scraping.html) rather than a traditional database intrusion, and per [HIBP's record](https://haveibeenpwned.com/Breach/Chess2026), 99% of the email addresses had already appeared in previous breaches. Troy Hunt [explored the question](https://www.troyhunt.com/when-is-a-scrape-a-breach/) of when a scrape should be treated as a breach and [HIBP lists it as a breach record](https://haveibeenpwned.com/Breach/Chess2026) anyway.

**McKesson** (mckesson.com) — ShinyHunters "pay or leak" campaign, August 2026. The breach exposed [6.4 million unique emails](https://haveibeenpwned.com/Breach/McKesson) along with dates of birth, names, genders, employers, and personal health data. [HIBP flags this breach as SENSITIVE](https://haveibeenpwned.com/Breach/McKesson). [BleepingComputer reported](https://www.bleepingcomputer.com/news/security/mckesson-discloses-breach-after-shinyhunters-claims-patient-data-theft/) that McKesson disclosed the breach after ShinyHunters claimed to have stolen patient data.

**Manchester Airports Group** (magairports.com) — disclosed August 2026 and [claimed by FulcrumSec](https://www.bleepingcomputer.com/news/security/fulcrumsec-claims-manchester-airports-hack-theft-of-86-gb-of-data/), not ShinyHunters. The breach affected [8.8 million customer emails and phone numbers](https://haveibeenpwned.com/Breach/ManchesterAirportsGroup) across Manchester, Stansted, and East Midlands airports, and also included [vehicle- and service-related personal information](https://www.bleepingcomputer.com/news/security/manchester-airports-group-says-hackers-stole-travelers-data/). [HIBP has a verified record](https://haveibeenpwned.com/Breach/ManchesterAirportsGroup) for the breach.

**Neogen** (neogen.com) — ShinyHunters extortion attempt, August 2026. The exposed dataset contains [436,000 unique emails](https://haveibeenpwned.com/Breach/Neogen), mostly corporate contacts rather than individual consumers. [Cybernews reported](https://cybernews.com/security/shinyhunters-neogen-breach-food-safety/) on the extortion attempt. [HIBP lists the breach](https://haveibeenpwned.com/Breach/Neogen) but does not flag it as sensitive.

**Questel** (questel.com) — ShinyHunters extortion following a vishing breach. The leak contains [1.2 million unique emails](https://haveibeenpwned.com/Breach/Questel) along with names, employers, job titles, addresses, and phone numbers — mostly B2B contacts. [SQ Magazine reported](https://sqmagazine.co.uk/questel-confirms-vishing-breach-shinyhunters-leak/) that Questel confirmed a vishing breach that preceded the ShinyHunters leak. [HIBP has a verified record](https://haveibeenpwned.com/Breach/Questel).

---

## Sensitive vs. Not Sensitive: Why the McKesson Difference Matters

Have I Been Pwned applies a sensitivity flag when a breach exposes data that goes beyond basic contact information. [McKesson is flagged as SENSITIVE](https://haveibeenpwned.com/Breach/McKesson) because the exposed data includes personal health information alongside dates of birth and employer details. The other five breaches in this set are not flagged as sensitive by HIBP.

This distinction matters because of what an attacker can do with the data. A name and email address can fuel phishing. Add a date of birth, employer, and health information, and the same data enables far more targeted and convincing scams — including medical identity theft, impersonation of healthcare providers, and spear-phishing that references real employment or medical details.

For consumers whose data appeared in the McKesson breach, the [BleepingComputer reporting](https://www.bleepingcomputer.com/news/security/mckesson-discloses-breach-after-shinyhunters-claims-patient-data-theft/) underscores that patient data was at the center of the extortion claim. If your information is in this breach, treat any unsolicited communication referencing your health, employer, or personal details with heightened suspicion.

---

## Scraped or Stolen? Why You Can't Tell — and Why It Doesn't Change Your Response

The Chess.com case illustrates a gray area that consumers cannot resolve from the outside. [Published analysis](https://securityaffairs.com/197174/breaking-news/chess-com-leak-exposes-7-3-million-users-evidence-points-to-scraping.html) suggests the 4.6 million unique emails were gathered through scraping — the automated collection of publicly available profile data — rather than a traditional hack into a private database. Troy Hunt [examined the question](https://www.troyhunt.com/when-is-a-scrape-a-breach/) of whether scraped data should count as a breach and [HIBP lists it as a breach record](https://haveibeenpwned.com/Breach/Chess2026) regardless of how the data was obtained.

From a consumer's perspective, the distinction is academic. Whether your email was stolen from a private database or collected from a public profile, the end result is the same: your information is in the hands of people who may use it for phishing, credential stuffing, or social engineering. You cannot tell from the outside which method was used, and the practical response — check whether your data appeared, harden your accounts, and watch for targeted attacks — is identical either way.

---

## Synthetic Records and Verification: Don't Panic Before You Check

The Carhartt breach illustrates why verification matters. When the corpus was first published, it appeared to contain an enormous number of records. But Troy Hunt's [verification analysis](https://www.troyhunt.com/a-cautionary-tale-about-data-breach-claims-verification-and-carhartt) revealed that millions of synthetic records — fabricated entries not tied to real people — were included in the raw dump. These were excluded from the [verified HIBP record](https://haveibeenpwned.com/Breach/Carhartt), which lists approximately 12.9 million unique email addresses.

The takeaway for consumers is straightforward: before assuming you are in a breach dump, check a verified source like [HIBP](https://haveibeenpwned.com/Breach/Carhartt) rather than relying on raw data circulating on forums or social media. The exact number of consumers affected beyond what the published corpus contained is unverified — HIBP's count reflects the verified unique emails, not a comprehensive tally of every real person whose data appeared.

---

## What This Means for an Ordinary Consumer

Email addresses appear in all six breaches, names in most, and phone numbers or physical addresses in several. That combination is what attackers use for:

- **Targeted phishing** — emails that reference your real name, employer, or travel history to appear legitimate.
- **Vishing** — phone calls from scammers who already know your name, address, or employer and use those details to build trust.
- **Package and delivery scams** — texts or calls claiming a delivery issue, using your real address or phone number to seem credible.

Where health data is involved — specifically in the [McKesson](https://haveibeenpwned.com/Breach/McKesson) breach — the risk escalates. Health information combined with employer data enables medical identity theft and scams that impersonate healthcare providers or insurers.

The [Questel](https://sqmagazine.co.uk/questel-confirms-vishing-breach-shinyhunters-leak/) and [Neogen](https://cybernews.com/security/shinyhunters-neogen-breach-food-safety/) breaches remind us that B2B contact data gets published too. If your work email, job title, employer, or corporate phone number appeared in one of these dumps, expect targeted vishing that leverages your professional role.

---

## What to Do Right Now: Consumer Action List

1. **Check whether your email appears in the affected breaches** by searching it on [Have I Been Pwned](https://haveibeenpwned.com/).

2. **Create long, random, unique passwords for each account and use a password manager**, per [CISA Secure Our World "Use Strong Passwords"](https://www.cisa.gov/secure-our-world/use-strong-passwords).

3. **Recognize and resist phishing** arriving as email, text, social DM, or phone call — avoid links or attachments that look too good to be true or request personal information — and report it, per [CISA "Recognize and Report Phishing"](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing).

4. **If your identity is misused, use [IdentityTheft.gov](https://www.identitytheft.gov/) for reporting and recovery steps.**

5. **Report fraud to the FTC** at [https://reportfraud.ftc.gov/](https://reportfraud.ftc.gov/).

6. **Review your credit reports** via [https://www.annualcreditreport.com](https://www.annualcreditreport.com).

7. **Stay current on official advisories** via the [CISA advisories hub](https://www.cisa.gov/news-events/cybersecurity-advisories).

---

## FAQ

**Q: How do I know if my data was in these breaches?**

Check the HIBP breach records cited in this post — for example, the [Carhartt](https://haveibeenpwned.com/Breach/Carhartt) and [McKesson](https://haveibeenpwned.com/Breach/McKesson) records. Enter your email address to see whether it appears in any verified breach, including all six incidents covered here.

**Q: Was Chess.com actually hacked, or was it scraping?**

[Published analysis](https://securityaffairs.com/197174/breaking-news/chess-com-leak-exposes-7-3-million-users-evidence-points-to-scraping.html) points to scraping rather than a traditional intrusion. However, [HIBP lists the data as a breach record anyway](https://haveibeenpwned.com/Breach/Chess2026). You should treat scraped data the same as stolen data.

**Q: The Carhartt dump was huge — does that mean everyone's affected?**

No. Troy Hunt's [verification analysis](https://www.troyhunt.com/a-cautionary-tale-about-data-breach-claims-verification-and-carhartt) found that millions of synthetic records not tied to real people were excluded. The [verified corpus](https://haveibeenpwned.com/Breach/Carhartt) contains approximately 12.9 million unique emails. The exact number of consumers affected beyond the published corpus is unverified.

**Q: These were mostly companies I've never heard of (Neogen, Questel). Why should I care?**

B2B contact lists get published alongside consumer data. [Questel's leak](https://sqmagazine.co.uk/questel-confirms-vishing-breach-shinyhunters-leak/) included names, employers, job titles, addresses, and phone numbers — mostly corporate contacts. [Neogen's breach](https://cybernews.com/security/shinyhunters-neogen-breach-food-safety/) exposed mostly corporate contact emails. If your work email or professional details appeared in these dumps, you are a target for spear-phishing and vishing.

**Q: What's the single most urgent step if I was in the McKesson breach?**

Treat any unsolicited communication referencing your health, employer, or personal details with extreme suspicion. The [McKesson breach](https://www.bleepingcomputer.com/news/security/mckesson-discloses-breach-after-shinyhunters-claims-patient-data-theft/) exposed [personal health data](https://haveibeenpwned.com/Breach/McKesson) alongside dates of birth and employer information — a combination that enables highly targeted scams. Follow the [action list](#what-to-do-right-now-consumer-action-list) above, starting with checking [HIBP](https://haveibeenpwned.com/Breach/McKesson) and reviewing your credit reports at [annualcreditreport.com](https://www.annualcreditreport.com).
