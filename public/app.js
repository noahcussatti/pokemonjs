var app = angular.module("pokemonApp", ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("pokemon", {
        url: "/pokemon",
        templateUrl: "./views/pokemon.html",
        controller: "pokemonController"
    })
    .state("mode-select", {
        url: "/",
        templateUrl: "./views/mode-select.html",
        controller: "pokemonController"
    })
    .state("battle", {
        url: "/battle",
        templateUrl: "./views/battle.html",
        controller: "battleController"
    })
    .state("trainer1Wins", {
        url: "/fsj8hsajkfnjaksNfjka",
        templateUrl: "./views/trainer1win.html",
        controller: "pokemonController"
    })
    .state("trainer2Wins", {
        url: "/jfsijaofijsigjklajgwa3",
        templateUrl: "./views/trainer2win.html",
        controller: "pokemonController"
    })
    .state("testPokemon", {
        url: "/test-pokemon",
        templateUrl: "./views/pokemon-select.html",
        controller: "pokemonController"
    })
    .state("selectTrainer", {
        url: "/trainer-select",
        templateUrl: "./views/trainer-select.html",
        controller: "pokemonController"
    })
    .state("viewTrainersPokemon", {
        url: "/before-battle",
        templateUrl: "./views/view-trainers-pokemon.html",
        controller: "pokemonController"
    })
    .state("pokemonBattle", {
        url: "/pokemon-battle",
        templateUrl: "./views/pokemon-battle.html",
        controller: "battleController"
    })
    .state("CPUBattle", {
        url: "/cpu-battle",
        templateUrl: "./views/cpu-battle.html",
        controller: "battleCPUController"
    })
    .state("CPUOpponentSelect", {
        url: "/opponent-select",
        templateUrl: "./views/cpu-opponent-select.html",
        controller: "pokemonController"
    })
    .state("CPUSelect", {
        url: "/cpu-select",
        templateUrl: "./views/cpu-select.html",
        controller: "pokemonController"
    })
    .state("CPUTrainerSelect", {
        url: "/cpu-trainer-select",
        templateUrl: "./views/cpu-trainer-select.html",
        controller: "pokemonController"
    })
})