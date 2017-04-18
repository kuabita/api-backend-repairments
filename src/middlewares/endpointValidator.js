var jwtHelper = require('../helpers/jwt'),
    User      = require('../models/userModel'),
    error     = require('../helpers/error');

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
  		if (err) return next(err);
  		if (currentUser && currentUser.hasAccess(accessLevel)) {
	      return next();
	    }
	    res.status(403).json(error.createError('Authentication failed. Wrong password.', 403));
  	});	
  }
};	

exports.getFilterParametersFromUrl = function(urlParams) {
    var auxFilters = {};

    if (urlParams.filters) {
    	arrayOfParams = JSON.parse(urlParams.filters);
		
		arrayOfParams.forEach(function(value){
		    var fields = value.split('=');
		    auxFilters[fields[0]] = fields[1];
		});
	}
	return auxFilters;
};	

exports.isRequireFullResponse = function(urlParams) {
	return (urlParams.typeResponse === 'full');
}