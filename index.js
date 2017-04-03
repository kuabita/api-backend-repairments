// =======================
// get the packages we need 
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

// =======================
// configuration =========
// =======================
var config      = require('./config'); // get our config file
var routes      = require('./src/routes/index');
mongoose.Promise = require('bluebird');

mongoose.connect(config.database, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + config.database + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + config.database);
    }
});
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use('/api', routes);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


