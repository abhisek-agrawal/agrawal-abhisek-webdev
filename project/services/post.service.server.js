module.exports = function(app, model) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

    app.post('/project/api/createPost', upload.single('image'), createPost);
    app.post('/project/api/news/posts', findRecipientPosts);
    app.get('/project/api/profile/posts/:recipientId', findPostsByUserId);
    app.delete('/project/api/post/:postId', deletePost);
    app.get('/project/api/post/:postId', findPostById);

    ///////////////////////////////////////////////////////////////////////////

    function createPost(req, res) {
        var userId = req.body.userId;
        var imageUrl = "";
        if(req.file) {
            imageUrl = "uploads/" + req.file.filename;
        }
        var text = req.body.text
        var post = {
            text: text,
            image: imageUrl
        };

        model
            .postModel
            .createPost(userId, post)
            .then(
                function(postObj) {
                    res.redirect("../#/newsfeed/");
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRecipientPosts(req, res) {
        var recipients = req.body.recipients;

        model
            .postModel
            .findRecipientPosts(recipients)
            .then(
                function(posts) {
                    res.send(posts);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPostsByUserId(req, res) {
        var recipientId = req.params.recipientId;

        model
            .postModel
            .findPostsByUserId(recipientId)
            .then(
                function(posts) {
                    res.send(posts);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePost(req, res) {
        var postId = req.params.postId;

        model
            .postModel
            .deletePost(postId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPostById(req, res) {
        var postId = req.params.postId;

        model
            .postModel
            .findPostById(postId)
            .then(
                function(post) {
                    res.send(post);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};