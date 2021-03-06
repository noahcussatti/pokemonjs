app.controller("pokemonController", function ($scope, $http, $state, $timeout, pokemonService) {

    document.getElementById("body").classList.remove("battle-background");
    document.getElementById("body").classList.add("selection-background");
    $scope.has2Types = false;
    $scope.showCurrent = false;
    $scope.has4Moves = false;
    $scope.disableStart = true;
    $scope.loading = true;
    var trainer1_selected = false;
    var trainer2_selected = false;

    $scope.goToPokemon = false;





    var _pokemons = pokemonService.getPokemon();
    $scope.pokemon = _pokemons;
    console.log(_pokemons);

    /**
     * Getting the pokemon.
     * @param response 
     */
    pokemonService.getPokemon(function (response) {
        $scope.pokemons = response;
        $scope.loading = false;
    })

    var _cpus = pokemonService.getCpus()
    $scope.cpu = _cpus

    pokemonService.getCpus(function (response) {
        $scope.cpu = response
        $scope.loading = false
    })


    $scope.getCpus = function () {
        $scope.loading = true;
        return pokemonService.getCpus()
            .then(function (response) {
                $scope.cpus = response
                _cpus = response;
                $scope.loading = false
            })
    }

    $scope.getCpus();

    $scope.getRival = function () {
        $scope.loading = true;
        return pokemonService.returnRival()
            .then (function (response) {
                if (response == null) {
                    $scope.currentCpu = _cpus[0]
                    $scope.rival_sprite = _cpus[0].front_sprite
                    $scope.loading = false;
                }
                else {
                    $scope.currentCpu = response;
                    $scope.rival_sprite = response.front_sprite;
                    $scope.loading = false;
                }
                
            })
    }

    $scope.currentCpu = pokemonService.returnRival();
    $scope.rival_sprite = pokemonService.returnRivalSprite();




    $scope.getPokemon = function () {
        $scope.loading = true;
        selectedMoves = []
        $scope.currentMoves = selectedMoves

        return pokemonService.getPokemon()
            .then(function (response) {
                $scope.everyPokemon = response
                $scope.loading = false;
            })
    }
    $scope.getPokemon();


    $scope.trainer1Pokemon = pokemonService.getTrainer1();
    $scope.trainer2Pokemon = pokemonService.getTrainer2();


    $scope.setCurrentPokemon = function (url) {
        selectedMoves = [];
        console.log(url);
        $scope.loading = true;
        $http.get(url).then(function (response) {
            console.log(response);
            $scope.currentPokemon = response.data;
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
            document.getElementById("type").classList.remove("rock")
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
            document.getElementById("type2").classList.remove("rock")



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
            else if (response.data.types[0].type.name == "rock") {
                document.getElementById("type").classList.add("rock")
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
                else if (response.data.types[1].type.name == "rock") {
                    document.getElementById("type2").classList.add("rock")
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
            $scope.currentMoves = selectedMoves
        }
        else {
            selectedMoves.pop();
            selectedMoves.push(move);
            console.log(selectedMoves)
            $scope.currentMoves = selectedMoves
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

    $scope.checkTrainer1 = function () {
        $scope.loading = true;
        $timeout(function () {
            var checkTrainer1 = pokemonService.checkTrainer1()
            if (checkTrainer1 == true) {
                console.log(checkTrainer1)
                $scope.disableStart = false;
                $scope.loading = false;
            }
            else {
                console.log(checkTrainer1)
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

    $scope.addTrainer1CPU = function (url, url2) {
        console.log(url)
        pokemonService.addTrainer1(url, url2);
        $scope.trainer1img = url;
        trainer1_selected = true;
        $scope.goToPokemon = true;   
    }

    $scope.addTrainer1 = function (url, url2) {
        console.log(url)
        pokemonService.addTrainer1(url, url2);
        $scope.trainer1img = url;
        trainer1_selected = true;
        if (trainer1_selected == true && trainer2_selected == true) {
            $scope.goToPokemon = true;
        }
        else {
            $scope.goToPokemon = false;
        }
    }

    $scope.addTrainer2 = function (url, url2) {
        pokemonService.addTrainer2(url, url2);
        $scope.trainer2img = url;
        trainer2_selected = true;
        if (trainer1_selected == true && trainer2_selected == true) {
            $scope.goToPokemon = true;
        }
        else {
            $scope.goToPokemon = false;
        }
    }

    $scope.trainer1 = pokemonService.getTrainer1();
    $scope.trainer2 = pokemonService.getTrainer2();

    $scope.resetTeams = function () {
        pokemonService.resetTeams();
    }

    $scope.trainer1_img = pokemonService.getTrainer1Img();
    $scope.trainer2_img = pokemonService.getTrainer2ImgFront();
    


    $scope.addCurrentCpu = function (response) {
        $scope.currentCpu = response;
        $scope.rival_sprite = response.front_sprite;
        console.log(response);
        pokemonService.getSelectedCPU(response);
    }



})