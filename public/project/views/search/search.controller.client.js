(function () {
    angular
        .module("LifeDrops")
        .controller("SearchController", SearchController);

    function SearchController(SearchService) {
        var vm = this;
        vm.search = search;

        function search() {
            var searchTerm = $('#Autocomplete').val();

            SearchService
                .searchPlaces(searchTerm)
                .success(function(places) {
                    console.log(places);
                })
                .error(function(error) {

                });
        }
    }
})();