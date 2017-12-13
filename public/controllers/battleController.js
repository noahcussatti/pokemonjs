app.controller("battleController", function ($scope, $state, $http, $timeout, pokemonService) {

    document.getElementById("body").classList.add("selection-background");
    
    var pokemon1SelectedMove = false;
    var pokemon2SelectedMove = false;

    $scope.show_sleep_1 = false;
    $scope.show_poison_1 = false;
    $scope.show_frozen_1 = false;
    $scope.show_paralyzed_1 = false;
    $scope.show_burned_1 = false;
    $scope.show_sleep_2 = false;
    $scope.show_poison_2 = false;
    $scope.show_frozen_2 = false;
    $scope.show_paralyzed_2 = false;
    $scope.show_burned_2 = false;


    // ATTACK CLASS BOLEANS
    var physicalAttack = false;
    var specialAttack = false;
    var statusAttack = false;


    var beforeCurrentHealth;

    $scope.showFightButton = false;
    $scope.showBattleButtons = true;

    // DEFAULT TYPE MODIFIER VALUE
    var typeModifier = 1;

    // STAB MODIFIER
    var STAB = 1;

    // CRIT MODIFIER
    var critModifier = 1;

    // FLINCH CHANCE
    var flinchChance = 0;

    // STATUS CHANCE
    var statusChance = 0;

    // RANDOM ATTACK
    var randomChance = 0.85


    // === CALCULATE TYPE VER 2 === //
    var calculateType = function (moveType, enemyType1, enemyType2) {

        // Reseting the value of type modifier
        typeModifier = 1;


        // NORMAL
        if (moveType == "normal") {
            switch (enemyType1) {
                case "rock":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ghost":
                    typeModifier = typeModifier * 0;
                    break;
            }
            switch (enemyType2) {
                case "rock":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ghost":
                    typeModifier = typeModifier * 0;
                    break;
            }
        }

        // FIRE
        if (moveType == "fire") {
            switch (enemyType1) {
                case "fire":
                case "water":
                case "rock":
                case "dragon":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "ice":
                case "bug":
                case "steel":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fire":
                case "water":
                case "rock":
                case "dragon":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "ice":
                case "bug":
                case "steel":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // WATER
        if (moveType == "water") {
            switch (enemyType1) {
                case "water":
                case "grass":
                case "dragon":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fire":
                case "ground":
                case "rock":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "water":
                case "grass":
                case "dragon":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fire":
                case "ground":
                case "rock":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }


        // ELECTRIC
        if (moveType == "electric") {
            switch (enemyType1) {
                case "electric":
                case "grass":
                case "ground":
                case "dragon":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ground":
                    typeModifier = typeModifier * 0;
                    break;
                case "water":
                case "flying":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "electric":
                case "grass":
                case "ground":
                case "dragon":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ground":
                    typeModifier = typeModifier * 0;
                    break;
                case "water":
                case "flying":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // GRASS
        if (moveType == "grass") {
            switch (enemyType1) {
                case "fire":
                case "grass":
                case "poison":
                case "flying":
                case "bug":
                case "dragon":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "water":
                case "ground":
                case "rock":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fire":
                case "grass":
                case "poison":
                case "flying":
                case "bug":
                case "dragon":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "water":
                case "ground":
                case "rock":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // ICE
        if (moveType == "ice") {
            switch (enemyType1) {
                case "fire":
                case "water":
                case "ice":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "ground":
                case "flying":
                case "dragon":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fire":
                case "water":
                case "ice":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "ground":
                case "flying":
                case "dragon":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // FIGHTING
        if (moveType == "fighting") {
            switch (enemyType1) {
                case "poison":
                case "flying":
                case "psychic":
                case "bug":
                case "fairy":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ghost":
                    typeModifier = typeModifier * 0;
                    break;
                case "normal":
                case "ice":
                case "rock":
                case "dark":
                case "steel":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "poison":
                case "flying":
                case "psychic":
                case "bug":
                case "fairy":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ghost":
                    typeModifier = typeModifier * 0;
                    break;
                case "normal":
                case "ice":
                case "rock":
                case "dark":
                case "steel":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // POISON
        if (moveType == "poison") {
            switch (enemyType1) {
                case "poison":
                case "ground":
                case "rock":
                case "ghost":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "steel":
                    typeModifier = typeModifier * 0;
                    break;
                case "grass":
                case "fairy":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "poison":
                case "ground":
                case "rock":
                case "ghost":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "steel":
                    typeModifier = typeModifier * 0;
                    break;
                case "grass":
                case "fairy":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }


        // GROUND
        if (moveType == "ground") {
            switch (enemyType1) {
                case "grass":
                case "bug":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "flying":
                    typeModifier = typeModifier * 0;
                    break;
                case "fire":
                case "electric":
                case "poison":
                case "rock":
                case "steel":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "grass":
                case "bug":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "flying":
                    typeModifier = typeModifier * 0;
                    break;
                case "fire":
                case "electric":
                case "poison":
                case "rock":
                case "steel":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // FLYING
        if (moveType == "flying") {
            switch (enemyType1) {
                case "electric":
                case "rock":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "fighting":
                case "bug":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "electric":
                case "rock":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "fighting":
                case "bug":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // PSYCHIC
        if (moveType == "psychic") {
            switch (enemyType1) {
                case "psychic":
                case "dark":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "dark":
                    typeModifier = typeModifier * 0;
                    break;
                case "fighting":
                case "poison":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "psychic":
                case "dark":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "dark":
                    typeModifier = typeModifier * 0;
                    break;
                case "fighting":
                case "poison":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // BUG
        if (moveType == "bug") {
            switch (enemyType1) {
                case "fire":
                case "fighting":
                case "poison":
                case "flying":
                case "ghost":
                case "steel":
                case "fairy":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "psychic":
                case "dark":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fire":
                case "fighting":
                case "poison":
                case "flying":
                case "ghost":
                case "steel":
                case "fairy":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "grass":
                case "psychic":
                case "dark":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // ROCK
        if (moveType == "rock") {
            switch (enemyType1) {
                case "fighting":
                case "ground":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fire":
                case "ice":
                case "flying":
                case "bug":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fighting":
                case "ground":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fire":
                case "ice":
                case "flying":
                case "bug":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }


        // GHOST
        if (moveType == "ghost") {
            switch (enemyType1) {
                case "normal":
                    typeModifier = typeModifier * 0;
                    break;
                case "dark":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "psychic":
                case "ghost":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "normal":
                    typeModifier = typeModifier * 0;
                    break;
                case "dark":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "psychic":
                case "ghost":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }


        // DRAGON
        if (moveType == "dragon") {
            switch (enemyType1) {
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fairy":
                    typeModifier = typeModifier * 0;
                    break;
                case "dragon":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fairy":
                    typeModifier = typeModifier * 0;
                    break;
                case "dragon":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }

        // DARK
        if (moveType == "dark") {
            switch (enemyType1) {
                case "fighting":
                case "dark":
                case "fairy":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "psychic":
                case "ghost":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fighting":
                case "dark":
                case "fairy":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "psychic":
                case "ghost":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }


        // STEEL
        if (moveType == "steel") {
            switch (enemyType1) {
                case "fire":
                case "water":
                case "electric":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ice":
                case "rock":
                case "fairy":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fire":
                case "water":
                case "electric":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "ice":
                case "rock":
                case "fairy":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }


        // FAIRY
        if (moveType == "fairy") {
            switch (enemyType1) {
                case "fire":
                case "poison":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fighting":
                case "dragon":
                case "dark":
                    typeModifier = typeModifier * 2;
                    break;
            }
            switch (enemyType2) {
                case "fire":
                case "poison":
                case "steel":
                    typeModifier = typeModifier * 0.5;
                    break;
                case "fighting":
                case "dragon":
                case "dark":
                    typeModifier = typeModifier * 2;
                    break;
            }
        }
    }




    var statusMoveChecks = function (pokemon) {
        if (pokemon.is_poisoned == true) {
            pokemon.currentHealth = pokemon.currentHealth - Math.round(pokemon.maxHealth / 8)
            moveHealthBar1();
            moveHealthBar2();
        }
        else if (pokemon.is_burned == true) {
            pokemon.currentHealth = pokemon.currentHealth - Math.round(pokemon.maxHealth / 8)
            moveHealthBar1();
            moveHealthBar2();
        }
    }



    // === CHECK TO SEE IF MOVE IS PHYSICAL OR SPECIAL === //
    var checkMoveClass = function (move) {
        if (move.data.damage_class.name == "physical") {
            physicalAttack = true;
            specialAttack = false;
            statusAttack = false;
        }
        else if (move.data.damage_class.name == "special") {
            physicalAttack = false;
            specialAttack = true;
            statusAttack = false;
        }
        else if (move.data.damage_class.name == "status") {
            physicalAttack = false;
            specialAttack = false;
            statusAttack = true;
        }
    }

    var damageMoves = function (move, currentPokemon, enemyPokemon, damage) {
        beforeCurrentHealth = currentPokemon.currentHealth;
        // REGULAR DAMAGE
        if (move.data.meta.category.name == "damage") {
            enemyPokemon.currentHealth = enemyPokemon.currentHealth - damage;
            if (move.data.meta.drain != 0) {
                currentPokemon.currentHealth = currentPokemon.currentHealth + Math.round((damage * (move.data.meta.drain / 100)))
            }
        }

        // Inflicts damage; chance to add status effect
        else if (move.data.meta.category.name == "damage+ailment") {
            // Calculate Damage
            enemyPokemon.currentHealth = enemyPokemon.currentHealth - damage;

            // Status Effect Chance
            var ailmentChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            if (move.data.meta.ailment_chance > ailmentChance) {
                if (enemyPokemon.is_poisoned != true || enemyPokemon.is_burned != true || enemyPokemon.is_frozen != true || enemyPokemon.is_paralyzed != true || enemyPokemon.is_asleep != true) {
                    if (move.data.meta.ailment.name == "poison") {
                        enemyPokemon.is_poisoned = true;
                    }
                    else if (move.data.meta.ailment.name == "burn") {
                        enemyPokemon.is_burned = true;
                    }
                    else if (move.data.meta.ailment.name == "freeze") {
                        enemyPokemon.is_frozen = true;
                    }
                    else if (move.data.meta.ailment.name == "paralysis") {
                        enemyPokemon.is_paralyzed = true;
                    }
                    else if (move.data.meta.ailment.name == "sleep") {
                        enemyPokemon.is_asleep = true;
                    }
                }
                // Checks if Confused
                if (enemyPokemon.is_confused != true) {
                    if (move.data.meta.ailment.name == "confusion") {
                        enemyPokemon.is_confused = true;
                    }
                }
            }
        }



        // Inflicts damage; lowers target's stats
        else if (move.data.meta.category.name == "damage+lower") {
            var statArray = move.data.stat_changes
            // Calculate Power
            enemyPokemon.currentHealth = enemyPokemon.currentHealth - damage;

            // Lower Stat Chance
            var statChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            if (move.data.meta.stat_chance > statChance) {
                for (var i = 0; i < statArray.length; i++) {
                    if (statArray[i].stat.name == "attack") {
                        enemyPokemon.attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "hp") {
                        enemyPokemon.health_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "defense") {
                        enemyPokemon.defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-attack") {
                        enemyPokemon.special_attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-defense") {
                        enemyPokemon.special_defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "speed") {
                        enemyPokemon.speed_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "evasion") {
                        enemyPokemon.evade_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "accuracy") {
                        enemyPokemon.accuracy_stage += move.data.stat_changes[i].change
                    }
                }
            }
        }

        // Inflicts damage; raises user's stats
        else if (move.data.meta.category.name == "damage+raise") {
            var statArray = move.data.stat_changes
            // Calculate Power
            enemyPokemon.currentHealth = enemyPokemon.currentHealth - damage;

            // Increase User Stat Chance
            var statChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            if (move.data.meta.stat_chance > statChance) {
                for (var i = 0; i < statArray.length; i++) {
                    if (statArray[i].stat.name == "attack") {
                        currentPokemon.attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "hp") {
                        currentPokemon.health_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "defense") {
                        currentPokemon.defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-attack") {
                        currentPokemon.special_attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-defense") {
                        currentPokemon.special_defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "speed") {
                        currentPokemon.speed_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "evasion") {
                        currentPokemon.evade_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "accuracy") {
                        currentPokemon.accuracy_stage += move.data.stat_changes[i].change
                    }
                }
            }
        }

        // Inflicts damage; absorbs damage done to heal the user
        else if (move.data.meta.category.name == "damage+heal") {
            // Calculate Power
            enemyPokemon.currentHealth = enemyPokemon.currentHealth - damage;

            // Drain Health
            var healSteal = move.data.meta.drain / 100;
            currentPokemon.currentHealth += healSteal;
        }
    }


    ///////////////////////////////////////////////////////////
    //                                                       //
    // === CHECKS WHICH STATUS MOVE CURRENT POKEMON USES === //
    //                                                       //
    ///////////////////////////////////////////////////////////
    var statusMoves = function (move, currentPokemon, enemyPokemon) {
        var statArray = move.data.stat_changes
        if (move.data.meta.category.name == "net-good-stats") {
            console.log(move.data.stat_changes[0].change)
            if (move.data.stat_changes[0].change > 0) {
                for (var i = 0; i < move.data.stat_changes.length; i++) {
                    if (statArray[i].stat.name == "attack") {
                        console.log(move.data.stat_changes[i].change)
                        currentPokemon.attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "hp") {
                        currentPokemon.health_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "defense") {
                        currentPokemon.defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-attack") {
                        currentPokemon.special_attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-defense") {
                        currentPokemon.special_defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "speed") {
                        currentPokemon.speed_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "evasion") {
                        currentPokemon.evade_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "accuracy") {
                        currentPokemon.accuracy_stage += move.data.stat_changes[i].change
                    }
                }
            }
            else if (move.data.stat_changes[0].change < 0) {
                for (var i = 0; i < move.data.stat_changes.length; i++) {
                    if (statArray[i].stat.name == "attack") {
                        enemyPokemon.attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "hp") {
                        enemyPokemon.health_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "defense") {
                        enemyPokemon.defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-attack") {
                        enemyPokemon.special_attack_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "special-defense") {
                        enemyPokemon.special_defense_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "speed") {
                        enemyPokemon.speed_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "evasion") {
                        enemyPokemon.evade_stage += move.data.stat_changes[i].change
                    }
                    if (statArray[i].stat.name == "accuracy") {
                        enemyPokemon.accuracy_stage += move.data.stat_changes[i].change
                    }
                }
            }
        }

        // NO DAMAGE; INFLICTS STATUS AILMENT; RAISES TARGET'S STATS
        else if (move.data.meta.category.name == "swagger") {
            // CHECKS TO SEE IF ENEMY POKEMON IS CONFUSED
            if (enemyPokemon.is_confused != true) {
                // ADDS CONFUSION TO ENEMY POKEMON
                enemyPokemon.is_confused = true;
                // BOOSTS STATS OF ENEMY POKEMON
                if (statArray[0].stat.name == "attack") {
                    enemyPokemon.attack_stage += move.data.state_changes[0].change;
                }
                if (statArray[0].stat.name == "special-attack") {
                    enemyPokemon.special_attack_stage += move.data.state_changes[0].change;
                }
            }
        }

        // NO DAMAGE; INFLICTS STATUS AILMENT
        else if (move.data.meta.category.name == "ailment") {
            // CHECKS TO SEE IF ENEMY POKEMON DOES NOT HAVE A CURRENT AILMENT
            if (enemyPokemon.is_poisoned != true || enemyPokemon.is_burned != true || enemyPokemon.is_frozen != true || enemyPokemon.is_paralyzed != true || enemyPokemon.is_asleep != true) {
                // CHECKS WHICH AILMENT IS NEEDED AND ADDS TO IT ENEMY POKEMON
                if (move.data.meta.ailment.name == "poison") {
                    enemyPokemon.is_poisoned = true;
                }
                else if (move.data.meta.ailment.name == "burn") {
                    enemyPokemon.is_burned = true;
                }
                else if (move.data.meta.ailment.name == "freeze") {
                    enemyPokemon.is_frozen = true;
                }
                else if (move.data.meta.ailment.name == "paralysis") {
                    enemyPokemon.is_paralyzed = true;
                }
                else if (move.data.meta.ailment.name == "sleep") {
                    enemyPokemon.is_asleep = true;
                }
            }
            // CHECKS TO SEE IF ENEMY POKEMON IS NOT CONFUSED
            if (enemyPokemon.is_confused != true) {
                // ADDS CONFUSION
                if (move.data.meta.ailment.name == "confusion") {
                    enemyPokemon.is_confused = true;
                }
            }
        }
    }






    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                               //
    // === CHECK TO SEE IF THE MOVE MADE THE OPPONENT FLINCH (ONLY WORKS IF ATTACKER GOES FIRST) === //
    //                                                                                               //
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    var checkMoveFlinchChance = function (move, enemyPokemon) {
        // IF MOVE HAS CHANCE TO FLINCH
        if (move.data.meta.flinch_chance != 0) {
            // FLINCH RNG
            flinchChance = Math.floor(Math.random() * (100 - move.data.meta.flinch_chance + move.data.meta.flinch_chance)) + move.data.meta.flinch_chance;
        }
        // IF MOVE DOESN'T HAVE CHANCE TO FLINCH
        else {
            // CHANGE FLINCH CHANCE TO 0%;
            flinchChance = 0;
        }
    }




    ///////////////////////////////////////////////////
    //                                               //
    // === CHECK TO SEE IF THE ATTACK WAS A CRIT === //
    //                                               //
    ///////////////////////////////////////////////////
    var checkMoveCrit = function (pokemon) {

        // RNG FOR CRITICAL CHANCE
        var critChance = Math.floor(Math.random() * (16 - 1 + 1)) + 1;

        // CRITICAL MULTIPLIER
        if (critChance == 1) {
            critModifier = ((2 * 50 + 5) / (50 + 5));
        }

        // NO CRITICAL MULTIPLIER
        else {
            critModifier = 1;
        }
    }



    ////////////////////////////////////////
    //                                    //
    // === CHECK RANDOM DAMAGE OUTPUT === //
    //                                    //
    ////////////////////////////////////////
    var checkRandom = function () {
        // GET RANDOM MULTIPLIER BETWEEN 1 AND 0.85
        randomChance = Math.random() * (1 - 0.85) + 0.85;
    }





    /////////////////////////////////////////////////////////////////
    //                                                             //
    // === CHECK TO SEE IF MOVE IS SAME TYPE AS POKEMON (STAB) === //
    //                                                             //
    /////////////////////////////////////////////////////////////////
    var checkMoveSTAB = function (move, pokemon) {

        // PUSHING MOVE TYPE INTO A VARIABLE //
        var moveType = move.data.type.name;

        // CREATE AREA FOR THE CURRENT POKEMON'S TYPE(S) //
        var pokemonTypes = [];

        // PUSH THE FIRST POKEMON'S TYPE TO THE ARRAY //
        pokemonTypes.push(pokemon.types[0]);

        // CHECK TO SEE IF POKEMON HAS 2 TYPES //
        if (pokemon.types.length > 1) {
            pokemonTypes.push(pokemon.types[1]);
        }


        // === STAB CHECKING === //

        // MONO TYPE POKEMON STAB CHECK
        if (pokemonTypes.length == 1) {
            // IF POKEMON TYPE EQUALS MOVE TYPE MULTPLIER TO 1.5
            if (pokemonTypes[0] == moveType) {
                STAB = 1.5;
            }
        }

        // DUAL TYPE POKEMON STAB CHECK
        else if (pokemonTypes.length == 2) {

            // IF POKEMON TYPE EQUALS MOVE TYPE MULTPLIER TO 1.5
            if (pokemonTypes[0] == moveType) {
                STAB = 1.5;
            }
            else if (pokemonTypes[1] == moveType) {
                STAB = 1.5;
            }
        }

        // IF NO STAB, CHANGE MULTIPLIER TO 1
        else {
            STAB = 1;
        }
    }



    //////////////////////////////////////////////////////////////////
    //                                                              //
    // === CALCULATE STAT STAGES AND CHANGE THEM TO MULTIPLIERS === //
    //                                                              //
    //////////////////////////////////////////////////////////////////
    var checkStatStages = function (currentPokemon) {

        // CALCULATE ATTACK MULTIPLIER
        if (currentPokemon.attack_stage != 0) {
            if (currentPokemon.attack_stage = 1 && currentPokemon.attack_multiplier != 1.5) {
                currentPokemon.attack_multiplier = 1.5;
            }
            else if (currentPokemon.attack_stage = 2 && currentPokemon.attack_multiplier != 2) {
                currentPokemon.attack_multiplier = 2;
            }
            else if (currentPokemon.attack_stage = 3 && currentPokemon.attack_multiplier != 2.5) {
                currentPokemon.attack_multiplier = 2.5;
            }
            else if (currentPokemon.attack_stage = 4 && currentPokemon.attack_multiplier != 3) {
                currentPokemon.attack_multiplier = 3;
            }
            else if (currentPokemon.attack_stage = 5 && currentPokemon.attack_multiplier != 3.5) {
                currentPokemon.attack_multiplier = 3.5;
            }
            else if (currentPokemon.attack_stage = 6 && currentPokemon.attack_multiplier != 4) {
                currentPokemon.attack_multiplier = 4;
            }
            else if (currentPokemon.attack_stage = -1 && currentPokemon.attack_multiplier != 0.66) {
                currentPokemon.attack_multiplier = 0.66;
            }
            else if (currentPokemon.attack_stage = -2 && currentPokemon.attack_multiplier != 0.5) {
                currentPokemon.attack_multiplier = 0.5;
            }
            else if (currentPokemon.attack_stage = -3 && currentPokemon.attack_multiplier != 0.4) {
                currentPokemon.attack_multiplier = 0.4;
            }
            else if (currentPokemon.attack_stage = -4 && currentPokemon.attack_multiplier != 0.33) {
                currentPokemon.attack_multiplier = 0.33;
            }
            else if (currentPokemon.attack_stage = -5 && currentPokemon.attack_multiplier != 0.28) {
                currentPokemon.attack_multiplier = 0.28;
            }
            else if (currentPokemon.attack_stage = -6 && currentPokemon.attack_multiplier != 0.25) {
                currentPokemon.attack_multiplier = 0.25;
            }

        }

        // CALCULATE SPECIAL ATTACK MULTIPLIER
        if (currentPokemon.special_attack_stage != 0) {
            if (currentPokemon.special_attack_stage = 1 && currentPokemon.special_attack_multiplier != 1.5) {
                currentPokemon.special_attack_multiplier = 1.5;
            }
            else if (currentPokemon.special_attack_stage = 2 && currentPokemon.special_attack_multiplier != 2) {
                currentPokemon.special_attack_multiplier = 2;
            }
            else if (currentPokemon.special_attack_stage = 3 && currentPokemon.special_attack_multiplier != 2.5) {
                currentPokemon.special_attack_multiplier = 2.5;
            }
            else if (currentPokemon.special_attack_stage = 4 && currentPokemon.special_attack_multiplier != 3) {
                currentPokemon.special_attack_multiplier = 3;
            }
            else if (currentPokemon.special_attack_stage = 5 && currentPokemon.special_attack_multiplier != 3.5) {
                currentPokemon.special_attack_multiplier = 3.5;
            }
            else if (currentPokemon.special_attack_stage = 6 && currentPokemon.special_attack_multiplier != 4) {
                currentPokemon.special_attack_multiplier = 4;
            }
            else if (currentPokemon.special_attack_stage = -1 && currentPokemon.special_attack_multiplier != 0.66) {
                currentPokemon.special_attack_multiplier = 0.66;
            }
            else if (currentPokemon.special_attack_stage = -2 && currentPokemon.special_attack_multiplier != 0.5) {
                currentPokemon.special_attack_multiplier = 0.5;
            }
            else if (currentPokemon.special_attack_stage = -3 && currentPokemon.special_attack_multiplier != 0.4) {
                currentPokemon.special_attack_multiplier = 0.4;
            }
            else if (currentPokemon.special_attack_stage = -4 && currentPokemon.special_attack_multiplier != 0.33) {
                currentPokemon.special_attack_multiplier = 0.33;
            }
            else if (currentPokemon.special_attack_stage = -5 && currentPokemon.special_attack_multiplier != 0.28) {
                currentPokemon.special_attack_multiplier = 0.28;
            }
            else if (currentPokemon.special_attack_stage = -6 && currentPokemon.special_attack_multiplier != 0.25) {
                currentPokemon.special_attack_multiplier = 0.25;
            }

        }

        // CALCULATE DEFENSE MULTIPLIER
        if (currentPokemon.defense_stage != 0) {
            if (currentPokemon.defense_stage = 1 && currentPokemon.defense_multiplier != 1.5) {
                currentPokemon.defense_multiplier = 1.5;
            }
            else if (currentPokemon.defense_stage = 2 && currentPokemon.defense_multiplier != 2) {
                currentPokemon.defense_multiplier = 2;
            }
            else if (currentPokemon.defense_stage = 3 && currentPokemon.defense_multiplier != 2.5) {
                currentPokemon.defense_multiplier = 2.5;
            }
            else if (currentPokemon.defense_stage = 4 && currentPokemon.defense_multiplier != 3) {
                currentPokemon.defense_multiplier = 3;
            }
            else if (currentPokemon.defense_stage = 5 && currentPokemon.defense_multiplier != 3.5) {
                currentPokemon.defense_multiplier = 3.5;
            }
            else if (currentPokemon.defense_stage = 6 && currentPokemon.defense_multiplier != 4) {
                currentPokemon.defense_multiplier = 4;
            }
            else if (currentPokemon.defense_stage = -1 && currentPokemon.defense_multiplier != 0.66) {
                currentPokemon.defense_multiplier = 0.66;
            }
            else if (currentPokemon.defense_stage = -2 && currentPokemon.defense_multiplier != 0.5) {
                currentPokemon.defense_multiplier = 0.5;
            }
            else if (currentPokemon.defense_stage = -3 && currentPokemon.defense_multiplier != 0.4) {
                currentPokemon.defense_multiplier = 0.4;
            }
            else if (currentPokemon.defense_stage = -4 && currentPokemon.defense_multiplier != 0.33) {
                currentPokemon.defense_multiplier = 0.33;
            }
            else if (currentPokemon.defense_stage = -5 && currentPokemon.defense_multiplier != 0.28) {
                currentPokemon.defense_multiplier = 0.28;
            }
            else if (currentPokemon.defense_stage = -6 && currentPokemon.defense_multiplier != 0.25) {
                currentPokemon.defense_multiplier = 0.25;
            }
        }
        // CALCULATE SPECIAL DEFENSE MULTIPLIER
        if (currentPokemon.special_defense_stage != 0) {
            if (currentPokemon.special_defense_stage = 1 && currentPokemon.special_defense_multiplier != 1.5) {
                currentPokemon.special_defense_multiplier = 1.5;
            }
            else if (currentPokemon.special_defense_stage = 2 && currentPokemon.special_defense_multiplier != 2) {
                currentPokemon.special_defense_multiplier = 2;
            }
            else if (currentPokemon.special_defense_stage = 3 && currentPokemon.special_defense_multiplier != 2.5) {
                currentPokemon.special_defense_multiplier = 2.5;
            }
            else if (currentPokemon.special_defense_stage = 4 && currentPokemon.special_defense_multiplier != 3) {
                currentPokemon.special_defense_multiplier = 3;
            }
            else if (currentPokemon.special_defense_stage = 5 && currentPokemon.special_defense_multiplier != 3.5) {
                currentPokemon.special_defense_multiplier = 3.5;
            }
            else if (currentPokemon.special_defense_stage = 6 && currentPokemon.special_defense_multiplier != 4) {
                currentPokemon.special_defense_multiplier = 4;
            }
            else if (currentPokemon.special_defense_stage = -1 && currentPokemon.special_defense_multiplier != 0.66) {
                currentPokemon.special_defense_multiplier = 0.66;
            }
            else if (currentPokemon.special_defense_stage = -2 && currentPokemon.special_defense_multiplier != 0.5) {
                currentPokemon.special_defense_multiplier = 0.5;
            }
            else if (currentPokemon.special_defense_stage = -3 && currentPokemon.special_defense_multiplier != 0.4) {
                currentPokemon.special_defense_multiplier = 0.4;
            }
            else if (currentPokemon.special_defense_stage = -4 && currentPokemon.special_defense_multiplier != 0.33) {
                currentPokemon.special_defense_multiplier = 0.33;
            }
            else if (currentPokemon.special_defense_stage = -5 && currentPokemon.special_defense_multiplier != 0.28) {
                currentPokemon.special_defense_multiplier = 0.28;
            }
            else if (currentPokemon.special_defense_stage = -6 && currentPokemon.special_defense_multiplier != 0.25) {
                currentPokemon.special_defense_multiplier = 0.25;
            }
        }

        // CALCULATE HEALTH MULTIPLIER
        if (currentPokemon.health_stage != 0) {
            if (currentPokemon.health_stage = 1 && currentPokemon.health_multiplier != 1.5) {
                currentPokemon.health_multiplier = 1.5;
            }
            else if (currentPokemon.health_stage = 2 && currentPokemon.health_multiplier != 2) {
                currentPokemon.health_multiplier = 2;
            }
            else if (currentPokemon.health_stage = 3 && currentPokemon.health_multiplier != 2.5) {
                currentPokemon.health_multiplier = 2.5;
            }
            else if (currentPokemon.health_stage = 4 && currentPokemon.health_multiplier != 3) {
                currentPokemon.health_multiplier = 3;
            }
            else if (currentPokemon.health_stage = 5 && currentPokemon.health_multiplier != 3.5) {
                currentPokemon.health_multiplier = 3.5;
            }
            else if (currentPokemon.health_stage = 6 && currentPokemon.health_multiplier != 4) {
                currentPokemon.health_multiplier = 4;
            }
            else if (currentPokemon.health_stage = -1 && currentPokemon.health_multiplier != 0.66) {
                currentPokemon.health_multiplier = 0.66;
            }
            else if (currentPokemon.health_stage = -2 && currentPokemon.health_multiplier != 0.5) {
                currentPokemon.health_multiplier = 0.5;
            }
            else if (currentPokemon.health_stage = -3 && currentPokemon.health_multiplier != 0.4) {
                currentPokemon.health_multiplier = 0.4;
            }
            else if (currentPokemon.health_stage = -4 && currentPokemon.health_multiplier != 0.33) {
                currentPokemon.health_multiplier = 0.33;
            }
            else if (currentPokemon.health_stage = -5 && currentPokemon.health_multiplier != 0.28) {
                currentPokemon.health_multiplier = 0.28;
            }
            else if (currentPokemon.health_stage = -6 && currentPokemon.health_multiplier != 0.25) {
                currentPokemon.health_multiplier = 0.25;
            }
        }
        // CALCULATE SPEED MULTIPLIER
        if (currentPokemon.speed_stage != 0) {
            if (currentPokemon.speed_stage = 1 && currentPokemon.speed_multiplier != 1.5) {
                currentPokemon.speed_multiplier = 1.5;
            }
            else if (currentPokemon.speed_stage = 2 && currentPokemon.speed_multiplier != 2) {
                currentPokemon.speed_multiplier = 2;
            }
            else if (currentPokemon.speed_stage = 3 && currentPokemon.speed_multiplier != 2.5) {
                currentPokemon.speed_multiplier = 2.5;
            }
            else if (currentPokemon.speed_stage = 4 && currentPokemon.speed_multiplier != 3) {
                currentPokemon.speed_multiplier = 3;
            }
            else if (currentPokemon.speed_stage = 5 && currentPokemon.speed_multiplier != 3.5) {
                currentPokemon.speed_multiplier = 3.5;
            }
            else if (currentPokemon.speed_stage = 6 && currentPokemon.speed_multiplier != 4) {
                currentPokemon.speed_multiplier = 4;
            }
            else if (currentPokemon.speed_stage = -1 && currentPokemon.speed_multiplier != 0.66) {
                currentPokemon.speed_multiplier = 0.66;
            }
            else if (currentPokemon.speed_stage = -2 && currentPokemon.speed_multiplier != 0.5) {
                currentPokemon.speed_multiplier = 0.5;
            }
            else if (currentPokemon.speed_stage = -3 && currentPokemon.speed_multiplier != 0.4) {
                currentPokemon.speed_multiplier = 0.4;
            }
            else if (currentPokemon.speed_stage = -4 && currentPokemon.speed_multiplier != 0.33) {
                currentPokemon.speed_multiplier = 0.33;
            }
            else if (currentPokemon.speed_stage = -5 && currentPokemon.speed_multiplier != 0.28) {
                currentPokemon.speed_multiplier = 0.28;
            }
            else if (currentPokemon.speed_stage = -6 && currentPokemon.speed_multiplier != 0.25) {
                currentPokemon.speed_multiplier = 0.25;
            }
        }
    }














    var sleepCount = 0;
    var freezeCount = 0;





    ////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                            //
    //                                     BATTLE FUNCTION                                        //
    //                                                                                            //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    var battleFunction = function (move, currentPokemon, enemyPokemon) {

        // CHECKS TO SEE IS MOVE TYPE IS THE SAME AS CURRENT POKEMON //
        checkMoveSTAB(move, currentPokemon);

        // CALCULATES RANDOM DAMAGE MULTIPLIER 0.85-1 //
        checkRandom();

        // BURN MULTIPLIER //
        var burn = 1;
        // CHECKS TO SEE IF POKEMON IS BURNED //
        if (currentPokemon.is_burned == true && physicalAttack == true) {
            burn = 0.5;
        }

        // CALCULATES STAT MULTIPLIERS //
        checkStatStages(currentPokemon);
        checkStatStages(enemyPokemon);


        // CHECKS TO SEE IF MOVE IS CRITICAL //
        checkMoveCrit(currentPokemon);

        // CHECKS TO SEE IF MOVE IS PHYSICAL OR SPECIAL //
        checkMoveClass(move);

        //////////////////////////////////////////////////////////////////////////////////////////
        // === CALCULATES THE TYPE ADVANTAGE OR DISADVANTAGE FOR THE MOVE AND ENEMY POKEMON === //
        //////////////////////////////////////////////////////////////////////////////////////////

        // IF ENEMY POKEMON HAS 2 TYPES
        if (enemyPokemon.types.length > 1) {
            // CALCULATES THE TYPE ADVANTAGES USING THE calculateType() FUNCTION //
            calculateType(move.data.type.name, enemyPokemon.types[0].type.name, enemyPokemon.types[1].type.name);

            // TESTING AREA //
            console.log("enemy has 2 types");
            console.log("Move Type: " + move.data.type.name);
            // END TESTING  //
        }
        // IF ENEMY POKEMON HAS 1 TYPE
        else {
            // CALCULATES THE TYPE ADVANTAGES USING THE calculateType() FUNCTION //
            calculateType(move.data.type.name, enemyPokemon.types[0].type.name, null);

            // TESTING AREA //
            console.log("enemy has 1 type");
            console.log("Move Type: " + move.data.type.name);
            // END TESTING  //
        }

        console.log("Type Modifier: ", typeModifier)


        // SETTING ATTACK AND DEFENSE POWER TO 0 (DEFAULT) //
        var attackPower = 0;
        var defensePower = 0;


        ////////////////////////////////////////////////////////////
        // === CALCULATES MODIFIER FOR THE DAMAGE CALCULATION === //
        ////////////////////////////////////////////////////////////
        var modifier = critModifier * randomChance * STAB * typeModifier * burn;


        var skipTurn = false;

        // CHECKS IF ASLEEP
        if (currentPokemon.is_asleep == true) {
            // SLEEP RNG
            var sleepRNG = Math.floor(Math.random() * (2 - 1 + 1)) + 1

            // POKEMON SLEEPS FOR THE TURN
            if (sleepRNG = 1 && sleepCount < 4) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " continues to sleep!"
                sleepCount++;
                skipTurn = true;
            }
            // POKEMON WAKES UP
            else {
                currentPokemon.is_asleep = false;
                skipTurn = false;
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " woke up!"
            }
        }

        // CHECKS IF PARALYZED
        if (currentPokemon.is_paralyzed == true) {
            // PARALYZE RNG
            var paralysisRNG = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

            // POKEMON IS PARALYZED FOR THE TURN
            if (paralysisRNG == 1) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " is stuck in paralysis!"
                skipTurn = true;
            }
            else {
                skipTurn = false;
            }
        }

        // CHECKS IF FROZEN
        if (currentPokemon.is_frozen == true) {
            // FREEZE RNG
            var freezeRNG = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

            // POKEMON IS FROZEN FOR THE TURN
            if (freezeRNG > 2 && freezeCount < 5) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " is frozen solid!"
                skipTurn = true;
                freezeCount++;
            }
            else {
                currentPokemon.is_frozen = false;
                skipTurn = false;
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " thawed out of the ice!"
            }
        }

        ////////////////////////////////////
        // === PHYSICAL ATTACK DAMAGE === //
        ////////////////////////////////////
        if (physicalAttack == true && skipTurn == false) {

            // MAKES ATTACK AND DEFENSE POWER PHYSICALS
            console.log(currentPokemon)
            attackPower = currentPokemon.attack * currentPokemon.attack_multiplier  // MULTIPLY BY THE ATTACK STAGE FOR STAT MOVES
            defensePower = enemyPokemon.defense * enemyPokemon.defense_multiplier  // MULTIPLY BY THE DEFENSE STAGE FOR STAT MOVES
            console.log("Attack Power: " + attackPower);

            //                          CALCULATE DAMAGE
            /*///////////////////////////////////////////////////////////////////////////////////////////////
            //                                                                                             //
            //    Damage = ( ((((2 * Level) / 5) * Power * Attack / Defense) / 50) + 2) * Modifier         //
            //                                                                                             //
            //    Modifier = Critical * random * STAB * TypeModifier * Burn                                //
            //                                                                                             //
            //    random = random number between 0.85 and 1.00                                             //
            //                                                                                             //
            //    burn is 0.5 if the attacker is burned and used a physical move, otherwise it's 1         //
            //                                                                                             //
            *////////////////////////////////////////////////////////////////////////////////////////////////
            var calculatedDamage = (((((2 * 50) / 5) * move.data.power * attackPower / defensePower) / 50) + 2) * modifier;

            // ROUND DAMAGE TO THE NEAREST INTEGER //
            var damage = Math.round(calculatedDamage);

            // === ACCURACY CHECK === //

            // IF MOVE IS NOT A GUARANTEED HIT //
            if (move.data.accuracy != null) {

                // VARIABLE TO STORE MOVE ACCURACY
                var moveAccuracy = move.data.accuracy;

                // RNG FOR MOVE ACCURACY
                var moveRNG = Math.floor(Math.random() * (100 - 1 + 1)) + 1

                // START EVADE STAGE CHECKER
                if (enemyPokemon.evade_stage == 1) {
                    moveAccuracy * 0.66;
                }
                if (enemyPokemon.evade_stage == 2) {
                    moveAccuracy * 0.5;
                }
                if (enemyPokemon.evade_stage == 3) {
                    moveAccuracy * 0.4;
                }
                if (enemyPokemon.evade_stage == 4) {
                    moveAccuracy * 0.33;
                }
                if (enemyPokemon.evade_stage == 5) {
                    moveAccuracy * 0.28;
                }
                if (enemyPokemon.evade_stage == 6) {
                    moveAccuracy * 0.25;
                }
                if (enemyPokemon.evade_stage == -1) {
                    moveAccuracy * 1.5
                }
                if (enemyPokemon.evade_stage == -2) {
                    moveAccuracy * 2;
                }
                if (enemyPokemon.evade_stage == -3) {
                    moveAccuracy * 2.5;
                }
                if (enemyPokemon.evade_stage == -4) {
                    moveAccuracy * 3;
                }
                if (enemyPokemon.evade_stage == -5) {
                    moveAccuracy * 3.5;
                }
                if (enemyPokemon.evade_stage == -6) {
                    moveAccuracy * 4;
                }
                // END EVADE STAGE CHECKER

                // START ACCURACY STAGE CHECKER //
                if (currentPokemon.accuracy_stage == 1) {
                    moveAccuracy * 1.5;
                }
                if (currentPokemon.accuracy_stage == 2) {
                    moveAccuracy * 2;
                }
                if (currentPokemon.accuracy_stage == 3) {
                    moveAccuracy * 2.5;
                }
                if (currentPokemon.accuracy_stage == 4) {
                    moveAccuracy * 3;
                }
                if (currentPokemon.accuracy_stage == 5) {
                    moveAccuracy * 3.5;
                }
                if (currentPokemon.accuracy_stage == 6) {
                    moveAccuracy * 4;
                }
                if (currentPokemon.accuracy_stage == -1) {
                    moveAccuracy * 0.66;
                }
                if (currentPokemon.accuracy_stage == -2) {
                    moveAccuracy * 0.5;
                }
                if (currentPokemon.accuracy_stage == -3) {
                    moveAccuracy * 0.4;
                }
                if (currentPokemon.accuracy_stage == -4) {
                    moveAccuracy * 0.33;
                }
                if (currentPokemon.accuracy_stage == -5) {
                    moveAccuracy * 0.28;
                }
                if (currentPokemon.accuracy_stage == -6) {
                    moveAccuracy * 0.25;
                }
                // END ACCURACY STAGE CHECKER //

                // MOVE MISSES
                if (moveRNG > moveAccuracy) {
                    //=====================//
                    //     NEED TO ADD     //
                    //=====================//
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name + ", but it missed!"
                }

                // MOVE HITS
                else if (moveRNG <= moveAccuracy) {

                    // CHECKS TO SEE WHAT TYPE OF MOVE THE MOVE IS //
                    damageMoves(move, currentPokemon, enemyPokemon, damage);
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;


                    //===========FOR TESTING=============//

                    // SUPER EFFECTIVE
                    if (typeModifier > 1) {
                        setTimeout(function () {

                            document.getElementById("pokemon-attack-text").textContent = "It was super effective"
                            console.log(currentPokemon + " did super effective damage against " + enemyPokemon.name);
                        }, 4000)

                    }

                    // EFFECTIVE
                    else if (typeModifier == 1) {

                        setTimeout(function () {
                            console.log(currentPokemon + " did normal damage against " + enemyPokemon.name);
                        }, 4000)
                    }

                    else if (typeModifier == 0) {
                        setTimeout(function () {
                            document.getElementById("pokemon-attack-text").textContent = "There was no effect!"
                        }, 4000)
                    }

                    // NOT VERY EFFECTIVE
                    else if (typeModifier < 1) {
                        setTimeout(function () {
                            document.getElementById("pokemon-attack-text").textContent = "It wasn't very effective..."
                            console.log(currentPokemon + " was not very effective " + enemyPokemon.name)
                        }, 4000)
                    }



                    //===========END TESTING=============//
                }
            }

            // IF ACCURACY IS NULL, THE MOVE WILL ALWAYS HIT //
            else {

                // CHECKS TO SEE WHAT TYPE OF MOVE THE MOVE IS //
                damageMoves(move, currentPokemon, enemyPokemon, damage);
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;

                //===========FOR TESTING=============//

                // SUPER EFFECTIVE
                if (typeModifier > 1) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "It was super effective"
                    }, 4000)
                    console.log(currentPokemon + " did super effective damage against " + enemyPokemon.name);
                }

                // EFFECTIVE
                else if (typeModifier == 1) {
                    console.log(currentPokemon + " did normal damage against " + enemyPokemon.name);
                    setTimeout(function () {

                    }, 4000)
                }

                else if (typeModifier == 0) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "There was no effect!"
                    }, 4000)
                }

                // NOT VERY EFFECTIVE
                else if (typeModifier < 1) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "It wasn't very effective..."
                    }, 4000)
                    console.log(currentPokemon + " was not very effective " + enemyPokemon.name)
                }

                //===========END TESTING=============//
            }
        }


        ///////////////////////////////////
        // === SPECIAL ATTACK DAMAGE === //
        ///////////////////////////////////
        else if (specialAttack == true && skipTurn == false) {

            // MAKES ATTACK AND DEFENSE POWER SPECIALS
            attackPower = currentPokemon.special_attack * currentPokemon.special_attack_multiplier; // MULTIPLY BY THE SPECIAL ATTACK STAGE FOR STAT MOVES
            defensePower = currentPokemon.special_defense * enemyPokemon.special_defense_multiplier;    // MULTIPLY BY THE SPECIAL DEFENSE STAGE FOR STAT MOVES

            //                                  CALCULATE DAMAGE
            /*///////////////////////////////////////////////////////////////////////////////////////////////
            //                                                                                             //
            //    Damage = ( ((((2 * Level) / 5) * Power * Attack / Defense) / 50) + 2) * Modifier         //
            //                                                                                             //
            //    Modifier = Critical * random * STAB * TypeModifier * Burn                                //
            //                                                                                             //
            //    random = random number between 0.85 and 1.00                                             //
            //                                                                                             //
            //    burn is 0.5 if the attacker is burned and used a physical move, otherwise it's 1         //
            //                                                                                             //
            *////////////////////////////////////////////////////////////////////////////////////////////////
            var calculatedDamage = (((((2 * 50) / 5) * move.data.power * attackPower / defensePower) / 50) + 2) * modifier;

            // ROUND DAMAGE TO THE NEAREST INTEGER
            var damage = Math.round(calculatedDamage);

            // === ACCURACY CHECK === //

            // IF MOVE IS NOT A GUARANTEED HIT //
            if (move.data.accuracy != null) {

                // VARIABLE TO STORE MOVE ACCURACY
                var moveAccuracy = move.data.accuracy;

                // RNG FOR MOVE ACCURACY
                var moveRNG = Math.floor(Math.random() * (100 - 1 + 1)) + 1

                // START EVADE STAGE CHECKER
                if (enemyPokemon.evade_stage == 1) {
                    moveAccuracy * 0.66;
                }
                if (enemyPokemon.evade_stage == 2) {
                    moveAccuracy * 0.5;
                }
                if (enemyPokemon.evade_stage == 3) {
                    moveAccuracy * 0.4;
                }
                if (enemyPokemon.evade_stage == 4) {
                    moveAccuracy * 0.33;
                }
                if (enemyPokemon.evade_stage == 5) {
                    moveAccuracy * 0.28;
                }
                if (enemyPokemon.evade_stage == 6) {
                    moveAccuracy * 0.25;
                }
                if (enemyPokemon.evade_stage == -1) {
                    moveAccuracy * 1.5
                }
                if (enemyPokemon.evade_stage == -2) {
                    moveAccuracy * 2;
                }
                if (enemyPokemon.evade_stage == -3) {
                    moveAccuracy * 2.5;
                }
                if (enemyPokemon.evade_stage == -4) {
                    moveAccuracy * 3;
                }
                if (enemyPokemon.evade_stage == -5) {
                    moveAccuracy * 3.5;
                }
                if (enemyPokemon.evade_stage == -6) {
                    moveAccuracy * 4;
                }
                // END EVADE STAGE CHECKER

                // START ACCURACY STAGE CHECKER //
                if (currentPokemon.accuracy_stage == 1) {
                    moveAccuracy * 1.5;
                }
                if (currentPokemon.accuracy_stage == 2) {
                    moveAccuracy * 2;
                }
                if (currentPokemon.accuracy_stage == 3) {
                    moveAccuracy * 2.5;
                }
                if (currentPokemon.accuracy_stage == 4) {
                    moveAccuracy * 3;
                }
                if (currentPokemon.accuracy_stage == 5) {
                    moveAccuracy * 3.5;
                }
                if (currentPokemon.accuracy_stage == 6) {
                    moveAccuracy * 4;
                }
                if (currentPokemon.accuracy_stage == -1) {
                    moveAccuracy * 0.66;
                }
                if (currentPokemon.accuracy_stage == -2) {
                    moveAccuracy * 0.5;
                }
                if (currentPokemon.accuracy_stage == -3) {
                    moveAccuracy * 0.4;
                }
                if (currentPokemon.accuracy_stage == -4) {
                    moveAccuracy * 0.33;
                }
                if (currentPokemon.accuracy_stage == -5) {
                    moveAccuracy * 0.28;
                }
                if (currentPokemon.accuracy_stage == -6) {
                    moveAccuracy * 0.25;
                }
                // END ACCURACY STAGE CHECKER //

                // MOVE MISSES
                if (moveRNG > moveAccuracy) {
                    //=====================//
                    //     NEED TO ADD     //
                    //=====================//
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name + ", but it missed!"
                }

                // MOVE HITS
                else if (moveRNG <= moveAccuracy) {

                    // CHECKS TO SEE WHAT TYPE OF MOVE THE MOVE IS //
                    damageMoves(move, currentPokemon, enemyPokemon, damage);
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;
                    //===========FOR TESTING=============//

                    // SUPER EFFECTIVE
                    if (typeModifier > 1) {
                        setTimeout(function () {
                            document.getElementById("pokemon-attack-text").textContent = "It was super effective"
                        }, 4000)
                        console.log(currentPokemon + " did super effective damage against " + enemyPokemon.name);
                    }

                    // EFFECTIVE
                    else if (typeModifier == 1) {
                        console.log(currentPokemon + " did normal damage against " + enemyPokemon.name);
                        setTimeout(function () {

                        }, 4000)
                    }

                    else if (typeModifier == 0) {
                        setTimeout(function () {
                            document.getElementById("pokemon-attack-text").textContent = "There was no effect!"
                        }, 4000)
                    }

                    // NOT VERY EFFECTIVE
                    else if (typeModifier < 1) {
                        setTimeout(function () {
                            document.getElementById("pokemon-attack-text").textContent = "It wasn't very effective..."
                        }, 4000)
                        console.log(currentPokemon + " was not very effective " + enemyPokemon.name)
                    }

                    //===========END TESTING=============//
                }
            }

            // IF ACCURACY IS NULL, THE MOVE WILL ALWAYS HIT //
            else {

                // CHECKS TO SEE WHAT TYPE OF MOVE THE MOVE IS //
                damageMoves(move, currentPokemon, enemyPokemon, damage);
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;

                //===========FOR TESTING=============//

                // SUPER EFFECTIVE
                if (typeModifier > 1) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "It was super effective"
                    }, 4000)
                    console.log(currentPokemon + " did super effective damage against " + enemyPokemon.name);
                }

                // EFFECTIVE
                else if (typeModifier == 1) {
                    console.log(currentPokemon + " did normal damage against " + enemyPokemon.name);
                    setTimeout(function () {

                    }, 4000)
                }

                else if (typeModifier == 0) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "There was no effect!"
                    }, 4000)
                }

                // NOT VERY EFFECTIVE
                else if (typeModifier < 1) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "It wasn't very effective..."
                    }, 4000)
                    console.log(currentPokemon + " was not very effective " + enemyPokemon.name)
                }

                //===========END TESTING=============//
            }
        }

        ///////////////////////////
        // === STATUS ATTACK === //
        ///////////////////////////
        else if (statusAttack == true && skipTurn == false) {
            // === ACCURACY CHECK === //

            // IF MOVE IS NOT A GUARANTEED HIT //
            if (move.data.accuracy != null) {

                // VARIABLE TO STORE MOVE ACCURACY
                var moveAccuracy = move.data.accuracy;

                // RNG FOR MOVE ACCURACY
                var moveRNG = Math.floor(Math.random() * (100 - 1 + 1)) + 1

                // START EVADE STAGE CHECKER
                if (enemyPokemon.evade_stage == 1) {
                    moveAccuracy * 0.66;
                }
                if (enemyPokemon.evade_stage == 2) {
                    moveAccuracy * 0.5;
                }
                if (enemyPokemon.evade_stage == 3) {
                    moveAccuracy * 0.4;
                }
                if (enemyPokemon.evade_stage == 4) {
                    moveAccuracy * 0.33;
                }
                if (enemyPokemon.evade_stage == 5) {
                    moveAccuracy * 0.28;
                }
                if (enemyPokemon.evade_stage == 6) {
                    moveAccuracy * 0.25;
                }
                if (enemyPokemon.evade_stage == -1) {
                    moveAccuracy * 1.5
                }
                if (enemyPokemon.evade_stage == -2) {
                    moveAccuracy * 2;
                }
                if (enemyPokemon.evade_stage == -3) {
                    moveAccuracy * 2.5;
                }
                if (enemyPokemon.evade_stage == -4) {
                    moveAccuracy * 3;
                }
                if (enemyPokemon.evade_stage == -5) {
                    moveAccuracy * 3.5;
                }
                if (enemyPokemon.evade_stage == -6) {
                    moveAccuracy * 4;
                }
                // END EVADE STAGE CHECKER

                // START ACCURACY STAGE CHECKER //
                if (currentPokemon.accuracy_stage == 1) {
                    moveAccuracy * 1.5;
                }
                if (currentPokemon.accuracy_stage == 2) {
                    moveAccuracy * 2;
                }
                if (currentPokemon.accuracy_stage == 3) {
                    moveAccuracy * 2.5;
                }
                if (currentPokemon.accuracy_stage == 4) {
                    moveAccuracy * 3;
                }
                if (currentPokemon.accuracy_stage == 5) {
                    moveAccuracy * 3.5;
                }
                if (currentPokemon.accuracy_stage == 6) {
                    moveAccuracy * 4;
                }
                if (currentPokemon.accuracy_stage == -1) {
                    moveAccuracy * 0.66;
                }
                if (currentPokemon.accuracy_stage == -2) {
                    moveAccuracy * 0.5;
                }
                if (currentPokemon.accuracy_stage == -3) {
                    moveAccuracy * 0.4;
                }
                if (currentPokemon.accuracy_stage == -4) {
                    moveAccuracy * 0.33;
                }
                if (currentPokemon.accuracy_stage == -5) {
                    moveAccuracy * 0.28;
                }
                if (currentPokemon.accuracy_stage == -6) {
                    moveAccuracy * 0.25;
                }


                // END ACCURACY STAGE CHECKER //

                // MOVE MISSES
                if (moveRNG > moveAccuracy) {
                    //=====================//
                    //     NEED TO ADD     //
                    //=====================//
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name + ", but it missed!"

                }

                // MOVE HITS
                else if (moveRNG <= moveAccuracy) {

                    // MAKES SURE THERE IS A STAT CHANGE //
                    if (move.data.stat_changes != [] || move.data.stat_changes != null) {
                        var statArray = move.data.stat_changes
                        // CHECK TO SEE TYPE OF STATUS MOVE //
                        statusMoves(move, currentPokemon, enemyPokemon);
                        document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;
                      
                    }
                }
            }
            // IF ACCURACY IS NULL, THE MOVE WILL ALWAYS HIT //
            else {
                // MAKES SURE THERE IS A STAT CHANGE //
                if (move.data.stat_changes != [] || move.data.stat_changes != null) {
                    var statArray = move.data.stat_changes
                    // CHECK TO SEE TYPE OF STATUS MOVE //
                    statusMoves(move, currentPokemon, enemyPokemon);
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;
                }
            }
        }
    }



    var randomizePokemon2 = function () {
        var healthRNG2 = Math.random() * (3.377 - 2.333) + 2.333;
        var attackRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
        var specialAttackRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
        var defenseRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
        var specialDefenseRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
        var speedRNG2 = Math.random() * (2.265 - 0.979) + 0.979;

        trainer2[0].maxHealth = Math.round(trainer2[0].maxHealth * healthRNG2);
        trainer2[0].currentHealth = Math.round(trainer2[0].currentHealth * healthRNG2);
        trainer2[0].attack = Math.round(trainer2[0].attack * attackRNG2);
        trainer2[0].special_attack = Math.round(trainer2[0].special_attack * specialAttackRNG2);
        trainer2[0].defense = Math.round(trainer2[0].defense * defenseRNG2);
        trainer2[0].special_defense = Math.round(trainer2[0].special_defense * specialDefenseRNG2);
        trainer2[0].speed = Math.round(trainer2[0].speed * speedRNG2);
    }

    var randomizePokemon1 = function () {
        var healthRNG1 = Math.random() * (3.377 - 2.333) + 2.333;
        var attackRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
        var specialAttackRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
        var defenseRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
        var specialDefenseRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
        var speedRNG1 = Math.random() * (2.265 - 0.979) + 0.979;

        trainer1[0].maxHealth = Math.round(trainer1[0].maxHealth * healthRNG1);
        trainer1[0].currentHealth = Math.round(trainer1[0].currentHealth * healthRNG1);
        trainer1[0].attack = Math.round(trainer1[0].attack * attackRNG1);
        trainer1[0].special_attack = Math.round(trainer1[0].special_attack * specialAttackRNG1);
        trainer1[0].defense = Math.round(trainer1[0].defense * defenseRNG1);
        trainer1[0].special_defense = Math.round(trainer1[0].special_defense * specialDefenseRNG1);
        trainer1[0].speed = Math.round(trainer1[0].speed * speedRNG1);
    }

    // ========= DELCARING AND RANDOMIZING STATS ============ //
    var trainer1 = pokemonService.getTrainer1();
    var trainer2 = pokemonService.getTrainer2();

    $scope.trainer1img = pokemonService.getTrainer1Img();
    $scope.trainer2img = pokemonService.getTrainer2Img();
    
    if (trainer1.length == 0) {
        trainer1 = [
            {
                "name": "?",
                "currentHealth": 1,
                "maxHealth": 1,
                "attack": 1,
                "special_attack": 1,
                "defense": 1,
                "special_defense": 1,
                "speed": 1,
                "types": [
                    {
                        "slot": 1,
                        "type": {
                            "url": "https://pokeapi.co/api/v2/type/1",
                            "name": "normal"
                        }
                    }
                ],
                "moves": [
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    },
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    },
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    },
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    }
                ],
                "health_stage": 0,
                "attack_stage": 0,
                "special_attack_stage": 0,
                "defense_stage": 0,
                "special_defense_stage": 0,
                "speed_stage": 0,
                "evade_stage": 0,
                "accuracy_stage": 0,
                "is_burned": false,
                "is_frozen": false,
                "is_paralyzed": false,
                "is_poisoned": false,
                "is_sleeping": false,
                "is_confused": false,
                "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
                "back_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png",
                "health_multiplier": 1,
                "attack_multiplier": 1,
                "special_attack_multiplier": 1,
                "defense_multiplier": 1,
                "special_defense_multiplier": 1,
                "speed_multiplier": 1
            }
        ]
        
    }




    if (trainer2.length == 0) {
        trainer2 = [
            {
                "name": "?",
                "currentHealth": 1,
                "maxHealth": 1,
                "attack": 1,
                "special_attack": 1,
                "defense": 1,
                "special_defense": 1,
                "speed": 1,
                "types": [
                    {
                        "slot": 1,
                        "type": {
                            "url": "https://pokeapi.co/api/v2/type/1",
                            "name": "normal"
                        }
                    }
                ],
                "moves": [
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    },
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    },
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    },
                    {
                        "name": "pound",
                        "url": "https://pokeapi.co/api/v2/move/1/"
                    }
                ],
                "health_stage": 0,
                "attack_stage": 0,
                "special_attack_stage": 0,
                "defense_stage": 0,
                "special_defense_stage": 0,
                "speed_stage": 0,
                "evade_stage": 0,
                "accuracy_stage": 0,
                "is_burned": false,
                "is_frozen": false,
                "is_paralyzed": false,
                "is_poisoned": false,
                "is_sleeping": false,
                "is_confused": false,
                "front_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
                "back_img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png",
                "health_multiplier": 1,
                "attack_multiplier": 1,
                "special_attack_multiplier": 1,
                "defense_multiplier": 1,
                "special_defense_multiplier": 1,
                "speed_multiplier": 1
            }
        ]
    }

    console.log(trainer1)
    console.log(trainer2)

    // POKEMON 1 STAT RNG //
    var healthRNG1 = Math.random() * (3.377 - 2.333) + 2.333;
    var attackRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
    var specialAttackRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
    var defenseRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
    var specialDefenseRNG1 = Math.random() * (2.265 - 0.979) + 0.979;
    var speedRNG1 = Math.random() * (2.265 - 0.979) + 0.979;

    trainer1[0].maxHealth = Math.round(trainer1[0].maxHealth * healthRNG1);
    trainer1[0].currentHealth = Math.round(trainer1[0].currentHealth * healthRNG1);
    trainer1[0].attack = Math.round(trainer1[0].attack * attackRNG1);
    trainer1[0].special_attack = Math.round(trainer1[0].special_attack * specialAttackRNG1);
    trainer1[0].defense = Math.round(trainer1[0].defense * defenseRNG1);
    trainer1[0].special_defense = Math.round(trainer1[0].special_defense * specialDefenseRNG1);
    trainer1[0].speed = Math.round(trainer1[0].speed * speedRNG1);



    // POKEMON 2 STAT RNG //
    var healthRNG2 = Math.random() * (3.377 - 2.333) + 2.333;
    var attackRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
    var specialAttackRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
    var defenseRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
    var specialDefenseRNG2 = Math.random() * (2.265 - 0.979) + 0.979;
    var speedRNG2 = Math.random() * (2.265 - 0.979) + 0.979;

    trainer2[0].maxHealth = Math.round(trainer2[0].maxHealth * healthRNG2);
    trainer2[0].currentHealth = Math.round(trainer2[0].currentHealth * healthRNG2);
    trainer2[0].attack = Math.round(trainer2[0].attack * attackRNG2);
    trainer2[0].special_attack = Math.round(trainer2[0].special_attack * specialAttackRNG2);
    trainer2[0].defense = Math.round(trainer2[0].defense * defenseRNG2);
    trainer2[0].special_defense = Math.round(trainer2[0].special_defense * specialDefenseRNG2);
    trainer2[0].speed = Math.round(trainer2[0].speed * speedRNG2);




    var pokemon1 = trainer1[0];
    var pokemon2 = trainer2[0];


    var selectedMove1;
    var selectedMove2;
    // $http.get("https://pokeapi.co/api/v2/move/1/").then(function(response) {
    //     console.log(response)
    //     selectedMove1 = response;
    //     battleFunction(selectedMove1, pokemon1, pokemon2);
    //     console.log(pokemon1);
    //     console.log(pokemon2);

    //     $http.get("https://pokeapi.co/api/v2/move/fire-punch/").then(function (response) {
    //             selectedMove2 = response;
    //             battleFunction(selectedMove2, pokemon2, pokemon1)
    //             console.log(pokemon1);
    //             console.log(pokemon2);
    //         })

    // })

    // Pokemon 1 $scope moves
    $scope.pokemon1move1 = pokemon1.moves[0]
    $scope.pokemon1move2 = pokemon1.moves[1]
    $scope.pokemon1move3 = pokemon1.moves[2]
    $scope.pokemon1move4 = pokemon1.moves[3]

    // Pokemon 2 $scope moves
    $scope.pokemon2move1 = pokemon2.moves[0]
    $scope.pokemon2move2 = pokemon2.moves[1]
    $scope.pokemon2move3 = pokemon2.moves[2]
    $scope.pokemon2move4 = pokemon2.moves[3]

    // Pokemon 1 Scope
    $scope.pokemon1 = pokemon1;

    // Pokemon 2 Scope
    $scope.pokemon2 = pokemon2



    $scope.pokemon1MoveSelect = function (url) {
        $http.get(url).then(function (response) {
            selectedMove1 = response
            console.log(pokemon1.name + " selected the move: " + selectedMove1.data.names[2].name)
            pokemon1SelectedMove = true;
            if (pokemon1SelectedMove == true && pokemon2SelectedMove == true) {
                console.log("test")
                $scope.showFightButton = true;
            }

        })
    }

    $scope.pokemon2MoveSelect = function (url) {
        $http.get(url).then(function (response) {
            selectedMove2 = response
            console.log(selectedMove2.data.names)
            console.log(pokemon2.name + " selected the move: " + selectedMove2.data.names[2].name)
            pokemon2SelectedMove = true;
            console.log(pokemon2SelectedMove)
            if (pokemon1SelectedMove == true && pokemon2SelectedMove == true) {
                console.log("test")
                $scope.showFightButton = true;
            }
        })
    }



    // == START FIGHTING == //
    $scope.startFight = function () {
        document.getElementById("pokemon2").classList.remove("tada");
        document.getElementById("pokemon1").classList.remove("shake");
        document.getElementById("pokemon1").classList.remove("tada");
        document.getElementById("pokemon2").classList.remove("shake");
        $scope.showFightButton = false;
        $scope.showBattleButtons = false;
        document.getElementById("pokemon-attack-box").classList.add("zoomIn");
        // If pokemon 1 is faster than pokemon 2
        if ((pokemon1.speed * pokemon1.speed_multiplier) > (pokemon2.speed * pokemon2.speed_multiplier)) {
            console.log("Pokemon 1 is faster than Pokemon 2")
            $scope.showFightButton = false;
            if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                checkStatStages(pokemon1);
                checkStatStages(pokemon2);
                document.getElementById("pokemon1").classList.add("tada");
                document.getElementById("pokemon2").classList.add("shake");
                battleFunction(selectedMove1, pokemon1, pokemon2);
                moveHealthBar2();
                moveHealthBar1();
                $timeout(function () {
                    document.getElementById("pokemon1").classList.remove("tada");
                    document.getElementById("pokemon2").classList.remove("shake");
                    if (pokemon2.currentHealth > 0) {
                        checkStatStages(pokemon1);
                        checkStatStages(pokemon2);

                        battleFunction(selectedMove2, pokemon2, pokemon1);
                        $timeout(function () {
                            document.getElementById("pokemon2").classList.add("tada");
                            document.getElementById("pokemon1").classList.add("shake");

                            statusMoveChecks(pokemon1)
                            statusMoveChecks(pokemon2)
                            moveHealthBar1();
                            moveHealthBar2();
                            console.log(pokemon1)
                            console.log(pokemon2)
                        }), 1000
                    }

                }, 9000)

            }
        }


        // If pokemon 1 is slower than pokemon 2
        else if ((pokemon1.speed * pokemon1.speed_multiplier) < (pokemon2.speed * pokemon2.speed_multiplier)) {
            console.log("Pokemon 1 is slower than Pokemon 2")
            $scope.showFightButton = false;
            if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                checkStatStages(pokemon1);
                checkStatStages(pokemon2);
                document.getElementById("pokemon2").classList.add("tada");
                document.getElementById("pokemon1").classList.add("shake");
                battleFunction(selectedMove2, pokemon2, pokemon1);
                showStatusOnView();
                moveHealthBar1();
                moveHealthBar2();
                $timeout(function () {
                    document.getElementById("pokemon2").classList.remove("tada");
                    document.getElementById("pokemon1").classList.remove("shake");
                    if (pokemon1.currentHealth > 0) {
                        checkStatStages(pokemon1);
                        checkStatStages(pokemon2);

                        battleFunction(selectedMove1, pokemon1, pokemon2);
                        showStatusOnView();
                        $timeout(function () {
                            document.getElementById("pokemon1").classList.add("tada");
                            document.getElementById("pokemon2").classList.add("shake");
                            statusMoveChecks(pokemon1)
                            statusMoveChecks(pokemon2)
                            moveHealthBar2();
                            moveHealthBar1();
                            console.log(pokemon1)
                            console.log(pokemon2)
                        }), 1000
                    }
                }, 9000)
            }
        }
        // If pokemon 1 and pokemon 2 have the same speed
        else {
            console.log("RNG")
            $scope.showFightButton = false;
            var speedTie = Math.random()
            if (speedTie > 0.5) {
                if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                    checkStatStages(pokemon1);
                    checkStatStages(pokemon2);
                    battleFunction(selectedMove1, pokemon1, pokemon2);
                    document.getElementById("pokemon1").classList.add("tada");
                    document.getElementById("pokemon2").classList.add("shake");
                    showStatusOnView();
                    moveHealthBar2();
                    moveHealthBar1();
                    $timeout(function () {
                        document.getElementById("pokemon1").classList.remove("tada");
                        document.getElementById("pokemon2").classList.remove("shake");
                        if (pokemon2.currentHealth > 0) {
                            checkStatStages(pokemon1);
                            checkStatStages(pokemon2);
                            battleFunction(selectedMove2, pokemon2, pokemon1);
                            showStatusOnView();
                            $timeout(function () {
                                document.getElementById("pokemon2").classList.add("tada");
                                document.getElementById("pokemon1").classList.add("shake");
                                statusMoveChecks(pokemon1)
                                statusMoveChecks(pokemon2)
                                moveHealthBar1();
                                moveHealthBar2();
                                console.log(pokemon1)
                                console.log(pokemon2)
                            }), 1000
                        }

                    }, 9000)

                }

            }
            else {
                $scope.showFightButton = false;
                if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                    checkStatStages(pokemon1);
                    checkStatStages(pokemon2);
                    document.getElementById("pokemon2").classList.add("tada");
                    document.getElementById("pokemon1").classList.add("shake");
                    battleFunction(selectedMove2, pokemon2, pokemon1);
                    showStatusOnView();
                    moveHealthBar1();
                    moveHealthBar2();
                    $timeout(function () {
                        document.getElementById("pokemon2").classList.remove("tada");
                        document.getElementById("pokemon1").classList.remove("shake");
                        if (pokemon1.currentHealth > 0) {
                            checkStatStages(pokemon1);
                            checkStatStages(pokemon2);

                            battleFunction(selectedMove1, pokemon1, pokemon2);
                            showStatusOnView();
                            $timeout(function () {
                                document.getElementById("pokemon1").classList.add("tada");
                                document.getElementById("pokemon2").classList.add("shake");
                                statusMoveChecks(pokemon1)
                                statusMoveChecks(pokemon2)
                                moveHealthBar2();
                                moveHealthBar1();
                                console.log(pokemon1)
                                console.log(pokemon2)

                            }), 1000
                        }

                    }, 9000)


                }
            }
        }
        $timeout(function () {
            $scope.showFightButton = true;
            $scope.showBattleButtons = true;
            pokemon1SelectedMove = false;
            pokemon2SelectedMove = false;
            document.getElementById("pokemon-attack-box").classList.remove("zoomIn");
            if (pokemon1.currentHealth <= 0) {
                trainer1.shift();
                console.log(trainer1)
                if (trainer1.length <= 0) {
                    trainer1 = [];
                    trainer2 = [];
                    $state.go("trainer2Wins")
                }
                else {
                    pokemon1 = trainer1[0]
                    randomizePokemon1();
                    $scope.pokemon1 = pokemon1;
                    $scope.pokemon1move1 = pokemon1.moves[0]
                    $scope.pokemon1move2 = pokemon1.moves[1]
                    $scope.pokemon1move3 = pokemon1.moves[2]
                    $scope.pokemon1move4 = pokemon1.moves[3]
                    moveHealthBar1();
                }
            }
            if (pokemon2.currentHealth <= 0) {
                trainer2.shift();
                console.log(trainer2)
                if (trainer2.length <= 0) {
                    trainer1 = [];
                    trainer2 = [];
                    $state.go("trainer1Wins")
                }
                else {
                    pokemon2 = trainer2[0]
                    randomizePokemon2();
                    $scope.pokemon2 = pokemon2;
                    $scope.pokemon2move1 = pokemon2.moves[0]
                    $scope.pokemon2move2 = pokemon2.moves[1]
                    $scope.pokemon2move3 = pokemon2.moves[2]
                    $scope.pokemon2move4 = pokemon2.moves[3]
                    moveHealthBar2();
                }


            }
        }, 18000)

    }

    $scope.pokemon2CurrentHealth = pokemon2.maxHealth;
    $scope.pokemon1CurrentHealth = pokemon2.maxHealth;

    function moveHealthBar2() {
        var elem = document.getElementById("pokemon2Bar");
        var width = 100

        // var id = setInterval(frame, 10);
        while (width >= ((pokemon2.currentHealth / pokemon2.maxHealth) * 100)) {
            width--;
            elem.style.width = width + "%";
            if (width >= 50) {
                elem.classList.add("progress-bar-success");
            }
            if (width < 50 && width > 21) {
                elem.classList.add("progress-bar-warning");
                elem.classList.remove("progress-bar-success");
            }
            if (width < 21) {
                elem.classList.add("progress-bar-danger");
                elem.classList.remove("progress-bar-warning");
            }
        }
    }

    function moveHealthBar1() {
        var elem = document.getElementById("pokemon1Bar");
        var width = 100

        // var id = setInterval(frame, 10);
        while (width >= ((pokemon1.currentHealth / pokemon1.maxHealth) * 100)) {
            width--;
            elem.style.width = width + "%";
            if (width >= 50) {
                elem.classList.add("progress-bar-success");
                elem.classList.remove("progress-bar-danger");
            }
            if (width < 50 && width > 21) {
                elem.classList.add("progress-bar-warning");
                elem.classList.remove("progress-bar-success");
            }
            if (width < 21) {
                elem.classList.add("progress-bar-danger");
                elem.classList.remove("progress-bar-warning");
            }
        }

    }

    $scope.whatWillPokemon1Do = "What will " + pokemon1.name + " do?";
    $scope.whatWillPokemon2Do = "What will " + pokemon2.name + " do?";









    var showAnimation1 = function (move) {
        moveType = move.data.type.name;
        if (moveType == "fire") {
            $scope.showFire1 = true;
            $timeout(function () {
                $scope.showFire1 = false;
            }, 3000)
        }
        else if (moveType == "water") {
            $scope.showWater1 = true;
            $timeout(function () {
                $scope.showWater1 = false;
            }, 3000)
        }
        else if (moveType == "dark" || moveType == "psychic") {
            $scope.showPsychic1 = true;
            $timeout(function () {
                $scope.showPsychic1 = false;
            }, 3000)
        }
        else if (moveType == "electric") {
            $scope.showElectric1 = true;
            $timeout(function () {
                $scope.showElectric1 = false;
            }, 3000)
        }
        else if (moveType == "rock" || moveType == "ground") {
            $scope.showRock1 = true;
            $timeout(function () {
                $scope.showRock1 = false;
            }, 3000)
        }
        else if (moveType == "ice") {
            $scope.showIce1 = true;
            $timeout(function () {
                $scope.showIce1 = false;
            }, 3000)
        }
        else {
            $scope.showDefaultAttack1 = true;
            document.getElementById("pokemon1").classList.add("defaultAttack1");
            $timeout(function () {
                $scope.showDefaultAttack1 = false;
                document.getElementById("pokemon1").classList.remove("defaultAttack1");
            }, 3000)
        }
    }



    var showStatusOnView = function () {
        if (pokemon1.is_asleep == true) {
            $scope.show_sleep_1 = true;
        }
        if (pokemon1.is_poisoned == true) {
            $scope.show_poison_1 = true;
        }
        if (pokemon1.is_frozen == true) {
            $scope.show_frozen_1 = true;
        }
        if (pokemon1.is_paralyzed == true) {
            $scope.show_paralyzed_1 = true;
        }
        if (pokemon1.is_burned == true) {
            $scope.show_burned_1 = true;
        }
        if (pokemon2.is_asleep == true) {
            $scope.show_sleep_2 = true;
        }
        if (pokemon2.is_poisoned == true) {
            $scope.show_poison_2 = true;
        }
        if (pokemon2.is_frozen == true) {
            $scope.show_frozen_2 = true;
        }
        if (pokemon2.is_paralyzed == true) {
            $scope.show_paralyzed_2 = true;
        }
        if (pokemon2.is_burned == true) {
            $scope.show_burned_2 = true;
        }
    }







})







    // STRETCH GOALS
    // var stretchGoals = function () {
    //     // Inflicts damage; absorbs damage done to heal the user
    //     if (move.data.meta.category.name == "damage+heal") {
    //         // Calculate Power
    //         var healSteal = move.data.meta.drain / 100;
    //         // Make function that takes the calculated power and multiplies it by healSteal, then add that number to the currentHealth of the pokemon
    //     }

    //     // One hit KO
    //     else if (move.data.meta.category.name == "ohko") {
    //         // Make a function that one shots the enemy pokemon.
    //     }

    //     // Effect on the whole field // === STRETCH GOAL === //
    //     else if (move.data.meta.category.name == "whole-field-effect") {

    //     }

    //     // Effect on one side of the field // === STRETCH GOAL === //
    //     else if (move.data.meta.category.name == "field-effect") {

    //     }

    //     // Forces target to switch out // === STRETCH GOAL === //
    //     else if (move.data.meta.category.name == "force-switch") {

    //     }

    //     // Unique Effect // === STRETCH GOAL === //
    //     else if (move.data.meta.category.name == "unique") {

    //     }
    // }
