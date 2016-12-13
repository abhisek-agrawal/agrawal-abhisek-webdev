var express = require('express');
var app = express();

var passport     = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser   = require('body-parser');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web-app-maker');

// require ("./test/app.js")(app);
// require("./assignment/app.js")(app);
require("./project/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
