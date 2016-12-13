(function () {
    angular
        .module("LifeDrops")
        .controller("NewAppointmentController", NewAppointmentController);

    function NewAppointmentController($rootScope, $location, $routeParams, AppointmentService) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.recipientId = $routeParams["uid"];
        vm.createAppointment = createAppointment;

        function init() {
            $('#date').pickadate();
            $('#time').pickatime();
        }
        init();

        function createAppointment(appointment) {
            appointment.status = "Pending";
            
            AppointmentService
                .createAppointment(vm.recipientId, vm.currentUser._id, appointment)
                .success(function(appointment) {
                    $location.url("/newsfeed");
                })
                .error(function(error) {
                    vm.errorMessage = "Sorry, could not schedule appointment.";
                    $(".alert.alert-danger").fadeIn();
                    closeAlertBox();
                    console.log(error);
                })
        }

        function closeAlertBox() {
            window.setTimeout(function() {
                $(".alert.alert-danger").fadeOut(300);
            }, 3000);
        }
    }
})();