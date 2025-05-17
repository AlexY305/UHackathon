function parseMessage(message) {
    const lower = message.toLowerCase();
    let requestType = 'basic';

    if (lower.includes('type')) requestType = 'type';
    else if (lower.includes('height')) requestType = 'height';
    else if (lower.includes('weight')) requestType = 'weight';

    // crude way to find Pokémon name
    const words = lower.split(' ');
    const pokeKeywords = words.filter(word =>
        /^[a-zA-Z]+$/.test(word) &&
        !['what', 'is', 'the', 'of', 'a', 'type', 'height', 'weight', 'how'].includes(word)
    );

    const pokemonName = pokeKeywords.length > 0 ? pokeKeywords[pokeKeywords.length - 1] : null;

    return { pokemonName, requestType };
}

module.exports = { parseMessage };
