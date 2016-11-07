module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",   email: "alice@wonder.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",   email: "bob@marley.com"    },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",   email: "charly@garcia.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",  email: "jose@annunzi.com"  }
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function createUser(req, res){
        var user = req.body;
        users.push(user);
        res.send("200");
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

        for (var user in users) {
            if (users[user].username === username && users[user].password === password) {
                res.send(users[user]);
                return;
            }
        }
        res.send("0");
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        for (var user in users) {
            if (users[user].username === username) {
                res.send(users[user]);
                return;
            }
        }
        res.send("0");
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        for (var user in users) {
            if (users[user]._id === id) {
                res.send(users[user]);
                return;
            }
        }
        res.send("0");
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var user = req.body;

        for (var u in users) {
            if (users[u]._id === userId) {
                for (var key in user) {
                    if (user.hasOwnProperty(key)) users[u][key] = user[key];
                }
            }
        }
        res.send("200");
    }

    function deleteUser(req, res){
        var userId = req.params.userId;
        
        for (var user in users) {
            if (users[user]._id === userId) {
                users.splice(user, 1);
            }
        }
        res.send("200");
    }

};