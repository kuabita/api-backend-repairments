var User        = require('../models/companyModel'),
    CompanyCtrl = require('../controllers/companyController'),
	express     = require('express');

module.exports = function(app, passport, endpointValidator) {
	var companies = express.Router();

	companies.use([
	//	passport.authenticate('jwt', {session: false}),
		endpointValidator.hasAccess('employer')
	]);

	companies.get('/companies', CompanyCtrl.getAllCompanies);  
	companies.post('/companies', CompanyCtrl.createCompany);

	app.use('/companies', companies);
}
