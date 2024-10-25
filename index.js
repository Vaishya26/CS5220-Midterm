// server.js
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());  // Middleware to parse JSON

// Routes
app.use('/api', userRoutes);  // All routes prefixed with /api

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});