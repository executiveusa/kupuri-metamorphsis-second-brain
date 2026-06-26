# Builder Prompt – Metamorphosis Ivette Personal Lab Rebuild

You are the builder agent for `executiveusa/metamorphsis-cdmx`.

## Mission

Rebuild the current generic wellness landing page into **Ivette Milo’s private wellness second brain**.

This is not a public SaaS MVP. This is her personal lab first. Do not build pricing, public subscription flows, fake community, fake programs, or generic wellness copy until the personal app works.

## Current Failure

The deployed app looks generic and only has static placeholder content. The dashboard pages for Journal, Habits, Programs, and Profile are not real tools. The product is rated 3/10 in its current state.

## Non-negotiable Product Definition

Metamorphosis is a personal app where Ivette can track:

- daily mood and body state.
- habits and rituals.
- journal notes.
- nutrition plan history.
- recipes and his/hers portions.
- audio and music sessions.
- second-brain memories.
- agent-generated summaries.

Agents must be able to call the system through safe API/MCP-compatible routes.

## Required Stack

- Keep Next.js App Router.
- Use Tailwind and existing component primitives.
- Prefer Supabase for backend, auth, storage, RLS, and future pgvector memory search.
- Use Zod for validation.
- Use React Query or server actions consistently.
- Keep PWA support if it does not block the build.

## Required Routes

```text
/
/app
/app/journal
/app/habits
/app/recipes
/app/nutrition
/app/audio
/app/brain
/app/agents
/app/settings
```

Remove or demote:

```text
/pricing
/app/admin
/app/programs
```

Keep a redirect if needed, but do not leave dead links.

## Data Models

Implement migrations or schema docs for:

```text
profiles
wellness_checkins
journal_entries
habits
habit_logs
rituals
ritual_sessions
nutrition_plans
nutrition_plan_meals
recipes
recipe_ingredients
recipe_steps
recipe_portions
meal_plans
audio_tracks
playlists
listening_sessions
memory_items
memory_links
source_documents
agent_runs
agent_permissions
api_tokens
```

## Core Acceptance Tests

1. Root page says this is Ivette’s private wellness second brain.
2. Root CTA says `Entrar`.
3. `/app` is protected.
4. Today dashboard shows real data or clear empty states.
5. Journal CRUD works.
6. Habits CRUD and streaks work.
7. Recipes can be created with his/hers portions.
8. Nutrition plan memory stores imported May/June plan targets.
9. Audio library reuses existing AudioPlayer.
10. Brain module can save and search a note.
11. Agent API can ingest and search.
12. Every button has a real action or route.
13. Build, lint, unit tests, and E2E smoke test pass.

## Visual Direction

Use the locked circular chrysalis / butterfly / lotus mark as the hero identity.

Palette:

```json
{
  "void": "#071017",
  "deep_indigo": "#0D2442",
  "morpho_blue": "#0EA5E9",
  "aqua_glow": "#5EEAD4",
  "gold_thread": "#B47A2B",
  "lotus_violet": "#8B5CF6",
  "soft_cream": "#FFF7E0",
  "mist_panel": "#F7FBFD",
  "ink": "#10222C",
  "muted_text": "#6A7C84"
}
```

## Execution Rules

1. First create `docs/rebuild/current-state-audit.md`.
2. Then create `docs/rebuild/implementation-status.md` and update it after every patch.
3. Implement in small patches.
4. Do not create fake features.
5. Do not leave placeholder arrays in production routes.
6. Do not commit secrets.
7. Do not expose private dashboard publicly.
8. All destructive agent actions require human confirmation.

## Patch Sequence

### PATCH_001 – IA and positioning

- Rewrite root page.
- Remove pricing from personal flow.
- Replace Member Space with Ivette dashboard navigation.
- Add brand tokens.
- Add hero logo asset references.

### PATCH_002 – Supabase foundation

- Add Supabase client.
- Add env example.
- Add migrations/schema.
- Add RLS.
- Add protected route wrapper.

### PATCH_003 – Today dashboard

- Build daily check-in.
- Build real dashboard cards.
- Connect to backend.

### PATCH_004 – Journal and habits

- Implement Journal CRUD.
- Implement Habit CRUD and logs.
- Remove static placeholder data.

### PATCH_005 – Nutrition and recipes

- Add nutrition plan memory.
- Seed May/June targets.
- Build recipes and his/hers portions.

### PATCH_006 – Audio and brain

- Add audio library.
- Add second brain notes and search.
- Add source documents.

### PATCH_007 – Agent API

- Add safe API tools.
- Add audit logs.
- Add agent command center.

### PATCH_008 – Cinematic hero and QA

- Add hero video/fallback.
- Run visual QA.
- Run tests.
- Fix all issues.

## Final Output Required

At the end, report:

- files changed.
- routes completed.
- backend tables completed.
- test results.
- screenshots or visual QA notes.
- remaining gaps.