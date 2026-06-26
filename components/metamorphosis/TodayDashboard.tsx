"use client"

import Link from "next/link"
import { habitSeeds, macroTargets, mealPlanSeeds, recipeSeeds, secondBrainModules, trackSeeds } from "@/lib/ivette-data"
import { BrandMark } from "@/components/metamorphosis/BrandMark"

const todayCards = [
  {
    label: "Today focus",
    value: "Protein, water, reflection",
    detail: "Start with one nutrition anchor, then log the day before bed.",
  },
  {
    label: "Current macro target",
    value: "1700 kcal",
    detail: "160g protein · 130g carbs · 65g fat",
  },
  {
    label: "Brain status",
    value: "Private lab mode",
    detail: "Local-first MVP. Supabase schema included for production persistence.",
  },
]

export function TodayDashboard() {
  const current = macroTargets.at(-1)!
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6 shadow-2xl md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#38E8FF]">Ivette private lab</p>
          <h1 className="mt-4 font-[family:var(--font-newsreader)] text-4xl font-semibold leading-tight text-white md:text-6xl">
            Your wellness brain for today.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[#D8EAF1]">
            Metamorphosis now centers one person first: Ivette. Track rituals, nutrition, recipes, music, and reflections in one calm system before turning it into a bigger product.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app/journal" className="rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">
              Log reflection
            </Link>
            <Link href="/app/recipes" className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#C8913B]">
              Upload recipes
            </Link>
            <Link href="/app/meal-plans" className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#C8913B]">
              Create meal plan
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-[2rem] border border-[#C8913B]/30 bg-white p-5">
          <BrandMark className="aspect-square w-full max-w-[420px]" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {todayCards.map((card) => (
          <article key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{card.label}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{card.value}</h2>
            <p className="mt-2 text-sm text-[#D8EAF1]">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C8913B]">Nutrition target</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{current.month} recomposition</h2>
            </div>
            <span className="rounded-full bg-[#38E8FF]/15 px-3 py-1 text-xs font-semibold text-[#38E8FF]">{current.weightKg} kg</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Calories", current.calories],
              ["Protein", `${current.protein}g`],
              ["Carbs", `${current.carbs}g`],
              ["Fat", `${current.fat}g`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[#071018] p-4">
                <p className="text-xs text-[#9BCBD6]">{label}</p>
                <p className="mt-1 text-xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C8913B]">System modules</p>
          <div className="mt-4 grid gap-3">
            {secondBrainModules.map((module) => (
              <div key={module.id} className="rounded-2xl bg-[#071018] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-white">{module.title}</h3>
                  <span className="text-xs text-[#38E8FF]">{module.status}</span>
                </div>
                <p className="mt-1 text-sm text-[#D8EAF1]">{module.role}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Ritual queue</h2>
            <Link href="/app/habits" className="text-sm font-semibold text-[#38E8FF]">Open</Link>
          </div>
          <div className="mt-4 space-y-3">
            {habitSeeds.slice(0, 3).map((habit) => (
              <div key={habit.id} className="rounded-2xl bg-[#071018] p-4">
                <p className="font-semibold text-white">{habit.title}</p>
                <p className="mt-1 text-sm text-[#D8EAF1]">{habit.why}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Meal + audio starters</h2>
            <Link href="/app/music" className="text-sm font-semibold text-[#38E8FF]">Open</Link>
          </div>
          <div className="mt-4 space-y-3">
            <p className="rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">Next recipe: <span className="font-semibold text-white">{recipeSeeds[0].title}</span></p>
            <p className="rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">Meal plan starter: <span className="font-semibold text-white">{mealPlanSeeds[0].title}</span></p>
            <p className="rounded-2xl bg-[#071018] p-4 text-sm text-[#D8EAF1]">Next track: <span className="font-semibold text-white">{trackSeeds[0].title}</span></p>
          </div>
        </article>
      </section>
    </div>
  )
}
