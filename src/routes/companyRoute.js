var app      = require('express'),
    router   = app.Router(),
    User     = require('../models/companyModel'),
    CompanyCtrl = require('../controllers/companyController'),
    passport = require('passport');

require('../config/passport')(passport);

// =======================
// Private Endpoints 
// =======================
router.get('/companies', passport.authenticate('jwt', {session: false}), CompanyCtrl.getAllCompanies);  
router.post('/companies', passport.authenticate('jwt', {session: false}), CompanyCtrl.createCompany);

module.exports = router;