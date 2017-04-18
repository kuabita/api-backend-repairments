var endpointValidator = require('../middlewares/endpointValidator');
    
module.exports = function(app, passport, globalBruteforce) {
	require('../config/passport')(passport);

	// error 429 if we hit this route too often	
	app.post('/users/authenticate', globalBruteforce.prevent);
	app.post('/users', globalBruteforce.prevent);

	require('./userRoute')(app, passport, endpointValidator),
	require('./companyRoute')(app, passport, endpointValidator),
	require('./error')(app, passport, endpointValidator);

	app.use((err, req, res, next) => {
	    res.status(500).json(error.serializeError(err))
	})
}    
