const Sales = require('../model/Sales');

const getAllSales = async (req, res) => {
    const sales = await Sales.find().populate('unit').populate('billing').exec();
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

const addSale = async (req, res) => {
    const { month, unit, billing, year } = req.body;
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Calculate the previous month

    try {
        //update and store the new user
        const foundDocuments = await Sales.find({
            month: req.body.month,
        });

        const duplicate = await Sales.find({
            month: req.body.month,
        }).then(
            Sales.findOne({
                $expr: {
                    $eq: [{ $month: "$date" }, currentMonth],
                },
            })
        );

        if (duplicate.length > 0) {
            //update and store the new user
            const result = await Sales.updateOne({ month: month },
                {
                    "unit": unit,
                    "billing": billing,
                    "month": month,
                    "year": year,
                });

            res.status(201).json({ 'success': `Sale for ${month} updated!` });
        }

        if (foundDocuments.length === 0) {
            //create and store the new user
            const result = await Sales.create({
                "unit": unit,
                "billing": billing,
                "month": month,
                "year": year,
            });
            res.status(201).json({ 'success': `New sale for ${month} created!` });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    getAllSales,
    getSale,
    addSale
}