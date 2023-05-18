const express = require('express');
const router = express.Router();
const complaintsController = require('../../controllers/complaintsController');

router.post('/', complaintsController.handleNewCom);

module.exports = router;