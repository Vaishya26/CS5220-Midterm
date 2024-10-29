// routes/verifyTokenRoutes.js
import express from 'express';
import { admin } from '../config/firebaseConfig.js'; // Ensure Firebase Admin is set up correctly

const router = express.Router();

// Token verification route
router.post('/verify-token', async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log('User verified with UID:', uid);

    // Respond with the UID to confirm verification
    res.status(200).json({ uid });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).send('Unauthorized');
  }
});

export default router;
