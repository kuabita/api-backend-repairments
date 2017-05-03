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
	 * @queryparam {String} phone
	 * @queryparam {String} name
	 * @queryparam {String} address
	 * @queryparam {String} admin
	 * @queryparam {String} enabled
	 */
	companies.get(
		'/', 
		endpointValidator.validateParams(paramsConstraint.getAllCompanies()),
		CompanyCtrl.getAllCompanies
	);

	/**
	 * @name Create a Company 
	 * @route {POST} /companies/
	 * @bodyparam {String} phone
	 * @bodyparam {String} name
	 * @bodyparam {String} address
	 */
	companies.post(
		'/', 
		endpointValidator.validateParams(paramsConstraint.createCompany()),
		CompanyCtrl.createCompany
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
	    endpointValidator.validateParams(paramsConstraint.deleteCompany()),
	    CompanyCtrl.deleteCompany
	);

	app.use('/companies', companies);
}
