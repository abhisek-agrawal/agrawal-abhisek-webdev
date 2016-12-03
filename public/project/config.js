(function () {
    angular
        .module("LifeDrops")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/home.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/signin", {
                templateUrl: "views/user/signin.view.client.html",
                controller: "SigninController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();