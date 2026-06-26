import { NextResponse } from "next/server"

const memory = new Map<string, unknown>()

type HabitPayload = {
  userId?: unknown
  habitId?: unknown
  completedAt?: unknown
  note?: unknown
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
  return NextResponse.json({ mode: "mvp-local-first", collection: "habits", items: Array.from(memory.values()) })
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as HabitPayload | null
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid habit payload" }, { status: 400 })
  }

  const habitId = typeof payload.habitId === "string" ? payload.habitId : null
  if (!habitId) {
    return NextResponse.json({ error: "Missing habitId" }, { status: 400 })
  }

  const id = `habit-event-${Date.now()}`
  const document = {
    id,
    userId: typeof payload.userId === "string" ? payload.userId : "ivette-milo-private-lab",
    habitId,
    note: typeof payload.note === "string" ? payload.note : undefined,
    context: payload.context,
    completedAt: parseDate(payload.completedAt).toISOString(),
    recordedAt: new Date().toISOString(),
    source: "metamorphosis-api",
  }

  memory.set(id, document)
  return NextResponse.json({ status: "stored", id, document }, { status: 201 })
}
