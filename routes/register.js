const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const registerController = require("../controllers/registerController");

router.post("/", upload.single("image"), registerController.handleNewUser);

module.exports = router;
