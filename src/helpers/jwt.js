var crypto    = require('crypto');

exports.getToken = function (headers) {
    var result = null;

    if (headers && headers.authorization) {
  		  var parted = headers.authorization.split(' ');
	      if (parted.length === 2) {
	    	    result = parted[1];
	      } 
    } 

    return result;
};

exports.encryptPassword = function (email, pass) {
    var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
    return hmac;
}