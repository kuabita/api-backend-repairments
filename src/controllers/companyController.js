"use strict";

var Company   = require('../models/companyModel'),
	jwt       = require('jwt-simple'),
	config    = require('../config/database'),
	jwtHelper = require('../helpers/jwt'),
	config    = require('../config/database');

/**
 * The module handles all actions/logic behind each endpoint of /companies.
 * @module companyController
 */
module.exports = {};	

/**
 * Create a new Company.
 * The values of parameters come inside the req.body. 
 * @see {/middlewares/paramsEndpointValidator/CompanyParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the Company information.
 */
module.exports.createCompany = function(req, res, next) {
	var company = new Company({ 
    	name: req.body.name,
    	phone: req.body.phone,
    	address: req.body.address,
    	enabled: true,
    	admin: jwtHelper.getUserIdFromToken(req.headers)
  	});

  	company.save(function(err) {
    	return (err) 
    		? next(err)
    		: res.json({success: true, company: company});
	});
};

/**
 * Retrieve a list of companies.
 * The values of parameters come inside the req.query.filters
 * @see {/middlewares/paramsEndpointValidator/CompanyParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the list of Users.
 */
module.exports.getAllCompanies = function(req, res, next) {
	var filters = paramsEndpointHelper.getFilterParametersFromUrl(req.query);
	var query =  Company.find(filters);

	if (paramsEndpointHelper.isRequireFullResponse(req.query)) {
		query.populate('admin');
		query.populate('repairShops');
		query.populate('employers');
	}

	query.exec(function(err, companies) {
        return (err)
        	? next(err)
        	: res.json({success: true, companies: companies});
	});
};

/**
 * Update a Company - req.params._id.
 * The values of parameters come inside the req.body.
 * @see {/middlewares/paramsEndpointValidator/CompanyParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the Company updated.
 */
module.exports.updateCompany = function(req, res, next) {
	Company.findById(req.params._id, function(err, company) {
		if (err) return next(err);

        if (!company) {
        	res.status(400).json(error.createError('The company does not exist.', 400));
      	} else {
      		if(req.body.version < user.version) {
      		    res.status(400).json(error.createError('The information has already been updated by other user, please try again.', 400));
      		} else {
      			Object.keys(req.body).map(function(key) {
 	  				company[key] = req.body[key];
	      		});
	      		company.version++;
      			
	      		company.save(function(err) {
			    	return (err) 
			    		? next(err)
			    		: res.json({success: true, user: user});
			    });
		    }
        }
    })
};

/**
 * Delete a Company - req.params._id.
 * @see {/middlewares/paramsEndpointValidator/CompanyParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the User updated.
 */
module.exports.deleteCompany = function(req, res, next) {
	Company.findByIdAndRemove({'_id': req.params._id}, function(err) {
	    return (err) 
    		? next(err)
    		: res.json({success: true, Message: 'Company deleted successfully'});
	});
};
