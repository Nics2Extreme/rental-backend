const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    maint: {
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

module.exports = mongoose.model('Maintenances', maintenanceSchema);