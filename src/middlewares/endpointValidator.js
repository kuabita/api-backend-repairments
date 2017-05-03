"use strict";

var jwtHelper      = require('../helpers/jwt'),
    User           = require('../models/userModel'),
    error          = require('../helpers/error'),
    endpointHelper = require('../helpers/endpointParams');

/**
 * Define the parameters restrictions for each endpoint. 
 * @module endpointValidator
 */
module.exports = {};  

/**
 * Use 6 promises to validate the value of parameters from a particular request.
 * @function
 * @param {Object} endpointValidator - Data restrictions of each parameter.
 * @see {/middlewares/paramsEndpointValidator/UserParamsConstraint} 
 * @return {Function} next
 */
module.exports.validateParams = function(endpointValidator) {
	/**
	 * Private Function - Validate the value of each parameter with a specific function validation.
	 * @function
	 * @param {Object} params - Parameters defined in the req.
	 * @param {Object} endpointValidatorFields - Restrictions defined for each posible parameter.
	 * @return {Promise}
	 */
	var validateValuesOfParams = function(params, endpointValidatorFields) {
		return new Promise((resolve, reject) => {
			if (Object.getOwnPropertyNames(params).length > 0) {
				Object.keys(params).forEach(function(key) {
					if (endpointValidatorFields[key]) {
						if (!endpointValidatorFields[key].validate(params[key])) {
							reject(endpointValidatorFields[key].errorMesage);	
						}	
					} else {
						reject('The parameter is not valid');
					}	
				});
			}
			resolve('Successfully executed.');
		});
	};

	/**
	 * Private Function - Validate that the required parameters exist in the req object.
	 * @function
	 * @param {Object} params - Parameters defined in the req.
	 * @param {Object} endpointValidatorParams - Restrictions defined for each posible parameter.
	 * @return {Promise}
	 */
	var checkRequirementsOfTheEndpoint = function(endpointValidatorParams, reqParams) {

		/**
		 * Private Function - Check if exist some missing required parameter.
		 * @function
		 * @param {Object} keyUrlParams - Parameters defined in the req.
		 * @param {Object} endpointValidatorParams - Restrictions defined for each posible parameter.
		 * @return {Boolean}
		 */
		var existMissingParameters = function(endpointValidatorParams, keyUrlParams) { 
			var paramsRequired = Object.keys(endpointValidatorParams).filter(function(param) {
				return (endpointValidatorParams[param].required === true);
			});

			var missingParameters = paramsRequired.filter(function(key) {
			    return (keyUrlParams.indexOf(key) === -1);
			});
			
			return (missingParameters.length > 0);
		};

		return new Promise((resolve, reject) => {
			if (endpointValidatorParams.required) {
				var missingParameters = existMissingParameters(
					endpointValidatorParams.fields, 
					Object.keys(reqParams)
				);
				if (missingParameters || !reqParams) { 
					reject(endpointValidatorParams.errorMesage);
				}	
			}
			resolve('Successfully executed.');
		}); 
	};

	return function(req, res, next) {
		var p1, p2, p3, p4, p5, p6;

		p1 = checkRequirementsOfTheEndpoint(
			endpointValidator.params.filters, 
			endpointHelper.getFilterParametersFromUrl(req.query)
		);

		p2 = checkRequirementsOfTheEndpoint(
			endpointValidator.query, 
			req.params
		);
		
		p3 = checkRequirementsOfTheEndpoint(
			endpointValidator.body, 
			req.body
		);

		p4 = validateValuesOfParams(endpointHelper.getFilterParametersFromUrl(req.query), endpointValidator.params.filters.fields);
	
		p5 = validateValuesOfParams(req.params, endpointValidator.query.fields);
	
		p6 = validateValuesOfParams(req.body, endpointValidator.body.fields);
		
		Promise.all([p1, p2, p3, p4, p5, p6]).then(values => { 
		    return next();
		}).catch(reason => { 
		    return res.status(403).json(error.createError(reason, 403));
		});
	}
};

/**
 * Check if a User has access to execute a specific action. The user is taken from the token value.
 * @function
 * @param {String} accessLevel - The access level required.
 * @return {Function} anonymous
 */
module.exports.hasAccess = function(accessLevel) {
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

/**
 * Check if a User is enabled. The user is taken from the token value.
 * @function
 * @return {Function} anonymous
 */
module.exports.isUserEnabled = function() {
	return function (req, res, next) {
	  	User.findOne({_id: jwtHelper.getUserIdFromToken(req.headers)}, function(err, currentUser) {
	  		if (err) return next(err);
	  		if (currentUser && currentUser.enabled) {
		      return next();
		    }
		    res.status(403).json(error.createError('The User is Disabled.', 403));
	  	});	
  	}
};	
