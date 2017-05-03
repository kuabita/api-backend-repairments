<<<<<<< HEAD
"use strict";
=======
'use strict';
>>>>>>> 5f039f9dd79ae6fd3a88117da92f27cdd8b66ee3

var JwtStrategy = require('passport-jwt').Strategy,
    User        = require('../models/userModel'),
	config      = require('../config/database');

module.exports = function(passport) {
    var opts = {};
  	opts.secretOrKey = config.secret;
  	
  	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	    User.findOne({id: jwt_payload.id}, function(err, user) {
	        if (err) return done(err, false);
	    
	        (user) 
	            ? done(null, user)
	            : done(null, false);
	    });
    }));
};