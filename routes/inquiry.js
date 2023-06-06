const express = require("express");
const router = express.Router();
const inqController = require("../controllers/inquiryController");

router.post("/", inqController.handleNewInq);

router.get("/inq", inqController.getInquiries);

module.exports = router;
