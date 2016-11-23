module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();

    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget            : createWidget,
        findAllWidgetsForPage   : findAllWidgetsForPage,
        findWidgetById          : findWidgetById,
        updateWidget            : updateWidget,
        deleteWidget            : deleteWidget,
        reorderWidget           : reorderWidget,
        findLastWidget          : findLastWidget,
        setModel                : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createWidget(pageId, widget) {
        return WidgetModel
            .create(widget)
            .then(
                function(widgetObj) {
                    model.pageModel
                        .findPageById(pageId)
                        .then(
                            function(pageObj) {
                                pageObj.widgets.push(widgetObj);
                                widgetObj._page = pageObj;
                                widgetObj.save();
                                pageObj.save();
                                return pageObj;
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findOne({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        var wgt = {};
        for (var key in widget) {
            if (widget.hasOwnProperty(key)) wgt[key] = widget[key];
        }

        return WidgetModel
            .update(
                {
                    _id: widgetId
                }, wgt
            );
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        return WidgetModel.find({_page: {$in: pageId}}, function(err, widgets) {
            widgets.forEach(function(widget) {
                if(start > end) {
                    if(widget.priority >= end && widget.priority < start) {
                        widget.priority++;
                    } else if(widget.priority === start) {
                        widget.priority = end;
                    }
                    widget.save();
                } else {
                    if(widget.priority > start && widget.priority <= end) {
                        widget.priority--;
                    } else if(widget.priority === start) {
                        widget.priority = end;
                    }
                    widget.save();
                }
            });
            return widgets;
        });
    }

    function findLastWidget() {
        return WidgetModel.find({});
    }

    function setModel(_model) {
        model = _model;
    }

};