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
// configuration =========
// =======================
var config     = require('./src/config/database'),
    routes     = require('./src/routes/index'),
    secure     = require('./src/middlewares/security');
    
    corsOptions = {
        origin: 'http://example.com',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

mongoose.Promise = require('bluebird');

mongoose.connect(config.database, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + config.database + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + config.database);
    }
});

// error 429 if we hit this route too often
var globalBruteforce = new secure();
app.post('/users/authenticate', globalBruteforce.prevent);
app.post('/users', globalBruteforce.prevent);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

/*
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
*/
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use('/', cors(corsOptions), routes);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
