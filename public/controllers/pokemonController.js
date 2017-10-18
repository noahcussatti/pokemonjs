app.controller("pokemonController", function ($scope, $http, $state, $timeout, pokemonService) {

    document.getElementById("body").classList.remove("battle-background");
    document.getElementById("body").classList.add("selection-background");
    $scope.has2Types = false;
    $scope.showCurrent = false;
    $scope.has4Moves = false;
    $scope.disableStart = true;
    $scope.loading = true;


    var _pokemons = pokemonService.getPokemon()
    $scope.pokemon = _pokemons

    pokemonService.getPokemon(function (response) {
        $scope.pokemons = response
        $scope.loading = false;
    })

    $scope.getPokemon = function () {
        $scope.loading = true;
        selectedMoves = []
        return pokemonService.getPokemon()
            .then(function (response) {
                $scope.everyPokemon = response
                $scope.loading = false;
            })
    }
    $scope.getPokemon();

    $scope.setCurrentPokemon = function (url) {
        selectedMoves = [];
        console.log(url);
        $scope.loading = true;
        $http.get(url).then(function (response) {
            console.log(response);
            $scope.currentPokemon = response.data
            $scope.currentAttack = ((response.data.stats[4].base_stat / 200) * 100)
            $scope.currentHealth = ((response.data.stats[5].base_stat / 200) * 100)
            $scope.currentDefense = ((response.data.stats[3].base_stat / 200) * 100)
            $scope.currentSpAttack = ((response.data.stats[2].base_stat / 200) * 100)
            $scope.currentSpDefense = ((response.data.stats[1].base_stat / 200) * 100)
            $scope.currentSpeed = ((response.data.stats[0].base_stat / 200) * 100)

            $scope.showCurrent = true;
            document.getElementById("type").classList.remove("normal")
            document.getElementById("type").classList.remove("fire")
            document.getElementById("type").classList.remove("fighting")
            document.getElementById("type").classList.remove("water")
            document.getElementById("type").classList.remove("flying")
            document.getElementById("type").classList.remove("grass")
            document.getElementById("type").classList.remove("poison")
            document.getElementById("type").classList.remove("electric")
            document.getElementById("type").classList.remove("ground")
            document.getElementById("type").classList.remove("ice")
            document.getElementById("type").classList.remove("bug")
            document.getElementById("type").classList.remove("dragon")
            document.getElementById("type").classList.remove("ghost")
            document.getElementById("type").classList.remove("dark")
            document.getElementById("type").classList.remove("steel")
            document.getElementById("type").classList.remove("fairy")
            document.getElementById("type").classList.remove("psychic")
            document.getElementById("type2").classList.remove("normal")
            document.getElementById("type2").classList.remove("fire")
            document.getElementById("type2").classList.remove("fighting")
            document.getElementById("type2").classList.remove("water")
            document.getElementById("type2").classList.remove("flying")
            document.getElementById("type2").classList.remove("grass")
            document.getElementById("type2").classList.remove("poison")
            document.getElementById("type2").classList.remove("electric")
            document.getElementById("type2").classList.remove("ground")
            document.getElementById("type2").classList.remove("ice")
            document.getElementById("type2").classList.remove("bug")
            document.getElementById("type2").classList.remove("dragon")
            document.getElementById("type2").classList.remove("ghost")
            document.getElementById("type2").classList.remove("dark")
            document.getElementById("type2").classList.remove("steel")
            document.getElementById("type2").classList.remove("fairy")
            document.getElementById("type2").classList.remove("psychic")



            if (response.data.types[0].type.name == "normal") {
                document.getElementById("type").classList.add("normal")
            }
            else if (response.data.types[0].type.name == "fire") {
                document.getElementById("type").classList.add("fire")
            }
            else if (response.data.types[0].type.name == "fighting") {
                document.getElementById("type").classList.add("fighting")
            }
            else if (response.data.types[0].type.name == "water") {
                document.getElementById("type").classList.add("water")
            }
            else if (response.data.types[0].type.name == "flying") {
                document.getElementById("type").classList.add("flying")
            }
            else if (response.data.types[0].type.name == "grass") {
                document.getElementById("type").classList.add("grass")
            }
            else if (response.data.types[0].type.name == "poison") {
                document.getElementById("type").classList.add("poison")
            }
            else if (response.data.types[0].type.name == "electric") {
                document.getElementById("type").classList.add("electric")
            }
            else if (response.data.types[0].type.name == "ground") {
                document.getElementById("type").classList.add("ground")
            }
            else if (response.data.types[0].type.name == "ice") {
                document.getElementById("type").classList.add("ice")
            }
            else if (response.data.types[0].type.name == "bug") {
                document.getElementById("type").classList.add("bug")
            }
            else if (response.data.types[0].type.name == "dragon") {
                document.getElementById("type").classList.add("dragon")
            }
            else if (response.data.types[0].type.name == "ghost") {
                document.getElementById("type").classList.add("ghost")
            }
            else if (response.data.types[0].type.name == "dark") {
                document.getElementById("type").classList.add("dark")
            }
            else if (response.data.types[0].type.name == "steel") {
                document.getElementById("type").classList.add("steel")
            }
            else if (response.data.types[0].type.name == "fairy") {
                document.getElementById("type").classList.add("fairy")
            }
            else if (response.data.types[0].type.name == "psychic") {
                document.getElementById("type").classList.add("psychic")
            }

            if (response.data.types.length > 1) {
                $scope.has2Types = true;
                if (response.data.types[1].type.name == "normal") {
                    document.getElementById("type2").classList.add("normal")
                }
                else if (response.data.types[1].type.name == "fire") {
                    document.getElementById("type2").classList.add("fire")
                }
                else if (response.data.types[1].type.name == "fighting") {
                    document.getElementById("type2").classList.add("fighting")
                }
                else if (response.data.types[1].type.name == "water") {
                    document.getElementById("type2").classList.add("water")
                }
                else if (response.data.types[1].type.name == "flying") {
                    document.getElementById("type2").classList.add("flying")
                }
                else if (response.data.types[1].type.name == "grass") {
                    document.getElementById("type2").classList.add("grass")
                }
                else if (response.data.types[1].type.name == "poison") {
                    document.getElementById("type2").classList.add("poison")
                }
                else if (response.data.types[1].type.name == "electric") {
                    document.getElementById("type2").classList.add("electric")
                }
                else if (response.data.types[1].type.name == "ground") {
                    document.getElementById("type2").classList.add("ground")
                }
                else if (response.data.types[1].type.name == "ice") {
                    document.getElementById("type2").classList.add("ice")
                }
                else if (response.data.types[1].type.name == "bug") {
                    document.getElementById("type2").classList.add("bug")
                }
                else if (response.data.types[1].type.name == "dragon") {
                    document.getElementById("type2").classList.add("dragon")
                }
                else if (response.data.types[1].type.name == "ghost") {
                    document.getElementById("type2").classList.add("ghost")
                }
                else if (response.data.types[1].type.name == "dark") {
                    document.getElementById("type2").classList.add("dark")
                }
                else if (response.data.types[1].type.name == "steel") {
                    document.getElementById("type2").classList.add("steel")
                }
                else if (response.data.types[1].type.name == "fairy") {
                    document.getElementById("type2").classList.add("fairy")
                }
                else if (response.data.types[1].type.name == "psychic") {
                    document.getElementById("type2").classList.add("psychic")
                }
            }
            else {
                $scope.has2Types = false;
            }
            $scope.loading = false;

        },
            function (error) {
                console.log(error)
            })
    }

    var selectedMoves = [];
    $scope.addMove = function (move) {
        if (selectedMoves.length < 4) {
            selectedMoves.push(move);
            console.log(selectedMoves)
        }
        else {
            selectedMoves.pop();
            selectedMoves.push(move);
            console.log(selectedMoves)
        }
    }

    $scope.checkTeams = function () {
        $scope.loading = true;
        $timeout(function () {
            var checkTeams = pokemonService.checkTeams()
            if (checkTeams == true) {
                console.log(checkTeams)
                $scope.disableStart = false;
                $scope.loading = false;
            }
            else {
                console.log(checkTeams)
                $scope.disableStart = true;
                $scope.loading = false;
            }
        }, 4000)
    }




    $scope.addPokemon1 = function (p) {

        if (selectedMoves.length == 4) {
            console.log(p)
            pokemonService.getOnePokemon(p)
                .then(function (response) {
                    console.log(response)
                    var newPokemon = response.data;
                    pokemonService.addPokemon1(newPokemon, selectedMoves);
                    selectedMoves = []
                    $scope.showCurrent = false;
                });
        }
    }

    $scope.addPokemon2 = function (p) {
        console.log(p)
        if (selectedMoves.length == 4) {

            pokemonService.getOnePokemon(p)
                .then(function (response) {
                    console.log(response)
                    var newPokemon = response.data;
                    pokemonService.addPokemon2(newPokemon, selectedMoves);
                    selectedMoves = []
                    $scope.showCurrent = false;
                });
        }
    }

    $scope.trainer1 = pokemonService.getTrainer1();
    $scope.trainer2 = pokemonService.getTrainer2();

    $scope.resetTeams = function () {
        pokemonService.resetTeams();
    }
})