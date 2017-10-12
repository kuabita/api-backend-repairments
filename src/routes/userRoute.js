'use strict';

var User    = require('../models/userModel'),
	express = require('express');

/**
 * Define the routes and the actions related to each endpoint (User).
 * @module userModule
 */    
module.exports = function(app, passport, endpointValidator, UserCtrl, paramsConstraint) {
	var users = express.Router();
	
	users.use(endpointValidator.hasAccess('employer'));
	
	/**
	 * Retrieve a list of Users.
	 *
	 * @name Get list of Users
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /users/
	 * @queryparam {String} filters => [email enabled password role]
	 */
	users.get(
	    '/', 
	    endpointValidator.validateParams(paramsConstraint.getAllUsers()),
	    UserCtrl.getAllUsers
	);

	/**
	 * Retrieve an User.
	 *
	 * @name Get an User
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {GET} /users/:_id
	 * @routeparam {String} :_id is the unique identifier for the User.
	 */
	users.get(
	    '/:_id', 
	    endpointValidator.validateParams(paramsConstraint.getUser()),
	    UserCtrl.getUser
	);  

	/**
	 * Update an User.
	 *
	 * @name Update an User 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {PUT} /users/:_id
	 * @routeparam {String} :_id is the unique identifier for the User.
	 * @bodyparam {String} email 
	 * @bodyparam {String} enabled 
	 * @bodyparam {String} password 
	 * @bodyparam {String} role 
	 * @bodyparam {String} version
	 */
	users.put(
	    '/:_id', 
	    endpointValidator.validateParams(paramsConstraint.updateUser()),
	    UserCtrl.updateUser
	);  

	/**
	 * Delete an User.
	 *
	 * @name Delete an User 
	 * @authentication This route requires Authentication. If authentication fails it will return an error.
	 * @route {DELETE} /users/:_id
	 * @routeparam {String} :_id is the unique identifier for the User.
	 */
	users.delete(
	    '/:_id', 
	    [
	    	endpointValidator.validateParams(paramsConstraint.deleteUser()),
	   		endpointValidator.hasAccess('root')
	    ],
	    UserCtrl.deleteUser
	);

	app.use('/users', users);
}