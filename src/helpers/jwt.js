"use strict";

var crypto    = require('crypto'),
    jwt       = require('jwt-simple'),
    config    = require('../config/database');

/**
 * Define some functions to facilitate the use of JWT and crypto.
 * @module jwt
 */
module.exports = {};    

/**
 * Get the value of the token from a request.
 * @function
 * @param {Object} headers - Contain the token value
 * @return {String} 
 */
function getToken (headers) {
    var token = null;
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            token = parted[1];
        } 
    }

    return token;
};
module.exports.getToken = getToken;

/**
 * Get the user id value from the token sent in the request.
 * @function
 * @param {Object} headers - Contain the token value
 * @return {String} 
 */
module.exports.getUserIdFromToken = function (headers) {
    var encryptedToken = getToken(headers);
    var userId = null;

    if (encryptedToken !== null) {
        var decryptedToken = jwt.decode(encryptedToken, config.secret);
        userId = decryptedToken._id;
    }

    return userId;
};

/**
 * Encrypt the user password using an email account value.
 * @function
 * @param {String} email
 * @param {String} pass
 * @return {String} 
 */
module.exports.encryptPassword = function (email, pass) {
    var hmac = crypto.createHmac('sha1', email).update(pass).digest('hex');
    return hmac;
}
