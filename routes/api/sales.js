const express = require('express');
const router = express.Router();
const salesController = require('../../controllers/salesController');

router.route('/')
    .get(salesController.getAllSales)

router.route('/:id')
    .get(salesController.getSale);

router.route('/add')
    .post(salesController.addSale);

module.exports = router;