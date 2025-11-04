import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';


import authRoutes from './routes/auth.js';
import destinationRoutes from './routes/destinations.js';
import hotelRoutes from './routes/hotels.js';
import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookings.js';
import tripBookingRoutes from './routes/tripBookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);


const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/andhra-wander-hub';
    await mongoose.connect(mongoURI);
    console.log(' Connected to MongoDB');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();


app.get('/', (req, res) => {
  res.json({
    message: '🏛️ Welcome to Andhra Wander Hub API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      destinations: '/api/destinations',
      hotels: '/api/hotels',
      users: '/api/users',
      bookings: '/api/bookings',
      tripBookings: '/api/trip-bookings'
    }
  });
});


app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trip-bookings', tripBookingRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The endpoint ${req.originalUrl} does not exist`
  });
});

app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  res.status(error.status || 500).json({
    error: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
