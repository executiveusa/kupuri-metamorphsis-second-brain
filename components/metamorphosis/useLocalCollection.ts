"use client"

import * as React from "react"

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function useLocalCollection<T extends { id: string }>(key: string, seed: T[]) {
  const [items, setItems] = React.useState<T[]>(seed)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setItems(safeParse<T[]>(window.localStorage.getItem(key), seed))
    setReady(true)
  }, [key])

  React.useEffect(() => {
    if (ready) {
      window.localStorage.setItem(key, JSON.stringify(items))
    }
  }, [items, key, ready])

  const upsert = React.useCallback((item: T) => {
    setItems((current) => {
      const exists = current.some((candidate) => candidate.id === item.id)
      if (exists) return current.map((candidate) => (candidate.id === item.id ? item : candidate))
      return [item, ...current]
    })
  }, [])

  const remove = React.useCallback((id: string) => {
    setItems((current) => current.filter((candidate) => candidate.id !== id))
  }, [])

  return { items, setItems, upsert, remove, ready }
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
