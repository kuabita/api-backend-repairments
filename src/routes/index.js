// Include all the routes file.
var users = require('./user');
var errors = require('./error');

module.exports = [].concat(users,errors);