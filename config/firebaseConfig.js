import admin from 'firebase-admin';
import { createRequire } from 'module'; // Needed for ES module support
const require = createRequire(import.meta.url);

const serviceAccount = require('/home/user/CS5220-Midterm/config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cs5220-f93d0-default-rtdb.firebaseio.com",
  storageBucket: 'cs5220-f93d0.appspot.com',  // Replace with your actual project bucket name
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };