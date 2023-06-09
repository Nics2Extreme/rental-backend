const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintsSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    other: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    isStatus: {
        type: String,
    }
});

module.exports = mongoose.model('Complaints', complaintsSchema);