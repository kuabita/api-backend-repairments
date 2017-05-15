"use strict";

var commonConstraint = require('./commonConstraint');

/**
 * Define restrictions for POST /.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.createCompany = function() {		
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
				phone: {
					required: false,
					validate: commonConstraint.validatePhone,
					errorMesage: 'Error trying to validate the field =>  Phone.'
				},
				name: {
					required: true,
					validate: commonConstraint.validateName,
					errorMesage: 'Error trying to validate the field => Name.'
				},
				admin: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'Error trying to validate the field => Admin.'
				},
				address: {
					required: false,
					validate: funtion() {return true},
					errorMesage: 'Error trying to validate the field => Address.'
				}
			},
			errorMesage: 'Error in Query parameters'
		},
		body: {
			allowed: true,
			required: true,
			fields: null,
			errorMesage: 'Error in Body parameters'
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
				allowed: true,
				required: false,
				fields: {
					phone: {
						required: false,
						validate: commonConstraint.validatePhone,
						errorMesage: 'Error trying to validate the field =>  Phone.'
					},
					name: {
						required: true,
						validate: commonConstraint.validateName,
						errorMesage: 'Error trying to validate the field => Name.'
					},
					admin: {
						required: true,
						validate: commonConstraint.validateId,
						errorMesage: 'Error trying to validate the field => Admin.'
					},
					address: {
						required: false,
						validate: funtion() {return true},
						errorMesage: 'Error trying to validate the field => Address.'
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
				required: false,
				validate: function(values) {
					var allowValues = ['admin'];
					return commonConstraint.validateFieldsPopulate(values, allowValues);
				},
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
module.exports.getCompany = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null,
				errorMesage: 'Error in filters parameters'	
			},
			populate: {
				required: false,
				validate: function(values) {
					var allowValues = ['admin'];
					return commonConstraint.validateFieldsPopulate(values, allowValues);
				},
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
					errorMesage: 'Company id is necessary'
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
module.exports.updateCompany = function() {		
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
					errorMesage: 'Company id is necessary'
				}
			},
			errorMesage: 'Error in Query parameters'	
		},
		body: {
			allowed: true,
			required: false,
			fields: {
				phone: {
					required: false,
					validate: commonConstraint.validatePhone,
					errorMesage: 'Error trying to validate the field =>  Phone.'
				},
				name: {
					required: true,
					validate: commonConstraint.validateName,
					errorMesage: 'Error trying to validate the field => Name.'
				},
				admin: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'Error trying to validate the field => Admin.'
				},
				address: {
					required: false,
					validate: funtion() {return true},
					errorMesage: 'Error trying to validate the field => Address.'
				},
				enabled: {
					required: false,
					validate: commonConstraint.validateEnabled,
					errorMesage: 'Error trying to validate the field => Enabled.'
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
module.exports.deleteCompany = function() {		
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
					errorMesage: 'Company id is necessary'
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