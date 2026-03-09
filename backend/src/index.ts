import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import bioDataRoutes from './routes/bioDataRoutes.js';

dotenv.config();

const app = express();

app.use(cors({

  origin: [
    'http://localhost:5173', 
    'https://shaadi-bio-frontend.vercel.app' 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Connect Database
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/biodata', bioDataRoutes);
app.use('/api/payments', paymentRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('ShaadiBio API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));