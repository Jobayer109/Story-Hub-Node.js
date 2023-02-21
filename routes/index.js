const express = require("express");
const router = express.Router();
const { confirmAuth, confirmGuest } = require("../middlewares/auth.middleware");

//Login
router.get("/", confirmGuest, (req, res) => {
  res.render("login", { layout: "login" });
});

// Dashboard
router.get("/dashboard", confirmAuth, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
