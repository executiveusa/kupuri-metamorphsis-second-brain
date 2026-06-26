# Metamorphosis — Ivette Private Wellness OS

Metamorphosis is no longer framed as a generic public wellness subscription app. This build centers **Ivette Milo's private wellness second brain and personal health tracker**.

The product stores and organizes rituals, journal entries, habits, nutrition targets, recipes, music/audio regulation, and personal memory. It is built as a private lab first. Public SaaS packaging should not return until the personal system is useful every day.

## Current build

- **Framework**: Next.js 15 App Router
- **UI**: Tailwind CSS v4
- **State**: local-first browser storage for MVP testing
- **Existing platform assets**: PWA, service worker, audio player, Firebase/Firebase Admin utilities, Capacitor shell scaffolding
- **Added modules**: Today, Journal, Habits, Recipes, Meal Plans, Music, Brain, Insights
- **Docs included**: PRD, build plan, Supabase schema, brand tokens, Grok Imagine prompt, agent access plan

## Start

```bash
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000/app
```

## Product rule

Build for Ivette first.

Do not add pricing, public subscription, community, or generic wellness copy until the private tracker and second brain are genuinely useful.

## Core routes

| Route | Purpose |
|---|---|
| `/` | Personal landing page with locked butterfly hero |
| `/app` | Today dashboard |
| `/app/journal` | Reflection capture |
| `/app/habits` | Ritual tracker |
| `/app/recipes` | Recipe upload, private cookbook, his-and-hers recipe builder |
| `/app/meal-plans` | Meal plan builder and grocery list export |
| `/app/music` | Audio/music library |
| `/app/brain` | Second-brain command center |
| `/app/insights` | Nutrition and weekly review |
| `/app/profile` | Private lab settings |

## Backend path

This ZIP ships a local-first MVP so Ivette can test daily use immediately. Production persistence should use the included Supabase schema in:

```text
docs/prd/supabase_schema_draft.sql
```

## Hardening files

Before any builder continues, read:

```text
PRODUCT_TRUTH.md
FEATURE_COMPLETENESS_GATE.md
DATA_SAFETY.md
AGENTS.md
public/llms.txt
```

## Agent path

The initial second-brain agent surface is documented in:

```text
docs/agent-harness/AGENT_ACCESS_PLAN.md
```

Start with Scribe, Seeker, and Librarian. Add Tailscale only after auth, persistence, and audit logs are stable.
