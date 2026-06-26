"use client"

import * as React from "react"
import { macroTargets, mealPlanSeeds, recipeSeeds, type MealPlanDay, type MealPlanSeed, type RecipeSeed } from "@/lib/ivette-data"
import { makeId, useLocalCollection } from "@/components/metamorphosis/useLocalCollection"

type MealPlan = MealPlanSeed

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function MealPlanWorkspace() {
  const { items: recipes } = useLocalCollection<RecipeSeed>("metamorphosis.recipes", recipeSeeds)
  const { items: plans, upsert, remove } = useLocalCollection<MealPlan>("metamorphosis.mealPlans", mealPlanSeeds)
  const [title, setTitle] = React.useState("Ivette weekly meal plan")
  const [focus, setFocus] = React.useState("Protein anchor, hydration, fiber, simple prep")
  const [selectedDay, setSelectedDay] = React.useState(dayNames[0])
  const [breakfast, setBreakfast] = React.useState("")
  const [snack1, setSnack1] = React.useState("")
  const [lunch, setLunch] = React.useState("")
  const [snack2, setSnack2] = React.useState("")
  const [dinner, setDinner] = React.useState("")
  const current = macroTargets.at(-1)!

  const savePlan = () => {
    const day: MealPlanDay = {
      day: selectedDay,
      breakfast,
      snack1,
      lunch,
      snack2,
      dinner,
      notes: "Generated in local-first MVP. Confirm portions before production use.",
    }
    const groceryList = buildGroceryList(recipes, [day])
    upsert({
      id: makeId("meal-plan"),
      title: title.trim() || "Ivette meal plan",
      focus: focus.trim() || "Daily wellness support",
      targetCalories: current.calories,
      targetProtein: current.protein,
      days: [day],
      groceryList,
      note: "Use this as a private planning draft, not medical advice.",
    })
  }

  const autoFill = () => {
    const firstBreakfast = recipes.find((recipe) => recipe.meal === "breakfast")?.title ?? ""
    const firstSnack = recipes.find((recipe) => recipe.meal === "snack")?.title ?? ""
    const firstLunch = recipes.find((recipe) => recipe.meal === "lunch")?.title ?? ""
    const firstDinner = recipes.find((recipe) => recipe.meal === "dinner")?.title ?? recipes.find((recipe) => recipe.meal === "lunch")?.title ?? ""
    setBreakfast(firstBreakfast)
    setSnack1(firstSnack)
    setLunch(firstLunch)
    setSnack2(firstSnack)
    setDinner(firstDinner)
  }

  const exportPlan = (plan: MealPlan) => {
    const markdown = [
      `# ${plan.title}`,
      "",
      `Focus: ${plan.focus}`,
      `Target: ${plan.targetCalories} kcal / ${plan.targetProtein}g protein`,
      "",
      ...plan.days.flatMap((day) => [
        `## ${day.day}`,
        `- Breakfast: ${day.breakfast || "TBD"}`,
        `- Snack 1: ${day.snack1 || "TBD"}`,
        `- Lunch: ${day.lunch || "TBD"}`,
        `- Snack 2: ${day.snack2 || "TBD"}`,
        `- Dinner: ${day.dinner || "TBD"}`,
        day.notes ? `- Notes: ${day.notes}` : "",
        "",
      ]),
      "## Grocery List",
      ...plan.groceryList.map((item) => `- ${item}`),
    ].join("\n")
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${plan.id}.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">Meal planning</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Meal plans</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">
          Turn saved recipes into daily or weekly plans. Export meal plans as Markdown for Obsidian, agents, or grocery prep.
        </p>
      </header>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">Create meal plan</h2>
          <div className="mt-4 space-y-3">
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Plan title" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <textarea value={focus} onChange={(event) => setFocus(event.target.value)} rows={3} placeholder="Planning focus" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]">
              {dayNames.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
            <RecipeSelect label="Breakfast" value={breakfast} setValue={setBreakfast} recipes={recipes} />
            <RecipeSelect label="Snack 1" value={snack1} setValue={setSnack1} recipes={recipes} />
            <RecipeSelect label="Lunch" value={lunch} setValue={setLunch} recipes={recipes} />
            <RecipeSelect label="Snack 2" value={snack2} setValue={setSnack2} recipes={recipes} />
            <RecipeSelect label="Dinner" value={dinner} setValue={setDinner} recipes={recipes} />
            <div className="grid grid-cols-2 gap-3">
              <button onClick={autoFill} className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#C8913B]">Auto-fill from recipes</button>
              <button onClick={savePlan} className="rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">Save meal plan</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <article className="rounded-[2rem] border border-[#C8913B]/30 bg-[#C8913B]/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#F3C779]">Current target</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{current.calories} kcal · {current.protein}g protein</h2>
            <p className="mt-2 text-sm text-[#D8EAF1]">Plans should stay close to the current nutrition memory unless Ivette changes the target.</p>
          </article>
          <div className="grid gap-4">
            {plans.map((plan) => (
              <article key={plan.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{plan.targetCalories} kcal · {plan.targetProtein}g protein</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{plan.title}</h3>
                    <p className="mt-2 text-sm text-[#D8EAF1]">{plan.focus}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => exportPlan(plan)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#D8EAF1] hover:border-[#38E8FF] hover:text-white">Export</button>
                    <button onClick={() => remove(plan.id)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#D8EAF1] hover:border-red-300 hover:text-red-200">Remove</button>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {plan.days.map((day) => (
                    <div key={`${plan.id}-${day.day}`} className="rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">
                      <p className="font-semibold text-white">{day.day}</p>
                      <p className="mt-2">Breakfast: {day.breakfast || "TBD"}</p>
                      <p>Snack 1: {day.snack1 || "TBD"}</p>
                      <p>Lunch: {day.lunch || "TBD"}</p>
                      <p>Snack 2: {day.snack2 || "TBD"}</p>
                      <p>Dinner: {day.dinner || "TBD"}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">
                  <p className="font-semibold text-white">Grocery list</p>
                  <p className="mt-1">{plan.groceryList.slice(0, 18).join(", ")}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function RecipeSelect({ label, value, setValue, recipes }: { label: string; value: string; setValue: (value: string) => void; recipes: RecipeSeed[] }) {
  return (
    <label className="block text-sm font-semibold text-white">
      {label}
      <select value={value} onChange={(event) => setValue(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]">
        <option value="">Choose recipe</option>
        {recipes.map((recipe) => (
          <option key={`${label}-${recipe.id}`} value={recipe.title}>{recipe.title}</option>
        ))}
      </select>
    </label>
  )
}

function buildGroceryList(recipes: RecipeSeed[], days: MealPlanDay[]) {
  const mealNames = new Set(days.flatMap((day) => [day.breakfast, day.snack1, day.lunch, day.snack2, day.dinner]).filter(Boolean) as string[])
  const ingredients = recipes
    .filter((recipe) => mealNames.has(recipe.title))
    .flatMap((recipe) => recipe.ingredients)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean)
  return Array.from(new Set(ingredients)).sort((a, b) => a.localeCompare(b))
}
