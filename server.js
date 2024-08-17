import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables
dotenv.config();
const port = process.env.PORT || 4000;

// Connect to MongoDB
  try {
  await mongoose.connect("mongodb://localhost:27017/");
} catch (error) {
  handleError(error);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
