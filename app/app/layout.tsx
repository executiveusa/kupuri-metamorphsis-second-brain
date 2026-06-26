import type React from "react"
import Image from "next/image"
import Link from "next/link"

const links = [
  { href: "/app", label: "Today" },
  { href: "/app/journal", label: "Journal" },
  { href: "/app/habits", label: "Habits" },
  { href: "/app/recipes", label: "Recipes" },
  { href: "/app/meal-plans", label: "Meal Plans" },
  { href: "/app/music", label: "Music" },
  { href: "/app/brain", label: "Brain" },
  { href: "/app/insights", label: "Insights" },
  { href: "/app/profile", label: "Settings" },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#071018]">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#071018]/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/app" className="flex items-center gap-3">
            <span className="relative block size-10 overflow-hidden rounded-full border border-[#C8913B]/70 bg-white">
              <Image src="/images/metamorphosis-logo.png" alt="Metamorphosis" fill className="object-cover" sizes="40px" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Metamorphosis</span>
              <span className="block text-xs text-[#9BCBD6]">Ivette private lab</span>
            </span>
          </Link>
          <div className="flex flex-wrap gap-2 text-sm text-[#D8EAF1]">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <main id="main" className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-6 md:py-10">{children}</main>
      <footer className="border-t border-white/10 bg-[#071018] py-6 text-center text-xs text-[#9BCBD6]">
        Private wellness OS · Cocoon → practice → insight → transformation
      </footer>
    </div>
  )
}
