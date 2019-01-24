app.controller("battleCPUController", function ($scope, $state, $http, $timeout, pokemonService) {

    /**
     * Adding the background.
     */
    document.getElementById("body").classList.add("selection-background");

    /**
     * Back sprite for trainer 1
     */
    $scope.trainer1_back_img = pokemonService.getTrainer1ImgBack();

    /**
     * Creating the booleans that check the state of the selected moves.
     * Defaulting them to false so the battle doesn't start with no moves selected.
     */
    var pokemon1SelectedMove = false;
    var pokemon2SelectedMove = false;

    /**
     * Scope booleans for the status of Pokemon1.
     */
    $scope.show_sleep_1 = false;
    $scope.show_poison_1 = false;
    $scope.show_frozen_1 = false;
    $scope.show_paralyzed_1 = false;
    $scope.show_burned_1 = false;

    /**
     * Scope booleans for the status of Pokemon2.
     */
    $scope.show_sleep_2 = false;
    $scope.show_poison_2 = false;
    $scope.show_frozen_2 = false;
    $scope.show_paralyzed_2 = false;
    $scope.show_burned_2 = false;

    /**
     * Booleans that check the type of move used (used in the damage calculator).
     */
    var physicalAttack = false;
    var specialAttack = false;
    var statusAttack = false;

    /**
     * Status Ailment Timers
     */
    var sleepCount = 0;
    var freezeCount = 0;

    /**
     * Used in the damageMoves method
     */
    var beforeCurrentHealth;

    /**
     * Scope booleans that alternate the Start_Fight_Button and the Select_Moves_Buttons.
     */
    $scope.showFightButton = false;
    $scope.showBattleButtons = true;

    /**
     * Doubles and Integers for the damage calculator.
     * 
     * The typeModifier defaults to 1 (neutral damage) and changes in the calculateType method.
     * The STAB (Same Type Attack Bonus) defaults at 1 and goes to 1.5 if active.
     * The critModifier defaults to 1 and changes when a pokemon rolls a critical hit.
     * The flinchChance defaults to 0 and changes if a move has a possible chance to flinch.
     * The statusChance defaults to 0 and changes if a move has a possible chance to   inflict a status ailment.
     * The damageRoll defaults to 0.85 and alternates between 0.85 and 1 depending the the damage roll. 
     */
    var typeModifier = 1;
    var STAB = 1;
    var critModifier = 1;
    var flinchChance = 0;
    var statusChance = 0;
    var damageRoll = 0.85;

    /**
     * Calculate the type method.
     * Calculates the typeModifier.
     * @param moveType is type from the attacking move.
     * @param enemyType1 is the opponent's first type.
     * @param enemyType2 is the opponent's secondary type.
     */
    var calculateType = function (moveType, enemyType1, enemyType2) {
        // Resetting the typeModifier back to 1, just in case it isn't already.
        typeModifier = 1;

        /**
         * If statements start here, they change the typeModifier depending on the move type.
         * Example:
         * if (moveType == (name of type)
         * {
         *     switch (enemyType1)
         *     {
         *          case "name of type":
         *              typeModifier = typeModifier * (double that changes the modifier);
         *              break;
         *     }
         *     switch (enemyType2)
         *     {
         *          case "name of type":
         *              typeModifier = typeModifier * (double that changes the modifier);
         *              break;
         *     }
         * }
         */
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

    /**
     * The statusMoveChecks method.
     * Checks the status of the pokemon and depletes the pokemon's health if true.
     * @param pokemon the pokemon that is being status checked.
     */
    var statusMoveChecks = function (pokemon) {
        if (pokemon.is_poisoned == true || pokemon.is_burned == true) {
            pokemon.currentHealth = pokemon.currentHealth - Math.round(pokemon.maxHealth / 8);
            moveHealthBar1();
            moveHealthBar2();
        }
    }

    /**
     * The checkMoveClass method.
     * Checks the move's class (physical, special, or status).
     * @param move the move being checked.
     */
    var checkMoveClass = function (move) {
        physicalAttack = false;
        specialAttack = false;
        statusAttack = false;
        if (move.data.damage_class.name == "physical") {
            physicalAttack = true;
        }
        else if (move.data.damage_class.name == "special") {
            specialAttack = true;
        }
        else if (move.data.damage_class.name == "status") {
            statusAttack = true;
        }
    }

    /**
     * The damageMoves method.
     * Checks the move category and inflicts damage based on the category.
     * @param move The attacking move.
     * @param currentPokemon The pokemon that is using the attacking move.
     * @param enemyPokemon The pokemon that is inflicted by the attacking move.
     * @param damage the damage that subtracts from the enemyPokemon's currentHealth.
     */
    var damageMoves = function (move, currentPokemon, enemyPokemon, damage) {
        beforeCurrentHealth = currentPokemon.currentHealth;
        var moveCategory = move.data.meta.category.name;

        // Inflicts Damage, possibly health is drained.
        if (moveCategory == "damage") {
            enemyPokemon.currentHealth -= damage;
            if (move.data.meta.drain != 0) {
                currentPokemon.currentHealth += Math.round((damage * (move.data.meta.drain / 100)));
            }
        }

        // Inflicts Damage, chance to add status ailment
        else if (moveCategory == "damage+ailment") {
            enemyPokemon.currentHealth -= damage;
            var ailmentChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            if (move.data.meta.ailment_chance > ailmentChance) {
                if (enemyPokemon.is_poisoned != true || enemyPokemon.is_burned != true || enemyPokemon.is_frozen != true || enemyPokemon.is_sleeping != true || enemyPokemon.is_paralyzed != true) {
                    switch (move.data.meta.ailment.name) {
                        case "poison":
                            enemyPokemon.is_poisoned = true;
                            break;
                        case "burn":
                            enemyPokemon.is_burned = true;
                            break;
                        case "freeze":
                            enemyPokemon.is_frozen = true;
                            break;
                        case "paralysis":
                            enemyPokemon.is_paralyzed = true;
                            break;
                        case "sleep":
                            enemyPokemon.is_sleeping = true;
                            break;
                    }
                }
                /**
                 * Since confusion and any other status ailment can be active at the same time,
                 * confusion is calculated seperately.
                 */
                if (enemyPokemon.is_confused != true) {
                    if (move.data.meta.ailment.name == "confusion") {
                        enemyPokemon.is_confused = true;
                    }
                }
            }
        }

        // Inflicts damage and lowers the enemy's stats
        else if (moveCategory == "damage+lower") {
            var statArray = move.data.stat_changes;
            enemyPokemon.currentHealth -= damage;
            var statChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            if (move.data.meta.stat.chance > statChance) {
                for (var i = 0; i < statArray.length; i++) {
                    switch (statArray[i].stat.name) {
                        case "attack":
                            enemyPokemon.attack_stage += statArray[i].change;
                            break;
                        case "defense":
                            enemyPokemon.defense_stage += statArray[i].change;
                            break;
                        case "special-attack":
                            enemyPokemon.special_attack_stage += statArray[i].change;
                            break;
                        case "special-defense":
                            enemyPokemon.special_defense_stage += statArray[i].change;
                            break;
                        case "speed":
                            enemyPokemon.speed_stage += statArray[i].change;
                            break;
                        case "evasion":
                            enemyPokemon.evade_stage += statArray[i].change;
                            break;
                        case "accuracy":
                            enemyPokemon.accuracy_stage += statArray[i].change;
                            break;
                    }
                }
            }
        }

        // Inflicts damage and raises the user's stats
        else if (moveCategory == "damage+raise") {
            var statArray = move.data.stat_changes;
            enemyPokemon.currentHealth -= damage;
            var statChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            if (move.data.meta.stat_chance > statChance) {
                for (var i = 0; i < statArray.length; i++) {
                    switch (statArray[i].stat.name) {
                        case "attack":
                            currentPokemon.attack_stage += statArray[i].change;
                            break;
                        case "defense":
                            currentPokemon.defense_stage += statArray[i].change;
                            break;
                        case "special-attack":
                            currentPokemon.special_attack_stage += statArray[i].change;
                            break;
                        case "special-defense":
                            currentPokemon.special_defense_stage += statArray[i].change;
                            break;
                        case "speed":
                            currentPokemon.speed_stage += statArray[i].change;
                            break;
                        case "evasion":
                            currentPokemon.evade_stage += statArray[i].change;
                            break;
                        case "accuracy":
                            currentPokemon.accuracy_stage += statArray[i].change;
                            break;
                    }
                }
            }
        }

        // Inflicts damage and absorbs damage done to heal the user
        else if (moveCategory == "damage+heal") {
            enemyPokemon.currentHealth -= damage;
            var healSteal = move.data.meta.drain / 100;
            currentPokemon.currentHealth += healSteal;
        }
    }

    /**
     * The statusMoves method.
     * Checks the moves category and inflicts the stats/ailments based on the category.
     * @param move The attacking move.
     * @param currentPokemon The pokemon that is using the attacking move.
     * @param enemyPokemon The pokemon that is inflicted by the attacking move.
     */
    var statusMoves = function (move, currentPokemon, enemyPokemon) {
        var statArray = move.data.stat_changes;
        var moveCategory = move.data.meta.category.name;

        // Increases stats of the attacking Pokemon.
        if (moveCategory == "net-good-stats") {
            if (statArray[0].change > 0) {
                for (var i = 0; i < statArray.length; i++) {
                    switch (statArray[i].stat.name) {
                        case "attack":
                            currentPokemon.attack_stage += statArray[i].change;
                            break;
                        case "defense":
                            currentPokemon.defense_stage += statArray[i].change;
                            break;
                        case "special-attack":
                            currentPokemon.special_attack_stage += statArray[i].change;
                            break;
                        case "special-defense":
                            currentPokemon.special_defense_stage += statArray[i].change;
                            break;
                        case "speed":
                            currentPokemon.speed_stage += statArray[i].change;
                            break;
                        case "evasion":
                            currentPokemon.evade_stage += statArray[i].change;
                            break;
                        case "accuracy":
                            currentPokemon.accuracy_stage += statArray[i].change;
                            break;
                    }
                }
            }
            else if (statArray[0].change < 0) {
                for (var i = 0; i < statArray.length; i++) {
                    switch (statArray[i].stat.name) {
                        case "attack":
                            enemyPokemon.attack_stage += statArray[i].change;
                            break;
                        case "defense":
                            enemyPokemon.defense_stage += statArray[i].change;
                            break;
                        case "special-attack":
                            enemyPokemon.special_attack_stage += statArray[i].change;
                            break;
                        case "special-defense":
                            enemyPokemon.special_defense_stage += statArray[i].change;
                            break;
                        case "speed":
                            enemyPokemon.speed_stage += statArray[i].change;
                            break;
                        case "evasion":
                            enemyPokemon.evade_stage += statArray[i].change;
                            break;
                        case "accuracy":
                            enemyPokemon.accuracy_stage += statArray[i].change;
                            break;
                    }
                }
            }
        }

        // Inflicts Confusion and Raises the Target's Attack or Special Attack.
        else if (moveCategory == "swagger") {
            if (enemyPokemon.is_confused != true) {
                enemyPokemon.is_confused = true;
                if (statArray[0].stat.name == "attack") {
                    enemyPokemon.attack_stage += statArray[0].change;
                }
                if (statArray[0].stat.name == "special-attack") {
                    enemyPokemon.special_attack_stage += statArray[0].change;
                }
            }
        }

        // Inflicts Status ailment.
        else if (moveCategory == "ailment") {
            if (enemyPokemon.is_poisoned != true || enemyPokemon.is_burned != true || enemyPokemon.is_frozen != true || enemyPokemon.is_paralyzed != true || enemyPokemon.is_sleeping != true) {
                switch (move.data.meta.ailment.name) {
                    case "poison":
                        enemyPokemon.is_poisoned = true;
                        break;
                    case "burn":
                        enemyPokemon.is_burned = true;
                        break;
                    case "freeze":
                        enemyPokemon.is_frozen = true;
                        break;
                    case "paralysis":
                        enemyPokemon.is_paralyzed = true;
                        break;
                    case "sleep":
                        enemyPokemon.is_sleeping = true;
                        break;
                }
            }
            /**
             * Since confusion and any other status ailment can be active at the same time,
             * confusion is calculated seperately.
            */
            if (enemyPokemon.is_confused != true) {
                if (move.data.meta.ailment.name == "confusion") {
                    enemyPokemon.is_confused = true;
                }
            }
        }
    }


    /**
     * The checkMoveFlinchChance method.
     * Calculates the flinch chance (if there is one).
     * @param move The attacking move.
     * @param enemyPokemon The enemy pokemon that is attacked.
     */
    var checkMoveFlinchChance = function (move, enemyPokemon) {
        var moveFliCh = move.data.meta.flinch_chance;
        if (moveFliCh != 0) {
            flinchChance = Math.floor(Math.random() * (100 - moveFliCh + moveFliCh)) + moveFliCh;
        }
        else {
            flinchChance = 0;
        }
    }

    /**
     * The checkMoveCrit method.
     * Calculates the crit modifier.
     * @param pokemon The attacking pokemon.
     */
    var checkMoveCrit = function (pokemon) {
        var critChance = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
        if (critChance == 1) {
            critModifier = ((2 * 50 + 5) / (50 + 5));
        }
        else {
            critModifier = 1;
        }
    }

    /**
     * The checkRandom method.
     * Calculates the damageRoll.
     */
    var checkRandom = function () {
        damageRoll = Math.random() * (1 - 0.85) + 0.85;
    }

    /**
     * The checkMoveSTAB method.
     * Checks if the Move is the same type as the attacking Pokemon.
     * @param move The attacking move.
     * @param pokemon The attacking pokemon.
     */
    var checkMoveSTAB = function (move, pokemon) {
        // Pushing the move type into a variable
        var moveType = move.data.type.name;

        // Creating an Array for the current pokemon's type(s)
        var pokemonTypes = [];

        // Pushing the pokemon's first type into the array
        pokemonTypes.push(pokemon.types[0]);

        // Checks to see if the pokemon has a secondary type and pushes it into the array.
        if (pokemon.types.length > 1) {
            pokemonTypes.push(pokemon.types[1]);
        }

        if (pokemonTypes.length == 1) {
            if (pokemonTypes[0] == moveType) {
                STAB = 1.5;
            }
        }
        else if (pokemonTypes.length == 2) {
            if (pokemonTypes[0] == moveType) {
                STAB = 1.5;
            }
            else if (pokemonTypes[1] == moveType) {
                STAB = 1.5;
            }
        }
        else {
            STAB = 1;
        }
    }

    /**
     * The checkStatStages method.
     * Checks the stat stages of the current pokemon.
     * @param pokemon The pokemon being checked
     */
    var checkStatStages = function (pokemon) {
        // Calculating the Attack Multiplier.
        if (pokemon.attack_stage != 0) {
            if (pokemon.attack_stage == 1 && pokemon.attack_multiplier != 1.5) {
                pokemon.attack_multiplier = 1.5;
            }
            else if (pokemon.attack_stage == 2 && pokemon.attack_multiplier != 2) {
                pokemon.attack_multiplier = 2;
            }
            else if (pokemon.attack_stage == 3 && pokemon.attack_multiplier != 2.5) {
                pokemon.attack_multiplier = 2.5;
            }
            else if (pokemon.attack_stage == 4 && pokemon.attack_multiplier != 3) {
                pokemon.attack_multiplier = 3;
            }
            else if (pokemon.attack_stage == 5 && pokemon.attack_multiplier != 3.5) {
                pokemon.attack_multiplier = 3.5;
            }
            else if (pokemon.attack_stage == 6 && pokemon.attack_multiplier != 4) {
                pokemon.attack_multiplier = 4;
            }
            else if (pokemon.attack_stage == -1 && pokemon.attack_multiplier != 0.66) {
                pokemon.attack_multiplier = 0.66;
            }
            else if (pokemon.attack_stage == -2 && pokemon.attack_multiplier != 0.5) {
                pokemon.attack_multiplier = 0.5;
            }
            else if (pokemon.attack_stage == -3 && pokemon.attack_multiplier != 0.4) {
                pokemon.attack_multiplier = 0.4;
            }
            else if (pokemon.attack_stage == -4 && pokemon.attack_multiplier != 0.33) {
                pokemon.attack_multiplier = 0.33;
            }
            else if (pokemon.attack_stage == -5 && pokemon.attack_multiplier != 0.28) {
                pokemon.attack_multiplier = 0.28;
            }
            else if (pokemon.attack_stage == -6 && pokemon.attack_multiplier != 0.25) {
                pokemon.attack_multiplier = 0.25;
            }
        }

        // Calculating the Special Attack Multiplier.
        if (pokemon.special_attack_stage != 0) {
            if (pokemon.special_attack_stage == 1 && pokemon.special_attack_multiplier != 1.5) {
                pokemon.special_attack_multiplier = 1.5;
            }
            else if (pokemon.special_attack_stage == 2 && pokemon.special_attack_multiplier != 2) {
                pokemon.special_attack_multiplier = 2;
            }
            else if (pokemon.special_attack_stage == 3 && pokemon.special_attack_multiplier != 2.5) {
                pokemon.special_attack_multiplier = 2.5;
            }
            else if (pokemon.special_attack_stage == 4 && pokemon.special_attack_multiplier != 3) {
                pokemon.special_attack_multiplier = 3;
            }
            else if (pokemon.special_attack_stage == 5 && pokemon.special_attack_multiplier != 3.5) {
                pokemon.special_attack_multiplier = 3.5;
            }
            else if (pokemon.special_attack_stage == 6 && pokemon.special_attack_multiplier != 4) {
                pokemon.special_attack_multiplier = 4;
            }
            else if (pokemon.special_attack_stage == -1 && pokemon.special_attack_multiplier != 0.66) {
                pokemon.special_attack_multiplier = 0.66;
            }
            else if (pokemon.special_attack_stage == -2 && pokemon.special_attack_multiplier != 0.5) {
                pokemon.special_attack_multiplier = 0.5;
            }
            else if (pokemon.special_attack_stage == -3 && pokemon.special_attack_multiplier != 0.4) {
                pokemon.special_attack_multiplier = 0.4;
            }
            else if (pokemon.special_attack_stage == -4 && pokemon.special_attack_multiplier != 0.33) {
                pokemon.special_attack_multiplier = 0.33;
            }
            else if (pokemon.special_attack_stage == -5 && pokemon.special_attack_multiplier != 0.28) {
                pokemon.special_attack_multiplier = 0.28;
            }
            else if (pokemon.special_attack_stage == -6 && pokemon.special_attack_multiplier != 0.25) {
                pokemon.special_attack_multiplier = 0.25;
            }
        }

        // Calculating the Defense Multiplier.
        if (pokemon.defense_stage != 0) {
            if (pokemon.defense_stage == 1 && pokemon.defense_multiplier != 1.5) {
                pokemon.defense_multiplier = 1.5;
            }
            else if (pokemon.defense_stage == 2 && pokemon.defense_multiplier != 2) {
                pokemon.defense_multiplier = 2;
            }
            else if (pokemon.defense_stage == 3 && pokemon.defense_multiplier != 2.5) {
                pokemon.defense_multiplier = 2.5;
            }
            else if (pokemon.defense_stage == 4 && pokemon.defense_multiplier != 3) {
                pokemon.defense_multiplier = 3;
            }
            else if (pokemon.defense_stage == 5 && pokemon.defense_multiplier != 3.5) {
                pokemon.defense_multiplier = 3.5;
            }
            else if (pokemon.defense_stage == 6 && pokemon.defense_multiplier != 4) {
                pokemon.defense_multiplier = 4;
            }
            else if (pokemon.defense_stage == -1 && pokemon.defense_multiplier != 0.66) {
                pokemon.defense_multiplier = 0.66;
            }
            else if (pokemon.defense_stage == -2 && pokemon.defense_multiplier != 0.5) {
                pokemon.defense_multiplier = 0.5;
            }
            else if (pokemon.defense_stage == -3 && pokemon.defense_multiplier != 0.4) {
                pokemon.defense_multiplier = 0.4;
            }
            else if (pokemon.defense_stage == -4 && pokemon.defense_multiplier != 0.33) {
                pokemon.defense_multiplier = 0.33;
            }
            else if (pokemon.defense_stage == -5 && pokemon.defense_multiplier != 0.28) {
                pokemon.defense_multiplier = 0.28;
            }
            else if (pokemon.defense_stage == -6 && pokemon.defense_multiplier != 0.25) {
                pokemon.defense_multiplier = 0.25;
            }
        }

        // Calculating the Special Defense Multiplier.
        if (pokemon.special_defense_stage != 0) {
            if (pokemon.special_defense_stage == 1 && pokemon.special_defense_multiplier != 1.5) {
                pokemon.special_defense_multiplier = 1.5;
            }
            else if (pokemon.special_defense_stage == 2 && pokemon.special_defense_multiplier != 2) {
                pokemon.special_defense_multiplier = 2;
            }
            else if (pokemon.special_defense_stage == 3 && pokemon.special_defense_multiplier != 2.5) {
                pokemon.special_defense_multiplier = 2.5;
            }
            else if (pokemon.special_defense_stage == 4 && pokemon.special_defense_multiplier != 3) {
                pokemon.special_defense_multiplier = 3;
            }
            else if (pokemon.special_defense_stage == 5 && pokemon.special_defense_multiplier != 3.5) {
                pokemon.special_defense_multiplier = 3.5;
            }
            else if (pokemon.special_defense_stage == 6 && pokemon.special_defense_multiplier != 4) {
                pokemon.special_defense_multiplier = 4;
            }
            else if (pokemon.special_defense_stage == -1 && pokemon.special_defense_multiplier != 0.66) {
                pokemon.special_defense_multiplier = 0.66;
            }
            else if (pokemon.special_defense_stage == -2 && pokemon.special_defense_multiplier != 0.5) {
                pokemon.special_defense_multiplier = 0.5;
            }
            else if (pokemon.special_defense_stage == -3 && pokemon.special_defense_multiplier != 0.4) {
                pokemon.special_defense_multiplier = 0.4;
            }
            else if (pokemon.special_defense_stage == -4 && pokemon.special_defense_multiplier != 0.33) {
                pokemon.special_defense_multiplier = 0.33;
            }
            else if (pokemon.special_defense_stage == -5 && pokemon.special_defense_multiplier != 0.28) {
                pokemon.special_defense_multiplier = 0.28;
            }
            else if (pokemon.special_defense_stage == -6 && pokemon.special_defense_multiplier != 0.25) {
                pokemon.special_defense_multiplier = 0.25;
            }
        }

        // Calculating the Speed Multiplier.
        if (pokemon.speed_stage != 0) {
            if (pokemon.speed_stage == 1 && pokemon.speed_multiplier != 1.5) {
                pokemon.speed_multiplier = 1.5;
            }
            else if (pokemon.speed_stage == 2 && pokemon.speed_multiplier != 2) {
                pokemon.speed_multiplier = 2;
            }
            else if (pokemon.speed_stage == 3 && pokemon.speed_multiplier != 2.5) {
                pokemon.speed_multiplier = 2.5;
            }
            else if (pokemon.speed_stage == 4 && pokemon.speed_multiplier != 3) {
                pokemon.speed_multiplier = 3;
            }
            else if (pokemon.speed_stage == 5 && pokemon.speed_multiplier != 3.5) {
                pokemon.speed_multiplier = 3.5;
            }
            else if (pokemon.speed_stage == 6 && pokemon.speed_multiplier != 4) {
                pokemon.speed_multiplier = 4;
            }
            else if (pokemon.speed_stage == -1 && pokemon.speed_multiplier != 0.66) {
                pokemon.speed_multiplier = 0.66;
            }
            else if (pokemon.speed_stage == -2 && pokemon.speed_multiplier != 0.5) {
                pokemon.speed_multiplier = 0.5;
            }
            else if (pokemon.speed_stage == -3 && pokemon.speed_multiplier != 0.4) {
                pokemon.speed_multiplier = 0.4;
            }
            else if (pokemon.speed_stage == -4 && pokemon.speed_multiplier != 0.33) {
                pokemon.speed_multiplier = 0.33;
            }
            else if (pokemon.speed_stage == -5 && pokemon.speed_multiplier != 0.28) {
                pokemon.speed_multiplier = 0.28;
            }
            else if (pokemon.speed_stage == -6 && pokemon.speed_multiplier != 0.25) {
                pokemon.speed_multiplier = 0.25;
            }
        }
    }


    /**
     * The battleFunction method.
     * This is the function that calculates *MOST* of the battle
     * @param move The attacking move.
     * @param currentPokemon The pokemon attacking.
     * @param enemyPokemon The pokemon getting attacked.
     */
    var battleFunction = function (move, currentPokemon, enemyPokemon) {
        var burn = 1;
        checkStatStages(currentPokemon);
        checkStatStages(enemyPokemon);
        checkMoveClass(move);
        checkMoveSTAB(move, currentPokemon);
        checkRandom();
        checkMoveCrit(currentPokemon);

        // Halves the damage of physical moves if the user is burned.
        if (currentPokemon.is_burned == true && physicalAttack == true) {
            burn = 0.5;
        }

        /**
         * Calculating the Type Advantage/Disadvantage for the Move and Enemy Pokemon.
         */
        if (enemyPokemon.types.length > 1) {
            calculateType(move.data.type.name, enemyPokemon.types[0].type.name, enemyPokemon.types[1].type.name);
        }
        else {
            calculateType(move.data.type.name, enemyPokemon.types[0].type.name, null);
        }

        /**
         * Setting the Attack and Defense power to 0 (Default)
         */
        var attackPower = 0;
        var defensePower = 0;

        /**
         * Calculating the modifier used in the Damage Calculation
         */
        var modifier = critModifier * damageRoll * STAB * typeModifier * burn;

        /**
         * Creating the skipTurn boolean used in status ailments check.
         */
        var skipTurn = false;

        /**
         * Checking the Sleep RNG.
         */
        if (currentPokemon.is_sleeping == true) {
            var sleepRNG = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
            if (sleepRNG == 1 && sleepCount < 4) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " continues to sleep!";
                sleepCount++;
                skipTurn = true;
            }
            else {
                currentPokemon.is_sleeping = false;
                skipTurn = false;
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " woke up!";
                sleepCount = 0;
            }
        }

        /**
         * Checking the Paralysis RNG.
         */
        if (currentPokemon.is_paralyzed == true) {
            var paralysisRNG = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            if (paralysisRNG == 1) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " is fully paralyzed!";
                skipTurn = true;
            }
            else {
                skipTurn = false;
            }
        }

        /**
         * Checking the Freeze RNG.
         */
        if (currentPokemon.is_frozen == true) {
            var freezeRNG = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            if (freezeRNG == 2 && freezeCount < 5) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " if frozen solid!";
                skipTurn = true;
                freezeCount++;
            }
            else {
                currentPokemon.is_frozen = false;
                skipTurn = false;
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " thawed out of the ice!";
                freezeCount = 0;
            }
        }

        /**
         * Damage Calculator
         * 
         * Damage = (((((2 * Level) / 5) * Power * Attack / Defense) / 50) + 2) * Modifier
         * 
         * Modifier = Critical * random * STAB * typeModifier * burn
         * 
         * random = A random number between 0.85 and 1.00
         * 
         * burn is 0.5 if the attacker is burned and used a physical move, otherwise it's a 1
         */

        /**
         * Calculating the Physical Attack or Special Attack Damage.
         */
        if (physicalAttack == true && skipTurn == false || specialAttack == true && skipTurn == false) {
            console.log(currentPokemon);
            if (physicalAttack == true) {
                attackPower = currentPokemon.attack * currentPokemon.attack_multiplier;
                defensePower = enemyPokemon.defense * enemyPokemon.defense_multiplier;
            }
            else if (specialAttack == true) {
                attackPower = currentPokemon.special_attack * currentPokemon.special_attack_multiplier;
                defensePower = enemyPokemon.special_defense * enemyPokemon.special_defense_multiplier;
            }

            console.log("Attack Power: " + attackPower);

            var calculatedDamage = (((((2 * 50) / 5) * move.data.power * attackPower / defensePower) / 50) + 2) * modifier;
            var damage = Math.round(calculatedDamage);

            var moveAccuracy = move.data.accuracy;
            var moveRNG = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

            /**
             * Evade Stage Checker.
             */
            switch (enemyPokemon.evade_stage) {
                case 1:
                    moveAccuracy *= 0.66;
                    break;
                case 2:
                    moveAccuracy *= 0.5;
                    break;
                case 3:
                    moveAccuracy *= 0.4;
                    break;
                case 4:
                    moveAccuracy *= 0.33;
                    break;
                case 5:
                    moveAccuracy *= 0.28;
                    break;
                case 6:
                    moveAccuracy *= 0.25;
                    break;
                case -1:
                    moveAccuracy *= 1.5;
                    break;
                case -2:
                    moveAccuracy *= 2;
                    break;
                case -3:
                    moveAccuracy *= 2.5;
                    break;
                case -4:
                    moveAccuracy *= 3;
                    break;
                case -5:
                    moveAccuracy *= 3.5;
                    break;
                case -6:
                    moveAccuracy *= 4;
                    break;
            }
            // Can't have infinite cases.
            if (enemyPokemon.evade_stage > 6) {
                moveAccuracy *= 0.25
            }
            if (enemyPokemon.evade_stage < -6) {
                moveAccuracy *= 4;
            }

            /**
             * Accuracy Stage Checker.
             */
            switch (currentPokemon.accuracy_stage) {
                case 1:
                    moveAccuracy *= 1.5;
                    break;
                case 2:
                    moveAccuracy *= 2;
                    break;
                case 3:
                    moveAccuracy *= 2.5;
                    break;
                case 4:
                    moveAccuracy *= 3;
                    break;
                case 5:
                    moveAccuracy *= 3.5;
                    break;
                case 6:
                    moveAccuracy *= 4;
                    break;
                case -1:
                    moveAccuracy *= 0.66;
                    break;
                case -2:
                    moveAccuracy *= 0.5;
                    break;
                case -3:
                    moveAccuracy *= 0.4;
                    break;
                case -4:
                    moveAccuracy *= 0.33;
                    break;
                case -5:
                    moveAccuracy *= 0.28;
                    break;
                case -6:
                    moveAccuracy *= 0.25;
                    break;
            }
            // Can't have infinite cases.
            if (currentPokemon.accuracy_stage > 6) {
                moveAccuracy *= 4;
            }
            if (currentPokemon.accuracy_stage < -6) {
                moveAccuracy *= 0.25;
            }

            /**
             * The Move Misses.
             */
            if (moveRNG > moveAccuracy && moveAccuracy != null) {
                // Probably need to add something.
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name + ", but it missed!";
            }

            /**
             * This is where the shit truly begings.
             * 
             * The Move Hits.
             */
            else if (moveRNG <= moveAccuracy || moveAccuracy == null) {
                damageMoves(move, currentPokemon, enemyPokemon, damage);
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;

                /**
                 * Move is Super Effective!
                 */
                if (typeModifier > 1) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "It was super effective!";
                        console.log(currentPokemon + " did super effective damage against " + enemyPokemon.name);
                    }, 4000)
                }

                /**
                 * Move is neutral effective.
                 */
                else if (typeModifier == 1) {
                    setTimeout(function () {
                        console.log(currentPokemon.name + " did normal damage against " + enemyPokemon.name);
                    }, 4000)
                }

                /**
                 * Move does no damage.
                 */
                else if (typeModifier == 0) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "There was no effect!";
                    }, 4000)
                }

                /**
                 * Move is not very effective...
                 */
                else if (typeModifier < 1) {
                    setTimeout(function () {
                        document.getElementById("pokemon-attack-text").textContent = "It wasn't very effective...";
                        console.log(currentPokemon.name + " was not very effective " + enemyPokemon.name);
                    }, 4000)
                }
            }
        }

        /**
         * Calculating the Status Attack Stuff.
         */
        else if (statusAttack == true && skipTurn == false) {
            var moveAccuracy = move.data.accuracy;
            var moveRNG = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            /**
            * Evade Stage Checker.
            */
            switch (enemyPokemon.evade_stage) {
                case 1:
                    moveAccuracy *= 0.66;
                    break;
                case 2:
                    moveAccuracy *= 0.5;
                    break;
                case 3:
                    moveAccuracy *= 0.4;
                    break;
                case 4:
                    moveAccuracy *= 0.33;
                    break;
                case 5:
                    moveAccuracy *= 0.28;
                    break;
                case 6:
                    moveAccuracy *= 0.25;
                    break;
                case -1:
                    moveAccuracy *= 1.5;
                    break;
                case -2:
                    moveAccuracy *= 2;
                    break;
                case -3:
                    moveAccuracy *= 2.5;
                    break;
                case -4:
                    moveAccuracy *= 3;
                    break;
                case -5:
                    moveAccuracy *= 3.5;
                    break;
                case -6:
                    moveAccuracy *= 4;
                    break;
            }
            // Can't have infinite cases.
            if (enemyPokemon.evade_stage > 6) {
                moveAccuracy *= 0.25
            }
            if (enemyPokemon.evade_stage < -6) {
                moveAccuracy *= 4;
            }

            /**
             * Accuracy Stage Checker.
             */
            switch (currentPokemon.accuracy_stage) {
                case 1:
                    moveAccuracy *= 1.5;
                    break;
                case 2:
                    moveAccuracy *= 2;
                    break;
                case 3:
                    moveAccuracy *= 2.5;
                    break;
                case 4:
                    moveAccuracy *= 3;
                    break;
                case 5:
                    moveAccuracy *= 3.5;
                    break;
                case 6:
                    moveAccuracy *= 4;
                    break;
                case -1:
                    moveAccuracy *= 0.66;
                    break;
                case -2:
                    moveAccuracy *= 0.5;
                    break;
                case -3:
                    moveAccuracy *= 0.4;
                    break;
                case -4:
                    moveAccuracy *= 0.33;
                    break;
                case -5:
                    moveAccuracy *= 0.28;
                    break;
                case -6:
                    moveAccuracy *= 0.25;
                    break;
            }
            // Can't have infinite cases.
            if (currentPokemon.accuracy_stage > 6) {
                moveAccuracy *= 4;
            }
            if (currentPokemon.accuracy_stage < -6) {
                moveAccuracy *= 0.25;
            }

            /**
             * Move misses.
             */
            if (moveRNG > moveAccuracy && moveAccuracy != null) {
                document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name + ", but it missed!";
            }

            /**
             * Move Hits.
             */
            else if (moveRNG <= moveAccuracy || moveAccuracy == null) {
                if (move.data.stat_changes != [] || move.data.stat_changes != null) {
                    var statArray = move.data.stat_changes;
                    statusMoves(move, currentPokemon, enemyPokemon);
                    document.getElementById("pokemon-attack-text").textContent = currentPokemon.name + " used " + move.data.names[2].name;
                }
            }
        }
    }


    /** 
     * The moveHealthBar1 function.
     * Moves the health bar of pokemon 1.
    */
    function moveHealthBar1() {
        var elem = document.getElementById("pokemon1Bar");
        var width = 100;

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

    /** 
     * The moveHealthBar2 function.
     * Moves the health bar of pokemon 2.
    */
    function moveHealthBar2() {
        var elem = document.getElementById("pokemon2Bar");
        var width = 100;

        while (width >= ((pokemon2.currentHealth / pokemon2.maxHealth) * 100)) {
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


    /**
     * The randomizePokemon1 function.
     * Randomizes the first pokemon's stats.
     */
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

    /**
     * The randomizePokemon2 function.
     * Randomizes the second pokemon's stats.
     */
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

    /**
     * Declaring the Trainers
     * Add the Pokemon to the Trainers and randomizing their Stats.
     */
    var trainer1 = pokemonService.getTrainer1();
    var trainer2 = pokemonService.returnRival();
    $scope.trainer1img = pokemonService.getTrainer1Img();
    $scope.trainer2img = pokemonService.returnRivalSprite();

    /**
     * Adding place holder pokemon inccase the player didn't add any pokemon.
     * This is here just so the game doesn't crash.
     */
    if (trainer1.length <= 0) {
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
    if (trainer2.length <= 0) {
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

    /**
     * Outputting the trainer for testing.
     */
    console.log(trainer1);
    console.log(trainer2);

    /**
     * Pokemon 1 Stat RNG.
     */
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

    /**
     * Pokemon 2 Stat RNG.
     */
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


    /**
     * Declaring the pokemon 1 and 2 variables.
     */
    var pokemon1 = trainer1[0];
    var pokemon2 = trainer2[0];

    /**
     * Declaring the selectMove1 and 2 variables.
     */
    var selectedMove1;
    var selectedMove2;

    /**
     * Declaring the Pokemon1 $scope and moves.
     */
    $scope.pokemon1move1 = pokemon1.moves[0];
    $scope.pokemon1move2 = pokemon1.moves[1];
    $scope.pokemon1move3 = pokemon1.moves[2];
    $scope.pokemon1move4 = pokemon1.moves[3];
    $scope.pokemon1 = pokemon1;

    /**
     * Declaring the Pokemon2 $scope and moves.
     */
    $scope.pokemon2move1 = pokemon2.moves[0];
    $scope.pokemon2move2 = pokemon2.moves[1];
    $scope.pokemon2move3 = pokemon2.moves[2];
    $scope.pokemon2move4 = pokemon2.moves[3];
    $scope.pokemon2 = pokemon2;


    /**
     * The pokemon1MoveSelect $scope function.
     * Selects pokemon1's move from the web browser.
     * If pokemon1SelectedMove and pokemonSelectedMove2 are true, the fight button is unhidden.
     * @param url is the data of the move selected.
     */
    $scope.pokemon1MoveSelect = function (url) {
        $http.get(url).then(function (response) {
            selectedMove1 = response;
            console.log(pokemon1.name + " selected the move: " + selectedMove1.data.names[2].name);
            pokemon1SelectedMove = true;
            pokemon2MoveSelect();
            if (pokemon1SelectedMove == true && pokemon2SelectedMove == true) {
                $scope.showFightButton = true;
            }
        })
    }

    /**
     * The pokemon2MoveSelect function.
     * Randomly chooses the CPU's move.
     */
    pokemon2MoveSelect = function ()
    {
        move2RNG = Math.floor(Math.random() * 4) + 1;
        console.log(move2RNG);
        if (move2RNG == 1)
        {
            $http.get(pokemon2.moves[0].url).then(function (response)
            {
                selectedMove2 = response;
                console.log(pokemon2.name + " selected the move: " + selectedMove2.data.names[2].name);
                pokemon2SelectedMove = true;
            })
        }
        else if (move2RNG == 2)
        {
            $http.get(pokemon2.moves[1].url).then(function (response) {
                selectedMove2 = response;
                console.log(pokemon2.name + " selected the move: " + selectedMove2.data.names[2].name);
                pokemon2SelectedMove = true;
            })
        }
        else if (move2RNG == 3) 
        {
            $http.get(pokemon2.moves[2].url).then(function (response) {
                selectedMove2 = response;
                console.log(pokemon2.name + " selected the move: " + selectedMove2.data.names[2].name);
                pokemon2SelectedMove = true;
            })
        }
        else if (move2RNG == 4) 
        {
            $http.get(pokemon2.moves[3].url).then(function (response) {
                selectedMove2 = response;
                console.log(pokemon2.name + " selected the move: " + selectedMove2.data.names[2].name);
                pokemon2SelectedMove = true;
            })
        }
        if (pokemon1SelectedMove == true && pokemon2SelectedMove == true)
        {
            console.log("Both moves are selected.");
            $scope.showFightButton = true;
        }
    }

    /**
     * The pokemon2MoveSelect $scope function.
     * Selects pokemon2's move from the web browser.
     * If pokemon1SelectedMove and pokemonSelectedMove2 are true, the fight button is unhidden.
     * @param url is the data of the move selected.
     */
    $scope.pokemon2MoveSelect = function (url) {
        $http.get(url).then(function (response) {
            selectedMove2 = response;
            console.log(pokemon2.name + " selected the move: " + selectedMove2.data.names[2].name);
            pokemon2SelectedMove = true;
            if (pokemon1SelectedMove == true && pokemon2SelectedMove == true) {
                $scope.showFightButton = true;
            }
        })
    }

    var move2RNG;
    pokemon2MoveSelect();

    /**
     * The startFight $scope function.
     * Starts the turn of the battle.
     */
    $scope.startFight = function () {
        /**
         * Removing the animations before the turn starts.
         */
        document.getElementById("pokemon2").classList.remove("tada");
        document.getElementById("pokemon1").classList.remove("shake");
        document.getElementById("pokemon1").classList.remove("tada");
        document.getElementById("pokemon2").classList.remove("shake");

        /**
         * Hiding the fight and battle buttons as the turn takes place.
         * They come back once the turn is over.
         */
        $scope.showFightButton = false;
        $scope.showBattleButtons = false;

        document.getElementById("pokemon-attack-box").classList.add("zoomIn");

        /**
         * Pokemon 1 is faster than Pokemon 2.
         */
        if ((pokemon1.speed * pokemon1.speed_multiplier) > (pokemon2.speed * pokemon2.speed_multiplier)) {
            console.log("Pokemon 1 is faster than Pokemon 2");

            $scope.showFightButton = false;

            if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                checkStatStages(pokemon1);
                checkStatStages(pokemon2);

                // Pokemon 1 Attack Animation.
                document.getElementById("pokemon1").classList.add("tada");

                // Pokemon 2 Getting Hit Animation.
                document.getElementById("pokemon2").classList.add("shake");

                battleFunction(selectedMove1, pokemon1, pokemon2);
                showStatusOnView();
                moveHealthBar2();
                // Incase there is any recoil damage or life drain.
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
                            statusMoveChecks(pokemon1);
                            statusMoveChecks(pokemon2);
                            moveHealthBar1();
                            moveHealthBar2();
                            console.log(pokemon1);
                            console.log(pokemon2);
                        }), 1000
                    }
                }, 9000)
            }
        }

        /**
         * Pokemon 2 is faster than Pokemon 1.
         */
        else if ((pokemon2.speed * pokemon2.speed_multiplier) > (pokemon1.speed * pokemon1.speed_multiplier)) {
            console.log("Pokemon 2 is faster than Pokemon 1");

            $scope.showFightButton = false;

            if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                checkStatStages(pokemon1);
                checkStatStages(pokemon2);

                // Pokemon 2 Attack Animation.
                document.getElementById("pokemon2").classList.add("tada");

                // Pokemon 1 Getting Hit Animation.
                document.getElementById("pokemon1").classList.add("shake");

                battleFunction(selectedMove2, pokemon2, pokemon1);
                showStatusOnView();
                moveHealthBar1();
                // Incase there is any recoil damage or life drain.
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
                            statusMoveChecks(pokemon1);
                            statusMoveChecks(pokemon2);
                            moveHealthBar1();
                            moveHealthBar2();
                            console.log(pokemon1);
                            console.log(pokemon2);
                        }), 1000
                    }
                }, 9000)
            }
        }

        /**
         * Pokemon 1 and Pokemon 2 have the same speed.
         */
        else {
            console.log("RNG");
            $scope.showFightButton = false;
            var speedTie = Math.random();
            if (speedTie > 0.5) {
                if (pokemon1.currentHealth > 0 && pokemon2.currentHealth > 0) {
                    checkStatStages(pokemon1);
                    checkStatStages(pokemon2);

                    // Pokemon 1 Attack Animation.
                    document.getElementById("pokemon1").classList.add("tada");

                    // Pokemon 2 Getting Hit Animation.
                    document.getElementById("pokemon2").classList.add("shake");

                    battleFunction(selectedMove1, pokemon1, pokemon2);
                    showStatusOnView();
                    moveHealthBar2();
                    // Incase there is any recoil damage or life drain.
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
                                statusMoveChecks(pokemon1);
                                statusMoveChecks(pokemon2);
                                moveHealthBar1();
                                moveHealthBar2();
                                console.log(pokemon1);
                                console.log(pokemon2);
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

                    // Pokemon 2 Attack Animation.
                    document.getElementById("pokemon2").classList.add("tada");

                    // Pokemon 1 Getting Hit Animation.
                    document.getElementById("pokemon1").classList.add("shake");

                    battleFunction(selectedMove2, pokemon2, pokemon1);
                    showStatusOnView();
                    moveHealthBar1();
                    // Incase there is any recoil damage or life drain.
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
                                statusMoveChecks(pokemon1);
                                statusMoveChecks(pokemon2);
                                moveHealthBar1();
                                moveHealthBar2();
                                console.log(pokemon1);
                                console.log(pokemon2);
                            }), 1000
                        }
                    }, 9000)
                }
            }
        }

        /**
         * End of the turn.
         */
        $timeout(function () {
            pokemon2MoveSelect();
            $scope.showFightButton = false;
            $scope.showBattleButtons = true;
            document.getElementById("pokemon-attack-text").textContent = "";
            pokemon1SelectedMove = false;
            pokemon2SelectedMove = false;
            document.getElementById("pokemon-attack-box").classList.remove("zoomIn");

            /**
             * if pokemon 1 is dead.
             */
            if (pokemon1.currentHealth <= 0) {
                trainer1.shift();
                console.log(trainer1);
                /**
                 * checking to see if trainer 1 is out of pokemon.
                 */
                if (trainer1.length <= 0) {
                    trainer1 = [];
                    trainer2 = [];
                    $state.go("trainer2Wins");
                }
                else {
                    pokemon1 = trainer[0];
                    randomizePokemon1();
                    $scope.pokemon1 = pokemon1;
                    $scope.pokemon1 = pokemon1;
                    $scope.pokemon1move1 = pokemon1.moves[0];
                    $scope.pokemon1move2 = pokemon1.moves[1];
                    $scope.pokemon1move3 = pokemon1.moves[2];
                    $scope.pokemon1move4 = pokemon1.moves[3];
                    moveHealthBar1();
                }
            }
            /**
             * if pokemon 2 is dead.
             */
            if (pokemon2.currentHealth <= 0) {
                trainer2.shift();
                console.log(trainer2);
                /**
                 * checking to see if trainer 2 is out of pokemon.
                 */
                if (trainer2.length <= 0) {
                    trainer1 = [];
                    trainer2 = [];
                    $state.go("trainer1Wins");
                }
                else {
                    pokemon2 = trainer2[0]
                    randomizePokemon2();
                    $scope.pokemon2 = pokemon2;
                    $scope.pokemon2move1 = pokemon2.moves[0];
                    $scope.pokemon2move2 = pokemon2.moves[1];
                    $scope.pokemon2move3 = pokemon2.moves[2];
                    $scope.pokemon2move4 = pokemon2.moves[3];
                    moveHealthBar2();
                }
            }
        }, 18000)
    }

    /**
     * Scope currentHealth
     */
    $scope.pokemon2CurrentHealth = pokemon2.maxHealth;
    $scope.pokemon1CurrentHealth = pokemon2.maxHealth;

    /**
     * Scope for default text box.
     */
    $scope.whatWillPokemon1Do = "What will " + pokemon1.name + " do?";
    $scope.whatWillPokemon2Do = "What will " + pokemon2.name + " do?";

    /**
     * showAnimation1 method. ||| WORK IN PROGRESS |||
     */
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

    /**
     * The showStatusOnView function.
     * Shows the status ailments next to the pokemon's healthbar.
     */
    var showStatusOnView = function () {
        if (pokemon1.is_sleeping == true) {
            $scope.show_sleep_1 = true;
        }
        else if (pokemon1.is_sleeping == false) {
            $scope.show_sleep_1 = false;
        }
        if (pokemon1.is_poisoned == true) {
            $scope.show_poison_1 = true;
        }
        else if (pokemon1.is_poisoned == false) {
            $scope.show_poison_1 = false;
        }
        if (pokemon1.is_frozen == true) {
            $scope.show_frozen_1 = true;
        }
        else if (pokemon1.is_frozen == false) {
            $scope.show_frozen_1 = false;
        }
        if (pokemon1.is_paralyzed == true) {
            $scope.show_paralyzed_1 = true;
        }
        else if (pokemon1.is_paralyzed == false) {
            $scope.show_paralyzed_1 = false;
        }
        if (pokemon1.is_burned == true) {
            $scope.show_burned_1 = true;
        }
        else if (pokemon1.is_burned == false) {
            $scope.show_burned_1 = false;
        }
        if (pokemon2.is_sleeping == true) {
            $scope.show_sleep_2 = true;
        }
        else if (pokemon2.is_sleeping == false) {
            $scope.show_sleep_2 = false;
        }
        if (pokemon2.is_poisoned == true) {
            $scope.show_poison_2 = true;
        }
        else if (pokemon2.is_poisoned == false) {
            $scope.show_poison_2 = false;
        }
        if (pokemon2.is_frozen == true) {
            $scope.show_frozen_2 = true;
        }
        else if (pokemon2.is_frozen == false) {
            $scope.show_frozen_2 = false;
        }
        if (pokemon2.is_paralyzed == true) {
            $scope.show_paralyzed_2 = true;
        }
        else if (pokemon2.is_paralyzed == false) {
            $scope.show_paralyzed_2 = false;
        }
        if (pokemon2.is_burned == true) {
            $scope.show_burned_2 = true;
        }
        else if (pokemon2.is_burned == false) {
            $scope.show_burned_2 = false;
        }
    }

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
});