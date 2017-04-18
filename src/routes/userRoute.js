var User     = require('../models/userModel'),
    UserCtrl = require('../controllers/userController');

module.exports = function(app, passport, endpointValidator, globalBruteforce) {
	// =======================
	// Public Endpoints 
	// =======================

	// ERROR 429 if we hit this route too often	
	app.post('/users/authenticate', globalBruteforce.prevent, UserCtrl.authenticateUser);
	app.post('/users', globalBruteforce.prevent, UserCtrl.createUser);

	// =======================
	// Private Endpoints 
	// =======================
	app.get(
	    '/users', 
	    [	
	    	passport.authenticate('jwt', {session: false}),
	    	endpointValidator.hasAccess('employer'), 
	    	endpointValidator.validateParams('getUsers')
	    ], 
	    UserCtrl.getAllUsers
	);

	app.get(
	    '/users/:_id', 
	    [	
	    	passport.authenticate('jwt', {session: false}),
	    	endpointValidator.hasAccess('employer'), 
	    	endpointValidator.validateParams('getUsers')
	    ], 
	    UserCtrl.getUser
	);  
}