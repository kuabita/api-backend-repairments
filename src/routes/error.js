'use strict';

var errorHelper = require('../helpers/error');

/**
 * The module handle the possible errors of the System.
 * @module error
 */
 module.exports = function(app) {
	if (process.env.NODE_ENV !== 'production') {
		app.get('/debug/error', function (req, res, next) {
		    throw new Error('Test explosion')
		});

		app.get('/debug/crash', function (req, res, next) {
		    setTimeout(function() {
		        throw new Error('Error outside request context')
		    }, 1000)
		});
	}
	
	// Define a Error handler to 'catch' general Errors
	app.use(function(req, res) {
		var error = errorHelper.createError('Page not found', 404);
	    res.status(404).json(errorHelper.serializeError(error));
	});

	// Define a Exception handler to 'catch' general Exceptions
	app.use(function (req, res, next) {
	    res.status(500).json(errorHelper.serializeError(err));
	});
}

