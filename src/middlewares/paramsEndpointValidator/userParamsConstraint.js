"use strict";

var commonConstraint = require('./commonConstraint');

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
						validate: commonConstraint.validateEmail,
						errorMesage: 'Error trying to validate the field => Email.'
					},
					role: {
						required: false,
						validate: commonConstraint.validateRol,
						errorMesage: 'Error trying to validate the field =>  Rol.'
					},
					enabled: {
						required: false,
						validate: commonConstraint.validateEnabled,
						errorMesage: 'Error trying to validate the field => Enabled.'
					}
				},
				errorMesage: 'Error filters'	
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
			},
			populate: {
				required: false,
				validate: null,
				errorMesage: 'Error filters'
			}
		},
		query: {
			required: true,
			fields: {
				_id: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			}	
		},
		body: {
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}	
};	

/**
 * Define restrictions for PUT /:_id.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.updateUser = function() {		
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
			required: true,
			fields: {
				_id: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			}	
		},
		body: {
			required: true,
			fields: {
				enabled: {
					required: false,
					validate: commonConstraint.validateEnabled,
					errorMesage: 'Error trying to validate the field => Enabled.'
				},
				role: {
					required: false,
					validate: commonConstraint.validateRol,
					errorMesage: 'Error trying to validate the field =>  Rol.'
				},
				version: {
					required: true,
					validate: commonConstraint.validateVersion,
					errorMesage: 'Error trying to validate the field =>  Rol.'
				}
			},
			errorMesage: 'Error Body'
		}
	}	
};	

/**
 * Define restrictions for DELETE /:_id.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.deleteUser = function() {		
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
			required: true,
			fields: {
				_id: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			}	
		},
		body: {
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}	
};	