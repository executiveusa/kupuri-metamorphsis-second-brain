import Link from "next/link"
import { notFound } from "next/navigation"

const programs = {
  foundations: {
    title: "Foundations Reset",
    summary: "Rebuild your rhythm with 14 days of breathwork, hydration, and mindful journaling.",
    modules: [
      { id: "day-1", title: "Day 1 · Arrival", duration: "15 min" },
      { id: "day-2", title: "Day 2 · Awakening", duration: "18 min" },
      { id: "day-3", title: "Day 3 · Liberation", duration: "20 min" },
    ],
  },
  "breath-balance": {
    title: "Breath & Balance",
    summary: "Seven-day nervous system care plan with bilingual cues.",
    modules: [
      { id: "day-1", title: "Día 1 · Respiración lunar", duration: "12 min" },
      { id: "day-2", title: "Day 2 · Resonant breathing", duration: "10 min" },
      { id: "day-3", title: "Día 3 · Anclaje", duration: "16 min" },
    ],
  },
} satisfies Record<string, { title: string; summary: string; modules: { id: string; title: string; duration: string }[] }>

type Props = {
  params: Promise<{ id: keyof typeof programs }>
}

export default async function ProgramDetailPage({ params }: Props) {
  const { id } = await params
  const program = programs[id]

  if (!program) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">{program.title}</h1>
        <p className="text-[#AFC9CD]">{program.summary}</p>
      </header>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white">Modules</h2>
        <ul className="mt-4 space-y-3 text-sm text-[#AFC9CD]">
          {program.modules.map((module) => (
            <li key={module.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
              <span className="text-white">{module.title}</span>
              <span>{module.duration}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/app"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#57B8BF] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#0C6B74] hover:text-white"
        >
          Start today&apos;s lesson
        </Link>
      </section>
    </div>
  )
}
