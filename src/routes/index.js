var endpointValidator = require('../middlewares/endpointValidator'),
    UserCtrl          = require('../controllers/userController');
    
module.exports = function(app, passport, globalBruteforce) {
	require('../config/passport')(passport);
	// =======================
	// Public Endpoints --- ERROR 429 if we hit this route too often
	// =======================
	app.post('/authenticateUser', globalBruteforce.prevent, UserCtrl.authenticateUser);
	app.post('/registerUser', globalBruteforce.prevent, UserCtrl.createUser);

	// =======================
	// Private Endpoints --- get the routes configuration for each Endpoint/Module. 
	// =======================
	require('../modules/userModule')(app, passport, endpointValidator, UserCtrl);
	require('../modules/companyModule')(app, passport, endpointValidator);

	require('./error')(app, passport, endpointValidator);
}    
