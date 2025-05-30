"use strict";

var router = require("express").Router();
var controller = require("../controllers/auth.controller");
var _require = require("../middlewares/errorHandler.middleware"),
  catchErrors = _require.catchErrors;
var loginLimiter = require("../middlewares/loginRateLimit.middleware");
var requestValidatorMiddleware = require("../middlewares/requestValidator.middleware");
var _require2 = require("../validators/userModel.validator"),
  loginSchema = _require2.loginSchema;
router.post("/login", loginLimiter, requestValidatorMiddleware(loginSchema), catchErrors(controller.login));
module.exports = router;