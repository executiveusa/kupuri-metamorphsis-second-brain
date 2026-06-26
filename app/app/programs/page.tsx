import Link from "next/link"

const programs = [
  {
    id: "foundations",
    title: "Foundations Reset",
    summary: "14-day bilingual reset blending breathwork, journaling, and gentle mobility.",
    level: "All levels",
  },
  {
    id: "breath-balance",
    title: "Breath & Balance",
    summary: "Seven days of nervous system care with audio cues and reflective prompts.",
    level: "Beginner",
  },
]

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Programs</h1>
        <p className="text-[#AFC9CD]">Enroll in curated journeys. Content syncs across languages and devices.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((program) => (
          <article key={program.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white">{program.title}</h2>
            <p className="mt-2 text-sm text-[#AFC9CD]">{program.summary}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-[#6E8E93]">{program.level}</p>
            <Link
              href={`/app/programs/${program.id}`}
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-[#57B8BF] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#0C6B74] hover:text-white"
            >
              View modules
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
