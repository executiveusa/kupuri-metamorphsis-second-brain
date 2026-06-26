"use client"

import * as React from "react"
import { AudioPlayer } from "@/components/audio/AudioPlayer"
import { trackSeeds, type TrackSeed } from "@/lib/ivette-data"
import { makeId, useLocalCollection } from "@/components/metamorphosis/useLocalCollection"

type Track = TrackSeed

export function MusicWorkspace() {
  const { items, upsert, remove } = useLocalCollection<Track>("metamorphosis.tracks", trackSeeds)
  const [activeId, setActiveId] = React.useState<string>(trackSeeds[0]!.id)
  const [title, setTitle] = React.useState("")
  const [intention, setIntention] = React.useState("")
  const [src, setSrc] = React.useState<string>(trackSeeds[0]!.src)
  const active = items.find((track) => track.id === activeId) ?? items[0] ?? trackSeeds[0]!

  const save = () => {
    if (!title.trim() || !src.trim()) return
    const track = { id: makeId("track"), title: title.trim(), intention: intention.trim() || "Personal regulation track.", duration: "custom", src: src.trim() }
    upsert(track)
    setActiveId(track.id)
    setTitle("")
    setIntention("")
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">State regulation</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Music and audio library</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">Use audio intentionally: arrival, focus, workout, evening release, sleep, and reflection.</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">Now playing</h2>
          <div className="mt-4">
            <AudioPlayer src={active.src} title={active.title} artist="Metamorphosis private library" artwork="/images/metamorphosis-logo.png" />
          </div>
          <p className="mt-4 text-sm text-[#D8EAF1]">{active.intention}</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">Add track</h2>
          <div className="mt-4 space-y-3">
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Track title" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <input value={intention} onChange={(event) => setIntention(event.target.value)} placeholder="Intention" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <input value={src} onChange={(event) => setSrc(event.target.value)} placeholder="Audio URL" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <button onClick={save} className="w-full rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">Save track</button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((track) => (
          <article key={track.id} className={`rounded-[2rem] border p-5 ${track.id === active.id ? "border-[#38E8FF] bg-[#38E8FF]/10" : "border-white/10 bg-white/5"}`}>
            <h3 className="text-xl font-semibold text-white">{track.title}</h3>
            <p className="mt-2 text-sm text-[#D8EAF1]">{track.intention}</p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setActiveId(track.id)} className="flex-1 rounded-2xl bg-[#38E8FF] px-4 py-2 text-sm font-bold text-[#071018] hover:bg-white">Play</button>
              <button onClick={() => remove(track.id)} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-[#D8EAF1] hover:border-red-300 hover:text-red-200">Remove</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
