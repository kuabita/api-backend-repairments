'use strict';

var mongoose = require('mongoose'),
 	Schema   = mongoose.Schema;
 	
var RepairShopSchema = new Schema({
    name: {
	    type: String,
	    lowercase: true, 
	    trim : true,
        required: true 
	},
	phone: {
	    type: String,
	    lowercase: true, 
	    trim : false
	},
    address: {
        type: String,
        lowercase: true, 
        trim : false
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company',
        required: true 
    },
    employers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false 
    }],
    enabled: {type: Boolean, default: true},
    version: {type: Number, default: 1}
});

module.exports = mongoose.model('RepairShop', RepairShopSchema);