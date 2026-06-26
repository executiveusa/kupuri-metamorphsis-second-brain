"use client"

import * as React from "react"
import { macroTargets, recipeSeeds, type RecipeSeed } from "@/lib/ivette-data"
import { makeId, useLocalCollection } from "@/components/metamorphosis/useLocalCollection"

type Recipe = RecipeSeed

type ImportResult = {
  created: number
  errors: string[]
}

export function RecipeWorkspace() {
  const { items, upsert, remove, setItems } = useLocalCollection<Recipe>("metamorphosis.recipes", recipeSeeds)
  const [title, setTitle] = React.useState("")
  const [mode, setMode] = React.useState<Recipe["mode"]>("hers")
  const [meal, setMeal] = React.useState<Recipe["meal"]>("lunch")
  const [protein, setProtein] = React.useState(35)
  const [carbs, setCarbs] = React.useState(35)
  const [fat, setFat] = React.useState(15)
  const [ingredientsText, setIngredientsText] = React.useState("Pechuga de pollo\nArroz integral\nPepino\nAguacate")
  const [stepsText, setStepsText] = React.useState("Preparar ingredientes\nSeparar porción hers/his\nGuardar en cookbook")
  const [importText, setImportText] = React.useState("")
  const [importResult, setImportResult] = React.useState<ImportResult | null>(null)
  const calories = Math.round(protein * 4 + carbs * 4 + fat * 9)
  const target = macroTargets.at(-1)!

  const save = () => {
    if (!title.trim()) return
    upsert({
      id: makeId("recipe"),
      title: title.trim(),
      mode,
      meal,
      protein,
      carbs,
      fat,
      calories,
      ingredients: toLines(ingredientsText),
      steps: toLines(stepsText),
      note: "Created inside Metamorphosis private lab.",
    })
    setTitle("")
    setIngredientsText("")
    setStepsText("")
  }

  const importRecipes = (raw: string) => {
    const parsed = parseRecipeImport(raw)
    parsed.recipes.forEach(upsert)
    setImportResult({ created: parsed.recipes.length, errors: parsed.errors })
    if (parsed.recipes.length > 0) setImportText("")
  }

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const text = await file.text()
    importRecipes(text)
    event.target.value = ""
  }

  const exportRecipes = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "metamorphosis-recipes.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const resetSeeds = () => {
    setItems(recipeSeeds)
    setImportResult({ created: recipeSeeds.length, errors: [] })
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">Nutrition memory</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Recipe builder</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">
          Upload recipes, create his-and-hers portions, save meal ideas, and build Ivette&apos;s private cookbook around her macro targets.
        </p>
      </header>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-xl font-semibold text-white">Create recipe</h2>
            <div className="mt-4 space-y-3">
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Recipe name" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
              <div className="grid grid-cols-2 gap-3">
                <select value={mode} onChange={(event) => setMode(event.target.value as Recipe["mode"])} className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]">
                  <option value="hers">Hers</option>
                  <option value="his">His</option>
                  <option value="both">His & Hers</option>
                </select>
                <select value={meal} onChange={(event) => setMeal(event.target.value as Recipe["meal"])} className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]">
                  <option value="breakfast">Breakfast</option>
                  <option value="snack">Snack</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <MacroInput label="Protein" value={protein} setValue={setProtein} />
              <MacroInput label="Carbs" value={carbs} setValue={setCarbs} />
              <MacroInput label="Fat" value={fat} setValue={setFat} />
              <textarea value={ingredientsText} onChange={(event) => setIngredientsText(event.target.value)} rows={5} placeholder="One ingredient per line" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
              <textarea value={stepsText} onChange={(event) => setStepsText(event.target.value)} rows={4} placeholder="One step per line" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
              <div className="rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">
                Estimated calories: <span className="font-semibold text-white">{calories}</span>
              </div>
              <button onClick={save} className="w-full rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">Save recipe</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#C8913B]/30 bg-[#C8913B]/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#F3C779]">Upload recipes</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Import cookbook memory</h2>
            <p className="mt-2 text-sm text-[#D8EAF1]">
              Paste JSON, CSV-like text, or plain recipe notes. You can also upload a `.json`, `.txt`, or `.csv` file. Each imported recipe is stored locally and becomes available for meal plans.
            </p>
            <textarea value={importText} onChange={(event) => setImportText(event.target.value)} rows={8} placeholder={'Example:\nTacos de pollo\n- pollo\n- tortillas de nopal\n- aguacate\nSteps:\n1. Cook chicken\n2. Build his/hers portions'} className="mt-4 w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#F3C779]" />
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => importRecipes(importText)} className="rounded-2xl bg-[#F3C779] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">Import pasted recipes</button>
              <label className="cursor-pointer rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#F3C779]">
                Upload file
                <input type="file" accept=".json,.txt,.csv" onChange={handleFile} className="sr-only" />
              </label>
              <button onClick={exportRecipes} className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#38E8FF]">Export recipes</button>
              <button onClick={resetSeeds} className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#38E8FF]">Reset seed recipes</button>
            </div>
            {importResult ? (
              <div className="mt-4 rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">
                Imported <span className="font-semibold text-white">{importResult.created}</span> recipe(s).
                {importResult.errors.length > 0 ? <p className="mt-2 text-[#F3C779]">Warnings: {importResult.errors.join(" · ")}</p> : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <article className="rounded-[2rem] border border-[#C8913B]/30 bg-[#C8913B]/10 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#F3C779]">Current target</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{target.calories} kcal · {target.protein}g protein</h2>
            <p className="mt-2 text-sm text-[#D8EAF1]">Use the recipe builder to make daily meals fit the June recomposition plan.</p>
          </article>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((recipe) => (
              <article key={recipe.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{recipe.mode} · {recipe.meal}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{recipe.title}</h3>
                  </div>
                  <button onClick={() => remove(recipe.id)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#D8EAF1] hover:border-red-300 hover:text-red-200">Remove</button>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                  <MacroBadge label="kcal" value={recipe.calories} />
                  <MacroBadge label="P" value={`${recipe.protein}g`} />
                  <MacroBadge label="C" value={`${recipe.carbs}g`} />
                  <MacroBadge label="F" value={`${recipe.fat}g`} />
                </div>
                <div className="mt-4 rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">
                  <p className="font-semibold text-white">Ingredients</p>
                  <p className="mt-1">{recipe.ingredients.slice(0, 6).join(", ")}</p>
                </div>
                <p className="mt-4 text-sm text-[#D8EAF1]">{recipe.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function MacroInput({ label, value, setValue }: { label: string; value: number; setValue: (value: number) => void }) {
  return (
    <label className="block text-sm font-semibold text-white">
      {label}: {value}g
      <input type="range" min={0} max={180} step={1} value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-2 w-full accent-[#38E8FF]" />
    </label>
  )
}

function MacroBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-[#071018] p-3">
      <p className="text-[#9BCBD6]">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  )
}

function toLines(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean)
}

function normalizeRecipe(candidate: Partial<Recipe>, index = 0): Recipe | null {
  if (!candidate.title || typeof candidate.title !== "string") return null
  const protein = Number(candidate.protein ?? 25)
  const carbs = Number(candidate.carbs ?? 25)
  const fat = Number(candidate.fat ?? 10)
  return {
    id: typeof candidate.id === "string" ? candidate.id : makeId(`imported-recipe-${index}`),
    title: candidate.title.trim(),
    mode: candidate.mode === "his" || candidate.mode === "both" ? candidate.mode : "hers",
    meal: candidate.meal === "breakfast" || candidate.meal === "snack" || candidate.meal === "dinner" ? candidate.meal : "lunch",
    protein,
    carbs,
    fat,
    calories: Number(candidate.calories ?? Math.round(protein * 4 + carbs * 4 + fat * 9)),
    ingredients: Array.isArray(candidate.ingredients) ? candidate.ingredients.map(String) : [],
    steps: Array.isArray(candidate.steps) ? candidate.steps.map(String) : [],
    note: typeof candidate.note === "string" ? candidate.note : "Imported into Metamorphosis recipe memory.",
  }
}

function parseRecipeImport(raw: string): { recipes: Recipe[]; errors: string[] } {
  const trimmed = raw.trim()
  if (!trimmed) return { recipes: [], errors: ["No recipe text provided"] }

  try {
    const json = JSON.parse(trimmed) as unknown
    const candidates = Array.isArray(json) ? json : [json]
    const recipes = candidates.map((candidate, index) => normalizeRecipe(candidate as Partial<Recipe>, index)).filter(Boolean) as Recipe[]
    return { recipes, errors: recipes.length ? [] : ["JSON did not contain recipe-like objects"] }
  } catch {
    // Continue into plain-text parser.
  }

  const blocks = trimmed.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean)
  const recipes = blocks.map((block, index) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)
    const [titleLine, ...rest] = lines
    const stepsStart = rest.findIndex((line) => /^steps?:/i.test(line) || /^method:/i.test(line) || /^preparaci[oó]n:/i.test(line))
    const ingredientLines = stepsStart >= 0 ? rest.slice(0, stepsStart) : rest
    const stepLines = stepsStart >= 0 ? rest.slice(stepsStart + 1) : []
    return normalizeRecipe({
      title: titleLine,
      mode: /his\s*&\s*hers|both/i.test(block) ? "both" : "hers",
      meal: /breakfast|desayuno/i.test(block) ? "breakfast" : /dinner|cena/i.test(block) ? "dinner" : /snack/i.test(block) ? "snack" : "lunch",
      ingredients: ingredientLines.map((line) => line.replace(/^[-*\d.)\s]+/, "")),
      steps: stepLines.map((line) => line.replace(/^[-*\d.)\s]+/, "")),
      note: "Imported from pasted recipe text.",
    }, index)
  }).filter(Boolean) as Recipe[]

  return { recipes, errors: recipes.length ? [] : ["Plain text parser could not find recipes"] }
}
