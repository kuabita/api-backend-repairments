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
    role: {type: String, required: true, enum: ['admin', 'repairman', 'seller', 'employer']},
    enabled: {type: Boolean, default: true}
});

UserSchema.plugin(require('mongoose-role'), {
  roles: ['public', 'user', 'admin'],
  accessLevels: {
    'public': ['public', 'user', 'admin'],
    'anon': ['public'],
    'user': ['user', 'admin'],
    'admin': ['admin']
  }
});

module.exports = mongoose.model('User', UserSchema);