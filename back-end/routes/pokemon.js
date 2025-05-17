const express = require('express');
const axios = require('axios');
const { parseMessage } = require('../utils/parser');
const { getPokemonSpeak } = require('../utils/getPokemonSpeak');

const router = express.Router();

router.post('/', async (req, res) => {
    const userMessage = req.body.message;
    const talker = req.body.talker || 'squirtle'; // default to Squirtle if none provided

    const { pokemonName, requestType } = parseMessage(userMessage);

    if (!pokemonName) {
        const pokeSpeak = getPokemonSpeak(talker);
        return res.json({
            pokeSpeak,
            translated: "I couldn't find a Pokémon name in your message!"
        });
    }

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = response.data;

        const typeList = data.types.map(t => t.type.name).join(', ');
        const height = data.height;
        const weight = data.weight;

        let translated = "";

        switch (requestType) {
            case 'type':
                translated = `${pokemonName} is a ${typeList} type Pokémon!`;
                break;
            case 'height':
                translated = `${pokemonName} has a height of ${height}.`;
                break;
            case 'weight':
                translated = `${pokemonName} weighs ${weight} units.`;
                break;
            default:
                translated = `${pokemonName}'s basic info:\n• Type: ${typeList}\n• Height: ${height}\n• Weight: ${weight}`;
        }

        const pokeSpeak = getPokemonSpeak(talker);
        res.json({
            pokeSpeak,
            translated
        });

    } catch (error) {
        const pokeSpeak = getPokemonSpeak(talker);
        res.json({
            pokeSpeak,
            translated: `Hmm… I couldn't find a Pokémon called "${pokemonName}".`
        });
    }
});

module.exports = router;
//Testing