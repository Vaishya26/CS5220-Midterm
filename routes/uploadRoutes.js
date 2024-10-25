// routes/uploadRoutes.js
import express from 'express';
import { uploadFileController } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/upload', uploadFileController);  // Handle file upload via POST

export default router;