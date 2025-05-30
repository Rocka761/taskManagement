"use strict";

var router = require("express").Router();
var _require = require("../middlewares/errorHandler.middleware"),
  catchErrors = _require.catchErrors;
var controller = require("../controllers/user.controller");
var requestValidatorMiddleware = require("../middlewares/requestValidator.middleware");
var _require2 = require("../validators/userModel.validator"),
  userCreationSchema = _require2.userCreationSchema,
  deleteUserSchema = _require2.deleteUserSchema,
  getUserSchema = _require2.getUserSchema,
  updateUserSchema = _require2.updateUserSchema,
  updateUserPasswordSchema = _require2.updateUserPasswordSchema;
var authorizer = require("../middlewares/auth.middleware");
var _require3 = require("../middlewares/roleAuthorizer.middleware"),
  roleAuthorizer = _require3.roleAuthorizer;
router.use(authorizer);
router.post("/create", requestValidatorMiddleware(userCreationSchema), roleAuthorizer(["admin"]), catchErrors(controller.create));
router.post("/delete", requestValidatorMiddleware(deleteUserSchema), roleAuthorizer(["admin"]), catchErrors(controller.deleteUsers));
router.post("/getUsers", requestValidatorMiddleware(getUserSchema), roleAuthorizer(["admin"]), catchErrors(controller.getAllUsers));
router.post("/updateUserDetails", requestValidatorMiddleware(updateUserSchema), roleAuthorizer(["admin", "user"]), catchErrors(controller.updateDetails));
router.post("/updatePassword", requestValidatorMiddleware(updateUserPasswordSchema), roleAuthorizer(["user"]), catchErrors(controller.updatePassword));
module.exports = router;