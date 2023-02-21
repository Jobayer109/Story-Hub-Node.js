const express = require("express");
const router = express.Router();
const { confirmAuth } = require("../middlewares/auth.middleware");
const Story = require("../models/story");

//Login
router.get("/add_story", confirmAuth, (req, res) => {
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

// @decs      Display all stories
// @ route    GET /stories
router.get("/", confirmAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdOn: "desc" })
      .lean();
    res.render("stories/index", { stories });
  } catch (error) {
    console.log(error.message);
    res.render("errors/500");
  }
});

// @desc    Show single story
// @route   GET /stories/:id
router.get("/:id", confirmAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user._id != req.user.id && story.status == "private") {
      res.render("error/404");
    } else {
      res.render("stories/show", {
        story,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get("/edit/:id", confirmAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", {
        story,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update story
// @route   PUT /stories/:id
router.put("/:id", confirmAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete("/:id", confirmAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      await Story.remove({ _id: req.params.id });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    User stories
// @route   GET /stories/user/:userId
router.get("/user/:userId", confirmAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();

    res.render("stories/index", {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
