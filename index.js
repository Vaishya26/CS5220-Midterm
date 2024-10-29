import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import verifyTokenRoutes from './routes/verifyTokenRoutes.js'; // Import the new verify-token route

import path from 'path';
import { fileURLToPath } from 'url';



const app = express();
const PORT = process.env.PORT || 3000;

// Resolve the current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', uploadRoutes);  
app.use('/api', fileRoutes);  
app.use('/api', verifyTokenRoutes);

// Root endpoint to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/chatroom', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'room.html'));
});
app.get('/crud', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crud.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});