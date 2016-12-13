module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var CommentSchema = require('./comment.schema.server')();

    var CommentModel = mongoose.model("CommentModel", CommentSchema);

    var api = {
        createComment               : createComment,
        findCommentsForCommentsList : findCommentsForCommentsList,
        setModel                    : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createComment(postId, userId, comment) {
        return CommentModel
            .create(comment)
            .then(
                function(commentObj) {
                    return model.peopleModel
                        .findPeopleById(userId)
                        .then(
                            function(user) {
                                return model.postModel
                                    .findPostById(postId)
                                    .then(
                                        function(post) {
                                            commentObj._post = post;
                                            commentObj._user = user;
                                            post.comments.push(commentObj);
                                            commentObj.save();
                                            post.save();
                                            return commentObj;
                                        },
                                        function(error) {
                                            console.log(error);
                                        }
                                    );
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                },
                function(error) {
                    console.log(error);
                }
            );
    }

    function findCommentsForCommentsList(commentIds) {
        return CommentModel
            .find({
                _id: { $in: commentIds }
            })
            .populate('_user')
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

};