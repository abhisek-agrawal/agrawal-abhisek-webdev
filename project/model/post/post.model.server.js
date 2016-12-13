module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var PostSchema = require('./post.schema.server')();

    var PostModel = mongoose.model("PostModel", PostSchema);

    var api = {
        createPost          : createPost,
        findRecipientPosts  : findRecipientPosts,
        findPostsByUserId   : findPostsByUserId,
        deletePost          : deletePost,
        findPostById        : findPostById,
        setModel            : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createPost(userId, post) {
        return PostModel
            .create(post)
            .then(
                function(postObj) {
                    return model
                        .peopleModel
                        .findPeopleById(userId)
                        .then(
                            function(userObj) {
                                postObj._user = userObj;
                                postObj.save();
                                return postObj;
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                }
            );
    }

    function findRecipientPosts(recipients) {
        return PostModel
            .find({
                _user: { $in: recipients }
            })
            .populate('_user')
            .exec();
    }

    function findPostsByUserId(recipientId) {
        return PostModel
            .find({ _user: recipientId })
            .populate('_user')
            .exec();
    }

    function deletePost(postId) {
        return PostModel.remove({ _id: postId });
    }

    function findPostById(postId) {
        return PostModel.findById(postId);
    }

    function setModel(_model) {
        model = _model;
    }

};