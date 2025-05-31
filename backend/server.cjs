require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Server will run on port 5000, or whatever is in .env

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(cors()); // Enables CORS for all origins (for development)

// ----------------------------------------------------
// ADD THESE TWO LINES HERE
// ----------------------------------------------------
const authRoutes = require('./routes/authRoutes.cjs'); // <--- Changed to .cjs // Import the authRoutes
app.use('/api', authRoutes); // Use the authRoutes, prefixed with /api
// ----------------------------------------------------

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing server
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});