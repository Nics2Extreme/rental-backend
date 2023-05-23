const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    rent: {
        type: Number,
        required: true
    },
    latestElec: {
        type: Number,
        required: true
    },
    prevElec: {
        type: Number,
        required: true
    },
    latestWat: {
        type: Number,
        required: true
    },
    prevWat: {
        type: Number,
        required: true
    },
    latestInt: {
        type: Number,
        required: true
    },
    prevInt: {
        type: Number,
        required: true
    },
    tenant: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    month: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Billing', billSchema);