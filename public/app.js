var app = angular.module("pokemonApp", ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/pokemon");

    $stateProvider.state("pokemon", {
        url: "/pokemon",
        templateUrl: "./views/pokemon.html",
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
})