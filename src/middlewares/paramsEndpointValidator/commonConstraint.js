"use strict";

module.exports.validateVersion = function(version) {
	return (/^[0-9]+$/.test(version));
}

module.exports.validateEmail = function(email) {
	return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

module.exports.validateRol = function(rol) {
	return (['root', 'admin', 'employer'].indexOf(rol) > -1);
}

module.exports.validateEnabled = function(value) {
	return (['true', 'false'].indexOf(value) > -1);
}

module.exports.validateId = function(id) {
	return (/^[a-zA-Z0-9]+$/.test(id));
}

module.exports.validateFieldsPopulate = function(reqValues, allowValues) {
	var isSubset = reqValues.every(function(val) { 
		return (allowValues.indexOf(val) >= 0); 
	});
	return (isSubset);
}