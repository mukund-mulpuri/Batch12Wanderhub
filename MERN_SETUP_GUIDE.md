# Andhra Wander Hub - MERN Stack Setup Guide

## 🚀 Complete MERN Stack Tourism Application

This project is now a **full-stack MERN (MongoDB, Express.js, React, Node.js)** application with authentication, trip booking, and history tracking.

## ✅ What's Been Implemented

### Backend (Node.js + Express + MongoDB)
- ✅ **User Authentication**: Login & Signup with JWT tokens
- ✅ **Trip Booking API**: Save and retrieve trip bookings
- ✅ **Travel History**: Track completed and upcoming trips
- ✅ **Hotel Bookings**: Manage hotel reservations
- ✅ **Secure Routes**: Protected endpoints with authentication middleware

### Frontend (React + TypeScript)
- ✅ **Login/Signup Pages**: Complete authentication UI
- ✅ **Trip Planning**: Book trips with destination, dates, travelers
- ✅ **My Trips Page**: View all bookings (upcoming, completed, cancelled)
- ✅ **Travel History**: Statistics and completed trip records
- ✅ **Navbar Integration**: Login/logout based on authentication state

### Database (MongoDB)
- ✅ **Users Collection**: Store user accounts with hashed passwords
- ✅ **Trip Bookings Collection**: All trip bookings with itineraries
- ✅ **Hotels Collection**: Hotel listings and details
- ✅ **Destinations Collection**: Tourist destinations database

## 📦 Installation & Setup

### Prerequisites
```bash
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn
```

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Environment Configuration

**Backend (.env):**
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/andhra-wander-hub
JWT_SECRET=your-secret-key-here
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update MONGODB_URI in backend/.env

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🔐 Authentication Flow

### 1. Sign Up
- Navigate to `/auth`
- Click "Sign Up"
- Enter name, email, password
- Account created and logged in automatically

### 2. Login
- Navigate to `/auth`
- Enter email and password
- JWT token stored in localStorage
- Redirected to homepage

### 3. Protected Routes
- Trip booking requires authentication
- My Trips page shows user's bookings only
- History page displays completed trips

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  createdAt: Date
}
```

### Trip Booking Model
```javascript
{
  user: ObjectId (ref: 'User'),
  bookingId: String (unique),
  tripDetails: {
    destination: String,
    startDate: Date,
    endDate: Date,
    travelers: Number,
    budget: String,
    duration: Number
  },
  itinerary: [{
    day: Number,
    date: Date,
    activities: [],
    accommodation: {},
    meals: [],
    transportation: {}
  }],
  paymentDetails: {
    totalAmount: Number,
    paymentStatus: String,
    transactionId: String
  },
  bookingStatus: String,
  feedback: {
    rating: Number,
    comment: String
  },
  createdAt: Date
}
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Trip Bookings
- `POST /api/trip-bookings` - Create trip booking (protected)
- `GET /api/trip-bookings` - Get user's bookings (protected)
- `GET /api/trip-bookings/:bookingId` - Get specific booking (protected)
- `PUT /api/trip-bookings/:bookingId/cancel` - Cancel booking (protected)
- `POST /api/trip-bookings/:bookingId/feedback` - Add feedback (protected)

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination details
- `POST /api/destinations` - Add destination (protected)

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels` - Add hotel (protected)

## 🎯 Key Features

### 1. User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Token expiration (7 days)
- Protected routes on frontend and backend

### 2. Trip Booking System
- Multi-step booking process
- Real-time cost calculation
- Automatic itinerary generation
- Payment integration ready

### 3. Trip Management
- View all bookings (upcoming, completed, cancelled)
- Download itineraries
- Add reviews and ratings
- Cancel bookings

### 4. Travel History
- Track all completed trips
- Statistics: total trips, spending, places visited
- Average ratings display
- Trip timeline view

## 🧪 Testing the Application

### 1. Create Account
1. Go to http://localhost:5173/auth
2. Click "Create Account"
3. Fill in details and submit
4. You should be logged in automatically

### 2. Book a Trip
1. Click "Start Your Trip" or go to /trip-planner
2. Fill in trip details:
   - Destination (e.g., "Tirupati")
   - Dates (future dates only)
   - Number of travelers
   - Budget level
3. Complete all steps
4. Click "Complete Booking"
5. Trip saved to database

### 3. View Your Trips
1. Click user icon → "My Trips"
2. See all your bookings
3. Filter by status (upcoming, completed, cancelled)

### 4. Check History
1. Click user icon → "Travel History"
2. View completed trips
3. See statistics and ratings

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure authentication
- **Protected Routes**: Middleware validation
- **CORS**: Configured for frontend origin
- **Rate Limiting**: Prevent API abuse
- **Helmet**: Security headers
- **Input Validation**: Express-validator

## 📝 Environment Variables Reference

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/andhra-wander-hub |
| JWT_SECRET | Secret key for JWT | (required) |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | http://localhost:3001/api |

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod

# Check .env file exists
ls backend/.env

# Install dependencies
cd backend && npm install
```

### Authentication not working
```bash
# Check JWT_SECRET is set in backend/.env
# Clear localStorage in browser
localStorage.clear()

# Check CORS configuration in server.js
```

### Database connection error
```bash
# Local MongoDB: Make sure mongod is running
# MongoDB Atlas: Check connection string and whitelist IP
```

## 🎨 Frontend Pages

1. **Home** (`/`) - Landing page with featured destinations
2. **Auth** (`/auth`) - Login and signup page
3. **Destinations** (`/destinations`) - Browse all destinations
4. **Hotels** (`/hotels`) - Browse and book hotels
5. **Trip Planner** (`/trip-planner`) - Plan and book trips
6. **My Trips** (`/my-trips`) - View all bookings
7. **History** (`/history`) - Travel history and statistics
8. **Profile** (`/profile`) - User profile management
9. **Dashboard** (`/dashboard`) - User dashboard
10. **About** (`/about`) - About the platform
11. **Contact** (`/contact`) - Contact form

## 💡 Next Steps

### Recommended Enhancements
1. Email verification for signup
2. Password reset functionality
3. Image upload for trip reviews
4. Real payment gateway integration (Razorpay/Stripe)
5. Admin panel for managing bookings
6. Real-time notifications
7. Social sharing features
8. Multi-language support

## 📧 Support

For issues or questions:
- Check console logs (browser and terminal)
- Verify MongoDB is running
- Ensure all dependencies are installed
- Check `.env` files are configured

## 🎉 Success!

You now have a fully functional MERN stack tourism application with:
- ✅ User authentication
- ✅ Trip booking system
- ✅ Database persistence
- ✅ Protected routes
- ✅ Travel history tracking

Happy coding! 🚀
