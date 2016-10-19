(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite"         : createWebsite,
            "findWebsitesByUser"    : findWebsitesByUser,
            "findWebsiteById"       : findWebsiteById,
            "updateWebsite"         : updateWebsite,
            "deleteWebsite"         : deleteWebsite
        };
        return api;

        ////////////////////////////////////////////////////////////

        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            result = [];
            for (var website in websites) {
                if (websites[website].developerId === userId) {
                    result.push(websites[website]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for (var website in websites) {
                if (websites[website]._id === websiteId) {
                    return websites[website];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w, 1, website);
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var website in websites) {
                if (websites[website]._id === websiteId) {
                    websites.splice(website, 1);
                }
            }
        }
        
    }
})();