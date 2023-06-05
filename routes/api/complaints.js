const express = require('express');
const router = express.Router();
const complaintsController = require('../../controllers/complaintsController');

router.post('/add', complaintsController.handleNewCom);

router.get('/', complaintsController.getAllComplaints);

router.post('/:id', complaintsController.updateComplaint);

module.exports = router;