var User     = require('../models/userModel'),
    UserCtrl = require('../controllers/userController');

module.exports = function(app, passport, endpointValidator) {
	// =======================
	// Public Endpoints 
	// =======================
	app.post('/users/authenticate', UserCtrl.authenticateUser);
	app.post('/users', UserCtrl.createUser);

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
}