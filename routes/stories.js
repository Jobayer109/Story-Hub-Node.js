const express = require("express");
const router = express.Router();
const { confirmAuth } = require("../middlewares/auth.middleware");
const Story = require("../models/story");

//Login
router.get("/", confirmAuth, (req, res) => {
  res.render("stories/add_story");
});

// @decs Story adding route
// @ route    Post /stories
router.post("/", confirmAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error.message);
    res.render("errors/500");
  }
});

module.exports = router;
