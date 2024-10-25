import { bucket } from '../config/firebaseConfig.js';
import { v4 as uuidv4 } from 'uuid';  // To generate unique names for files

export const uploadFile = async (file) => {
  try {
    const uniqueFileName = `${uuidv4()}_${file.originalname}`;
    const fileUpload = bucket.file(uniqueFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4()  // Optional: Generate a token for download
        }
      }
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => reject(error));
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve(publicUrl);  // Return the public URL after uploading
      });
      blobStream.end(file.buffer);
    });
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};
