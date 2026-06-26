export default function PrivacyPage() {
  return (
    <article className="prose prose-invert mx-auto max-w-4xl px-6 py-16">
      <h1>Privacy Policy</h1>
      <p>
        We collect minimal personal information required to deliver the Metamorfosis service: name, email, preferred language,
        subscription status, and optional profile photo. Journals and habits are stored securely in Firebase with per-user access
        rules.
      </p>
      <h2>Data Usage</h2>
      <p>
        We use anonymized analytics to improve the experience. We never sell your data. Stripe handles payment details and only
        shares billing identifiers with us.
      </p>
      <h2>Data Retention</h2>
      <p>
        You may request account deletion at any time. Journals and habits are removed within 30 days of confirmation, while
        subscription records may be retained to satisfy legal obligations.
      </p>
      <h2>International Transfers</h2>
      <p>
        Data may be processed in the United States, Mexico, and the European Union. We rely on Standard Contractual Clauses and
        regional compliance frameworks.
      </p>
      <p className="text-sm text-[#AFC9CD]">
        Contact privacy@metamorfosis.example.com to exercise your privacy rights or request additional details.
      </p>
    </article>
  )
}
