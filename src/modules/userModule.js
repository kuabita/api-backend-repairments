'use strict';

var User     = require('../models/userModel'),
    express  = require('express');
    
module.exports = function(app, passport, endpointValidator, UserCtrl) {
	var users = express.Router();
	
	users.use([
		passport.authenticate('jwt', {session: false}),
		endpointValidator.hasAccess('employer')
	]);
	
	users.get(
	    '/', 
	    endpointValidator.validateParams('getUsers'),
	    UserCtrl.getAllUsers
	);

	users.get(
	    '/:_id', 
	    endpointValidator.validateParams('getUsers'),
	    UserCtrl.getUser
	);  

	/**
	 * Update an User.
	 *
	 * @name User Update
	 * @route {PUT} /:_id
	 * @routeparam {String} :_id is the unique identifier for the User.
	 * @bodyparam {String} email
	 * @bodyparam {Boolean} enabled
	 * @bodyparam {String} version
	 * @bodyparam {String} password
	 */
	users.put(
	    '/:_id', 
	    endpointValidator.validateParams('getUsers'),
	    UserCtrl.updateUser
	);  

	app.use('/users', users);
}