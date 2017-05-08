'use strict';

var mongoose = require('mongoose'),
 	Schema   = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

var CompanySchema = new Schema({
    phone: {
	    type: String,
	    lowercase: true, 
	    trim : true,
	    required: true
	},
    name: {
        type: String,
        lowercase: true, 
        trim : true, 
        required: true
    },
    address: {
        type: String,
        lowercase: true, 
        trim : true,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enabled: {type: Boolean, default: true},
    version: {type: Number, default: 1}
});

module.exports = mongoose.model('Company', CompanySchema);