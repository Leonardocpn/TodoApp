import admin from "firebase-admin";

export default admin.initializeApp();

export const db = admin.firestore();
