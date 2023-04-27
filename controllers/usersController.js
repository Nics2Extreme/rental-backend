const User = require('../model/User');
const Unit = require('../model/Unit');

const getAllUsers = async (req, res) => {
    const users = await User.find().populate('unit').exec();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const getUnitWithTenant = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Unit ID required' });
    const tenant = await User.findOne({ _id: req.params.id }).populate('unit').exec();
    if (!tenant) {
        return res.status(204).json({ 'message': `Unit ID ${req.params.id} not found` });
    }
    res.json(tenant);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    getUnitWithTenant
}