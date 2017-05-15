'use strict';

var mongoose = require('mongoose'),
 	Schema   = mongoose.Schema,
 	ObjectId = Schema.ObjectId;

var ReparationSchema = new Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    repairShop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'repairShop',
        required: true
    },
    created: {type: Date, default: Date.now},
    client: {type: String, default: null},
    product: {type: String, default: null},
    enabled: {type: Boolean, default: true},
    version: {type: Number, default: 1}
});

module.exports = mongoose.model('Reparation', ReparationSchema);
