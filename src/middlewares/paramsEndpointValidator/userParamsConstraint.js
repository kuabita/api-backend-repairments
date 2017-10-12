"use strict";

var commonConstraint = require('./commonConstraint');

/**
 * Define the parameters restrictions for each endpoint. 
 * @module userParamsConstraint
 */
module.exports = {};  

/**
 * Define restrictions for POST /public/registerUser.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.createUser = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null,
				errorMesage: 'Error in filters parameters'
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error in Populate parameters'	
			}
		},
		query: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error in Query parameters'	
		},
		body: {
			allowed: true,
			required: true,
			fields: {
				role: {
					required: true,
					validate: commonConstraint.validateRol,
					errorMesage: 'Error trying to validate the field =>  Rol.'
				},
				email: {
					required: true,
					validate: commonConstraint.validateEmail,
					errorMesage: 'Error trying to validate the field => Email.'
				},
				password: {
					required: true,
					validate: commonConstraint.true,
					errorMesage: 'Error trying to validate the field => Password.'
				},
			},
			errorMesage: 'Error in Body parameters'
		}
	}	
};	

/**
 * Define restrictions for POST /public/authenticateUser.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.authenticateUser = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null,
				errorMesage: 'Error in filters parameters'
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error in Populate parameters'	
			}
		},
		query: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error in Query parameters'	
		},
		body: {
			allowed: true,
			required: true,
			fields: {
				email: {
					required: true,
					validate: commonConstraint.validateEmail,
					errorMesage: 'Error trying to validate the field => Email.'
				},
				password: {
					required: true,
					validate: commonConstraint.true,
					errorMesage: 'Error trying to validate the field => Password.'
				},
			},
			errorMesage: 'Error in Body parameters'
		}
	}	
};	

/**
 * Define restrictions for GET /.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.getAllUsers = function() {
	return {
		params: {
			filters: {
				allowed: true,
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
				errorMesage: 'Error in filters parameters'	
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error in Populate parameters'
			}	
		},
		query: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error in Query parameters'
		},
		body: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error in Body parameters'
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
				allowed: false,
				required: false,
				fields: null,
				errorMesage: 'Error in filters parameters'	
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error in Populate parameters'
			}
		},
		query: {
			allowed: true,
			required: true,
			fields: {
				_id: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			},
			errorMesage: 'Error in Query parameters'	
		},
		body: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error in Body parameters'
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
				allowed: false,
				required: false,
				fields: null,
				errorMesage: 'Error in filters parameters'
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error in Populate parameters'	
			}
		},
		query: {
			allowed: true,
			required: true,
			fields: {
				_id: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			},
			errorMesage: 'Error in Query parameters'	
		},
		body: {
			allowed: true,
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
					errorMesage: 'Error trying to validate the field =>  Version.'
				}
			},
			errorMesage: 'Error in Body parameters'
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
				allowed: false,
				required: false,
				fields: null,
				errorMesage: 'Error in Filter parameters'
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error in Populate parameters'
			}
		},
		query: {
			allowed: true,
			required: true,
			fields: {
				_id: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			},
			errorMesage: 'Error in Query parameters'	
		},
		body: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error in Body parameters'
		}
	}	
};	