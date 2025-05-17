function getPokemonSpeak(pokemon) {
    switch (pokemon.toLowerCase()) {
        case 'squirtle': return "Squirtle squirt squirtle!";
        case 'charmander': return "Char char! Charmander char!";
        case 'bulbasaur': return "Bulba bulba bulbasaur!";
        default: return "[mysterious Pokémon noises]";
    }
}

module.exports = { getPokemonSpeak };

// TEST CODE (only runs when this file is run directly)
if (require.main === module) {
    console.log(getPokemonSpeak("squirtle")); // should print "Squirtle squirt squirtle!"
}
