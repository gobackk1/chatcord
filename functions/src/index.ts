// import * as functions from "firebase-functions";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from 'firebase-functions'

export const makeUppercase = functions.firestore
  .document('/messages/{documentId}')
  .onCreate((snap, context) => {
    const original = snap.data().original
    console.log('Uppercasing', context.params.documentId, original)
    const uppercase = original.toUpperCase()
    return snap.ref.set({ uppercase }, { merge: true })
  })
