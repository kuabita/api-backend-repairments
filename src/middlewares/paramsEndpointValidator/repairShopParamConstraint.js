"use strict";

var commonConstraint = require('./commonConstraint');

/**
 * Define the parameters restrictions for each endpoint. 
 * @module repairShopParamsConstraint
 */
module.exports = {};  

/**
 * Define restrictions for GET /.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.getAllRepairShops = function() {
	return {
		params: {
			filters: {
				allowed: true,
				required: false,
				fields: {
					name: {
						required: false,
						validate: commonConstraint.validateEmail,
						errorMesage: 'Error trying to validate the field => Email.'
					},
					phone: {
						required: false,
						validate: commonConstraint.validateRol,
						errorMesage: 'Error trying to validate the field =>  Rol.'
					},
					address: {
						required: false,
						validate: commonConstraint.validateRol,
						errorMesage: 'Error trying to validate the field =>  Rol.'
					},
					company: {
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
				allowed: true,
				required: false,
				validate: function(values) {
					var allowValues = ['company', 'employers'];
					return commonConstraint.validateFieldsPopulate(values, allowValues);
				},
				errorMesage: 'Error filters'
			}
		},
		query: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error Query'
		},
		body: {
			allowed: false,
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
module.exports.getRepairShop = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null
			},
			populate: {
				allowed: true,
				required: false,
				validate: function(values) {
					var allowValues = ['company', 'employers'];
					return commonConstraint.validateFieldsPopulate(values, allowValues);
				},
				errorMesage: 'Error filters'
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
			}	
		},
		body: {
			allowed: false,
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
module.exports.createRepairShop = function() {		
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
				name: {
					required: false,
					validate: commonConstraint.validateEmail,
					errorMesage: 'Error trying to validate the field => Email.'
				},
				phone: {
					required: false,
					validate: commonConstraint.validateRol,
					errorMesage: 'Error trying to validate the field =>  Rol.'
				},
				address: {
					required: false,
					validate: commonConstraint.validateRol,
					errorMesage: 'Error trying to validate the field =>  Rol.'
				},
				company: {
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
			errorMesage: 'Error in Body parameters'
		}
	}	
};

/**
 * Define restrictions for PUT /:_id.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.updateRepairShop = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				validate: null,
				fields: null
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error filters'
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
			}	
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
				company: {
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
module.exports.deleteRepairShop = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error filters'
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
			}	
		},
		body: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}	
};	

/**
 * Define restrictions for PUT /repairShops/:_id/employers/.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.addEmployer = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error filters'
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
			}	
		},
		body: {
			allowed: true,
			required: true,
			fields: { 
				employerId: {
					required: true,
					validate: commonConstraint.validateId,
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
 * Define restrictions for PUT /:_id/employers/:_idEmployer.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.deleteEmployer = function() {		
	return {
		params: {
			filters: {
				allowed: false,
				required: false,
				fields: null
			},
			populate: {
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error filters'
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
				},
				_idEmployer: {
					required: true,
					validate: commonConstraint.validateId,
					errorMesage: 'User id is necessary'
				}
			}	
		},
		body: {
			allowed: true,
			required: true,
			fields: { 
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
 * Define restrictions for GET /repairShops/:_id/employers/.
 * @function
 * @return {Object} JSON with restrictions.
 */
module.exports.getAllEmployers = function() {
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
					password: {
						required: false,
						validate: true,
						errorMesage: 'Error trying to validate the field =>  Rol.'
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
				allowed: false,
				required: false,
				validate: null,
				errorMesage: 'Error filters'
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
				},
			},	
			errorMesage: 'Error Query'
		},
		body: {
			allowed: false,
			required: false,
			fields: null,
			errorMesage: 'Error Body'
		}
	}
};