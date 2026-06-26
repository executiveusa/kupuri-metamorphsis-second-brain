# Metamorphosis for Ivette – Complete PRD

**Version:** 1.0  
**Date:** 2026-06-25  
**Product mode:** Personal lab first. Public product later only after Ivette uses it successfully.

---

## 1. Executive Decision

Metamorphosis is not a generic wellness SaaS and not a menopause product. It is **Ivette Milo’s personal wellness second brain**: a private, agent-callable app that stores her wellness life, daily rituals, nutrition plans, recipes, journal entries, audio, tasks, insights, and personal operating context.

The current site must be rebuilt around one central product truth:

> Ivette should be able to open Metamorphosis every day and see what matters now: her body plan, food plan, mood, habits, recipes, music, notes, and next best action.

The MVP is successful when Ivette can use it without needing to understand the backend, folder structure, agent stack, or database.

---

## 2. Current State Diagnosis

### 2.1 What exists

The current codebase is a Next.js app with public marketing pages and member-space routes. The repo README describes Next.js 15, Tailwind, React Query, Firebase, Stripe, PWA, Capacitor, and optional Bluetooth support. It also claims dashboard capabilities such as rituals, journal queue, habit tracker, audio player, Bluetooth panel, Stripe tiers, and Firebase offline persistence.

### 2.2 What is actually usable

The landing page and dashboard exist, but most features are static. Journal entries, habits, programs, and profile preferences are hard-coded. The music player component exists, but there is no personal audio library. There is no real recipe builder, no his-and-hers recipe mode, no second-brain backend, and no agent-callable API.

### 2.3 Severity score

**Current quality rating:** 3/10  
**Reason:** The foundation has useful pieces, but the product has no personal core and no functioning backend.

---

## 3. Product Goal

Build a personal web/PWA system where Ivette can:

1. Start the day from a clear Today dashboard.
2. Track habits, rituals, body state, mood, energy, meals, water, sleep, and training.
3. Store and search her journal entries.
4. Use recipes and meal planning based on her actual nutrition plan history.
5. Use a music and audio player for focus, ritual, meditation, workouts, and emotional reset.
6. Save notes, files, PDFs, and memory fragments into a second-brain knowledge vault.
7. Let agents query, write, summarize, and organize the system through CLI, MCP, or API.
8. Keep it private and personal by default.

---

## 4. Product Principles

### 4.1 Personal before public

Every feature should answer: does this help Ivette today?

Public monetization, pricing, community, multi-user onboarding, and SaaS messaging are deferred.

### 4.2 Do not make her think

The dashboard must show the next action clearly. No mystery buttons. No generic motivational content. No “journey” pages that do not do anything.

### 4.3 Source-backed wellness memory

Nutrition, recipes, and wellness recommendations should use uploaded plans and logged history. The app can store coach-provided targets but must not pretend to be a doctor.

### 4.4 Agent-readable by design

Every major state should be queryable through a typed API and exportable into Markdown/JSON files. The app should not trap context inside UI components.

### 4.5 Offline-first enough

Ivette must be able to journal, mark habits, and save recipe notes even if the connection is bad. Sync later.

---

## 5. Primary User

### 5.1 User

Ivette Milo.

### 5.2 User needs

- A private wellness command center.
- A memory system for recipes, body progress, personal notes, and routines.
- A daily app that feels beautiful but remains simple.
- A system agents can call without breaking her data.
- A way to turn scattered PDFs, notes, voice memos, and recipes into organized memory.

### 5.3 User anti-needs

- No generic SaaS pricing during personal beta.
- No fake wellness content.
- No empty admin pages.
- No stubbed buttons.
- No overbuilt dashboards that require manual management.

---

## 6. MVP Feature Set

### 6.1 Public entry / cinematic hero

The public root page becomes a personal gateway.

**Required behavior:**

- Load with the locked logo / chrysalis / butterfly mark.
- Show cinematic hero video or motion fallback.
- Show concise copy: “Ivette’s private wellness second brain.”
- CTA: `Entrar`.
- Secondary CTA only if useful: `Ver mi día` or `Abrir diario` after authentication.
- Remove pricing, subscribe buttons, fake social proof, and generic programs.

**Hero video concept:**

Cocoon only at first. Light pulses. The cocoon opens. Wings slowly emerge. Butterfly unfolds, flies forward, then dissolves back into the circular logo. Logo pulses. `Entrar` appears.

### 6.2 Today dashboard

Route: `/app`

The Today dashboard is the main product. It replaces the generic “Member Space.”

**Sections:**

