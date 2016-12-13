(function () {
    angular
        .module("LifeDrops")
        .factory("AppointmentService", AppointmentService);

    function AppointmentService($http) {

        var api = {
            "createAppointment"         : createAppointment,
            "findRecipientAppointments" : findRecipientAppointments,
            "updateAppointment"         : updateAppointment,
            "findAppointmentsByDonorId" : findAppointmentsByDonorId
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createAppointment(recipientId, donorId, appointment) {
            var url = "/project/api/appointment/" + recipientId + "/" + donorId;
            return $http.post(url, appointment);
        }

        function findRecipientAppointments(recipientId) {
            var url = "/project/api/news/appointments/" + recipientId;
            return $http.get(url);
        }

        function updateAppointment(appointmentId, status) {
            var load = { status: status };
            var url = "/project/api/appointment/" + appointmentId;
            return $http.put(url, load);
        }

        function findAppointmentsByDonorId(donorId) {
            var url = "/project/api/profile/appointments/" + donorId;
            return $http.get(url);
        }
    }

})();