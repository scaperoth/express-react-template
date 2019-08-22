// api/domain/user.service

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// validators
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// errors
const FormError = require("./error/FormError");
const errmsg = require("./error/messages");

class UserService {
  constructor({ findUserByEmail, createUser }) {
    this.findUserByEmail = findUserByEmail;
    this.createUser = createUser;
    this.bcrypt = bcrypt;
  }

  async registerUser({ name, email, password, password2 }) {
    // Form validation
    const { errors, isValid } = validateRegisterInput({
      name,
      email,
      password,
      password2
    });

    // Check validation
    if (!isValid) {
      throw new FormError(errors, errmsg.USER_NOT_VALID_ERROR);
    }

    const user = this.findUserByEmail({ email });
    if (user) {
      throw new FormError(
        { email: "Email already exists" },
        "User already exists"
      );
    }
    // Hash password before saving in database
    const hash = await this.bcrypt.hash(password, 10);
    return await this.createUser({ name, email, password: hash });
  }

  async loginUser({ email, password }) {
    // Form validation

    const { errors, isValid } = validateLoginInput({ email, password });

    // Check validation
    if (!isValid) {
      throw new FormError(errors, errmsg.INVALID_LOGIN_ERROR);
    }

    // Find user by email
    const user = await this.findUserByEmail({ email });

    // Check if user exists
    if (!user) {
      throw new FormError(
        { email: errmsg.INVALID_EMAIL_ERROR },
        errmsg.INVALID_LOGIN_ERROR
      );
    }

    // Check password
    const isMatch = await this.bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new FormError(
        { password: errmsg.INVALID_PASSWORD_ERROR },
        errmsg.INVALID_LOGIN_ERROR
      );
    }

    // User matched
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name
    };

    // Sign token
    const token = jwt.sign(payload, keys.secretOrKey, {
      expiresIn: 31556926 // 1 year in seconds
    });

    return {
      success: true,
      token: "Bearer " + token
    };
  }
}

module.exports = UserService;
