var jwtHelper = require('../helpers/jwt'),
    User      = require('../models/userModel');

exports.validateParams = function(endpoint) {
	return function(req, res, next) {
	
		if (true) {
			return next();
		} else {
			throw {
	            message: 'erorr'
	        };
		}
	}
};

exports.hasAccess = function(accessLevel) {
  return function (req, res, next) {
  	User.findOne({_id: jwtHelper.getUserIdFromToken(req.headers)}, function(err, currentUser) {
  		if (currentUser && currentUser.hasAccess(accessLevel)) {
	      return next();
	    }
	    return res.json({
	      success: false,
	      error: 'Unauthorized'
	    });
  	});	
  }
};	
