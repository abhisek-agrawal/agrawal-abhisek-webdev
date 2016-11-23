module.exports = function(app, model) {

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",   email: "alice@wonder.com"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",   email: "bob@marley.com"    },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",   email: "charly@garcia.com" },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",  email: "jose@annunzi.com"  }
    // ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function createUser(req, res){
        var user = req.body;

        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res){
        var query = req.query;

        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user) {
                        res.send(user[0]);
                    } else {
                        res.send("0");
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.send(user[0]);
                    } else {
                        res.send("0");
                    }
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        model
            .userModel
            .findUserById(id)
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
            .userModel
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

    function deleteUser(req, res) {
        var userId = req.params.userId;
        
        model
            .userModel
            .deleteUser(userId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};