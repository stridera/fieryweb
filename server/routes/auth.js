const express = require("express");
const { login } = require("../controllers/auth");

const router = express.Router();

router.route("/login").post((req, res) => {
  console.log("In Login");
  login(req, res);
});

module.exports = router;
