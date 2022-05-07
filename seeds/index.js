const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const users = [
  {
    username: "jinyi1",
    password: "password",
  },
  {
    username: "jinyi2",
    password: "password",
  },
  {
    username: "jinyi3",
    password: "Password",
  },
];

const blogs = [
  {
    title: "Why MVC is so important",
    body: "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer of data, the View layer for design ,a dn the controller layer for application logic",
    UserId: 1,
  },
  {
    title: "Authentication vs Authorization",
    body: "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
    UserId: 1,
  },
  {
    title: "Cats: a review",
    body: "I love cats I love every kind of cat.  I want to hug all them but you cant. Cant hug every cat......Cant hug every cat. ",
    UserId: 2,
  },
];
const comments = [
  {
    description: "so important",
    date_created: "May 05, 2017",
    user_created: "jinyi1",
    blog_id: 1,
  },
];
const feedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
      individualHooks: true,
    });
    await Blog.bulkCreate(blogs);
    await Comment.bulkCreate(comments);

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

feedMe();
