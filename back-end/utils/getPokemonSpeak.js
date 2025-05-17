function getPokemonSpeak(pokemon) {
    switch (pokemon.toLowerCase()) {
        case 'squirtle':
            return "Squirtle squirt squirtle!";
        case 'charmander':
            return "Char char! Charmander char!";
        case 'bulbasaur':
            return "Bulba bulba bulbasaur!";
        default:
            return "[mysterious Pokémon noises]";
    }
}

module.exports = { getPokemonSpeak };
