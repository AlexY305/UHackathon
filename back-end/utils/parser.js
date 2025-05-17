#!/usr/bin/env node

function parseMessage(message) {
    // Lowercase the message
    let cleanMessage = message.toLowerCase();

    // Handle possessives before removing punctuation (Pikachu's -> Pikachu)
    cleanMessage = cleanMessage.replace(/(\w+)'s/g, '$1');

    // Remove ALL punctuation except for alphanumeric characters and spaces
    // This specifically uses a-z0-9 to ensure consistent behavior across all environments
    cleanMessage = cleanMessage.replace(/[^a-z0-9\s]/g, '');

    // Split into words and filter out empty strings
    const words = cleanMessage.split(' ').filter(word => word.length > 0);

    // Determine the request type
    let requestType = 'basic';
    if (cleanMessage.includes('type')) requestType = 'type';
    else if (cleanMessage.includes('height') || cleanMessage.includes('tall')) requestType = 'height';
    else if (cleanMessage.includes('weight') || cleanMessage.includes('heavy')) requestType = 'weight';

    // Filter out filler words to isolate possible Pokémon names
    const ignoreWords = [
        'what', 'is', 'the', 'of', 'a', 'an', 'type', 'height', 'weight',
        'how', 'tall', 'heavy', 'me', 'about', 'tell', 'whats', 'what',
        'normal', 'fire', 'water', 'grass', 'electric' // Type names
    ];

    // Find potential Pokémon names
    let potentialNames = [];

    // First check if there might be a multi-word Pokémon name (like "mr mime")
    for (let i = 0; i < words.length - 1; i++) {
        if (!ignoreWords.includes(words[i]) && !ignoreWords.includes(words[i+1])) {
            potentialNames.push(words[i] + ' ' + words[i+1]);
        }
    }

    // If no multi-word names found, look for single words
    if (potentialNames.length === 0) {
        potentialNames = words.filter(word =>
            word.length > 1 && // Avoid single-letter words
            !ignoreWords.includes(word)
        );
    }

    // Get the most likely Pokémon name
    const pokemonName = potentialNames.length > 0 ? potentialNames[0] : null;

    return { pokemonName, requestType };
}

// Export for module usage
module.exports = { parseMessage };

// If run directly from command line
if (require.main === module) {
    // Get command line arguments, skip the first two (node and script name)
    const args = process.argv.slice(2);

    // If no arguments provided, show usage
    if (args.length === 0) {
        console.log('Usage: node parseMessage.js "What type is Bulbasaur?"');
        console.log('Or provide a message via stdin');
        process.exit(1);
    }

    // If arguments provided, join them and parse
    const message = args.join(' ');
    const result = parseMessage(message);

    // Output as JSON
    console.log(JSON.stringify(result, null, 2));
}