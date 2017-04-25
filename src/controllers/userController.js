var User               = require('../models/userModel'),
	jwt                = require('jwt-simple'),
	config             = require('../config/database'),
	jwtHelper          = require('../helpers/jwt'),
	error              = require('../helpers/error'),
	endpointValidator  = require('../middlewares/endpointValidator');

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
		    	return (err) 
		    		? next(err)
		    		: res.json({success: true, user: user});
		    });
      	} else {
      		res.status(400).json(error.createError('The user already exist', 400));
        }
    })
};

exports.updateUser = function(req, res, next) {
	User.findById(req.params._id, function(err, user){
        if(!user) {
        	res.status(400).json(error.createError('The user does not exist.', 400));
      	} else {
      		if(req.body.version < user.version) {
      		    res.status(400).json(error.createError('The information has already been updated by other user, please try again.', 400));
      		} else {
      			Object.keys(req.body).map(function(key) {
 	  				user[key] = req.body[key];
	      		});
	      		user.version++;
      			
	      		user.save(function(err) {
			    	return (err) 
			    		? next(err)
			    		: res.json({success: true, user: user});
			    });
		    }
        }
    })
};

exports.getAllUsers = function(req, res, next) {
	var filters = endpointValidator.getFilterParametersFromUrl(req.query);
	var query =  User.find(filters);

	if (endpointValidator.isRequireFullResponse(req.query)) {
		query.populate('companies');
	}
		
	query.exec(function(err, users) {
        return (err)
        	? next(err)
        	: res.json({success: true, users: users});
	});
};

	
/**
 * Description of my middleware.
 * @module myMiddleware
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */

exports.getUser = function(req, res, next) {
	var query =  User.find({'_id': req.params._id});

	if (endpointValidator.isRequireFullResponse(req.query)) {
		query.populate('companies');
	}
		
	query.exec(function(err, user) {
        return (err)
        	? next(err)
        	: res.json({success: true, user: user});
	});
};

exports.authenticateUser = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
	    if (err) return next(err);

	    if (user) {
	  		var encryptedPass = jwtHelper.encryptPassword(req.body.email, req.body.password);

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
