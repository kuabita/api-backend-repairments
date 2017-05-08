'use strict';

var endpointValidator = require('../middlewares/endpointValidator'),
    UserCtrl          = require('../controllers/userController');

/**
 * Define the possible routes of the Service and execute the corresponding actions.
 * @module index
 */    
module.exports = function(app, passport, globalBruteforce) {
	require('../config/passport')(passport);

	/**
	 * All paths does not begin with '/public/' should be authenticated.
	 *
	 * @headerparam {String} Authorization - The JWT encrypted token.
	 */
	app.use(/^(?!\/public\/).*/, [
		passport.authenticate('jwt', {session: false}),
		endpointValidator.isUserEnabled()
	]);

	// =======================
	// Public Endpoints --- ERROR 429 if we hit this route too often
	// =======================
	/**
	 * @name Authenticate an User 
	 * @route {POST} /public/authenticateUser
	 * @bodyparam {String} email
	 * @bodyparam {String} password
	 */
	app.post('/public/authenticateUser', globalBruteforce.prevent, UserCtrl.authenticateUser);
	/**
	 * @name Register an User 
	 * @route {POST} /public/registerUser
	 * @bodyparam {String} email
	 * @bodyparam {String} password
	 * @bodyparam {String} role
	 */
	app.post('/public/registerUser', globalBruteforce.prevent, UserCtrl.createUser);

	// =======================
	// Private Endpoints --- get the routes configuration for each Endpoint/Module. 
	// =======================
	require('./userRoute')(app, passport, endpointValidator, UserCtrl);
	require('./companyRoute')(app, passport, endpointValidator);

	require('./error')(app, passport, endpointValidator);
}    
