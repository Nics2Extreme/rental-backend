const express = require("express");
const router = express.Router();
const billingController = require("../../controllers/billingController");

router.route("/").get(billingController.getAllBillings);

router.route("/:id").get(billingController.getBilling);

router.route("/add").post(billingController.addBilling);

router.route("/tenant/:id").get(billingController.getBillingsWithTenant);

module.exports = router;
