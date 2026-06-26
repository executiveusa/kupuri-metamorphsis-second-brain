import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] px-4 py-16 text-[#071018] md:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#071018]/10 bg-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C8913B]">Private lab mode</p>
        <h1 className="mt-4 font-[family:var(--font-newsreader)] text-4xl font-semibold">Pricing is disabled.</h1>
        <p className="mt-4 text-lg leading-8 text-[#334B5A]">
          Metamorphosis is being rebuilt as Ivette's personal wellness second brain. Public subscriptions should return only after the private app proves useful in daily life.
        </p>
        <Link href="/app" className="mt-8 inline-flex rounded-2xl bg-[#071018] px-6 py-3 text-sm font-bold text-white hover:bg-[#08314D]">
          Enter private lab
        </Link>
      </div>
    </main>
  )
}
