const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../models");

//find all
router.get("/", (req, res) => {
  Blog.findAll({})
    .then((dbBlogs) => {
      res.json(dbBlogs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
//find one
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        //attributes: ["id", "description", "date_created", "user_created"],
      },
    ],
  })
    .then((dbBlog) => {
      //console.log(dbBlog);
      const blog = dbBlog.get({ plain: true });
      console.log(blog);
      res.render("blog", { blog });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create Blog
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ msg: "ya gotta login to create a blog post!" });
  }
  Blog.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user.id,
  })
    .then((newBlog) => {
      console.log(newBlog);
      res.json(newBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update Blog
router.put("/:id", (req, res) => {
  Blog.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete a Blog
router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delBlog) => {
      res.json(delBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;
