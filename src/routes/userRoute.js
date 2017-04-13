var app      = require('express'),
    router   = app.Router(),
    User     = require('../models/userModel'),
    UserCtrl = require('../controllers/userController'),
    endpointValidator = require('../middlewares/endpointValidator'),
    passport = require('passport');

require('../config/passport')(passport);

// =======================
// Public Endpoints 
// =======================
router.post('/users/authenticate', UserCtrl.authenticateUser);
router.post('/users', UserCtrl.createUser);

// =======================
// Private Endpoints 
// =======================
router.get(
    '/users', 
    [
    	endpointValidator.hasAccess('employer'), 
    	endpointValidator.validateParams('getUsers'), 
    	passport.authenticate('jwt', {session: false})
    ], 
    UserCtrl.getAllUsers
);  

module.exports = router;