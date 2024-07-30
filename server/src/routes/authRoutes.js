import express from 'express';
import User from '../models/User.js';
import generateTokenAndSetCookies from '../utils/generateJwtToken.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sign up a new user
router.post('/signup', async (req, res) => {
  const { fullName, email, password, confPassword } = req.body;

  // Validate all fields are provided
  if (!fullName || !email || !password || !confPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if passwords match
  if (password !== confPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    // Generate and set token
    const token = generateTokenAndSetCookies(newUser._id, res);

    // Send response
    res.status(201)
      .header('Authorization', `Bearer ${token}`)
      .json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        token,
      });
  } catch (error) {
    console.error('Error in SignUp Auth:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Login user and return JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Generate and set token
    const token = generateTokenAndSetCookies(user._id, res);
    res.status(200)
      .header('Authorization', `Bearer ${token}`)
      .json({ msg: 'Logged in successfully', token });
  } catch (error) {
    console.error('Error in login Auth:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  try {
    // Clear JWT cookie
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'You have been logged out' });
  } catch (error) {
    console.error('Error in logout controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
  const token = req.cookies.jwt || req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received Token:', token);  // Log the token

  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token is not valid' });
    req.user = decoded;
    next();
  });
};

// Define a protected route
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is protected data', user: req.user });
});

export default router;
