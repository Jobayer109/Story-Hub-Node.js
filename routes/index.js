const express = require("express");
const router = express.Router();
const { loginPage, dashboardPage } = require("../controllers/index.controller");
const { confirmAuth, confirmGuest } = require("../middlewares/auth.middleware");

// routes
router.get("/", confirmGuest, loginPage); //Login
router.get("/dashboard", confirmAuth, dashboardPage); // Dashboard

module.exports = router;
