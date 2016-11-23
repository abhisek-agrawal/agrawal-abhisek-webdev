(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function(user) {
                    if(user === ""){
                        Materialize.toast('Unable to login!', 4000);
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(error) {

                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password === user.verifyPassword) {
                var u = {
                    username: user.username,
                    password: user.password
                };
                var promise = UserService.createUser(u);
                promise
                    .success(function(user) {
                        if(user) {
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function(error) {

                    });
            } else {
                Materialize.toast('Passwords do not match!', 4000);
            }
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateProfile = updateProfile;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function(user) {
                    if(user !== "0") {
                        vm.user = user;
                    }
                })
                .error(function(error) {

                });
        }
        init();

        function updateProfile(user) {
            var promise = UserService.updateUser(vm.userId, user);
            promise
                .success(function(status) {
                    Materialize.toast('Profile saved!', 4000);
                })
                .error(function(error) {

                });
        }

        function deleteUser() {
            var promise = UserService.deleteUser(vm.userId);
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