import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
//   origin: 'https://weatherforecast-3w5n.vercel.app/',
  methods: ["POST",  "GET"],
  credentials: true

}));

app.get('/', (req, res) => {
    res.json("Hello");
})

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
