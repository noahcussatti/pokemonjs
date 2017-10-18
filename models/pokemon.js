var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pokemonSchema = new Schema({
    name: String,
    currentHealth: Number,
    maxHealth: Number,
    attack: Number,
    special_attack: Number,
    defense: Number,
    special_defense: Number,
    speed: Number,
    types: [Array],
    moves: [Array],
    health_stage: Number,
    attack_stage: Number,
    special_attack_stage: Number,
    defense_stage: Number,
    special_defense_stage: Number,
    speed_stage: Number,
    evade_stage: Number,
    accuracy_stage: Number,
    is_burned: Boolean,
    is_frozen: Boolean,
    is_paralyzed: Boolean,
    is_poisoned: Boolean,
    is_sleeping: Boolean,
    is_confused: Boolean,
    front_img: String,
    back_img: String,
    shiny_front_img: String,
    shiny_back_img: String
})

var Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = {
    Pokemon: Pokemon,
    pokemonSchema: pokemonSchema
}