1. Morning state: mood, energy, sleep, body notes.
2. Today’s plan: meals, water, movement, ritual, journal prompt.
3. Habit streaks.
4. Current nutrition target.
5. Recipe suggestion.
6. Audio recommendation.
7. Agent insight: one useful summary from recent logs.

**Critical rule:** no card should exist unless it does something.

### 6.3 Journal

Route: `/app/journal`

**MVP requirements:**

- Create entry.
- Edit entry.
- Delete entry.
- Add mood, energy, body state, tags, and private note.
- Attach source type: text, voice transcript, PDF note, recipe note, body note.
- Search entries.
- Export entries to second-brain Markdown.

### 6.4 Habits and rituals

Route: `/app/habits`

**MVP requirements:**

- Create habit.
- Set schedule.
- Mark done.
- Undo completion.
- Track streak.
- Show calendar heatmap.
- Connect habits to wellness domains: nutrition, movement, hydration, sleep, reflection, recovery, creativity.

### 6.5 Recipes and meal builder

Route: `/app/recipes`

This is a primary missing feature.

**MVP requirements:**

- Add recipe.
- Add ingredients, steps, servings, tags, prep time.
- Track macros where known.
- Add `his` and `hers` portions.
- Generate grocery list.
- Save favorite combinations.
- Create meals from uploaded nutrition-plan references.
- Mark recipe as breakfast, snack, comida, cena, post-workout, or ritual meal.

**His-and-hers logic:**

- `hers_profile`: Ivette targets, preferences, restrictions, coach plan references.
- `his_profile`: partner targets and portion adjustments.
- One recipe can generate two portion plans.

### 6.6 Nutrition plan memory

Route: `/app/nutrition`

The app should ingest Ivette’s May/June nutrition PDFs and store them as personal source documents.

**MVP requirements:**

- Store monthly nutrition targets.
- Track weight, IMC/BMI, calorie target, protein, carbs, fats.
- Store meal options and ingredients.
- Mark active plan.
- Compare month to month.
- Generate compatible recipes.
- Avoid medical claims.

### 6.7 Music and audio library

Route: `/app/audio`

**MVP requirements:**

- Audio track library.
- Playlists: morning, workout, sleep, ritual, focus, emotional reset.
- Existing audio player reused.
- Track listening sessions.
- Favorite tracks.
- Offline-ready track metadata.

### 6.8 Second brain

Route: `/app/brain`

The second brain is the memory layer.

**MVP requirements:**

- Save notes manually.
- Search all memories.
- Link journal entries, recipes, PDFs, habits, and audio sessions.
- Export to Markdown vault.
- Ingest files and summarize them.
- Provide API endpoint for agents.
- Maintain an ICM workspace folder for interpretable context.

### 6.9 Agent command center

Route: `/app/agents`

**MVP requirements:**

- Show agent status.
- Show recent agent runs.
- Buttons for safe workflows:
  - Save note.
  - Search memory.
  - Weekly review.
  - Recipe idea.
  - Nutrition summary.
  - Journal summary.
  - Vault audit.
- Display last output and source references.

### 6.10 Settings

Route: `/app/settings`

**MVP requirements:**

- Profile.
- Language.
- Timezone.
- Privacy mode.
- Data export.
- API token management.
- Connected vault path.
- Tailscale status placeholder.

---

## 7. Architecture Decision

### 7.1 Frontend

Keep Next.js App Router. Refactor the app around personal product modules.

**Preferred stack:**

- Next.js App Router.
- Tailwind.
- shadcn-style primitives or existing components.
- React Query for server state.
- Zod for validation.
- Supabase for auth, Postgres, storage, row-level security, and pgvector.

### 7.2 Backend

The current README points to Firebase, but the rebuild should standardize on Supabase unless a locked Firebase production instance already exists.

**Reason:** Supabase is better for:

- agent-readable SQL.
- pgvector memory search.
- RLS policies.
- MCP integration.
- structured analytics.
- storage for PDFs/audio/assets.

### 7.3 Agent layer

Use a small adapter around the My-Brain-Is-Full pattern rather than copying the full system blindly.

**MVP agent roles:**

- Scribe: save notes and clean messy text.
- Seeker: search Ivette’s memory.
- Librarian: weekly organization and data hygiene.
- Recipe Assistant: generate and adapt recipes from nutrition plan memory.
- Wellness Reviewer: summarize patterns without medical advice.

### 7.4 ICM filesystem layer

Create `ivette_second_brain/` in the repo or connected vault:

