"use strict";

/**
 * The module define several helper functions to parse values from the req object.
 * @module endpointParams
 */
module.exports = {};	

/**
 * Parse the value of 'populate' and return a JSON. 
 * @function
 * @param {String} urlParams - The parameter contains a set of populate values.
 * @return {Object} JSON with key and value of each parameter.
 */
module.exports.getPopulateParametersFromUrl = function(urlParams) {
    var populate = [];
    if (urlParams.populate) {
    	JSON.parse(urlParams.populate).forEach(function(value) {
		    populate.push(value);
		});
	}
	return populate;
};

/**
 * Parse the value of 'filters' and return a JSON. 
 * @function
 * @param {String} urlParams - The parameter contains a set of filters values (key => value).
 * @return {Object} JSON with key and value of each parameter.
 */
module.exports.getFilterParametersFromUrl = function(urlParams) {
    var auxFilters = {};
    if (urlParams.filters) {
    	JSON.parse(urlParams.filters).forEach(function(value) {
		    var fields = value.split('=');
		    auxFilters[fields[0]] = fields[1];
		});
	}
	return auxFilters;
};

/**
 * Determine if is necessary a full response or only a lazy object.
 * @function
 * @param {String} urlParam - Query parameter.
 * @return {Boolean} 
 */
module.exports.isRequireFullResponse = function(urlParam) {
	return (urlParam.typeResponse === 'full');
};