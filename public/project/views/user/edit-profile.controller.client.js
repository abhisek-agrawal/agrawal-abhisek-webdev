(function() {
    angular
        .module("LifeDrops")
        .controller("EditProfileController", EditProfileController);

        function EditProfileController($rootScope, PeopleService) {
            var vm = this;
            vm.currentUser = $rootScope.currentUser;
            vm.updateUser = updateUser;
            vm.updatePassword = updatePassword;

            function init() {
                $('#birthDate').pickadate({
                    selectMonths: true,
                    selectYears: 60
                });
            }
            init()

            function updateUser(user) {
                user.city = $('.recipient-city').val();
                PeopleService
                    .updateUser(vm.currentUser._id, user)
                    .success(function(status) {
                        vm.errorMessage = "Profile saved.";
                        $(".alert.alert-success").fadeIn();
                        closeAlertBox();
                    })
                    .error(function(error) {
                        vm.errorMessage = "Profile could not be saved.";
                        $(".alert.alert-danger").fadeIn();
                        closeAlertBox();
                        console.log(error);
                    });
            }

            function updatePassword(password) {
                if(password && password.newPassword == password.verifyNewPassword) {
                    vm.currentUser.password = password.newPassword;
                    PeopleService
                        .updateUserPassword(vm.currentUser._id, vm.currentUser)
                        .success(function(status) {
                            vm.errorMessage = "Profile saved.";
                            $(".alert.alert-success").fadeIn();
                            closeAlertBox();
                        })
                        .error(function(error) {
                            vm.errorMessage = "Profile could not be saved.";
                            $(".alert.alert-danger").fadeIn();
                            closeAlertBox();
                            console.log(error);
                        });
                } else {
                    vm.errorMessage = "Both the fields should match.";
                    $(".alert.alert-danger").fadeIn();
                    closeAlertBox();
                }
            }

            function closeAlertBox() {
                window.setTimeout(function() {
                    $(".alert.alert-danger").fadeOut(300);
                }, 3000);
            }
        }
})();