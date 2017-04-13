// Include all the routes file.
var users = require('./user'),
	companies = require('./companyRoute'),
	errors = require('./error');

module.exports = [].concat(users,companies,errors);
