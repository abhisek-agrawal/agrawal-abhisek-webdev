(function () {
    angular
        .module("LifeDrops")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {
            "createComment"                 : createComment,
            "findCommentsForCommentsList"   : findCommentsForCommentsList
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createComment(postId, userId, comment) {
            var url = "/project/api/comment/" + postId + "/" + userId;
            return $http.post(url, comment);
        }

        function findCommentsForCommentsList(commentIds) {
            var load = {
                commentIds: commentIds
            };
            var url = "/project/api/comments";
            return $http.post(url, load);
        }

    }

})();