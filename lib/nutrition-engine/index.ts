/**
 * Metamorphosis Nutrition Engine - Module Exports
 * 
 * This module provides a comprehensive nutrition planning engine that supports
 * dual "His & Hers" profiles for personalized meal planning and recipe management.
 * 
 * @module nutrition-engine
 */

// Export the main engine class
export { NutritionEngine } from "./NutritionEngine"

// Export all types
export type {
  NutritionGoal,
  NutritionProfile,
  EngineMode,
  ProfileSelector,
  IngestContext,
  PlanContext,
  RecipeRefinementContext,
  EngineContext,
  EngineInput,
  Recipe,
  Ingredient,
  NutritionInfo,
  MealEntry,
  DailyMealPlan,
  GroceryItem,
  MealPlan,
  ExtractedPreferences,
  IngestResult,
  PlanResult,
  ProfileSummary,
  RecipeRefinementResult,
  RecipeModification,
  EngineResult,
} from "./types"
