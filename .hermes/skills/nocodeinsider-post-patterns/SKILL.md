---
name: nocodeinsider-post-patterns
description: NoCode Insider-specific post patterns — AI workflow automation, no-code tooling, practical guides
version: 1.0.0
triggers:
  - nocodeinsider
  - blog post
  - writing
---

# NoCode Insider Post Patterns

## Frontmatter Template

```yaml
---
title: "Post Title Here"
description: "150-160 char meta description"
pubDate: YYYY-MM-DD
tags: ["n8n", "Make", "automation"]
heroImage: "https://r2.example.com/nocodeinsider/image.webp"
---
```

## Writing Style

- **Voice**: Practical, non-developer. Assume reader knows their tools but not code.
- **Structure**: Problem → Tool → Steps → Result.
- **Citations**: Tool pricing, feature counts need sources. Link to official docs.
- **Length**: 600-1200 words.
- **Tool names**: Always use full product name first mention.

## Content Structure by Type

### Workflow Guide
```
## Use Case
## Tools Needed
## Step-by-Step Setup
## Testing & Verification
## Variations
```

### Tool Comparison
```
## The Options
## Feature Matrix
## Pricing Comparison
## Verdict
```

### News / Update
```
## What Changed
## How It Affects Your Workflows
## Migration Notes (if any)
```

## Required Elements

- Real tool names, not generic
- Step-by-step instructions
- heroImage optional but preferred
- ❌ No code blocks (audience is non-developer)
- ✅ Use screenshots / flow diagrams

## Tag Convention

- Lowercase, tool-specific tags (n8n, make, zapier, airtable, notion)
- Categories: automation, workflow, integration, news, comparison
