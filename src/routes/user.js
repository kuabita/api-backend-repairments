var app = require('express');
var router  = app.Router();

var mongoose = require('mongoose');
var jwt         = require('jsonwebtoken');

var User   = require('../models/user'); 
var UserCtrl   = require('../controllers/user'); 

router.post('/users/authenticate', UserCtrl.authenticateUser);
router.post('/users', UserCtrl.createUser);

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


router.get('/users', UserCtrl.getAllUsers);  

module.exports = router;