'use strict';

var User             = require('../models/repairShopModel'),
    RepairShopCtrl   = require('../controllers/repairShopController'),
    paramsConstraint = require('../middlewares/paramsEndpointValidator/repairShopParamConstraint'),
	express          = require('express');

module.exports = function(app, passport, endpointValidator) {
	var repairShops = express.Router();

	repairShops.use(endpointValidator.hasAccess('employer'));

	/**
	 * Retrieve a list of repairshops.
	 *
	 * @name Get list of RepairShops
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /repairShops/
	 * @queryparam {String} [filters] [phone name address company enabled]
	 * @queryparam {String} [populate] (company employer)
	 */
	repairShops.get(
		'/', 
		endpointValidator.validateParams(paramsConstraint.getAllRepairShops()),
		RepairShopCtrl.getAllRepairShops
	);

	/**
	 * @name Get a particular RepairShop 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /repairShops/:_id
	 * @routeparam {String} :_id is the unique identifier for the RepairShops.
	 * @queryparam {String} [populate] (company employer)
	 */
	repairShops.get(
		'/:_id', 
		endpointValidator.validateParams(paramsConstraint.getRepairShop()),
		RepairShopCtrl.getRepairShop
	);


	/**
	 * @name Create a RepairShop 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {POST} /repairShops/
	 * @bodyparam {String} phone 
	 * @bodyparam {String} name 
	 * @bodyparam {String} address 
	 * @bodyparam {String} company
	 */
	repairShops.post(
		'/', 
		[
			endpointValidator.validateParams(paramsConstraint.createRepairShop()),
			endpointValidator.hasAccess('admin')
		],
		RepairShopCtrl.createRepairShop
	);

	/**
	 * Delete an RepairShop.
	 *
	 * @name Delete a RepairShop 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {DELETE} /RepairShops/:_id
	 * @routeparam {String} :_id is the unique identifier for the RepairShop.
	 */
	repairShops.delete(
	    '/:_id', 
	    [
		    endpointValidator.validateParams(paramsConstraint.deleteRepairShop()),
		    endpointValidator.hasAccess('admin')
		],
	    RepairShopCtrl.deleteRepairShop
	);

	/**
	 * @name Add Employer in to a RepairShop 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {PUT} /repairShops/:_id/employers/
	 * @routeparam {String} :_id is the unique identifier for the RepairShop.
	 * @bodyparam {String} employerId 
	 */
	repairShops.put(
		'/:_id/employers', 
		[
			endpointValidator.validateParams(paramsConstraint.addEmployer()),
			endpointValidator.hasAccess('admin')
		],
		RepairShopCtrl.addEmployer
	);

	/**
	 * @name Delete a particular employer 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {PUT} /RepairShops/:_id
	 * @routeparam {String} :_id is the unique identifier for the RepairShop.
	 * @routeparam {String} :_id is the unique identifier for the Employer.
	 */
	repairShops.put(
	    '/:_id/employers/:_idEmployer', 
	    [
			endpointValidator.validateParams(paramsConstraint.deleteEmployer()),
			endpointValidator.hasAccess('admin')
		],
	    RepairShopCtrl.deleteEmployer
	);

	/**
	 * @name Get Employers of a RepairShop 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /repairShops/:_id/employers/
	 * @routeparam {String} :_id is the unique identifier for the RepairShop.
	 * @queryparam {String} filters => [email enabled password role]
	 */
	repairShops.get(
		'/:_id/employers', 
		endpointValidator.validateParams(paramsConstraint.getAllEmployers()),
		RepairShopCtrl.getAllEmployers
	);

	app.use('/repairShops', repairShops);
}