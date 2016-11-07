module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;

        page.websiteId = websiteId;
        pages.push(page);
        res.send("200");
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;

        result = [];
        for (var page in pages) {
            if (pages[page].websiteId === websiteId) {
                result.push(pages[page]);
            }
        }
        res.send(result);
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;

        for (var page in pages) {
            if (pages[page]._id === pageId) {
                res.send(pages[page]);
                return;
            }
        }
        res.send("0");
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var page = req.body;

        for (var p in pages) {
            if (pages[p]._id === pageId) {
                for (var key in page) {
                    if (page.hasOwnProperty(key)) pages[p][key] = page[key];
                }
            }
        }
        res.send("200");
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;

        for (var page in pages) {
            if (pages[page]._id === pageId) {
                pages.splice(page, 1);
            }
        }
        res.send("200");
    }

};