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
    }
});

module.exports = mongoose.model('Unit', unitSchema);