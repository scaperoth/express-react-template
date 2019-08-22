// api/domain/index.js

// services
const UserService = require("../domain/user.service");

// queries
const findUserByEmail = require("../data/user/findUserByEmail.query");
const createUser = require("../data/user/createUser.query");

class Domain {
  userService = new UserService({
    findUserByEmail,
    createUser
  });
}

module.exports = Domain;
