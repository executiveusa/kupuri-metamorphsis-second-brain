# Metamorphosis Nutrition Engine

A comprehensive nutrition planning engine that supports dual "His & Hers" profiles for personalized meal planning, recipe ingestion, and recipe refinement.

## Features

- **Dual Profile Support**: Manage separate nutrition profiles for "His" and "Hers" with different goals and caloric needs
- **Three Operating Modes**:
  - **INGEST**: Extract recipes and dietary preferences from text
  - **PLAN**: Generate personalized meal plans with grocery lists
  - **RECIPE_REFINEMENT**: Adapt recipes to align with specific nutrition goals
- **Flexible Planning**: Create meal plans for individual profiles or both simultaneously
- **Goal-Based Optimization**: Supports multiple nutrition goals (fat loss, muscle gain, maintenance, performance, health)
- **Comprehensive Nutrition Tracking**: Track calories, macronutrients, and detailed nutrition information

## Installation

The Nutrition Engine is already included in this repository. Simply import it:

```typescript
import { NutritionEngine } from '@/lib/nutrition-engine';
```

## Quick Start

### Basic Setup

```typescript
import { NutritionEngine } from '@/lib/nutrition-engine';

const engine = new NutritionEngine();

// Set up "Hers" profile
engine.setHerProfile({
  id: '1',
  name: 'Her',
  primary_goal: 'fat_loss',
  target_calories_per_day: 1600,
  dietary_restrictions: ['gluten-free'],
  preferred_cuisines: ['Mediterranean']
});

// Set up "His" profile
engine.setHisProfile({
  id: '2',
  name: 'Him',
  primary_goal: 'muscle_gain',
  target_calories_per_day: 2400,
  preferred_cuisines: ['Italian']
});
```

### Generate a Meal Plan

```typescript
const plan = engine.process({
  mode: 'PLAN',
  profile_selector: 'both', // or 'his' or 'hers'
  context: {
    plan_horizon_days: 7,
    meals_per_day: 3,
    include_grocery_list: true
  }
});

console.log(plan.meal_plan.daily_plans.length); // 7 days
console.log(plan.his_profile_summary?.avg_daily_calories);
console.log(plan.hers_profile_summary?.avg_daily_calories);
```

### Ingest Recipes from Text

```typescript
const result = engine.process({
  mode: 'INGEST',
  profile_selector: 'his',
  context: {
    text_input: `
      I am vegetarian and allergic to peanuts.
      Recipe: Greek Salad with Quinoa
    `,
    extract_preferences: true,
    extract_recipes: true
  }
});
```

### Refine a Recipe

```typescript
// Add a recipe to the database
engine.addRecipe({
  id: 'recipe-1',
  name: 'High Calorie Pasta',
  ingredients: [
    { name: 'pasta', amount: 200, unit: 'g' }
  ],
  instructions: ['Cook pasta'],
  nutrition_per_serving: {
    calories: 600,
    protein_g: 20,
    carbs_g: 80,
    fat_g: 20
  },
  servings: 2
});

// Refine for fat loss
const refined = engine.process({
  mode: 'RECIPE_REFINEMENT',
  profile_selector: 'hers',
  context: {
    recipe_id: 'recipe-1',
    target_goal: 'fat_loss'
  }
});

console.log(refined.modifications); // See what was changed
```

## API Reference

### NutritionEngine

#### Methods

- `setHisProfile(profile: NutritionProfile)`: Set the "His" profile
- `setHerProfile(profile: NutritionProfile)`: Set the "Hers" profile
- `getHisProfile()`: Get the current "His" profile
- `getHerProfile()`: Get the current "Hers" profile
- `addRecipe(recipe: Recipe)`: Add a recipe to the database
- `addRecipes(recipes: Recipe[])`: Add multiple recipes
- `getRecipes()`: Get all recipes from the database
- `process(input: EngineInput)`: Process a nutrition engine request

### Types

#### NutritionProfile

```typescript
interface NutritionProfile {
  id: string;
  name: string;
  primary_goal: NutritionGoal; // 'fat_loss' | 'muscle_gain' | 'maintenance' | 'performance' | 'health'
  target_calories_per_day: number;
  dietary_restrictions?: string[];
  allergies?: string[];
  preferred_cuisines?: string[];
  disliked_ingredients?: string[];
}
```

#### Engine Modes

- **INGEST**: Extract recipes and preferences from text input
- **PLAN**: Generate comprehensive meal plans with grocery lists
- **RECIPE_REFINEMENT**: Adapt recipes for specific nutrition goals

#### Profile Selector

- **his**: Process for the "His" profile only
- **hers**: Process for the "Hers" profile only
- **both**: Process for both profiles simultaneously

## Examples

See `lib/nutrition-engine/examples.ts` for comprehensive usage examples including:

1. Basic setup with both profiles
2. Generating 7-day meal plans
3. Ingesting recipes from text
4. Refining recipes for specific goals
5. Single profile meal planning

## Testing

Run the test suite:

```bash
npm run test tests/lib/nutrition-engine.test.ts
```

## Architecture

The Nutrition Engine consists of three main files:

- **types.ts**: TypeScript type definitions for all data structures
- **NutritionEngine.ts**: Main engine class with processing logic
- **index.ts**: Module exports for easy importing

## Future Enhancements

Potential areas for improvement:

- Integration with AI/NLP for better recipe and preference extraction
- Real nutrition database integration (USDA, etc.)
- More sophisticated recipe selection algorithms
- Meal prep optimization
- Integration with fitness tracking
- Social sharing features

## License

This module is part of the Metamorphosis CDMX project.
