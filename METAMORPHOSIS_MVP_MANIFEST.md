# Metamorphosis MVP Manifest

## Output

This ZIP is a repo-ready MVP rebuild package.

## Core product decision

Metamorphosis is **Ivette Milo's private wellness second brain and personal tracker**.

## Major changes

- Rewrote `/` landing page around private lab positioning.
- Added locked butterfly logo assets.
- Rebuilt `/app` member space into a real private dashboard.
- Added local-first modules:
  - Today dashboard
  - Journal capture
  - Habit and ritual tracker
  - Recipe upload/import and his-and-hers recipe builder
  - Meal plan builder with grocery list export
  - Music/audio library
  - Second-brain memory capture/search
  - Insights page
- Added local-first API scaffolds:
  - `/api/journal`
  - `/api/habits`
  - `/api/recipes`
  - `/api/meal-plans`
  - `/api/tracks`
  - `/api/brain`
- Added agent and product docs:
  - `AGENTS.md`
  - `PRODUCT_TRUTH.md`
  - `FEATURE_COMPLETENESS_GATE.md`
  - `DATA_SAFETY.md`
  - `public/llms.txt`
  - `agent-api/tools.json`
  - `agent-api/openapi.yaml`
  - `docs/agent-harness/AGENT_ACCESS_PLAN.md`
  - `docs/prd/*`
  - `docs/brand/*`

## Remaining production tasks

- Add Supabase/Firebase production persistence.
- Protect `/app` routes with auth.
- Add upload/audio storage.
- Replace local recipe/meal-plan storage with production persistence.
- Add real semantic search.
- Implement MCP server.
- Add Tailscale after auth and audit logging.
