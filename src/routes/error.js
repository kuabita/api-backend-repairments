var errorHelper = require('../helpers/error');

module.exports = function(app) {
	app.get('/debug/error', (req, res, next) => {
	  throw new Error('Test explosion')
	});

	app.get('/debug/crash', (req, res, next) => {
	  setTimeout(_ => {
	    throw new Error('Error outside request context')
	  }, 1000)
	});

	// Define a Error handler to 'catch' general Errors
	app.use(function(req, res) {
		var error = errorHelper.createError('Page not found', 404);
	    res.status(404).json(errorHelper.serializeError(error));
	});

	// Define a Exception handler to 'catch' general Exceptions
	app.use((err, req, res, next) => {
	    res.status(500).json(errorHelper.serializeError(err));
	});
}
