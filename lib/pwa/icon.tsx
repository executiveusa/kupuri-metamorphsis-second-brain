import { ImageResponse } from "next/og"

const SURFACE = "#0B0F12"
const BRAND = "#0E7C86"
const ACCENT = "#57B8BF"
const TEXT = "#EAF2F4"

export function createIconResponse(size: number) {
  const innerSize = Math.round(size * 0.72)
  const ringWidth = Math.max(2, Math.round(size * 0.08))

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: SURFACE,
          borderRadius: size * 0.24,
          border: `${Math.max(2, Math.round(size * 0.04))}px solid ${BRAND}`,
        }}
      >
        <div
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize * 0.5,
            backgroundColor: BRAND,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: ringWidth * -0.5,
              borderRadius: innerSize * 0.6,
              border: `${ringWidth}px solid ${ACCENT}`,
              opacity: 0.85,
            }}
          />
          <span
            style={{
              color: TEXT,
              fontSize: Math.round(size * 0.34),
              fontWeight: 700,
              letterSpacing: size * 0.02,
            }}
          >
            MW
          </span>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    },
  )
}
