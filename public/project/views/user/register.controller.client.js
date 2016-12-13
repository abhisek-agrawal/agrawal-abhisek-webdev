(function () {
    angular
        .module("LifeDrops")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, PeopleService) {
        var vm = this;
        vm.changeUser = changeUser;
        vm.registerRecipient = registerRecipient;
        vm.registerDonor = registerDonor;
        vm.errorMessage = "";

        vm.isDonor = true;

        function init() {
            $(".donor-margin").css("margin", "18px 0px");
        }
        init();

        function changeUser() {
            if(vm.isDonor === true) {
                vm.isDonor = false;
                $(".donor-margin").animate({ margin: "0px 0px" }, 500);
                $(".recipient-margin").animate({ margin: "18px 0px" }, 500);
            } else {
                vm.isDonor = true;
                $(".recipient-margin").animate({ margin: "0px 0px" }, 500);
                $(".donor-margin").animate({ margin: "18px 0px" }, 500);
            }
        }

        function registerRecipient(recipient) {
            recipient.city = $('.recipient-city').val();
            recipient.type = "Recipient";
            
            PeopleService
                .register(recipient)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/newsfeed");
                    },
                    function(err) {
                        vm.errorMessage = "Sorry, could not register.";
                        $(".alert.alert-danger").fadeIn();
                        closeAlertBox();
                        console.log(err);
                    }
                );
        }

        function registerDonor(donor) {
            donor.city = $('.donor-city').val();
            donor.type = "Donor";
            
            PeopleService
                .register(donor)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/newsfeed");
                    },
                    function(err) {
                        vm.errorMessage = "Sorry, could not register.";
                        $(".alert.alert-danger").fadeIn();
                        closeAlertBox();
                        console.log(err);
                    }
                );
        }

        function closeAlertBox() {
            window.setTimeout(function() {
                $(".alert.alert-danger").fadeOut(300);
            }, 3000);
        }
    }
})();