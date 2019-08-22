// data/user/findUserByEmail.query.js
const UserSchema = require("../../models/User");

module.exports = async ({ email }) => {
  return await UserSchema.findOne({ email });
};
