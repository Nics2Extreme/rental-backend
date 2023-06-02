const express = require('express');
const router = express.Router();
const maintenanceController = require('../../controllers/maintenanceController');

router.post('/add', maintenanceController.handleNewMaint);

router.get('/', maintenanceController.getAllMaintenances);

router.post('/:id', maintenanceController.updateMaintenance);

module.exports = router;