const STATIC_CACHE = "metamorfosis-static-v1"
const CONTENT_CACHE = "metamorfosis-content-v1"
const MUTATION_DB = "metamorfosis-mutations-db"
const MUTATION_STORE = "requests"
const MUTATION_TAG = "metamorfosis-mutations"

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (![STATIC_CACHE, CONTENT_CACHE].includes(cacheName)) {
            return caches.delete(cacheName)
          }
          return undefined
        }),
      )
      await self.clients.claim()
      await flushQueuedRequests()
    })(),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (
    request.method === "POST" &&
    /\/api\/(journal|habits)/.test(url.pathname)
  ) {
    event.respondWith(handleMutationRequest(request))
    return
  }

  if (request.method !== "GET") {
    return
  }

  if (["style", "script", "font", "image"].includes(request.destination)) {
    event.respondWith(cacheFirst(request))
    return
  }

  const acceptHeader = request.headers.get("accept") || ""
  if (
    request.destination === "document" ||
    request.destination === "" ||
    request.destination === "json" ||
    acceptHeader.includes("text/html") ||
    acceptHeader.includes("application/json")
  ) {
    event.respondWith(staleWhileRevalidate(request))
  }
})

self.addEventListener("sync", (event) => {
  if (event.tag === MUTATION_TAG) {
    event.waitUntil(flushQueuedRequests())
  }
})

self.addEventListener("message", (event) => {
  if (event.data === "flush-mutations") {
    event.waitUntil(flushQueuedRequests())
  }
})

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)
  if (cached) {
    return cached
  }

  const response = await fetch(request)
  if (response && response.ok) {
    await cache.put(request, response.clone())
  }
  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CONTENT_CACHE)
  const cached = await cache.match(request)

  const networkPromise = fetch(request)
    .then(async (response) => {
      if (response && response.ok) {
        await cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => undefined)

  if (cached) {
    networkPromise.then(() => undefined).catch(() => undefined)
    return cached
  }

  const networkResponse = await networkPromise
  if (networkResponse) {
    return networkResponse
  }

  return new Response("Offline", {
    status: 503,
    headers: { "Content-Type": "text/plain" },
  })
}

async function handleMutationRequest(request) {
  try {
    return await fetch(request.clone())
  } catch (error) {
    await queueRequest(request)
    return new Response(JSON.stringify({ queued: true }), {
      status: 202,
      headers: { "Content-Type": "application/json" },
    })
  }
}

async function queueRequest(request) {
  const entry = await serializeRequest(request)
  const db = await openMutationDb()

  await new Promise((resolve, reject) => {
    const tx = db.transaction(MUTATION_STORE, "readwrite")
    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
    tx.objectStore(MUTATION_STORE).add(entry)
  })

  if ("sync" in self.registration) {
    await self.registration.sync.register(MUTATION_TAG).catch(() => flushQueuedRequests())
  } else {
    await flushQueuedRequests()
  }
}

async function flushQueuedRequests() {
  const db = await openMutationDb()
  const entries = await new Promise((resolve, reject) => {
    const tx = db.transaction(MUTATION_STORE, "readonly")
    const store = tx.objectStore(MUTATION_STORE)
    const getAllRequest = store.getAll()
    getAllRequest.onsuccess = () => resolve(getAllRequest.result)
    getAllRequest.onerror = () => reject(getAllRequest.error)
  })

  if (!entries.length) {
    db.close()
    return
  }

  for (const entry of entries) {
    try {
      const headers = new Headers(entry.headers)
      if (!headers.has("content-type") && entry.body) {
        headers.set("content-type", "application/json")
      }

      const response = await fetch(entry.url, {
        method: entry.method,
        headers,
        body: entry.body,
        credentials: "same-origin",
      })

      if (!response.ok) {
        continue
      }

      await removeEntry(db, entry.id)
    } catch (error) {
      // leave request in queue
    }
  }

  db.close()
}

function removeEntry(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MUTATION_STORE, "readwrite")
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.objectStore(MUTATION_STORE).delete(id)
  })
}

async function serializeRequest(request) {
  const headers = []
  request.headers.forEach((value, key) => {
    headers.push([key, value])
  })

  const clone = request.clone()
  let body = null
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await clone.text()
    } catch (error) {
      body = null
    }
  }

  return {
    id: Date.now() + Math.random(),
    url: request.url,
    method: request.method,
    headers,
    body,
  }
}

function openMutationDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(MUTATION_DB, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(MUTATION_STORE)) {
        db.createObjectStore(MUTATION_STORE, { keyPath: "id" })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
