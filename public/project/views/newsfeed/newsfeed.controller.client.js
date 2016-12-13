(function () {
    angular
        .module("LifeDrops")
        .controller("NewsfeedController", NewsfeedController);

    function NewsfeedController($rootScope, $location, $sce, PeopleService, PostService, AppointmentService) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.posts = [];
        vm.appointments = [];
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.updateAppointment = updateAppointment;

        function init() {

            PeopleService
                .findRecipientUsers()
                .success(function(users) {
                    var list = [];
                    for(var user in users) {
                        users[user].name = users[user].institution + ", " + users[user].city;
                    }
                    $(".search-user input").typeahead({
                        source: users,
                        autoSelect: true,
                        afterSelect: function(item) {
                            $location.url("/user/" + item._id);
                        }
                    });
                })
                .error(function(error) {
                    console.log(error);
                });

            if(vm.currentUser.type == 'Donor') {

                PostService
                    .findRecipientPosts(vm.currentUser.follows)
                    .success(function(posts) {
                        for(var post in posts) {
                            var date = new Date(posts[post].dateCreated);
                            posts[post].dateCreated = date.toLocaleString(); 
                        }
                        vm.posts = posts;
                    })
                    .error(function(error) {
                        console.log(error);
                    });

            } else {

                AppointmentService
                    .findRecipientAppointments(vm.currentUser._id)
                    .success(function(appointments) {
                        for(var appointment in appointments) {
                            var date = new Date(appointments[appointment].dateCreated);
                            appointments[appointment].dateCreated = date.toLocaleString(); 
                        }
                        vm.appointments = appointments;
                    })
                    .error(function(error) {
                        console.log(error);
                    });

            }

        }
        init();

        function checkSafeImageUrl(url) {
            if(!url) {
                url = "http://placehold.it/300x300?text=Upload+your+picture!";
            }
            return $sce.trustAsResourceUrl(url);
        }

        function updateAppointment(appointmentId, status) {
            AppointmentService
                .updateAppointment(appointmentId, status)
                .success(function(response) {
                    angular.forEach(vm.appointments, function (value, key) {
                        if(value._id == appointmentId) {
                            value.status = status;
                        }
                    });
                    vm.errorMessage = "Appointment updated.";
                    $(".alert.alert-success").fadeIn();
                    closeAlertBox();
                })
                .error(function(error) {
                    vm.errorMessage = "Sorry, appointment could not be updated.";
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