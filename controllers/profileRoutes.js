const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// Delivering the profile page with the posts and comments!
// Profile routes is in the home routes

// Use withAuth middleware to prevent access to route
// Profile page, cant get here UNLESS you are logged in
router.get("/", withAuth, async (req, res) => {
  // withAuth - this function (Found in utils) - redirects user to login if a cookie session when logged_in is not true
  try {
      console.log("GET ROUTE");
      // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(...user);

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
