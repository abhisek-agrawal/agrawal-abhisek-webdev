(function() {
    angular
        .module("LifeDrops")
        .controller("SigninController", SigninController);

        function SigninController($rootScope, $location, PeopleService) {
            var vm = this;
            vm.login = login;
            vm.errorMessage = "";

            function login(user, userType) {
                if(user && user.username && user.password) {
                    user.type = userType;
                    PeopleService
                        .login(user)
                        .then(
                            function(response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/newsfeed");
                            },
                            function(err) {
                                vm.errorMessage = "Sorry, could not sign in.";
                                $(".alert.alert-danger").fadeIn();
                                closeAlertBox();
                                console.log(err);
                            }
                        );
                } else {
                    vm.errorMessage = "Please fill in both fields.";
                    $(".alert.alert-danger").fadeIn();
                    closeAlertBox();
                }
            }
        }

        function closeAlertBox() {
            window.setTimeout(function() {
                $(".alert.alert-danger").fadeOut(300);
            }, 3000);
        }
})();