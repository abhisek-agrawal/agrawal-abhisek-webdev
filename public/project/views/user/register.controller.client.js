(function () {
    angular
        .module("LifeDrops")
        .controller("RegisterController", RegisterController);

    function RegisterController($location) {
        var vm = this;
        vm.changeUser = changeUser;
        vm.registerRecipient = registerRecipient;
        vm.registerDonor = registerDonor;

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
            console.log(recipient);
        }

        function registerDonor(donor) {
            donor.city = $('.donor-city').val();
            console.log(donor);
        }
    }
})();