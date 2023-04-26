const Inquiry = require('../model/Inquiry');

const handleNewInq = async (req, res) => {
    const { purpose, name, phoneno, email, contact, contactTime, questions } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Inquiry must not be empty.' });

    try {
        //create and store the new user
        const result = await Inquiry.create({
            "purpose": purpose,
            "name": name,
            "phoneno": phoneno,
            "email": email,
            "contact": contact,
            "contactTime": contactTime,
            "questions": questions
        });

        console.log(result);

        res.status(201).json({ 'success': `Inquiry sent!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewInq };