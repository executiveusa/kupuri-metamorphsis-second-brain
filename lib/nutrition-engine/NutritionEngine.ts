/**
 * Metamorphosis Nutrition Engine
 * 
 * A dual-profile nutrition planning engine that supports personalized meal planning,
 * recipe ingestion, and recipe refinement for "His & Hers" profiles.
 * 
 * @example
 * ```typescript
 * const engine = new NutritionEngine();
 * engine.setHerProfile({ 
 *   id: '1', 
 *   name: 'Her', 
 *   primary_goal: 'fat_loss', 
 *   target_calories_per_day: 1600 
 * });
 * engine.setHisProfile({ 
 *   id: '2', 
 *   name: 'Him', 
 *   primary_goal: 'muscle_gain', 
 *   target_calories_per_day: 2400 
 * });
 * 
 * const plan = engine.process({
 *   mode: 'PLAN',
 *   profile_selector: 'both',
 *   context: { plan_horizon_days: 7, meals_per_day: 3 }
 * });
 * ```
 */

import type {
  NutritionProfile,
  EngineInput,
  EngineResult,
  IngestResult,
  PlanResult,
  RecipeRefinementResult,
  IngestContext,
  PlanContext,
  RecipeRefinementContext,
  Recipe,
  MealPlan,
  DailyMealPlan,
  MealEntry,
  GroceryItem,
  NutritionInfo,
  ExtractedPreferences,
  ProfileSummary,
  RecipeModification,
  Ingredient,
} from "./types"

export class NutritionEngine {
  private hisProfile: NutritionProfile | null = null
  private hersProfile: NutritionProfile | null = null
  private recipeDatabase: Recipe[] = []

  /**
   * Set the "His" profile for personalized nutrition planning
   */
  setHisProfile(profile: NutritionProfile): void {
    this.hisProfile = profile
  }

  /**
   * Set the "Hers" profile for personalized nutrition planning
   */
  setHerProfile(profile: NutritionProfile): void {
    this.hersProfile = profile
  }

  /**
   * Get the current "His" profile
   */
  getHisProfile(): NutritionProfile | null {
    return this.hisProfile
  }

  /**
   * Get the current "Hers" profile
   */
  getHerProfile(): NutritionProfile | null {
    return this.hersProfile
  }

  /**
   * Add a recipe to the internal recipe database
   */
  addRecipe(recipe: Recipe): void {
    this.recipeDatabase.push(recipe)
  }

  /**
   * Add multiple recipes to the internal recipe database
   */
  addRecipes(recipes: Recipe[]): void {
    this.recipeDatabase.push(...recipes)
  }

  /**
   * Get all recipes from the database
   */
  getRecipes(): Recipe[] {
    return this.recipeDatabase
  }

  /**
   * Process a nutrition engine request based on the mode
   */
  process(input: EngineInput): EngineResult {
    switch (input.mode) {
      case "INGEST":
        return this.processIngest(input.context as IngestContext)
      case "PLAN":
        return this.processPlan(
          input.context as PlanContext,
          input.profile_selector,
        )
      case "RECIPE_REFINEMENT":
        return this.processRecipeRefinement(
          input.context as RecipeRefinementContext,
          input.profile_selector,
        )
      default:
        throw new Error(`Unsupported engine mode: ${input.mode}`)
    }
  }

  /**
   * INGEST mode: Extract recipes and preferences from text
   */
  private processIngest(context: IngestContext): IngestResult {
    const result: IngestResult = {
      raw_text: context.text_input,
    }

    if (context.extract_recipes) {
      result.extracted_recipes = this.extractRecipesFromText(
        context.text_input,
      )
    }

    if (context.extract_preferences) {
      result.extracted_preferences =
        this.extractPreferencesFromText(context.text_input)
    }

    return result
  }

  /**
   * PLAN mode: Generate meal plans with grocery lists
   */
  private processPlan(
    context: PlanContext,
    profileSelector: "his" | "hers" | "both",
  ): PlanResult {
    // Validate profiles
    if (
      profileSelector === "both" &&
      (!this.hisProfile || !this.hersProfile)
    ) {
      throw new Error("Both profiles must be set for 'both' profile selector")
    }
    if (profileSelector === "his" && !this.hisProfile) {
      throw new Error("His profile must be set")
    }
    if (profileSelector === "hers" && !this.hersProfile) {
      throw new Error("Hers profile must be set")
    }

    // Generate meal plan
    const mealPlan = this.generateMealPlan(context, profileSelector)

    const result: PlanResult = {
      meal_plan: mealPlan,
    }

    // Add profile summaries
    if (profileSelector === "his" || profileSelector === "both") {
      result.his_profile_summary = this.calculateProfileSummary(
        this.hisProfile!,
        mealPlan,
        "his",
      )
    }

    if (profileSelector === "hers" || profileSelector === "both") {
      result.hers_profile_summary = this.calculateProfileSummary(
        this.hersProfile!,
        mealPlan,
        "hers",
      )
    }

    return result
  }

