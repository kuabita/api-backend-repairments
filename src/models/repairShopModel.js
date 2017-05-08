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
	    trim : true
	},
    address: {
        type: String,
        lowercase: true, 
        trim : true
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company',
        required: true 
    },
    enabled: {type: Boolean, default: true},
    version: {type: Number, default: 1}
});

module.exports = mongoose.model('RepairShop', RepairShopSchema);