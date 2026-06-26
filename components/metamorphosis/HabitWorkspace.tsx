"use client"

import * as React from "react"
import { habitSeeds } from "@/lib/ivette-data"
import { makeId, useLocalCollection } from "@/components/metamorphosis/useLocalCollection"

type Habit = {
  id: string
  title: string
  why: string
  schedule: string
  streak: number
  lastDone?: string
}

const seedHabits: Habit[] = habitSeeds.map((habit) => ({
  id: habit.id,
  title: habit.title,
  why: habit.why,
  schedule: habit.schedule,
  streak: habit.defaultStreak,
}))

export function HabitWorkspace() {
  const { items, upsert, remove } = useLocalCollection<Habit>("metamorphosis.habits", seedHabits)
  const [title, setTitle] = React.useState("")
  const [why, setWhy] = React.useState("")
  const [schedule, setSchedule] = React.useState("Daily")

  const createHabit = () => {
    if (!title.trim()) return
    upsert({ id: makeId("habit"), title: title.trim(), why: why.trim() || "Personal ritual.", schedule, streak: 0 })
    setTitle("")
    setWhy("")
  }

  const markDone = (habit: Habit) => {
    upsert({ ...habit, streak: habit.streak + 1, lastDone: new Date().toISOString() })
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">Daily operating system</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Habits and rituals</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">Small repeatable actions. No generic program. This is Ivette’s actual day-to-day tracker.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">Create ritual</h2>
          <div className="mt-4 space-y-3">
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ritual name" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <input value={why} onChange={(event) => setWhy(event.target.value)} placeholder="Why this matters" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <input value={schedule} onChange={(event) => setSchedule(event.target.value)} placeholder="Daily / 3x week / custom" className="w-full rounded-2xl border border-white/10 bg-[#071018] px-4 py-3 text-white outline-none focus:border-[#38E8FF]" />
            <button onClick={createHabit} className="w-full rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">Add ritual</button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((habit) => (
            <article key={habit.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{habit.title}</h3>
                  <p className="mt-1 text-sm text-[#9BCBD6]">{habit.schedule}</p>
                </div>
                <span className="rounded-full bg-[#C8913B]/15 px-3 py-1 text-sm font-semibold text-[#F3C779]">{habit.streak}</span>
              </div>
              <p className="mt-3 text-sm text-[#D8EAF1]">{habit.why}</p>
              {habit.lastDone ? <p className="mt-2 text-xs text-[#9BCBD6]">Last done: {new Date(habit.lastDone).toLocaleString()}</p> : null}
              <div className="mt-5 flex gap-2">
                <button onClick={() => markDone(habit)} className="flex-1 rounded-2xl bg-[#38E8FF] px-4 py-2 text-sm font-bold text-[#071018] hover:bg-white">Done</button>
                <button onClick={() => remove(habit.id)} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-[#D8EAF1] hover:border-red-300 hover:text-red-200">Remove</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
