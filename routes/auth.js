const express = require("express");
const router = express.Router();
const passport = require("passport");

// router.get("/google", (req, res, next) => {
//   const redirectUrl = req.query.redirectUrl;
//   passport.authenticate("google", {
//     callbackURL: redirectUrl,
//     scope: ["profile"],
//   })(req, res, next);
// });

router.get("/google", (req, res, next) => {
  req.session.originalUrl = req.query.redirectUrl || "/";
  passport.authenticate("google", {
    callbackURL: "/auth/google/callback",
    scope: ["profile"],
  })(req, res, next);
});

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to the original URL
    const redirectUrl = req.session.originalUrl || "/";
    res.redirect(redirectUrl);
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
