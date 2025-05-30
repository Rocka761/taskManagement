const router = require("express").Router();
const { catchErrors } = require("../middlewares/errorHandler.middleware");
const controller = require("../controllers/user.controller");
const requestValidatorMiddleware = require("../middlewares/requestValidator.middleware");
const {
  userCreationSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
} = require("../validators/userModel.validator");

const authorizer = require("../middlewares/auth.middleware");
const { roleAuthorizer } = require("../middlewares/roleAuthorizer.middleware");

router.use(authorizer);

router.post(
  "/create",
  requestValidatorMiddleware(userCreationSchema),
  roleAuthorizer(["admin"]),
  catchErrors(controller.create)
);

router.post(
  "/delete",
  requestValidatorMiddleware(deleteUserSchema),
  roleAuthorizer(["admin"]),
  catchErrors(controller.deleteUsers)
);

router.post(
  "/getUsers",
  requestValidatorMiddleware(getUserSchema),
  roleAuthorizer(["admin"]),
  catchErrors(controller.getAllUsers)
);

router.post(
  "/updateUserDetails",
  requestValidatorMiddleware(updateUserSchema),
  roleAuthorizer(["admin", "user"]),
  catchErrors(controller.updateDetails)
);

router.post(
  "/updatePassword",
  requestValidatorMiddleware(updateUserPasswordSchema),
  roleAuthorizer(["user"]),
  catchErrors(controller.updatePassword)
);

module.exports = router;
