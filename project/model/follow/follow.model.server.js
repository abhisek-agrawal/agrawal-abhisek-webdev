module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var FollowSchema = require('./follow.schema.server')();

    var FollowModel = mongoose.model("FollowModel", FollowSchema);

    var api = {
        createFollow        : createFollow,
        deleteFollow        : deleteFollow,
        setModel            : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createFollow(donorId, recipientId) {
        return model.peopleModel
                .findPeopleById(donorId)
                .then(
                    function(donorObj) {
                        return model.peopleModel
                                .findPeopleById(recipientId)
                                .then(
                                    function(recipientObj) {
                                        var followObj = {
                                            _donor: donorObj,
                                            _recipient: recipientObj
                                        };
                                        return FollowModel
                                                .create(followObj)
                                                .then(
                                                    function(follow) {
                                                        donorObj.follows.push(recipientObj);
                                                        recipientObj.follows.push(donorObj);
                                                        donorObj.save();
                                                        recipientObj.save();
                                                        return donorObj;
                                                    },
                                                    function(error) {
                                                        console.log(error);
                                                    }
                                                )
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

    function deleteFollow(donorId, recipientId) {
        return FollowModel
                .remove({
                    _donor: donorId,
                    _recipient: recipientId
                })
                .then(
                    function(status) {
                        return model.peopleModel
                                .removeFollowingUser(donorId, recipientId)
                                .then(
                                    function(status) {
                                        return model.peopleModel
                                                .removeFollowingUser(recipientId, donorId);
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

    function setModel(_model) {
        model = _model;
    }

};