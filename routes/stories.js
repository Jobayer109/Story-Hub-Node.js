const express = require("express");
const router = express.Router();
const { confirmAuth } = require("../middlewares/auth.middleware");
const {
  addStoryPage,
  createStory,
  getAllStories,
  getSingleStory,
  showEditPage,
  updateStory,
  deleteStory,
  userStories,
} = require("../controllers/stories.controller");

// routes
router.get("/add_story", confirmAuth, addStoryPage); // add story page
router.post("/", confirmAuth, createStory); // create story page
router.get("/", confirmAuth, getAllStories); // get all user
router.get("/:id", confirmAuth, getSingleStory); // get single story
router.get("/edit/:id", confirmAuth, showEditPage); // show edit page
router.put("/:id", confirmAuth, updateStory); // update story
router.delete("/:id", confirmAuth, deleteStory); // delete story
router.get("/user/:userId", confirmAuth, userStories); // user's stories

module.exports = router;
