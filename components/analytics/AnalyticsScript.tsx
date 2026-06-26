import Script from "next/script"

const PLAUSIBLE_SRC_FALLBACK = "https://plausible.io/js/script.js"

export function AnalyticsScript() {
  const plausibleDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN
  const plausibleSrc = process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? PLAUSIBLE_SRC_FALLBACK
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!plausibleDomain && !gaId) {
    return null
  }

  return (
    <>
      {plausibleDomain ? (
        <Script
          src={plausibleSrc}
          data-domain={plausibleDomain}
          strategy="afterInteractive"
          defer
        />
      ) : null}
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                transport_type: 'beacon'
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  )
}
