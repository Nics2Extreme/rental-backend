const Expenses = require("../model/Expenses");

const getAllExpenses = async (req, res) => {
  const expenses = await Expenses.find();
  if (!expenses) return res.status(204).json({ message: "No expenses found" });
  res.json(expenses);
};

const handleNewExpense = async (req, res) => {
  const { mon, acc, adv, maint, off, sal, tax, tran, util, web, other } =
    req.body;

  // check for duplicate usernames in the db
  const duplicate = await Expenses.findOne({ month: mon }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //create and store the new user
    const result = await Expenses.create({
      accountingandlegal: acc,
      advertising: adv,
      maintenanceandrepairs: maint,
      officesupplies: off,
      salariesandwages: sal,
      taxesandlicenses: tax,
      transportationandtravelexpenses: tran,
      utilities: util,
      webhostinganddomains: web,
      other: other,
      month: mon,
    });

    res.status(201).json({ success: `New expense created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllExpenses,
  handleNewExpense,
};
