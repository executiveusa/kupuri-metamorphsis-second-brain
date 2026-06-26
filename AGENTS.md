# AGENTS.md

## Mission

Build Metamorphosis as Ivette Milo's private wellness OS and personal second brain.

## Read first

Every agent must read these files before changing the app:

1. `PRODUCT_TRUTH.md`
2. `FEATURE_COMPLETENESS_GATE.md`
3. `DATA_SAFETY.md`
4. `public/llms.txt`
5. `agent-api/tools.json`

## Non-negotiables

- Personal app first, product later.
- No generic wellness SaaS language.
- No fake pricing pages in the primary flow.
- No stubbed feature pages.
- The butterfly/cocoon identity is the locked hero system.
- Data must flow into Journal, Habits, Recipes, Meal Plans, Music, Brain, and Insights.
- All private data modules must support export or have an export ticket.

## Build order

1. Protect and simplify the landing page.
2. Make `/app` useful every day.
3. Finish local-first capture loops.
4. Add recipe upload and meal planning.
5. Add production persistence.
6. Add agent access through CLI/MCP/API.
7. Add Tailscale only after auth and audit logs.

## Current MVP state

This build includes local-first browser storage for daily testing and API route scaffolds. Production database implementation should use the Supabase schema in `docs/prd` and the agent API contract in `agent-api/`.
