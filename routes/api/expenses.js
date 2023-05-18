const express = require('express');
const router = express.Router();
const expensesController = require('../../controllers/expensesController');

router.route('/')
    .get(expensesController.getAllExpenses)

module.exports = router;