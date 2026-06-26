/**
 * Metamorphosis Nutrition Engine - Usage Examples
 * 
 * This file demonstrates how to use the Nutrition Engine with dual "His & Hers" profiles.
 */

import { NutritionEngine, PlanResult, RecipeRefinementResult } from "@/lib/nutrition-engine"

// Example 1: Basic Setup with Both Profiles
export function example1BasicSetup() {
  const engine = new NutritionEngine()

  // Set up "Hers" profile for fat loss
  engine.setHerProfile({
    id: "1",
    name: "Her",
    primary_goal: "fat_loss",
    target_calories_per_day: 1600,
    dietary_restrictions: ["gluten-free"],
    preferred_cuisines: ["Mediterranean", "Asian"],
  })

  // Set up "His" profile for muscle gain
  engine.setHisProfile({
    id: "2",
    name: "Him",
    primary_goal: "muscle_gain",
    target_calories_per_day: 2400,
    preferred_cuisines: ["Italian", "American"],
  })

  return engine
}

// Example 2: Generate a 7-Day Meal Plan for Both Profiles
export function example2GenerateMealPlan() {
  const engine = example1BasicSetup()

  const plan = engine.process({
    mode: "PLAN",
    profile_selector: "both",
    context: {
      plan_horizon_days: 7,
      meals_per_day: 3,
      include_grocery_list: true,
      budget_per_day: 50,
    },
  }) as PlanResult

  console.log("Meal Plan Generated:")
  console.log(`- Duration: ${plan.meal_plan.start_date} to ${plan.meal_plan.end_date}`)
  console.log(`- Daily Plans: ${plan.meal_plan.daily_plans.length}`)
  console.log(
    `- Grocery Items: ${plan.meal_plan.grocery_list?.length || 0}`,
  )

  if ("his_profile_summary" in plan && plan.his_profile_summary) {
    console.log("\nHis Profile Summary:")
    console.log(
      `- Avg Daily Calories: ${plan.his_profile_summary.avg_daily_calories}`,
    )
    console.log(
      `- Goal Alignment: ${plan.his_profile_summary.goal_alignment}`,
    )
  }

  if ("hers_profile_summary" in plan && plan.hers_profile_summary) {
    console.log("\nHers Profile Summary:")
    console.log(
      `- Avg Daily Calories: ${plan.hers_profile_summary.avg_daily_calories}`,
    )
    console.log(
      `- Goal Alignment: ${plan.hers_profile_summary.goal_alignment}`,
    )
  }

  return plan
}

// Example 3: Ingest Recipes and Preferences from Text
export function example3IngestRecipes() {
  const engine = new NutritionEngine()

  const result = engine.process({
    mode: "INGEST",
    profile_selector: "his",
    context: {
      text_input: `
        I am vegetarian and allergic to peanuts. 
        I love Mediterranean cuisine and dislike mushrooms.
        
        Recipe: Greek Salad with Quinoa
        A healthy Mediterranean salad with fresh vegetables.
      `,
      extract_preferences: true,
      extract_recipes: true,
    },
  })

  console.log("Ingestion Results:")
  if ("extracted_preferences" in result && result.extracted_preferences) {
    console.log(
      "- Dietary Restrictions:",
      result.extracted_preferences.dietary_restrictions,
    )
    console.log("- Allergies:", result.extracted_preferences.allergies)
  }
  if ("extracted_recipes" in result && result.extracted_recipes) {
    console.log("- Extracted Recipes:", result.extracted_recipes.length)
  }

  return result
}

// Example 4: Refine a Recipe for Fat Loss
export function example4RefineRecipe() {
  const engine = example1BasicSetup()

  // Add a sample recipe
  engine.addRecipe({
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    description: "Classic Italian pasta with creamy sauce",
    ingredients: [
      { name: "pasta", amount: 200, unit: "g" },
      { name: "bacon", amount: 100, unit: "g" },
      { name: "egg", amount: 2, unit: "pieces" },
      { name: "parmesan", amount: 50, unit: "g" },
    ],
    instructions: [
      "Cook pasta according to package directions",
      "Fry bacon until crispy",
      "Mix eggs and parmesan",
      "Combine all ingredients",
    ],
    nutrition_per_serving: {
      calories: 650,
      protein_g: 25,
      carbs_g: 70,
      fat_g: 28,
    },
    servings: 2,
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    cuisine: "Italian",
  })

  // Refine for fat loss goal
  const result = engine.process({
    mode: "RECIPE_REFINEMENT",
    profile_selector: "hers",
    context: {
      recipe_id: "pasta-carbonara",
      target_goal: "fat_loss",
    },
  }) as RecipeRefinementResult

  console.log("Recipe Refinement:")
  console.log(
    `- Original Calories: ${result.original_recipe.nutrition_per_serving.calories}`,
  )
  console.log(
    `- Refined Calories: ${result.refined_recipe.nutrition_per_serving.calories}`,
  )
  console.log(`- Modifications: ${result.modifications.length}`)
  result.modifications.forEach((mod) => {
    console.log(`  * ${mod.description}`)
  })

  return result
}

// Example 5: Generate Single Profile Meal Plan
export function example5SingleProfilePlan() {
  const engine = new NutritionEngine()

  engine.setHisProfile({
    id: "1",
    name: "Him",
    primary_goal: "performance",
    target_calories_per_day: 2800,
  })

  const plan = engine.process({
    mode: "PLAN",
    profile_selector: "his",
    context: {
      plan_horizon_days: 3,
      meals_per_day: 4, // Including snacks
      include_grocery_list: true,
    },
  }) as PlanResult

  console.log("Single Profile Meal Plan:")
  console.log(
    `- Daily Plans: ${plan.meal_plan.daily_plans.length}`,
  )

  // Show first day's meals
  const firstDay = plan.meal_plan.daily_plans[0]
  if (firstDay) {
    console.log("\nFirst Day Meals:")
    firstDay.meals.forEach((meal) => {
      console.log(
        `  - ${meal.meal_type}: ${meal.recipe.name} (${meal.recipe.nutrition_per_serving.calories} cal)`,
      )
    })
  }

  return plan
}
