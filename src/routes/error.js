module.exports = function(app) {
	app.get('/debug/error', (req, res, next) => {
	  throw new Error('Test explosion')
	})

	app.get('/debug/crash', (req, res, next) => {
	  setTimeout(_ => {
	    throw new Error('Error outside request context')
	  }, 1000)
	})
}
