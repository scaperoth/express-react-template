const express = require("express");
const router = express.Router();

class UserRoutes {
  constructor({ userService }) {
    this.userService = userService;
  }

  generateRoutes() {
    // @route POST api/users/register
    // @desc Register user
    // @access Public
    router.post("/register", async (req, res) => {
      try {
        const response = await this.userService.registerUser({ ...req.body });
        res.status(201).json(response);
      } catch (err) {
        return res.status(400).json(err);
      }
    });

    // @route POST api/users/login
    // @desc Login user and return JWT token
    // @access Public
    router.post("/login", async (req, res) => {
      try {
        const response = await this.userService.loginUser({ ...req.body });
        res.status(201).json(response);
      } catch (err) {
        return res.status(400).json(err);
      }
    });

    return router;
  }
}

module.exports = UserRoutes;
