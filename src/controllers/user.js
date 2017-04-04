var User      = require('../models/user'),
	jwt       = require('jwt-simple'),
	config    = require('../config/database'),
	jwtHelper = require('../helpers/jwt');

exports.createUser = function(req, res) {
	var user = new User({ 
    	email: req.body.email,
    	password: req.body.password,
    	rol: req.body.rol,
  	});

  	// save the User
    user.save(function(err) {
    	if (err) throw err;

    	console.log('User saved successfully');
    	res.json(user);
    });
};

exports.getAllUsers = function(req, res, next) {
	var token = jwtHelper.getToken(req.headers);
  	if (token) {
    	User.find({}, function(err, users) {
	        if (err) throw err;

	        if (!users) {
	            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
	            res.json({success: true, users: users});
	        }
 	    });
	} else {
	    return res.status(403).send({success: false, msg: 'No token provided.'});
	}
};

exports.authenticateUser = function(req, res) {
    // find the user
    User.findOne({
    	email: req.body.email
  	}, function(err, user) {
	    if (err) throw err;

	    if (!user) {
	        res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {
	    	// check if password matches
	        //user.comparePassword(req.body.password, function (err, isMatch) {
		      //  if (isMatch && !err) {


		      	// check if password matches
			    if (user.password === req.body.password) {
			        // if user is found and password is right create a token
		            var token = jwt.encode(user, config.secret);
		            // return the information including token as JSON
		            res.json({success: true, token: 'JWT ' + token});
		        } else {
		            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		        }
	      //  });
	    }
    });
};
