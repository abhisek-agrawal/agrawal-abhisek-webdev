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
                templateUrl: "views/search/search-api.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/signin", {
                templateUrl: "views/user/signin.view.client.html",
                controller: "SigninController",
                controllerAs: "model"
            })
            .when("/newsfeed", {
                templateUrl: "views/newsfeed/newsfeed.view.client.html",
                controller: "NewsfeedController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/:uid/edit", {
                templateUrl: "views/user/edit-profile.view.client.html",
                controller: "EditProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/post", {
                templateUrl: "views/post/new-post.view.client.html",
                controller: "NewPostController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/post/:pid", {
                templateUrl: "views/post/post.view.client.html",
                controller: "PostController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/recipient/:uid/appointment", {
                templateUrl: "views/appointment/new-appointment.view.client.html",
                controller: "NewAppointmentController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .otherwise({
                redirectTo: "/home"
            });

            function checkLoggedin($q, $location, $rootScope, PeopleService) {
                var deferred = $q.defer();
                PeopleService
                    .checkLogin()
                    .success(
                        function (user) {
                            if(user !== '0') {
                                $rootScope.currentUser = user;
                                deferred.resolve();
                            } else {
                                deferred.reject();
                                $location.url("/signin");
                            }
                        }
                    );
                return deferred.promise;
            };
    }
})();