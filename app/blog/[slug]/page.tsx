import { notFound } from "next/navigation"

const posts = {
  "foundations-reset": {
    title: "Designing your Foundations Reset",
    content:
      "Craft a ritual arc that blends breath, hydration, and mindful journaling. Use the dashboard to schedule daily check-ins and sync across devices.",
  },
  "respira-y-fluye": {
    title: "Respira y Fluye",
    content:
      "Integra respiraciones diafragmáticas con afirmaciones suaves. Aprovecha la app para registrar tu estado de ánimo en español o inglés.",
  },
  "community-care": {
    title: "Community care over self-care",
    content:
      "Invite your circle into Metamorfosis Groups. Shared rituals and accountability build sustainable wellbeing rooted in collective support.",
  },
} satisfies Record<string, { title: string; content: string }>

type Props = {
  params: Promise<{ slug: keyof typeof posts }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold text-white md:text-5xl">{post.title}</h1>
      <p className="mt-6 text-lg text-[#AFC9CD]">{post.content}</p>
      <p className="mt-12 text-xs text-[#AFC9CD]">
        This journal is for educational purposes. It does not replace professional medical guidance.
      </p>
    </article>
  )
}
