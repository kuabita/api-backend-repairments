var User      = require('../models/user'),
	jwt       = require('jwt-simple'),
	config    = require('../config/database'),
	jwtHelper = require('../helpers/jwt'),
	error     = require('../helpers/error');

exports.createUser = function(req, res) {
	var encryptedPass = jwtHelper.encryptPassword(req.body.email, req.body.password)

    User.findOne({email:req.body.email},function(err, user){
        if(!user) {
            var user = new User({ 
		    	email: req.body.email,
		    	password: encryptedPass,
		    	role: req.body.role,
	  		});
	        
		    user.save(function(err) {
		    	if (err) return next(err);
		    	return res.json(user);
		    });
      	} else {
      		res.status(400).json(error.createError('The user already exist', 400));
        }
    })
};

exports.getAllUsers = function(req, res, next) {
	var token = jwtHelper.getToken(req.headers);
  	if (token) {
  		User.find({}, function(err, users) {
	        if (err) return next(err);

	        if (users) {
	        	return res.json({success: true, users: users})
	        } else {	
	        	res.status(403).json(error.createError('Authentication failed. User not found.', 403));
			}
		});
	} else {
		res.status(403).json(error.createError('No token provided.', 403));
	}
};

exports.authenticateUser = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
	    if (err) return next(err);

	    if (user) {
	  		var encryptedPass = jwtHelper.encryptPassword(req.body.email, req.body.password)

	      	if(user.password === encryptedPass) {
	            var token = jwt.encode(user, config.secret);
	            res.json({success: true, token: 'JWT ' + token});
	        } else {
	        	res.status(403).json(error.createError('Authentication failed. Wrong password.', 403));
	        }
	  	} else {
	    	res.status(403).json(error.createError('Authentication failed. User not found.', 403));
	    }
    });
};
