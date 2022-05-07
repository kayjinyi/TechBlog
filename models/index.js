const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

module.exports = {
  User,
  Blog,
  Comment,
};
