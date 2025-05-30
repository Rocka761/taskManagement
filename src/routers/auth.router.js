const router = require("express").Router();

const controller = require("../controllers/auth.controller");
const { catchErrors } = require("../middlewares/errorHandler.middleware");
const loginLimiter = require("../middlewares/loginRateLimit.middleware");
const requestValidatorMiddleware = require("../middlewares/requestValidator.middleware");
const { loginSchema } = require("../validators/userModel.validator");

router.post(
  "/login",
  loginLimiter,
  requestValidatorMiddleware(loginSchema),
  catchErrors(controller.login)
);

module.exports = router;
