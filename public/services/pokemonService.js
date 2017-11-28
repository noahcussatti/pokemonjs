app.service("pokemonService", function ($http, $state) {

    var _trainer1 = []
    var _trainer2 = []

    var _trainer1_img_front = "../img/trainer-sprites/hilbert/front.png"
    var _trainer1_img_back = "../img/trainer-sprites/hilbert/back.png"
    var _trainer2_img_front = "../img/trainer-sprites/hilda/front.png"
    var _trainer2_img_back = "../img/trainer-sprites/hilda/back.png"

    function Pokemon(name, currentHealth, maxHealth, attack, special_attack, defense, special_defense,
        speed, types, moves, health_stage, attack_stage, special_attack_stage, defense_stage,
        special_defense_stage, speed_stage, evade_stage, accuracy_stage, is_burned, is_frozen, is_paralyzed, is_poisoned, is_sleeping, is_confused, front_img, back_img, health_multiplier, attack_multiplier, special_attack_multiplier, defense_multiplier, special_defense_multiplier, speed_multiplier) {
        this.name = name;
        this.currentHealth = currentHealth;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.special_attack = special_attack;
        this.defense = defense;
        this.special_defense = special_defense;
        this.speed = speed;
        this.types = types;
        this.moves = moves;
        this.health_stage = health_stage;
        this.attack_stage = attack_stage;
        this.special_attack = special_attack;
        this.defense_stage = defense_stage;
        this.special_defense_stage = special_defense_stage;
        this.speed_stage = speed_stage;
        this.evade_stage = evade_stage;
        this.accuracy_stage = accuracy_stage;
        this.is_burned = is_burned;
        this.is_frozen = is_frozen;
        this.is_paralyzed = is_paralyzed;
        this.is_poisoned = is_poisoned;
        this.is_sleeping = is_sleeping;
        this.is_confused = is_sleeping;
        this.front_img = front_img;
        this.back_img = back_img;
        this.health_multiplier = health_multiplier;
        this.attack_multiplier = attack_multiplier;
        this.special_attack_multiplier = special_attack_multiplier;
        this.defense_multiplier = defense_multiplier;
        this.special_defense_multiplier = special_defense_multiplier;
        this.speed_multiplier = speed_multiplier;

    }

    this.getPokemon = function () {
        return $http.get("https://pokeapi.co/api/v2/pokemon?limit=649")
            .then(function (response) {
                return response.data.results;
            })
    };

    this.getOnePokemon = function (url) {
        return $http.get("https://pokeapi.co/api/v2/pokemon/" + url);
    };

    this.addPokemon1 = function (newPokemon, moves) {
        var shinyChance = Math.round(Math.random() * (8192 - 1) + 1);
        if (shinyChance != 2) {
            _trainer1.unshift(new Pokemon(newPokemon.name, newPokemon.stats[5].base_stat, newPokemon.stats[5].base_stat,
                newPokemon.stats[4].base_stat, newPokemon.stats[2].base_stat,
                newPokemon.stats[0].base_stat, newPokemon.stats[3].base_stat,
                newPokemon.stats[1].base_stat,
                [], [], 0, 0, 0, 0, 0, 0, 0, 0, false, false, false, false, false, false, newPokemon.sprites.front_default, newPokemon.sprites.back_default, 1, 1, 1, 1, 1, 1));

            if (_trainer1.length >= 7) {
                _trainer1.shift();
            }
        }

        else {
            _trainer1.unshift(new Pokemon(newPokemon.name, newPokemon.stats[5].base_stat, newPokemon.stats[5].base_stat,
                newPokemon.stats[4].base_stat, newPokemon.stats[2].base_stat,
                newPokemon.stats[0].base_stat, newPokemon.stats[3].base_stat,
                newPokemon.stats[1].base_stat,
                [], [], 0, 0, 0, 0, 0, 0, 0, 0, false, false, false, false, false, false, newPokemon.sprites.front_shiny, newPokemon.sprites.back_shiny, 1, 1, 1, 1, 1, 1));

            if (_trainer1.length >= 7) {
                _trainer1.shift();
            }
        }

        _trainer1[0].moves.unshift(moves[0])
        _trainer1[0].moves.unshift(moves[1])
        _trainer1[0].moves.unshift(moves[2])
        _trainer1[0].moves.unshift(moves[3])
        if (newPokemon.types.length > 1) {
            _trainer1[0].types.unshift(newPokemon.types[0])
            _trainer1[0].types.unshift(newPokemon.types[1])
        }
        else {
            _trainer1[0].types.unshift(newPokemon.types[0])
        }

        console.log(_trainer1);
    }

    this.addPokemon2 = function (newPokemon, moves) {
        var shinyChance = Math.round(Math.random() * (8192 - 1) + 1);
        if (shinyChance != 2) {
            _trainer2.unshift(new Pokemon(newPokemon.name, newPokemon.stats[5].base_stat, newPokemon.stats[5].base_stat,
                newPokemon.stats[4].base_stat, newPokemon.stats[2].base_stat,
                newPokemon.stats[0].base_stat, newPokemon.stats[3].base_stat,
                newPokemon.stats[1].base_stat,
                [], [], 0, 0, 0, 0, 0, 0, 0, 0, false, false, false, false, false, false, newPokemon.sprites.front_default, newPokemon.sprites.back_default, 1, 1, 1, 1, 1, 1));

            if (_trainer2.length >= 7) {
                _trainer2.shift();
            }
        }

        else {
            _trainer2.unshift(new Pokemon(newPokemon.name, newPokemon.stats[5].base_stat, newPokemon.stats[5].base_stat,
                newPokemon.stats[4].base_stat, newPokemon.stats[2].base_stat,
                newPokemon.stats[0].base_stat, newPokemon.stats[3].base_stat,
                newPokemon.stats[1].base_stat,
                [], [], 0, 0, 0, 0, 0, 0, 0, 0, false, false, false, false, false, false, newPokemon.sprites.front_shiny, newPokemon.sprites.back_shiny, 1, 1, 1, 1, 1, 1));

            if (_trainer2.length >= 7) {
                _trainer2.shift();
            }
        }


        if (newPokemon.types.length > 1) {
            _trainer2[0].types.unshift(newPokemon.types[0])
            _trainer2[0].types.unshift(newPokemon.types[1])
        }
        else {
            _trainer2[0].types.unshift(newPokemon.types[0])
        }

        _trainer2[0].moves.unshift(moves[0])
        _trainer2[0].moves.unshift(moves[1])
        _trainer2[0].moves.unshift(moves[2])
        _trainer2[0].moves.unshift(moves[3])
        console.log(_trainer2);
    }

    this.getTrainer1 = function () {
       
      
            return _trainer1;

    }

    this.getTrainer2 = function () {
        
        
            return _trainer2;
      
    }

    this.checkTeams = function () {
        if (_trainer1.length > 0 && _trainer2.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    this.resetTeams = function () {
        _trainer1 = [];
        _trainer2 = [];
    }

    this.addTrainer1 = function (url, url2) {
        _trainer1_img_front = url;
        _trainer1_img_back = url2;
    } 

    this.addTrainer2 = function (url, url2) {
        _trainer2_img_front = url;
        _trainer2_img_back = url2;
    }


    this.getTrainer1Img = function () {
        return _trainer1_img_front;
    }

    this.getTrainer2Img = function () {
        return _trainer2_img_back;
    }
})




// If cors error, add this to the begining of the URL
//https://cors.now.sh/