(function () {
    angular
        .module("LifeDrops")
        .factory("SearchService", SearchService);

    function SearchService($http, $q) {

        var api = {
            getLocation: getLocation
        };
        return api;

        ////////////////////////////////////////////////////////////

        function getLocation(searchTerm) {
            var def = $q.defer();
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': searchTerm }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var location = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };
                    def.resolve(location);
                } else {
                    def.reject("Failed to get location");
                }
            });
            return def.promise;
        }
    }
})();