"use strict";

var Company              = require('../models/repairShopModel'),
	jwt                  = require('jwt-simple'),
	config               = require('../config/database'),
	jwtHelper            = require('../helpers/jwt'),
	config               = require('../config/database'),
	paramsEndpointHelper = require('../helpers/endpointParams');

/**
 * The module handles all actions/logic behind each endpoint of /repairShops.
 * @module repairShopController
 */
module.exports = {};	

/**
 * Create a new RepairShop.
 * The values of parameters come inside the req.body. 
 * @see {/middlewares/paramsEndpointValidator/RepairShopParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the Company information.
 */
module.exports.createRepairShop = function(req, res, next) {
	RepairShop.create({
    	name: req.body.name,
    	phone: req.body.phone,
    	address: req.body.address,
    	company: req.body.company
    }, function (err, repairShop) {
    	return (err) 
			? next(err)
			: res.json({success: true, repairShop: repairShop});
	});
};

/**
 * Retrieve a list of repairShops.
 * The values of parameters come inside the req.query.filters
 * @see {/middlewares/paramsEndpointValidator/repairShopParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the list of Users.
 */
module.exports.getAllRepairShops = function(req, res, next) {
	var filters  = paramsEndpointHelper.getFilterParametersFromUrl(req.query),
	    populate = paramsEndpointHelper.getPopulateParametersFromUrl(req.query);

	var query =  RepairShop.find(filters);

	populate.forEach(function(value) {
	    query.populate(value);
	});
	
	query.exec(function(err, repairShops) {
        return (err)
        	? next(err)
        	: res.json({success: true, repairShops: repairShops});
	});
};

/**
 * Update a RepairShop - req.params._id.
 * The values of parameters come inside the req.body.
 * @see {/middlewares/paramsEndpointValidator/repairShopParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the RepairShop updated.
 */
module.exports.updateRepairShop = function(req, res, next) {
	var version = req.body.version;
    delete req.body.version;
	RepairShop.findOneAndUpdate(
		{'_id': req.params._id, 'version': version},
		{'$set': req.body, '$inc': {'version': 1}},
		{new: true},
		function(err, company) {
			return (err) 
				? next(err)
				: res.json({success: true, repairShop: repairShop});
		}
	)
};

/**
 * Delete a RepairShop - req.params._id.
 * @see {/middlewares/paramsEndpointValidator/repairShopParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the User updated.
 */
module.exports.deleteRepairShop = function(req, res, next) {
	RepairShop.findByIdAndRemove({'_id': req.params._id}, function(err) {
	    return (err) 
    		? next(err)
    		: res.json({success: true, Message: 'RepairShop deleted successfully'});
	});
};


/**
 * Add an Employer in to a particular RepairShop - req.params._id.
 * @see {/middlewares/paramsEndpointValidator/repairShopParamsConstraint} 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} JSON with the User updated.
 */
module.exports.addEmployer = function(req, res, next) {
	RepairShop.findOneAndUpdate(
		{'_id': req.params._id},
		{'$push': {employers: req.body.employer}, '$inc': {'version': 1}},
		{new: true},
		function(err, company) {
			return (err) 
				? next(err)
				: res.json({success: true, repairShop: repairShop});
		}
	);
};