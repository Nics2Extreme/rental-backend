const express = require('express');
const router = express.Router();
const tenantinController = require('../../controllers/tenantinController');

router.post('/add', tenantinController.addIn);

router.get('/', tenantinController.getAllIn);

router.get('/:id', tenantinController.getIn);

module.exports = router;