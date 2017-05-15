'use strict';

var User             = require('../models/companyModel'),
    CompanyCtrl      = require('../controllers/companyController'),
    paramsConstraint = require('../middlewares/paramsEndpointValidator/companyParamsConstraint'),
	express          = require('express');

module.exports = function(app, passport, endpointValidator) {
	var companies = express.Router();

	companies.use(endpointValidator.hasAccess('employer'));

	/**
	 * Retrieve a list of Companies.
	 *
	 * @name Get list of Companies
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /companies/
	 * @queryparam {String} [filters]  (phone || name || address || admin || enabled)
	 * @queryparam {String} [populate] (admin)
	 */
	companies.get(
		'/', 
		endpointValidator.validateParams(paramsConstraint.getAllCompanies()),
		CompanyCtrl.getAllCompanies
	);

	/**
	 * @name Get a particular Company 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /companies/:_id
	 * @routeparam {String} :_id is the unique identifier for the Company.
	 * @queryparam {String} [populate] (admin)
	 */
	companies.get(
		'/:_id', 
		endpointValidator.validateParams(paramsConstraint.getCompany()),
		CompanyCtrl.getCompany
	);

	/**
	 * @name Create a Company 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {POST} /companies/
	 * @bodyparam {String} phone 
	 * @bodyparam {String} name 
	 * @bodyparam {String} address
	 */
	companies.post(
		'/', 
		[
			endpointValidator.validateParams(paramsConstraint.createCompany()),
			endpointValidator.hasAccess('admin')
		],	
		CompanyCtrl.createCompany
	);

	/**
	 * Update a Company.
	 *
	 * @name Update an Company 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {PUT} /companies/:_id
	 * @routeparam {String} :_id is the unique identifier for the Company.
	 * @bodyparam {String} phone 
	 * @bodyparam {String} name 
	 * @bodyparam {String} address
 	 * @bodyparam {String} admin
	 * @bodyparam {String} enabled
	 * @bodyparam {String} version
	 */
	companies.put(
	    '/:_id',
	    [
			endpointValidator.validateParams(paramsConstraint.updateCompany()),
			endpointValidator.hasAccess('admin')
		],	 
	    UserCtrl.updateCompany
	);  

	/**
	 * Delete an Company.
	 *
	 * @name Delete a Company 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {DELETE} /companies/:_id
	 * @routeparam {String} :_id is the unique identifier for the Company.
	 */
	companies.delete(
	    '/:_id', 
	    [
	    	endpointValidator.validateParams(paramsConstraint.deleteCompany()),
	    	endpointValidator.hasAccess('admin')
	    ],
	    CompanyCtrl.deleteCompany
	);

	app.use('/companies', companies);
}
