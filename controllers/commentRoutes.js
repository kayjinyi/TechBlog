const router = require("express").Router();
const { Comment } = require("../models");

//create Comment
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ msg: "ya gotta login to create a comment post!" });
  }
  Comment.create({
    ...req.body,
    blog_id: req.session,
    UserId: req.session.user.id,
  })
    .then((newComment) => {
      res.json(newComment);
      return res.redirect("/aftercomment");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// //delete Comment
// router.delete("/:id", async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!commentData) {
//       res.status(404).json({ message: "No comment found with this id!" });
//       return;
//     }

//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //update Comment
// router.put("/:id", (req, res) => {
//   Comment.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((updatedComment) => {
//       res.json(updatedComment);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "an error occured", err });
//     });
// });

module.exports = router;
