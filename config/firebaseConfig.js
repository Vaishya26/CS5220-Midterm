import admin from 'firebase-admin';
import { createRequire } from 'module'; 
const require = createRequire(import.meta.url);

const serviceAccount = require('/home/abs/adv_web/CS5220-Midterm/config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cs5220-f93d0.appspot.com',
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };