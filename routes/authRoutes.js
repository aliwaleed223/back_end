import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/singup', authController.registerUser);

// Login user and generate JWT
router.post('/login', authController.loginUser);

export default router;
