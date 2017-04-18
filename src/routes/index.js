var endpointValidator = require('../middlewares/endpointValidator');
    
module.exports = function(app, passport, globalBruteforce) {
	require('../config/passport')(passport);

	// get the routes configuration for each endpoint. 
	require('./userRoute')(app, passport, endpointValidator, globalBruteforce),
	require('./companyRoute')(app, passport, endpointValidator),
	require('./error')(app, passport, endpointValidator);

	// Define a error handler to 'catch' general errors
	app.use((err, req, res, next) => {
	    res.status(500).json(error.serializeError(err))
	})
}    
