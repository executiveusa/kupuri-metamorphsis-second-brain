import { NextResponse } from "next/server"

const memory = new Map<string, unknown>()

type JournalPayload = {
  userId?: unknown
  entry?: unknown
  createdAt?: unknown
  mood?: unknown
  offlineId?: unknown
  context?: unknown
}

function parseDate(input: unknown) {
  if (typeof input === "string" || typeof input === "number") {
    const date = new Date(input)
    if (!Number.isNaN(date.getTime())) return date
  }
  return new Date()
}

export async function GET() {
  return NextResponse.json({ mode: "mvp-local-first", collection: "journal", items: Array.from(memory.values()) })
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as JournalPayload | null
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid journal payload" }, { status: 400 })
  }

  const entry = typeof payload.entry === "string" ? payload.entry.trim() : ""
  if (!entry) {
    return NextResponse.json({ error: "Missing entry text" }, { status: 400 })
  }

  const id = typeof payload.offlineId === "string" && payload.offlineId.trim() ? payload.offlineId.trim() : `journal-${Date.now()}`
  const document = {
    id,
    userId: typeof payload.userId === "string" ? payload.userId : "ivette-milo-private-lab",
    entry,
    mood: typeof payload.mood === "string" ? payload.mood : undefined,
    context: payload.context,
    createdAt: parseDate(payload.createdAt).toISOString(),
    storedAt: new Date().toISOString(),
    source: "metamorphosis-api",
  }

  memory.set(id, document)
  return NextResponse.json({ status: "stored", id, document }, { status: 201 })
}
