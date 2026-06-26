# Metamorphosis Build Plan – Full Execution Roadmap

**Goal:** Convert the current generic wellness site into Ivette’s personal wellness second brain and agent-callable lab.

---

## Phase 0 – Freeze and Audit

### Objective
Stop random feature drift. Capture the real current state.

### Actions

1. Create branch: `rebuild/ivette-personal-lab`.
2. Run repo inventory:
   - package manager.
   - routes.
   - components.
   - APIs.
   - env variables.
   - tests.
   - dead links.
3. Screenshot live pages:
   - `/`
   - `/app`
   - `/app/journal`
   - `/app/habits`
   - `/app/programs`
   - `/app/profile`
4. Write `docs/audit/current-state.md`.
5. Block any new public SaaS features until personal MVP is working.

### Exit criteria

- Repo map exists.
- Dead routes are listed.
- Stubbed features are identified.
- Build status known.

---

## Phase 1 – Brand and IA Reset

### Objective
Reposition the product around Ivette.

### Actions

1. Replace SaaS copy with personal positioning.
2. Remove pricing from root flow.
3. Create `/app` IA:
   - Today.
   - Journal.
   - Habits.
   - Recipes.
   - Nutrition.
   - Audio.
   - Brain.
   - Agents.
   - Settings.
4. Add brand tokens.
5. Add hero logo asset and motion fallback.
6. Replace placeholder images.

### Exit criteria

- Root page clearly says personal second brain.
- CTA says `Entrar`.
- Navigation matches real modules.
- No fake SaaS pricing remains in personal mode.

---

## Phase 2 – Backend Foundation

### Objective
Create real persistence and auth.

### Actions

1. Add Supabase client.
2. Configure `.env.example`.
3. Create database schema.
4. Add RLS policies.
5. Add auth guard for `/app/*`.
6. Create data access layer:
   - `lib/db/checkins.ts`
   - `lib/db/journal.ts`
   - `lib/db/habits.ts`
   - `lib/db/recipes.ts`
   - `lib/db/nutrition.ts`
   - `lib/db/audio.ts`
   - `lib/db/brain.ts`
7. Add seed script for Ivette personal profile.

### Exit criteria

- App has auth.
- Protected routes are private.
- Database migration runs.
- Seed data appears in dashboard.

---

## Phase 3 – Today Dashboard

### Objective
Build the daily command center.

### Actions

1. Replace current `/app/page.tsx`.
2. Add Today check-in form.
3. Add cards:
   - current mood.
   - body state.
   - water.
   - habit streaks.
   - active nutrition target.
   - recipe suggestion.
   - audio suggestion.
   - agent insight.
4. Persist check-ins.
5. Add loading and empty states.

### Exit criteria

- Dashboard is useful with one glance.
- Check-in writes to backend.
- Empty state explains what to do.

---

## Phase 4 – Journal Module

### Objective
Turn static journal examples into a real private journal.

### Actions

1. Add journal list.
2. Add create/edit/delete modal or page.
3. Add mood, energy, tags, body note.
4. Add search.
5. Add export to Markdown.
6. Add offline queue if PWA sync is kept.

### Exit criteria

- Ivette can write and find entries.
- Entries survive refresh.
- No demo January 2025 entries remain.

---

## Phase 5 – Habits and Rituals

### Objective
Build real habit tracking.

### Actions

1. Create habit CRUD.
2. Create habit log table.
3. Implement mark-done / undo.
4. Calculate streaks.
5. Add schedule and domain.
6. Add ritual session logging.

### Exit criteria

- Habit buttons update real state.
- Streaks calculate from logs.
- Habits are editable.

---

## Phase 6 – Nutrition Memory

### Objective
Turn PDFs into structured personal memory.

### Actions

1. Create nutrition plan schema.
2. Add manual import screen.
3. Seed May and June nutrition targets.
4. Add meals from uploaded plans.
5. Add active-plan selector.
6. Add nutrition summary card to Today.

### Exit criteria

- Active nutrition plan displays real target.
- Meals can be searched.
- Plan history can be compared.

---

## Phase 7 – Recipe Builder

### Objective
Build the missing recipe system.

### Actions

1. Add `/app/recipes`.
2. Add recipe CRUD.
3. Add ingredients and steps.
4. Add tags and meal type.
5. Add macro fields.
6. Add his-and-hers portion mode.
7. Add grocery list export.
8. Add AI recipe generate endpoint stub with safe fallback.

### Exit criteria

- Recipes can be saved and edited.
- His/hers portions work.
- Nutrition plan can influence recipes.

---

## Phase 8 – Audio and Music Library

### Objective
Use the existing player as a real module.

### Actions

1. Add `/app/audio`.
2. Add audio track schema.
3. Add playlists.
4. Reuse `AudioPlayer`.
5. Track listening sessions.
6. Add favorites.

### Exit criteria

- Audio library has real records.
- Playback works.
- Listening history is stored.

---

## Phase 9 – Second Brain

### Objective
Make memory agent-readable.

### Actions

1. Add `/app/brain` search UI.
2. Add `memory_items` and `memory_links`.
3. Add source documents.
4. Add file upload.
5. Add Markdown export.
6. Add vector-ready fields.
7. Create ICM workspace folders.

### Exit criteria

- Notes can be saved.
- Search works.
- Source links are visible.
- Markdown export works.

---

## Phase 10 – Agent Layer

### Objective
Expose safe CLI/MCP/API actions.

### Actions

1. Add agent API routes.
2. Add token auth.
3. Add audit log.
4. Implement safe tools:
   - save note.
   - search memory.
   - create journal entry.
   - log habit.
   - create recipe.
   - summarize week.
5. Add `/app/agents` UI.
6. Add My-Brain-Is-Full adapter docs.

### Exit criteria

- Agent can save and search memory.
- Every agent run has audit log.
- Delete/destructive actions require manual approval.

---

## Phase 11 – Cinematic Hero

### Objective
Build the entrance experience.

### Actions

1. Generate Grok Imagine hero video.
2. Export MP4/WebM.
3. Add poster image fallback.
4. Add reduced-motion fallback.
5. Add `Entrar` pulse CTA.
6. Make video lazy and performance-safe.

### Exit criteria

- Hero loads fast.
- Mobile fallback works.
- CTA remains obvious.

---

## Phase 12 – QA and Release

### Objective
Ship a working personal MVP.

### Actions

1. Unit tests for data functions.
2. E2E tests for main flows.
3. Visual QA through browser harness.
4. Lighthouse pass.
5. Accessibility pass.
6. Security pass.
7. Deploy preview.
8. Ivette user test.

### Exit criteria

- No dead buttons.
- No placeholder data.
- No public access to private dashboard.
- Build passes.
- Ivette can use daily flows.

---

## Phase 13 – Tailscale and Remote Agent Access

### Objective
Add global secure access after MVP stability.

### Actions

1. Deploy backend securely.
2. Add Tailscale node.
3. Restrict agent API to Tailscale or signed token.
4. Add health endpoint.
5. Add remote CLI docs.

### Exit criteria

- Remote agents can call safe API.
- Public internet cannot access private data.
- Logs show who/what wrote every change.

---

## Build Order Summary

1. Fix positioning and IA.
2. Add Supabase and auth.
3. Build Today, Journal, Habits.
4. Build Nutrition and Recipes.
5. Build Audio and Brain.
6. Add agent API.
7. Add cinematic hero.
8. QA and deploy.
9. Add Tailscale.