import { NextResponse } from "next/server"

const memory = new Map<string, unknown>()

export async function GET() {
  return NextResponse.json({ mode: "mvp-local-first", collection: "meal-plans", items: Array.from(memory.values()) })
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const id = typeof (payload as { id?: unknown }).id === "string" ? (payload as { id: string }).id : `meal-plans-${Date.now()}`
  const document = { ...payload, id, storedAt: new Date().toISOString(), source: "metamorphosis-api" }
  memory.set(id, document)
  return NextResponse.json({ status: "stored", id, document }, { status: 201 })
}
