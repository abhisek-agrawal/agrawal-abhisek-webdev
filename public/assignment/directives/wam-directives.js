(function() {
    angular
        .module("wamDirectives", [])
        .directive("sortable", sortable);

        function sortable() {

            function linker(scope, element, attributes) {
                var start = -1;
                var end = -1;
                element
                    .sortable({
                        start: function(event, ui) {
                            start = $(ui.item).index();
                        },
                        stop: function(event, ui) {
                            end = $(ui.item).index();
                            scope.sortableController.sort(start, end);
                        }
                    });
            }

            return {
                scope: {},
                link: linker,
                controller: sortableController,
                controllerAs: "sortableController"
            }
        }

        function sortableController($routeParams, WidgetService) {
            var vm = this;
            vm.pageId = $routeParams["pid"];
            vm.sort = sort;

            function sort(start, end) {
                var promise = WidgetService.sortWidget(vm.pageId, start, end);
                promise
                    .success(function(status) {
                        if(status) {
                            console.log("Widget sorted!");
                        }
                    })
                    .error(function(error) {

                    });
            }
        }
})();