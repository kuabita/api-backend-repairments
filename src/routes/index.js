var express = require('express');
var mongoose = require('mongoose');
var router  = express.Router();
var jwt         = require('jsonwebtoken');

var User   = require('../models/user'); // get our mongoose model

router.get('/', function(req, res, next) {
    res.render('index');
});



router.get('/createAdmin', function(req, res, next) {
    // create a sample user
    var jose = new User({ 
    	name: 'jose', 
    	password: 'admin',
    	admin: true 
  	});

    // save the sample user
    jose.save(function(err) {
    	if (err) throw err;

    	console.log('User saved successfully');
    	res.json({ success: true });
    });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});  



// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res, next) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, router.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});


module.exports = router;