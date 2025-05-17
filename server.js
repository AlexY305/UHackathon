const express = require('express');
const cors = require('cors');
const path = require('path');
// Use the correct path to the pokemon.js route
const pokemonRoutes = require('./back-end/routes/pokemon');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/pokemon', pokemonRoutes);

// Serve static files from the front-end directory (if you have a frontend)
app.use(express.static(path.join(__dirname, 'front-end')));

// Add a test route to verify server is working
app.get('/test', (req, res) => {
    res.json({
        message: "Server is working!",
        timestamp: new Date().toISOString()
    });
});

// Handle other routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
});