import { beforeEach, describe, expect, it } from "vitest"

import {
  NutritionEngine,
  type NutritionProfile,
  type Recipe,
} from "@/lib/nutrition-engine"

describe("NutritionEngine", () => {
  let engine: NutritionEngine

  beforeEach(() => {
    engine = new NutritionEngine()
  })

  describe("Profile Management", () => {
    it("should set and get His profile", () => {
      const profile: NutritionProfile = {
        id: "1",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      }

      engine.setHisProfile(profile)
      expect(engine.getHisProfile()).toEqual(profile)
    })

    it("should set and get Hers profile", () => {
      const profile: NutritionProfile = {
        id: "2",
        name: "Her",
        primary_goal: "fat_loss",
        target_calories_per_day: 1600,
      }

      engine.setHerProfile(profile)
      expect(engine.getHerProfile()).toEqual(profile)
    })

    it("should handle both profiles independently", () => {
      const hisProfile: NutritionProfile = {
        id: "1",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      }

      const hersProfile: NutritionProfile = {
        id: "2",
        name: "Her",
        primary_goal: "fat_loss",
        target_calories_per_day: 1600,
      }

      engine.setHisProfile(hisProfile)
      engine.setHerProfile(hersProfile)

      expect(engine.getHisProfile()).toEqual(hisProfile)
      expect(engine.getHerProfile()).toEqual(hersProfile)
    })
  })

  describe("Recipe Management", () => {
    it("should add a single recipe", () => {
      const recipe: Recipe = {
        id: "recipe-1",
        name: "Test Recipe",
        ingredients: [{ name: "ingredient", amount: 1, unit: "cup" }],
        instructions: ["Step 1"],
        nutrition_per_serving: {
          calories: 300,
          protein_g: 20,
          carbs_g: 30,
          fat_g: 10,
        },
        servings: 2,
      }

      engine.addRecipe(recipe)
      expect(engine.getRecipes()).toHaveLength(1)
      expect(engine.getRecipes()[0]).toEqual(recipe)
    })

    it("should add multiple recipes", () => {
      const recipes: Recipe[] = [
        {
          id: "recipe-1",
          name: "Recipe 1",
          ingredients: [],
          instructions: [],
          nutrition_per_serving: {
            calories: 300,
            protein_g: 20,
            carbs_g: 30,
            fat_g: 10,
          },
          servings: 1,
        },
        {
          id: "recipe-2",
          name: "Recipe 2",
          ingredients: [],
          instructions: [],
          nutrition_per_serving: {
            calories: 400,
            protein_g: 30,
            carbs_g: 40,
            fat_g: 15,
          },
          servings: 1,
        },
      ]

      engine.addRecipes(recipes)
      expect(engine.getRecipes()).toHaveLength(2)
    })
  })

  describe("INGEST Mode", () => {
    it("should extract preferences from text", () => {
      const result = engine.process({
        mode: "INGEST",
        profile_selector: "his",
        context: {
          text_input:
            "I am vegetarian and allergic to peanuts. I love Italian food.",
          extract_preferences: true,
        },
      })

      expect(result).toHaveProperty("extracted_preferences")
      if ("extracted_preferences" in result && result.extracted_preferences) {
        expect(result.extracted_preferences.dietary_restrictions).toContain(
          "vegetarian",
        )
        expect(result.extracted_preferences.allergies).toContain("peanuts")
      }
    })

    it("should extract recipes from text", () => {
      const result = engine.process({
        mode: "INGEST",
        profile_selector: "his",
        context: {
          text_input: "Recipe: Healthy Smoothie\nRecipe: Green Salad",
          extract_recipes: true,
        },
      })

      expect(result).toHaveProperty("extracted_recipes")
      if ("extracted_recipes" in result && result.extracted_recipes) {
        expect(result.extracted_recipes).toHaveLength(2)
      }
    })
  })

  describe("PLAN Mode", () => {
    it("should generate meal plan for His profile", () => {
      const profile: NutritionProfile = {
        id: "1",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      }

      engine.setHisProfile(profile)

      const result = engine.process({
        mode: "PLAN",
        profile_selector: "his",
        context: {
          plan_horizon_days: 3,
          meals_per_day: 3,
          include_grocery_list: true,
        },
      })

      expect(result).toHaveProperty("meal_plan")
      if ("meal_plan" in result) {
        expect(result.meal_plan.daily_plans).toHaveLength(3)
        expect(result.meal_plan.grocery_list).toBeDefined()
      }
      if ("his_profile_summary" in result) {
        expect(result.his_profile_summary).toBeDefined()
      }
    })

    it("should generate meal plan for Hers profile", () => {
      const profile: NutritionProfile = {
        id: "2",
        name: "Her",
        primary_goal: "fat_loss",
        target_calories_per_day: 1600,
      }

      engine.setHerProfile(profile)

      const result = engine.process({
        mode: "PLAN",
        profile_selector: "hers",
        context: {
          plan_horizon_days: 2,
          meals_per_day: 3,
        },
      })

      expect(result).toHaveProperty("meal_plan")
      if ("meal_plan" in result) {
        expect(result.meal_plan.daily_plans).toHaveLength(2)
      }
      if ("hers_profile_summary" in result) {
        expect(result.hers_profile_summary).toBeDefined()
      }
    })

    it("should generate meal plan for both profiles", () => {
      const hisProfile: NutritionProfile = {
        id: "1",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      }

      const hersProfile: NutritionProfile = {
        id: "2",
        name: "Her",
        primary_goal: "fat_loss",
        target_calories_per_day: 1600,
      }

      engine.setHisProfile(hisProfile)
      engine.setHerProfile(hersProfile)

      const result = engine.process({
        mode: "PLAN",
        profile_selector: "both",
        context: {
          plan_horizon_days: 7,
          meals_per_day: 3,
          include_grocery_list: true,
        },
      })

      expect(result).toHaveProperty("meal_plan")
      if ("meal_plan" in result) {
        expect(result.meal_plan.daily_plans).toHaveLength(7)
        expect(result.meal_plan.grocery_list).toBeDefined()

        // Each day should have meals for both profiles
        const firstDay = result.meal_plan.daily_plans[0]
        if (firstDay) {
          const hisMeals = firstDay.meals.filter((m) => m.profile === "his")
          const hersMeals = firstDay.meals.filter((m) => m.profile === "hers")
          expect(hisMeals.length).toBeGreaterThan(0)
          expect(hersMeals.length).toBeGreaterThan(0)
        }
      }
      if ("his_profile_summary" in result) {
        expect(result.his_profile_summary).toBeDefined()
      }
      if ("hers_profile_summary" in result) {
        expect(result.hers_profile_summary).toBeDefined()
      }
    })

    it("should throw error when profile not set", () => {
      expect(() =>
        engine.process({
          mode: "PLAN",
          profile_selector: "his",
          context: {
            plan_horizon_days: 7,
            meals_per_day: 3,
          },
        }),
      ).toThrow("His profile must be set")
    })
  })

  describe("RECIPE_REFINEMENT Mode", () => {
    it("should refine recipe for fat loss goal", () => {
      const recipe: Recipe = {
        id: "recipe-1",
        name: "High Calorie Meal",
        ingredients: [{ name: "pasta", amount: 200, unit: "g" }],
        instructions: ["Cook pasta"],
        nutrition_per_serving: {
          calories: 600,
          protein_g: 20,
          carbs_g: 80,
          fat_g: 20,
        },
        servings: 1,
      }

      engine.addRecipe(recipe)

      const profile: NutritionProfile = {
        id: "1",
        name: "Her",
        primary_goal: "fat_loss",
        target_calories_per_day: 1600,
      }

      engine.setHerProfile(profile)

      const result = engine.process({
        mode: "RECIPE_REFINEMENT",
        profile_selector: "hers",
        context: {
          recipe_id: "recipe-1",
          target_goal: "fat_loss",
        },
      })

      expect(result).toHaveProperty("refined_recipe")
      expect(result).toHaveProperty("modifications")
      if ("refined_recipe" in result) {
        // Refined recipe should have lower calories
        expect(result.refined_recipe.nutrition_per_serving.calories).toBeLessThan(
          recipe.nutrition_per_serving.calories,
        )
      }
    })

    it("should refine recipe for muscle gain goal", () => {
      const recipe: Recipe = {
        id: "recipe-2",
        name: "Low Protein Meal",
        ingredients: [{ name: "rice", amount: 150, unit: "g" }],
        instructions: ["Cook rice"],
        nutrition_per_serving: {
          calories: 400,
          protein_g: 10,
          carbs_g: 80,
          fat_g: 5,
        },
        servings: 1,
      }

      engine.addRecipe(recipe)

      const profile: NutritionProfile = {
        id: "2",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      }

      engine.setHisProfile(profile)

      const result = engine.process({
        mode: "RECIPE_REFINEMENT",
        profile_selector: "his",
        context: {
          recipe_id: "recipe-2",
          target_goal: "muscle_gain",
        },
      })

      expect(result).toHaveProperty("refined_recipe")
      if ("refined_recipe" in result) {
        // Refined recipe should have more protein
        expect(result.refined_recipe.nutrition_per_serving.protein_g).toBeGreaterThan(
          recipe.nutrition_per_serving.protein_g,
        )
      }
    })

    it("should adjust serving size", () => {
      const recipe: Recipe = {
        id: "recipe-3",
        name: "Adjustable Recipe",
        ingredients: [{ name: "chicken", amount: 100, unit: "g" }],
        instructions: ["Cook chicken"],
        nutrition_per_serving: {
          calories: 300,
          protein_g: 30,
          carbs_g: 10,
          fat_g: 10,
        },
        servings: 2,
      }

      engine.addRecipe(recipe)
      engine.setHisProfile({
        id: "1",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      })

      const result = engine.process({
        mode: "RECIPE_REFINEMENT",
        profile_selector: "his",
        context: {
          recipe_id: "recipe-3",
          serving_size: 4,
        },
      })

      if ("refined_recipe" in result) {
        expect(result.refined_recipe.servings).toBe(4)
        const firstIngredient = result.refined_recipe.ingredients[0]
        if (firstIngredient) {
          expect(firstIngredient.amount).toBe(200) // Doubled
        }
      }
    })
  })

  describe("Usage Example from Problem Statement", () => {
    it("should work as described in the usage example", () => {
      const engine = new NutritionEngine()

      engine.setHerProfile({
        id: "1",
        name: "Her",
        primary_goal: "fat_loss",
        target_calories_per_day: 1600,
      })

      engine.setHisProfile({
        id: "2",
        name: "Him",
        primary_goal: "muscle_gain",
        target_calories_per_day: 2400,
      })

      const plan = engine.process({
        mode: "PLAN",
        profile_selector: "both",
        context: { plan_horizon_days: 7, meals_per_day: 3 },
      })

      expect(plan).toHaveProperty("meal_plan")
      if ("meal_plan" in plan) {
        expect(plan.meal_plan.daily_plans).toHaveLength(7)
      }
      if ("his_profile_summary" in plan) {
        expect(plan.his_profile_summary).toBeDefined()
      }
      if ("hers_profile_summary" in plan) {
        expect(plan.hers_profile_summary).toBeDefined()
      }
    })
  })
})
