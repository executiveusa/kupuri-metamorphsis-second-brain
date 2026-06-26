"use client"

import * as React from "react"
import { secondBrainModules } from "@/lib/ivette-data"
import { makeId, useLocalCollection } from "@/components/metamorphosis/useLocalCollection"

type BrainNote = {
  id: string
  createdAt: string
  source: string
  title: string
  body: string
  status: "inbox" | "organized" | "insight"
}

const seedNotes: BrainNote[] = [
  {
    id: "brain-seed-1",
    createdAt: new Date().toISOString(),
    source: "system",
    title: "Metamorphosis rule",
    body: "This app is Ivette's private lab first. No public SaaS framing until the private system works.",
    status: "insight",
  },
]

export function BrainWorkspace() {
  const { items, upsert, remove } = useLocalCollection<BrainNote>("metamorphosis.brain", seedNotes)
  const [query, setQuery] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [body, setBody] = React.useState("")

  const filtered = items.filter((item) => {
    const needle = query.toLowerCase().trim()
    if (!needle) return true
    return `${item.title} ${item.body} ${item.source} ${item.status}`.toLowerCase().includes(needle)
  })

  const save = () => {
    if (!title.trim() || !body.trim()) return
    upsert({ id: makeId("brain"), createdAt: new Date().toISOString(), source: "manual", title: title.trim(), body: body.trim(), status: "inbox" })
    setTitle("")
    setBody("")
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">My Brain Is Full layer</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Second brain command center</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">
          MVP starts with local capture, search, and weekly health reporting. Production can wire Scribe, Seeker, and Librarian through CLI, MCP, or API.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {secondBrainModules.map((module) => (
          <article key={module.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{module.status}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{module.title}</h2>
            <p className="mt-3 text-sm text-[#D8EAF1]">{module.role}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">Capture memory</h2>
          <div className="mt-4 space-y-3">
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Memory title" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={7} placeholder="What should her agents remember?" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <button onClick={save} className="w-full rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">Save memory</button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-white">Search memory</h2>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search recipes, rituals, decisions..." className="rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
          </div>
          <div className="mt-5 space-y-3">
            {filtered.map((item) => (
              <article key={item.id} className="rounded-2xl bg-[#071018] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{item.status} · {item.source}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <button onClick={() => remove(item.id)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#D8EAF1] hover:border-red-300 hover:text-red-200">Remove</button>
                </div>
                <p className="mt-3 text-sm text-[#D8EAF1]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
