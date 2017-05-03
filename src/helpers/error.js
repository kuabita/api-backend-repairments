<<<<<<< HEAD
"use strict";

/**
 * The module has a couple of functions to handle the creation of Errors.
 * @module error
 */
module.exports = {};
=======
'use strict';
>>>>>>> 5f039f9dd79ae6fd3a88117da92f27cdd8b66ee3

module.exports.serializeError = function (err) {
    var body = {
    	success: false, 
    	status: err.http_code, 
    	title: err.message 
    };
    
    if (process.env.NODE_ENV !== 'production')
        body.stack = err.stack
    
    return body;
}

module.exports.createError = function (msg, http_code) {
    var err = new Error(msg);
	err.http_code = http_code;
	return this.serializeError(err);
}