const router = require("express").Router();
const { Blog } = require("../../models");

//find one Blog when login

//create Blog
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ msg: "ya gotta login to create a blog post!" });
  }
  Blog.create({
    ...req.body,
    UserId: req.session.user.id,
  })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete Blog
router.delete("/:id", async (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ msg: "ya gotta login to delete a blog post!" });
  }
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update Blog
router.put("/:id", (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ msg: "ya gotta login to update a blog post!" });
  }
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

module.exports = router;
