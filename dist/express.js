"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("dotenv").config();
var db = require("./configs/db");
var _require = require("js-sha256"),
  sha256 = _require.sha256;
var app = require("./app");
db.seq.sync().then(/*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var created;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return isAdminUserFound();
      case 3:
        if (_context.sent) {
          _context.next = 8;
          break;
        }
        _context.next = 6;
        return createDefaultAdminUser();
      case 6:
        created = _context.sent;
        if (!created) {
          console.error("Failed to create default admin user.");
          process.exit(11);
        }
      case 8:
        app.listen(process.env.HTTP_SERVER_PORT || 8001, function () {
          console.log("Server Started At port ".concat(process.env.HTTP_SERVER_PORT || 8001));
        });
        _context.next = 15;
        break;
      case 11:
        _context.prev = 11;
        _context.t0 = _context["catch"](0);
        console.error("Error during initialization:", _context.t0);
        process.exit(1);
      case 15:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 11]]);
})), function (err) {
  console.error("DB Sync Error:", err);
  process.exit(1);
});
function isAdminUserFound() {
  return _isAdminUserFound.apply(this, arguments);
}
function _isAdminUserFound() {
  _isAdminUserFound = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return db.User.findAll({
            where: {
              role: "admin"
            },
            raw: true
          });
        case 2:
          data = _context2.sent;
          return _context2.abrupt("return", data.length !== 0);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _isAdminUserFound.apply(this, arguments);
}
function createDefaultAdminUser() {
  return _createDefaultAdminUser.apply(this, arguments);
}
function _createDefaultAdminUser() {
  _createDefaultAdminUser = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var _data$get, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return db.User.create({
            name: "ARUN PRABHAKAR G",
            email: "sample@gmail.com",
            password: sha256(sha256("test@1234" + process.env.FSALT) + process.env.BSALT),
            role: "admin"
          });
        case 3:
          data = _context3.sent;
          return _context3.abrupt("return", !!(data !== null && data !== void 0 && (_data$get = data.get({
            plain: true
          })) !== null && _data$get !== void 0 && _data$get.id));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error creating default admin:", _context3.t0);
          return _context3.abrupt("return", false);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _createDefaultAdminUser.apply(this, arguments);
}