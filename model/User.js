const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    unit: {
        type: Schema.Types.ObjectId, ref: 'Unit'
    },
    occupation: {
        type: String,
    },
    phoneno: {
        type: String,
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

module.exports = mongoose.model('User', userSchema);