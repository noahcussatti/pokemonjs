var { Pokemon } = require("../models/pokemon");

var pokemons = [];

function _Pokemon(name, currentHealth, maxHealth, attack, special_attack, defense, special_defense, speed, types, moves, health_stage, attack_stage, special_attack_stage, defense_stage, special_defense_stage, speed_stage, evade_stage, accuracy_stage, is_burned, is_frozen, is_paralyzed, is_poisoned, is_sleeping, is_confused, front_img, back_img, shiny_front_img, shiny_back_img) {
    name = name,
    currentHealth = currentHealth,
    maxHealth = maxHealth,
    attack = attack,
    special_attack = special_attack,  
    defense = defense,
    special_defense = special_defense,
    speed = speed,
    types = types,
    moves = moves,
    health_stage = health_stage,
    attack_stage = attack_stage,
    special_attack_stage = special_attack_stage,
    defense_stage = defense_stage,
    special_defense_stage = special_defense_stage,
    speed_stage = speed_stage,
    evade_stage = evade_stage,
    accuracy_stage = accuracy_stage,
    is_burned = is_burned,
    is_frozen = is_frozen,
    is_paralyzed = is_paralyzed,
    is_poisoned = is_poisoned,
    is_sleeping = is_sleeping,
    is_confused = is_confused,
    front_img = front_img,
    back_img = back_img,
    shiny_front_img = shiny_front_img,
    shiny_back_img = shiny_back_img
}

var seedPokemons = function(req, res) {
    for (var i = 0; i < pokemons.length; i++) {;
        var newPokemon = new _Pokemon(pokemons[i]);

        newPokemon.save(function (err, pokemon) {
            if (err) console.log("Error: " + err);
            if (pokemon) console.log("Pokemon: " + pokemon);
        })
    }
    res.json({message: "Seeding Pokemon Complete"});
}

module.exports = {
    seedPokemons: seedPokemons
}