const express = require("express");
const router = express.Router();
const { confirmAuth, confirmGuest } = require("../middlewares/auth.middleware");
const Story = require("../models/story");

//Login
router.get("/", confirmGuest, (req, res) => {
  res.render("login", { layout: "login" });
});

// Dashboard
router.get("/dashboard", confirmAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.displayName,
      stories,
    });
  } catch (error) {
    res.render("errors/500");
    res.send(error.message);
  }
});

module.exports = router;
