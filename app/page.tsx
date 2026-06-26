import Image from "next/image"
import Link from "next/link"
import { BrandMark } from "@/components/metamorphosis/BrandMark"
import { brandTokens } from "@/lib/ivette-data"

const pillars = [
  {
    title: "Wellness tracker",
    copy: "Journal, habits, nutrition, recipes, audio, and state shifts in one place.",
  },
  {
    title: "Personal second brain",
    copy: "Capture decisions and reflections so her agents can search and use them later.",
  },
  {
    title: "Private lab first",
    copy: "No fake SaaS. Build for Ivette, validate the daily loop, then decide what becomes productized.",
  },
]

const flow = ["Cocoon", "Enter", "Track", "Reflect", "Remember", "Transform"]

export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col bg-[#F8FBFF] text-[#071018]" aria-labelledby="hero-title">
      <section className="relative isolate overflow-hidden px-4 py-10 md:px-8 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(200,145,59,0.34),transparent_30%),radial-gradient(circle_at_22%_25%,rgba(14,165,233,0.25),transparent_35%),linear-gradient(135deg,#ffffff,#eef8fb)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-[#C8913B]/40 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#08314D] shadow-sm">
              Ivette Milo private wellness OS
            </div>
            <div className="space-y-5">
              <h1 id="hero-title" className="font-[family:var(--font-newsreader)] text-5xl font-semibold leading-[0.95] tracking-tight text-[#071018] md:text-7xl">
                Metamorphosis is her wellness second brain.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#14212B] md:text-xl">
                A personal tracker for rituals, nutrition, recipes, music, reflections, and agent memory. Built for Ivette first, then tested as a product only after it works in real life.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/app" className="rounded-2xl bg-[#071018] px-6 py-4 text-center text-sm font-bold text-white shadow-xl transition hover:bg-[#08314D]">
                Enter private lab
              </Link>
              <Link href="#system" className="rounded-2xl border border-[#071018]/20 bg-white px-6 py-4 text-center text-sm font-bold text-[#071018] transition hover:border-[#C8913B]">
                See the system
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="rounded-3xl border border-[#071018]/10 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <h2 className="font-semibold text-[#071018]">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#334B5A]">{pillar.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[#38E8FF]/20 blur-3xl" />
            <BrandMark className="aspect-square w-full" />
            <div className="mx-auto -mt-8 flex w-[80%] items-center justify-center rounded-full border border-[#C8913B]/40 bg-white px-5 py-3 text-sm font-bold text-[#08314D] shadow-2xl">
              Cocoon opens · butterfly flies · enter appears
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="border-y border-[#071018]/10 bg-[#071018] px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#38E8FF]">What we are actually building</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-[family:var(--font-newsreader)] text-4xl font-semibold leading-tight md:text-6xl">One calm app her agents can call.</h2>
              <p className="mt-5 text-lg leading-8 text-[#D8EAF1]">
                The MVP is local-first for quick testing, with a Supabase schema and agent harness docs included in the repo. The dashboard makes the data useful before we wire global access through Tailscale.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Today", "Daily command center"],
                ["Journal", "Scribe-style capture"],
                ["Habits", "Ritual streak tracking"],
                ["Recipes", "His-and-hers meal builder"],
                ["Music", "Audio regulation library"],
                ["Brain", "Searchable personal memory"],
              ].map(([title, copy]) => (
                <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-[#D8EAF1]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#C8913B]">Cinematic entry</p>
              <h2 className="mt-4 font-[family:var(--font-newsreader)] text-4xl font-semibold text-[#071018] md:text-6xl">Hero video replaces the generic landing.</h2>
              <p className="mt-5 text-lg leading-8 text-[#334B5A]">
                The hero starts with a glowing cocoon, opens slowly, reveals the morpho butterfly, lets it fly out, then returns to a pulsing logo button labeled Enter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {flow.map((step) => (
                  <span key={step} className="rounded-full border border-[#071018]/10 bg-[#F8FBFF] px-4 py-2 text-sm font-semibold text-[#08314D]">{step}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#C8913B]/30 bg-[#F8FBFF] p-4">
              <Image src="/images/metamorphosis-cocoon.png" alt="Metamorphosis cocoon hero frame" width={1600} height={900} className="rounded-[1.5rem] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FBFF] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#071018]/10 bg-white p-6 shadow-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C8913B]">Brand locked</p>
          <h2 className="mt-4 font-[family:var(--font-newsreader)] text-4xl font-semibold text-[#071018]">Design tokens</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(brandTokens.colors).map(([name, value]) => (
              <div key={name} className="rounded-3xl border border-[#071018]/10 bg-[#F8FBFF] p-4">
                <div className="h-16 rounded-2xl border border-black/10" style={{ backgroundColor: value }} />
                <p className="mt-3 text-sm font-bold text-[#071018]">{name}</p>
                <p className="text-xs text-[#334B5A]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
