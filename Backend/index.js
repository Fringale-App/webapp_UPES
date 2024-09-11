import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import restaurantRouter from './routes/restaurant.route.js'
import itemRouter from './routes/item.route.js'
import fileRouter from './routes/fileUpload.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend's origin
  credentials: true, // Enable cookies
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/item', itemRouter);
app.use('/api/file',fileRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server issue';
  res.status(statusCode).send({
    success: false,
    message,
    statusCode,
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

