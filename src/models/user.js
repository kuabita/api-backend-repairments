var mongoose = require('mongoose'),
 	Schema   = mongoose.Schema,
 	bcrypt   = require('bcrypt');

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
/*
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
	bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
*/
module.exports = mongoose.model('User', UserSchema);