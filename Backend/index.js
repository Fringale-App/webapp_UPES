import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import restaurantRouter from './routes/restaurant.route.js'
import itemRouter from './routes/item.route.js'
import fileRouter from './routes/fileUpload.route.js'
import admin from 'firebase-admin'
import Item from './models/item.model.js';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';

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
app.use('/api/file',fileRouter);

// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
// });

// const bucket = admin.storage().bucket();

// const DEFAULT_IMAGE_URL = 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?resize=768,574';
// const processCSV = async () => {
//   const items = [];

//   fs.createReadStream('path-to-your-csv-file.csv')
//     .pipe(csv())
//     .on('data', async (row) => {
//       const { 'FOOD ITEM': name, 'DESCRIPTION (OPTIONAL)': description, 'VEG/NON-VEG': category, 'PRICE': regularPrice, 'Image Link': imageLink } = row;
      
//       const isVeg = category.toLowerCase() === 'veg';
      
//       let imageUrl = DEFAULT_IMAGE_URL; // Set default image URL

//       try {
//         if (imageLink) {
//           // Convert image link to Firebase Storage URL
//           const fileName = imageLink.split('/').pop().split('?')[0]; // Extract file name from URL
//           const file = bucket.file(fileName);

//           // Download and upload image to Firebase Storage
//           await bucket.upload(fileName, { destination: fileName });
//           const [url] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' }); // Get download URL

//           imageUrl = url;
//         }
//       } catch (error) {
//         console.error(`Error processing image link ${imageLink}: ${error.message}`);
//       }

//       items.push({
//         imageUrls: imageUrl,
//         name,
//         description: description || '',
//         isVeg,
//         category,
//         regularPrice: parseFloat(regularPrice),
//       });
//     })
//     .on('end', async () => {
//       console.log('CSV file successfully processed');
      
//       // Save items to MongoDB
//       await Item.insertMany(items);
//       console.log('Items saved to MongoDB');
      
//       mongoose.connection.close();
//     });
// };

// processCSV();

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

