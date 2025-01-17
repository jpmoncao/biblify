// Importing necessary libraries
import express from 'express';
import dotenv from 'dotenv';

// Importing database connection
import connectDB from './database/conn';

// Importing routers
import userRouter from './routers/user';
import versesRouter from './routers/verse';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Apply connection with database
connectDB();

// Routes
app.use('/api/users', userRouter)
app.use('/api/verses', versesRouter)

// Route to test if API is up
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
