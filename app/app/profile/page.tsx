export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-white/10 bg-[#0D1B26] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#38E8FF]">Settings</p>
        <h1 className="mt-3 font-[family:var(--font-newsreader)] text-4xl font-semibold text-white">Ivette profile</h1>
        <p className="mt-3 max-w-3xl text-[#D8EAF1]">Personal lab settings. Public subscription and generic billing have been removed from the primary product path.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-semibold text-white">Preferences</h2>
          <div className="mt-4 space-y-3 text-sm text-[#D8EAF1]">
            <p>Default language: Spanish-first, English-ready.</p>
            <p>Mode: private wellness OS.</p>
            <p>Storage: local-first MVP, Supabase-ready.</p>
          </div>
        </article>
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-semibold text-white">Agent access</h2>
          <div className="mt-4 space-y-3 text-sm text-[#D8EAF1]">
            <p>CLI/MCP/API harness docs are included in /docs/agent-harness.</p>
            <p>Tailscale should be added only after auth and database persistence are stable.</p>
          </div>
        </article>
      </section>
    </div>
  )
}
