var app      = require('express'),
    router   = app.Router(),
    User     = require('../models/user'),
    UserCtrl = require('../controllers/user'),
    passport = require('passport');

require('../config/passport')(passport);

router.post('/users/authenticate', UserCtrl.authenticateUser);
router.post('/users', UserCtrl.createUser);

router.get('/users', passport.authenticate('jwt', { session: false}), UserCtrl.getAllUsers);  

module.exports = router;