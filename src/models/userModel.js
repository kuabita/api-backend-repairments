'use strict';

var mongoose = require('mongoose'),
 	Schema   = mongoose.Schema;

var UserSchema = new Schema({
    email: {
	    type: String,
	    required: true,
	    unique: true,
	    lowercase: true, 
	    trim : true 
	},
	password: {
	    type: String,
	    lowercase: true, 
	    trim : true,
	    required: true
	},
    role: {type: String, required: true, enum: ['root', 'admin', 'employer', 'client']},
    enabled: {type: Boolean, default: true},
    version: {type: Number, default: 1}
});

UserSchema.plugin(require('mongoose-role'), {
  	roles: ['root', 'admin', 'employer', 'client'],
	accessLevels: {
		'root': ['root'],
		'admin': ['admin', 'root'],
		'employer': ['employer', 'admin', 'root'],
		'client': ['client', 'employer', 'admin', 'root'] 		    
	}
});

module.exports = mongoose.model('User', UserSchema);
