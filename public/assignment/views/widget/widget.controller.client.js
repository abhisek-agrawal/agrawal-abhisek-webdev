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
                .success(function(page) {
                    vm.widgets = page.widgets;
                })
                .error(function(error) {

                })
        }
        init();

        function safeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeImageUrl(url) {
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
                type: widgetType
            };
            var promise = WidgetService.createWidget(vm.pageId, widget);
            promise
                .success(function(status) {
                    if(status) {
                        var promise2 = WidgetService.findLastWidget(vm.pageId);
                        promise2
                            .success(function(w) {
                                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + w._id);
                            })
                            .error(function(error) {

                            });
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
                    if(widget) {
                        vm.widget = widget;
                    }
                })
                .error(function(error) {

                });
        }
        init();

        function updateWidget(widget) {
            
            if('priority' in widget) {
                // Old widget needs updating
                var promise = WidgetService.updateWidget(vm.widgetId, widget);
                promise
                    .success(function(status) {
                        if(status) {
                            Materialize.toast('Widget saved!', 4000);
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    })
                    .error(function(error) {

                    });
            } else {
                // New widget needs to add priority
                var promise = WidgetService.findWidgetsByPageId(vm.pageId);
                promise
                    .success(function(page) {
                        if(page.widgets.length === 1){
                            // Add priority 1
                            widget.priority = 0;
                        } else {
                            // Check highest priority and add one
                            var highestPriority = -1;
                            for(var w in page.widgets) {
                                if(highestPriority < page.widgets[w].priority) {
                                    highestPriority = page.widgets[w].priority;
                                }
                            }
                            widget.priority = highestPriority + 1;
                        }

                        var promise2 = WidgetService.updateWidget(vm.widgetId, widget);
                        promise2
                            .success(function(status) {
                                if(status) {
                                    Materialize.toast('Widget saved!', 4000);
                                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                                }
                            })
                            .error(function(error) {

                            })

                    })
                    .error(function(error) {

                    })
            }

            // var promise = WidgetService.updateWidget(vm.widgetId, widget);
            // promise
            //     .success(function(status) {
            //         if(status) {
            //             Materialize.toast('Widget saved!', 4000);
            //             $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            //         }
            //     })
            //     .error(function(error) {

            //     });
        }

        function deleteWidget(widgetId) {
            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .success(function(status) {
                    if(status) {
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