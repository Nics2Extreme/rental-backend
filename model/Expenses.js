const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  accountingandlegal: {
    type: Number,
  },
  advertising: {
    type: Number,
  },
  maintenanceandrepairs: {
    type: Number,
  },
  officesupplies: {
    type: Number,
  },
  salariesandwages: {
    type: Number,
  },
  taxesandlicenses: {
    type: Number,
  },
  transportationandtravelexpenses: {
    type: Number,
  },
  utilities: {
    type: Number,
  },
  webhostinganddomains: {
    type: Number,
  },
  other: {
    type: Number,
  },
  month: {
    type: String,
  },
});

module.exports = mongoose.model("Expenses", expensesSchema);
