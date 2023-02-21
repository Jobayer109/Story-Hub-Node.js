const confirmAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

const confirmGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    return next();
  }
};

module.exports = {
  confirmAuth,
  confirmGuest,
};
