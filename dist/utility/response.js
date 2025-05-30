"use strict";

module.exports = {
  success: function success(res) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Success";
    var statusCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
    return res.status(statusCode).json({
      success: true,
      message: message,
      data: data
    });
  },
  failure: function failure(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Something went wrong";
    var statusCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
    var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return res.status(statusCode).json({
      success: false,
      message: message,
      // error: process.env.NODE_ENV === "development" ? error : undefined,
      error: error
    });
  }
};