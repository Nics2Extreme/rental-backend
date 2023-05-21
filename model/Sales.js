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
        rental: {
            type: String,
            required: true,
        },
        electricity: {
            type: String,
            required: true,
        },
        water: {
            type: String,
            required: true,
        },
        internet: {
            type: String,
            required: true,
        },
    }
});

module.exports = mongoose.model('Sales', salesSchema);