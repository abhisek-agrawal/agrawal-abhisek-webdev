(function() {
    angular
        .module("LifeDrops")
        .controller("ProfileController", ProfileController);

        function ProfileController($routeParams, $rootScope, $location, $sce, PeopleService, FollowService, PostService, AppointmentService) {
            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.currentUser = $rootScope.currentUser;
            vm.user = { _id: 0 };
            vm.errorMessage = "";
            vm.isCurrentUser = isCurrentUser;
            vm.logout = logout;
            vm.currentUserIsFollowing = false;
            vm.follow = follow;
            vm.unFollow = unFollow;
            vm.checkSafeImageUrl = checkSafeImageUrl;
            vm.deletePost = deletePost;
            vm.posts = [];
            vm.appointments = [];

            function init() {
                PeopleService
                    .findUserById(vm.userId)
                    .success(function(user) {

                        vm.user = user;
                        for(var follow in user.follows) {
                            if(user.follows[follow] == vm.currentUser._id) {
                                vm.currentUserIsFollowing = true;
                            }
                        }

                        if(user.type == 'Recipient') {
                            PostService
                                .findPostsByUserId(user._id)
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
                                .findAppointmentsByDonorId(user._id)
                                .success(function(appointments) {
                                    for(var appointment in appointments) {
                                        var date = new Date(appointments[appointment].dateCreated);
                                        appointments[appointment].dateCreated = date.toLocaleString(); 
                                    }
                                    vm.appointments = appointments;
                                })
                                .error(function(error) {
                                    console.log(error);
                                })
                        }

                    })
                    .error(function(error) {

                    });
            }
            init();

            function isCurrentUser() {
                if($rootScope.currentUser._id == vm.user._id) {
                    return true;
                } else {
                    return false;
                }
            }

            function logout() {
                PeopleService
                    .logout()
                    .then(
                        function(response) {
                            $rootScope.currentUser = null;
                            $location.url("/");
                        },
                        function(err) {
                            vm.errorMessage = "Sorry, unable tp logout.";
                            $(".alert.alert-danger").fadeIn();
                            closeAlertBox();
                            console.log(err);
                        }
                    );
            }

            function follow() {
                FollowService
                    .createFollow(vm.currentUser._id, vm.user._id)
                    .success(function(status) {
                        vm.user.follows.push(vm.currentUser._id);
                        vm.currentUserIsFollowing = true;
                    })
                    .error(function(error) {
                        vm.errorMessage = "Could not follow this recipient.";
                        $(".alert.alert-danger").fadeIn();
                        closeAlertBox();
                        console.log(error);
                    });
            }

            function unFollow() {
                FollowService
                    .removeFollow(vm.currentUser._id, vm.user._id)
                    .success(function(status) {
                        vm.user.follows.splice(vm.user.follows.indexOf(vm.currentUser._id), 1);
                        vm.currentUserIsFollowing = false;
                    })
                    .error(function(error) {
                        vm.errorMessage = "Could not unfollow this recipient.";
                        $(".alert.alert-danger").fadeIn();
                        closeAlertBox();
                        console.log(error);
                    });
            }

            function checkSafeImageUrl(url) {
                if(!url) {
                    url = "http://placehold.it/300x300?text=Upload+your+picture!";
                }
                return $sce.trustAsResourceUrl(url);
            }

            function deletePost(postId) {
                PostService
                    .deletePost(postId)
                    .success(function(status) {
                        angular.forEach(vm.posts, function (value, key) {
                            if(value._id == postId) {
                                vm.posts.splice(key, 1);
                            }
                        });
                        vm.errorMessage = "Deleted post.";
                        $(".alert.alert-success").fadeIn();
                        closeAlertBox();
                    })
                    .error(function(error) {
                        vm.errorMessage = "Could not delete post.";
                        $(".alert.alert-danger").fadeIn();
                        closeAlertBox();
                        console.log(error);
                    });
            }

            function closeAlertBox() {
                window.setTimeout(function() {
                    $(".alert.alert-danger").fadeOut(300);
                }, 3000);
            }
        }
})();