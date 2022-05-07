const express = require("express");
const router = express.Router();
const { User, Blog } = require("../models");

router.get("/", (req, res) => {
  Blog.findAll().then((blogs) => {
    console.log(blogs);
    const hbsBlogs = blogs.map((blog) => blog.get({ plain: true }));
    console.log("==========");
    console.log(hbsBlogs);
    const loggedIn = req.session.user ? true : false;
    res.render("home", {
      blogs: hbsBlogs,
      loggedIn,
      username: req.session.user?.username,
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  res.render("login");
});
router.get("/signup", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  User.findByPk(req.session.user.id, {
    include: [Blog],
  }).then((userData) => {
    console.log(userData);
    const hbsData = userData.get({ plain: true });
    console.log("=======");
    console.log(hbsData);
    hbsData.loggedIn = req.session.user ? true : false;
    res.render("dashboard", hbsData);
  });
});

module.exports = router;
