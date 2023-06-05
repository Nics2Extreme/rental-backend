const Maintenances = require('../model/Maintenance');

const getAllMaintenances = async (req, res) => {
    const maintenances = await Maintenances.find();
    if (!maintenances) return res.status(204).json({ message: "No maintenances found" });
    res.json(maintenances);
};

const updateMaintenance = async (req, res) => {
    const { isStatus } = req.body;
    if (!req?.params?.id) return res.status(400).json({ "message": 'Maintenance ID required' });
    const maintenance = await Maintenances.findOneAndUpdate({ _id: req.params.id }, { status: true, isStatus: isStatus }, { new: true }).exec();
    if (!maintenance) {
        return res.status(204).json({ 'message': `Maintenance ID ${req.params.id} not found` });
    }
    res.json(maintenance);    
};

const handleNewMaint = async (req, res) => {
    const { username, maint, other } = req.body;
    if (!maint) return res.status(400).json({ 'message': 'Maintenance must not be empty.' });

    try {
        //create and store the new user
        const result = await Maintenances.create({
            "username": username,
            "maint": maint,
            "other": other,
            "isStatus": null
        });

        console.log(result);

        res.status(201).json({ 'success': `Maintenance sent!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewMaint, getAllMaintenances, updateMaintenance };