  /**
   * RECIPE_REFINEMENT mode: Adapt recipes for different goals
   */
  private processRecipeRefinement(
    context: RecipeRefinementContext,
    profileSelector: "his" | "hers" | "both",
  ): RecipeRefinementResult {
    let originalRecipe: Recipe

    // Get the recipe to refine
    if (context.recipe_id) {
      const found = this.recipeDatabase.find((r) => r.id === context.recipe_id)
      if (!found) {
        throw new Error(`Recipe not found: ${context.recipe_id}`)
      }
      originalRecipe = found
    } else if (context.recipe_text) {
      // Parse recipe from text (simplified)
      originalRecipe = this.parseRecipeFromText(context.recipe_text)
    } else {
      throw new Error("Either recipe_id or recipe_text must be provided")
    }

    // Get target profile
    const targetProfile =
      profileSelector === "his"
        ? this.hisProfile
        : profileSelector === "hers"
          ? this.hersProfile
          : this.hisProfile || this.hersProfile

    if (!targetProfile) {
      throw new Error("No profile available for recipe refinement")
    }

    const targetGoal = context.target_goal || targetProfile.primary_goal

    // Refine the recipe
    const { refinedRecipe, modifications } = this.refineRecipe(
      originalRecipe,
      targetGoal,
      context.serving_size,
    )

    return {
      original_recipe: originalRecipe,
      refined_recipe: refinedRecipe,
      modifications,
      goal_alignment: this.assessGoalAlignment(refinedRecipe, targetGoal),
    }
  }

  /**
   * Extract recipes from text (simplified implementation)
   */
  private extractRecipesFromText(text: string): Recipe[] {
    // This is a simplified implementation
    // In a real implementation, this would use NLP/AI to extract recipes
    const recipes: Recipe[] = []

    // Simple pattern matching for demonstration
    const recipePattern = /Recipe:\s*([^\n]+)/gi
    const matches = text.matchAll(recipePattern)

    for (const match of matches) {
      const recipeName = match[1] ? match[1].trim() : "Unnamed Recipe"
      recipes.push({
        id: `recipe-${Date.now()}-${Math.random()}`,
        name: recipeName,
        ingredients: [],
        instructions: [],
        nutrition_per_serving: {
          calories: 0,
          protein_g: 0,
          carbs_g: 0,
          fat_g: 0,
        },
        servings: 1,
      })
    }

    return recipes
  }

  /**
   * Extract preferences from text (simplified implementation)
   */
  private extractPreferencesFromText(text: string): ExtractedPreferences {
    // This is a simplified implementation
    // In a real implementation, this would use NLP/AI to extract preferences
    const preferences: ExtractedPreferences = {
      dietary_restrictions: [],
      allergies: [],
      preferred_cuisines: [],
      disliked_ingredients: [],
      favorite_meals: [],
    }

    const lowerText = text.toLowerCase()

    // Simple keyword matching
    if (lowerText.includes("vegetarian")) {
      preferences.dietary_restrictions.push("vegetarian")
    }
    if (lowerText.includes("vegan")) {
      preferences.dietary_restrictions.push("vegan")
    }
    if (lowerText.includes("gluten-free")) {
      preferences.dietary_restrictions.push("gluten-free")
    }
    if (lowerText.includes("dairy-free")) {
      preferences.dietary_restrictions.push("dairy-free")
    }

    // Allergy detection
    const allergyPattern = /allergic to ([^,.]+)/gi
    const allergyMatches = text.matchAll(allergyPattern)
    for (const match of allergyMatches) {
      if (match[1]) {
        preferences.allergies.push(match[1].trim())
      }
    }

    return preferences
  }

  /**
   * Generate a meal plan based on context and profile selector
   */
  private generateMealPlan(
    context: PlanContext,
    profileSelector: "his" | "hers" | "both",
  ): MealPlan {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + context.plan_horizon_days - 1)

    const dailyPlans: DailyMealPlan[] = []
    const groceryMap = new Map<string, GroceryItem>()

    // Generate daily plans
    for (let i = 0; i < context.plan_horizon_days; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + i)

