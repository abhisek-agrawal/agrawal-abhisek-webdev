(function () {
    angular
        .module("LifeDrops")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/home.view.client.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();