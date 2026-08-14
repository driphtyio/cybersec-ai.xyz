---
title: "Fake Package Delivery Text Scams Surge After Data Breaches"
description: "Cyberattacks on CEVA Logistics and ShipMonk exposed customer data, enabling hyper-personalized fake delivery texts. Stolen CEVA data—names, addresses,…"
pubDate: "2026-08-14"
tags: ["consumer-alert", "phishing", "data-breach", "smishing"]
heroImage: "https://pub-0066f5275194430aa9f985cb23278abe.r2.dev/2026-08-14-consumer-alert-1786738952.webp"
lastVerified: "2026-08-14"
---

Fake package delivery text scams are a growing threat after two major logistics breaches exposed real customer data. Between August 6 and 13, 2026, shipping providers CEVA Logistics and ShipMonk disclosed cyberattacks affecting major retailers and brands. Both companies warned that customers should expect phishing attempts using their real names and addresses. This post gives you a clear checklist to spot these hyper-personalized scams before you click.

## How This Was Verified

This report is based on verified disclosures from the affected companies and reporting from established cybersecurity and logistics news outlets. We cross-checked facts, including the number of affected individuals and data fields, against primary vendor announcements and major outlets like BleepingComputer and TechCrunch. We have not accessed any stolen data, and some details, like the total number of organizations impacted, are based on official reports that have not been independently audited. Last verified: August 2026.

## How do I spot a fake package delivery text?

Scammers now have your real information, so the most common trick is a text or email that quotes your genuine home address or phone number. This detail is worthless as proof of legitimacy; it only confirms your data was in the breach. These scams often create false urgency, claiming a customs fee or failed redelivery requires immediate payment. They may include a link to a "tracking" or "order verification" page designed to steal login credentials. A key red flag is the sender's web domain, which will not match the official carrier's URL. As [Valve warned its customers](https://www.bleepingcomputer.com/news/security/valve-notifies-steam-hardware-customers-of-a-data-breach/), any communication demanding fees or logins to verify an order is fraudulent.

## What Happened at CEVA Logistics

A cyberattack on CEVA Logistics disrupted operations at eight of its warehouses across Europe, beginning around July 29, 2026, and continuing until at least August 1 [FreightWaves](https://www.freightwaves.com/news/cyberattack-on-ceva-logistics-warehouses-in-europe-impacts-retailers). The company notified customers on August 1, stating that the stolen data included names, home addresses, phone numbers, and email addresses [TechCrunch](https://techcrunch.com/2026/08/10/a-data-breach-at-shipping-giant-ceva-logistics-is-rippling-across-banks-retailers-steam-gamers-and-beyond/). This data was held for up to 90 days after an order was placed. Major brands using CEVA's services, including bol.com, De Bijenkorf, Ajax, ING, Ace & Tate, and Valve, were affected. Notably, bol.com immediately suspended data exchanges with CEVA, leading to canceled or delayed orders [FreightWaves](https://www.freightwaves.com/news/cyberattack-on-ceva-logistics-warehouses-in-europe-impacts-retailers). The Dutch Data Protection Authority received breach reports from ten organizations related to this incident [TechCrunch](https://techcrunch.com/2026/08/10/a-data-breach-at-shipping-giant-ceva-logistics-is-rippling-across-banks-retailers-steam-gamers-and-beyond/). Crucially, no credit card or payment details were exposed in the CEVA breach [FreightWaves](https://www.freightwaves.com/news/cyberattack-on-ceva-logistics-warehouses-in-europe-impacts-retailers).

## ShipMonk, Trezor, and the Metabase Zero-Day

On August 12, 2026, cryptocurrency hardware wallet maker Trezor disclosed that its shipping provider, ShipMonk, had been breached, exposing data for approximately 13,689 customers [Trezor](https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident). The breach impacted orders shipped between May 10 and August 8, 2026. For 11,742 of those customers, full records including name, email, phone, and shipping address were stolen; an additional 1,947 had partial data exposed. The affected customers are located in the US, UK, Sweden, Colombia, Brazil, Italy, and Portugal [BleepingComputer-Trezor](https://www.bleepingcomputer.com/news/security/trezor-discloses-data-breach-affecting-nearly-14-000-customers/). Trezor emphasized that its devices and wallet security were not compromised. The root cause was a zero-day vulnerability in the Metabase data analysis platform, which allowed unauthenticated SQL injection and led to admin access. This same critical flaw (CVSS 10.0) also hit e-commerce platform Framework, exposing all customer names, emails, IP addresses, physical addresses, and phone numbers [BleepingComputer-Framework/Tally](https://www.bleepingcomputer.com/news/security/framework-tally-disclose-metabase-data-theft-attacks/). For the technical details, see the [Metabase SQL-injection zero-day notes on our CVE hub](/cves/).

## What to Do If You Get a Delivery Phishing Text

If you receive an unexpected delivery email, SMS, or call, follow these five steps immediately.

1. Assume it is hostile if you ordered physical goods recently from any of the affected companies, including Steam hardware in Europe, bol.com, De Bijenkorf, Ajax, ING, Ace & Tate, or Trezor between May 10 and August 8, 2026.
2. Never pay any "customs," "redelivery," or "verification" fee from a link; instead, type the carrier's or retailer's web address yourself or use its official app to check tracking. Fee lures like these were the focus of [our earlier Prime Day and order-phishing alert](/blog/2026-07-17-consumer-alert/).
3. If a caller "confirms" your address, hang up and call back using the official number from the company's website or your payment statement. See [how to handle cloned-voice call scams](/blog/2026-07-24-consumer-alert/) for the callback technique.
4. Crypto users must never enter a wallet recovery seed, password, or one-time code on any page reached via a link, email, or caller—Trezor states you should never enter your wallet backup on a website.
5. Report the scam and block the sender. Forward suspicious texts to 7726 (SPAM) and report them to the FTC at [ReportFraud.ftc.gov](https://reportfraud.ftc.gov/) or your national data protection authority. If you need help checking if your account info was exposed, try our [free exposure scanner](/scan/).

## FAQ

### Why do these texts quote my real address?

Scammers use your address to build false trust and bypass your suspicion. The breach data included names, addresses, and phone numbers — as reported by [TechCrunch](https://techcrunch.com/2026/08/10/a-data-breach-at-shipping-giant-ceva-logistics-is-rippling-across-banks-retailers-steam-gamers-and-beyond/) and [Trezor](https://trezor.io/blog/news/recent-customer-data-exposed-in-shipping-provider-incident). The address is not proof a message is from a legitimate source; it is proof your information was stolen.

### Were my Steam or Trezor accounts hacked?

No. [Valve explicitly stated](https://www.bleepingcomputer.com/news/security/valve-notifies-steam-hardware-customers-of-a-data-breach/) that Steam passwords, Steam Guard codes, and payment data were not exposed in the CEVA breach. Similarly, Trezor confirmed its hardware devices and wallet security were not compromised. The breaches involved only contact and shipping information used for e-commerce fulfillment.

### Where do I report a delivery phishing text?

In the United States, you can report phishing texts to the FTC at [ReportFraud.ftc.gov](https://reportfraud.ftc.gov/). You should also forward the message to 7726 (SPAM), which forwards it to your mobile carrier for blocking. In Europe, report it to your national data protection authority.
