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

const addSale = async (req, res) => {
    const { month, unit, unitname, year, rent, elec, water, int } = req.body;

    // check for duplicate usernames in the db
    const duplicate = await Sales.findOne({ month: month }).exec();
    if (duplicate) {
        try {
            //update and store the new user
            const result = await Sales.updateOne({ unit: unit, month: month },
                {
                    "month": month,
                    "unit": unit,
                    "unitName": unitname,
                    "year": year,
                    expenses: {
                        "rental": rent,
                        "electricity": elec,
                        "water": water,
                        "internet": int
                    }
                });

            res.status(201).json({ 'success': `Sale for ${month} updated!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } else {
        try {
            //create and store the new user
            const result = await Sales.create({
                "month": month,
                "unit": unit,
                "unitName": unitname,
                "year": year,
                expenses: {
                    "rental": rent,
                    "electricity": elec,
                    "water": water,
                    "internet": int
                }
            });

            res.status(201).json({ 'success': `New sale for ${month} created!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }
}

module.exports = {
    getAllSales,
    getSale,
    addSale
}