      const dailyPlan = this.generateDailyMealPlan(
        currentDate,
        context.meals_per_day,
        profileSelector,
      )

      dailyPlans.push(dailyPlan)

      // Aggregate grocery items
      if (context.include_grocery_list) {
        this.aggregateGroceryItems(dailyPlan, groceryMap)
      }
    }

    const mealPlan: MealPlan = {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      daily_plans: dailyPlans,
    }

    if (context.include_grocery_list) {
      mealPlan.grocery_list = Array.from(groceryMap.values())
      if (context.budget_per_day) {
        mealPlan.total_estimated_cost =
          context.budget_per_day * context.plan_horizon_days
      }
    }

    return mealPlan
  }

  /**
   * Generate a daily meal plan
   */
  private generateDailyMealPlan(
    date: Date,
    mealsPerDay: number,
    profileSelector: "his" | "hers" | "both",
  ): DailyMealPlan {
    const meals: MealEntry[] = []
    const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const

    // Generate meals for the day
    for (let i = 0; i < mealsPerDay; i++) {
      const mealType = mealTypes[i] || "snack"

      // In a real implementation, this would select appropriate recipes
      // For now, create sample meals
      const recipe = this.selectRecipeForMeal(mealType, profileSelector)

      if (profileSelector === "both") {
        // Create separate meal entries for his and hers
        meals.push({
          meal_type: mealType,
          recipe,
          profile: "his",
          serving_size_multiplier: this.calculateServingMultiplier(
            recipe,
            this.hisProfile!,
          ),
        })
        meals.push({
          meal_type: mealType,
          recipe,
          profile: "hers",
          serving_size_multiplier: this.calculateServingMultiplier(
            recipe,
            this.hersProfile!,
          ),
        })
      } else {
        const profile =
          profileSelector === "his" ? this.hisProfile! : this.hersProfile!
        meals.push({
          meal_type: mealType,
          recipe,
          profile: profileSelector,
          serving_size_multiplier: this.calculateServingMultiplier(
            recipe,
            profile,
          ),
        })
      }
    }

    const dailyPlan: DailyMealPlan = {
      date: date.toISOString(),
      meals,
    }

    // Calculate total nutrition
    if (profileSelector === "his" || profileSelector === "both") {
      dailyPlan.total_nutrition_his = this.calculateDailyNutrition(
        meals.filter((m) => m.profile === "his"),
      )
    }
    if (profileSelector === "hers" || profileSelector === "both") {
      dailyPlan.total_nutrition_hers = this.calculateDailyNutrition(
        meals.filter((m) => m.profile === "hers"),
      )
    }

    return dailyPlan
  }

  /**
   * Select a recipe for a specific meal type
   */
  private selectRecipeForMeal(
    mealType: "breakfast" | "lunch" | "dinner" | "snack",
    profileSelector: "his" | "hers" | "both",
  ): Recipe {
    // Filter recipes from database or create sample recipe
    const availableRecipes = this.recipeDatabase.filter((r) =>
      r.tags?.includes(mealType),
    )

    if (availableRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableRecipes.length)
      const selectedRecipe = availableRecipes[randomIndex]
      if (selectedRecipe) {
        return selectedRecipe
      }
    }

    // Create a sample recipe if none available
    return this.createSampleRecipe(mealType)
  }

  /**
   * Create a sample recipe for demonstration
   */
  private createSampleRecipe(
    mealType: "breakfast" | "lunch" | "dinner" | "snack",
  ): Recipe {
    const recipes = {
      breakfast: {
        name: "Protein Oatmeal Bowl",
        calories: 350,
        protein: 20,
        carbs: 45,
        fat: 10,
      },
      lunch: {
        name: "Grilled Chicken Salad",
        calories: 450,
        protein: 35,
        carbs: 30,
        fat: 18,
      },
      dinner: {
        name: "Salmon with Vegetables",
        calories: 550,
        protein: 40,
        carbs: 35,
        fat: 25,
      },
      snack: {
        name: "Greek Yogurt with Berries",
        calories: 150,
        protein: 15,
        carbs: 20,
        fat: 3,
      },
    }

    const recipeData = recipes[mealType]

    return {
      id: `sample-${mealType}-${Date.now()}`,
      name: recipeData.name,
      description: `A healthy ${mealType} option`,
      ingredients: [
        { name: "Main ingredient", amount: 1, unit: "serving" },
      ],
      instructions: ["Prepare ingredients", "Cook as desired", "Serve"],
      nutrition_per_serving: {
        calories: recipeData.calories,
        protein_g: recipeData.protein,
        carbs_g: recipeData.carbs,
        fat_g: recipeData.fat,
      },
      servings: 1,
      prep_time_minutes: 10,
      cook_time_minutes: 20,
      tags: [mealType],
    }
  }

  /**
   * Calculate serving multiplier based on calorie needs
   */
  private calculateServingMultiplier(
    recipe: Recipe,
    profile: NutritionProfile,
  ): number {
    // Simple calculation: adjust serving size based on target calories
    const recipeCalories = recipe.nutrition_per_serving.calories
    const targetCaloriesPerMeal = profile.target_calories_per_day / 3 // Assuming 3 meals

    if (recipeCalories === 0) return 1

    return Math.round((targetCaloriesPerMeal / recipeCalories) * 10) / 10
  }

  /**
   * Calculate total daily nutrition from meals
   */
  private calculateDailyNutrition(meals: MealEntry[]): NutritionInfo {
    const total: NutritionInfo = {
      calories: 0,
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      sodium_mg: 0,
    }

    for (const meal of meals) {
      const nutrition = meal.recipe.nutrition_per_serving
      const multiplier = meal.serving_size_multiplier

      total.calories += nutrition.calories * multiplier
      total.protein_g += nutrition.protein_g * multiplier
      total.carbs_g += nutrition.carbs_g * multiplier
      total.fat_g += nutrition.fat_g * multiplier
      total.fiber_g = (total.fiber_g || 0) + ((nutrition.fiber_g || 0) * multiplier)
      total.sugar_g = (total.sugar_g || 0) + ((nutrition.sugar_g || 0) * multiplier)
      total.sodium_mg = (total.sodium_mg || 0) + ((nutrition.sodium_mg || 0) * multiplier)
    }

    return total
  }

  /**
   * Aggregate grocery items from daily plan
   */
  private aggregateGroceryItems(
    dailyPlan: DailyMealPlan,
    groceryMap: Map<string, GroceryItem>,
  ): void {
    for (const meal of dailyPlan.meals) {
      for (const ingredient of meal.recipe.ingredients) {
        const key = `${ingredient.name}-${ingredient.unit}`
        const existing = groceryMap.get(key)

        if (existing) {
          existing.total_amount +=
            ingredient.amount * meal.serving_size_multiplier
        } else {
          groceryMap.set(key, {
            ingredient: ingredient.name,
            total_amount: ingredient.amount * meal.serving_size_multiplier,
            unit: ingredient.unit,
          })
        }
      }
    }
  }

  /**
   * Calculate profile summary for a meal plan
   */
  private calculateProfileSummary(
    profile: NutritionProfile,
    mealPlan: MealPlan,
    profileType: "his" | "hers",
  ): ProfileSummary {
    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0

    for (const dailyPlan of mealPlan.daily_plans) {
      const nutrition =
        profileType === "his"
          ? dailyPlan.total_nutrition_his
          : dailyPlan.total_nutrition_hers

      if (nutrition) {
        totalCalories += nutrition.calories
        totalProtein += nutrition.protein_g
        totalCarbs += nutrition.carbs_g
        totalFat += nutrition.fat_g
      }
    }

    const avgDailyCalories = totalCalories / mealPlan.daily_plans.length
    const targetCalories = profile.target_calories_per_day

    let goalAlignment: "on_track" | "over" | "under" = "on_track"
    if (avgDailyCalories > targetCalories * 1.1) {
      goalAlignment = "over"
    } else if (avgDailyCalories < targetCalories * 0.9) {
      goalAlignment = "under"
    }

    return {
      profile,
      total_calories: totalCalories,
      avg_daily_calories: avgDailyCalories,
      total_protein_g: totalProtein,
      total_carbs_g: totalCarbs,
      total_fat_g: totalFat,
      goal_alignment: goalAlignment,
    }
  }

  /**
   * Parse recipe from text (simplified)
   */
  private parseRecipeFromText(text: string): Recipe {
    // This is a very simplified implementation
    // In a real system, this would use NLP/AI
    return {
      id: `parsed-${Date.now()}`,
      name: "Parsed Recipe",
      ingredients: [],
      instructions: text.split("\n").filter((line) => line.trim().length > 0),
      nutrition_per_serving: {
        calories: 0,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
      },
      servings: 1,
    }
  }

  /**
   * Refine a recipe for a specific goal
   */
  private refineRecipe(
    recipe: Recipe,
    targetGoal: NutritionProfile["primary_goal"],
    servingSize?: number,
  ): { refinedRecipe: Recipe; modifications: RecipeModification[] } {
    const refinedRecipe: Recipe = JSON.parse(JSON.stringify(recipe)) as Recipe
    const modifications: RecipeModification[] = []

    // Adjust serving size if specified
    if (servingSize && servingSize !== recipe.servings) {
      const multiplier = servingSize / recipe.servings
      refinedRecipe.servings = servingSize
      refinedRecipe.ingredients = refinedRecipe.ingredients.map((ing) => ({
        ...ing,
        amount: ing.amount * multiplier,
      }))

      modifications.push({
        type: "portion_adjust",
        description: `Adjusted serving size from ${recipe.servings} to ${servingSize}`,
      })
    }

    // Apply goal-specific modifications
    switch (targetGoal) {
      case "fat_loss":
        modifications.push(
          ...this.applyFatLossModifications(refinedRecipe),
        )
        break
      case "muscle_gain":
        modifications.push(
          ...this.applyMuscleGainModifications(refinedRecipe),
        )
        break
      case "performance":
        modifications.push(
          ...this.applyPerformanceModifications(refinedRecipe),
        )
        break
      default:
        // No modifications for maintenance or health goals
        break
    }

    return { refinedRecipe, modifications }
  }

  /**
   * Apply fat loss modifications to a recipe
   */
  private applyFatLossModifications(recipe: Recipe): RecipeModification[] {
    const modifications: RecipeModification[] = []

    // Reduce overall calories by 15%
    const calorieReduction = recipe.nutrition_per_serving.calories * 0.15
    const originalFat = recipe.nutrition_per_serving.fat_g
    const fatReduction = originalFat * 0.3

    recipe.nutrition_per_serving.calories -= calorieReduction
    recipe.nutrition_per_serving.fat_g -= fatReduction

    modifications.push({
      type: "cooking_method",
      description: "Reduced overall calories by 15% and fat content by 30%",
      nutrition_impact: {
        calories: -calorieReduction,
        fat_g: -fatReduction,
      },
    })

    return modifications
  }

  /**
   * Apply muscle gain modifications to a recipe
   */
  private applyMuscleGainModifications(recipe: Recipe): RecipeModification[] {
    const modifications: RecipeModification[] = []

    // Increase protein by 25%
    const proteinIncrease = recipe.nutrition_per_serving.protein_g * 0.25
    recipe.nutrition_per_serving.protein_g += proteinIncrease
    recipe.nutrition_per_serving.calories += proteinIncrease * 4 // 4 cal per gram of protein

    modifications.push({
      type: "ingredient_swap",
      description: "Increased protein content by 25%",
      nutrition_impact: {
        protein_g: proteinIncrease,
        calories: proteinIncrease * 4,
      },
    })

    return modifications
  }

  /**
   * Apply performance modifications to a recipe
   */
  private applyPerformanceModifications(
    recipe: Recipe,
  ): RecipeModification[] {
    const modifications: RecipeModification[] = []

    // Increase carbs by 20% for energy
    const carbIncrease = recipe.nutrition_per_serving.carbs_g * 0.2
    recipe.nutrition_per_serving.carbs_g += carbIncrease
    recipe.nutrition_per_serving.calories += carbIncrease * 4 // 4 cal per gram of carbs

    modifications.push({
      type: "addition",
      description: "Increased carbohydrates by 20% for enhanced performance",
      nutrition_impact: {
        carbs_g: carbIncrease,
        calories: carbIncrease * 4,
      },
    })

    return modifications
  }

  /**
   * Assess how well a recipe aligns with a goal
   */
  private assessGoalAlignment(
    recipe: Recipe,
    goal: NutritionProfile["primary_goal"],
  ): string {
    const nutrition = recipe.nutrition_per_serving
    const proteinRatio = nutrition.protein_g / (nutrition.calories / 4)
    const carbRatio = nutrition.carbs_g / (nutrition.calories / 4)
    const fatRatio = nutrition.fat_g / (nutrition.calories / 9)

    switch (goal) {
      case "fat_loss":
        return proteinRatio > 0.3 && fatRatio < 0.3
          ? "Well aligned for fat loss"
          : "Moderately aligned for fat loss"
      case "muscle_gain":
        return proteinRatio > 0.35
          ? "Well aligned for muscle gain"
          : "Moderately aligned for muscle gain"
      case "performance":
        return carbRatio > 0.4
          ? "Well aligned for performance"
          : "Moderately aligned for performance"
      default:
        return "Balanced nutrition"
    }
  }
}
