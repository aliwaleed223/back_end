import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import patientRoutes from './routes/patientRoutes.js';
import router from './routes/inVoiceRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const app = express();
const port = 3000;

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Middleware to parse JSON
app.use(bodyParser.json());

// Use the patient routes with a prefix
app.use('/api', patientRoutes);

app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
