import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import hostLogin from './routes/hostLogin.js';
import gamerLogin from './routes/gamerLogin.js';
import gameRoute from './routes/gameRoute.js';
import booking from './routes/slotbook.js';
import verify from './routes/verification.js';

const app = express();

// CORS setup for both local and deployed frontend
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/host-auth', hostLogin);
app.use('/api/gamer-auth', gamerLogin);
app.use('/api/games', gameRoute);
app.use('/api/booking', booking);
app.use('/api/verify', verify);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
