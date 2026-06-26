import { createSign } from "crypto"

import { env } from "@/env.mjs"

type AccessToken = {
  token: string
  expiresAt: number
}

type FirestoreValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { stringValue: string }
  | { doubleValue: number }
  | { integerValue: string }
  | { timestampValue: string }
  | { arrayValue: { values: FirestoreValue[] } }
  | { mapValue: { fields: Record<string, FirestoreValue> } }

let cachedToken: AccessToken | null = null

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
const FIRESTORE_BASE = "https://firestore.googleapis.com/v1"
const FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore"

function assertCredentials() {
  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase service account credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.",
    )
  }
}

function toFirestoreValue(value: unknown): FirestoreValue | null {
  if (value === null) return { nullValue: null }
  if (value === undefined) return null
  if (value instanceof Date) {
    return { timestampValue: value.toISOString() }
  }
  const type = typeof value
  if (type === "string") {
    return { stringValue: value as string }
  }
  if (type === "boolean") {
    return { booleanValue: value as boolean }
  }
  if (type === "number") {
    if (!Number.isFinite(value as number)) return null
    if (Number.isInteger(value as number)) {
      return { integerValue: (value as number).toString() }
    }
    return { doubleValue: value as number }
  }
  if (type === "object") {
    if (Array.isArray(value)) {
      const values = value
        .map((item) => toFirestoreValue(item))
        .filter(Boolean) as FirestoreValue[]
      return { arrayValue: { values } }
    }
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, candidate]) => {
        const v = toFirestoreValue(candidate)
        if (!v) return null
        return [key, v] as const
      })
      .filter(Boolean) as Array<[string, FirestoreValue]>
    return { mapValue: { fields: Object.fromEntries(entries) } }
  }
  return null
}

async function getAccessToken() {
  assertCredentials()

  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.expiresAt - 60 > now) {
    return cachedToken.token
  }

  const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url")
  const payload = Buffer.from(
    JSON.stringify({
      iss: env.FIREBASE_CLIENT_EMAIL,
      scope: FIRESTORE_SCOPE,
      aud: GOOGLE_TOKEN_ENDPOINT,
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url")

  const unsignedToken = `${header}.${payload}`
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey, "base64url")
  const assertion = `${unsignedToken}.${signature}`

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "")
    throw new Error(`Failed to obtain Firebase access token: ${response.status} ${errorText}`)
  }

  const { access_token: token, expires_in: expiresIn } = (await response.json()) as {
    access_token: string
    expires_in: number
  }

  cachedToken = {
    token,
    expiresAt: now + expiresIn,
  }

  return token
}

export async function addFirestoreDocument(
  collection: string,
  data: Record<string, unknown>,
  options: { documentId?: string } = {},
) {
  assertCredentials()

  const token = await getAccessToken()
  const fieldsEntries = Object.entries(data)
    .map(([key, value]) => {
      const firestoreValue = toFirestoreValue(value)
      if (!firestoreValue) return null
      return [key, firestoreValue] as const
    })
    .filter(Boolean) as Array<[string, FirestoreValue]>

  const url = new URL(
    `${FIRESTORE_BASE}/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${collection}`,
  )

  if (options.documentId) {
    url.searchParams.set("documentId", options.documentId)
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: Object.fromEntries(fieldsEntries),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "")
    throw new Error(`Failed to write to Firestore: ${response.status} ${errorText}`)
  }

  const json = (await response.json()) as { name?: string }
  const name = json.name?.split("/").pop()
  return { id: name ?? null }
}

export function resetFirebaseTokenCache() {
  cachedToken = null
}
