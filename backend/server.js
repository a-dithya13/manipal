const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001; // Using port 3001 for the backend, loaded from .env

// MongoDB Connection
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL is not set in the .env file. Please set it to your MongoDB connection string.');
  process.exit(1); // Exit if database URL is not configured
}

mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Schemas ---

// Schema for Material Listings (from Marketplace)
const materialSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Frontend generated ID, might be better to use MongoDB's _id
  title: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  qualityScore: { type: Number, required: true },
  distanceKm: { type: Number, required: true },
  carbonSavedKg: { type: Number, required: true },
  condition: { type: String, enum: ["excellent", "good", "repairable"], required: true },
  verified: { type: Boolean, default: false },
  description: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  unit: { type: String },
  pickupAddress: { type: String },
  city: { type: String },
  postalCode: { type: String },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Material = mongoose.model('Material', materialSchema);

// Schema for Material Requests (from Request.tsx)
const requestSchema = new mongoose.Schema({
  materialType: { type: String, required: true },
  quantity: { type: String, required: true },
  location: { type: String }, // User input location string
  deadline: { type: Date },
  description: { type: String },
  // Potentially add user ID if authentication is implemented
  // Potentially add geocoded coordinates if location is processed
}, { timestamps: true });

const RequestModel = mongoose.model('Request', requestSchema);

// Schema for Bookings/Orders (when a user requests pickup from Marketplace)
const bookingSchema = new mongoose.Schema({
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true }, // Reference to the material listing
  buyerLocation: { // Location of the person requesting/ordering
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  sellerLocation: { // Location of the material provider (from the material listing)
    latitude: { type: Number }, // Optional, might be derived from materialId
    longitude: { type: Number }, // Optional, might be derived from materialId
  },
  materialTitle: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);


// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// --- API Routes ---

// Materials Routes
// GET all materials
app.get('/api/materials', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new material
app.post('/api/materials', async (req, res) => {
  // Note: Frontend currently generates placeholder image URLs.
  // A real backend would handle actual file uploads here (e.g., using multer and cloud storage).
  // The 'id' field from frontend might be redundant if using MongoDB's _id.
  // For now, we'll generate a new ID or use the one provided if it's meant to be unique.
  const newMaterialData = req.body;
  
  // Generate a unique ID if not provided or if it's a frontend-generated placeholder
  if (!newMaterialData.id) {
    newMaterialData.id = new mongoose.Types.ObjectId().toString();
  }

  const material = new Material(newMaterialData);

  try {
    const savedMaterial = await material.save();
    res.status(201).json(savedMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single material by ID (using MongoDB's _id)
app.get('/api/materials/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update a material by ID
app.put('/api/materials/:id', async (req, res) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json(updatedMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a material by ID
app.delete('/api/materials/:id', async (req, res) => {
  try {
    const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- API Routes for Requests ---

// POST a new material request
app.post('/api/requests', async (req, res) => {
  const newRequestData = req.body;
  const request = new RequestModel(newRequestData);

  try {
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all material requests
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await RequestModel.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- API Routes for Bookings/Orders ---

// POST a new booking/order
app.post('/api/bookings', async (req, res) => {
  const newBookingData = req.body;
  const booking = new Booking(newBookingData);

  try {
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bookings for a specific material
app.get('/api/bookings/material/:materialId', async (req, res) => {
  try {
    const bookings = await Booking.find({ materialId: req.params.materialId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Placeholder for image upload handling (would typically involve multer and cloud storage)
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploads
// app.post('/api/upload-image', upload.single('image'), (req, res) => {
//   // Handle file upload, e.g., upload to AWS S3 using MAPBOX_API_KEY (if relevant for some service) or other credentials
//   console.log('Uploaded file:', req.file);
//   // In a real scenario, you'd upload req.file to cloud storage and return the URL
//   res.status(200).send('Image upload endpoint');
// });

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
