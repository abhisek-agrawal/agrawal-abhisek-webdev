(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget"          : createWidget,
            "findWidgetsByPageId"   : findWidgetsByPageId,
            "findWidgetById"        : findWidgetById,
            "updateWidget"          : updateWidget,
            "deleteWidget"          : deleteWidget,
            "sortWidget"            : sortWidget,
            "uploadImage"           : uploadImage,
            "findLastWidget"        : findLastWidget
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createWidget(pageId, widget) {
            var url = "/api/page/"+ pageId +"/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+ pageId +"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function sortWidget(pageId, start, end) {
            var url = "/api/page/" + pageId + "/widget?initial=" + start + "&final=" + end;
            return $http.put(url);
        }
        
        function uploadImage(widget) {
            var url = "/api/upload";
            return $http.post(url, widget);
        }

        function findLastWidget(pageId) {
            var url = '/api/page/' + pageId + '/widget/last';
            return $http.get(url);
        }
    }
})();