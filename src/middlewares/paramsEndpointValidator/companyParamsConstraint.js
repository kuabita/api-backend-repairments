"use strict";

var commonConstraint = require('./commonConstraint');

/**
 * Define restrictions for DELETE /:_id.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.deleteCompany = function() {		
	return {
		params: {
			filters: {
				required: false,
				fields: null
			},
			populate: {
				required: false,
				validate: null,
				errorMesage: 'Error filters'
			}
		},
		query: {
			required: false,
			fields: null,
			errorMesage: 'Error Query'
		},
		body: {
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}	
};	

/**
 * Define restrictions for GET /
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.getAllCompanies = function() {		
	return {
		params: {
			filters: {
				required: false,
				fields: null
			},
			populate: {
				required: false,
				validate: function(values) {
					var allowValues = ['admin', 'company'];
					return commonConstraint.validateFieldsPopulate(values, allowValues);
				},
				errorMesage: 'Error filters'
			}
		},
		query: {
			required: false,
			fields: null,
			errorMesage: 'Error Query'
		},
		body: {
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}	
};	

/**
 * Define restrictions for POST /.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.createCompany = function() {		
	return {
		params: {
			filters: {
				required: false,
				fields: null
			},
			populate: {
				required: false,
				validate: null,
				errorMesage: 'Error filters'
			}
		},
		query: {
			required: false,
			fields: null,
			errorMesage: 'Error Query'
		},
		body: {
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}	
};	