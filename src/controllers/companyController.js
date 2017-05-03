<<<<<<< HEAD
"use strict";

var Company   = require('../models/companyModel'),
	jwt       = require('jwt-simple'),
	config    = require('../config/database'),
	jwtHelper = require('../helpers/jwt'),
	config    = require('../config/database');
=======
'use strict';
>>>>>>> 5f039f9dd79ae6fd3a88117da92f27cdd8b66ee3

var Company        = require('../models/companyModel'),
	jwt            = require('jwt-simple'),
	config         = require('../config/database'),
	jwtHelper      = require('../helpers/jwt'),
	config         = require('../config/database');

module.exports.createCompany = function(req, res) {
	var company = new Company({ 
    	name: req.body.name,
    	phone: req.body.phone,
    	address: req.body.address,
    	admin: jwtHelper.getUserIdFromToken(req.headers)
  	});

  	company.save(function(err) {
    	if (err) throw err;

    	console.log('Company saved successfully');
    	res.json(company);
    });
};

module.exports.getAllCompanies = function(req, res, next) {
	var token = jwtHelper.getToken(req.headers);
  	if (token) {
    	Company.find({}, function(err, companies) {
	        if (err) throw err;

	        if (!companies) {
	            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
	            res.json({success: true, companies: companies});
	        }
 	    });
	} else {
	    return res.status(403).send({success: false, msg: 'No token provided.'});
	}
};

