const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);
// User.hasMany(Blog, {
//   foreignKey: "user_id",
// });
// Blog.belongsTo(User, {
//   foreignKey: "user_id",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
// });
// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Blog.hasMany(Comment, {
//   foreignKey: "blog_id",
// });

// Comment.belongsTo(Blog, {
//   foreignKey: "blog_id",
// });

module.exports = {
  User,
  Blog,
  Comment,
};
