import { type FirebaseApp, getApps, initializeApp } from "firebase/app"
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth"
import {
  enableIndexedDbPersistence,
  type Firestore,
  getFirestore,
} from "firebase/firestore"
import { getStorage } from "firebase/storage"

type FirebaseServices = {
  app: FirebaseApp
  auth: ReturnType<typeof getAuth>
  firestore: Firestore
  storage: ReturnType<typeof getStorage>
}

let services: FirebaseServices | null = null

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export function getFirebase(): FirebaseServices {
  if (services) return services

  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Missing Firebase configuration. Please ensure NEXT_PUBLIC_FIREBASE_* env vars are set.",
    )
  }

  const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  if (typeof window !== "undefined") {
    setPersistence(auth, browserLocalPersistence).catch(() => {
      /* ignore persistence fallback */
    })

    enableIndexedDbPersistence(firestore).catch((error) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Firestore persistence failed", error)
      }
    })
  }

  if (typeof navigator !== "undefined") {
    auth.languageCode = navigator.language ?? "en"
    auth.useDeviceLanguage?.()
  }
  new GoogleAuthProvider()

  services = { app, auth, firestore, storage }
  return services
}
