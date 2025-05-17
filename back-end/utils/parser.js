const knownPokemon = require('./pokemonNames');

function parseMessage(message) {
    console.log("Original message:", message);

    // Lowercase and remove punctuation
    const cleanMessage = message.toLowerCase().replace(/[^\w\s]/g, '');
    console.log("Cleaned message:", cleanMessage);

    const words = cleanMessage.split(' ');
    console.log("Words:", words);

    // Identify request type
    let requestType = 'basic';
    if (cleanMessage.includes('type')) requestType = 'type';
    else if (cleanMessage.includes('height')) requestType = 'height';
    else if (cleanMessage.includes('weight') || cleanMessage.includes('weigh')) requestType = 'weight';

    console.log("Determined request type:", requestType);

    // Look for valid Pokémon name from list
    const pokemonName = words.find(word => knownPokemon.includes(word));
    console.log("Matched Pokémon name:", pokemonName);

    return { pokemonName, requestType };
}

module.exports = { parseMessage };
