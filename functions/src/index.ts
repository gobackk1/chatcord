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
      displayName: user.displayName!,
      photoURL: user.photoURL || ''
    }
    return admin
      .firestore()
      .doc(`public_user_data/${user.uid}`)
      .set(publicUserData)
  })

export const requestToBecomeFriend = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    // TODO: 本番とローカル環境とでオリジンを変更する
    response.set('Access-Control-Allow-Origin', 'http://localhost:8081')
    response.set('Access-Control-Allow-Methods', 'POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'OPTIONS') {
      response.send()
    } else if (request.method === 'POST') {
      const [target, requestUser] = await Promise.all([
        admin.auth().getUser(request.body.sentTo),
        admin.auth().getUser(request.body.sentFrom)
      ])

      const documentRef = await admin
        .firestore()
        .doc(`public_user_data/${target.uid}/friend_requests/${requestUser.uid}`)
        .get()

      if (documentRef.exists) {
        response.send({ code: 'DOCUMENT_EXISTS' })
      } else {
        admin
          .firestore()
          .doc(`public_user_data/${target.uid}/friend_requests/${requestUser.uid}`)
          .set({
            requestUser: {
              displayName: requestUser.displayName || '',
              photoURL: requestUser.photoURL || '',
              uid: requestUser.uid
            }
          })
        response.send({ code: 'SUCESS' })
      }
    }
  })

// export default functions.firestore
//   .document('/messages/{documentId}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original
//     console.log('Uppercasing', context.params.documentId, original)
//     const uppercase = original.toUpperCase()
//     return snap.ref.set({ uppercase }, { merge: true })
//   })
