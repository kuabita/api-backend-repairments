// Include all the routes file.
var users = require('./userRoute'),
	companies = require('./companyRoute'),
	errors = require('./error');

module.exports = [].concat(users,companies,errors);
