<<<<<<< HEAD
"use strict";

var User                 = require('../models/userModel'),
	jwt                  = require('jwt-simple'),
	config               = require('../config/database'),
	jwtHelper            = require('../helpers/jwt'),
	error                = require('../helpers/error'),
	paramsEndpointHelper = require('../helpers/endpointParams');

/**
 * The module handles all actions/logic behind each endpoint.
 * @module userController
 */
module.exports = {};	

/**
 * Create a new User.
 * The values of parameters come inside the req.body. 
 * @see {/middlewares/paramsEndpointValidator/UserParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the User information.
 */
module.exports.createUser = function(req, res, next) {
=======
'use strict';

var User               = require('../models/userModel'),
	jwt                = require('jwt-simple'),
	config             = require('../config/database'),
	jwtHelper          = require('../helpers/jwt'),
	error              = require('../helpers/error'),
	endpointValidator  = require('../middlewares/endpointValidator');

exports.createUser = function(req, res, next) {
>>>>>>> 5f039f9dd79ae6fd3a88117da92f27cdd8b66ee3
	var encryptedPass = jwtHelper.encryptPassword(req.body.email, req.body.password)

	User.findOne({email:req.body.email}, function(err, user) {
		if (err) return next(err);

        if (!user) {
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

/**
 * Authenticate the User acording the email and password value.
 * The values of parameters come inside the req.body. 
 * @see {/middlewares/paramsEndpointValidator/UserParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the JWT.
 */
module.exports.authenticateUser = function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
	    if (err) return next(err);

	    if (user) {
	  		var encryptedPass = jwtHelper.encryptPassword(req.body.email, req.body.password);

	      	if (user.password === encryptedPass) {
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

/**
 * Update an User - req.params._id.
 * The values of parameters come inside the req.body.
 * @see {/middlewares/paramsEndpointValidator/UserParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the User updated.
 */
module.exports.updateUser = function(req, res, next) {
	User.findById(req.params._id, function(err, user) {
		if (err) return next(err);

        if (!user) {
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

/**
 * Retrieve a list of users.
 * The values of parameters come inside the req.query.filters
 * @see {/middlewares/paramsEndpointValidator/UserParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the list of Users.
 */
module.exports.getAllUsers = function(req, res, next) {
	var filters = paramsEndpointHelper.getFilterParametersFromUrl(req.query);
	var query =  User.find(filters);

	if (paramsEndpointHelper.isRequireFullResponse(req.query)) {
		query.populate('companies');
	}
		
	query.exec(function(err, users) {
        return (err)
        	? next(err)
        	: res.json({success: true, users: users});
	});
};
	
/**
 * Retrieve an user - req.params._id.
 * @see {/middlewares/paramsEndpointValidator/UserParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the User.
 */
module.exports.getUser = function(req, res, next) {
	var query =  User.find({'_id': req.params._id});

	if (paramsEndpointHelper.isRequireFullResponse(req.query)) {
		query.populate('companies');
	}
		
	query.exec(function(err, user) {
        return (err)
        	? next(err)
        	: res.json({success: true, user: user});
	});
};
