import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import Item from '../models/item.model.js'; // Import your model

const router = express.Router();

// Set the directory for file uploads to 'public/uploads'
const uploadDir = 'public/uploads';

// Ensure the 'public/uploads' folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to store files in 'public/uploads'
const upload = multer({ dest: uploadDir });

// Route to handle CSV upload
router.post('/upload-csv', upload.single('file'), async (req, res) => {
  try {
    const results = [];
    const resReference = "66c7534d734efe7b1bf8b59d"; // Reference ID for all items (the kathi roll restaurant)

    // Read the CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Log the raw data for debugging
        console.log('Raw data:', data);

        // Destructure to extract and ignore the first column
        const {
          ['S.No']: _, // Ignore the serial number column
          'FOOD ITEM': name,
          'DESCRIPTION (OPTIONAL)': description,
          'VEG/NON-VEG': vegOrNonVeg,
          'PRICE ': servings, // Note the trailing space
          'IMAGE LINK': imageUrls,
        } = data;
        console.log("this is servings"+servings)
        // Trim field values to remove extra spaces
        const trimmedName = name?.trim();
        const trimmedDescription = description?.trim();
        const trimmedVegOrNonVeg = vegOrNonVeg?.trim();
        const trimmedServings = servings?.trim();
        const trimmedImageUrls = imageUrls?.trim();

        // Convert 'VEG/NON-VEG' to boolean for `isVeg`
        const isVeg = trimmedVegOrNonVeg?.toLowerCase() === 'veg';

        // Convert 'SERVINGS ' to number
        const regularPrice = parseFloat(trimmedServings);
        if (isNaN(regularPrice)) {
          console.error(`Invalid regularPrice value: ${trimmedServings}`);
          return; // Skip this entry
        }
        console.log(trimmedName+trimmedDescription+regularPrice+trimmedImageUrls+"data")
        // Ensure all fields are present and valid
        if (!trimmedName || isNaN(regularPrice) || !trimmedImageUrls) {
          console.error('Missing required fields');
          return; // Skip this entry
        }

        // Push the desired data to the results array
        results.push({
          name: trimmedName,
          description: " The act of eating mindfully and savoring flavors can also promote relaxation and happiness, making food a rich and rewarding part of daily life.",
          isVeg, // Use the boolean value here
          regularPrice, // Use the converted number here
          discountPrice: 0, // Default value for discountPrice
          imageUrls: trimmedImageUrls=='BLANK'? "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg": trimmedImageUrls,
          category: 'indian',
          offer: false, // Default value for offer
          resRef: resReference, // Reference ID
        });
      })
      .on('end', async () => {
        // Save all entries to MongoDB
        try {
          await Item.insertMany(results); // Use the correct model
          res.status(200).json({ message: 'Data successfully stored in the database' });
        } catch (error) {
          console.error('Error saving data to database:', error);
          res.status(500).json({ error: 'Error saving data to database' });
        }

        // Delete the file after processing
        fs.unlinkSync(req.file.path);
      });
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;





