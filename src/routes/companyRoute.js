var User        = require('../models/companyModel'),
    CompanyCtrl = require('../controllers/companyController');

module.exports = function(app, passport, endpointValidator) {
	// =======================
	// Private Endpoints 
	// =======================
	app.get('/companies', passport.authenticate('jwt', {session: false}), CompanyCtrl.getAllCompanies);  
	app.post('/companies', passport.authenticate('jwt', {session: false}), CompanyCtrl.createCompany);
}
