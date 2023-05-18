const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    unit: {
        type: Schema.Types.ObjectId, ref: 'Unit'
    },
    unitName: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    expenses: {
        rental: String,
        electricity: String,
        water: String,
        internet: String,
    }
});

module.exports = mongoose.model('Sales', salesSchema);