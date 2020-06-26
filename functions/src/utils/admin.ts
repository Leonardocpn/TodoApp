import * as admin from "firebase-admin";

export default admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://todoapp-firebase-72c4a.firebaseio.com",
});

export const db = admin.firestore();
