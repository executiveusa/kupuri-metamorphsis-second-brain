/**
 * Nutrition Engine Type Definitions
 * Supports dual "His & Hers" profiles for personalized nutrition planning
 */

/**
 * Primary nutrition goals
 */
export type NutritionGoal = 
  | "fat_loss" 
  | "muscle_gain" 
  | "maintenance" 
  | "performance" 
  | "health";

/**
 * User profile for personalized nutrition planning
 */
export interface NutritionProfile {
  id: string;
  name: string;
  primary_goal: NutritionGoal;
  target_calories_per_day: number;
  dietary_restrictions?: string[];
  allergies?: string[];
  preferred_cuisines?: string[];
  disliked_ingredients?: string[];
}

/**
 * Engine operating modes
 */
export type EngineMode = 
  | "INGEST"              // Extract recipes and preferences from text
  | "PLAN"                // Generate meal plans with grocery lists
  | "RECIPE_REFINEMENT";  // Adapt recipes for different goals

/**
 * Profile selector for dual profile support
 */
export type ProfileSelector = "his" | "hers" | "both";

/**
 * Context for INGEST mode
 */
export interface IngestContext {
  text_input: string;
  extract_preferences?: boolean;
  extract_recipes?: boolean;
}

/**
 * Context for PLAN mode
 */
export interface PlanContext {
  plan_horizon_days: number;
  meals_per_day: number;
  include_grocery_list?: boolean;
  budget_per_day?: number;
}

/**
 * Context for RECIPE_REFINEMENT mode
 */
export interface RecipeRefinementContext {
  recipe_id?: string;
  recipe_text?: string;
  target_goal?: NutritionGoal;
  serving_size?: number;
}

/**
 * Union type for all context types
 */
export type EngineContext = 
  | IngestContext 
  | PlanContext 
  | RecipeRefinementContext;

/**
 * Input parameters for the nutrition engine
 */
export interface EngineInput {
  mode: EngineMode;
  profile_selector: ProfileSelector;
  context: EngineContext;
}

/**
 * Recipe data structure
 */
export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition_per_serving: NutritionInfo;
  servings: number;
  prep_time_minutes?: number;
  cook_time_minutes?: number;
  cuisine?: string;
  tags?: string[];
}

/**
 * Ingredient data structure
 */
export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

/**
 * Nutrition information
 */
export interface NutritionInfo {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g?: number;
  sugar_g?: number;
  sodium_mg?: number;
}

/**
 * Meal entry in a meal plan
 */
export interface MealEntry {
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  recipe: Recipe;
  profile: "his" | "hers" | "shared";
  serving_size_multiplier: number;
}

/**
 * Daily meal plan
 */
export interface DailyMealPlan {
  date: string;
  meals: MealEntry[];
  total_nutrition_his?: NutritionInfo;
  total_nutrition_hers?: NutritionInfo;
}

/**
 * Grocery list item
 */
export interface GroceryItem {
  ingredient: string;
  total_amount: number;
  unit: string;
  category?: string;
  estimated_cost?: number;
}

/**
 * Complete meal plan with grocery list
 */
export interface MealPlan {
  start_date: string;
  end_date: string;
  daily_plans: DailyMealPlan[];
  grocery_list?: GroceryItem[];
  total_estimated_cost?: number;
}

/**
 * Extracted preferences from text
 */
export interface ExtractedPreferences {
  dietary_restrictions: string[];
  allergies: string[];
  preferred_cuisines: string[];
  disliked_ingredients: string[];
  favorite_meals: string[];
}

/**
 * Result from INGEST mode
 */
export interface IngestResult {
  extracted_recipes?: Recipe[];
  extracted_preferences?: ExtractedPreferences;
  raw_text: string;
}

/**
 * Result from PLAN mode
 */
export interface PlanResult {
  meal_plan: MealPlan;
  his_profile_summary?: ProfileSummary;
  hers_profile_summary?: ProfileSummary;
}

/**
 * Profile summary
 */
export interface ProfileSummary {
  profile: NutritionProfile;
  total_calories: number;
  avg_daily_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  goal_alignment: "on_track" | "over" | "under";
}

/**
 * Result from RECIPE_REFINEMENT mode
 */
export interface RecipeRefinementResult {
  original_recipe: Recipe;
  refined_recipe: Recipe;
  modifications: RecipeModification[];
  goal_alignment: string;
}

/**
 * Recipe modification details
 */
export interface RecipeModification {
  type: "ingredient_swap" | "portion_adjust" | "cooking_method" | "addition" | "removal";
  description: string;
  nutrition_impact?: Partial<NutritionInfo>;
}

/**
 * Union type for all result types
 */
export type EngineResult = 
  | IngestResult 
  | PlanResult 
  | RecipeRefinementResult;
