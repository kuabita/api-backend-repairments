"use strict";

/**
 * Define the parameters restrictions for each endpoint. 
 * @module userParamsConstraint
 */
module.exports = {};  

/**
 * Define restrictions for GET /.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.getAllUsers = function() {
	return {
		params: {
			filters: {
				required: false,
				fields: {
					email: {
						required: false,
						validate: function(email) {
							return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
						},
						errorMesage: 'Error trying to validate the field => Email.'
					},
					role: {
						required: false,
						validate: function(rol) {
							return (['root', 'admin', 'employer'].indexOf(rol) > -1);
						},
						errorMesage: 'Error trying to validate the field =>  Rol.'
					},
					enabled: {
						required: false,
						validate: function(value) {
							return (['true', 'false'].indexOf(value) > -1);
						},
						errorMesage: 'Error trying to validate the field => Enabled.'
					}
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
 * Define restrictions for GET /:_id.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.getUser = function() {		
	return {
		params: {
			filters: {
				required: false,
				fields: null
			}	
		},
		query: {
			required: true,
			fields: {
				_id: {
					required: true,
					validate: function(userId) {
						return (/^[a-zA-Z0-9]+$/.test(userId)); 
					},
					errorMesage: 'User id is necessary'
				}
			}	
		}
	}	
};	