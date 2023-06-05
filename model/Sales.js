const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    unit: {
        type: Schema.Types.ObjectId, ref: 'Unit'
    },
    billing: {
        type: Schema.Types.ObjectId,
        ref: "Billing",
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Sales', salesSchema);