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
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                Materialize.toast('Unable to login!', 4000);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password === user.verifyPassword) {
                var u = {
                    _id: (new Date()).getTime().toString(),
                    username: user.username,
                    password: user.password,
                    firstName: "",
                    lastName: "",
                    email: ""
                };
                UserService.createUser(u);
                $location.url("/user/" + u._id);
            } else {
                Materialize.toast('Passwords do not match!', 4000);
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateProfile = updateProfile;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function updateProfile(user) {
            UserService.updateUser(vm.userId, user);
            Materialize.toast('Profile saved!', 4000);
        }
    }
})();