import express from 'express';
import User from '../models/User.js';
import generateTokenAndSetCookies from '../utils/generateJwtToken.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { fullName, email, password, confPassword } = req.body;

  if (!fullName || !email || !password || !confPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();

    const token = generateTokenAndSetCookies(newUser._id, res);
    
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


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateTokenAndSetCookies(user._id, res);
    res.status(200)
      .header('Authorization', `Bearer ${token}`)
      .json({ msg: 'Logged in successfully', token });
  } catch (error) {
    console.error('Error in login Auth:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'You have been logged out' });
  } catch (error) {
    console.error('Error in logout controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


const authenticate = (req, res, next) => {
  const token = req.cookies.jwt || req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received Token:', token);

  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token is not valid' });
    req.user = decoded;
    next();
  });
};


router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is protected data', user: req.user });
});

export default router;
