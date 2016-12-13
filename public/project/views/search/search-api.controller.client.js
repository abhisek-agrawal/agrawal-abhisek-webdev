(function () {
    angular
        .module("LifeDrops")
        .controller("SearchController", SearchController);

    function SearchController($scope, $sce, SearchService) {
        var vm = this;
        vm.search = search;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        vm.showMap = false;
        vm.places = [];

        function search() {
            vm.places = [];
            var searchTerm = $('#Autocomplete').val();

            SearchService
                .getLocation(searchTerm)
                .then(function(location) {
                    if(location) {
                        vm.showMap = true;
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: location,
                            zoom: 12,
                            scrollwheel: false
                        });
                        infowindow = new google.maps.InfoWindow();
                        var service = new google.maps.places.PlacesService(map);
                        service.nearbySearch({
                            location: location,
                            radius: 5000,
                            keyword: 'blood donation'
                        }, callback);

                        function callback(results, status) {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                for (var i = 0; i < results.length; i++) {
                                    createMarker(results[i]);
                                    getPlaceDetails(results[i].place_id);
                                }
                            }
                        }

                        function createMarker(place) {
                            var placeLoc = place.geometry.location;
                            var marker = new google.maps.Marker({
                                map: map,
                                position: place.geometry.location
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                                infowindow.setContent(place.name);
                                infowindow.open(map, this);
                            });
                        }

                        function getPlaceDetails(placeId) {
                            service.getDetails({
                                placeId: placeId
                            }, function(place, status) {
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    if(place.photos) {
                                        place.image = place.photos[0].getUrl({'maxWidth': 500});
                                    } else {
                                        place.image = "images/placeholder_place.png";
                                    }
                                    vm.places.push(place);
                                    $scope.$apply();
                                    $('html, body').animate({
                                        scrollTop: $("#map").offset().top
                                    }, 300);
                                }
                            });
                        }
                    }
                }),
                function(data) {
                    console.log("Failed to receive location");
                }
        }

        function checkSafeImageUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }
})();