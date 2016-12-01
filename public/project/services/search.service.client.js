(function () {
    angular
        .module("LifeDrops")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var api = {
            searchPlaces: searchPlaces
        };
        return api;

        ////////////////////////////////////////////////////////////

        function searchPlaces(searchTerm) {
            var key = "AIzaSyBlt2spTaGEadHjpeK9BgqQ-Xj8FghRpYA";
            var urlBase = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=TEXT&key=API_KEY";
            searchTerm = searchTerm.replace(/\s+/g, "+");
            searchTerm = "blood+donation+" + searchTerm;

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();