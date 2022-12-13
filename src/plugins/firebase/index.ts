import { initializeApp, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  Auth,
  // User,
  onAuthStateChanged
} from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { Cc_User } from '@/store/modules/profile/types'

const isLocalHost = window.location.hostname === 'localhost'
class Firebase {
  firebaseApp: FirebaseApp | undefined = undefined
  config!: FirebaseOptions
  auth!: Auth
  vueApp: any = null

  init(config: FirebaseOptions): void {
    this.firebaseApp = initializeApp(config)
    this.config = config

    if (isLocalHost) {
      this.startEmulator()
    } else {
      this.auth = getAuth(this.firebaseApp)
    }
  }

  initVueApp(vueInstance: any) {
    const unsubscribe = onAuthStateChanged(this.auth, () => {
      if (!this.vueApp) {
        this.vueApp = vueInstance
        this.vueApp.$mount('#app')
        unsubscribe()
      }
    })
  }

  startEmulator(): void {
    const db = getFirestore()
    connectFirestoreEmulator(db, 'localhost', 8081)
    this.auth = getAuth(this.firebaseApp)
    connectAuthEmulator(this.auth, 'http://localhost:9099')
    const functions = getFunctions(getApp())
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }

  async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      // Firebase AUTH REST API では onAuthStateChanged が発火しない
      // const res = await authAxios.post(`/accounts:signUp?key=${this.config.apiKey}`,{})

      await createUserWithEmailAndPassword(this.auth, email, password)
      /**
       * AUTH emulator では emailVerified が機能しない
       * https://github.com/firebase/firebase-tools/issues/3990
       */
      if (!this.auth.currentUser) return
      await sendEmailVerification(this.auth.currentUser)
    } catch (error) {
      if (error.message.match(/email-already-in-use/)) {
        throw new Error('このメールアドレスは既に登録されています。')
      }
      if (error.message.match(/invalid-email/)) {
        throw new Error('無効なメールアドレスです。')
      }
      throw new Error(error.message)
    }
  }

  async logout() {
    await this.auth.signOut()
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(this.auth, provider)
  }

  currentUser(): Cc_User {
    return this.auth.currentUser
  }
}

export default new Firebase()
