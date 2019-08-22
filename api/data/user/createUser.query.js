// data/user/createUser.query.js
const UserSchema = require("../../models/User");

module.exports = async ({ name, email, password }) => {
  const newUser = new UserSchema({
    name,
    email,
    password
  });
  return await newUser.save();
};
