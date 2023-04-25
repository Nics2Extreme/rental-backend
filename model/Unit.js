const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unitnumber: {
        type: Number,
        required: true
    },
    unitLocation: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    unitAvailability: {
        type: Boolean,
        required: true
    },
    unitSqm: {
        type: Number,
        required: true
    },
    unitFloor: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Unit', unitSchema);