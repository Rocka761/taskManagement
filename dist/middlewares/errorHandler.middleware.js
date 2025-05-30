"use strict";

var response = require("../utility/response");
var errorHandler = function errorHandler(err, req, res, next) {
  var timestamp = new Date().toISOString();

  // Log to console manually
  console.error("\n[".concat(timestamp, "] ERROR in ").concat(req.method, " ").concat(req.originalUrl));
  console.error("Message: ".concat(err.message));
  console.log(err);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Handle Sequelize or DB errors
  if (err.name && err.name.includes("Sequelize")) {
    return response.failure(res, "Database Error", 500, err.message);
  }

  // General error fallback
  return response.failure(res, err.message || "Internal Server Error", err.statusCode || 500, process.env.NODE_ENV === "development" ? err.stack : undefined);
};
var catchErrors = function catchErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))["catch"](next);
  };
};
module.exports = {
  errorHandler: errorHandler,
  catchErrors: catchErrors
};