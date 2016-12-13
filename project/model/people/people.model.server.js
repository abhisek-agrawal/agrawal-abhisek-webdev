module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var PeopleSchema = require('./people.schema.server')();

    var PeopleModel = mongoose.model("PeopleModel", PeopleSchema);

    var api = {
        createPeople        : createPeople,
        findPeopleByEmail   : findPeopleByEmail,
        findPeopleById      : findPeopleById,
        setModel            : setModel,
        updateUser          : updateUser,
        findRecipientUsers  : findRecipientUsers,
        removeFollowingUser : removeFollowingUser,
        updateImage         : updateImage
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createPeople(user) {
        return PeopleModel.create(user);
    }

    function findPeopleByEmail(email) {
        return PeopleModel.find({
            email: email
        });
    }

    function findPeopleById(peopleId) {
        return PeopleModel.findById(peopleId);
    }

    function updateUser(userId, user) {
        var u = {};
        for (var key in user) {
            if (user.hasOwnProperty(key)) u[key] = user[key];
        }

        return PeopleModel
            .update(
                {
                    _id: userId
                }, u
            );
    }

    function findRecipientUsers() {
        return PeopleModel.find({
            type: "Recipient"
        });
    }

    function removeFollowingUser(userId, followerId) {
        return PeopleModel
            .update(
                { _id: userId },
                { $pull: { follows: followerId }}
            );
    }

    function updateImage(userId, user) {
        return PeopleModel
            .update(
                { _id: userId },
                user
            );
    }

    function setModel(_model) {
        model = _model;
    }

};