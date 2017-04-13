var app      = require('express'),
    router   = app.Router(),
    User     = require('../models/repairShopModel'),
    UserCtrl = require('../controllers/repairShopController'),
    passport = require('passport');

require('../config/passport')(passport);

// =======================
// Private Endpoints 
// =======================
router.get('/repairShops', passport.authenticate('jwt', { session: false}), RepairShopCtrl.getAllRepairShops);  
router.post('/repairShops', RepairShopCtrl.createCompany);

module.exports = router;