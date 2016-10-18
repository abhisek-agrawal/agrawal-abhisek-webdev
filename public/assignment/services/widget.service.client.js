(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget"          : "createWidget",
            "findWidgetsByPageId"   : "findWidgetsByPageId",
            "findWidgetById"        : "findWidgetById",
            "updateWidget"          : "updateWidget",
            "deleteWidget"          : "deleteWidget"
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            result = [];
            for (var widget in widgets) {
                if (widgets[widget].pageId === pageId) {
                    result.push(widgets[widget]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for (var widget in widgets) {
                if (widgets[widget]._id === widgetId) {
                    return widgets[widget];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.splice(w, 1, widget);
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var widget in widgets) {
                if (widgets[widget]._id === widgetId) {
                    widgets.splice(widget, 1);
                }
            }
        }
        
    }
})();