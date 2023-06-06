const express = require("express");
const router = express.Router();
const expensesController = require("../../controllers/expensesController");

router.route("/").get(expensesController.getAllExpenses);

router.route("/add").post(expensesController.handleNewExpense);

module.exports = router;
