// import * as functions from "firebase-functions";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// import addPublicUserData from './triggers/onCreate/addPublicUserData'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp()

export const addPublicUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(user => {
    const publicUserData = {
      displayName: user.displayName!
    }
    return admin
      .firestore()
      .doc(`public_user_data/${user.uid}`)
      .set(publicUserData)
  })

// export default functions.firestore
//   .document('/messages/{documentId}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original
//     console.log('Uppercasing', context.params.documentId, original)
//     const uppercase = original.toUpperCase()
//     return snap.ref.set({ uppercase }, { merge: true })
//   })
