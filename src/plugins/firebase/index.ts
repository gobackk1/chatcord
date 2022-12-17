import { initializeApp, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore'
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  Auth,
  // User,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { UserType } from '@/store/modules/profile/types'

const isLocalHost = window.location.hostname === 'localhost'
class Firebase {
  firebaseApp: FirebaseApp | undefined = undefined
  auth!: Auth
  vueApp: any = null
  db!: Firestore

  init(config: FirebaseOptions): void {
    this.firebaseApp = initializeApp(config)

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
    this.db = getFirestore(this.firebaseApp!)
    connectFirestoreEmulator(this.db, 'localhost', 8081)
    this.auth = getAuth(this.firebaseApp)
    connectAuthEmulator(this.auth, 'http://localhost:9099')
    const functions = getFunctions(getApp())
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }

  async registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password)
      /**
       * emulator に登録したユーザの emailVerified を true にする方法
       * https://firebase.google.com/docs/emulator-suite/connect_auth#emulated_email_email_link_and_anonymous_authentication
       */
      await sendEmailVerification(this.auth.currentUser!)
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

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password)
    } catch (error) {
      if (error.message.match(/wrong-password/)) {
        throw new Error('IDかパスワードが間違っています。')
      }
      if (error.message.match(/user-not-found/)) {
        throw new Error('ユーザーが見つかりませんでした。')
      }
      throw new Error(error.message)
    }
  }

  async sendEmailVerification(): Promise<void> {
    if (!this.auth.currentUser) return
    sendEmailVerification(this.auth.currentUser)
  }

  currentUser(): UserType {
    return this.auth.currentUser
  }

  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser
    const token = user ? await user.getIdToken() : null
    return token
  }
}

export default new Firebase()
