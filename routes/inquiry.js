const express = require('express');
const router = express.Router();
const inqController = require('../controllers/inquiryController');

router.post('/', inqController.handleNewInq);

module.exports = router;