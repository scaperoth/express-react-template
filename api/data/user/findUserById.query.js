// data/user/findUserByEmail.query.js
const UserSchema = require("../../models/User");

module.exports = async ({ id }) => {
  return await UserSchema.findById(id);
};
