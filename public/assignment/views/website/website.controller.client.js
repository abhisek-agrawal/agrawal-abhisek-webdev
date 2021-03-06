(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(user) {
                    vm.websites = user.websites;
                })
                .error(function(error) {

                });
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(user) {
                    vm.websites = user.websites;
                })
                .error(function(error) {

                });
        }
        init();

        function createWebsite(website) {
            if(website.name) {
                w = {
                    name: website.name,
                    description: website.description
                };
                var promise = WebsiteService.createWebsite(vm.userId, w);
                promise
                    .success(function(status) {
                        if(status) {
                            var promise2 = WebsiteService.findWebsiteById(w._id);
                            promise2
                                .success(function(website) {
                                    if(website) {
                                        vm.websites.push(website);
                                    }
                                })
                                .error(function(error) {

                                });
                            Materialize.toast('New website created!', 4000);
                            $location.url("/user/" + vm.userId + "/website");
                        }
                    })
                    .error(function(error) {

                    });
            } else {
                Materialize.toast('Please fill in the name.', 4000);
            }
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteDelete = websiteDelete;
        vm.updateWebsite = updateWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(user) {
                    vm.websites = user.websites;
                })
                .error(function(error) {

                });

            var promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise
                .success(function(website) {
                    if(website) {
                        vm.website = website;
                    }
                })
                .error(function(error) {

                });
        }
        init();

        function websiteDelete(websiteId) {
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise
                .success(function(status) {
                    if(status) {
                        var promise2 = WebsiteService.findWebsitesByUser(vm.userId);
                        promise2
                            .success(function(user) {
                                vm.websites = user.websites;
                            })
                            .error(function(error) {

                            })
                        Materialize.toast('Website deleted!', 4000);
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function(error) {

                })
        }

        function updateWebsite(website) {
            if(website.name) {
                var promise = WebsiteService.updateWebsite(vm.websiteId, website);
                promise
                    .success(function(status) {
                        if(status) {
                            var promise2 = WebsiteService.findWebsitesByUser(vm.userId);
                            promise2
                                .success(function(user) {
                                    vm.websites = user.websites;
                                })
                                .error(function(error) {

                                })
                            Materialize.toast('Website saved!', 4000);
                            $location.url("/user/" + vm.userId + "/website");
                        }
                    })
                    .error(function(error) {

                    })
            } else {
                Materialize.toast('Please fill in name.', 4000);
            }
        }
    }
})();