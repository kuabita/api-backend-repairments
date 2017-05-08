"use strict";

var Company              = require('../models/companyModel'),
	jwt                  = require('jwt-simple'),
	config               = require('../config/database'),
	jwtHelper            = require('../helpers/jwt'),
	config               = require('../config/database'),
	paramsEndpointHelper = require('../helpers/endpointParams');

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
	var filters  = paramsEndpointHelper.getFilterParametersFromUrl(req.query);
	var populate = paramsEndpointHelper.getPopulateParametersFromUrl(req.query);

	var query =  Company.find(filters);

	populate.forEach(function(value) {
	    query.populate(value);
	});
	
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
	var version = req.body.version;
    delete req.body.version;
	Company.findOneAndUpdate(
		{'_id': req.params._id, 'version': version},
		{'$set': req.body, '$inc': {'version': 1}},
		{new: true},
		function(err, company) {
			return (err) 
				? next(err)
				: res.json({success: true, company: company});
			}
	)
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
