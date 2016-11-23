module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();

    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage              : createPage,
        findAllPagesForWebsite  : findAllPagesForWebsite,
        findPageById            : findPageById,
        updatePage              : updatePage,
        deletePage              : deletePage,
        findAllWidgetsForPage   : findAllWidgetsForPage,
        setModel                : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(
                function(pageObj) {
                    model.websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function(websiteObj) {
                                websiteObj.pages.push(pageObj);
                                pageObj._website = websiteObj;
                                pageObj.save();
                                websiteObj.save();
                                return websiteObj;
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                }
            );
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function findPageById(pageId) {
        return PageModel.findOne({_id: pageId});
    }

    function updatePage(pageId, page) {
        var p = {};
        for (var key in page) {
            if (page.hasOwnProperty(key)) p[key] = page[key];
        }

        return PageModel
            .update(
                {
                    _id: pageId
                }, p
            );
    }

    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel
            .findById(pageId)
            .populate("widgets")
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

};