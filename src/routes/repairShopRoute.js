var User     = require('../models/repairShopModel'),
    UserCtrl = require('../controllers/repairShopController');

module.exports = function(app, passport, endpointValidator) {
	// =======================
	// Private Endpoints 
	// =======================
	app.get('/repairShops', passport.authenticate('jwt', { session: false}), RepairShopCtrl.getAllRepairShops);  
	app.post('/repairShops', RepairShopCtrl.createCompany);

}

