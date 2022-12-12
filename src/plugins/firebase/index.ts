import { initializeApp, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

class Firebase {
  firebaseApp: FirebaseApp | null = null

  init(config: FirebaseOptions) {
    this.firebaseApp = initializeApp(config)

    if (window.location.hostname === 'localhost') {
      const db = getFirestore()
      connectFirestoreEmulator(db, 'localhost', 8081)
      const auth = getAuth()
      connectAuthEmulator(auth, 'http://localhost:9099')
      const functions = getFunctions(getApp())
      connectFunctionsEmulator(functions, 'localhost', 5001)
    }
  }
}

export default new Firebase()
