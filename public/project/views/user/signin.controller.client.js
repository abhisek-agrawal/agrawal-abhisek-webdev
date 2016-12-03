(function() {
    angular
        .module("LifeDrops")
        .controller("SigninController", SigninController);

        function SigninController($location) {
            var vm = this;
            vm.loginRecipient = loginRecipient;
            vm.loginDonor = loginDonor;

            function loginRecipient(recipient) {
                console.log(recipient);
            }

            function loginDonor(donor) {
                console.log(donor);
            }
        }
})();