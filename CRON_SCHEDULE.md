# CyberSec AI Cron Schedule

**Domain:** cybersec-ai.xyz
**Last updated:** 2026-10-07 13:47
**Total jobs:** 7

## Schedule

| Job | Schedule | Enabled |
|-----|----------|---------|
| CS - Tool Review (Mon/Wed/Fri) | `0 12 * * 1,3,5` | Yes |
| CS — CVE Deep-Dive | `15 12 * * 2` | Yes |
| CS — News Roundup | `15 12 * * 3` | Yes |
| CS — Threat Research Deep-Dive | `30 12 * * 4` | Yes |
| CS — Consumer Alert | `30 12 * * 5` | Yes |
| CS — Hardening Guide | `45 12 * * 6` | Yes |
| CS — Tool Comparison | `55 12 * * 0` | Yes |

## Notes

- All times are Pacific (PST/PDT)
- Reserved hour: 12:00 PST (see RESERVED_SLOTS.md in ~/.hermes/cron/)
- DeepSeek peak hours avoided (18:00-03:00 PST Mon-Fri)
- Content types: tool reviews, CVE deep-dives, threat research, hardening guides, tool comparisons, news roundups, consumer alerts
