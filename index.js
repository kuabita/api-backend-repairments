'use strict';

// =======================
// get the packages we need 
// =======================
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    jwt         = require('jwt-simple'),
    cors        = require('cors');

// =======================
// Helpers ===============
// =======================
var error       = require('./src/helpers/error');

// =======================
// configuration =========
// =======================
var config            = require('./src/config/database'),
    routes            = require('./src/routes/index'),
    secure            = require('./src/middlewares/security'),
    globalBruteforce  = new secure(),
    corsOptions       = require('./src/config/cors');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {useMongoClient: true}, function (err, res) {
    (err)
        ? console.log ('ERROR connecting to: ' + config.database + '. ' + err)
        : console.log ('Succeeded connected to: ' + config.database);
});

/*
var corsOptions = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '/holaa/com');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
};
*/
app.use(cors(corsOptions));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));

routes(app, passport, globalBruteforce);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
