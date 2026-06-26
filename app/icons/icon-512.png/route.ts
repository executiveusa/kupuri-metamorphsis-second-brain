import type { NextRequest } from "next/server"

import { createIconResponse } from "@/lib/pwa/icon"

export const runtime = "edge"

export function GET(_request: NextRequest) {
  return createIconResponse(512)
}
