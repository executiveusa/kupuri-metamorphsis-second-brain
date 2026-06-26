import Image from "next/image"

import { PLACEHOLDERS } from "@/lib/placeholders"

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Our ethos: Loyalty, Honor, Truth & Respect</h1>
        <p className="text-lg text-[#AFC9CD]">
          Metamorfosis Wellness Journey exists to help individuals reclaim balance through consistent rituals and community
          accountability across English and Spanish speaking audiences.
        </p>
      </header>
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Earth-made design, globally inclusive</h2>
          <p className="text-[#AFC9CD]">
            Inspired by bamboo, ceramic, and hammered copper textures, our interface is soft, grounded, and accessible. Every
            element passes WCAG AA checks, and we honor reduced motion preferences while celebrating mindful animation.
          </p>
          <p className="text-[#AFC9CD]">
            We reinvest a portion of every subscription into community wellness funds across Mexico City and beyond, prioritizing
            organizations that cultivate safe spaces for collective healing.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-1">
          {/* replace with asset URL */}
          <Image
            src={`${PLACEHOLDERS.card2}?auto=format&fit=crop&w=900&q=80`}
            alt="Group of people practicing mindful movement"
            width={900}
            height={1200}
            className="size-full rounded-[28px] object-cover"
          />
        </div>
      </section>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-white">Impact statement</h2>
        <p className="mt-4 text-[#AFC9CD]">
          We commit 3% of profits to social-purpose partners delivering trauma-informed movement and mental health support for
          historically marginalized communities. Subscribers can nominate local initiatives directly inside the admin panel.
        </p>
      </section>
      <footer className="rounded-3xl border border-white/5 bg-white/5 p-6 text-center text-sm text-[#AFC9CD]">
        We honor your privacy, cultural background, and personal pace. This platform offers educational guidance—not medical
        advice.
      </footer>
    </div>
  )
}
