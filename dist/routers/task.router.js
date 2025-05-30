"use strict";

var router = require("express").Router();
var _require = require("../middlewares/errorHandler.middleware"),
  catchErrors = _require.catchErrors;
var controller = require("../controllers/task.controller");
var requestValidatorMiddleware = require("../middlewares/requestValidator.middleware");
var authorizer = require("../middlewares/auth.middleware");
var _require2 = require("../middlewares/roleAuthorizer.middleware"),
  roleAuthorizer = _require2.roleAuthorizer;
var _require3 = require("../validators/taskModel.validator"),
  createTaskSchema = _require3.createTaskSchema,
  deleteTaskSchema = _require3.deleteTaskSchema,
  updateTaskStatusSchema = _require3.updateTaskStatusSchema,
  updateTaskSchema = _require3.updateTaskSchema,
  getTaskSchema = _require3.getTaskSchema;
router.use(authorizer);
router.post("/create", requestValidatorMiddleware(createTaskSchema), roleAuthorizer(["user"]), catchErrors(controller.create));
router.post("/delete", requestValidatorMiddleware(deleteTaskSchema), roleAuthorizer(["user"]), catchErrors(controller["delete"]));
router.post("/getList", requestValidatorMiddleware(getTaskSchema), roleAuthorizer(["user"]), catchErrors(controller.getList));
router.post("/updateDetails", requestValidatorMiddleware(updateTaskSchema), roleAuthorizer(["user"]), catchErrors(controller.updateDetails));
router.post("/updateStatus", requestValidatorMiddleware(updateTaskStatusSchema), roleAuthorizer(["user"]), catchErrors(controller.updateStatus));
module.exports = router;