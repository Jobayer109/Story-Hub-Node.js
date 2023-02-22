const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google", function (req, res, next) {
  const redirectUrl = req.query.redirectUrl; // dynamically generate callback URL
  passport.authenticate("google", {
    callbackURL: redirectUrl, // pass dynamic callback URL
    scope: ["profile"],
  })(req, res, next);
});

// Define the callback route for the Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Logout google user
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
