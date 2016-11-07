module.exports = function(app) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER",  "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER",  "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE",   "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML",    "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER",  "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML",    "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/page/:pageId/widget', sortWidget);
    app.post('/api/upload', upload.single('myFile'), uploadImage);

    function createWidget(req, res){
        var pageId = req.params.pageId;
        var widget = req.body;

        widget.pageId = pageId;
        widgets.push(widget);
        res.send("200");
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;

        result = [];
        for (var widget in widgets) {
            if (widgets[widget].pageId === pageId) {
                result.push(widgets[widget]);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        for (var widget in widgets) {
            if (widgets[widget]._id === widgetId) {
                res.send(widgets[widget]);
                return;
            }
        }
        res.send("0");
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;

        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                for (var key in widget) {
                    if (widget.hasOwnProperty(key)) widgets[w][key] = widget[key];
                }
            }
        }
        res.send("200");
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;

        for (var widget in widgets) {
            if (widgets[widget]._id === widgetId) {
                widgets.splice(widget, 1);
            }
        }
        res.send("200");
    }

    function sortWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.final;
        
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        res.send("200");
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body._id;

        var widget = req.body;
        widget.url = "../uploads/" + req.file.filename;
        delete widget["userId"];
        delete widget["websiteId"];

        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
            }
        }

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        res.redirect("../assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    }

};