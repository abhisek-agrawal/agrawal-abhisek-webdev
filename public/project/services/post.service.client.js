(function () {
    angular
        .module("LifeDrops")
        .factory("PostService", PostService);

    function PostService($http) {

        var api = {
            "findRecipientPosts"      : findRecipientPosts,
            "findPostsByUserId"       : findPostsByUserId,
            "deletePost"              : deletePost,
            "findPostById"            : findPostById
        };
        return api;

        ////////////////////////////////////////////////////////////

        function findRecipientPosts(recipients) {
            var load = { recipients: recipients };
            var url = "/project/api/news/posts";
            return $http.post(url, load);
        }

        function findPostsByUserId(recipientId) {
            var url = "/project/api/profile/posts/" + recipientId;
            return $http.get(url);
        }

        function deletePost(postId) {
            var url = "/project/api/post/" + postId;
            return $http.delete(url);
        }

        function findPostById(postId) {
            var url = "/project/api/post/" + postId;
            return $http.get(url);
        }

    }

})();