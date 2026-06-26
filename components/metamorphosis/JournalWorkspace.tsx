"use client"

import * as React from "react"
import { makeId, useLocalCollection } from "@/components/metamorphosis/useLocalCollection"

type JournalEntry = {
  id: string
  createdAt: string
  mood: string
  body: string
  tags: string[]
}

const seedEntries: JournalEntry[] = [
  {
    id: "seed-journal-1",
    createdAt: new Date().toISOString(),
    mood: "grounded",
    body: "Private lab started. Convert rituals, food, music, and memory into one usable system.",
    tags: ["lab", "metamorphosis"],
  },
]

export function JournalWorkspace() {
  const { items, upsert, remove } = useLocalCollection<JournalEntry>("metamorphosis.journal", seedEntries)
  const [body, setBody] = React.useState("")
  const [mood, setMood] = React.useState("clear")
  const [tags, setTags] = React.useState("wellness")

  const save = () => {
    const trimmed = body.trim()
    if (!trimmed) return
    upsert({
      id: makeId("journal"),
      createdAt: new Date().toISOString(),
      mood,
      body: trimmed,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    })
    setBody("")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">Scribe</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Journal capture</h1>
        <p className="mt-3 text-[#D8EAF1]">Dump the thought first. The second brain can classify, connect, and summarize it later.</p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-white">
            Mood
            <input value={mood} onChange={(event) => setMood(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
          </label>
          <label className="block text-sm font-semibold text-white">
            Tags
            <input value={tags} onChange={(event) => setTags(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
          </label>
          <label className="block text-sm font-semibold text-white">
            Reflection
            <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={8} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" placeholder="What happened, how did it feel, what should the system remember?" />
          </label>
          <button onClick={save} className="w-full rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">
            Save reflection
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {items.map((entry) => (
          <article key={entry.id} className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#9BCBD6]">{new Date(entry.createdAt).toLocaleString()}</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Mood: {entry.mood}</h2>
              </div>
              <button onClick={() => remove(entry.id)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#D8EAF1] hover:border-red-300 hover:text-red-200">
                Remove
              </button>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-[#F8FBFF]">{entry.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#38E8FF]/10 px-3 py-1 text-xs text-[#38E8FF]">#{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
