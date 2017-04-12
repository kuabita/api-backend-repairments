var crypto    = require('crypto');

exports.getToken = function (headers) {
    if (headers && headers.authorization) {
  		  var parted = headers.authorization.split(' ');
	      if (parted.length === 2) {
	    	    return parted[1];
	      } else {
	          return null;
    	  }
    } else {
    	  return null;
  	}
};

exports.encryptPassword = function (email, pass) {
    var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
    return hmac;
}