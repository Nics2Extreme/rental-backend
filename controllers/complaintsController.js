const Complaints = require('../model/Complaints');

const getAllComplaints = async (req, res) => {
    const complaints = await Complaints.find();
    if (!complaints) return res.status(204).json({ message: "No complaints found" });
    res.json(complaints);
};

const updateComplaint = async (req, res) => {
    const { isStatus } = req.body;
    if (!req?.params?.id) return res.status(400).json({ "message": 'Complaint ID required' });
    const complaint = await Complaints.findOneAndUpdate({ _id: req.params.id }, { status: true, isStatus: isStatus }, { new: true }).exec();
    if (!complaint) {
        return res.status(204).json({ 'message': `Complaint ID ${req.params.id} not found` });
    }
    res.json(complaint);    
};

const handleNewCom = async (req, res) => {
    const { username, issue, other } = req.body;
    if (!issue) return res.status(400).json({ 'message': 'Complaint must not be empty.' });

    try {
        //create and store the new user
        const result = await Complaints.create({
            "username": username,
            "issue": issue,
            "other": other,
            "isStatus": null
        });

        console.log(result);

        res.status(201).json({ 'success': `Complaint sent!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewCom, getAllComplaints, updateComplaint };