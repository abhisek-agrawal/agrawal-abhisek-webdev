(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage"            : "createPage",
            "findPageByWebsiteId"   : "findPageByWebsiteId",
            "findPageById"          : "findPageById",
            "updatePage"            : "updatePage",
            "deletePage"            : "deletePage"
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            result = [];
            for (var page in pages) {
                if (pages[page].websiteId === websiteId) {
                    result.push(pages[page]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (var page in pages) {
                if (pages[page]._id === pageId) {
                    return pages[page];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p, 1, page);
                }
            }
        }

        function deletePage(pageId) {
            for (var page in pages) {
                if (pages[page]._id === pageId) {
                    pages.splice(page, 1);
                }
            }
        }
        
    }
})();