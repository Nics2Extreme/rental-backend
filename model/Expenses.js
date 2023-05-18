const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    accountingandlegal: {
        type: String,
    },
    advertising: {
        type: String,
    },
    maintenanceandrepairs: {
        type: String,
    },
    officesupplies: {
        type: String,
    },
    salariesandwages: {
        type: String,
    },
    taxesandlicenses: {
        type: String,
    },
    transportationandtravelexpenses: {
        type: String,
    },
    utilities: {
        type: String,
    },
    webhostinganddomains:  {
        type: String,
    },
    other: {
        type: String,
    },
    month: {
        type: String,
    },
    quiapo: {
        electricity: String,
        water: String,
        telandint: String
    },
    sampaloc: {
        electricity: String,
        water: String,
        telandint: String
    },
    taguig: {
        electricity: String,
        water: String,
        telandint: String
    },
   
});

module.exports = mongoose.model('Expenses', expensesSchema);