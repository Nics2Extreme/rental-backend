const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    occupation: {
        type: String,
    },
    phoneno: {
        type: Number,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    regdate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Tenant', tenantSchema);