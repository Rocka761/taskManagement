"use strict";

var _require = require("../utility/response"),
  failure = _require.failure;
module.exports = function (validator) {
  return function (req, res, next) {
    var _validator$validate = validator.validate(req.body, {
        abortEarly: false
      }),
      error = _validator$validate.error;
    if (error) {
      return failure(res, "Validation Failed", 400, error.details.map(function (err) {
        return err.message;
      }));
    }
    next();
  };
};