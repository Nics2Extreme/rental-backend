const Expenses = require('../model/Expenses');

const getAllExpenses = async (req, res) => {
    const expenses = await Expenses.find();
    if (!expenses) return res.status(204).json({ 'message': 'No expenses found' });
    res.json(expenses);
}

module.exports = {
    getAllExpenses
}