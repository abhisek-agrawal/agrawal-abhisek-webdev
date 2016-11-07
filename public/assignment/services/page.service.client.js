(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage"            : createPage,
            "findPageByWebsiteId"   : findPageByWebsiteId,
            "findPageById"          : findPageById,
            "updatePage"            : updatePage,
            "deletePage"            : deletePage
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createPage(websiteId, page) {
            var url = "/api/website/"+ websiteId +"/page";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+ websiteId +"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
        
    }
})();