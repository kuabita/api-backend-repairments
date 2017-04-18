var endpointValidator = require('../middlewares/endpointValidator');

module.exports = function(app, passport) {
	require('../config/passport')(passport);

	require('./userRoute')(app, passport, endpointValidator),
	require('./companyRoute')(app, passport, endpointValidator),
	require('./error')(app, passport, endpointValidator);
}    
