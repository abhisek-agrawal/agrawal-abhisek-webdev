(function () {
    angular
        .module("LifeDrops")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/home.view.client.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();