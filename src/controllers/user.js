var User = require('../models/user');
var jwt         = require('jsonwebtoken');
var app = require('express');
var router  = app.Router();


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
    User.find({}, function(err, users) {
        res.json(users);
    });
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
	        if (user.password != req.body.password) {
	        	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      	} else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign(user, router.get('superSecret'), {
		          expiresIn: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
	        }    
	    }
    });
};