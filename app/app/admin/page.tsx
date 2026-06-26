import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="rounded-[2rem] border border-[#C8913B]/30 bg-[#C8913B]/10 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-[#F3C779]">Removed from primary flow</p>
      <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Admin is disabled.</h1>
      <p className="mt-3 max-w-3xl text-[#D8EAF1]">This is no longer a public SaaS admin console. The correct control surface is the private brain and insights area.</p>
      <Link href="/app/brain" className="mt-6 inline-flex rounded-2xl bg-[#38E8FF] px-5 py-3 text-sm font-bold text-[#071018] hover:bg-white">
        Open brain center
      </Link>
    </div>
  )
}
