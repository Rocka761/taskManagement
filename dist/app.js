"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("dotenv").config();
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
var morgan = require("morgan");
var db = require("./configs/db");
var _require = require("./middlewares/errorHandler.middleware"),
  errorHandler = _require.errorHandler;
var notFoundMiddleware = require("./middlewares/notFound.middleware");
var logger = require("./utility/logger");
var _require2 = require("js-sha256"),
  sha256 = _require2.sha256;
var _require3 = require("express-rate-limit"),
  rateLimit = _require3["default"];
var app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); // security headers
app.use(morgan("combined")); // logging
app.use(rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100
})); // 100 req/min/IP

app.use("/health", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res.send("OK");
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use(/*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          req["db"] = db;
          next();
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
app.use("/auth", require("./routers/auth.router"));
app.use("/user", require("./routers/user.router"));
app.use("/task", require("./routers/task.router"));
app.use(notFoundMiddleware);
app.use(errorHandler);
console.log(sha256("Test@1234" + process.env.FSALT));
module.exports = app;