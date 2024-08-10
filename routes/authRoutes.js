import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';


dotenv.config();


const router = express.Router();
const secretKey = process.env.REFRESH_TOKEN_SECRET;

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login user and generate JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send('Invalid username or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).send('Invalid username or password');

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send('Access denied');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
};

// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.role} user!`);
});

export default router;
