import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const secretKey = process.env.ACCESS_TOKEN_SECRET;

const authController = {

  // Register a new user
  registerUser: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const user = new User({ username, password, role });
      await user.save();
      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
      res.json({ token });
    } catch (error) {
      res.status(400).send('Error registering user');
    }
  },

  // Login user and generate JWT
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).send('Invalid username or password');

      if (!bcrypt.compare(password, user.password)) 
      return res.status(401).send('Invalid username or password');

      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '8h' });
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error logging in');
    }
  }
};

export default authController;
