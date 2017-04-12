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
    role: {type: String, enum: ['admin', 'employer']},
    enabled: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', UserSchema);