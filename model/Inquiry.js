const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inqSchema = new Schema({
    purpose: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    contactTime: {
        type: String,
        required: true
    },
    questions: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', inqSchema);