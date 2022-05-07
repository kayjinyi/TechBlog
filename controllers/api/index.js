const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);

module.exports = router;
