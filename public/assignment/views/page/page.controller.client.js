(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function(website) {
                    vm.pages = website.pages;
                })
                .error(function(error) {

                });
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function(website) {
                    vm.pages = website.pages;
                })
                .error(function(error) {

                });
        }
        init();

        function createPage(page) {
            p = {
                name: page.name,
                description: page.description
            };
            var promise = PageService.createPage(vm.websiteId, p);
            promise
                .success(function(status) {
                    if(status) {
                        var promise2 = PageService.findPageById(p._id);
                        promise2
                            .success(function(page) {
                                if(page) {
                                    vm.pages.push(page);
                                }
                            })
                            .error(function(error) {

                            });
                        Materialize.toast('New page created!', 4000);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
                .error(function(error) {

                });
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.pageDelete = pageDelete;
        vm.updatePage = updatePage;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function(website) {
                    vm.pages = website.pages;
                })
                .error(function(error) {

                });

            var promise = PageService.findPageById(vm.pageId);
            promise
                .success(function(page) {
                    if(page) {
                        vm.page = page;
                    }
                })
                .error(function(error) {

                });
        }
        init();

        function pageDelete(pageId) {
            var promise = PageService.deletePage(pageId);
            promise
                .success(function(status) {
                    if(status) {
                        var promise2 = PageService.findPageByWebsiteId(vm.websiteId);
                        promise2
                            .success(function(website) {
                                vm.pages = website.pages;
                            })
                            .error(function(error) {

                            })
                        Materialize.toast('Page deleted!', 4000);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
                .error(function(error) {

                })
        }

        function updatePage(page) {
            var promise = PageService.updatePage(vm.pageId, page);
            promise
                .success(function(status) {
                    if(status) {
                        var promise2 = PageService.findPageByWebsiteId(vm.websiteId);
                        promise2
                            .success(function(website) {
                                vm.pages = website.pages;
                            })
                            .error(function(error) {

                            })
                        Materialize.toast('Page saved!', 4000);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
                .error(function(error) {

                })
        }
    }
})();