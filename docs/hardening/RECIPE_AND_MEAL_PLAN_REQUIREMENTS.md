# Recipe Upload and Meal Plan Requirements

## Recipe upload

The app must support recipe intake through:

- manual form entry
- pasted plain text
- pasted JSON
- uploaded `.json`
- uploaded `.txt`
- uploaded `.csv` style text
- future agent API calls

## Recipe fields

Minimum fields:

- title
- mode: hers, his, or both
- meal type
- protein
- carbs
- fat
- calories
- ingredients
- steps
- note/source

## Meal planning

The meal plan builder must let Ivette:

- choose saved recipes
- build a day plan
- build a weekly plan later
- export grocery list
- export Markdown for Obsidian
- keep macro targets visible
- distinguish hers, his, and shared meal logic

## Production migration

Local-first storage is acceptable in the MVP. Production persistence must use:

- `recipes`
- `recipe_import_batches`
- `recipe_ingredients`
- `recipe_steps`
- `recipe_portions`
- `meal_plans`
- `meal_plan_days`
- `meal_plan_items`
