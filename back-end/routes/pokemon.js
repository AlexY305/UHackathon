const express = require('express');
const axios = require('axios');
const { parseMessage } = require('../utils/parser');
const { getPokemonSpeak } = require('../utils/getPokemonSpeak');

const router = express.Router();

router.post('/', async (req, res) => {
    const userMessage = req.body.message;
    const talker = req.body.talker || 'squirtle'; // default talker
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

        // Correct conversion formulas
        const heightInFeet = (data.height * 0.1 * 3.28084).toFixed(1);  // decimeters → meters → feet

        // DIRECT CONVERSION: No intermediate variables that could cause issues
        const weightInLbs = (data.weight * 0.1 * 2.20462).toFixed(1);   // hectograms → kg → lbs

        let translated = "";

        switch (requestType) {
            case 'type':
                translated = `${pokemonName} is a ${typeList} type Pokémon!`;
                break;
            case 'height':
            case 'tall':
            case 'short':
            case 'size':
                translated = `${pokemonName} is about ${heightInFeet} feet tall.`;
                break;
            case 'weight':
            case 'weigh':
            case 'heavy':
                translated = `${pokemonName} weighs ${weightInLbs} lbs.`;
                break;
            default:
                translated = `${pokemonName}'s basic info:\n• Type: ${typeList}\n• Height: ${heightInFeet} ft\n• Weight: ${weightInLbs} lbs`;
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