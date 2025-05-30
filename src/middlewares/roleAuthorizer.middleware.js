const { failure } = require("../utility/response");

const roleAuthorizer = (roleArray) => {
  return function (req, res, next) {
    if (roleArray.includes(req.payload.role)) {
      next();
    } else {
      return failure(res, "UnAuthorized Route Access", 401, true);
    }
  };
};

module.exports = { roleAuthorizer };
