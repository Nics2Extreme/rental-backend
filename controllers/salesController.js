const Sales = require('../model/Sales');

const getAllSales = async (req, res) => {
    const sales = await Sales.find();
    if (!sales) return res.status(204).json({ 'message': 'No sales found' });
    res.json(sales);
}

const getSale = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Sales ID required' });
    const sale = await Sales.findOne({ _id: req.params.id }).exec();
    if (!sale) {
        return res.status(204).json({ 'message': `Sales ID ${req.params.id} not found` });
    }
    res.json(sale);
}

module.exports = {
    getAllSales,
    getSale
}