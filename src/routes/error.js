var app      = require('express'),
    router   = app.Router();

router.get('/debug/error', (req, res, next) => {
  throw new Error('Test explosion')
})

router.get('/debug/crash', (req, res, next) => {
  setTimeout(_ => {
    throw new Error('Error outside request context')
  }, 1000)
})

module.exports = router;