```text
ivette_second_brain/
  CLAUDE.md
  CONTEXT.md
  _config/
    ivette_profile.md
    wellness_boundaries.md
    recipe_preferences.md
    agent_permissions.md
  sources/
    nutrition_plans/
    journals/
    recipes/
    audio/
    uploads/
  stages/
    01_ingest/
    02_summarize/
    03_connect/
    04_recommend/
    05_review/
  outputs/
    weekly_reviews/
    meal_plans/
    vault_audits/
    handoffs/
```

---

## 8. Data Model

### 8.1 Tables

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

### 8.2 Key relationships

- A journal entry can link to a habit, recipe, ritual, source document, or memory item.
- A recipe can link to a nutrition plan.
- A meal plan can include recipes and custom notes.
- A memory item can link to any source.
- An agent run must write output and source references.

---

## 9. API Surface

### 9.1 Internal app API

```text
POST /api/checkins
GET /api/checkins/today
POST /api/journal
GET /api/journal/search
POST /api/habits/:id/log
POST /api/recipes
POST /api/recipes/generate
POST /api/nutrition/import
GET /api/nutrition/active
POST /api/audio/session
POST /api/brain/ingest
GET /api/brain/search
POST /api/agents/run
```

### 9.2 Agent API

```text
POST /api/agent/ingest
POST /api/agent/search
POST /api/agent/summarize
POST /api/agent/weekly-review
POST /api/agent/recipe-builder
POST /api/agent/export-vault
```

### 9.3 MCP tools

```text
metamorphosis.save_note
metamorphosis.search_memory
metamorphosis.create_journal_entry
metamorphosis.log_habit
metamorphosis.create_recipe
metamorphosis.generate_meal_plan
metamorphosis.summarize_week
metamorphosis.audit_vault
```

---

## 10. Landing Page IA

### 10.1 Root page

1. Cinematic hero.
2. Short personal positioning.
3. Three personal modules:
   - Body plan.
   - Recipes and rituals.
   - Second brain.
4. Private access CTA.
5. Safety note: personal wellness tool, not medical advice.

### 10.2 Copy direction

**Headline:**  
Ivette’s private wellness second brain.

**Subheadline:**  
A calm personal system for rituals, recipes, notes, music, and body progress—built around her real plan, not generic wellness content.

**CTA:**  
Entrar

---

## 11. Dashboard IA

```text
/app
  Today
/app/journal
  Journal
/app/habits
  Habits + Rituals
/app/recipes
  Recipes + His/Hers Portions
/app/nutrition
  Nutrition Plan Memory
/app/audio
  Music + Guided Audio
/app/brain
  Second Brain Search
/app/agents
  Agent Command Center
/app/settings
  Settings + Privacy
```

Remove:

- `/pricing` for personal beta.
- `/app/admin` unless there is a real admin need.
- Fake program-module pages.
- Generic public blog unless used as private notes later.

---

## 12. Brand System

### 12.1 Visual direction

Mystic clarity, personal wellness, cinematic transformation. The design should feel private, precise, and calm.

### 12.2 Locked visual asset

Use the circular chrysalis / butterfly / lotus mark as the hero identity.

### 12.3 Palette

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

### 12.4 UI rules

- Use white/mist cards for task-heavy pages.
- Use dark cinematic visuals only for hero and transitions.
- Text contrast must be high.
- Primary CTA must be obvious.
- Every button must have a real route or action.

---

## 13. Security and Privacy

### 13.1 Personal data

This app stores sensitive wellness, nutrition, journal, and identity data.

### 13.2 Requirements

- Supabase RLS on every table.
- One owner profile for Ivette in personal beta.
- No public access to `/app/*`.
- API tokens stored hashed.
- Audit logs for agent writes.
- Manual approval before agents delete data.
- No secrets in repo.
- `.env.local` only locally; production secrets in Vercel/Supabase.

---

## 14. Definition of Done

### MVP done when:

- Ivette can enter the app through private access.
- Today dashboard uses real data.
- Journal CRUD works.
- Habit CRUD and streaks work.
- Recipe builder works with his/hers portions.
- Nutrition plan memory stores at least the uploaded nutrition PDFs as structured entries.
- Audio library plays at least one real track and logs sessions.
- Second brain can save and search memories.
- Agent API can ingest and search.
- Build, lint, and tests pass.
- No dead buttons, fake links, or hard-coded demo content remain.

---

## 15. Non-goals for MVP

- Public subscriptions.
- Multi-tenant SaaS.
- Medical diagnosis.
- Complex wearable integrations.
- Public community features.
- Full custom agent marketplace.
- Full Obsidian clone.

---

## 16. Release Plan

### Alpha

Personal use only. Ivette and builder agents.

### Beta

Private controlled access for trusted users after Ivette validates daily use.

### Public

Only if repeatable value emerges from real usage.