module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();

    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser              : createUser,
        findUserById            : findUserById,
        findUserByUsername      : findUserByUsername,
        findUserByCredentials   : findUserByCredentials,
        updateUser              : updateUser,
        deleteUser              : deleteUser,
        findAllWebsitesForUser  : findAllWebsitesForUser,
        findUserByFacebookId    : findUserByFacebookId,
        setModel                : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.find({
            username: username
        });
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function updateUser(userId, user) {
        var u = {};
        for (var key in user) {
            if (user.hasOwnProperty(key)) u[key] = user[key];
        }

        return UserModel
            .update(
                {
                    _id: userId
                }, u
            );
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findAllWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites", "name")
            .exec();
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function setModel(_model) {
        model = _model;
    }

};