const express = require('express');
const router = express.Router();
const unitsController = require('../../controllers/unitsController');

router.route('/')
    .get(unitsController.getAllUnits)

router.route('/:id')
    .get(unitsController.getUnit);

module.exports = router;