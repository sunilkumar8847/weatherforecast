import express from 'express';
import authRoutes from '../src/routes/authRoutes.js'; // Ensure correct import

const router = express.Router();

router.use('/auth', authRoutes);

export default router;
