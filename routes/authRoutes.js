import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/signup', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

// logout user 
router.post('/logout',authController.Logout);

// getMe Function
router.post('/getMe',authController.getMe);

export default router;
