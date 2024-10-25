import admin from 'firebase-admin';
import { createRequire } from 'module';  // Use this to load JSON files
const require = createRequire(import.meta.url);

const serviceAccount = require('/home/user/CS5220-Midterm/config/serviceAccountKey.json');  // Adjust the path if necessary

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export default db;