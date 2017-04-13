var crypto    = require('crypto'),
    jwt       = require('jwt-simple'),
    config    = require('../config/database');

var getToken = function (headers) {
    var token = null;
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            token = parted[1];
        } 
    }

    return token;
};

var getUserIdFromToken = function (headers) {
    var encryptedToken = getToken(headers);
    var userId = null;

    if (encryptedToken !== null) {
        var decryptedToken = jwt.decode(encryptedToken, config.secret);
        userId = decryptedToken._id;
    }

    return userId;
};

var encryptPassword = function (email, pass) {
    var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
    return hmac;
}

module.exports = {
  getToken: getToken,
  getUserIdFromToken: getUserIdFromToken,
  encryptPassword: encryptPassword
}

