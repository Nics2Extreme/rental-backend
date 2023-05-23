const Billing = require('../model/Billing');
const User = require('../model/User');

const getAllBillings = async (req, res) => {
    const billings = await Billing.find();
    if (!billings) return res.status(204).json({ 'message': 'No sales found' });
    res.json(billings);
}

const getBilling = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Billing ID required' });
    const billing = await Billing.findOne({ _id: req.params.id }).exec();
    if (!billing) {
        return res.status(204).json({ 'message': `Billing ID ${req.params.id} not found` });
    }
    res.json(sale);
}

const addBilling = async (req, res) => {
    const { rent, latestElec, prevElec, latestWat, prevWat, latestInt, prevInt, tenant, month } = req.body;

    try {
        //update and store the new user
        const result = await Billing.create({
            "rent": rent,
            "latestElec": latestElec,
            "prevElec": prevElec,
            "latestWat": latestWat,
            "prevWat": prevWat,
            "latestInt": latestInt,
            "prevInt": prevInt,
            "tenant": tenant,
            "month": month,
        });

        console.log(result);
        res.status(201).json({ 'success': `Billing created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getBillingWithTenant = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Billing ID required' });
    const billing = await Billing.findOne({ tenant: req.params.id }).populate('tenant').exec();
    if (!billing) {
        return res.status(204).json({ 'message': `Unit ID ${req.params.id} not found` });
    }
    res.json(billing);
}

module.exports = {
    getAllBillings,
    getBilling,
    addBilling,
    getBillingWithTenant
}