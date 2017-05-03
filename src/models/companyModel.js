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
        ref: 'UserModel',
        required: false,
        default: null
    },
    repairShops: [{ 
        type: ObjectId, 
        ref: 'RepairShopModel',
        required: false,
        default: null 
    }],
    employers: [{ 
        type: ObjectId, 
        ref: 'UserModel',
        required: false,
        default: null 
    }],
    enabled: {type: Boolean, default: true}
});

module.exports = mongoose.model('Company', CompanySchema);