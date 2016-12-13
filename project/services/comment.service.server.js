module.exports = function(app, model) {

    app.post('/project/api/comment/:postId/:userId', createComment);
    app.post('/project/api/comments', findCommentsForCommentsList);

    ///////////////////////////////////////////////////////////////////////////

    function createComment(req, res) {
        var postId = req.params.postId;
        var userId = req.params.userId;
        var commentObj = req.body;

        model
            .commentModel
            .createComment(postId, userId, commentObj)
            .then(
                function(comment) {
                    res.send(comment);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findCommentsForCommentsList(req, res) {
        var commentIds = req.body.commentIds;

        model
            .commentModel
            .findCommentsForCommentsList(commentIds)
            .then(
                function(comments) {
                    res.send(comments);
                },
                function(error) {
                    console.log(error);
                }
            );
    }

};