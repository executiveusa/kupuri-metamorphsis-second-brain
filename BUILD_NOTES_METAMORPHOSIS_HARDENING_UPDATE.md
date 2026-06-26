# Metamorphosis Hardening Update

This update adds the guardrail layer that prevents the build from drifting back into generic SaaS and adds the requested recipe upload + meal plan surface.

## Added hardening files

- `PRODUCT_TRUTH.md`
- `FEATURE_COMPLETENESS_GATE.md`
- `DATA_SAFETY.md`
- `docs/hardening/PRE_BUILD_ADDENDUM.md`
- `docs/hardening/RECIPE_AND_MEAL_PLAN_REQUIREMENTS.md`
- `docs/future-platform/README.md`
- `agent-api/tools.json`
- `agent-api/openapi.yaml`

## Added app functionality

- `/app/recipes` now includes:
  - manual recipe creation
  - his / hers / both mode
  - ingredient entry
  - step entry
  - macro estimate
  - pasted recipe import
  - JSON recipe import
  - `.json`, `.txt`, `.csv` file upload
  - recipe export to JSON

- `/app/meal-plans` now includes:
  - meal plan creation
  - selection from saved recipes
  - macro target visibility
  - grocery list generation
  - Markdown export for Obsidian/agents

## Added API scaffold

- `/api/meal-plans`

## Updated agent files

- `AGENTS.md`
- `public/llms.txt`

## Updated database draft

The Supabase schema now includes:

- `recipe_import_batches`
- `meal_plans`
- `meal_plan_days`
- `meal_plan_items`
- `recipes.mode`
- `recipes.import_batch_id`
