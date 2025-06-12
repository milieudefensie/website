import { getAnalytics, type Analytics } from 'firebase/analytics'
import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  type AppCheck,
} from 'firebase/app-check'
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  type Auth,
} from 'firebase/auth'
import {
  Firestore,
  getFirestore,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
  FieldValue,
  Timestamp,
} from 'firebase/firestore'
import { getFunctions, type Functions } from 'firebase/functions'

import { getAI, GoogleAIBackend, VertexAIBackend } from 'firebase/ai'
import type { AI } from 'firebase/ai'

export type User = {
  lastOnline: Timestamp | FieldValue
  firstName?: string | null
  email?: string | null
  phone?: string | null
  postcode?: {
    full?: string | null
    p5?: string | null
    p4?: string | null
    p3?: string | null
    p2?: string | null
    p1?: string | null
  }
  recentAction?: string | null
  messagesSent?: number | FieldValue
  conversationsStarted?: number | FieldValue
}

export const useFirebaseStore = defineStore('firebase', () => {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyBQ0PNYSbgMcdhAAlvM_i8EIRuScgoeEJQ',
    authDomain: 'milieudefensie-458212.firebaseapp.com',
    projectId: 'milieudefensie-458212',
    storageBucket: 'milieudefensie-458212.firebasestorage.app',
    messagingSenderId: '944107582121',
    appId: '1:944107582121:web:a9952e912b0bae727dafb8',
    measurementId: 'G-M8ZQ47EG55',
  }

  const app = ref<FirebaseApp>()
  const analytics = ref<Analytics>()
  const functions = ref<Functions>()
  const appCheck = ref<AppCheck>()
  const vertexAI = ref<AI>()
  const googleAI = ref<AI>()
  const db = ref<Firestore>()
  const auth = ref<Auth>()
  const currentUser = ref<User>()

  async function getUser(userID: string) {
    const user: User = {
      lastOnline: serverTimestamp(),
    }
    await setDoc(doc(db.value!, 'users', userID), user, { merge: true })

    onSnapshot(doc(db.value!, 'users', userID), (doc) => {
      currentUser.value = doc.data() as User
    })
  }

  function mount() {
    app.value = initializeApp(firebaseConfig)
    auth.value = getAuth()
    db.value = getFirestore(app.value)
    analytics.value = reactive(getAnalytics(app.value))
    functions.value = getFunctions(app.value, 'europe-west1')

    if (import.meta.dev) {
      console.log('Firebase App Check Debug Token enabled')
      // @ts-ignore https://firebase.google.com/docs/app-check/web/debug-provider
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
    }

    appCheck.value = initializeAppCheck(app.value, {
      provider: new ReCaptchaV3Provider(
        '6LdG1TwrAAAAAJ-YI0nCvbmk2Yb3-sn-JQnYD-tk'
      ),
      isTokenAutoRefreshEnabled: true,
    })

    vertexAI.value = getAI(app.value, { backend: new VertexAIBackend() })
    googleAI.value = getAI(app.value, { backend: new GoogleAIBackend() })

    onAuthStateChanged(auth.value!, async (user) => {
      if (user) {
        // console.log('User signed in', user.uid)
        await getUser(user.uid)
      } else {
        // User is signed out
        console.log('User is signed out')
        signInAnonymously(auth.value!)
          .then(() => {
            // Signed in..
            // console.log('User signed in anonymously')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            // ...
          })
      }
    })
  }

  return {
    mount,
    app,
    analytics,
    functions,
    appCheck,
    vertexAI,
    googleAI,
    db,
    auth,
    currentUser,
  }
})
