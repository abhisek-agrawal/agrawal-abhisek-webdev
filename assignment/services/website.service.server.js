module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;

        website.developerId = userId;
        websites.push(website);
        res.send("200");
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;

        result = [];
        for (var website in websites) {
            if (websites[website].developerId === userId) {
                result.push(websites[website]);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;

        for (var website in websites) {
            if (websites[website]._id === websiteId) {
                res.send(websites[website]);
                return;
            }
        }
        res.send("0");
    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;

        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                for (var key in website) {
                    if (website.hasOwnProperty(key)) websites[w][key] = website[key];
                }
            }
        }
        res.send("200");
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;

        for (var website in websites) {
            if (websites[website]._id === websiteId) {
                websites.splice(website, 1);
            }
        }
        res.send("200");
    }

};