(function() {
    angular
        .module("searchDirectives", [])
        .directive("ngAutocomplete", ngAutocomplete)
        .directive("ngEnter", ngEnter);

        function ngAutocomplete() {

            function linker(scope, element, attributes) {
                //options for autocomplete
                var opts;
                
                //convert options provided to opts
                var initOpts = function() {
                    opts = {}
                    if (scope.options) {
                        if (scope.options.types) {
                            opts.types = []
                            opts.types.push(scope.options.types)
                        }
                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                        }
                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                        }
                    }
                }
                initOpts()

                //create new autocomplete
                //reinitializes on every change of the options provided
                var newAutocomplete = function() {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], opts);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        scope.$apply(function() {
                            //if (scope.details) {
                            scope.details = scope.gPlace.getPlace();
                            //}
                            scope.ngAutocomplete = element.val();
                        });
                    })
                }
                newAutocomplete()

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                    newAutocomplete()
                    element[0].value = '';
                    scope.ngAutocomplete = element.val();
                }, true);
            }

            return {
                scope: {
                    details: '=',
                    ngAutocomplete: '=',
                    options: '='
                },
                link: linker,
                controller: searchController,
                controllerAs: "searchController"
            }
        }

        function searchController() {
            var vm = this;
        }

        function ngEnter() {
            return function(scope, element, attrs) {
                element.bind("keydown", function(e) {
                    if(e.which === 13) {
                        scope.$apply(function(){
                            scope.$eval(attrs.ngEnter, {'e': e});
                        });
                        e.preventDefault();
                    }
                });
            };
        }
})();