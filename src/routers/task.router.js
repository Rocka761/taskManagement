const router = require("express").Router();
const { catchErrors } = require("../middlewares/errorHandler.middleware");
const controller = require("../controllers/task.controller");
const requestValidatorMiddleware = require("../middlewares/requestValidator.middleware");

const authorizer = require("../middlewares/auth.middleware");
const { roleAuthorizer } = require("../middlewares/roleAuthorizer.middleware");
const {
  createTaskSchema,
  deleteTaskSchema,
  updateTaskStatusSchema,
  updateTaskSchema,
  getTaskSchema,
} = require("../validators/taskModel.validator");

router.use(authorizer);

router.post(
  "/create",
  requestValidatorMiddleware(createTaskSchema),
  roleAuthorizer(["user"]),
  catchErrors(controller.create)
);

router.post(
  "/delete",
  requestValidatorMiddleware(deleteTaskSchema),
  roleAuthorizer(["user"]),
  catchErrors(controller.delete)
);

router.post(
  "/getList",
  requestValidatorMiddleware(getTaskSchema),
  roleAuthorizer(["user"]),
  catchErrors(controller.getList)
);

router.post(
  "/updateDetails",
  requestValidatorMiddleware(updateTaskSchema),
  roleAuthorizer(["user"]),
  catchErrors(controller.updateDetails)
);

router.post(
  "/updateStatus",
  requestValidatorMiddleware(updateTaskStatusSchema),
  roleAuthorizer(["user"]),
  catchErrors(controller.updateStatus)
);

module.exports = router;
