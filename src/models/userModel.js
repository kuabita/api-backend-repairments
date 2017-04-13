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
	companies: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company' 
    }],
    role: {type: String, required: true, enum: ['root', 'admin', 'employer']},
    enabled: {type: Boolean, default: true}
});

UserSchema.plugin(require('mongoose-role'), {
  	roles: ['root', 'admin', 'employer'],
	accessLevels: {
		'root': ['root'],
		'admin': ['admin', 'root'],
		'employer': ['employer', 'admin', 'root']		    
	}
});

module.exports = mongoose.model('User', UserSchema);