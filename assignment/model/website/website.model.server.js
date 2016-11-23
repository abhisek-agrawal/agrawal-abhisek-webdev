module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();

    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser    : createWebsiteForUser,
        findAllWebsitesForUser  : findAllWebsitesForUser,
        findWebsiteById         : findWebsiteById,
        updateWebsite           : updateWebsite,
        deleteWebsite           : deleteWebsite,
        findAllPagesForWebsite  : findAllPagesForWebsite,
        setModel                : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(
                function(websiteObj) {
                    model.userModel
                        .findUserById(userId)
                        .then(
                            function(userObj) {
                                userObj.websites.push(websiteObj);
                                websiteObj._user = userObj;
                                websiteObj.save();
                                userObj.save();
                                return userObj;
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                }
            );
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        var w = {};
        for (var key in website) {
            if (website.hasOwnProperty(key)) w[key] = website[key];
        }

        return WebsiteModel
            .update(
                {
                    _id: websiteId
                }, w
            );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }

    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages", "name")
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

};