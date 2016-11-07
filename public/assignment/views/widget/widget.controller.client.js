(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.safeHtml = safeHtml;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .success(function(widgets) {
                    vm.widgets = widgets;
                })
                .error(function(error) {

                })
        }
        init();

        function safeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeImageUrl(url) {
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeYoutubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            widget = {
                _id: (new Date()).getTime().toString(),
                widgetType: widgetType
            };
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise
                .success(function(status) {
                    if(status === "200") {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                    }
                })
                .error(function(error) {

                });
        }
    }
    
    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uploadImage = uploadImage;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function(widget) {
                    if(widget !== "0") {
                        vm.widget = widget;
                    }
                })
                .error(function(error) {

                });
        }
        init();

        function updateWidget(widget) {
            var promise = WidgetService.updateWidget(vm.widgetId, widget);
            promise
                .success(function(status) {
                    if(status === "200") {
                        Materialize.toast('Widget saved!', 4000);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function(error) {

                });
        }

        function deleteWidget(widgetId) {
            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .success(function(status) {
                    if(status === "200") {
                        Materialize.toast('Widget deleted!', 4000);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }
                })
                .error(function(error) {

                });
        }

        function uploadImage(widget) {
            if(widget.imageFile) {
                var promise = WidgetService.uploadImage(widget);
                promise
                    .success(function(myFile) {
                        console.log(myFile);
                    })
                    .error(function(error) {

                    });
            } else {
                Materialize.toast('No file selected!', 4000);
            }
        }
    }
})();