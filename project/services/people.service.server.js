module.exports = function(app, model) {

    var bcrypt           = require("bcrypt-nodejs");
    var passport         = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

    app.post('/project/api/login', passport.authenticate('local'), login);
    app.post('/project/api/logout', logout);
    app.post('/project/api/register', register);
    app.get('/project/api/loggedin', loggedin);
    app.get('/project/api/user/:userId', findPeopleById);
    app.put('/project/api/user/:userId', updateUser);
    app.put('/project/api/userPassword/:userId', updateUserPassword);
    app.get('/project/api/recipients', findRecipientUsers);
    app.post('/project/api/upload', upload.single('myFile'), uploadImage);

    ///////////////////////////////////////////////////////////////////////////

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model
            .peopleModel
            .createPeople(user)
            .then(
                function(user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err){
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findPeopleById(req, res) {
        var id = req.params.userId;

        model
            .peopleModel
            .findPeopleById(id)
            .then(
                function(user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        model
            .peopleModel
            .updateUser(userId, user)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUserPassword(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model
            .peopleModel
            .updateUser(userId, user)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRecipientUsers(req, res) {
        model
            .peopleModel
            .findRecipientUsers()
            .then(
                function(users) {
                    res.send(users);
                },
                function(error) {
                    res.send("0");
                }
            );
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var imageUrl = "uploads/" + req.file.filename;
        var user = { profileImage: imageUrl };

        model
            .peopleModel
            .updateImage(userId, user)
            .then(
                function(status) {
                    res.redirect("../#/user/" + userId);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function localStrategy(email, password, done) {
        model
            .peopleModel
            .findPeopleByEmail(email)
            .then(
                function(user) {
                    if(user[0] && user[0].email === email && bcrypt.compareSync(password, user[0].password)) {
                        return done(null, user[0]);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .peopleModel
            .findPeopleById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

};