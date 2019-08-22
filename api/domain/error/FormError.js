// api/domain/errors/FormError.js

class FormError extends Error {
  constructor(fields = {}, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormError);
    }

    Object.keys(fields).map(k => {
      this[k] = fields[k];
    });
  }
}

module.exports = FormError;
