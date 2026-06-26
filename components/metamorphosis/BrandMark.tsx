import Image from "next/image"

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-full border border-[#C8913B]/70 bg-white shadow-[0_30px_90px_rgba(14,165,233,0.25)] ${className}`}>
      <Image
        src="/images/metamorphosis-logo.png"
        alt="Metamorphosis butterfly logo"
        width={900}
        height={900}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  )
}
