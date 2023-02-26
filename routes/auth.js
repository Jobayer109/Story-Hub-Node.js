const express = require("express");
const router = express.Router();
const { getGoogleAc, googleCallback, googleSignOut } = require("../controllers/auth.controller");

// Auth routes
router.get("/google", getGoogleAc);
router.get("/google/callback", googleCallback);
router.get("/logout", googleSignOut); // logout

module.exports = router;
