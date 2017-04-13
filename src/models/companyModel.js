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
        type: ObjectId, 
        ref: 'User',
        required: false,
        default: null
    },
    repairShops: [{ 
        type: ObjectId, 
        ref: 'RepairShop',
        required: false,
        default: null 
    }],
    enabled: {type: Boolean, default: true}
});

module.exports = mongoose.model('Company', CompanySchema);