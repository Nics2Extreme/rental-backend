const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantinSchema = new Schema ({
    tenant: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    door: {
        type: Boolean,
        required: true
    },
    wall: {
        type: Boolean,
        required: true
    },
    stairs: {
        type: Boolean,
        required: true
    },
    floor: {
        type: Boolean,
        required: true
    },
    gatekey: {
        type: Boolean,
        required: true
    },
    doorkey: {
        type: Boolean,
        required: true
    },
    sockets: {
        type: Boolean,
        required: true
    },
    watersub: {
        type: Boolean,
        required: true
    },
    elecsub: {
        type: Boolean,
        required: true
    },
    switch: {
        type: Boolean,
        required: true
    },
    braker: {
        type: Boolean,
        required: true
    },
    sink: {
        type: Boolean,
        required: true
    },
    lights: {
        type: Boolean,
        required: true
    },
    window: {
        type: Boolean,
        required: true
    },
    faucet: {
        type: Boolean,
        required: true
    },
    bowl: {
        type: Boolean,
        required: true
    },
    ceiling: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tenantin', tenantinSchema);