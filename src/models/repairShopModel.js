'use strict';

var mongoose = require('mongoose'),
 	Schema   = mongoose.Schema;
 	
var RepairShopSchema = new Schema({
    name: {
	    type: String,
	    lowercase: true, 
	    trim : true 
	},
	phone: {
	    type: String,
	    lowercase: true, 
	    trim : true
	},
    address: {
        type: String,
        lowercase: true, 
        trim : true
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company' 
    },
    employers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    enabled: {type: Boolean, default: true}
});

module.exports = mongoose.model('RepairShop', RepairShopSchema);