(function () {
    angular
        .module("LifeDrops")
        .factory("FollowService", FollowService);

    function FollowService($http) {

        var api = {
            "createFollow"              : createFollow,
            "removeFollow"              : removeFollow
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createFollow(donorId, recipientId) {
            var load = {
                donorId: donorId,
                recipientId: recipientId
            };
            var url = "/project/api/follow";
            return $http.post(url, load);
        }

        function removeFollow(donorId, recipientId) {
            var url = "/project/api/unFollow/" + donorId + "/" + recipientId;
            return $http.delete(url);
        }

    }

})();