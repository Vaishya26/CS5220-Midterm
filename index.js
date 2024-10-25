import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';  // Import the upload routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', uploadRoutes);  // Add the upload routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
