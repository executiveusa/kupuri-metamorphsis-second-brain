import Link from "next/link"

const posts = [
  {
    slug: "foundations-reset",
    title: "Designing your Foundations Reset",
    excerpt: "How to prepare mind, body, and space for a 14-day bilingual ritual reset.",
    category: "Programs",
    locale: "en",
  },
  {
    slug: "respira-y-fluye",
    title: "Respira y Fluye",
    excerpt: "Respiraciones diafragmáticas para regresar al equilibrio en minutos.",
    category: "Respiración",
    locale: "es",
  },
  {
    slug: "community-care",
    title: "Community care over self-care",
    excerpt: "Why collective rituals help sustain your nervous system beyond the mat.",
    category: "Community",
    locale: "en",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Metamorfosis Journal</h1>
        <p className="text-lg text-[#AFC9CD]">
          Fresh guidance for bilingual seekers. Filter by category and language directly in the admin panel.
        </p>
      </header>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-[#57B8BF]">{post.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-3 text-sm text-[#AFC9CD]">{post.excerpt}</p>
            <p className="mt-4 text-xs text-[#AFC9CD]">Locale: {post.locale.toUpperCase()}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-flex items-center text-sm font-semibold text-[#57B8BF] hover:text-[#0C6B74]"
            >
              Read post →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
