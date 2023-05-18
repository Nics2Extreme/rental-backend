const Complaints = require('../model/Complaints');

const handleNewCom = async (req, res) => {
    const { username, issue, other } = req.body;
    if (!issue) return res.status(400).json({ 'message': 'Complaint must not be empty.' });

    try {
        //create and store the new user
        const result = await Complaints.create({
            "username": username,
            "issue": issue,
            "other": other,

        });

        console.log(result);

        res.status(201).json({ 'success': `Complaint sent!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewCom };