// controllers/uploadController.js
import multer from 'multer';
import { uploadFile } from '../services/uploadService.js';

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');  // Single file upload

export const uploadFileController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ error: 'Error uploading file' });
    }

    if (!req.file) {
      return res.status(400).send({ error: 'No file provided' });
    }

    try {
      const fileUrl = await uploadFile(req.file);
      res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
