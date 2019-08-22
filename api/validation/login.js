const Validator = require("validator");
const isEmpty = require("is-empty");

const {
  NAME_FIELD_REQUIRED_ERROR,
  EMAIL_FIELD_REQUIRED_ERROR,
  EMAIL_INVALID_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_CONFIRM_REQUIRED_ERROR,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_MUST_MATCH_ERROR
} = require("../domain/error/messages");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = EMAIL_FIELD_REQUIRED_ERROR;
  } else if (!Validator.isEmail(data.email)) {
    errors.email = EMAIL_INVALID_ERROR;
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = PASSWORD_REQUIRED_ERROR;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
