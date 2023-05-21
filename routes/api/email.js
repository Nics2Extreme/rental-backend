const express = require("express");
const router = express.Router();
const emailController = require("../../controllers/emailController");

router.route("/").post((req, res) => {
  emailController
    .sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.send(error.message));
});

module.exports = router;
