(function () {
    angular
        .module("LifeDrops")
        .controller("RegisterController", RegisterController);

    function RegisterController($location) {
        var vm = this;
        vm.donor = true;
        vm.changeUser = changeUser;

        function init() {
            $(".donor-margin").css("margin", "18px 0px");
        }
        init();

        function changeUser() {
            if(vm.donor === true) {
                vm.donor = false;
                $(".donor-margin").animate({ margin: "0px 0px" }, 500);
                $(".recipient-margin").animate({ margin: "18px 0px" }, 500);
            } else {
                vm.donor = true;
                $(".recipient-margin").animate({ margin: "0px 0px" }, 500);
                $(".donor-margin").animate({ margin: "18px 0px" }, 500);
            }
        }
    }
})();