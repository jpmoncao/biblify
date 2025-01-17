// Importing necessary libraries
import express from 'express';
import dotenv from 'dotenv';

import connectDB from './database/conn';
import User from './models/user';
import HighlightVerses from './models/highlight-verses';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
