const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      // spread operator
      // user_id: users[Math.floor(Math.random() * users.length)].id,
      // above code randomises the user id and then sets the value of user_id to the randomisation,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      // spread operator - READ UP ON THIS - Spreads the keys out according the ley names in the JSON and pushes to the SQL DB
    });
  }

  process.exit(0);
};

seedDatabase();
