export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyB-_3PGHCl3qHT0Y-ogJIDXBezPXcfoPg0',
  authDomain: 'chat-cord-4af6e.firebaseapp.com',
  projectId: 'chat-cord-4af6e',
  storageBucket: 'chat-cord-4af6e.appspot.com',
  messagingSenderId: '811151546699',
  appId: '1:811151546699:web:df7471edefcd2084a2b0ce',
  measurementId: 'G-GB9CFS777E'
}

export const AUTH_API_ORIGIN = process.env.CC_AUTH_API_ORIGIN
export const FIRESTORE_API_ORIGIN = process.env.CC_FIRESTORE_API_ORIGIN
export const FUNCTIONS_API_ORIGIN = process.env.CC_FUNCTIONS_API_ORIGIN!.replace(
  '<project-id>',
  FIREBASE_CONFIG.projectId
)
