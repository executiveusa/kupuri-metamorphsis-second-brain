import { macroTargets } from "@/lib/ivette-data"

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">Librarian report</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Insights</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">This page converts nutrition plans, habits, recipes, and journal patterns into a weekly review.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {macroTargets.map((target) => (
          <article key={target.month} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{target.month}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{target.weightKg} kg</h2>
            <p className="mt-2 text-sm text-[#D8EAF1]">{target.calories} kcal · {target.protein}g protein · BMI {target.bmi}</p>
          </article>
        ))}
      </section>
      <section className="rounded-[2rem] border border-[#C8913B]/30 bg-[#C8913B]/10 p-6">
        <h2 className="text-2xl font-semibold text-white">MVP insight</h2>
        <p className="mt-3 text-[#D8EAF1]">The personal lab should prioritize daily capture and nutrition memory before adding public subscriptions or community features.</p>
      </section>
    </div>
  )
}
