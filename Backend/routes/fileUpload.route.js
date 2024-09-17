import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import fetch from 'node-fetch';
import Item from '../models/item.model.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});

const bucket = admin.storage().bucket();

const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

const getFileIdFromUrl = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const getDirectDownloadURL = (fileId) => {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

const processImage = async (url, index, results) => {
  try {
    const fileId = getFileIdFromUrl(url);
    if (!fileId) {
      console.error(`Invalid URL format: ${url}`);
      results[index].imageUrls = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg'; // Default image URL
      return;
    }

    const directUrl = getDirectDownloadURL(fileId);
    const fileName = `${fileId}.jpg`;
    const tempFilePath = `${uploadDir}/${fileName}`;

    const response = await fetch(directUrl);
    if (response.ok) {
      const buffer = await response.buffer(); // Changed to buffer()

      fs.writeFileSync(tempFilePath, buffer);

      const file = bucket.file(fileName);
      await file.save(buffer, { contentType: response.headers.get('content-type') });
      const [signedUrl] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });

      results[index].imageUrls = signedUrl;

      fs.unlinkSync(tempFilePath);
    } else {
      console.error(`Failed to fetch image from URL: ${directUrl}`);
      results[index].imageUrls = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg'; // Default image URL
    }
  } catch (error) {
    console.error(`Error processing image link ${url}: ${error.message}`);
    results[index].imageUrls = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg'; // Default image URL
  }
};

router.post('/upload-csv', upload.single('file'), async (req, res) => {
  try {
    const results = [];
    const resReference = "66c7534d734efe7b1bf8b59d"; // the kathi roll

    const imageLinks = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        const {
          ['S.No']: _,
          'Category':category,
          'FOOD ITEM': name,
          'DESCRIPTION (OPTIONAL)': description,
          'VEG/NON-VEG': vegOrNonVeg,
          'PRICE ': price,
          'IMAGE LINK': imageLink,
        } = data;
        const trimmedCategory = category?.trim();
        const trimmedName = name?.trim();
        const trimmedDescription = description?.trim();
        const trimmedVegOrNonVeg = vegOrNonVeg?.trim();
        const trimmedPrice = price?.trim();
        const trimmedImageLink = imageLink?.trim();

        const isVeg = trimmedVegOrNonVeg?.toLowerCase() === 'veg';
        const regularPrice = parseFloat(trimmedPrice);
        if (isNaN(regularPrice)) {
          console.error(`Invalid regularPrice value: ${trimmedPrice}`);
          return;
        }

        if (!trimmedName || isNaN(regularPrice)) {
          console.error('Missing required fields');
          return;
        }

        results.push({
          name: trimmedName,
          description: trimmedDescription || "The act of eating mindfully and savoring flavors can promote relaxation and happiness.",
          isVeg,
          regularPrice,
          discountPrice: 0,
          imageUrls: trimmedImageLink && trimmedImageLink !== 'BLANK' ? trimmedImageLink : 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg',
          category: trimmedCategory? trimmedCategory:'indian',
          offer: false,
          resRef: resReference,
        });

        if (trimmedImageLink && trimmedImageLink !== 'BLANK') {
          imageLinks.push(trimmedImageLink);
        }
      })
      .on('end', async () => {
        // Process image links with delay
        for (let i = 0; i < results.length; i++) {
          if (results[i].imageUrls !== 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg') { // Skip default images
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between requests
            await processImage(results[i].imageUrls, i, results);
          }
        }

        // Save all entries to MongoDB
        try {
          await Item.insertMany(results);
          res.status(200).json({ message: 'Data successfully stored in the database' });
        } catch (error) {
          console.error('Error saving data to database:', error);
          res.status(500).json({ error: 'Error saving data to database' });
        }

        fs.unlinkSync(req.file.path);
      });
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;









