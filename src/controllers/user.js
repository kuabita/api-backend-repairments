var User      = require('../models/user'),
	jwt       = require('jwt-simple'),
	config    = require('../config/database'),
	jwtHelper = require('../helpers/jwt'),
	crypto    = require('crypto');

function encryptPassword(email, pass) {
    var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
    return hmac;
}

exports.createUser = function(req, res) {
	var encryptedPass = encryptPassword(req.body.email, req.body.password)

    User.findOne({email:req.body.email},function(err, user){
        if(!user) {
            var user = new User({ 
		    	email: req.body.email,
		    	password: encryptedPass,
		    	role: req.body.rol,
	  		});
	        
		    user.save(function(err) {
		    	if (err) throw err;

		    	res.json(user);
		    });
      	} else {
        	res.json('ya existe');
        }
    })
};

exports.getAllUsers = function(req, res, next) {
	var token = jwtHelper.getToken(req.headers);
  	if (token) {
    	User.find({}, function(err, users) {
	        if (err) throw err;

	        if (!users) {
	            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
	        } else {
	            res.json({success: true, users: users});
	        }
 	    });
	} else {
	    return res.status(403).send({success: false, msg: 'No token provided.'});
	}
};

exports.authenticateUser = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
	    if (err) throw err;

	    if (!user) {
	        res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {
	    	var encryptedPass = encryptPassword(req.body.email, req.body.password)

	      	if(user.password === encryptedPass) {
	            var token = jwt.encode(user, config.secret);
	            res.json({success: true, token: 'JWT ' + token});
	        } else {
	            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	        }
	    }
    });
};
