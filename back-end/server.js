const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemon'); // make sure the path matches your project

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pokemon', pokemonRoutes);

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`PokeChat server running on port ${PORT}`);
});
