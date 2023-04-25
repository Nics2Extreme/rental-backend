const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    unitName: {
        type: String,
        required: true
    },
    salesType: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Sales', salesSchema);