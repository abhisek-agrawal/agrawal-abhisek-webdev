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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(website) {
            w = {
                _id: (new Date()).getTime().toString(),
                name: website.name,
                description: website.description
            };
            WebsiteService.createWebsite(vm.userId, w);
            vm.websites.push(WebsiteService.findWebsiteById(w._id));
            Materialize.toast('New website created!', 4000);
            $location.url("/user/" + vm.userId + "/website");
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteDelete = websiteDelete;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function websiteDelete(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            Materialize.toast('Website deleted!', 4000);
            $location.url("/user/" + vm.userId + "/website");
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            Materialize.toast('Website saved!', 4000);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();