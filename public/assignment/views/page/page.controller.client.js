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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            console.log(vm.pages);
        }
        init();

        function createPage(page) {
            p = {
                _id: (new Date()).getTime().toString(),
                name: page.name,
                description: page.description
            };
            PageService.createPage(vm.websiteId, p);
            vm.pages.push(PageService.findPageById(p._id));
            Materialize.toast('New page created!', 4000);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function pageDelete(pageId) {
            PageService.deletePage(pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            Materialize.toast('Page deleted!', 4000);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            Materialize.toast('Page saved!', 4000);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }
})();