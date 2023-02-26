const passport = require("passport");

const getGoogleAc = passport.authenticate("google", { scope: ["profile"] });

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/dashboard",
});

const googleSignOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = { getGoogleAc, googleCallback, googleSignOut };
