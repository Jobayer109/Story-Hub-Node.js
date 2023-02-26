const Story = require("../models/story");

const loginPage = (req, res) => {
  res.render("login", { layout: "login" });
};

const dashboardPage = async (req, res) => {
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
};

module.exports = { loginPage, dashboardPage };
