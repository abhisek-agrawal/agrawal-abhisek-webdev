(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(user.username && user.password) {
                var promise = UserService.login(user);
                promise
                    .then(
                        function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        },
                        function(err) {
                            Materialize.toast('Unable to login!', 4000);
                        }
                    );
            } else {
                Materialize.toast('Please fill in both fields.', 4000);
            }
        }
    }

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user && user.username && user.password && user.verifyPassword) {
                if(user.password === user.verifyPassword) {
                    var u = {
                        username: user.username,
                        password: user.password
                    };
                    var promise = UserService.register(u);
                    promise
                        .then(
                            function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            },
                            function(err) {
                                Materialize.toast('Unable to register!', 4000);
                            }
                        );
                } else {
                    Materialize.toast('Passwords do not match!', 4000);
                }
            } else {
                Materialize.toast('Please fill in all the fields.', 4000);
            }
        }
    }

    function ProfileController($rootScope, $routeParams, UserService, $location) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.logout = logout;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUser();
            promise
                .success(function(user) {
                    if(user !== "0") {
                        vm.user = user;
                        vm.userId = user._id;
                    }
                })
                .error(function(error) {

                });
        }
        init();

        function updateProfile(user) {
            var promise = UserService.updateUser(vm.user._id, user);
            promise
                .success(function(status) {
                    Materialize.toast('Profile saved!', 4000);
                })
                .error(function(error) {

                });
        }

        function logout() {
            var promise = UserService.logout();
            promise
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function(err) {
                        Materialize.toast('Unable to logout!', 4000);
                    }
                );
        }

        function deleteUser() {
            var promise = UserService.deleteUser(vm.user._id);
            promise
                .success(function(status) {
                    Materialize.toast('User unregistered!', 4000);
                    $location.url("/");
                })
                .error(function(error) {

                });
        }
    }
})();