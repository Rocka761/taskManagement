"use strict";

var _require = require("../utility/response"),
  failure = _require.failure;
var roleAuthorizer = function roleAuthorizer(roleArray) {
  return function (req, res, next) {
    if (roleArray.includes(req.payload.role)) {
      next();
    } else {
      return failure(res, "UnAuthorized Route Access", 401, true);
    }
  };
};
module.exports = {
  roleAuthorizer: roleAuthorizer
};