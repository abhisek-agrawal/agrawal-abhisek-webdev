(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        ////////////////////////////////////////////////////////////

        function searchPhotos(searchTerm) {
            var key = "5a8f378ad52e533351c401dc0e637642";
            var secret = "7b373598f601ff60";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();