(function () {
    angular
        .module("LifeDrops")
        .controller("PostController", PostController);

    function PostController($rootScope, $location, $routeParams, $sce, PostService, CommentService) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.postId = $routeParams["pid"];
        vm.createComment = createComment;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.comments = [];
        vm.comment = {};

        function init() {
            PostService
                .findPostById(vm.postId)
                .success(function(post) {
                    vm.post = post;
                    if(post.comments.length != 0) {
                        CommentService
                            .findCommentsForCommentsList(post.comments)
                            .success(function(comments) {
                                for(var comment in comments) {
                                    var date = new Date(comments[comment].dateCreated);
                                    comments[comment].dateCreated = date.toLocaleString(); 
                                }
                                vm.comments = comments;
                            })
                            .error(function(error) {

                            });
                    }
                })
                .error(function(error) {
                    console.log(error);
                });
        }
        init();

        function createComment(comment) {
            CommentService
                .createComment(vm.postId, vm.currentUser._id, comment)
                .success(function(commentObj) {
                    vm.comments.push(commentObj);
                    vm.comment.comment = "";
                    vm.errorMessage = "Comment saved.";
                    $(".alert.alert-success").fadeIn();
                    closeAlertBox();
                })
                .error(function(error) {
                    vm.errorMessage = "Profile could not be saved.";
                    $(".alert.alert-danger").fadeIn();
                    closeAlertBox();
                    console.log(error);
                });
        }

        function checkSafeImageUrl(url) {
            if(!url) {
                url = "http://placehold.it/300x300?text=Upload+your+picture!";
            }
            return $sce.trustAsResourceUrl(url);
        }

        function closeAlertBox() {
            window.setTimeout(function() {
                $(".alert.alert-danger").fadeOut(300);
            }, 3000);
        }
    }
})();