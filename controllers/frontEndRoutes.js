const express = require("express");
const router = express.Router();
const { User, Blog } = require("../models");

router.get("/", (req, res) => {
  Blog.findAll().then((blogs) => {
    //console.log(blogs);
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
    include: [{ model: Blog }],
  }).then((userData) => {
    //console.log(userData);
    const hbsData = userData.get({ plain: true });
    console.log("=======");
    console.log(hbsData);
    hbsData.loggedIn = req.session.user ? true : false;
    res.render("dashboard", { user: hbsData });
  });
});

router.get("/aftercomment", (req, res) => {
  Blog.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        attributes: ["id", "description", "date_created", "user_created"],
      },
    ],
  })
    .then((dbBlog) => {
      console.log(dbBlog);
      const blog = dbBlog.get({ plain: true });
      res.render("blog", { blog });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;
