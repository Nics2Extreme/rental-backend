const Unit = require('../model/Unit');

const getAllUnits = async (req, res) => {
    const units = await Unit.find();
    if (!units) return res.status(204).json({ 'message': 'No unit found' });
    res.json(units);
}

const getUnit = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Unit ID required' });
    const unit = await Unit.findOne({ _id: req.params.id }).exec();
    if (!unit) {
        return res.status(204).json({ 'message': `Unit ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUnits,
    getUnit
}