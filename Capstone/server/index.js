import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './controllers/route.js';
import { config as db } from './db/config.js';
import { config as dotenvConfig } from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenvConfig();

// Setup Express App
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
// Set up CORS
app.use(cors());
// API Routes
app.use('/api', route);

app.get('/', async (req, res) => {
    res.send('Welcome to my world...');
});

// Get port from environment and store in Express.
const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://localhost:27017/sibi.RealEstate';
const DATABASE = process.env.DB || 'sibi';

db(DATABASE_URL, DATABASE);
